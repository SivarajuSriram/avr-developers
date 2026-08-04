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

/* icon names rendered by the Amenities section — mapped to lucide-react components in amenities.tsx */
export type AmenityIconName =
  | "armchair"
  | "waves"
  | "dumbbell"
  | "treepine"
  | "puzzle"
  | "shield"
  | "zap"
  | "leaf"
  | "clapperboard"
  | "party"
  | "pawprint"
  | "trophy"
  | "landmark"
  | "sparkles";

export type AmenityItem = { icon: AmenityIconName; label: string };

export type Project = {
  slug: string;
  /* short identity — used in nav, captions, alt text, JSON-LD. Keep it a real name. */
  name: string;
  /* big hero headline on the project page; falls back to `name` when unset. Use "|" to force a line break, e.g. "Line one|Line two" */
  headline?: string;
  status: "Ongoing" | "Completed";
  configuration: string;
  rera?: string;
  /* short teaser — homepage hover card + SEO/JSON-LD description. Keep it brief. */
  blurb: string;
  /* long copy for the project page's About section; falls back to `blurb` when unset. Separate multiple paragraphs with a blank line ("\n\n") */
  about?: string;
  /* supporting image next to the About heading; falls back to `image` when unset */
  aboutImage?: string;
  /* set true when aboutImage is a transparent cut-out/render rather than a photo — renders uncropped, without the photo-card frame */
  aboutImageContain?: boolean;
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
  /* real amenity list for this project; falls back to a generic placeholder set when unset */
  amenityItems?: AmenityItem[];
  /* optional YouTube walkthrough, shown right after the Amenities section — omit if there's no video for this project */
  videoId?: string;
  videoTitle?: string;
  /* 2-level clubhouse room list, when a project has one worth calling out */
  clubhouseSpaces?: ClubhouseSpace[];
  floorPlans?: { config: string; image?: string }[];

  /* --- per-section copy overrides. Each falls back to shared default copy when unset. Headings support "|" to force a line break. --- */
  aboutHeading?: string;
  amenitiesHeading?: string;
  clubEyebrow?: string;
  clubHeading?: string;
  clubBody?: string;
  /* used instead of clubHeading/clubBody only when clubhouseSpaces is empty (no gallery to show) */
  noClubhouseHeading?: string;
  noClubhouseBody?: string;
  floorPlansHeading?: string;
  galleryHeading?: string;
  locationHeading?: string;
};

