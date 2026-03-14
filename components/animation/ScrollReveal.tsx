"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Generic scroll-triggered animation — slides up + fades in.
 * Replaces the old IntersectionObserver-based FadeIn component
 * with GSAP ScrollTrigger for consistency with TextReveal.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  duration = 1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(el, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: "power4.out",
    });

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => tl.play(),
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
