import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://neolifesciences.com"),
  title: "Event & Media | Neo Life Sciences",
  description:
    "Explore Neo Life Sciences' events, pharmaceutical exhibitions, international business meetings, buyer engagements and global healthcare collaborations.",
  openGraph: {
    title: "Event & Media | Neo Life Sciences",
    description:
      "Explore Neo Life Sciences' events, pharmaceutical exhibitions, international business meetings, buyer engagements and global healthcare collaborations.",
    images: [
      {
        url: "/images/events/1.jpeg",
        width: 1200,
        height: 630,
        alt: "iPHEX 2026 Opening Ceremony - Neo Life Sciences",
      },
    ],
  },
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
