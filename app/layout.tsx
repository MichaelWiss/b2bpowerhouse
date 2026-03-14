import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/animation/SmoothScroll";
import PageTransition from "@/components/animation/PageTransition";
import CeleresAnimations from "@/components/animation/CeleresAnimations";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "B2B Powerhouse — Premium Gym Equipment Wholesale",
  description: "Premium gym equipment, direct to operators. Wholesale pricing for boutique studios, hotel fitness centres, and commercial gym chains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cormorant.variable}>
        <SmoothScroll />
        <PageTransition />
        <div className="cursor-wrapper">
          <div className="cursor">
            <div className="ring" />
            <div className="ring" />
          </div>
        </div>
        <CeleresAnimations />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
