import { Cormorant_Garamond } from "next/font/google";
import ScrollReveal from "@/components/animation/ScrollReveal";
import TextReveal from "@/components/animation/TextReveal";
import AnimatedDiamond from "@/components/animation/AnimatedDiamond";
import ParallaxImage from "@/components/animation/ParallaxImage";
import CountUp from "@/components/animation/CountUp";
import Accordion from "@/components/ui/Accordion";
import Carousel from "@/components/ui/Carousel";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const equipmentCards = [
  { label: "Free Weights", sub: "Barbells, dumbbells, plates & storage", img: "https://images.unsplash.com/photo-1517963879433-6ad2171073fb?w=600&q=80" },
  { label: "Cardio", sub: "Treadmills, bikes, rowers & ellipticals", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80" },
  { label: "Strength Machines", sub: "Cables, selectorized & plate-loaded", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
  { label: "Functional Training", sub: "Rigs, sleds, kettlebells & battle ropes", img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80" },
  { label: "Recovery", sub: "Stretching zones, foam rollers & massage", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80" },
  { label: "Flooring & Matting", sub: "Rubber, foam & turf for every application", img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80" },
];

const faqItems = [
  {
    title: "What are your minimum order quantities?",
    content: "We don't believe in minimum order theatre. Whether you're outfitting a single studio or a 20-location chain, we work with you at the volume that makes sense. That said, wholesale pricing tiers improve at higher quantities.",
  },
  {
    title: "How does white-glove delivery work?",
    content: "Our logistics team coordinates end-to-end delivery including freight, liftgate service, inside placement, and debris removal. We handle customs and duties for international shipments. Average fulfillment is 48 hours from order confirmation.",
  },
  {
    title: "Do you offer equipment financing?",
    content: "Yes. We partner with specialist commercial fitness lenders who offer 12–60 month terms. Approval typically takes 24–48 hours. We can structure lease-to-own or traditional financing depending on your situation.",
  },
  {
    title: "Can I visit a showroom?",
    content: "We maintain a 12,000 sq ft showroom and testing facility. Visits are by appointment only so we can ensure dedicated time with your account manager and access to the specific equipment categories you're evaluating.",
  },
  {
    title: "What warranty and support do you provide?",
    content: "All equipment carries the manufacturer's full commercial warranty. We provide an additional 12-month parts guarantee on all orders over $10K. Our technical support team is available for installation guidance and troubleshooting.",
  },
];

export default function Home() {
  return (
    <div className={`${cormorant.variable} bg-[#F0EBE1] text-[#1C1209]`}>

      {/* ─── HERO PHOTO (full-width parallax image like Celeres) ──────── */}
      <section className="relative px-6 md:px-16 pt-6">
        {/* Diamond icon — fixed to left edge, rotates on scroll like Celeres */}
        <AnimatedDiamond
          className="absolute left-4 md:left-8 top-12 z-10"
          size={40}
          color="#E8384F"
        />
        <div className="max-w-350 mx-auto">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80"
            alt="Professional gym floor"
            className="h-[60vh] md:h-[75vh]"
            speed={0.12}
          />
        </div>
      </section>

      {/* ─── IDENTITY LINE (RED, centered, text-reveal like Celeres) ──────── */}
      <section className="py-14 md:py-20">
        <div className="max-w-350 mx-auto px-6 md:px-16 flex items-center justify-center gap-6">
          <TextReveal
            tag="p"
            className="font-display font-light text-center text-[#E8384F] tracking-[0.02em] uppercase"
            stagger={0.06}
            duration={1.2}
          >
            A Non-Conformist Gym Supplier
          </TextReveal>
          <span className="text-[#8C8272] text-lg hidden md:inline">↓</span>
        </div>
      </section>

      {/* ─── HERO TEXT (centered with inline image, text-reveal like Celeres) ── */}
      <section className="relative px-6 md:px-16 pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden flex flex-col items-center justify-center">

        {/* Top headline — centered, word reveal */}
        <TextReveal
          tag="h1"
          className="font-display font-light leading-[0.88] tracking-[-0.02em] text-center text-[#1C1209]"
          stagger={0.12}
          duration={1.5}
        >
          INDEPENDENTLY MINDED &amp;
        </TextReveal>

        {/* Small inline image between headlines — parallax like Celeres */}
        <ScrollReveal className="my-4 md:my-6 w-20 md:w-28 h-32 md:h-44 overflow-hidden mx-auto" delay={0.3}>
          <img
            src="https://images.unsplash.com/photo-1517963879433-6ad2171073fb?w=300&q=80"
            alt="Barbell plates"
            className="w-full h-full object-cover"
          />
        </ScrollReveal>

        {/* Bottom headline — centered, word reveal */}
        <TextReveal
          tag="h1"
          className="font-display font-light leading-[0.88] tracking-[-0.02em] text-center text-[#1C1209]"
          stagger={0.12}
          duration={1.5}
          delay={0.4}
        >
          PERSONALLY EQUIPPED
        </TextReveal>
      </section>

      {/* ─── SCATTERED IMAGES (cream bg — parallax like Celeres) ─────────── */}
      <section className="max-w-350 mx-auto px-6 md:px-16 py-24 md:py-40">
        <div className="relative h-120 md:h-150">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80"
            alt="Cardio machines"
            className="absolute top-0 left-[5%] w-48 md:w-72 h-64 md:h-96"
            speed={0.2}
          />
          <ParallaxImage
            src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80"
            alt="Squat rack"
            className="absolute top-[15%] left-[38%] w-32 md:w-48 h-48 md:h-64 hidden sm:block"
            speed={0.1}
          />
          <ParallaxImage
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80"
            alt="Dumbbell rack"
            className="absolute top-[30%] right-[4%] w-40 md:w-60 h-56 md:h-80"
            speed={0.25}
          />
        </div>
      </section>

      {/* ─── ABOUT ─────────────────────────────────────────────────────── */}
      <section className="max-w-350 mx-auto px-6 md:px-16 py-36 md:py-56">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="pb-10 md:pb-0 md:pr-16">
            <TextReveal
              tag="h2"
              className="font-display font-light leading-[0.92] text-[#1C1209]"
              stagger={0.1}
              duration={1.4}
            >
              A GYM SUPPLIER UNLIKE MOST
            </TextReveal>
            </div>
            <div className="border-l border-[#D5CEC4] pl-10 md:pl-16 flex flex-col justify-end min-h-48 md:min-h-72">
              <p className="text-sm md:text-base leading-relaxed text-[#3A2E22] mb-6">
                Since our founding, B2B Powerhouse has done things differently. Despite being a wholesale operation, we have a hands-on philosophy that demonstrates our commitment to adding value beyond mere equipment.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[#3A2E22]">
                In a competitive landscape where many suppliers simply provide catalogues, our commitment to being an active partner makes all the difference. Our team of seasoned operators delivers operational expertise, market insight and unwavering guidance.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── WHEN WE COMMIT ────────────────────────────────────────────────── */}
      <section className="max-w-350 mx-auto px-6 md:px-16 py-36 md:py-56">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="pb-10 md:pb-0 md:pr-16">
              <h2
                className="font-display font-light leading-[0.9] text-[#1C1209]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                WHEN WE<br />COMMIT,<br />WE COMMIT
              </h2>
            </div>
            <div className="border-l border-[#D5CEC4] pl-10 md:pl-16 flex flex-col justify-between min-h-96 md:min-h-[32rem]">
              <div className="self-end">
                <p className="text-sm text-[#8C8272]">↓</p>
              </div>
              <div>
                <p className="text-sm md:text-base leading-relaxed text-[#3A2E22] mb-6">
                  Our approach to wholesale is distinct. We supply directly to operators who have demonstrated real commitment to quality in areas we know well and are able to add value.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-[#3A2E22]">
                  Once we&rsquo;re in, we are committed. Our focus is on achieving a successful outcome for every installation. When we see conviction play out, we don&rsquo;t hesitate to double- or even triple-down with our capital and time.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── STATS (burgundy bg, flex row like Celeres) ───────────────────── */}
      <section className="bg-[#6B1525] px-6 md:px-16 py-24 md:py-36">
        <ScrollReveal>
        <div className="max-w-350 mx-auto">
          <div className="flex items-end justify-between border-b border-[#8B2535] pb-6 mb-6">
            <p
              className="font-display font-light text-[#E8384F] leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              $24M+
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C98B96] pb-2">AUM</p>
          </div>
          <div className="flex items-end justify-between border-b border-[#8B2535] pb-6 mb-6">
            <p
              className="font-display font-light text-[#E8384F] leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              340+
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C98B96] pb-2">Total deals</p>
          </div>
          <div className="flex items-end justify-between pb-6">
            <p
              className="font-display font-light text-[#E8384F] leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              48hr
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C98B96] pb-2">Avg. fulfilment time</p>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ─── EQUIPMENT HEADING (centered icon above text, matching screenshot) ─ */}
      <section className="py-20 md:py-28">
        <div className="max-w-350 mx-auto px-6 md:px-16">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center pb-10 border-b border-[#D5CEC4]">
              <div className="w-14 h-14 rounded-full border border-[#6B1525] flex items-center justify-center mb-8">
                <div className="w-3 h-3 bg-[#6B1525]" />
              </div>
              <h2
                className="font-display italic font-light text-[#1C1209]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                EQUIPMENT &amp; CONVICTION
              </h2>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── EQUIPMENT CAROUSEL (white bg) ──────────────────────────────────── */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-350 mx-auto px-6 md:px-16">
          <ScrollReveal>
            <Carousel>
              {equipmentCards.map(({ label, sub, img }) => (
                <a
                  key={label}
                  href="/products"
                  className="group relative overflow-hidden block w-72 md:w-80 aspect-4/3 shrink-0"
                >
                  <img
                    src={img}
                    alt={label}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent p-5 md:p-7 flex flex-col justify-end">
                    <p
                      className="font-display font-medium text-white leading-tight mb-1 drop-shadow-sm"
                      style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      {label}
                    </p>
                    <p className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-white/80">
                      {sub}
                    </p>
                  </div>
                </a>
              ))}
            </Carousel>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── OUR BRANDS heading (centered with diamond, like Celeres) ──── */}
      <section className="max-w-350 mx-auto px-6 md:px-16 pt-24 md:pt-36 pb-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-12">
            <h2
              className="font-display font-light leading-[0.92] text-[#1C1209] mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              OUR BRANDS
            </h2>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mb-6">
              <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#6B1525" />
            </svg>
            <p className="text-sm md:text-base leading-relaxed text-[#3A2E22] max-w-xl mb-6">
              We believe great gyms deserve more than just a catalogue. So we partner with brands that show real commitment to quality and deep understanding of what operators need.
            </p>
            <a href="/products" className="text-[10px] tracking-[0.25em] uppercase text-[#8C8272] hover:text-[#1C1209] transition-colors">
              Our brands →
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── BRANDS (cream bg, scattered collage like Celeres screenshot) ──── */}
      <section className="max-w-350 mx-auto px-6 md:px-16 py-24 md:py-36">
        <ScrollReveal>
          <div className="relative">
            {/* Row 1 */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-6 md:gap-x-10 gap-y-4 mb-4">
              <span className="text-sm md:text-base tracking-[0.08em] uppercase font-medium text-[#1C1209]">ROGUE</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#8C8272]">EST. 2007</span>
              <div className="w-14 h-10 overflow-hidden hidden sm:block"><img src="https://images.unsplash.com/photo-1517963879433-6ad2171073fb?w=100&q=60" alt="" className="w-full h-full object-cover" /></div>
              <span className="text-lg md:text-xl tracking-[0.04em] uppercase font-light text-[#1C1209]">TECHNOGYM</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#8C8272]">EST. 1983</span>
            </div>
            {/* Row 2 */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-8 md:gap-x-12 gap-y-4 mb-4">
              <span className="text-base md:text-lg tracking-[0.06em] uppercase font-light text-[#1C1209]">LIFE FITNESS</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#8C8272]">EST. 1977</span>
              <span className="text-sm tracking-[0.1em] uppercase font-medium text-[#1C1209]">ELEIKO</span>
              <div className="w-12 h-8 overflow-hidden hidden sm:block"><img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&q=60" alt="" className="w-full h-full object-cover" /></div>
              <span className="text-base md:text-lg tracking-[0.05em] uppercase font-light text-[#1C1209]">PRECOR</span>
            </div>
            {/* Row 3 */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-6 md:gap-x-10 gap-y-4 mb-4">
              <span className="text-sm tracking-[0.1em] uppercase font-medium text-[#1C1209]">KEISER</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#8C8272]">EST. 1978</span>
              <span className="text-lg md:text-xl tracking-[0.04em] uppercase font-light text-[#1C1209]">HAMMER STRENGTH</span>
              <span className="text-sm tracking-[0.08em] uppercase font-medium text-[#1C1209]">MATRIX</span>
              <div className="w-10 h-8 overflow-hidden hidden sm:block"><img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&q=60" alt="" className="w-full h-full object-cover" /></div>
            </div>
            {/* Row 4 */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-8 md:gap-x-12 gap-y-4 mb-4">
              <span className="text-base tracking-[0.06em] uppercase font-light text-[#1C1209]">CONCEPT2</span>
              <span className="text-sm tracking-[0.1em] uppercase font-medium text-[#1C1209]">ASSAULT</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#8C8272]">EST. 2014</span>
              <span className="text-lg tracking-[0.04em] uppercase font-light text-[#1C1209]">CYBEX</span>
              <div className="w-12 h-10 overflow-hidden hidden sm:block"><img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=100&q=60" alt="" className="w-full h-full object-cover" /></div>
            </div>
            {/* Row 5 */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-6 md:gap-x-10 gap-y-4">
              <span className="text-sm tracking-[0.08em] uppercase font-medium text-[#1C1209]">FORCE USA</span>
              <span className="text-base md:text-lg tracking-[0.05em] uppercase font-light text-[#1C1209]">BELLS OF STEEL</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#8C8272]">EST. 2013</span>
              <span className="text-sm tracking-[0.1em] uppercase font-medium text-[#1C1209]">YORK</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── FAQ ACCORDION ────────────────────────────────────────────────── */}
      <section>
      <div className="max-w-350 mx-auto px-6 md:px-16 py-24 md:py-36">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#8C8272] mb-6">Common questions</p>
              <h2
                className="font-display font-light leading-[0.92] text-[#1C1209]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                EVERYTHING<br />YOU NEED<br />TO KNOW
              </h2>
            </div>
            <div className="border-t border-[#D5CEC4]">
              <Accordion items={faqItems} />
            </div>
          </div>
        </ScrollReveal>
      </div>
      </section>

      {/* ─── EQUIPMENT PARTNERS heading (centered with diamond, like Celeres) ── */}
      <section className="px-6 md:px-16 pt-16 md:pt-24 pb-0">
        <div className="max-w-350 mx-auto">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-12">
              <h2
                className="font-display font-light leading-[0.92] text-[#1C1209] mb-6"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                EQUIPMENT PARTNERS
              </h2>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mb-6">
                <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#6B1525" />
              </svg>
              <p className="text-sm md:text-base leading-relaxed text-[#3A2E22] max-w-xl mb-6">
                With select, like-minded partners we co-develop bespoke equipment lines as well as supplying their full commercial catalogues.
              </p>
              <a href="/products" className="text-[10px] tracking-[0.25em] uppercase text-[#8C8272] hover:text-[#1C1209] transition-colors">
                Equipment partners →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PARTNER GYMS (large centered stacked like Celeres) ─────────── */}
      <section className="px-6 md:px-16 py-12 md:py-20">
        <div className="max-w-350 mx-auto">
          <ScrollReveal>
            <div className="border-t border-[#D5CEC4]">
              {[
                "IRON ARCHITECTURE STUDIOS",
                "MERIDIAN PERFORMANCE CENTRES",
                "SUMMIT ATHLETIC GROUP",
              ].map((name) => (
                <div key={name} className="border-b border-[#D5CEC4] py-8 md:py-10">
                  <p
                    className="font-display font-light text-[#1C1209] tracking-[0.04em] text-center"
                    style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FINAL QUOTE (cream bg, small centered like Celeres) ────────── */}
      <section className="px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p
              className="font-display italic font-light leading-relaxed text-[#8C8272] mb-6"
              style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              &ldquo;B2B Powerhouse has been a reliable partner through every phase of our growth — from initial procurement to nationwide scaling. Their practical approach and collaborative mindset have made them more than just a supplier.&rdquo;
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8272]">
              Marcus Reid, Iron Architecture Studios
            </p>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
