import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { LandingHero } from "@/components/rovento/LandingHero";
import { RoventoVisualStory } from "@/components/rovento/RoventoVisualStory";
import { BlendProfiles } from "@/components/rovento/BlendProfiles";
import { TurkishCollection } from "@/components/rovento/TurkishCollection";
import { TrustPillars } from "@/components/rovento/TrustPillars";
import { ShippingReturnsBanner } from "@/components/rovento/ShippingReturnsBanner";
import { FAQ } from "@/components/rovento/FAQ";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";

export default function Landing() {
  useEffect(() => {
    document.title =
      "ROVENTO — انقل حصاد الجبل لبيتك! | قهوة مصرية بتحمص لطلبك";
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
        {/* الهيرو — سلايدر البانرات + الكيسين + بروفايل النكهة */}
        <LandingHero />
        <RoventoVisualStory />

        {/* البلندات — اختار شخصيتك: قوي ولا فاخر؟ */}
        <div id="profiles">
          <BlendProfiles />
        <TurkishCollection />
        </div>

        {/* ليه روفينتو — الثقة بعد المنتج */}
        <TrustPillars />

        {/* الشحن والضمان — إزالة آخر عذر */}
        <div id="shipping">
          <ShippingReturnsBanner />
        </div>

        {/* FAQ */}
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </div>
  );
}
