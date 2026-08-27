import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { Hero } from "@/components/rovento/Hero";
import { BannerSlider } from "@/components/rovento/BannerSlider";
import { SignatureCollection } from "@/components/rovento/SignatureCollection";
import { ProductsGrid } from "@/components/rovento/ProductsGrid";
import { OfferSection } from "@/components/rovento/OfferSection";
import { MokaSpotlight } from "@/components/rovento/MokaSpotlight";
import { CustomBlendStudio } from "@/components/rovento/CustomBlendStudio";
import { WhyRovento } from "@/components/rovento/WhyRovento";
import { Testimonials } from "@/components/rovento/Testimonials";
import { TrustBar } from "@/components/rovento/TrustBar";
import { FAQ } from "@/components/rovento/FAQ";
import { Newsletter } from "@/components/rovento/Newsletter";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { ExitIntentPopup } from "@/components/rovento/ExitIntentPopup";

export default function Landing() {
  useEffect(() => {
    document.title = "ROVENTO — القهوة المختصة... بطابع إيطالي | Specialty Coffee, Italian Soul";
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0A0A0A] text-stone-100 antialiased font-sans">
      <Header />
      <main>
        <BannerSlider />
        <Hero />
        <SignatureCollection />
        <ProductsGrid />
        <OfferSection />
        <MokaSpotlight />
        <CustomBlendStudio />
        <WhyRovento />
        <Testimonials />
        <TrustBar />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <ExitIntentPopup />

      {/* Floating Invoice Download Button */}
      <a
        href="/rovento-invoice-A5.doc"
        download="rovento-invoice-A5.doc"
        className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89728] px-4 py-3 font-bold text-black shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        تحميل فاتورة Word
      </a>
    </div>
  );
}
