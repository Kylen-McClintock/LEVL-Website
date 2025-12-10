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
