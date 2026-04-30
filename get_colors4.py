from PIL import Image

img = Image.open("/Users/kylenmcclintock/.gemini/antigravity/brain/f31cce1e-2a1e-48b0-be10-6be867635ca1/media__1777507922559.png")
width, height = img.size

def to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

x = int(width * 0.05)
for y in range(0, 50):
    rgb = img.getpixel((x, y))[:3]
    print(f"Y={y}: {to_hex(rgb)}")
