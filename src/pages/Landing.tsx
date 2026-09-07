import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { LandingHero } from "@/components/rovento/LandingHero";
import { OfferBanner } from "@/components/rovento/OfferBanner";
import { EmotionalHook } from "@/components/rovento/EmotionalHook";
import { CharacterSelect } from "@/components/rovento/CharacterSelect";
import { TrustPillars } from "@/components/rovento/TrustPillars";
import { FlavorProfile } from "@/components/rovento/FlavorProfile";
import { ShippingReturnsBanner } from "@/components/rovento/ShippingReturnsBanner";
import { FAQ } from "@/components/rovento/FAQ";
import { FinalCTA } from "@/components/rovento/FinalCTA";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { RippleFX } from "@/components/rovento/RippleFX";

export default function Landing() {
  useEffect(() => {
    document.title =
      "ROVENTO — إسبريسو يستاهل الاسم | Specialty Coffee, Made in Egypt";
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-[#0a0a0a] font-sans text-white antialiased"
    >
      <Header />
      <main>
        {/* Section 1 — Hero (Attention) */}
        <LandingHero />

        {/* Section 2 — The ONE real dated offer (free shipping + 10% off 2kg) */}
        <OfferBanner />

        {/* Section 2 — Emotional Hook */}
        <EmotionalHook />

        {/* Section 3 — Choose Your Character (split comparison) */}
        <div id="products">
          <CharacterSelect />
        </div>

        {/* Section 4 — Why Rovento (trust pillars) */}
        <TrustPillars />

        {/* Section 5 — Flavor Profile Proof */}
        <div id="flavor">
          <FlavorProfile />
        </div>

        {/* Section 6 — Shipping & Returns (glassmorphism banner) */}
        <div id="shipping">
          <ShippingReturnsBanner />
        </div>

        {/* Section 7 — FAQ */}
        <div id="faq">
          <FAQ />
        </div>

        {/* Section 8 — Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <RippleFX />
    </div>
  );
}
