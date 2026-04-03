// ─── DEMO: static PDP for design approval ────────────────────────────────────
// Replace with Shopify product query + Sanity content once layout is approved.

const DEMO_PRODUCTS: Record<
  string,
  {
    id: string;
    title: string;
    handle: string;
    category: string;
    type: string;
    price: string;
    moq: number;
    available: boolean;
    image: string;
    description: string;
    features: string[];
    specs: { label: string; value: string }[];
    tiers: { qty: string; unit: string; save: string }[];
    lead: string;
    related: string[];
  }
> = {
  "pro-series-power-rack": {
    id: "1",
    title: "Pro Series Power Rack",
    handle: "pro-series-power-rack",
    category: "Strength",
    type: "Power Racks",
    price: "1,240",
    moq: 4,
    available: true,
    image: "/products/powerrack.jpg",
    description:
      "Built for commercial environments that demand reliability session after session. The Pro Series Power Rack features 11-gauge steel construction, Westside hole spacing through the bench zone, and a 1,000 lb rated capacity. Designed to anchor any serious strength floor.",
    features: [
      "11-gauge steel frame, powder-coated matte black",
      "Westside hole spacing (1″) through bench zone",
      "1,000 lb static weight capacity",
      "Compatible with most J-hook and safety arm systems",
      "Integrated band pegs and plate storage",
      "Bolt-down footplate for permanent installation",
    ],
    specs: [
      { label: "Dimensions", value: "53″W × 56″D × 93″H" },
      { label: "Weight", value: "185 kg" },
      { label: "Steel Gauge", value: "11-gauge, 2×3″ uprights" },
      { label: "Capacity", value: "1,000 lb static" },
      { label: "Finish", value: "Powder-coated matte black" },
      { label: "Warranty", value: "Lifetime frame, 2-yr components" },
    ],
    tiers: [
      { qty: "4–7", unit: "$1,240", save: "—" },
      { qty: "8–15", unit: "$1,115", save: "10%" },
      { qty: "16+", unit: "$990", save: "20%" },
    ],
    lead: "4–6 weeks",
    related: ["olympic-barbell-20kg", "rubber-hex-dumbbell-set", "pull-up-rig-system"],
  },
  "olympic-barbell-20kg": {
    id: "2",
    title: "Olympic Barbell 20kg",
    handle: "olympic-barbell-20kg",
    category: "Strength",
    type: "Free Weights",
    price: "320",
    moq: 10,
    available: true,
    image: "/products/olympicbarbell.jpg",
    description:
      "Our flagship Olympic barbell is precision-engineered for both weightlifting and powerlifting applications. A 190K PSI tensile-strength shaft with composite needle bearings delivers a responsive, consistent spin under load.",
    features: [
      "190K PSI tensile-strength alloy steel shaft",
      "Composite needle bearings for smooth rotation",
      "IWF-spec 28mm shaft diameter",
      "Medium knurl with centre mark",
      "Chrome sleeves with snap-ring assembly",
      "20 kg calibrated to ±10g",
    ],
    specs: [
      { label: "Length", value: "2,200 mm" },
      { label: "Shaft Diameter", value: "28 mm" },
      { label: "Weight", value: "20 kg (±10g)" },
      { label: "Tensile Strength", value: "190K PSI" },
      { label: "Bearings", value: "Composite needle" },
      { label: "Warranty", value: "Lifetime shaft, 1-yr bearings" },
    ],
    tiers: [
      { qty: "10–24", unit: "$320", save: "—" },
      { qty: "25–49", unit: "$285", save: "11%" },
      { qty: "50+", unit: "$255", save: "20%" },
    ],
    lead: "2–3 weeks",
    related: ["pro-series-power-rack", "rubber-hex-dumbbell-set", "competition-kettlebell-set"],
  },
  "rubber-hex-dumbbell-set": {
    id: "3",
    title: "Rubber Hex Dumbbell Set",
    handle: "rubber-hex-dumbbell-set",
    category: "Strength",
    type: "Free Weights",
    price: "480",
    moq: 6,
    available: true,
    image: "/products/hex1.jpg",
    description:
      "Commercial-grade rubber hex dumbbells with ergonomic chrome handles and anti-roll hex design. Supplied as 10-pair sets (5–50 lb) with optional vertical or horizontal storage racks.",
    features: [
      "Virgin rubber heads — no recycled odour",
      "Chrome-plated contoured handles",
      "Hex anti-roll design",
      "Laser-etched weight markings",
      "Sold as 10-pair set (5–50 lb)",
      "Optional storage rack available",
    ],
    specs: [
      { label: "Range", value: "5–50 lb (10 pairs)" },
      { label: "Handle Diameter", value: "34 mm" },
      { label: "Material", value: "Virgin rubber / cast iron" },
      { label: "Weight Tolerance", value: "±3%" },
      { label: "Set Weight", value: "275 kg total" },
      { label: "Warranty", value: "2 years" },
    ],
    tiers: [
      { qty: "6–11", unit: "$480", save: "—" },
      { qty: "12–23", unit: "$435", save: "9%" },
      { qty: "24+", unit: "$395", save: "18%" },
    ],
    lead: "3–4 weeks",
    related: ["olympic-barbell-20kg", "competition-kettlebell-set", "pro-series-power-rack"],
  },
  "commercial-treadmill-pro": {
    id: "4",
    title: "Commercial Treadmill Pro",
    handle: "commercial-treadmill-pro",
    category: "Cardio",
    type: "Treadmills",
    price: "3,200",
    moq: 2,
    available: true,
    image: "/products/treadmill.jpg",
    description:
      "Engineered for 24/7 commercial use with a 4.0 HP AC motor, 22″ belt width, and intuitive 15.6″ HD touchscreen. The self-lubricating deck system minimises maintenance across high-traffic gym floors.",
    features: [
      "4.0 HP continuous-duty AC motor",
      '22" × 60" running belt',
      '15.6" HD touchscreen with Bluetooth',
      "Self-lubricating cushioned deck",
      "Speed 0.5–15 mph, incline 0–15%",
      "Heart-rate compatible (Polar / ANT+)",
    ],
    specs: [
      { label: "Dimensions", value: '83"L × 35"W × 62"H' },
      { label: "Weight", value: "182 kg" },
      { label: "Motor", value: "4.0 HP AC continuous" },
      { label: "Max User Weight", value: "200 kg" },
      { label: "Power", value: "220V / 20A dedicated circuit" },
      { label: "Warranty", value: "Lifetime frame, 5-yr motor" },
    ],
    tiers: [
      { qty: "2–4", unit: "$3,200", save: "—" },
      { qty: "5–9", unit: "$2,880", save: "10%" },
      { qty: "10+", unit: "$2,560", save: "20%" },
    ],
    lead: "6–8 weeks",
    related: ["assault-bike-elite", "rowing-machine-commercial", "battle-rope-15m"],
  },
  "assault-bike-elite": {
    id: "5",
    title: "Assault Bike Elite",
    handle: "assault-bike-elite",
    category: "Cardio",
    type: "Bikes",
    price: "1,080",
    moq: 3,
    available: false,
    image: "/products/assaultbike.jpg",
    description:
      "The Assault Bike Elite combines a progressive fan resistance curve with a sealed bearing system built for commercial abuse. Favoured by CrossFit boxes and HIIT studios for its durability and punishing output.",
    features: [
      "Progressive fan resistance — unlimited ceiling",
      "Sealed cartridge bottom bracket",
      "25-in steel fan with guard",
      "Multi-grip moving handles",
      "LCD console: watts, calories, distance, heart rate",
      "Foot pegs for upper-body isolation",
    ],
    specs: [
      { label: "Dimensions", value: '51"L × 23"W × 49"H' },
      { label: "Weight", value: "57 kg" },
      { label: "Drive", value: "Chain drive, sealed bearing" },
      { label: "Max User Weight", value: "160 kg" },
      { label: "Resistance", value: "Fan (air)" },
      { label: "Warranty", value: "5-yr frame, 2-yr parts" },
    ],
    tiers: [
      { qty: "3–5", unit: "$1,080", save: "—" },
      { qty: "6–11", unit: "$970", save: "10%" },
      { qty: "12+", unit: "$860", save: "20%" },
    ],
    lead: "Currently unavailable — pre-order Q3 2026",
    related: ["commercial-treadmill-pro", "rowing-machine-commercial", "battle-rope-15m"],
  },
  "rowing-machine-commercial": {
    id: "6",
    title: "Rowing Machine Commercial",
    handle: "rowing-machine-commercial",
    category: "Cardio",
    type: "Rowing",
    price: "2,100",
    moq: 2,
    available: true,
    image: "/products/rowing.jpg",
    description:
      "Commercial-grade air rower with a smooth, consistent stroke and PM5 performance monitor. The aluminium I-beam rail and stainless steel track ensure zero-maintenance operation in high-usage environments.",
    features: [
      "Air resistance with damper settings 1–10",
      "PM5 monitor: pace, watts, calories, stroke rate",
      "Aluminium I-beam monorail",
      "Nickel-plated steel chain",
      "Quick-release framelock for upright storage",
      "Caster wheels for easy repositioning",
    ],
    specs: [
      { label: "Dimensions", value: '96"L × 24"W × 20"H' },
      { label: "Weight", value: "26 kg" },
      { label: "Rail", value: "Aluminium I-beam" },
      { label: "Max User Weight", value: "230 kg" },
      { label: "Stored Height", value: '54"' },
      { label: "Warranty", value: "5-yr frame, 2-yr parts" },
    ],
    tiers: [
      { qty: "2–4", unit: "$2,100", save: "—" },
      { qty: "5–9", unit: "$1,890", save: "10%" },
      { qty: "10+", unit: "$1,680", save: "20%" },
    ],
    lead: "3–5 weeks",
    related: ["assault-bike-elite", "commercial-treadmill-pro", "battle-rope-15m"],
  },
  "battle-rope-15m": {
    id: "7",
    title: "Battle Rope 15m",
    handle: "battle-rope-15m",
    category: "Functional",
    type: "Accessories",
    price: "195",
    moq: 20,
    available: true,
    image: "/products/battlerope.jpg",
    description:
      "Heavy-duty 38 mm poly-dacron battle rope with heat-shrink end caps and reinforced anchor loop. 15 m length is ideal for commercial functional areas and outdoor boot-camp setups.",
    features: [
      "38 mm poly-dacron construction",
      "Heat-shrink grip ends",
      "Reinforced anchor loop",
      "UV and moisture resistant",
      "15 m working length",
      "Available in 9 m and 12 m on request",
    ],
    specs: [
      { label: "Length", value: "15 m (50 ft)" },
      { label: "Diameter", value: "38 mm (1.5″)" },
      { label: "Weight", value: "11 kg" },
      { label: "Material", value: "Poly-dacron blend" },
      { label: "Colour", value: "Black" },
      { label: "Warranty", value: "1 year" },
    ],
    tiers: [
      { qty: "20–39", unit: "$195", save: "—" },
      { qty: "40–79", unit: "$175", save: "10%" },
      { qty: "80+", unit: "$155", save: "20%" },
    ],
    lead: "1–2 weeks",
    related: ["pull-up-rig-system", "competition-kettlebell-set", "assault-bike-elite"],
  },
  "pull-up-rig-system": {
    id: "8",
    title: "Pull-Up Rig System",
    handle: "pull-up-rig-system",
    category: "Functional",
    type: "Rigs",
    price: "2,860",
    moq: 1,
    available: true,
    image: "/products/pulluprig.jpg",
    description:
      "Modular 6-station pull-up rig with 3×3″ 11-gauge uprights. Configurable with muscle-up bars, monkey bars, climbing ropes and suspension trainer anchors. Bolt-down design rated for permanent commercial installation.",
    features: [
      "6-station modular design",
      '3×3" 11-gauge steel uprights',
      "Configurable cross-members",
      "Muscle-up, monkey bar, and rope attachments",
      "Bolt-down base plates included",
      "Expandable in 4-ft bay increments",
    ],
    specs: [
      { label: "Dimensions", value: "24′L × 6′D × 12′H (6-bay)" },
      { label: "Weight", value: "420 kg" },
      { label: "Steel Gauge", value: "11-gauge, 3×3″ uprights" },
      { label: "Capacity", value: "1,500 lb per bay" },
      { label: "Finish", value: "Powder-coated matte black" },
      { label: "Warranty", value: "Lifetime frame" },
    ],
    tiers: [
      { qty: "1", unit: "$2,860", save: "—" },
      { qty: "2–3", unit: "$2,575", save: "10%" },
      { qty: "4+", unit: "$2,290", save: "20%" },
    ],
    lead: "6–10 weeks (custom configuration)",
    related: ["pro-series-power-rack", "battle-rope-15m", "competition-kettlebell-set"],
  },
  "competition-kettlebell-set": {
    id: "9",
    title: "Competition Kettlebell Set",
    handle: "competition-kettlebell-set",
    category: "Strength",
    type: "Kettlebells",
    price: "640",
    moq: 8,
    available: true,
    image: "/products/kettlebellset.jpg",
    description:
      "Colour-coded competition kettlebells with a uniform 33 mm handle diameter across all weights. Steel construction with a precision-cast, hollow-fill design allows consistent dimensions regardless of weight class.",
    features: [
      "33 mm handle diameter — all weights",
      "Colour-coded by weight class (IUKL spec)",
      "Steel body, precision hollow-fill",
      "Flat machined base — stable on any surface",
      "Sold as 8-piece set (8 kg–32 kg)",
      "Individual weights available on request",
    ],
    specs: [
      { label: "Range", value: "8 kg – 32 kg (8 pieces)" },
      { label: "Handle Diameter", value: "33 mm" },
      { label: "Material", value: "Cast steel" },
      { label: "Dimensions", value: "Uniform across all weights" },
      { label: "Set Weight", value: "160 kg total" },
      { label: "Warranty", value: "Lifetime" },
    ],
    tiers: [
      { qty: "8–15", unit: "$640", save: "—" },
      { qty: "16–31", unit: "$575", save: "10%" },
      { qty: "32+", unit: "$510", save: "20%" },
    ],
    lead: "2–4 weeks",
    related: ["rubber-hex-dumbbell-set", "olympic-barbell-20kg", "pull-up-rig-system"],
  },
};

