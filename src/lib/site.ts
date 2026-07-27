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

export type Highlight = {
  /* the real figure, when the highlight has one (e.g. "18,000 sq. ft.") */
  value?: string;
  /* caption under the value, or the whole highlight when there's no figure */
  label: string;
};

export type ClubhouseSpace = {
  label: string;
  image: string;
};

export type Project = {
  slug: string;
  name: string;
  status: "Ongoing" | "Completed";
  configuration: string;
  location: string;
  rera?: string;
  blurb: string;
  highlights: Highlight[];
  /* placeholder art — swap with real Evania renders */
  image: string;
  /* real photography, when available — falls back to `image` picsum seed when absent */
  heroImage?: string;
  sitePlanImage?: string;
  gallery?: { view: string; src: string }[];
  /* project's own pin — enables the interactive map in the location section */
  coordinates?: { lat: number; lng: number };
  connectivity?: {
    place: string;
    time: string;
    lat?: number;
    lng?: number;
    category?: "Commercial" | "Healthcare" | "Connectivity" | "Education" | "Recreation & Lifestyle";
    /* preview photo for the map tooltip + mobile carousel card — placeholder art until real photography exists per landmark */
    image?: string;
  }[];
  /* 2-level clubhouse room list, when a project has one worth calling out */
  clubhouseSpaces?: ClubhouseSpace[];
  floorPlans?: { config: string; image?: string }[];
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
      "Smartly designed 3.5 & 4 BHK residences crafted for the modern duo, with sleek architecture, rooftop lounges and wellness zones — 102 residences, minutes from the Financial District.",
    highlights: [
      { label: "Club Evania" },
      { value: "102", label: "Residences" },
      { label: "Dedicated parking" },
    ],
    image: "/evania/facade.webp",
    heroImage: "/evania/rooftop.webp",
    sitePlanImage: "/evania/site-plan.webp",
    gallery: [
      { view: "balcony views", src: "/evania/facade.webp" },
      { view: "rooftop terrace", src: "/evania/rooftop.webp" },
      { view: "club evania lobby", src: "/evania/clubhouse-interior.webp" },
      { view: "mini theatre", src: "/evania/mini-theatre.webp" },
      { view: "rooftop lounge", src: "/evania/amenity-space.webp" },
      { view: "pool deck", src: "/evania/clubhouse-exterior.webp" },
    ],
    /* approximate landmark-level coordinates — good enough for a map pin, not survey-precise */
    coordinates: { lat: 17.4058, lng: 78.3389 },
    /* real connectivity figures, from the Evania landing page (avrdevelopers.in) */
    connectivity: [
      { place: "Nehru Outer Ring Road", time: "1 min", lat: 17.4104, lng: 78.3272, category: "Connectivity", image: "https://picsum.photos/seed/avr-evania-orr/400/300" },
      { place: "Neopolis", time: "2 min", lat: 17.4149, lng: 78.3324, category: "Commercial", image: "https://picsum.photos/seed/avr-evania-neopolis/400/300" },
      { place: "Financial District", time: "5 min", lat: 17.4137, lng: 78.3466, category: "Commercial", image: "https://picsum.photos/seed/avr-evania-findistrict/400/300" },
      { place: "Wipro Circle", time: "5 min", lat: 17.4419, lng: 78.3813, category: "Connectivity", image: "https://picsum.photos/seed/avr-evania-wipro/400/300" },
      { place: "Leading hospitals", time: "8 min", lat: 17.4159, lng: 78.3475, category: "Healthcare", image: "https://picsum.photos/seed/avr-evania-hospitals/400/300" },
      { place: "Leading schools", time: "10 min", lat: 17.4204, lng: 78.354, category: "Education", image: "https://picsum.photos/seed/avr-evania-schools/400/300" },
      { place: "HITEC City", time: "15 min", lat: 17.4483, lng: 78.3915, category: "Commercial", image: "https://picsum.photos/seed/avr-evania-hitec/400/300" },
      { place: "Rajiv Gandhi International Airport", time: "30 min", lat: 17.2403, lng: 78.4294, category: "Connectivity", image: "https://picsum.photos/seed/avr-evania-airport/400/300" },
    ],
    clubhouseSpaces: [
      { label: "Reception Lobby", image: "/evania/clubhouse-interior.webp" },
      { label: "Banquet Hall", image: "/evania/amenity-space.webp" },
      { label: "Indoor Games", image: "/evania/clubhouse-exterior.webp" },
      { label: "Mini Theatre", image: "/evania/mini-theatre.webp" },
      { label: "Gym", image: "/evania/clubhouse-gym.webp" },
      { label: "Yoga Room", image: "/evania/clubhouse-yoga.webp" },
      { label: "Guest Rooms", image: "/evania/guest-room_compressed.webp" },
    ],
    floorPlans: [
      {
        config: "3.5 BHK Residence",
        image: "/evania/floor-plan-gated.png",
      },
      {
        config: "4 BHK Residence",
        image: "/evania/floor-plan-gated.png",
      },
    ],
  },
  {
    slug: "avira",
    name: "Avira",
    status: "Ongoing",
    configuration: "Sky Villas & Penthouses",
    location: "Narsingi, Hyderabad",
    blurb:
      "Double-height sky villas with private decks, framing uninterrupted views across the Outer Ring Road skyline.",
    highlights: [
      { label: "Private sky decks" },
      { label: "Double-height living rooms" },
      { label: "Rooftop infinity lounge" },
      { label: "Panoramic ORR skyline views" },
      { label: "Gated low-density enclave" },
    ],
    image: "https://picsum.photos/seed/avr-avira-villa/1200/1500",
    /* same map location as Evania */
    coordinates: { lat: 17.4058, lng: 78.3389 },
    connectivity: [
      { place: "Nehru Outer Ring Road", time: "1 min", lat: 17.4104, lng: 78.3272, category: "Connectivity", image: "https://picsum.photos/seed/avr-evania-orr/400/300" },
      { place: "Neopolis", time: "2 min", lat: 17.4149, lng: 78.3324, category: "Commercial", image: "https://picsum.photos/seed/avr-evania-neopolis/400/300" },
      { place: "Financial District", time: "5 min", lat: 17.4137, lng: 78.3466, category: "Commercial", image: "https://picsum.photos/seed/avr-evania-findistrict/400/300" },
      { place: "Wipro Circle", time: "5 min", lat: 17.4419, lng: 78.3813, category: "Connectivity", image: "https://picsum.photos/seed/avr-evania-wipro/400/300" },
      { place: "Leading hospitals", time: "8 min", lat: 17.4159, lng: 78.3475, category: "Healthcare", image: "https://picsum.photos/seed/avr-evania-hospitals/400/300" },
      { place: "Leading schools", time: "10 min", lat: 17.4204, lng: 78.354, category: "Education", image: "https://picsum.photos/seed/avr-evania-schools/400/300" },
      { place: "HITEC City", time: "15 min", lat: 17.4483, lng: 78.3915, category: "Commercial", image: "https://picsum.photos/seed/avr-evania-hitec/400/300" },
      { place: "Rajiv Gandhi International Airport", time: "30 min", lat: 17.2403, lng: 78.4294, category: "Connectivity", image: "https://picsum.photos/seed/avr-evania-airport/400/300" },
    ],
    clubhouseSpaces: [
      { label: "Reception Lobby", image: "https://picsum.photos/seed/avr-avira-lobby/1000/1250" },
      { label: "Sky Lounge", image: "https://picsum.photos/seed/avr-avira-lounge/1000/1250" },
      { label: "Infinity Pool Deck", image: "https://picsum.photos/seed/avr-avira-pool/1000/1250" },
      { label: "Mini Theatre", image: "https://picsum.photos/seed/avr-avira-theatre/1000/1250" },
      { label: "Gym", image: "https://picsum.photos/seed/avr-avira-gym/1000/1250" },
      { label: "Guest Rooms", image: "https://picsum.photos/seed/avr-avira-guest/1000/1250" },
    ],
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
