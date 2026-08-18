import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { BannerSlider } from "@/components/rovento/BannerSlider";
import { Hero } from "@/components/rovento/Hero";
import { SignatureCollection } from "@/components/rovento/SignatureCollection";
import { OfferSection } from "@/components/rovento/OfferSection";
import { MokaSpotlight } from "@/components/rovento/MokaSpotlight";
import { BestSellers } from "@/components/rovento/BestSellers";
import { CustomBlendStudio } from "@/components/rovento/CustomBlendStudio";
import { OtherVarieties } from "@/components/rovento/OtherVarieties";
import { WhyRovento } from "@/components/rovento/WhyRovento";
import { Testimonials } from "@/components/rovento/Testimonials";
import { TrustBar } from "@/components/rovento/TrustBar";
import { Footer } from "@/components/rovento/Footer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { ExitIntentPopup } from "@/components/rovento/ExitIntentPopup";

export default function Landing() {
  useEffect(() => {
    document.title = "ROVENTO | روفينتو — قهوة مختصة مصرية";
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-coffee-950 text-stone-100 antialiased">
      <Header />
      <main>
        <BannerSlider />
        <Hero />
        <SignatureCollection />
        <OfferSection />
        <MokaSpotlight />
        <BestSellers />
        <CustomBlendStudio />
        <OtherVarieties />
        <WhyRovento />
        <Testimonials />
        <TrustBar />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <ExitIntentPopup />
    </div>
  );
}
