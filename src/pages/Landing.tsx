import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { LuxuryHero } from "@/components/rovento/LuxuryHero";
import { CharacterSelect } from "@/components/rovento/CharacterSelect";
import { IdentityProof } from "@/components/rovento/IdentityProof";
import { RoasteryStory } from "@/components/rovento/RoasteryStory";
import { LuxurySpecs } from "@/components/rovento/LuxurySpecs";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";

export default function Landing() {
  useEffect(() => {
    document.title = "ROVENTO — محمصة قهوة مختصة في مصر | Specialty Coffee, Made in Egypt";
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div dir="rtl" className="relative min-h-screen bg-rv-black text-white antialiased font-sans">
      <Header />
      <main>
        <LuxuryHero />
        {/* Free delivery marquee */}
        <div className="relative z-20 overflow-hidden border-y border-rv-gold/10 bg-rv-gold/[0.03] py-3">
          <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="mx-8 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-rv-gold/60 uppercase">
                شحن مجاني لكل المحافظات
                <span className="mx-3 text-rv-gold/20">✦</span>
                الدفع عند الاستلام
                <span className="mx-3 text-rv-gold/20">✦</span>
                ضمان 30 يوم
                <span className="mx-3 text-rv-gold/20">✦</span>
                تحميص طازج يومياً في القاهرة
                <span className="mx-3 text-rv-gold/20">✦</span>
              </span>
            ))}
          </div>
        </div>
        <CharacterSelect />
        <IdentityProof />
        <RoasteryStory />
        <LuxurySpecs />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </div>
  );
}
