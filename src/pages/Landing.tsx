import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { BannerSlider } from "@/components/rovento/BannerSlider";
import { Hero } from "@/components/rovento/Hero";
import { SignatureCollection } from "@/components/rovento/SignatureCollection";
import { OfferSection } from "@/components/rovento/OfferSection";
import { MokaSpotlight } from "@/components/rovento/MokaSpotlight";
import { BestSellers } from "@/components/rovento/BestSellers";
import { OtherVarieties } from "@/components/rovento/OtherVarieties";
import { WhyRovento } from "@/components/rovento/WhyRovento";
import { Testimonials } from "@/components/rovento/Testimonials";
import { TrustBar } from "@/components/rovento/TrustBar";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { ExitIntentPopup } from "@/components/rovento/ExitIntentPopup";

/**
 * Sales-funnel landing — ترتيب الأقسام ثابت:
 * البنر الرئيسي → الهيرو (يبيع بسرعة) → اختار شخصيتك → عرض الأسبوع (عداد)
 * → موكا بوت بريكا → الأكثر طلبًا (سطر واحد) → أصناف أخرى (فلاتر)
 * → لماذا روفينتو → آراء العملاء → الثقة → الفوتر.
 */
export default function Landing() {
  useEffect(() => {
    document.title =
      "روڤينتو ROVENTO | قهوة مختصة مصرية — حبوب إسبريسو وتحضير احترافي";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <BannerSlider />
        <Hero />
        <SignatureCollection />
        <OfferSection />
        <MokaSpotlight />
        <BestSellers />
        <OtherVarieties />
        <WhyRovento />
        <Testimonials />
      </main>
      <TrustBar />
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <ExitIntentPopup />
    </div>
  );
}
