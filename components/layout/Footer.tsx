"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="footer-burgundy">
        <footer className="footer">
          <div className="container">
            <div className="align-center">
              <button className="scroll-up" onClick={scrollToTop} aria-label="scroll to top">
                <svg width="16" height="33" viewBox="0 0 16 33" fill="currentColor">
                  <path d="M7.30838 7.01166C5.30618 8.8785 2.8282 10.4217 0 10.5186C3.37666 7.60165 6.42292 4.23781 8.00002 0C9.57711 4.23781 12.6233 7.60173 16 10.5187C13.1718 10.4218 10.6938 8.87858 8.69162 7.01174L8.69382 15.3333C8.69382 15.7207 9.0066 16.9293 9.14096 17.363C10.0749 20.3856 12.6167 22.2062 15.315 23.5821V33C11.2335 31.9455 8.85464 28.7753 8.0683 24.7466C7.47358 28.6212 4.76873 32.3989 0.689431 32.9999L0.68943 23.5821C3.38767 22.2061 5.92953 20.3855 6.86345 17.3629C6.99781 16.9292 7.31059 15.7206 7.31059 15.3332L7.30838 7.01166Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="footer-wordmark">
            <span className="footer-wordmark-text">B2B POWERHOUSE</span>
            <div className="footer-wordmark-est">
              <span>EST</span>
              <svg width="6" height="6" viewBox="0 0 10 10" fill="currentColor" style={{ display: "inline-block", verticalAlign: "middle", margin: "0 4px", opacity: 0.4 }}><path d="M5 10L0 5L5 0L10 5L5 10Z" /></svg>
              <span>2014</span>
            </div>
          </div>

          <hr className="footer-rule" />

          <div className="footer-wrap">
            <div className="footer-column">
              <h2 className="smallprint-heading">Los Angeles</h2>
              <div className="margin-top-tiny"><p className="smallprint">1200 Industrial Blvd, Commerce, CA 90040</p></div>
            </div>
            <div className="footer-column align-center">
              <h2 className="smallprint-heading">Miami</h2>
              <div className="margin-top-tiny"><p className="smallprint">800 NW 25th Street, Wynwood, FL 33127</p></div>
            </div>
            <div className="footer-column align-right">
              <h2 className="smallprint-heading">London</h2>
              <div className="margin-top-tiny"><p className="smallprint">15 Old Burlington Street, Mayfair, W1S 3AJ</p></div>
            </div>
          </div>
        </footer>
      </div>

      <div className="fraud-banner">
        <div className="fraud-background" id="contact">
          <h2 className="fraud-heading">Fraud Alert:</h2>
          <p className="paragraph">
            B2B Powerhouse has identified scammers impersonating our firm and requesting processing fees for supply facilities.
            We <strong>never charge upfront fees</strong>, <strong>do not cold-outreach</strong>, and work <strong>only by referral</strong>.
          </p>
          <a href="#" className="fraud-link">Click here for more information</a>
          <div className="close-banner" id="closeFraud">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect width="21.9473" height="21.9482" rx="10.9737" fill="white" />
              <path d="M5.99097 5.99121L15.9564 15.9568" stroke="black" />
              <path d="M5.99097 15.957L15.9564 5.99149" stroke="black" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
