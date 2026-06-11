import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Source_Serif_4 } from "next/font/google";
import ConditionalSiteChrome from "@/components/ConditionalSiteChrome";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.consortiumName} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/images/logo-on3rd-outreach.png",
    apple: "/images/logo-on3rd-outreach.png",
  },
  keywords: [
    "municipal blockchain",
    "civic infrastructure",
    "government transparency",
    "workforce development",
    "nonprofit",
    "blockchain consortium",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${sourceSerif.variable}`}
    >
      <body className="font-sans">
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
