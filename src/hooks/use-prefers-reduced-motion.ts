import { useEffect, useState } from "react";

/**
 * Detects whether the user prefers reduced motion via the
 * `prefers-reduced-motion: reduce` media query.
 * Reactively updates if the user changes their system setting.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
