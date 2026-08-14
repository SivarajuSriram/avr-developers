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
  phones: ["+91 8889 666678", "+91 80000 82399"],
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

/* icon names rendered by the Amenities section, mapped to lucide-react components in amenities.tsx */
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
  /* short identity, used in nav, captions, alt text, JSON-LD. Keep it a real name. */
  name: string;
  /* big hero headline on the project page; falls back to `name` when unset. Use "|" to force a line break, e.g. "Line one|Line two" */
  headline?: string;
  status: "Ongoing" | "Completed";
  configuration: string;
  rera?: string;
  /* short teaser, homepage hover card + SEO/JSON-LD description. Keep it brief. */
  blurb: string;
  /* long copy for the project page's About section; falls back to `blurb` when unset. Separate multiple paragraphs with a blank line ("\n\n") */
  about?: string;
  /* supporting image next to the About heading; falls back to `image` when unset */
  aboutImage?: string;
  /* set true when aboutImage is a transparent cut-out/render rather than a photo, renders uncropped, without the photo-card frame */
  aboutImageContain?: boolean;
  highlights: Highlight[];
  /* project wordmark shown beside the AVR logo in the header on this project's page, omit if unavailable */
  logo?: string;
  /* sales brochure PDF, offered for download after a matching "Interested in" submission on the contact form */
  brochure?: string;
  /* card/hero thumbnail, local path under /public */
  image: string;
  /* real photography, when available; falls back to `image` when absent */
  heroImage?: string;
  /* mobile-res crop of heroImage; falls back to heroImage (scaled down) when unset */
  heroImageMobile?: string;
  sitePlanImage?: string;
  sitePlanImageMobile?: string;
  gallery?: { view: string; src: string; mobileSrc?: string }[];
  /* project's own pin, enables the interactive map in the location section */
  coordinates?: { lat: number; lng: number };
  /* exact Google Maps / GMB listing URL for the "View on Google Maps" button.
     A name+locality text search isn't guaranteed to resolve to the verified
     listing, so when this is set it's used as-is instead of building a
     search query. */
  mapsUrl?: string;
  connectivity?: {
    place: string;
    time: string;
    lat?: number;
    lng?: number;
    /* free-form group heading (e.g. "Commercial & IT Hubs"); rows sharing the
       same string are grouped under one heading in the location section */
    category?: string;
    /* preview photo for the map tooltip + mobile carousel card, placeholder art until real photography exists per landmark */
    image?: string;
  }[];
  /* display order for connectivity categories; falls back to the shared
     default order (Commercial, Healthcare, Connectivity, Education,
     Recreation & Lifestyle) when unset */
  connectivityCategoryOrder?: string[];
  /* real amenity list for this project; falls back to a generic placeholder set when unset */
  amenityItems?: AmenityItem[];
  /* optional YouTube walkthrough, shown right after the Amenities section, omit if there's no video for this project */
  videoId?: string;
  videoTitle?: string;
  /* swaps the video's play button for the red YouTube badge; defaults to the plain white circle */
  videoPlayButton?: "youtube";
  /* 2-level clubhouse room list, when a project has one worth calling out */
  clubhouseSpaces?: ClubhouseSpace[];
  floorPlans?: { config: string; image: string }[];

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

/**
 * Evania's own landmark list. lat/lng verified against Google Maps (address
 * cross-checked, not just a search snippet) for every row. Meru International
 * School was dropped: it runs 3 Hyderabad campuses (Miyapur, Tellapur,
 * Gopanpally), and the Gopanpally one (the plausible "10 min from Evania"
 * branch) isn't indexed as its own Maps listing yet, so its pin would have
 * been a guess.
 *
 * Per-place photos: same category-representative-stock approach as
 * aviraConnectivity. "Connectivity" here mixes a road/a rail station/an
 * airport though, so it gets a per-place lookup instead of one shared image
 * (a highway photo on the railway station pin would be a type mismatch,
 * not just a generic stand-in). The other three categories share one image
 * each, like Avira's.
 */
const EVANIA_CATEGORY_IMAGE: Record<string, string> = {
  "Commercial & IT Hubs": "/connectivity/office-1.jpg",
  "Educational Institutes": "/connectivity/school.jpg",
  Hospitals: "/connectivity/hospital.jpg",
};
const EVANIA_CONNECTIVITY_PLACE_IMAGE: Record<string, string> = {
  "Nehru Outer Ring Road": "/connectivity/highway.jpg",
  "Lingampally Railway Station": "/connectivity/railway.webp",
  "RGI Airport": "/connectivity/airport.jpg",
};

