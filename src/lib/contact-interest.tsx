export const INTEREST_OPTIONS = ["Evania", "Avira"] as const;
export type Interest = (typeof INTEREST_OPTIONS)[number];

export const JOB_LISTINGS = [
  "MEP Manager",
  "Project Manager (Civil)",
  "Digital Marketing Manager",
] as const;
export type JobListing = (typeof JOB_LISTINGS)[number];
