import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LEVL: OutPace Aging | Personalized Longevity Protocols App",
  description:
    "Longevity Science, Calibrated to Your Biology. Identify what actually works to slow your pace of aging with personalized leading protocols, live biometric applets, and 8-Vector scoring.",
  openGraph: {
    title: "LEVL: OutPace Aging | Personalized Longevity Protocols App",
    description:
      "Longevity Science, Calibrated to Your Biology. Identify what actually works to slow your pace of aging across all 8 biological vectors and 12 Hallmarks of Aging.",
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
      "Longevity Science, Calibrated to Your Biology. Identify what actually works to slow your pace of aging in LEVL: OutPace Aging.",
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
