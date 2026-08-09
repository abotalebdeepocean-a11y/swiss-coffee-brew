import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { BannerSlider } from "@/components/rovento/BannerSlider";
import { Hero } from "@/components/rovento/Hero";
import { OfferSection } from "@/components/rovento/OfferSection";
import { MokaSpotlight } from "@/components/rovento/MokaSpotlight";
import { BestSellers } from "@/components/rovento/BestSellers";
import { OtherVarieties } from "@/components/rovento/OtherVarieties";
import { WhyRovento } from "@/components/rovento/WhyRovento";
import { Testimonials } from "@/components/rovento/Testimonials";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";

/**
 * Sales-funnel landing:
 * البنر الرئيسي → الهيرو (كيس واضح) → عرض كيسين → موكا بوت بريكا →
 * الأكثر طلبًا (سطر واحد) → أصناف أخرى → لماذا روفينتو → آراء العملاء.
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
        <OfferSection />
        <MokaSpotlight />
        <BestSellers />
        <OtherVarieties />
        <WhyRovento />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </div>
  );
}