const evaniaConnectivity: NonNullable<Project["connectivity"]> = [
  { place: "Nehru Outer Ring Road", time: "1 min", lat: 17.4104, lng: 78.3272, category: "Connectivity" },
  { place: "Lingampally Railway Station", time: "20 mins", lat: 17.4831323, lng: 78.3175901, category: "Connectivity" },
  { place: "RGI Airport", time: "35 mins", lat: 17.2403, lng: 78.4294, category: "Connectivity" },
  { place: "Neopolis", time: "2 mins", lat: 17.4149, lng: 78.3324, category: "Commercial & IT Hubs" },
  { place: "Financial District", time: "5 mins", lat: 17.4137, lng: 78.3466, category: "Commercial & IT Hubs" },
  { place: "Gachibowli", time: "5 mins", lat: 17.4400802, lng: 78.3489168, category: "Commercial & IT Hubs" },
  { place: "Wipro Circle", time: "5 mins", lat: 17.4260271, lng: 78.3422921, category: "Commercial & IT Hubs" },
  { place: "HITEC City", time: "15 mins", lat: 17.4483, lng: 78.3915, category: "Commercial & IT Hubs" },
  { place: "The Gaudium School", time: "10 mins", lat: 17.4216083, lng: 78.3489517, category: "Educational Institutes" },
  { place: "Birla Open Minds School", time: "15 mins", lat: 17.3846863, lng: 78.3405253, category: "Educational Institutes" },
  { place: "Glendale International School", time: "18 mins", lat: 17.432895, lng: 78.2985203, category: "Educational Institutes" },
  { place: "Manthan International School", time: "20 mins", lat: 17.4601572, lng: 78.2992206, category: "Educational Institutes" },
  { place: "Continental Hospitals", time: "8 mins", lat: 17.4175264, lng: 78.3394579, category: "Hospitals" },
  { place: "Citizens Specialty Hospitals", time: "14 mins", lat: 17.4704006, lng: 78.3110494, category: "Hospitals" },
  { place: "AIG Hospitals", time: "15 mins", lat: 17.443272, lng: 78.3662765, category: "Hospitals" },
  { place: "PACE Hospitals", time: "35 mins", lat: 17.4469083, lng: 78.3842361, category: "Hospitals" },
].map((p) => ({
  ...p,
  image: EVANIA_CONNECTIVITY_PLACE_IMAGE[p.place] ?? EVANIA_CATEGORY_IMAGE[p.category ?? ""],
}));

const EVANIA_CATEGORY_ORDER = ["Connectivity", "Commercial & IT Hubs", "Educational Institutes", "Hospitals"];

/**
 * Avira's own landmark list. Distances here are given in m/km (not drive
 * time), same field either way since it's just a display string. lat/lng
 * verified against Google Maps (address cross-checked) for every row except
 * three corrections from the original list: Heritage Fresh (permanently
 * closed, dropped), Sky Zone Trampoline Park (that brand is permanently
 * closed in Hyderabad, swapped for Fly Zone Hyderabad, the actual operating
 * trampoline park nearby), and AMB Mall (not a real listing; AMB Cinemas is
 * a theater inside Sarath City Capital Mall, so this points at the mall).
 * Per-place photos: rather than a specific (and likely wrong) photo per real
 * business, each row gets a generic category-representative stock image —
 * same image reused across all rows in that category, so the hover art reads
 * as "this is the kind of place" rather than claiming to depict the actual
 * business. Images live in public/connectivity/.
 */
const AVIRA_CATEGORY_IMAGE: Record<string, string> = {
  "Schools / Colleges": "/connectivity/school.jpg",
  "IT / ITES": "/connectivity/office-1.jpg",
  Supermarkets: "/connectivity/supermarket.webp",
  Healthcare: "/connectivity/hospital.jpg",
  "IT SEZ": "/connectivity/office-3.jpg",
  Entertainment: "/connectivity/entertainment.webp",
  Hospitality: "/connectivity/hospitality.webp",
};

