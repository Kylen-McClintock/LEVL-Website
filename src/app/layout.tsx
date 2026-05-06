import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEVL | OutPace Aging",
  description: "Advanced longevity supplements to extend healthy lifespan. Better nights, more tomorrows.",
  metadataBase: new URL('https://www.levlhealth.com'),
  openGraph: {
    title: "LEVL | OutPace Aging",
    description: "Advanced longevity supplements to extend healthy lifespan. Better nights, more tomorrows.",
    url: 'https://www.levlhealth.com',
    siteName: 'LEVL Health',
    images: [
      {
        url: 'https://www.levlhealth.com/images/deepcell-bottle.jpg',
        width: 1200,
        height: 630,
        alt: 'LEVL LIFESPAN+ DeepCell',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "LEVL | OutPace Aging",
    description: "Advanced longevity supplements to extend healthy lifespan. Better nights, more tomorrows.",
    images: ['https://www.levlhealth.com/images/deepcell-bottle.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} antialiased bg-brand-dark text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
