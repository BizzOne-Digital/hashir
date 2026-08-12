import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CinematicIntro from "@/components/animations/CinematicIntro";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MLKS Delivery Solutions | Reliable Pharmacy & Business Delivery Services",
  description: "Modern delivery solutions for pharmacies, healthcare providers, and businesses requiring secure, timely, and carefully coordinated transportation in Ontario.",
  keywords: ["delivery service", "pharmacy delivery", "healthcare delivery", "business delivery", "Ontario delivery", "secure packaging", "express delivery"],
  authors: [{ name: "MLKS Delivery Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://mlksdelivery.com",
    siteName: "MLKS Delivery Solutions",
    title: "MLKS Delivery Solutions | Reliable Pharmacy & Business Delivery",
    description: "Modern delivery solutions for pharmacies, healthcare providers, and businesses in Ontario.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden`}
    >
      <body className="antialiased overflow-x-hidden w-full">
        <CinematicIntro />
        <div className="overflow-x-hidden w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