const aviraConnectivity: NonNullable<Project["connectivity"]> = [
  { place: "Rockwell International School", time: "900 m", lat: 17.3867055, lng: 78.3347442, category: "Schools / Colleges" },
  { place: "Global Edge International School", time: "1.5 km", lat: 17.3917928, lng: 78.3417728, category: "Schools / Colleges" },
  { place: "Keystone International School", time: "3 km", lat: 17.4112551, lng: 78.3486635, category: "Schools / Colleges" },
  { place: "Delhi Public School", time: "6 km", lat: 17.4170279, lng: 78.3718573, category: "Schools / Colleges" },
  { place: "Oakridge International School", time: "6 km", lat: 17.4198761, lng: 78.3643879, category: "Schools / Colleges" },
  { place: "MGIT", time: "1 km", lat: 17.390362, lng: 78.3219887, category: "Schools / Colleges" },
  { place: "CBIT", time: "1 km", lat: 17.3920882, lng: 78.3195544, category: "Schools / Colleges" },
  { place: "Capgemini", time: "4 km", lat: 17.4197475, lng: 78.3390623, category: "IT / ITES" },
  { place: "Google", time: "9.4 km", lat: 17.4587098, lng: 78.3732079, category: "IT / ITES" },
  { place: "Amazon", time: "4 km", lat: 17.4201857, lng: 78.3454598, category: "IT / ITES" },
  { place: "Wipro", time: "5 km", lat: 17.4260271, lng: 78.3422921, category: "IT / ITES" },
  { place: "Microsoft", time: "5 km", lat: 17.431233, lng: 78.3429951, category: "IT / ITES" },
  { place: "Infosys", time: "6 km", lat: 17.435689, lng: 78.3496213, category: "IT / ITES" },
  { place: "Ratnadeep Select", time: "1 km", lat: 17.3872389, lng: 78.3404331, category: "Supermarkets" },
  { place: "Vijetha Supermarket", time: "1 km", lat: 17.3876945, lng: 78.3425184, category: "Supermarkets" },
  { place: "Q-mart", time: "8 km", lat: 17.446811, lng: 78.3641559, category: "Supermarkets" },
  { place: "Continental Hospital", time: "5 km", lat: 17.4175264, lng: 78.3394579, category: "Healthcare" },
  { place: "AIG Hospitals", time: "9 km", lat: 17.443272, lng: 78.3662765, category: "Healthcare" },
  { place: "Care Hospitals", time: "6 km", lat: 17.4305014, lng: 78.3722324, category: "Healthcare" },
  { place: "Apollo Hospitals", time: "4.5 km", lat: 17.4167349, lng: 78.3552048, category: "Healthcare" },
  { place: "Kokapet SEZ", time: "2 km", lat: 17.4037639, lng: 78.315372, category: "IT SEZ" },
  { place: "Neopolis", time: "2 km", lat: 17.4149, lng: 78.3324, category: "IT SEZ" },
  { place: "Financial District", time: "4 km", lat: 17.4137, lng: 78.3466, category: "IT SEZ" },
  { place: "Hitech City", time: "6 km", lat: 17.4483, lng: 78.3915, category: "IT SEZ" },
  { place: "Madhapur", time: "9.5 km", lat: 17.4485835, lng: 78.3908035, category: "IT SEZ" },
  { place: "Gravity Zip", time: "1.5 km", lat: 17.3901296, lng: 78.3255608, category: "Entertainment" },
  { place: "Fly Zone Hyderabad", time: "2.5 km", lat: 17.3975987, lng: 78.3087005, category: "Entertainment" },
  { place: "Boulder Hills Golf & Country Club", time: "6 km", lat: 17.4337352, lng: 78.3506206, category: "Entertainment" },
  { place: "Gandipet Park", time: "3 km", lat: 17.3838606, lng: 78.3118989, category: "Entertainment" },
  { place: "Sarath City Capital Mall", time: "8 km", lat: 17.4575952, lng: 78.3639493, category: "Entertainment" },
  { place: "Inorbit Mall", time: "10 km", lat: 17.4335554, lng: 78.3865168, category: "Entertainment" },
  { place: "Golconda Resorts and Spa", time: "2 km", lat: 17.3892695, lng: 78.3165441, category: "Hospitality" },
  { place: "Sheraton", time: "4 km", lat: 17.4218786, lng: 78.3372744, category: "Hospitality" },
  { place: "Mazzo", time: "8.4 km", lat: 17.4523064, lng: 78.3629879, category: "Hospitality" },
  { place: "Radisson", time: "7.9 km", lat: 17.4472705, lng: 78.3628044, category: "Hospitality" },
  { place: "Westin Hotel", time: "8 km", lat: 17.4400462, lng: 78.3819843, category: "Hospitality" },
  { place: "Novotel", time: "11 km", lat: 17.4728914, lng: 78.3730806, category: "Hospitality" },
].map((p) => ({ ...p, image: AVIRA_CATEGORY_IMAGE[p.category ?? ""] }));

const AVIRA_CATEGORY_ORDER = [
  "Schools / Colleges",
  "IT / ITES",
  "Supermarkets",
  "Healthcare",
  "IT SEZ",
  "Entertainment",
  "Hospitality",
];

