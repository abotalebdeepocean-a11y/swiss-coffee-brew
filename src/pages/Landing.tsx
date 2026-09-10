import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { LandingHero } from "@/components/rovento/LandingHero";
import { OfferBanner } from "@/components/rovento/OfferBanner";
import { EmotionalHook } from "@/components/rovento/EmotionalHook";
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
      "ROVENTO — بتجيب قهوة وبتشرب نص المذاق؟ | Espresso Coffee, Made in Egypt";
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
        {/* 1 — Hero: السؤال اللي يلمس الألم + الحل */}
        <LandingHero />

        {/* 2 — لمسة عاطفية: نفَس واحد قبل البيع */}
        <EmotionalHook />

        {/* 3 — اختار شخصيتك: قرار بسيط — قوي ولا ناعم */}
        <div id="profiles">
          <BlendProfiles />
        </div>

        {/* 4 — سبب واحد للشراء دلوقتي: العرض الحقيقي */}
        <OfferBanner />

        {/* 5 — ليه روفينتو: 3 أسباب */}
        <TrustPillars />

        {/* 6 — تفاصيل النكهة: للمقتنع اللي عايز يتأكد */}
        <div id="flavor">
          <FlavorProfile />
        </div>

        {/* 8 — Shipping & Returns (PK 7 placeholder for character-select: now Shipping & Returns) */}
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
