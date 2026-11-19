import zlib from 'zlib'

interface DecodedPng {
  width: number
  height: number
  rgb: Buffer
}

function paethPredictor(a: number, b: number, c: number): number {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  if (pa <= pb && pa <= pc) return a
  if (pb <= pc) return b
  return c
}

function decodePngToRgb(pngBytes: Buffer, bgR = 5, bgG = 10, bgB = 20): DecodedPng {
  // Verify PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  if (pngBytes.length < 24 || !pngBytes.subarray(0, 8).equals(sig)) {
    throw new Error('Invalid PNG signature')
  }

  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  const idatChunks: Buffer[] = []

  let offset = 8
  while (offset + 8 <= pngBytes.length) {
    const length = pngBytes.readUInt32BE(offset)
    const type = pngBytes.subarray(offset + 4, offset + 8).toString('ascii')
    const dataStart = offset + 8
    const dataEnd = dataStart + length
    if (dataEnd > pngBytes.length) break

    if (type === 'IHDR') {
      width = pngBytes.readUInt32BE(dataStart)
      height = pngBytes.readUInt32BE(dataStart + 4)
      bitDepth = pngBytes[dataStart + 8]
      colorType = pngBytes[dataStart + 9]
    } else if (type === 'IDAT') {
      idatChunks.push(pngBytes.subarray(dataStart, dataEnd))
    } else if (type === 'IEND') {
      break
    }

    offset = dataEnd + 4 // skip 4-byte CRC
  }

  if (!width || !height) {
    throw new Error('Missing PNG IHDR dimensions')
  }
  if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) {
    throw new Error(`Unsupported PNG format (bitDepth=${bitDepth}, colorType=${colorType})`)
  }

  const bpp = colorType === 6 ? 4 : 3
  const stride = width * bpp
  const inflated = zlib.inflateSync(Buffer.concat(idatChunks))
  const raw = Buffer.alloc(height * stride)

  for (let y = 0; y < height; y++) {
    const srcRowStart = y * (stride + 1)
    const filterType = inflated[srcRowStart]
    const dstRowStart = y * stride

    for (let x = 0; x < stride; x++) {
      const val = inflated[srcRowStart + 1 + x]
      const left = x >= bpp ? raw[dstRowStart + x - bpp] : 0
      const up = y > 0 ? raw[dstRowStart - stride + x] : 0
      const upLeft = y > 0 && x >= bpp ? raw[dstRowStart - stride + x - bpp] : 0

      let recon = val
      if (filterType === 1) {
        recon = (val + left) & 0xff
      } else if (filterType === 2) {
        recon = (val + up) & 0xff
      } else if (filterType === 3) {
        recon = (val + ((left + up) >> 1)) & 0xff
      } else if (filterType === 4) {
        recon = (val + paethPredictor(left, up, upLeft)) & 0xff
      }
      raw[dstRowStart + x] = recon
    }
  }

  if (colorType === 2) {
    return { width, height, rgb: raw }
  }

  // Convert RGBA -> RGB composited onto dark obsidian background
  const rgb = Buffer.alloc(width * height * 3)
  for (let i = 0, j = 0; i < raw.length; i += 4, j += 3) {
    const a = raw[i + 3]
    if (a === 255) {
      rgb[j] = raw[i]
      rgb[j + 1] = raw[i + 1]
      rgb[j + 2] = raw[i + 2]
    } else if (a === 0) {
      rgb[j] = bgR
      rgb[j + 1] = bgG
      rgb[j + 2] = bgB
    } else {
      const alpha = a / 255
      const inv = 1 - alpha
      rgb[j] = Math.round(raw[i] * alpha + bgR * inv)
      rgb[j + 1] = Math.round(raw[i + 1] * alpha + bgG * inv)
      rgb[j + 2] = Math.round(raw[i + 2] * alpha + bgB * inv)
    }
  }

  return { width, height, rgb }
}

/**
 * Assembles an array of 8-bit RGB/RGBA PNG buffers into a spec-compliant
 * multi-page PDF 1.4 document suitable for LinkedIn Document Carousels.
 */
export function buildMultiPagePdfFromPngs(pngBuffers: Buffer[]): Buffer {
  if (pngBuffers.length === 0) {
    throw new Error('At least one PNG slide is required')
  }

  const slides = pngBuffers.map(buf => {
    const decoded = decodePngToRgb(buf)
    const compressed = zlib.deflateSync(decoded.rgb, { level: 6 })
    return {
      width: decoded.width,
      height: decoded.height,
      pageW: Math.round(decoded.width * 0.75),
      pageH: Math.round(decoded.height * 0.75),
      compressed
    }
  })

  // Object numbering:
  // 1 = Catalog
  // 2 = Pages
  // For slide i (0-indexed):
  //   imgObj = 3 + i * 3
  //   contentObj = 4 + i * 3
  //   pageObj = 5 + i * 3
  const pageObjIds = slides.map((_, i) => 5 + i * 3)
  const totalObjects = 2 + slides.length * 3

  const chunks: Buffer[] = []
  const offsets: number[] = new Array(totalObjects + 1).fill(0)
  let bytePos = 0

  const pushStr = (s: string) => {
    const b = Buffer.from(s, 'latin1')
    chunks.push(b)
    bytePos += b.length
  }
  const pushBuf = (b: Buffer) => {
    chunks.push(b)
    bytePos += b.length
  }

  // PDF header with binary comment marker
  pushBuf(Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]))

  // 1: Catalog
  offsets[1] = bytePos
  pushStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')

  // 2: Pages
  offsets[2] = bytePos
  pushStr(
    `2 0 obj\n<< /Type /Pages /Kids [${pageObjIds.map(id => `${id} 0 R`).join(' ')}] /Count ${slides.length} >>\nendobj\n`
  )

  slides.forEach((slide, i) => {
    const imgObj = 3 + i * 3
    const contentObj = 4 + i * 3
    const pageObj = 5 + i * 3

    // Image XObject
    offsets[imgObj] = bytePos
    pushStr(
      `${imgObj} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${slide.width} /Height ${slide.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${slide.compressed.length} >>\nstream\n`
    )
    pushBuf(slide.compressed)
    pushStr('\nendstream\nendobj\n')

    // Content Stream
    const contentStr = `q\n${slide.pageW} 0 0 ${slide.pageH} 0 0 cm\n/Im0 Do\nQ\n`
    offsets[contentObj] = bytePos
    pushStr(
      `${contentObj} 0 obj\n<< /Length ${Buffer.byteLength(contentStr, 'latin1')} >>\nstream\n${contentStr}endstream\nendobj\n`
    )

    // Page Object
    offsets[pageObj] = bytePos
    pushStr(
      `${pageObj} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${slide.pageW} ${slide.pageH}] /Resources << /XObject << /Im0 ${imgObj} 0 R >> >> /Contents ${contentObj} 0 R >>\nendobj\n`
    )
  })

  // Cross-reference table
  const xrefStart = bytePos
  pushStr(`xref\n0 ${totalObjects + 1}\n`)
  pushStr('0000000000 65535 f \n')
  for (let id = 1; id <= totalObjects; id++) {
    pushStr(`${String(offsets[id]).padStart(10, '0')} 00000 n \n`)
  }

  pushStr(
    `trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`
  )

  return Buffer.concat(chunks)
}
