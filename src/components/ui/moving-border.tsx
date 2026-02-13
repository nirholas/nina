// "use client";
/**
 * MovingBorder — Button/container with a rotating animated gradient border.
 * Uses an SVG rect with an animated offset to create a "traveling" border effect.
 */
import React, { useId, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface MovingBorderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Duration of one full border rotation in seconds */
  duration?: number;
  /** Border radius for the SVG rect */
  borderRadius?: string;
  /** Container class for the outer wrapper */
  containerClassName?: string;
  /** Border gradient colors */
  borderClassName?: string;
  /** Render as a different element (button by default) */
  as?: React.ElementType;
}

export function MovingBorder({
  children,
  duration = 4,
  borderRadius = "1.75rem",
  containerClassName,
  borderClassName,
  className,
  as: Component = "button",
  ...rest
}: MovingBorderProps) {
  const uid = useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const parent = svg.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const pathLength = 2 * (dimensions.width + dimensions.height);

  return (
    <Component
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px]",
        "focus:outline-none focus:ring-2 focus:ring-[#F0B90B]/50 focus:ring-offset-2",
        "focus:ring-offset-white dark:focus:ring-offset-black",
        containerClassName
      )}
      {...rest}
    >
      {/* Animated border SVG */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg
          ref={svgRef}
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <linearGradient id={`${uid}-gradient`}>
              <stop offset="0%" stopColor="#F0B90B" />
              <stop offset="50%" stopColor="#F8D12F" />
              <stop offset="100%" stopColor="#F0B90B" stopOpacity="0" />
            </linearGradient>
          </defs>
          {pathLength > 0 && (
            <motion.rect
              x={0.5}
              y={0.5}
              width={dimensions.width - 1}
              height={dimensions.height - 1}
              rx={borderRadius}
              ry={borderRadius}
              stroke={`url(#${uid}-gradient)`}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${pathLength * 0.3} ${pathLength * 0.7}`}
              initial={{ strokeDashoffset: 0 }}
              animate={
                prefersReducedMotion
                  ? {}
                  : { strokeDashoffset: -pathLength }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              className={cn(
                "opacity-60 dark:opacity-80",
                borderClassName
              )}
            />
          )}
        </svg>
      </div>

      {/* Inner content */}
      <span
        className={cn(
          "relative z-10 inline-flex h-full w-full items-center justify-center",
          "rounded-full bg-white dark:bg-black px-6 py-2",
          "text-sm font-medium text-neutral-800 dark:text-neutral-200",
          "backdrop-blur-xl",
          className
        )}
      >
        {children}
      </span>
    </Component>
  );
}

export default MovingBorder;