const PRODUCT_INDEX = Object.values(DEMO_PRODUCTS);

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = DEMO_PRODUCTS[handle];

  if (!product) {
    return (
      <main style={{ paddingTop: 64 }}>
        <div className="section">
          <div className="container">
            <h1 className="heading">Product not found</h1>
            <p className="rich-text" style={{ marginTop: 16 }}>
              The product you&rsquo;re looking for doesn&rsquo;t exist.{" "}
              <a href="/products" style={{ color: "var(--ruby)" }}>
                Browse all equipment &rarr;
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  }

  const related = product.related
    .map((h) => PRODUCT_INDEX.find((p) => p.handle === h))
    .filter(Boolean);

  return (
    <main style={{ paddingTop: 64 }}>
      <div className="container" style={{ paddingTop: "var(--m-small)" }}>
        <nav
          style={{
            fontSize: "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--mid)",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          <a href="/products" style={{ color: "var(--mid)", textDecoration: "none" }}>
            Equipment
          </a>
          <span style={{ margin: "0 8px", opacity: 0.4 }}>/</span>
          <a href="/products" style={{ color: "var(--mid)", textDecoration: "none" }}>
            {product.category}
          </a>
          <span style={{ margin: "0 8px", opacity: 0.4 }}>/</span>
          <span style={{ color: "var(--text)" }}>{product.title}</span>
        </nav>
      </div>

      <div className="section" style={{ paddingTop: "var(--m-medium)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(24px, 4vw, 64px)",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  overflow: "hidden",
                  aspectRatio: "3 / 4",
                  background: "rgba(26, 24, 20, 0.04)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            <div style={{ position: "sticky", top: "96px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--ruby)",
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {product.category}&nbsp;·&nbsp;{product.type}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: product.available ? "#4a7c59" : "var(--mid)",
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: product.available ? "#4a7c59" : "var(--mid)",
                      display: "block",
                    }}
                  />
                  {product.available ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  marginBottom: "var(--m-small)",
                }}
              >
                {product.title}
              </h1>

              <div
                style={{
                  fontSize: "clamp(20px, 2.2vw, 30px)",
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--m-small)",
                }}
              >
                from ${product.price}
                <span style={{ fontSize: "14px", color: "var(--mid)", marginLeft: 4 }}>
                  /unit
                </span>
              </div>

              <div className="rich-text" style={{ marginBottom: "var(--m-medium)" }}>
                <p>{product.description}</p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--rule)",
                  paddingTop: "var(--m-small)",
                  marginBottom: "var(--m-medium)",
                }}
              >
                <span
                  className="subheading"
                  style={{ color: "var(--ruby)", marginBottom: "14px", display: "block" }}
                >
                  Wholesale Pricing
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {product.tiers.map((tier, i) => (
                    <div
                      key={tier.qty}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom:
                          i < product.tiers.length - 1 ? "1px solid var(--rule)" : "none",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "var(--mid)",
                          border: "1px solid var(--rule)",
                          padding: "3px 9px",
                          borderRadius: "100px",
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        {tier.qty}&nbsp;units
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ fontSize: "clamp(14px, 1.3vw, 17px)" }}>
                          {tier.unit}
                          <span style={{ fontSize: 10, color: "var(--mid)", marginLeft: 3 }}>
                            /unit
                          </span>
                        </span>
                        {tier.save !== "—" && (
                          <span
                            style={{
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "#4a7c59",
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            Save {tier.save}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "var(--m-small)",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--mid)",
                    border: "1px solid var(--rule)",
                    padding: "3px 9px",
                    borderRadius: "100px",
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Min.&nbsp;{product.moq}&nbsp;units
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--mid)",
                    fontStyle: "italic",
                  }}
                >
                  Lead time: {product.lead}
                </span>
              </div>

              <div style={{ display: "flex", gap: "12px", marginBottom: "var(--m-small)" }}>
                <button
                  className="button"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    background: product.available ? "var(--text)" : "var(--mid)",
                    color: "var(--beige)",
                    border: "1px solid transparent",
                    padding: "14px 24px",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: product.available ? "pointer" : "not-allowed",
                  }}
                  disabled={!product.available}
                >
                  {product.available ? "Add to Quote" : "Pre-Order"}
                </button>
                <a
                  href="#"
                  className="button"
                  style={{
                    padding: "14px 24px",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(24px, 4vw, 64px)",
              padding: "var(--m-large) 0",
            }}
          >
            <div>
              <h2
                className="subheading"
                style={{ color: "var(--ruby)", marginBottom: "var(--m-small)" }}
              >
                Features
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "12px 0",
                      borderBottom:
                        i < product.features.length - 1 ? "1px solid var(--rule)" : "none",
                      fontSize: "clamp(14px, 1.15vw, 16px)",
                      lineHeight: 1.6,
                      display: "flex",
                      alignItems: "baseline",
                      gap: "12px",
                    }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 10 10"
                      fill="var(--ruby)"
                      style={{ flexShrink: 0, marginTop: 4 }}
                    >
                      <path d="M5 10L0 5L5 0L10 5L5 10Z" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2
                className="subheading"
                style={{ color: "var(--ruby)", marginBottom: "var(--m-small)" }}
              >
                Specifications
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {product.specs.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom:
                        i < product.specs.length - 1 ? "1px solid var(--rule)" : "none",
                      fontSize: "clamp(14px, 1.15vw, 16px)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "var(--mid)" }}>{s.label}</span>
                    <span>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "var(--m-medium)",
            }}
          >
            <h2 className="subheading" style={{ color: "var(--ruby)", marginBottom: 0 }}>
              Related Equipment
            </h2>
            <a href="/products" className="button">
              <span>View all</span>
              <svg width="33" height="16" viewBox="0 0 33 16" fill="currentColor">
                <path d="M25.9883 7.30838C24.1215 5.30618 22.5783 2.8282 22.4814 2.76804e-07C25.3984 3.37666 28.7622 6.42292 33 8.00002C28.7622 9.57711 25.3983 12.6233 22.4813 16C22.5782 13.1718 24.1214 10.6938 25.9883 8.69162L17.6667 8.69382C17.2793 8.69382 16.0707 9.0066 15.637 9.14096C12.6144 10.0749 10.7938 12.6167 9.41785 15.315L8.05784e-09 15.315C1.0545 11.2335 4.22469 8.85464 8.25337 8.0683C4.37879 7.47358 0.601084 4.76873 8.52011e-05 0.68943L9.41794 0.68943C10.7939 3.38767 12.6145 5.92953 15.6371 6.86345C16.0708 6.99781 17.2794 7.31059 17.6668 7.31059L25.9883 7.30838Z" />
              </svg>
            </a>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ columnGap: "clamp(16px, 2.5vw, 40px)" }}
          >
            {related.map((rel) =>
              rel ? (
                <a
                  key={rel.id}
                  href={`/products/${rel.handle}`}
                  className="group block"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    borderTop: "1px solid var(--rule)",
                    paddingTop: "clamp(20px, 2.5vw, 32px)",
                    paddingBottom: "clamp(32px, 4vw, 60px)",
                  }}
                >
                  <div
                    style={{
                      overflow: "hidden",
                      aspectRatio: "3 / 4",
                      marginBottom: "clamp(16px, 2vw, 24px)",
                      background: "rgba(26, 24, 20, 0.04)",
                    }}
                  >
                    <img
                      src={rel.image}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "var(--ruby)",
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {rel.category}&nbsp;·&nbsp;{rel.type}
                    </span>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        display: "block",
                        flexShrink: 0,
                        background: rel.available ? "#4a7c59" : "var(--mid)",
                      }}
                      aria-label={rel.available ? "In Stock" : "Out of Stock"}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(18px, 2vw, 26px)",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.05,
                      marginBottom: "clamp(14px, 1.8vw, 22px)",
                      transition: "color 0.2s",
                    }}
                    className="group-hover:text-(--ruby)"
                  >
                    {rel.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--mid)",
                        border: "1px solid var(--rule)",
                        padding: "3px 9px",
                        borderRadius: "100px",
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      Min.&nbsp;{rel.moq}&nbsp;units
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(14px, 1.3vw, 17px)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      from ${rel.price}
                      <span style={{ fontSize: 10, color: "var(--mid)", marginLeft: 3 }}>
                        /unit
                      </span>
                    </span>
                  </div>
                </a>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
