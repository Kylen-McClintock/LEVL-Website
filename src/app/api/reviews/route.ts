import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30; // Allow sufficient execution time for image uploads and processing

async function uploadToPublicUrl(file: File): Promise<string | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || 'image/jpeg';
    const ext = mimeType.includes('png') ? 'png' : 'jpg';

    const fd = new FormData();
    fd.append('reqtype', 'fileupload');
    fd.append('time', '24h');
    fd.append('fileToUpload', new Blob([buffer], { type: mimeType }), `review_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${ext}`);

    const res = await fetch('https://litterbox.catbox.moe/resources/internals/api.php', {
      method: 'POST',
      body: fd,
    });

    if (res.ok) {
      const url = (await res.text()).trim();
      if (url.startsWith('http')) {
        return url;
      }
    }
  } catch (err) {
    console.error('Error uploading image to public host:', err);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = (formData.get('name') as string)?.trim() || 'Verified Customer';
    const rawEmail = (formData.get('email') as string)?.trim();
    // Unique fallback email prevents Judge.me spam filters from grouping/dropping submissions
    const email = rawEmail && rawEmail.includes('@') ? rawEmail : `reviewer_${Date.now()}@levlhealth.com`;
    const ratingStr = (formData.get('rating') as string) || '5';
    const title = (formData.get('title') as string)?.trim() || 'Verified Experience';
    const body = (formData.get('body') as string)?.trim();
    const productId = (formData.get('productId') as string) || '9030713999558';

    if (!body) {
      return NextResponse.json({ success: false, error: 'Review body is required' }, { status: 400 });
    }

    const privateToken = process.env.JUDGEME_PRIVATE_TOKEN || process.env.NEXT_PUBLIC_JUDGEME_PRIVATE_TOKEN || '9zdfl2PGLVRJimMI6EtvzLmT3Qo';
    const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN || 'h1hk4t-v3.myshopify.com';

    // Upload attached files to temporary public URLs so Judge.me can download and ingest them
    const pictureUrls: string[] = [];
    const files = formData.getAll('pictures') as File[];
    
    for (const file of files) {
      if (file && typeof file === 'object' && 'size' in file && file.size > 0) {
        const publicUrl = await uploadToPublicUrl(file);
        if (publicUrl) {
          pictureUrls.push(publicUrl);
        }
      }
    }

    const payload: Record<string, any> = {
      shop_domain: shopDomain,
      platform: 'shopify',
      id: parseInt(productId, 10) || 9030713999558,
      name: name,
      email: email,
      rating: parseInt(ratingStr, 10) || 5,
      title: title,
      body: body,
    };

    if (pictureUrls.length > 0) {
      payload.picture_urls = pictureUrls;
    }

    const judgeMeUrl = `https://judge.me/api/v1/reviews?api_token=${privateToken}&shop_domain=${shopDomain}`;
    const res = await fetch(judgeMeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // ignore
    }

    if (!res.ok) {
      console.error('Judge.me review creation error:', res.status, responseText);
      return NextResponse.json({
        success: false,
        error: responseJson?.message || responseText || 'Failed to submit review to Judge.me',
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: responseJson?.message || 'Review submitted successfully to Judge.me',
      data: responseJson,
    });
  } catch (error: any) {
    console.error('Failed to submit review:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
