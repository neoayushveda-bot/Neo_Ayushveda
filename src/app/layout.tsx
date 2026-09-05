import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEO LIFE SCIENCES PVT LTD | International Pharmaceutical Exporters — India",
  description:
    "Neo Life Sciences is a Hyderabad, India-based B2B pharmaceutical exporter sourcing WHO-GMP, EU-GMP, US-FDA, PIC/S, other SRAs certified APIs, Finished Pharmaceutical Formulations, Speciality Therapeutics, Injectables, Biologics, Nutraceuticals, and Medical Devices to 50+ countries worldwide.",
  keywords: [
    "pharmaceutical exporter India",
    "international pharmaceutical exporters",
    "WHO-GMP generics exporter",
    "ayurvedic medicine exporter",
    "medical device exporter India",
    "bulk drug exporter Hyderabad",
    "API exporter India",
    "pharmaceutical export company India",
    "B2B pharma export",
    "CTD dossier pharmaceutical export",
  ],
  openGraph: {
    title: "NEO LIFE SCIENCES PVT LTD",
    description: "International Pharmaceutical Exporters from India.",
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
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable} scroll-smooth`}
    >
      <body className="bg-white text-slate-900 font-sans antialiased selection:bg-[#003A95]/15 selection:text-[#003A95]">
        {children}
      </body>
    </html>
  );
}