export const projects: Project[] = [
  {
    slug: "avira",
    name: "Avira",
    headline: "A Lifestyle Movement",
    aboutHeading: "The Reinvention of Existence",
    amenitiesHeading: "Indulgence, Everyday",
    status: "Ongoing",
    configuration: "Ultra-luxury 3 & 3.5 BHK Residences",
    rera: "TG RERA P02400011038",
    blurb:
      "Situated in one of the city’s emerging growth corridors in Kokapet, AVIRA places you at the intersection of convenience, connectivity, and future potential. Offering thoughtfully designed 3 BHK residences, AVIRA embodies a contemporary identity with enduring appeal.",
    about:
      "Located in one of Hyderabad’s most promising growth corridors, AVIRA brings together connectivity, convenience and contemporary luxury in Kokapet. With easy access to key business districts, social infrastructure and everyday essentials, it offers a well-connected address for those who want to stay close to everything that matters while enjoying the calm of a thoughtfully planned residential community. \n\nDesigned for those who appreciate refined living, AVIRA presents 3 & 3.5 BHK flats in Kokapet, Hyderabad, created around the way modern families live today. From expansive living spaces to thoughtfully planned interiors, every element is designed to offer a seamless balance of functionality, aesthetics and comfort. It is a home that gives you room to live, unwind, entertain and grow.\n\nFor discerning homebuyers seeking 3 BHK luxury apartments in Hyderabad, AVIRA offers contemporary architecture, curated amenities and lifestyle-led spaces coming together to create meaningful everyday experiences. Whether it is an invigorating morning, an evening spent unwinding or quality time with family, every aspect of the community is designed to make everyday living feel more rewarding.\n\nFor those looking at 3.5 BHK apartments for sale in Kokapet, AVIRA represents an address with both immediate lifestyle appeal and long-term potential. Set within a rapidly developing part of Hyderabad, it brings together the advantages of a strategic location with the comfort and character of a thoughtfully designed home. AVIRA is, ultimately, a contemporary address for those who choose to live intentionally, and invest in a lifestyle that evolves with them.",
    videoId: "AxGOc4gNQIA",
    videoTitle: "Welcome to Avira – A Lifestyle Movement",
    videoPlayButton: "youtube",
    aboutImage: "/about/about-avira.webp",
    highlights: [
      { value:"172", label: "Units" },
      { value:"2", label: "TOWERS" },
      { value:"11", label: "FLOORS" },
    ],
    logo: "/avira/Avira_logo_new.svg",
    brochure: "/avira/AviraBrochure_web.pdf",
    image: "/projects/avira-project-card.webp",
    heroImage: "/avira/avira-hero.webp",
    heroImageMobile:"/avira/avira-hero-mobile.webp",
    sitePlanImage: "/avira/avira-Key_plan.webp",
    sitePlanImageMobile:"/avira/Avira-SitePLan-mobile.webp",
    gallery: [
      { view: "tower exterior", src: "/avira/avira-carousel-1.webp", mobileSrc: "/avira/avira-mobile-1.webp" },
      { view: "courtyard", src: "/avira/avira-carousel-2.webp", mobileSrc: "/avira/avira-mobile-2.webp" },
      { view: "sky lounge", src: "/avira/avira-carousel-3.webp", mobileSrc: "/avira/avira-mobile-3.webp" },
      { view: "clubhouse lobby", src: "/avira/avira-carousel-4.webp", mobileSrc: "/avira/avira-mobile-4.webp" },
      { view: "pool deck", src: "/avira/avira-carousel-5.webp", mobileSrc: "/avira/avira-mobile-5.webp" },
    ],
    coordinates: { lat: 17.381093938284977, lng: 78.33571023718808 },
    mapsUrl: "https://maps.app.goo.gl/fH9Ltxj3ALeeyb787",
    connectivity: aviraConnectivity,
    connectivityCategoryOrder: AVIRA_CATEGORY_ORDER,
    /* grounded in Avira's own clubhouseSpaces list below, no invented amenities */
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
      { label: "Lobby with Seating", image: "/avira/clubhouse/avira-clubhouse-1.webp" },
      { label: "Banquet Hall", image: "/avira/clubhouse/avira-clubhouse-2.webp" },
      { label: "Swimming Pool", image: "/avira/clubhouse/avira-clubhouse-3.webp" },
      { label: "Gym", image: "/avira/clubhouse/avira-clubhouse-4.webp" },
      { label: "Creche", image: "/avira/clubhouse/avira-clubhouse-5.webp" },
      //{ label: "Gym", image: "/stock/avira/gym.jpg" },
      //{ label: "Steam room", image: "/stock/avira/pool.jpg" },
      //{ label: "Guest rooms", image: "/stock/avira/guest-room.jpg" },
    ],
    /* placeholder, swap for the real 3 BHK plan image */
    floorPlansHeading:"See the Lifestyle Unfold",
    floorPlans: [
      {
        config: "3 BHK Residence",
        image: "/evania/floor-plan-gated.png",
      },
      {
        config: "3.5 BHK Residence",
        image: "/evania/floor-plan-gated.png",
      },
    ],
    galleryHeading:"A Glimpse of the Good Life at Avira",
    locationHeading:"Connected to What Matters",
  },
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
      "Today’s young couples aren’t following old scripts; they’re creating lives that feel more personal, intentional, and free. At AVR Evania, discover luxury apartments in Kokapet designed for modern lifestyles that value flexibility, wellness, and meaningful experiences. From breathable spaces to thoughtful architecture, these are premium apartments in Kokapet crafted for people who want more from everyday living.\n\nWhether you’re looking for elegant 3.5 BHK apartments in Kokapet or expansive 4 BHK apartments in Kokapet, every home is designed to bring together clean aesthetics, open green spaces, and comfort that adapts to your pace of life. AVR Evania redefines luxury flats in Kokapet, Hyderabad with spaces that nurture body, mind, and spirit.\n\nSet within a thoughtfully planned gated community, these luxury apartments in Kokapet offer the freedom to work, unwind, connect, and grow, all on your own terms. The spacious 3.5 BHK apartments in Kokapet are ideal for evolving lifestyles, while the beautifully designed 4 BHK apartments in Kokapet create room for elevated living and lasting memories.\n\nMore than just homes, AVR Evania brings you premium apartments in Kokapet where authenticity becomes the true amenity. Experience a new standard of luxury flats in Kokapet, Hyderabad, where modern design meets mindful living.",
    videoId: "cUbmsgc6cqQ",
    videoTitle: "Welcome to Evania – Young Luxury Redefined",
    videoPlayButton: "youtube",
    /* building render, sits below the About heading */
    aboutImage: "/about/about-evania.webp",
    highlights: [
      { label: "1 MIN TO ORR" },
      { value: "102", label: "Residences" },
      { label: "2 - LEVEL CLUBHOUSE" },
    ],
    /* Evania's real amenity set, from avrdevelopers.com/about-project. 18,000 sq ft Club Evania. */
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
    logo: "/evania/Evania-new.svg",
    brochure: "/evania/Evania_Brochure.PDF",
    image: "/projects/evania-project-card.webp",
    heroImage: "/evania/evania-hero.webp",
    heroImageMobile:"/evania/evania-hero-mobile.webp",
    sitePlanImage: "/evania/site-plan-1.webp",
    sitePlanImageMobile:"/evania/Evania-SitePLan-mobile.webp",
    gallery: [
      //{ view: "balcony views", src: "/evania/facade.webp" },
      //{ view: "rooftop terrace", src: "/evania/rooftop.webp" },
      { view: "club evania lobby", src: "/evania/evania-gallery-carousel-1.webp", mobileSrc: "/evania/evania-mobile-4.webp" },
      { view: "mini theatre", src: "/evania/evania-gallery-carousel-2.webp", mobileSrc: "/evania/evania-mobile-2.webp" },
      { view: "rooftop lounge", src: "/evania/evania-gallery-carousel-3.webp", mobileSrc: "/evania/evania-mobile-3.webp" },
      { view: "pool deck", src: "/evania/evania-gallery-carousel-4.webp", mobileSrc: "/evania/evania-mobile-1.webp" },
      { view: "badminton court", src: "/evania/evania-gallery-carousel-5.webp", mobileSrc: "/evania/evania-mobile-5.webp" },
    ],
    coordinates: { lat: 17.397158649030917, lng: 78.33238899482589 },
    connectivity: evaniaConnectivity,
    connectivityCategoryOrder: EVANIA_CATEGORY_ORDER,
    clubhouseSpaces: [
      { label: "Reception Lobby", image: "/evania/clubhouse/clubhouse-1.webp" },
      { label: "Banquet Hall", image: "/evania/clubhouse/clubhouse-7.webp" },
      { label: "Indoor Games", image: "/evania/clubhouse/clubhouse-6.webp" },
      { label: "Mini Theatre", image: "/evania/clubhouse/clubhouse-5.webp" },
      { label: "Gym", image: "/evania/clubhouse/clubhouse-4.webp" },
      { label: "Yoga Room", image: "/evania/clubhouse/clubhouse-3.webp" },
      { label: "Guest Rooms", image: "/evania/clubhouse/clubhouse-2.webp" },
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
