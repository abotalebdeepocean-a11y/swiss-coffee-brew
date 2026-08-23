import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { BannerSlider } from "@/components/rovento/BannerSlider";
import { Hero } from "@/components/rovento/Hero";
import { SignatureCollection } from "@/components/rovento/SignatureCollection";
import { OfferSection } from "@/components/rovento/OfferSection";
import { MokaSpotlight } from "@/components/rovento/MokaSpotlight";
import { CustomBlendStudio } from "@/components/rovento/CustomBlendStudio";
import { OtherVarieties } from "@/components/rovento/OtherVarieties";
import { WhyRovento } from "@/components/rovento/WhyRovento";
import { Testimonials } from "@/components/rovento/Testimonials";
import { TrustBar } from "@/components/rovento/TrustBar";
import { FAQ } from "@/components/rovento/FAQ";
import { Newsletter } from "@/components/rovento/Newsletter";
import { Footer } from "@/components/rovento/Footer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { BrikkaStickyBar } from "@/components/rovento/BrikkaStickyBar";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { ExitIntentPopup } from "@/components/rovento/ExitIntentPopup";
import { LoadingScreen } from "@/components/rovento/LoadingScreen";
import { FadeIn } from "@/components/rovento/FadeIn";

export default function Landing() {
  useEffect(() => {
    document.title = "ROVENTO | روفينتو — قهوة مختصة مصرية";
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-coffee-950 text-stone-100 antialiased">
      <LoadingScreen />
      <Header />
      <main>
        <BannerSlider />
        <Hero />
        <FadeIn><SignatureCollection /></FadeIn>
        <FadeIn><OfferSection /></FadeIn>
        <FadeIn><MokaSpotlight /></FadeIn>
        <FadeIn><CustomBlendStudio /></FadeIn>
        <FadeIn><OtherVarieties /></FadeIn>
        <FadeIn><WhyRovento /></FadeIn>
        <FadeIn><Testimonials /></FadeIn>
        <FadeIn><TrustBar /></FadeIn>
        <FadeIn><FAQ /></FadeIn>
        <FadeIn><Newsletter /></FadeIn>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <BrikkaStickyBar />
      <ExitIntentPopup />
    </div>
  );
}