export const projects: Project[] = [
  {
    slug: "evania",
    name: "Evania",
    headline: "The Address For|The Young Spirited",
    amenitiesHeading: "A 360° Experience",
    clubEyebrow: "2-Level Clubhouse",
    clubHeading: "Your Private Haven of Leisure",
    clubBody:
      "A thoughtfully curated clubhouse that offers spaces to relax, rejuvenate, and reconnect. Every corner is designed to complement your lifestyle and create meaningful experiences close to home.",
    status: "Ongoing",
    configuration: "3.5 & 4 BHK Residences",
    rera: "TG RERA P02400009394",
    blurb:
      "AVR Evania brings premium apartments in Kokapet designed around mindful living, with intelligent architecture, open spaces, and effortless comfort. Discover elegant 3.5 BHK and expansive 4 BHK apartments in Kokapet, where luxury meets flexibility, wellness, and everyday experiences.",
    /* full copy from the Evania landing page (avrdevelopers.in) */
    about:
      "Today’s young couples aren’t following old scripts; they’re creating lives that feel more personal, intentional, and free. At AVR Evania, discover luxury apartments in Kokapet designed for modern lifestyles that value flexibility, wellness, and meaningful experiences. From breathable spaces to thoughtful architecture, these are premium apartments in Kokapet crafted for people who want more from everyday living.\n\nWhether you’re looking for elegant 3.5 BHK apartments in Kokapet or expansive 4 BHK apartments in Kokapet, every home is designed to bring together clean aesthetics, open green spaces, and comfort that adapts to your pace of life. AVR Evania redefines luxury flats in Kokapet, Hyderabad with spaces that nurture body, mind, and spirit.\n\nSet within a thoughtfully planned gated community, these luxury apartments in Kokapet offer the freedom to work, unwind, connect, and grow — all on your own terms. The spacious 3.5 BHK apartments in Kokapet are ideal for evolving lifestyles, while the beautifully designed 4 BHK apartments in Kokapet create room for elevated living and lasting memories.\n\nMore than just homes, AVR Evania brings you premium apartments in Kokapet where authenticity becomes the true amenity. Experience a new standard of luxury flats in Kokapet, Hyderabad, where modern design meets mindful living.",
    videoId: "cUbmsgc6cqQ",
    videoTitle: "Welcome to Evania – Young Luxury Redefined",
    /* building render — sits below the About heading */
    aboutImage: "/evania/about.webp",
    highlights: [
      { label: "1 MIN TO ORR" },
      { value: "102", label: "Residences" },
      { label: "2 - LEVEL CLUBHOUSE" },
    ],
    /* Evania's real amenity set, from avrdevelopers.com/about-project — 18,000 sq ft Club Evania. */
    amenityItems: [
      { icon: "armchair", label: "18,000 Sq. Ft. Club Evania" },
      { icon: "waves", label: "Adult & Kids Pool, Jacuzzi" },
      { icon: "dumbbell", label: "Fitness Station & Gym" },
      { icon: "leaf", label: "Yoga & Wellness Room" },
      { icon: "clapperboard", label: "Mini Theatre" },
      { icon: "sparkles", label: "Rooftop Designer Terrace" },
      { icon: "party", label: "Party & Celebration Lawn" },
      { icon: "puzzle", label: "Kids' Play Area" },
      { icon: "treepine", label: "Senior Citizen & Reflexology Garden" },
      { icon: "trophy", label: "Badminton, Pickleball & Basketball Courts" },
      { icon: "landmark", label: "Temple" },
      { icon: "pawprint", label: "Pet Park" },
      { icon: "shield", label: "24×7 Gated Security, 6-Level Parking" },
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
    headline: "A Lifestyle Movement",
    aboutHeading: "The Reinvention of Existence",
    amenitiesHeading: "Indulgence, Everyday",
    status: "Ongoing",
    configuration: "Ultra-luxury 3 BHK Residences",
    blurb:
      "Situated in one of the city’s emerging growth corridors in Kokapet, AVIRA places you at the intersection of convenience, connectivity, and future potential. Offering thoughtfully designed 3 BHK residences, AVIRA embodies a contemporary identity with enduring appeal.",
    about:
      "Situated in one of the city's emerging growth corridors, AVIRA offers seamless connectivity, everyday convenience, and strong future potential. A contemporary address for those who value intentional living, AVIRA is thoughtfully designed with modern spaces and meaningful experiences that evolve with your lifestyle.",
    highlights: [
      { value:"172", label: "Units" },
      { value:"2", label: "TOWERS" },
      { value:"11", label: "FLOORS" },
    ],
    image: "https://picsum.photos/seed/avr-avira-villa/1200/1500",
    /* same map location as Evania */
    coordinates: { lat: 17.4058, lng: 78.3389 },
    /* TODO: same figures as Evania's connectivity block — verify these are actually correct for Avira before launch */
    connectivity: [
      { place: "Nehru Outer Ring Road", time: "1 min", lat: 17.4104, lng: 78.3272, category: "Connectivity", image: "https://picsum.photos/seed/avr-avira-orr/400/300" },
      { place: "Neopolis", time: "2 min", lat: 17.4149, lng: 78.3324, category: "Commercial", image: "https://picsum.photos/seed/avr-avira-neopolis/400/300" },
      { place: "Financial District", time: "5 min", lat: 17.4137, lng: 78.3466, category: "Commercial", image: "https://picsum.photos/seed/avr-avira-findistrict/400/300" },
      { place: "Wipro Circle", time: "5 min", lat: 17.4419, lng: 78.3813, category: "Connectivity", image: "https://picsum.photos/seed/avr-avira-wipro/400/300" },
      { place: "Leading hospitals", time: "8 min", lat: 17.4159, lng: 78.3475, category: "Healthcare", image: "https://picsum.photos/seed/avr-avira-hospitals/400/300" },
      { place: "Leading schools", time: "10 min", lat: 17.4204, lng: 78.354, category: "Education", image: "https://picsum.photos/seed/avr-avira-schools/400/300" },
      { place: "HITEC City", time: "15 min", lat: 17.4483, lng: 78.3915, category: "Commercial", image: "https://picsum.photos/seed/avr-avira-hitec/400/300" },
      { place: "Rajiv Gandhi International Airport", time: "30 min", lat: 17.2403, lng: 78.4294, category: "Connectivity", image: "https://picsum.photos/seed/avr-avira-airport/400/300" },
    ],
    /* grounded in Avira's own clubhouseSpaces list below — no invented amenities */
    amenityItems: [
      { icon: "armchair", label: "Reception Lobby" },
      { icon: "sparkles", label: "Sky Lounge" },
      { icon: "waves", label: "Infinity Pool Deck" },
      { icon: "clapperboard", label: "Mini Theatre" },
      { icon: "dumbbell", label: "Gym" },
      { icon: "landmark", label: "Guest Rooms" },
    ],
    clubEyebrow: "Clubhouse",
    clubHeading: "The Heart of Community Living",
    clubBody:
      "A place to connect, recharge, and celebrate. The clubhouse at AVIRA offers an inviting collection of spaces where wellness, leisure, and meaningful moments come together, making every day feel a little more rewarding.",
    clubhouseSpaces: [
      { label: "Lobby with Seating", image: "https://picsum.photos/seed/avr-avira-lobby/1000/1250" },
      { label: "Indoor Games", image: "https://picsum.photos/seed/avr-avira-lounge/1000/1250" },
      { label: "Co-working space", image: "https://picsum.photos/seed/avr-avira-pool/1000/1250" },
      { label: "Creche", image: "https://picsum.photos/seed/avr-avira-theatre/1000/1250" },
      { label: "Pilates Studio", image: "https://picsum.photos/seed/avr-avira-gym/1000/1250" },
      { label: "Gym", image: "https://picsum.photos/seed/avr-avira-guest/1000/1250" },
      { label: "Steam room", image: "https://picsum.photos/seed/avr-avira-guest/1000/1250" },
      { label: "Guest rooms", image: "https://picsum.photos/seed/avr-avira-guest/1000/1250" },
    ],
    /* placeholder — swap for the real 3 BHK plan image */
    floorPlansHeading:"See the Lifestyle Unfold",
    floorPlans: [{ config: "3 BHK Residence", image: "/evania/floor-plan-gated.png" }],
    galleryHeading:"A Glimpse of the Good Life at Avira",
    locationHeading:"Connected to What Matters",
  },
];

/** Delivered projects (no detail page — shown on /projects for track record). */
export const completedProjects: Project[] = [
  {
    slug: "serene-heights",
    name: "Serene Heights",
    status: "Completed",
    configuration: "2 & 3 BHK Apartments",
    blurb: "A gated community built around a central green, handed over and lived-in.",
    highlights: [],
    image: "https://picsum.photos/seed/avr-serene/1200/1500",
  },
  {
    slug: "the-terraces",
    name: "The Terraces",
    status: "Completed",
    configuration: "3 BHK Duplexes",
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
    { label: "About Us", href: "/about" },
  ],
  right: [
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};
