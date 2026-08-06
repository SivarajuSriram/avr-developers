export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  sections: { heading: string; body: string }[];
};

/* Placeholder posts — titles/excerpts/sections to be replaced when real articles are written. */
export const blogPosts: BlogPost[] = [
  {
    slug: "why-kokapet-is-hyderabads-next-big-address",
    title: "Why Kokapet is Hyderabad's next big address",
    excerpt:
      "ORR access, the Financial District next door and a wave of gated development: what's actually driving Kokapet's growth.",
    category: "Market Watch",
    image: "/evania/evania-hero.webp",
    sections: [
      {
        heading: "A location that stopped being a bet",
        body: "Five years ago, Kokapet was the corridor buyers were told to watch. Today it's where the watching has turned into building: gated towers, wide internal roads and a resident base that works ten minutes away in the Financial District rather than commuting across the city for it.",
      },
      {
        heading: "What the Outer Ring Road actually changed",
        body: "ORR access did more than shorten drive times. It connected Kokapet to the airport, to Gachibowli and to the rest of the Financial District without funnelling traffic through the older parts of the city, which is a big part of why the corridor has been able to absorb this much development without gridlock.",
      },
      {
        heading: "What we're watching next",
        body: "Social infrastructure, schools, hospitals and retail is catching up to the housing stock, which is usually the last piece to fall into place in a growth corridor. That catch-up phase tends to be where the next leg of value gets made.",
      },
    ],
  },
  {
    slug: "financial-district-effect-orr-access",
    title: "The Financial District effect: how ORR access reshapes value",
    excerpt:
      "A look at how proximity to the Outer Ring Road and the Financial District has moved pricing across Kokapet.",
    category: "Market Watch",
    image: "/connectivity/office-1.jpg",
    sections: [
      {
        heading: "Distance to work, priced in",
        body: "In a city where commute times can swing an hour or more depending on the route, proximity to the Financial District has become one of the clearest drivers of value across Kokapet and the surrounding micro-markets.",
      },
      {
        heading: "How this plays out on the ground",
        body: "Projects within a short drive of the Financial District have consistently held their value better through market cycles than comparable stock further out, even when the amenities on offer are similar.",
      },
      {
        heading: "What it means for buyers",
        body: "It's worth weighing today's commute against where the city's IT and business districts are actually expanding, not just where they are right now.",
      },
    ],
  },
  {
    slug: "inside-club-evania-amenities-walkthrough",
    title: "Inside Club Evania: a walkthrough of the amenities",
    excerpt:
      "From the reception lobby to the gym floor, a tour of the 18,000 sq ft clubhouse every Evania resident shares.",
    category: "Life at AVR",
    image: "/evania/clubhouse/clubhouse-1.webp",
    sections: [
      {
        heading: "First impressions at the lobby",
        body: "Club Evania opens with a marble reception designed to feel more like a boutique hotel lobby than a housing society office, right down to the signage and the seating.",
      },
      {
        heading: "The gym floor and beyond",
        body: "Past the lobby, the clubhouse spreads across a full floor of fitness and wellness spaces, from a properly equipped gym to quieter rooms set aside for yoga and recovery.",
      },
      {
        heading: "Built for daily use, not just launch photos",
        body: "The brief for Club Evania was simple: it had to hold up to daily use by hundreds of families, not just look good in a brochure. That shaped everything from the flooring to the ventilation.",
      },
    ],
  },
  {
    slug: "evenings-at-the-rooftop-lounge",
    title: "Evenings at the rooftop lounge: Club Evania after dark",
    excerpt:
      "What the rooftop dining and lounge deck looks like once the sun goes down, and why we built it in the first place.",
    category: "Life at AVR",
    image: "/about/about-evania.webp",
    sections: [
      {
        heading: "A deck built for the evening",
        body: "The rooftop lounge was designed with evenings in mind: warm lighting, a working bar counter and enough covered seating that a passing shower doesn't end the night.",
      },
      {
        heading: "Why a rooftop, specifically",
        body: "Height gives the deck two things a ground-floor amenity can't: a skyline view and distance from the everyday noise of the towers below, which matters when you're trying to build a space people actually want to linger in.",
      },
      {
        heading: "Who it's for",
        body: "It's built to work for a quiet dinner for two and for a resident get-together of thirty people, without needing to be booked out or rearranged for either.",
      },
    ],
  },
  {
    slug: "designing-for-wellness-yoga-room",
    title: "Designing for wellness: why every tower gets a yoga room",
    excerpt:
      "Wellness spaces aren't an add-on at AVR. Here's how they factor into the plan from the first sketch.",
    category: "AVR Journal",
    image: "/evania/clubhouse/clubhouse-3.webp",
    sections: [
      {
        heading: "Wellness as a line item, not an afterthought",
        body: "A dedicated yoga and wellness room goes into the plan at the same stage as the gym and the pool, not bolted on once the rest of the clubhouse is finalised.",
      },
      {
        heading: "What the room actually needs",
        body: "Good acoustic separation from the gym floor, natural light and a floor that's kind to bare feet: small details, but they're the difference between a room that gets used daily and one that becomes storage.",
      },
      {
        heading: "The bigger picture",
        body: "Wellness spaces are part of a broader pattern in how AVR plans clubhouses: fewer flashy one-off features, more rooms that a resident would actually use every week.",
      },
    ],
  },
  {
    slug: "what-to-check-before-booking-your-first-apartment",
    title: "What to check before booking your first apartment",
    excerpt:
      "RERA registration, carpet area versus super built-up, and the questions worth asking before you sign anything.",
    category: "Buying Guide",
    image: "/evania/clubhouse/clubhouse-5.webp",
    sections: [
      {
        heading: "Start with the RERA number",
        body: "Every legitimate project in Telangana carries a TG RERA registration number. It's worth looking it up independently on the RERA portal before you go any further, rather than taking a brochure's word for it.",
      },
      {
        heading: "Carpet area versus super built-up",
        body: "The price per square foot you're quoted usually refers to super built-up area, which includes a share of common spaces. Ask for the carpet area figure directly, since that's the space you'll actually live in.",
      },
      {
        heading: "Questions worth asking before you sign",
        body: "Handover timeline, what's actually included in the amenities versus what's an optional upgrade, and who maintains the clubhouse after possession: three questions that save the most regret later.",
      },
    ],
  },
];
