import { productContent } from '../content/productLongevity';

export interface JudgeMeReview {
  id: string | number;
  name: string;
  rating: number;
  title?: string;
  body: string;
  verifiedType?: string;
  createdAt?: string;
}

export async function getJudgeMeReviews(productId: string = "9030713999558"): Promise<{
  reviews: JudgeMeReview[];
  averageRating: number;
  totalReviews: number;
}> {
  const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN || "h1hk4t-v3.myshopify.com";
  const apiToken = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN || process.env.JUDGEME_PUBLIC_TOKEN;

  // If Public Token is present, fetch live from Judge.me API
  if (apiToken) {
    try {
      const res = await fetch(
        `https://judge.me/api/v1/reviews?api_token=${apiToken}&shop_domain=${shopDomain}&product_id=${productId}&per_page=50`,
        { next: { revalidate: 60 } }
      );
      
      if (res.ok) {
        const data = await res.json();
        if (data.reviews && data.reviews.length > 0) {
          const formattedReviews: JudgeMeReview[] = data.reviews.map((r: any) => ({
            id: r.id,
            name: r.reviewer?.name || r.name || "Verified Reviewer",
            rating: r.rating || 5,
            title: r.title,
            body: r.body,
            verifiedType: r.verified_buyer ? "Verified Buyer" : "Verified Tester",
            createdAt: r.created_at
          }));

          const avg = formattedReviews.reduce((sum, r) => sum + r.rating, 0) / formattedReviews.length;

          return {
            reviews: formattedReviews,
            averageRating: Math.round(avg * 10) / 10,
            totalReviews: formattedReviews.length
          };
        }
      }
    } catch (e) {
      console.error("Error fetching live Judge.me reviews:", e);
    }
  }

  // Fallback to the 5 imported tester reviews in productContent
  const fallbackReviews: JudgeMeReview[] = productContent.reviews.map((r, i) => ({
    id: i + 1,
    name: r.name,
    rating: r.rating,
    body: r.quote,
    verifiedType: r.type || "Verified Beta Tester",
    createdAt: "August 2026"
  }));

  return {
    reviews: fallbackReviews,
    averageRating: 5.0,
    totalReviews: fallbackReviews.length
  };
}
