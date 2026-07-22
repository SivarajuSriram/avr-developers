"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

function format(value: string, n: number) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return value;
  const [, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return `${n.toFixed(decimals)}${suffix}`;
}

/** Counts up from 0 to `value` (e.g. "25+", "1.2M") once it scrolls into view. */
export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(() => format(value, 0));

  useEffect(() => {
    if (!inView) return;
    const target = parseFloat(value.match(/^([\d.]+)/)?.[1] ?? "0");

    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(value, v)),
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  );
}
