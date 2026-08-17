import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "NEO LIFE SCIENCES PVT LTD | International Pharmaceutical Traders & Exporters — India",
  description:
    "B2B pharmaceutical trading and export company based in Hyderabad, India. WHO-GMP certified generics, medical devices, APIs, and Ayurvedic formulations to 50+ countries worldwide.",
  keywords: [
    "pharmaceutical exporter India",
    "WHO-GMP generics exporter",
    "ayurvedic medicine exporter",
    "medical device exporter India",
    "bulk drug exporter Hyderabad",
    "API exporter India",
    "pharmaceutical trading company India",
    "B2B pharma export",
  ],
  openGraph: {
    title: "NEO LIFE SCIENCES PVT LTD",
    description: "International Pharmaceutical Traders & Exporters from India.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-cream text-ink font-jakarta antialiased selection:bg-gold/30 selection:text-ink">{children}</body>
    </html>
  );
}
