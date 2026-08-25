import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = (formData.get('name') as string) || 'Verified Customer';
    const email = (formData.get('email') as string) || 'customer@levlhealth.com';
    const ratingStr = (formData.get('rating') as string) || '5';
    const title = (formData.get('title') as string) || 'Verified Experience';
    const body = formData.get('body') as string;
    const productId = (formData.get('productId') as string) || '9030713999558';

    const privateToken = process.env.JUDGEME_PRIVATE_TOKEN || process.env.NEXT_PUBLIC_JUDGEME_PRIVATE_TOKEN || '9zdfl2PGLVRJimMI6EtvzLmT3Qo';
    const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN || 'h1hk4t-v3.myshopify.com';

    // Convert attached files to base64 data URIs for Judge.me picture_urls
    const pictureUrls: string[] = [];
    const files = formData.getAll('pictures') as File[];
    
    for (const file of files) {
      if (file && typeof file === 'object' && 'size' in file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const mimeType = file.type || 'image/jpeg';
        const base64Data = buffer.toString('base64');
        pictureUrls.push(`data:${mimeType};base64,${base64Data}`);
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
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
