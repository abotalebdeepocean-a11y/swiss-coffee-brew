import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { LandingHero } from "@/components/rovento/LandingHero";
import { OfferBanner } from "@/components/rovento/OfferBanner";
import { FeaturedProduct } from "@/components/rovento/FeaturedProduct";
import { EmotionalHook } from "@/components/rovento/EmotionalHook";
import { CharacterSelect } from "@/components/rovento/CharacterSelect";
import { BlendProfiles } from "@/components/rovento/BlendProfiles";
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
      "ROVENTO — خذ حصاد الجبل إلى بيتك | Specialty Coffee, Made in Egypt";
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
        {/* 1 — Hero: Mountain Harvest cinematic scene */}
        <LandingHero />

        {/* 2 — اعرف بلندك: deep blend profiles (Premium first) */}
        <div id="profiles">
          <BlendProfiles />
        </div>

        {/* 3 — تفاصيل النكهة: flavor proof right after the profiles */}
        <div id="flavor">
          <FlavorProfile />
        </div>

        {/* 4 — The ONE real dated offer */}
        <OfferBanner />

        {/* 5 — FEATURED PRODUCT spotlight (sales funnel: attention → focus) */}
        <div id="featured">
          <FeaturedProduct />
        </div>

        {/* 6 — Emotional pause */}
        <EmotionalHook />

        {/* 7 — اختار شخصيتك (split comparison) */}
        <div id="products">
          <CharacterSelect />
        </div>

        {/* 8 — Why Rovento (trust pillars) */}
        <TrustPillars />

        {/* 9 — Shipping & Returns */}
        <div id="shipping">
          <ShippingReturnsBanner />
        </div>

        {/* 10 — FAQ */}
        <div id="faq">
          <FAQ />
        </div>

        {/* 11 — Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <RippleFX />
    </div>
  );
}
