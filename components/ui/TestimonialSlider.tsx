"use client";

import { useState, useCallback } from "react";
import { gsap } from "gsap";

const testimonials = [
  {
    quote:
      "B2B Powerhouse transformed how we source equipment. Their hands-on approach and deep understanding of commercial fitness made scaling from one studio to twelve seamless.",
    cite: "James Chen, Founder & CEO, Iron Architecture Studios",
  },
  {
    quote:
      "What sets them apart is genuine partnership. They don\u2019t just sell equipment \u2014 they help you plan layouts, optimise procurement, and ensure every piece is right for your space.",
    cite: "Sarah Mitchell, Operations Director, Summit Athletic Group",
  },
  {
    quote:
      "We evaluated five wholesale suppliers before choosing B2B Powerhouse. Their fulfilment speed and after-sale support are unmatched in the industry.",
    cite: "David Rowe, VP Facilities, Meridian Performance Centres",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const show = useCallback((index: number) => {
    const tText = document.getElementById("testimonialText");
    const tCite = document.getElementById("testimonialCite");
    if (!tText || !tCite) return;

    gsap.to([tText, tCite], {
      opacity: 0,
      y: -10,
      duration: 0.3,
      onComplete: () => {
        tText.textContent = testimonials[index].quote;
        tCite.textContent = testimonials[index].cite;
        gsap.fromTo(
          [tText, tCite],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        );
      },
    });
  }, []);

  const next = () => {
    const i = (current + 1) % testimonials.length;
    setCurrent(i);
    show(i);
  };

  const prev = () => {
    const i = (current - 1 + testimonials.length) % testimonials.length;
    setCurrent(i);
    show(i);
  };

  return (
    <div
      className="bg-burgundy-full full-background"
      data-header-bg="bg-burgundy"
      id="team"
    >
      <div className="testimonial-slider" style={{ position: "relative" }}>
        <div id="testimonialContainer">
          <div className="container">
            <div className="testimonial" data-animate="">
              <div className="animated-icon" style={{ color: "var(--ruby-light)" }}>
                <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "currentColor" }}>
                  <path className="big-ring" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="3" fill="none" />
                  <path className="ring-one" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="1" fill="none" />
                  <path className="ring-two" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="1" fill="none" />
                  <path className="rotate-left" d="M44 39L39 34L34 39L39 44L44 39Z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <blockquote className="subtitle" id="testimonialText">
                &ldquo;{testimonials[0].quote}&rdquo;
              </blockquote>
              <cite className="cite" id="testimonialCite">
                {testimonials[0].cite}
              </cite>
            </div>
          </div>
        </div>
        <div className="slider-arrow left" id="prevBtn" onClick={prev}>
          <svg width="33" height="16" viewBox="0 0 33 16" fill="currentColor"><path d="M7.01166 7.30838C8.8785 5.30618 10.4217 2.8282 10.5186 0C7.60165 3.37666 4.23781 6.42292 0 8.00002C4.23781 9.57711 7.60173 12.6233 10.5187 16C10.4218 13.1718 8.87858 10.6938 7.01174 8.69162L15.3333 8.69382C15.7207 8.69382 16.9293 9.0066 17.363 9.14096C20.3856 10.0749 22.2062 12.6167 23.5821 15.315L33 15.315C31.9455 11.2335 28.7753 8.85464 24.7466 8.0683C28.6212 7.47358 32.3989 4.76873 32.9999 0.68943L23.5821 0.68943C22.2061 3.38767 20.3855 5.92952 17.3629 6.86345C16.9292 6.99781 15.7206 7.31059 15.3332 7.31059L7.01166 7.30838Z" /></svg>
        </div>
        <div className="slider-arrow right" id="nextBtn" onClick={next}>
          <svg width="33" height="16" viewBox="0 0 33 16" fill="currentColor"><path d="M25.9883 7.30838C24.1215 5.30618 22.5783 2.8282 22.4814 2.76804e-07C25.3984 3.37666 28.7622 6.42292 33 8.00002C28.7622 9.57711 25.3983 12.6233 22.4813 16C22.5782 13.1718 24.1214 10.6938 25.9883 8.69162L17.6667 8.69382C17.2793 8.69382 16.0707 9.0066 15.637 9.14096C12.6144 10.0749 10.7938 12.6167 9.41785 15.315L8.05784e-09 15.315C1.0545 11.2335 4.22469 8.85464 8.25337 8.0683C4.37879 7.47358 0.601084 4.76873 8.52011e-05 0.68943L9.41794 0.68943C10.7939 3.38767 12.6145 5.92953 15.6371 6.86345C16.0708 6.99781 17.2794 7.31059 17.6668 7.31059L25.9883 7.30838Z" /></svg>
        </div>
      </div>
    </div>
  );
}
