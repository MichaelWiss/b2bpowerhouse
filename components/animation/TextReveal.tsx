"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Text reveal — splits children text into words, masks each line,
 * and slides words up from below when scrolled into view.
 * Matches Celeres `[data-text-animate]` + SplitText behaviour.
 */
export default function TextReveal({
  children,
  tag: Tag = "div",
  className = "",
  stagger = 0.08,
  duration = 1.4,
  delay = 0,
}: {
  children: ReactNode;
  tag?: keyof React.JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Wrap each word in a span, each line in an overflow-hidden wrapper
    const text = el.textContent || "";
    const words = text.split(/\s+/).filter(Boolean);

    el.innerHTML = "";
    const lineWrapper = document.createElement("span");
    lineWrapper.style.display = "inline";
    lineWrapper.style.overflow = "hidden";
    lineWrapper.classList.add("split-line");

    words.forEach((word, i) => {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = word + (i < words.length - 1 ? "\u00A0" : "");
      wordSpan.style.display = "inline-block";
      wordSpan.style.willChange = "transform";
      wordSpan.classList.add("split-word");
      lineWrapper.appendChild(wordSpan);
    });

    el.appendChild(lineWrapper);

    const wordEls = el.querySelectorAll(".split-word");

    gsap.set(wordEls, { yPercent: 110 });

    const tl = gsap.timeline({ paused: true });
    tl.to(wordEls, {
      yPercent: 0,
      stagger,
      duration,
      ease: "power4.out",
      delay,
    });

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => tl.play(),
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [stagger, duration, delay]);

  // TypeScript workaround: render a div with ref, apply desired tag via style
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </Tag>
  );
}
