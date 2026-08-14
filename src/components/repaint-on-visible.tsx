"use client";

import { useEffect, useRef } from "react";

/**
 * Chrome can leave stale/garbled paint on a tab after it's sat hidden for a
 * while (GPU compositor layers don't always recomposite cleanly when the tab
 * regains focus) — shows up as a wavy/torn distortion across whatever was
 * on-screen, most visible on the image-heavy hero. A 1px scroll nudge forces
 * the compositor to recomposite the current viewport with no visible side
 * effect, which clears it. Only fires after a real idle stretch (not every
 * tab switch) so it can't itself cause a visible jump during normal use.
 */
export function RepaintOnVisible() {
  const hiddenAt = useRef(0);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        hiddenAt.current = Date.now();
        return;
      }
      if (!hiddenAt.current) return;
      const hiddenFor = Date.now() - hiddenAt.current;
      hiddenAt.current = 0;
      if (hiddenFor < 15_000) return;

      requestAnimationFrame(() => {
        window.scrollBy(0, 1);
        requestAnimationFrame(() => window.scrollBy(0, -1));
      });
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return null;
}
