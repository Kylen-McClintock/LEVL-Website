import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LEVL OS | Circadian-Aligned Longevity Protocols App",
  description:
    "Your Biology Runs on a Clock. Now Your Longevity Protocol Does Too. Explore 100+ clinically graded modalities, adopt Mastermind stacks in one tap, and track all 8 biological vectors of aging.",
  openGraph: {
    title: "LEVL OS | Circadian-Aligned Longevity Protocols App",
    description:
      "Combining Mastermind Protocols, 8-Vector Biological Scoring, Grade-A PubMed Clinical Evidence, and an Adaptive 80/20 Routine Governor into one precision daily companion.",
    url: "https://www.levlhealth.com/app",
    siteName: "LEVL Health",
    images: [
      {
        url: "https://www.levlhealth.com/images/protocol_app_visual_v2.png",
        width: 1200,
        height: 630,
        alt: "LEVL Longevity Protocols App Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEVL OS | Circadian-Aligned Longevity Protocols App",
    description:
      "Your Biology Runs on a Clock. Now Your Longevity Protocol Does Too. Explore 100+ RCT-anchored longevity modalities.",
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
