import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export default function Footer() {
  return (
    <footer className={cormorant.variable}>

      {/* ─── Burgundy footer — matching Celeres screenshot ──────────────── */}
      <div className="bg-[#6B1525] px-6 md:px-16">

        {/* ↑ arrow */}
        <div className="flex justify-center pt-16 md:pt-24 pb-10">
          <p className="text-sm text-[#C98B96]">↑</p>
        </div>

        {/* Divider */}
        <div className="max-w-350 mx-auto border-t border-[#8B2535]" />

        {/* Brand name + EST */}
        <div className="text-center py-14 md:py-20">
          <p
            className="font-light tracking-[0.06em] text-[#F0EBE1] mb-3"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
            }}
          >
            B2B POWERHOUSE
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C98B96]">
            EST &nbsp;◆&nbsp; 2014
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-350 mx-auto border-t border-[#8B2535]" />

        {/* Office locations — 3 columns */}
        <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10 md:py-14">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#F0EBE1] mb-2">Los Angeles</p>
            <p className="text-[10px] leading-relaxed text-[#C98B96]">
              1200 Industrial Blvd,<br />
              Commerce, CA 90040
            </p>
          </div>
          <div className="md:text-center">
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#F0EBE1] mb-2">Miami</p>
            <p className="text-[10px] leading-relaxed text-[#C98B96]">
              800 NW 25th Street,<br />
              Wynwood, Miami, FL 33127
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#F0EBE1] mb-2">London</p>
            <p className="text-[10px] leading-relaxed text-[#C98B96]">
              15 Old Burlington Street,<br />
              Mayfair, London, W1S 3AJ
            </p>
          </div>
        </div>

      </div>

    </footer>
  );
}
