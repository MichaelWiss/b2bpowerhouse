"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

/**
 * GSAP Draggable carousel — centered active slide, blur inactive slides.
 * Ported from Celeres' horizontalLoop + Draggable pattern.
 * Drag to scroll, click any slide to center it, blurs non-active slides.
 */
export default function Carousel({
  children,
  className = "",
}: {
  children: ReactNode[];
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;

    let curIndex = 0;
    let activeSlide: HTMLElement | null = null;

    // Blur all images initially (matches Celeres' carousel-image blur)
    slides.forEach((s) => {
      const img = s.querySelector("img");
      if (img) gsap.set(img, { filter: "blur(5px)" });
    });

    const centerOf = (slide: HTMLElement) =>
      slide.offsetLeft + slide.offsetWidth / 2;

    const snapTo = (slide: HTMLElement, animate = true) => {
      const targetX = wrap.offsetWidth / 2 - centerOf(slide);
      if (animate) {
        gsap.to(track, { x: targetX, duration: 1, ease: "expo.out" });
      } else {
        gsap.set(track, { x: targetX });
      }
    };

    const activate = (slide: HTMLElement) => {
      if (activeSlide && activeSlide !== slide) {
        const prevImg = activeSlide.querySelector("img");
        if (prevImg) gsap.to(prevImg, { filter: "blur(5px)", duration: 1.5 });
      }
      const img = slide.querySelector("img");
      if (img) gsap.to(img, { filter: "blur(0px)", duration: 0.5, ease: "power4.out" });
      activeSlide = slide;
      curIndex = slides.indexOf(slide);
    };

    // Click any slide to center + activate it
    slides.forEach((slide) => {
      slide.style.cursor = "pointer";
      slide.addEventListener("click", () => {
        activate(slide);
        snapTo(slide);
      });
    });

    // Draggable — drag to scroll, snap to nearest slide on release
    Draggable.create(track, {
      type: "x",
      onDragEnd() {
        const trackX = gsap.getProperty(track, "x") as number;
        const containerCenter = wrap.offsetWidth / 2;
        let closest = slides[0];
        let closestDist = Infinity;
        slides.forEach((s) => {
          const dist = Math.abs(trackX + centerOf(s) - containerCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest = s;
          }
        });
        activate(closest);
        snapTo(closest);
      },
    });

    // Initialise first slide
    activate(slides[0]);
    snapTo(slides[0], false);

    const onResize = () => snapTo(slides[curIndex], false);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      const d = Draggable.get(track);
      if (d) d.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ cursor: "grab" }}
    >
      <div
        ref={trackRef}
        className="flex gap-4 md:gap-6"
        style={{ willChange: "transform" }}
      >
        {children.map((child, i) => (
          <div key={i} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

