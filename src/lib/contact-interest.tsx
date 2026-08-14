export const INTEREST_OPTIONS = ["Evania", "Avira"] as const;
export type Interest = (typeof INTEREST_OPTIONS)[number];
