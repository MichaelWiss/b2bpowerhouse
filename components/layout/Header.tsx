"use client";

import { useEffect, useState, useRef } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuVisible(true);
      requestAnimationFrame(() => setMenuOpen(true));
    } else {
      setMenuOpen(false);
      timeoutRef.current = setTimeout(() => setMenuVisible(false), 800);
    }
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-700 ${
          scrolled && !menuOpen
            ? "bg-[#F0EBE1]/95 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="relative px-6 md:px-16">
          {/* Nav row — brand dead-center of viewport, hamburger far right */}
          <div className="flex items-center justify-center py-5">
            {/* Center: brand + est — absolutely centered on viewport */}
            <a href="/" className="relative z-60 text-center">
              <div
                className={`text-[15px] tracking-[0.3em] uppercase font-semibold transition-colors duration-500 ${
                  menuOpen ? "text-[#F0EBE1]" : "text-[#1C1209]"
                }`}
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                B2B Powerhouse
              </div>
              <div
                className={`text-[8px] tracking-[0.2em] uppercase mt-0.5 transition-colors duration-500 ${
                  menuOpen ? "text-[#C98B96]" : "text-[#8C8272]"
                }`}
              >
                EST&ensp;•&ensp;2014
              </div>
            </a>

            {/* Right: hamburger — 3 equal width lines, pinned to right */}
            <button
              onClick={toggleMenu}
              className="absolute right-6 md:right-16 z-60 flex flex-col justify-center items-center gap-[5px] w-10 h-10 cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block w-9 h-[1.5px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  menuOpen ? "translate-y-[6.5px] rotate-45 bg-[#F0EBE1]" : "bg-[#1C1209]"
                }`}
              />
              <span
                className={`block w-9 h-[1.5px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  menuOpen ? "opacity-0 scale-x-0 bg-[#F0EBE1]" : "bg-[#1C1209]"
                }`}
              />
              <span
                className={`block w-9 h-[1.5px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45 bg-[#F0EBE1]" : "bg-[#1C1209]"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Full-width line — spans entire viewport like Celeres */}
        <div
          className={`h-px mx-6 md:mx-10 transition-colors duration-500 ${
            menuOpen ? "bg-[#F0EBE1]/20" : "bg-[#1C1209]/30"
          }`}
        />
      </header>

      {/* ─── Fullscreen overlay menu — burgundy bg, red links ───── */}
      <div
        className={`fixed inset-0 z-40 bg-[#6B1525] flex flex-col items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ display: menuVisible ? "flex" : "none" }}
      >
        {/* Spacer for header */}
        <div className="pt-20" />

        {/* Center nav links */}
        <nav className="flex flex-col items-center gap-6 md:gap-8">
          {[
            { label: "Home", href: "/" },
            { label: "Equipment", href: "/products" },
            { label: "Brands", href: "/#brands" },
            { label: "Account", href: "/account" },
          ].map(({ label, href }, i) => (
            <div
              key={label}
              className={`relative flex items-center gap-4 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDuration: "0.8s", transitionDelay: menuOpen ? `${0.15 + i * 0.07}s` : "0s" }}
            >
              <a
                href={href}
                onClick={toggleMenu}
                className="font-light uppercase tracking-[0.04em] text-[#E8384F] hover:opacity-50 transition-opacity"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                }}
              >
                {label}
              </a>
              {/* Diamond icon on first item */}
              {i === 0 && (
                <div className="w-8 h-8 rounded-full border border-[#E8384F]/40 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#E8384F" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom links */}
        <div
          className={`pb-8 flex gap-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDuration: "0.8s", transitionDelay: menuOpen ? "0.5s" : "0s" }}
        >
          <a
            href="/privacy"
            onClick={toggleMenu}
            className="text-[13px] tracking-[0.05em] text-[#E8384F]/70 hover:text-[#E8384F] transition-colors"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Privacy
          </a>
          <a
            href="/contact"
            onClick={toggleMenu}
            className="text-[13px] tracking-[0.05em] text-[#E8384F]/70 hover:text-[#E8384F] transition-colors"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
