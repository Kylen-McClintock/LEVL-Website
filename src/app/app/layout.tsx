import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LEVL: OutPace Aging | Personalized Longevity Protocols App",
  description:
    "Longevity Science, Calibrated to Your Biology. Outpace aging by adapting leading longevity protocols to your personal biology with 8-Vector scoring and circadian alignment.",
  openGraph: {
    title: "LEVL: OutPace Aging | Personalized Longevity Protocols App",
    description:
      "Longevity Science, Calibrated to Your Biology. Follow leading longevity protocols personalized to your biology, 8-Vector Biological Scoring, Grade-A PubMed Clinical Evidence, and an Adaptive 80/20 Routine Governor.",
    url: "https://www.levlhealth.com/app",
    siteName: "LEVL Health",
    images: [
      {
        url: "https://www.levlhealth.com/images/protocol_app_visual_v2.png",
        width: 1200,
        height: 630,
        alt: "LEVL: OutPace Aging — Personalized Longevity Protocols App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEVL: OutPace Aging | Personalized Longevity Protocols App",
    description:
      "Longevity Science, Calibrated to Your Biology. Explore 100+ RCT-anchored longevity modalities in LEVL: OutPace Aging.",
    images: ["https://www.levlhealth.com/images/protocol_app_visual_v2.png"],
  },
};

export default function AppShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
