"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Page transition columns — burgundy columns that shrink on page load
 * like Celeres' `.transition-column` reveal effect.
 */
export default function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cols = el.querySelectorAll(".transition-col");

    const tl = gsap.timeline();
    tl.set(el, { display: "flex" });
    tl.to(cols, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.08,
      delay: 0.1,
    });
    tl.set(el, { display: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] flex pointer-events-none"
      style={{ display: "flex" }}
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="transition-col flex-1 bg-[#6B1525]"
          style={{ transformOrigin: "top" }}
        />
      ))}
    </div>
  );
}
