export const INTEREST_OPTIONS = ["Evania", "Avira", "General enquiry"] as const;
export type Interest = (typeof INTEREST_OPTIONS)[number];
