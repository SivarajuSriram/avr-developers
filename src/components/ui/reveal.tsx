import type { ReactNode } from "react";

/**
 * Used to be a scroll-triggered fade/lift entrance animation. Removed —
 * the staggered reveal made every section feel slow to appear — but kept as
 * a pass-through (same props, renders children immediately, no animation)
 * so the ~18 call sites across the app didn't each need to be unwrapped by
 * hand.
 */
export function Reveal({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  index?: number;
  as?: "div" | "li" | "span" | "p" | "h2";
  className?: string;
}) {
  const Comp = as;
  return <Comp className={className}>{children}</Comp>;
}
