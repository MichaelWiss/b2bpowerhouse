"use client";

import { useState, type ReactNode } from "react";

export default function Accordion({
  items,
}: {
  items: { title: string; content: ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b border-[#D5CEC4]">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full py-7 md:py-9 flex items-center justify-between text-left group cursor-pointer"
            >
              <span
                className="font-display font-light text-[#1C1209] tracking-[0.02em] group-hover:text-[#6B1525] transition-colors"
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                }}
              >
                {item.title}
              </span>
              <span
                className="text-[#8C8272] text-2xl transition-transform duration-300 ml-4 shrink-0"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div className="pb-8 md:pb-10 pr-12 md:pr-24">
                <p className="text-sm md:text-base leading-relaxed text-[#3A2E22]">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
