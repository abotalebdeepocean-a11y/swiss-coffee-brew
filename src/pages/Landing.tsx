import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { LandingHero } from "@/components/rovento/LandingHero";
import { ProductsShowcase } from "@/components/rovento/ProductsShowcase";
import { FeatureHighlights } from "@/components/rovento/FeatureHighlights";
import { FreeShippingCountdown } from "@/components/rovento/FreeShippingCountdown";
import { FinalCallToAction } from "@/components/rovento/FinalCallToAction";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { RippleFX } from "@/components/rovento/RippleFX";

export default function Landing() {
  useEffect(() => {
    document.title = "ROVENTO — محمصة قهوة مختصة في مصر | Specialty Coffee, Made in Egypt";
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div dir="rtl" className="relative min-h-screen bg-rv-black font-sans text-white antialiased">
      <Header />
      <main>
        <LandingHero />
        <ProductsShowcase />
        <FeatureHighlights />
        <FreeShippingCountdown />
        <FinalCallToAction />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <RippleFX />
    </div>
  );
}
