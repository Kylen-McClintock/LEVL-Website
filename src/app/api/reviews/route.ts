import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string || 'verified-tester@levlhealth.com';
    const rating = formData.get('rating') as string || '5';
    const title = formData.get('title') as string || '';
    const body = formData.get('body') as string;
    const productId = (formData.get('productId') as string) || '9030713999558';

    const apiToken = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN || process.env.JUDGEME_PUBLIC_TOKEN;
    const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN || 'h1hk4t-v3.myshopify.com';

    // If Judge.me API token is configured, submit directly to Judge.me REST API
    if (apiToken) {
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

      const files = formData.getAll('pictures') as File[];
      for (const file of files) {
        if (file && file.size > 0) {
          judgeMeFormData.append('pictures[]', file);
        }
      }

      const res = await fetch('https://judge.me/api/v1/reviews', {
        method: 'POST',
        body: judgeMeFormData,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Judge.me API submission error:', errText);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Review received successfully',
    });
  } catch (error: any) {
    console.error('Failed to submit review:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
