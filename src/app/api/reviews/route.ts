import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = (formData.get('name') as string) || 'Verified Customer';
    const email = (formData.get('email') as string) || 'customer@levlhealth.com';
    const rating = (formData.get('rating') as string) || '5';
    const title = (formData.get('title') as string) || 'Verified Review';
    const body = formData.get('body') as string;
    const productId = (formData.get('productId') as string) || '9030713999558';

    const apiToken = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN || process.env.JUDGEME_PUBLIC_TOKEN || 'Sgsy_Knj8JEYIGZBCJ7Qhxck9sk';
    const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN || 'h1hk4t-v3.myshopify.com';

    // Submit review directly to Judge.me API
    const judgeMeFormData = new FormData();
    judgeMeFormData.append('api_token', apiToken);
    judgeMeFormData.append('shop_domain', shopDomain);
    judgeMeFormData.append('platform', 'shopify');
    judgeMeFormData.append('id', productId);
    judgeMeFormData.append('name', name);
    judgeMeFormData.append('email', email);
    judgeMeFormData.append('rating', rating);
    judgeMeFormData.append('title', title);
    judgeMeFormData.append('body', body);

    // Append all media files (pictures/videos)
    const files = formData.getAll('pictures') as File[];
    for (const file of files) {
      if (file && typeof file === 'object' && 'size' in file && file.size > 0) {
        judgeMeFormData.append('pictures[]', file, file.name);
      }
    }

    const res = await fetch('https://judge.me/api/v1/reviews', {
      method: 'POST',
      body: judgeMeFormData,
    });

    const responseText = await res.text();
    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // response might be raw text
    }

    if (!res.ok) {
      console.error('Judge.me API submission returned non-OK status:', res.status, responseText);
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
