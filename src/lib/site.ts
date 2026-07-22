/**
 * Central content + config for AVR Developers.
 * Single source of truth for nav, projects, and contact details so the
 * markup, metadata, and JSON-LD never drift apart.
 */

export const site = {
  name: "AVR Developers",
  legalName: "AVR Developers",
  tagline: "The Address for the Young Spirited",
  description:
    "AVR Developers crafts future-ready homes in Hyderabad. Discover Evania, luxury 3.5 & 4 BHK residences in Kokapet built for the young spirited.",
  url: "https://avrdevelopers.com",
  email: "info@avrdevelopers.com",
  phones: ["+91 80000 82399", "+91 8889 666678"],
  address: {
    line1: "Evania by AVR, SY NO 3, Pipe Line Road",
    locality: "Kokapet",
    region: "Hyderabad",
    postalCode: "500075",
    country: "IN",
  },
  socials: {
    facebook: "https://facebook.com/avrdevelopers",
    instagram: "https://instagram.com/avrdevelopers",
    x: "https://x.com/avrdevelopers",
    youtube: "https://youtube.com/@avrdevelopers",
  },
} as const;

export type Project = {
  slug: string;
  name: string;
  status: "Ongoing" | "Completed";
  configuration: string;
  location: string;
  rera?: string;
  blurb: string;
  highlights: string[];
  /* placeholder art — swap with real Evania renders */
  image: string;
  /* real photography, when available — falls back to `image` picsum seed when absent */
  heroImage?: string;
  sitePlanImage?: string;
  gallery?: { view: string; src: string }[];
  connectivity?: { place: string; time: string }[];
};

export const projects: Project[] = [
  {
    slug: "evania",
    name: "Evania",
    status: "Ongoing",
    configuration: "3.5 & 4 BHK Residences",
    location: "Kokapet, Hyderabad",
    rera: "TG RERA P02400009394",
    blurb:
      "Smartly designed 3.5 & 4 BHK residences crafted for the modern duo, with sleek architecture, rooftop lounges and wellness zones — 34 floors, 102 residences, minutes from the Financial District.",
    highlights: [
      "18,000 sq. ft. Club Evania",
      "34 floors, 102 residences",
      "3,315–3,575 sq. ft. homes",
      "6-level dedicated parking",
      "Rooftop terrace & cigar lounge",
    ],
    image: "https://picsum.photos/seed/avr-evania-tower/1200/1500",
    heroImage: "/evania/rooftop.webp",
    sitePlanImage: "/evania/site-plan.webp",
    gallery: [
      { view: "facade", src: "/evania/facade.webp" },
      { view: "courtyard", src: "/evania/amenity-space.webp" },
      { view: "pool", src: "/evania/clubhouse-exterior.webp" },
      { view: "living", src: "/evania/clubhouse-yoga.webp" },
      { view: "club", src: "/evania/clubhouse-interior.webp" },
    ],
    connectivity: [
      { place: "Nehru Outer Ring Road", time: "1 min" },
      { place: "Neopolis", time: "2 min" },
      { place: "Financial District", time: "5 min" },
      { place: "Gachibowli", time: "5 min" },
      { place: "HITEC City", time: "15 min" },
      { place: "Lingampally Railway Station", time: "20 min" },
      { place: "RGI Airport", time: "35 min" },
    ],
  },
  {
    slug: "aurelia",
    name: "Aurelia",
    status: "Ongoing",
    configuration: "Sky Villas & Penthouses",
    location: "Narsingi, Hyderabad",
    blurb:
      "Double-height sky villas with private decks, framing uninterrupted views across the Outer Ring Road skyline.",
    highlights: [
      "Private sky decks",
      "Double-height living rooms",
      "Rooftop infinity lounge",
      "Panoramic ORR skyline views",
      "Gated low-density enclave",
    ],
    image: "https://picsum.photos/seed/avr-aurelia-villa/1200/1500",
  },
];

/** Delivered projects (no detail page — shown on /projects for track record). */
export const completedProjects: Project[] = [
  {
    slug: "serene-heights",
    name: "Serene Heights",
    status: "Completed",
    configuration: "2 & 3 BHK Apartments",
    location: "Manikonda, Hyderabad",
    blurb: "A gated community built around a central green, handed over and lived-in.",
    highlights: [],
    image: "https://picsum.photos/seed/avr-serene/1200/1500",
  },
  {
    slug: "the-terraces",
    name: "The Terraces",
    status: "Completed",
    configuration: "3 BHK Duplexes",
    location: "Kondapur, Hyderabad",
    blurb: "Terraced duplexes that have since settled into a quiet neighbourhood.",
    highlights: [],
    image: "https://picsum.photos/seed/avr-terraces/1200/1500",
  },
];

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

/** Primary navigation. Left cluster + right cluster flank the centered logo. */
export const nav: { left: NavItem[]; right: NavItem[] } = {
  left: [
    { label: "Home", href: "/" },
    {
      label: "Projects",
      href: "/projects",
      children: projects.map((p) => ({ label: p.name, href: `/${p.slug}` })),
    },
    { label: "Our Values", href: "/values" },
  ],
  right: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};
