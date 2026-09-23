export interface MediaStory {
  id: number;
  slug: string;
  image: string;
  category: string; // Eyebrow category
  title: string;
  description: string;
  badge: string; // "iPHEX-2026"
  filterCategories: FilterCategoryKey[];
  meta: {
    event: string;
    schedule: string;
    hallStall: string;
    location: string;
  };
}

export type FilterCategoryKey =
  | "All"
  | "Highlights"
  | "Exhibition Stall & Portfolio"
  | "B2B Buyer Discussion"
  | "Inauguration & Ministerial";

export interface EventDetailInfo {
  name: string;
  fullTitle: string;
  tagline: string;
  dates: string;
  scheduleValue: string;
  venueName: string;
  venueAddress: string;
  stallHall: string;
  stallDetail: string;
  organizedBy: string;
  organizedBySub: string;
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
}

export const IPHEX_EVENT_INFO: EventDetailInfo = {
  name: "iPHEX 2026",
  fullTitle: "iPHEX 2026 — Powering Healthcare. Connecting Markets.",
  tagline: "Bharat Health Global Expo 2026",
  dates: "7 – 9 September 2026",
  scheduleValue: "B2B Summit",
  venueName: "Bharat Mandapam",
  venueAddress: "Pragati Maidan, New Delhi, India",
  stallHall: "Hall: 3FF | Stall: 3FC-07",
  stallDetail: "Hall: 3FF • Stall: 3FC-07",
  organizedBy: "Pharmexcil",
  organizedBySub: "Ministry of Commerce & Industry, Govt. of India",
  heroEyebrow: "EVENT / MEDIA",
  heroHeading: "iPHEX 2026 — Powering Healthcare. Connecting Markets.",
  heroDescription:
    "Neo Life Sciences Pvt. Ltd. (formerly known as Neo Ayushveda) proudly engaged with global delegates, regulatory authorities and international buyers at India’s flagship pharmaceutical exhibition, fostering meaningful connections and exploring global business opportunities.",
};

export const FILTER_CATEGORIES: { key: FilterCategoryKey; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Highlights", label: "Highlights" },
  { key: "Exhibition Stall & Portfolio", label: "Exhibition Stall & Portfolio" },
  { key: "B2B Buyer Discussion", label: "B2B Buyer Discussion" },
  { key: "Inauguration & Ministerial", label: "Inauguration & Ministerial" },
];

export const MEDIA_STORIES: MediaStory[] = [
  {
    id: 1,
    slug: "iphex-2026-opening-ceremony",
    image: "/images/events/1.jpeg",
    category: "INAUGURATION",
    title: "iPHEX 2026 Opening Ceremony",
    description:
      "Inauguration of iPHEX 2026, by Hon’ble Union Minister for Commerce & Industry – Mr. Piyush Goyal through the traditional lighting of the ceremonial lamp. bringing together industry leaders, policymakers, pharmaceutical manufacturers and global healthcare stakeholders, setting the stage for three days of meaningful industry engagement and international collaboration",
    badge: "iPHEX-2026",
    filterCategories: ["Highlights", "Inauguration & Ministerial"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 2,
    slug: "global-healthcare-dialogue",
    image: "/images/events/2.jpeg",
    category: "POLICY & INDUSTRY",
    title: "Global Healthcare Dialogue",
    description:
      "Hon’ble Minister - Emphasized trust, innovation, partnership, and equitable global access as Core Pillars. Urged the industry to push R&D, patent indigenous products, and focus on biosimilars and biotech.",
    badge: "iPHEX-2026",
    filterCategories: ["Inauguration & Ministerial"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 3,
    slug: "keynote-address-mos-commerce-industry",
    image: "/images/events/3.jpeg",
    category: "KEY NOTE ADDRESS",
    title: "By Minister of State for Commerce and Industry – Mr. Jitin Prasada",
    description:
      "highlighting greater global collaboration in pharmaceuticals and healthcare, labeling iPHEX the \"Mother of All Exhibitions.\" Reaffirmed India's status as the trusted \"Pharmacy of the World”.",
    badge: "iPHEX-2026",
    filterCategories: ["Highlights", "Inauguration & Ministerial"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 4,
    slug: "international-buyer-engagement",
    image: "/images/events/4.jpeg",
    category: "B2B NETWORKING",
    title: "International Buyer Engagement",
    description:
      "Connecting with international delegates and business representatives to explore pharmaceutical sourcing and distribution opportunities for Neo.",
    badge: "iPHEX-2026",
    filterCategories: ["B2B Buyer Discussion"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 5,
    slug: "international-business-connections",
    image: "/images/events/5.jpeg",
    category: "B2B NETWORKING",
    title: "International Business Connections",
    description:
      "Building meaningful relationships with international healthcare professionals and exploring opportunities for global collaboration, especially in WANA countries.",
    badge: "iPHEX-2026",
    filterCategories: ["Highlights", "B2B Buyer Discussion"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 6,
    slug: "connecting-across-markets",
    image: "/images/events/6.jpeg",
    category: "GLOBAL NETWORKING",
    title: "Connecting Across Markets",
    description:
      "Strengthening international business relationships through discussions with global pharmaceutical stakeholders.",
    badge: "iPHEX-2026",
    filterCategories: ["B2B Buyer Discussion"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 7,
    slug: "bilateral-business-discussions",
    image: "/images/events/7.jpeg",
    category: "B2B MEETINGS",
    title: "Bilateral Business Discussions",
    description:
      "Engaging in focused discussions with international delegates to understand market requirements and explore potential partnerships.",
    badge: "iPHEX-2026",
    filterCategories: ["Highlights", "B2B Buyer Discussion"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 8,
    slug: "neo-life-sciences-at-iphex-2026",
    image: "/images/events/8.jpeg",
    category: "EXHIBITION HIGHLIGHTS",
    title: "Neo Life Sciences at iPHEX 2026",
    description:
      "Showcasing our pharmaceutical sourcing and export capabilities to visitors and international delegates at our exhibition stall.",
    badge: "iPHEX-2026",
    filterCategories: ["Exhibition Stall & Portfolio"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 9,
    slug: "building-relationships-beyond-business",
    image: "/images/events/9.jpeg",
    category: "CUSTOMER ENGAGEMENT",
    title: "Building Relationships Beyond Business",
    description:
      "Creating meaningful connections with customers and partners across global markets.",
    badge: "iPHEX-2026",
    filterCategories: ["Exhibition Stall & Portfolio"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 10,
    slug: "pharmaceutical-business-discussions",
    image: "/images/events/10.jpeg",
    category: "BUYER–SELLER MEET",
    title: "Pharmaceutical Business Discussions",
    description:
      "Discussing healthcare requirements, product portfolios and potential business opportunities with prospective partners.",
    badge: "iPHEX-2026",
    filterCategories: ["Highlights", "Exhibition Stall & Portfolio"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
  {
    id: 11,
    slug: "focused-business-meetings",
    image: "/images/events/11.jpeg",
    category: "B2B NETWORKING",
    title: "Focused Business Meetings",
    description:
      "Productive discussions with industry professionals focused on pharmaceutical sourcing, market opportunities and collaboration.",
    badge: "iPHEX-2026",
    filterCategories: ["Exhibition Stall & Portfolio"],
    meta: {
      event: "iPHEX-2026",
      schedule: "B2B Summit",
      hallStall: "Hall: 3FF | Stall: 3FC-07",
      location: "Bharat Mandapam, New Delhi",
    },
  },
];
