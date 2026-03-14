"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { getLenis } from "@/components/animation/SmoothScroll";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => {
    document.getElementById("menu")?.classList.remove("open");
    document.getElementById("header")?.classList.remove("menu-open");
    getLenis()?.start();
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
      return;
    }
    document.getElementById("menu")?.classList.add("open");
    document.getElementById("header")?.classList.add("menu-open");
    getLenis()?.stop();
    setIsOpen(true);
  }, [closeMenu, isOpen]);

  const handleNav = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      closeMenu();
      if (href.startsWith("#")) {
        const lenis = getLenis() as unknown as { scrollTo?: (target: Element, opts?: { offset?: number }) => void };
        const el = document.querySelector(href);
        if (el && lenis?.scrollTo) {
          setTimeout(() => lenis.scrollTo?.(el, { offset: -64 }), 400);
          return;
        }
      }
      window.location.href = href;
    },
    [closeMenu],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu, isOpen]);

  return (
    <>
      <div className="header" id="header">
        <nav className="menu" id="menu" role="navigation">
          <div className="menu-section">
            {[
              { label: "Home", href: "#intro" },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Fund Partners", href: "#fund-partners" },
              { label: "Our Team", href: "#team" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="menu-link" onClick={(e) => handleNav(e, href)}>
                <span className="heading">{label}</span>
                <span className="menu-arrow">
                  <svg width="33" height="16" viewBox="0 0 33 16">
                    <path d="M25.9883 7.30838C24.1215 5.30618 22.5783 2.8282 22.4814 2.76804e-07C25.3984 3.37666 28.7622 6.42292 33 8.00002C28.7622 9.57711 25.3983 12.6233 22.4813 16C22.5782 13.1718 24.1214 10.6938 25.9883 8.69162L17.6667 8.69382C17.2793 8.69382 16.0707 9.0066 15.637 9.14096C12.6144 10.0749 10.7938 12.6167 9.41785 15.315L8.05784e-09 15.315C1.0545 11.2335 4.22469 8.85464 8.25337 8.0683C4.37879 7.47358 0.601084 4.76873 8.52011e-05 0.68943L9.41794 0.68943C10.7939 3.38767 12.6145 5.92953 15.6371 6.86345C16.0708 6.99781 17.2794 7.31059 17.6668 7.31059L25.9883 7.30838Z" />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <ul className="menu-footer-links">
            <li><a href="#">Fraud Warning</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </nav>

        <div className="container">
          <div className="header-wrap">
            <a href="#intro" className="header-home" aria-label="B2B Powerhouse homepage">
              <span style={{ fontSize: "18px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                B2B Powerhouse
              </span>
            </a>
          </div>
          <div className="header-line"></div>
        </div>
      </div>

      <button
        className="menu-button"
        id="menuBtn"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="menu-icon">
          <span className="menu-line" />
          <span className="menu-line" />
          <span className="menu-line close" />
          <span className="menu-line" />
        </div>
      </button>
    </>
  );
}
