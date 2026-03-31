// ─── DEMO: static data for design approval ───────────────────────────────────
// Replace DEMO_PRODUCTS with shopifyClient.request(PRODUCTS_QUERY, { first: 48 })
// and DEMO_CATEGORIES with getCategories() from Sanity once layout is approved.

const DEMO_PRODUCTS = [
  {
    id: "1",
    title: "Pro Series Power Rack",
    handle: "pro-series-power-rack",
    category: "Strength",
    type: "Power Racks",
    price: "1,240",
    moq: 4,
    available: true,
    // Wide gym floor with power racks visible
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=1067&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Olympic Barbell 20kg",
    handle: "olympic-barbell-20kg",
    category: "Strength",
    type: "Free Weights",
    price: "320",
    moq: 10,
    available: true,
    // Barbell loaded with plates on a rack
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=1067&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Rubber Hex Dumbbell Set",
    handle: "rubber-hex-dumbbell-set",
    category: "Strength",
    type: "Free Weights",
    price: "480",
    moq: 6,
    available: true,
    // Free weights area — dumbbells on storage rack
    image:
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&h=1067&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Commercial Treadmill Pro",
    handle: "commercial-treadmill-pro",
    category: "Cardio",
    type: "Treadmills",
    price: "3,200",
    moq: 2,
    available: true,
    // Cardio equipment — treadmill row
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=1067&fit=crop&q=80",
  },
  {
    id: "5",
    title: "Assault Bike Elite",
    handle: "assault-bike-elite",
    category: "Cardio",
    type: "Bikes",
    price: "1,080",
    moq: 3,
    available: false,
    // Stationary exercise bike
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=1067&fit=crop&q=80",
  },
  {
    id: "6",
    title: "Rowing Machine Commercial",
    handle: "rowing-machine-commercial",
    category: "Cardio",
    type: "Rowing",
    price: "2,100",
    moq: 2,
    available: true,
    // Rowing machine in gym setting
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=1067&fit=crop&q=80",
  },
  {
    id: "7",
    title: "Battle Rope 15m",
    handle: "battle-rope-15m",
    category: "Functional",
    type: "Accessories",
    price: "195",
    moq: 20,
    available: true,
    // Functional training — battle rope / sled area
    image:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=1067&fit=crop&q=80",
  },
  {
    id: "8",
    title: "Pull-Up Rig System",
    handle: "pull-up-rig-system",
    category: "Functional",
    type: "Rigs",
    price: "2,860",
    moq: 1,
    available: true,
    // Overhead pull-up / rig structure
    image:
      "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=800&h=1067&fit=crop&q=80",
  },
  {
    id: "9",
    title: "Competition Kettlebell Set",
    handle: "competition-kettlebell-set",
    category: "Strength",
    type: "Kettlebells",
    price: "640",
    moq: 8,
    available: true,
    // Kettlebells in use — clean and press
    image:
      "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=800&h=1067&fit=crop&q=80",
  },
];

const DEMO_CATEGORIES = ["All", "Strength", "Cardio", "Functional", "Recovery"];

export default function ProductsPage() {
  return (
    <main style={{ paddingTop: "64px" }}>

      {/* ─── Page header ─────────────────────────────────────────────────────── */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <p className="subheading" style={{ color: "var(--ruby)" }}>
            Wholesale Catalogue
          </p>
          <h1
            style={{
              fontSize: "clamp(56px, 9vw, 130px)",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              marginBottom: "var(--m-small)",
            }}
          >
            Our Equipment
          </h1>
          <p className="rich-text" style={{ maxWidth: 480 }}>
            Premium commercial gym equipment supplied direct to operators. Minimum
            order quantities apply — contact us for bespoke project and installation
            pricing.
          </p>
        </div>
      </div>

      {/* ─── Category tabs ────────────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: "var(--m-medium)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: "clamp(20px, 3.5vw, 48px)",
              paddingTop: "18px",
              paddingBottom: "18px",
            }}
          >
            {DEMO_CATEGORIES.map((cat, i) => (
              <span
                key={cat}
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: i === 0 ? "var(--text)" : "var(--mid)",
                  userSelect: "none",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Product grid ─────────────────────────────────────────────────────── */}
      <div className="section">
        <div className="container">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ columnGap: "clamp(16px, 2.5vw, 40px)" }}
          >
            {DEMO_PRODUCTS.map((product) => (
              <a
                key={product.id}
                href={`/products/${product.handle}`}
                className="group block"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderTop: "1px solid var(--rule)",
                  paddingTop: "clamp(20px, 2.5vw, 32px)",
                  paddingBottom: "clamp(32px, 4vw, 60px)",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    overflow: "hidden",
                    aspectRatio: "3 / 4",
                    marginBottom: "clamp(16px, 2vw, 24px)",
                    background: "rgba(26, 24, 20, 0.04)",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Category label + availability dot */}
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
                    {product.category}&nbsp;·&nbsp;{product.type}
                  </span>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      display: "block",
                      flexShrink: 0,
                      background: product.available ? "#4a7c59" : "var(--mid)",
                    }}
                    aria-label={product.available ? "In Stock" : "Out of Stock"}
                  />
                </div>

                {/* Title */}
                <h2
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
                  {product.title}
                </h2>

                {/* MOQ pill + price */}
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
                    Min.&nbsp;{product.moq}&nbsp;units
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(14px, 1.3vw, 17px)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    from ${product.price}
                    <span
                      style={{
                        fontSize: "10px",
                        color: "var(--mid)",
                        marginLeft: "3px",
                      }}
                    >
                      /unit
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}
