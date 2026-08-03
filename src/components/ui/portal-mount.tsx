"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/** Renders children into a DOM node elsewhere on the page (by id) instead of where this is placed in the tree. */
export function PortalMount({ targetId, children }: { targetId: string; children: ReactNode }) {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    setTarget(document.getElementById(targetId));
  }, [targetId]);

  if (!target) return null;
  return createPortal(children, target);
}
