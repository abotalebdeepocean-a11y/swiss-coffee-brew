import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { Hero } from "@/components/rovento/Hero";
import { SignatureCollection } from "@/components/rovento/SignatureCollection";
import { ProductsGrid } from "@/components/rovento/ProductsGrid";
import { OfferSection } from "@/components/rovento/OfferSection";
import { WhyRovento } from "@/components/rovento/WhyRovento";
import { Testimonials } from "@/components/rovento/Testimonials";
import { TrustBar } from "@/components/rovento/TrustBar";
import { FAQ } from "@/components/rovento/FAQ";
import { Newsletter } from "@/components/rovento/Newsletter";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { ExitIntentPopup } from "@/components/rovento/ExitIntentPopup";
import { StorySlider } from "@/components/rovento/StorySlider";

export default function Landing() {
  useEffect(() => {
    document.title = "ROVENTO — محمصة قهوة مختصة في مصر | Specialty Coffee, Made in Egypt";
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0d0b09] text-stone-100 antialiased font-sans">
      <Header />
      <main>
        <Hero />
        {/* شريط إشعار التوصيل المجاني */}
        <div className="relative z-20 -mt-1 overflow-hidden bg-gradient-to-r from-rv-gold/20 via-rv-gold/10 to-rv-gold/20 py-3 border-y border-rv-gold/30">
          <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            <span className="mx-8 inline-flex items-center gap-2 text-sm font-bold text-rv-gold">
              🚚 التوصيل مجاني لكل المحافظات لمدة شهر كامل
              <span className="mx-4 text-rv-gold/40">✦</span>
              اطلب الآن واستمتع بالتوصيل المجاني
              <span className="mx-4 text-rv-gold/40">✦</span>
              التوصيل مجاني لكل المحافظات — العرض ساري لفترة محدودة
              <span className="mx-4 text-rv-gold/40">✦</span>
            </span>
            <span className="mx-8 inline-flex items-center gap-2 text-sm font-bold text-rv-gold">
              🚚 التوصيل مجاني لكل المحافظات لمدة شهر كامل
              <span className="mx-4 text-rv-gold/40">✦</span>
              اطلب الآن واستمتع بالتوصيل المجاني
              <span className="mx-4 text-rv-gold/40">✦</span>
              التوصيل مجاني لكل المحافظات — العرض ساري لفترة محدودة
              <span className="mx-4 text-rv-gold/40">✦</span>
            </span>
          </div>
        </div>
        <StorySlider />
        <SignatureCollection />
        <ProductsGrid />
        <OfferSection />
        {/* CustomBlendStudio — مخفي مؤقتاً */}
        <WhyRovento />
        <Testimonials />
        <TrustBar />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <ExitIntentPopup />
    </div>
  );
}
