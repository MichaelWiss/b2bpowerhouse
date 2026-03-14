import TestimonialSlider from "@/components/ui/TestimonialSlider";

export default function Home() {
  return (
    <>
      <div className="intro-track" id="intro">
        <div className="intro">
          <div className="intro-video" id="introVideo">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop&q=80"
              alt="Professional gym floor"
              className="intro-video-file"
            />
          </div>

          <h1 className="intro-tagline" id="introTagline">
            <span data-split="" className="tagline">Independently <br />minded <em>&amp;</em></span>
            <span data-split="" className="tagline">personally <br />equipped</span>
          </h1>

          <div className="intro-content" id="introContent">
            <div className="container">
            <div className="intro-columns">
              <div className="intro-subtitle">
                <h2 data-split="" className="subtagline">a non–conformist gym supplier</h2>
              </div>
              <div className="intro-arrow">
                <a href="#about" aria-label="scroll down">
                  <svg width="16" height="33" viewBox="0 0 16 33" fill="currentColor">
                    <path d="M8.69162 25.9883C10.6938 24.1215 13.1718 22.5783 16 22.4814C12.6233 25.3984 9.57708 28.7622 7.99998 33C6.42289 28.7622 3.37666 25.3983 0 22.4813C2.8282 22.5782 5.30618 24.1214 7.30838 25.9883L7.30618 17.6667C7.30618 17.2793 6.9934 16.0707 6.85904 15.637C5.92512 12.6144 3.38327 10.7938 0.685024 9.41786L0.685025 0C4.76653 1.0545 7.14536 4.22469 7.9317 8.25337C8.52642 4.37879 11.2313 0.601085 15.3106 8.58323e-05V9.41794C12.6123 10.7939 10.0705 12.6145 9.13655 15.6371C9.00219 16.0708 8.68941 17.2794 8.68941 17.6668L8.69162 25.9883Z" />
                  </svg>
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-beige" data-header-bg="bg-beige" id="gallery">
        <div className="gallery" id="gallerySection">
          <div className="container">
          <div className="gallery-columns">
            <div className="gallery-column one">
              <img
                src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&h=1200&fit=crop&q=80"
                alt="Free weights area"
                className="gallery-image"
                loading="lazy"
              />
            </div>
            <div className="gallery-column two">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=1000&fit=crop&q=80"
                alt="Cardio equipment"
                className="gallery-image"
                loading="lazy"
              />
            </div>
            <div className="gallery-column three">
              <img
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=1400&fit=crop&q=80"
                alt="Functional training"
                className="gallery-image"
                loading="lazy"
              />
            </div>
          </div>
          </div>
        </div>

        <div id="about" className="split-section">
          <div className="split-column">
            <div className="split-content left">
              <div className="split-content-heading">
                <h2 className="heading">A Gym Supplier Unlike Most</h2>
              </div>
            </div>
          </div>

          <div id="split-animation" className="split-column">
            <div className="split-sticky">
              <div className="split-sideways">
                <div className="split-content right">
                  <div className="split-content-paragraph">
                    <div className="split-content-arrow">
                      <svg width="16" height="33" viewBox="0 0 16 33" fill="currentColor">
                        <path d="M8.69162 25.9883C10.6938 24.1215 13.1718 22.5783 16 22.4814C12.6233 25.3984 9.57708 28.7622 7.99998 33C6.42289 28.7622 3.37666 25.3983 0 22.4813C2.8282 22.5782 5.30618 24.1214 7.30838 25.9883L7.30618 17.6667C7.30618 17.2793 6.9934 16.0707 6.85904 15.637C5.92512 12.6144 3.38327 10.7938 0.685024 9.41786L0.685025 0C4.76653 1.0545 7.14536 4.22469 7.9317 8.25337C8.52642 4.37879 11.2313 0.601085 15.3106 8.58323e-05V9.41794C12.6123 10.7939 10.0705 12.6145 9.13655 15.6371C9.00219 16.0708 8.68941 17.2794 8.68941 17.6668L8.69162 25.9883Z" />
                      </svg>
                    </div>
                    <div className="rich-text">
                      <p>
                        Since our founding, B2B Powerhouse has done things differently. Despite being a wholesale operation,
                        we have a hands-on philosophy that demonstrates our commitment to adding value beyond mere equipment.
                      </p>
                      <p>
                        In a competitive landscape where many suppliers simply provide catalogues, our commitment to being an active
                        partner makes all the difference.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="split-background bg-moss">
                <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&h=800&fit=crop&q=80" loading="lazy" alt="" className="split-image" />
              </div>

              <div className="split-background bg-burgundy-sec">
                <div className="testimonial" data-animate="">
                  <div className="animated-icon">
                    <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "currentColor" }}>
                      <path className="big-ring" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="3" fill="none" />
                      <path className="ring-one" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="1" fill="none" />
                      <path className="ring-two" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="1" fill="none" />
                      <path className="rotate-left" d="M44 39L39 34L34 39L39 44L44 39Z" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <blockquote className="subtitle">
                    &ldquo;We supply directly to operators who have demonstrated real commitment to quality.&rdquo;
                  </blockquote>
                  <cite className="cite">B2B Powerhouse</cite>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="split-section">
          <div className="split-column">
            <div className="split-content left">
              <div className="split-content-heading">
                <h2 className="heading">When We Commit, We Commit</h2>
              </div>
            </div>
          </div>
          <div className="split-column">
            <div className="split-content right">
              <div className="split-content-paragraph">
                <div className="split-content-arrow">
                  <svg width="16" height="33" viewBox="0 0 16 33" fill="currentColor">
                    <path d="M8.69162 25.9883C10.6938 24.1215 13.1718 22.5783 16 22.4814C12.6233 25.3984 9.57708 28.7622 7.99998 33C6.42289 28.7622 3.37666 25.3983 0 22.4813C2.8282 22.5782 5.30618 24.1214 7.30838 25.9883L7.30618 17.6667C7.30618 17.2793 6.9934 16.0707 6.85904 15.637C5.92512 12.6144 3.38327 10.7938 0.685024 9.41786L0.685025 0C4.76653 1.0545 7.14536 4.22469 7.9317 8.25337C8.52642 4.37879 11.2313 0.601085 15.3106 8.58323e-05V9.41794C12.6123 10.7939 10.0705 12.6145 9.13655 15.6371C9.00219 16.0708 8.68941 17.2794 8.68941 17.6668L8.69162 25.9883Z" />
                  </svg>
                </div>
                <div className="rich-text">
                  <p>
                    Our focus is on achieving a successful outcome for every installation.
                    When we see conviction play out, we do not hesitate to double down with capital and time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-burgundy-full" data-header-bg="bg-burgundy">
        <div className="section">
          <div className="container">
          <div className="statistics">
            <div className="statistic-row" data-text-animate="">
              <div data-split="" className="subtitle">AUM</div>
              <div data-split="" className="statistic-number">$650m</div>
            </div>
            <div className="statistic-row" data-text-animate="">
              <div data-split="" className="subtitle">Total Exits</div>
              <div data-split="" className="statistic-number">12</div>
            </div>
            <div className="statistic-row" data-text-animate="">
              <div data-split="" className="subtitle">Total Fund IRR</div>
              <div data-split="" className="statistic-number">40%+</div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="bg-beige" data-header-bg="bg-beige">
        <div className="section">
          <div className="container align-center" data-animate="">
            <div style={{ color: "var(--ruby)", display: "inline-block" }}>
              <div className="animated-icon">
                <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "currentColor" }}>
                  <path className="big-ring" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="3" fill="none" />
                  <path className="ring-one" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="1" fill="none" />
                  <path className="ring-two" d="M72 39C72 20.7746 57.2254 6 39 6C20.7746 6 6 20.7746 6 39C6 57.2254 20.7746 72 39 72C57.2254 72 72 57.2254 72 39Z" strokeWidth="1" fill="none" />
                  <path className="rotate-left" d="M44 39L39 34L34 39L39 44L44 39Z" fill="currentColor" stroke="none" />
                </svg>
              </div>
            </div>
            <div className="margin-top-medium">
              <h2 className="heading">Capital <em>&amp;</em> conviction</h2>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="capital-image" id="capitalImage">
            <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1400&h=900&fit=crop&q=80" loading="lazy" alt="" className="capital-image-bg" />
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1400&h=900&fit=crop&q=80" loading="lazy" alt="" className="capital-image-front" />
          </div>
        </div>

        <div className="section" id="portfolio">
          <div className="container">
            <div className="align-center relative">
              <div className="mw-640 auto">
                <h2 className="subheading">our portfolio</h2>
                <svg width="10" height="10" fill="currentColor" viewBox="0 0 10 10" className="bullet auto"><path d="M5 10L0 5L5 0L10 5L5 10Z" /></svg>
                <p className="paragraph">
                  We believe great operators deserve more than just a cheque. So we invest our time and capital in businesses
                  that show early market traction and deep customer understanding.
                </p>
              </div>
              <div className="right-button">
                <a href="#" className="button">
                  <div>View our portfolio</div>
                  <svg width="33" height="16" viewBox="0 0 33 16" fill="currentColor"><path d="M25.9883 7.30838C24.1215 5.30618 22.5783 2.8282 22.4814 2.76804e-07C25.3984 3.37666 28.7622 6.42292 33 8.00002C28.7622 9.57711 25.3983 12.6233 22.4813 16C22.5782 13.1718 24.1214 10.6938 25.9883 8.69162L17.6667 8.69382C17.2793 8.69382 16.0707 9.0066 15.637 9.14096C12.6144 10.0749 10.7938 12.6167 9.41785 15.315L8.05784e-09 15.315C1.0545 11.2335 4.22469 8.85464 8.25337 8.0683C4.37879 7.47358 0.601084 4.76873 8.52011e-05 0.68943L9.41794 0.68943C10.7939 3.38767 12.6145 5.92953 15.6371 6.86345C16.0708 6.99781 17.2794 7.31059 17.6668 7.31059L25.9883 7.30838Z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="case-study-group">
              <div className="case-studies">
                {[
                  ["harbinger-motors", "Harbinger Motors", "Electric Vehicle Chassis"],
                  ["gori-ai", "Gori AI", "Cross Border Logistics"],
                  ["wingstop", "Wingstop", "Franchise Growth"],
                  ["acceptto", "Acceptto", "Identity Access Management"],
                  ["jaja-finance", "Jaja Finance", "Consumer FinTech"],
                  ["pagaya-technologies", "Pagaya", "AI Lending Platform"],
                  ["obrizum-group", "Obrizum Group", "Adaptive Learning"],
                  ["anyvan", "AnyVan", "Logistics Technology"],
                  ["skims", "SKIMS", "Retail Apparel"],
                  ["stratavision", "StrataVision", "Retail Analytics"],
                  ["phantom-ai", "Phantom AI", "Automotive ADAS"],
                  ["lifelong-labs", "Lifelong Labs", "Consumer Durables"],
                  ["studious", "Studious", "Operational Living Real Estate"],
                ].map(([slug, name, detail]) => (
                  <div className="case-study" data-trigger={slug} key={slug}>
                    <a href="#" className="case-study-link">
                      <h3 className="heading">{name}</h3>
                      <div className="cite">{detail}</div>
                    </a>
                  </div>
                ))}
              </div>

              <div className="case-studies-info" style={{ marginTop: "var(--m-medium)", position: "relative", minHeight: "160px" }}>
                {[
                  "harbinger-motors",
                  "gori-ai",
                  "wingstop",
                  "acceptto",
                  "jaja-finance",
                  "pagaya-technologies",
                  "obrizum-group",
                  "anyvan",
                  "skims",
                  "stratavision",
                  "phantom-ai",
                  "lifelong-labs",
                  "studious",
                ].map((slug) => (
                  <div className="case-study-info-block" data-label={slug} key={slug}>
                    <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=300&fit=crop&q=80" className="thumb-image" alt="" loading="lazy" />
                    <div>
                      <div className="fund-detail">Invested: 2024</div>
                      <p className="paragraph" style={{ marginTop: "8px" }}>
                        Portfolio company profile and operational value-add summary.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="swiper" id="carouselSection">
          <div className="carousel" id="carousel">
            {[
              ["Free Weights", "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&h=800&fit=crop&q=80"],
              ["Cardio", "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop&q=80"],
              ["Strength Machines", "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop&q=80"],
              ["Functional Training", "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=600&h=800&fit=crop&q=80"],
              ["Recovery", "https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?w=600&h=800&fit=crop&q=80"],
              ["Matting", "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=800&fit=crop&q=80"],
              ["Accessories", "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=800&fit=crop&q=80"],
            ].map(([label, src]) => (
              <div className="carousel-slide" key={label}>
                <img src={src} className="carousel-image" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="section" id="fund-partners">
          <div className="container">
            <div className="align-center relative">
              <div className="mw-640 auto">
                <h2 className="subheading">equipment partners</h2>
                <svg width="10" height="10" fill="currentColor" viewBox="0 0 10 10" className="bullet auto"><path d="M5 10L0 5L5 0L10 5L5 10Z" /></svg>
                <p className="paragraph">With select partners we co-develop bespoke lines and provide full commercial catalogues.</p>
              </div>
              <div className="right-button">
                <a href="#" className="button">
                  <div>View our partners</div>
                  <svg width="33" height="16" viewBox="0 0 33 16" fill="currentColor"><path d="M25.9883 7.30838C24.1215 5.30618 22.5783 2.8282 22.4814 2.76804e-07C25.3984 3.37666 28.7622 6.42292 33 8.00002C28.7622 9.57711 25.3983 12.6233 22.4813 16C22.5782 13.1718 24.1214 10.6938 25.9883 8.69162L17.6667 8.69382C17.2793 8.69382 16.0707 9.0066 15.637 9.14096C12.6144 10.0749 10.7938 12.6167 9.41785 15.315L8.05784e-09 15.315C1.0545 11.2335 4.22469 8.85464 8.25337 8.0683C4.37879 7.47358 0.601084 4.76873 8.52011e-05 0.68943L9.41794 0.68943C10.7939 3.38767 12.6145 5.92953 15.6371 6.86345C16.0708 6.99781 17.2794 7.31059 17.6668 7.31059L25.9883 7.30838Z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="container" style={{ marginTop: "var(--m-medium)" }}>
            <div className="accordion-group">
              {[
                { name: "ROGUE FITNESS", region: "North America", detail: "Strength & conditioning" },
                { name: "TECHNOGYM", region: "Europe", detail: "Cardio & wellness" },
                { name: "LIFE FITNESS", region: "Global", detail: "Commercial fitness" },
              ].map(({ name, region, detail }) => (
                <div className="line-item" key={name}>
                  <div className="line-title">
                    <h3 className="heading">{name}</h3>
                  </div>
                  <div className="line-details">
                    <div className="line-details-column align-left">
                      <div className="cite">{region}</div>
                    </div>
                    <div className="line-details-logo">
                    </div>
                    <div className="line-details-column align-right">
                      <div className="cite">{detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TestimonialSlider />
    </>
  );
}
