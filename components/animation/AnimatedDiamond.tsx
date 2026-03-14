"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Diamond icon that rotates on scroll.
 * Matches the Celeres `.animated-icon` with rotate/scale transforms.
 * Renders as a circle with a diamond SVG inside.
 */
export default function AnimatedDiamond({
  className = "",
  size = 40,
  color = "#E8384F",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Rotate on scroll like Celeres
    gsap.to(el, {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.scrollTrigger && (st.vars.scrollTrigger as { trigger?: Element }).trigger === document.body) {
          // handled by page unmount
        }
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center rounded-full border ${className}`}
      style={{
        width: size,
        height: size,
        borderColor: `${color}40`,
        willChange: "transform",
      }}
    >
      <svg width={size * 0.22} height={size * 0.22} viewBox="0 0 10 10" fill="none">
        <path d="M5 0L10 5L5 10L0 5L5 0Z" fill={color} />
      </svg>
    </div>
  );
}
