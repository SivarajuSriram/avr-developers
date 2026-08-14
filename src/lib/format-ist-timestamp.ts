/** Formats a moment as an India-Standard-Time wall-clock string for lead
 * submissions, independent of the visitor's or server's own timezone. */
export function formatIstTimestamp(date: Date = new Date()): string {
  return `${new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date)} IST`;
}
