"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Triple-ring animated SVG icon — matches Celeres' [data-animate] pattern.
 * CSS classes `reset` → `animating` are toggled by ScrollTrigger.
 * The three ring paths (big-ring, ring-one, ring-two) and the diamond (rotate-left)
 * animate via CSS transitions defined in globals.css.
 */
export default function AnimatedIcon({
  className = "",
  size = 78,
}: {
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reset");

    const enter = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      onEnter: () => {
        el.classList.remove("reset");
        el.classList.add("animating");
      },
    });

    const leave = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onLeaveBack: () => {
        el.classList.add("reset");
        el.classList.remove("animating");
      },
    });

    return () => {
      enter.kill();
      leave.kill();
    };
  }, []);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 78 78"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor">
          <path
            className="big-ring"
            d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z"
            strokeWidth="3"
          />
          <path
            className="ring-one"
            d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z"
            strokeWidth="1"
          />
          <path
            className="ring-two"
            d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z"
            strokeWidth="1"
          />
        </g>
        <path
          className="rotate-left"
          d="M44 39L39 34L34 39L39 44L44 39Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
