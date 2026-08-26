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
    </div>
  );
}
