export interface JudgeMeReview {
  id: string | number;
  name: string;
  rating: number;
  title?: string;
  body: string;
  verifiedType?: string;
  date: string;
  rawDate?: string;
  pictures?: string[];
}

export interface JudgeMeData {
  reviews: JudgeMeReview[];
  averageRating: number;
  totalReviews: number;
}

export async function getJudgeMeReviews(
  productHandle: string = "lifespan-deepcell",
  productId: string = "9030713999558"
): Promise<JudgeMeData> {
  const publicToken = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN || "Sgsy_Knj8JEYIGZBCJ7Qhxck9sk";
  const shopDomain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN || "h1hk4t-v3.myshopify.com";

  try {
    const url = `https://judge.me/api/v1/widgets/product_review?api_token=${publicToken}&shop_domain=${shopDomain}&handle=${productHandle}`;
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate cache every 60 seconds
    });

    if (res.ok) {
      const data = await res.json();
      const html = data.widget;

      if (html) {
        const reviewBlocks = html.split("<div class='jdgm-rev jdgm-divider-top'").slice(1);

        if (reviewBlocks.length > 0) {
          const parsedReviews: JudgeMeReview[] = reviewBlocks.map((block: string, i: number) => {
            const authorMatch = block.match(/class='jdgm-rev__author'[^>]*>([^<]+)</);
            const dateMatch = block.match(/datetime='([^']+)'/) || block.match(/data-content='([^']+)'/);
            const titleMatch = block.match(/class='jdgm-rev__title'[^>]*>([^<]+)</);
            const bodyMatch = block.match(/class='jdgm-rev__body'[^>]*>([\s\S]*?)<\/div>/);
            const scoreMatch = block.match(/data-score='([^']+)'/);
            const verifiedMatch = block.match(/data-verified-buyer='true'/);

            // Extract review photos if any
            const photoLinks = Array.from(block.matchAll(/href='(https?:\/\/[^']+\.(?:png|jpg|jpeg|webp))'/gi)).map(m => m[1]);
            const photoImgs = Array.from(block.matchAll(/src='(https?:\/\/[^']+\.(?:png|jpg|jpeg|webp))'/gi)).map(m => m[1]);
            const pictures = photoLinks.length > 0 ? photoLinks : (photoImgs.length > 0 ? photoImgs : undefined);

            const rawDate = dateMatch ? dateMatch[1] : null;
            let formattedDate = "August 2026";
            if (rawDate) {
              const d = new Date(rawDate);
              if (!isNaN(d.getTime())) {
                formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              }
            }

            // Decode HTML entities in title & body
            const decodeHtml = (str: string) => str
              .replace(/&#39;/g, "'")
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');

            return {
              id: i + 1,
              name: authorMatch ? authorMatch[1].trim() : "Verified Tester",
              date: formattedDate,
              rawDate: rawDate || undefined,
              title: titleMatch ? decodeHtml(titleMatch[1].trim()) : "",
              body: bodyMatch ? decodeHtml(bodyMatch[1].replace(/<[^>]+>/g, "").trim()) : "",
              rating: scoreMatch ? parseInt(scoreMatch[1], 10) : 5,
              verifiedType: verifiedMatch ? "Verified Buyer" : "Verified Beta Tester",
              pictures: pictures && pictures.length > 0 ? pictures : undefined,
            };
          });

          const avgRating = data.average_rating ? parseFloat(data.average_rating) : 5.0;
          const totalCount = data.number_of_reviews ? parseInt(data.number_of_reviews, 10) : parsedReviews.length;

          return {
            reviews: parsedReviews,
            averageRating: Math.round(avgRating * 10) / 10,
            totalReviews: totalCount,
          };
        }
      }
    }
  } catch (error) {
    console.error("Error fetching live Judge.me reviews:", error);
  }

  // Graceful fallback if network fails
  return {
    reviews: [
      {
        id: 1,
        name: "Michelle G.",
        date: "Aug 25, 2026",
        title: "Actually Woke Up Rested",
        body: "I fell asleep quickly, and actually stayed asleep the entire night. As a young mom, waking up feeling actually rested was so refreshing.",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
      {
        id: 2,
        name: "Aaron M.",
        date: "Aug 23, 2026",
        title: "Better Sleep and Feeling Stronger",
        body: "I drift into dreamland pretty easily again. From a physical standpoint, I’m gaining and retaining muscle mass easier and I haven’t done a grip strength test but my overall health outcomes seem to have leveled up since starting a nightly regiment of LEVL.",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
      {
        id: 3,
        name: "Lisa M.",
        date: "Aug 20, 2026",
        title: "Best Sleep I've Had in Years",
        body: "2 Capsules turned out to be perfect. It was the best night of sleep I may have ever had in years",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
      {
        id: 4,
        name: "Cathleen L.",
        date: "Aug 19, 2026",
        title: "Sleeping Through the Night Again",
        body: "As a postmenopausal woman I was frustrated with experiencing nights of difficulty falling asleep, staying asleep or just broken sleep. Then I tried LEVL’s DeepCell product. I was looking for a drug free sleep aid so that I would wake up rested and ready to start my day. DeepCell was the perfect choice. Beginning on night 1, I took the recommended dosage and actually felt myself drifting off into a relaxed state. Next thing I know it's a new day. I experienced a restful night which I hadn't encountered in a long time. I take LEVL on a regular schedule and can honestly say I feel so much better in the morning after sleeping through the night.",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
      {
        id: 5,
        name: "Andrea S.",
        date: "Aug 19, 2026",
        title: "Finally Falling Asleep Without Grogginess",
        body: "LEVL’s DeepCell product has worked tremendously for me. I typically have a hard time falling asleep, often lying awake for hours, but since I started using this, I’ve noticed a huge difference. Within an hour of taking the supplement, I feel relaxed and a sleepy wave comes over me. I’m able to drift off without the usual tossing and turning. What I love most is that I wake up feeling refreshed and energized, never groggy or drowsy. It’s been a total game changer for my nightly routine.",
        rating: 5,
        verifiedType: "Verified Beta Tester",
      },
    ],
    averageRating: 5.0,
    totalReviews: 5,
  };
}
