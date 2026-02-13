// "use client";
/**
 * WavyBackground — Canvas-based animated sine-wave background.
 * Renders layered sine waves with configurable colors and speed.
 */
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** Array of CSS color strings for each wave layer */
  colors?: string[];
  /** Number of sine waves to render per color */
  waveWidth?: number;
  /** Background fill color */
  backgroundFill?: string;
  /** Blur amount in pixels */
  blur?: number;
  /** Animation speed multiplier */
  speed?: "slow" | "fast";
  /** Wave opacity (0–1) */
  waveOpacity?: number;
}

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const tRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Stabilize colors array to prevent useCallback chain invalidation
  const waveColors = useMemo(
    () =>
      colors ?? [
        "#F0B90B",
        "#F8D12F",
        "#38bdf8",
        "#818cf8",
        "#c084fc",
      ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colors?.join(",")]
  );

  const speedFactor = speed === "fast" ? 0.002 : 0.001;

  const drawWave = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < waveColors.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = waveColors[i];
        ctx.globalAlpha = waveOpacity;
        ctx.lineWidth = 2;

        for (let x = 0; x < w; x += 5) {
          const y =
            h * 0.5 +
            Math.sin(x / waveWidth + t + i * 0.5) * 40 +
            Math.sin(x / (waveWidth * 0.5) + t * 1.3 + i) * 20;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
    },
    [waveColors, waveWidth, backgroundFill, waveOpacity]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
      }
    });

    const container = canvas.parentElement ?? canvas;
    resizeObserver.observe(container);

    if (prefersReducedMotion) {
      // Draw a single static frame
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      drawWave(ctx, width, height, 0);
      return () => resizeObserver.disconnect();
    }

    function animate() {
      if (!ctx || !canvas) return;
      tRef.current += speedFactor;
      drawWave(ctx, canvas.width, canvas.height, tRef.current);
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [drawWave, speedFactor, prefersReducedMotion]);

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ filter: `blur(${blur}px)` }}
        aria-hidden="true"
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}

export default WavyBackground;
