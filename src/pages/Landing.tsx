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
import { FloatingCoffeeBeans } from "@/components/rovento/FloatingCoffeeBeans";

export default function Landing() {
  useEffect(() => {
    document.title = "ROVENTO — محمصة قهوة مختصة في مصر | Specialty Coffee, Made in Egypt";
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div dir="rtl" className="relative min-h-screen bg-[#0a0a0a] text-white antialiased font-sans overflow-hidden">
      {/* Floating coffee beans — interactive background */}
      <FloatingCoffeeBeans />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          {/* Free delivery marquee */}
          <div className="relative z-20 overflow-hidden border-y border-rv-red/20 bg-rv-red/5 py-3">
            <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap">
              <span className="mx-8 inline-flex items-center gap-2 text-sm font-bold text-rv-red">
                التوصيل مجاني لكل المحافظات لمدة شهر كامل
                <span className="mx-4 text-rv-red/30">✦</span>
                اطلب الآن واستمتع بالتوصيل المجاني
                <span className="mx-4 text-rv-red/30">✦</span>
                التوصيل مجاني لكل المحافظات — العرض ساري لفترة محدودة
                <span className="mx-4 text-rv-red/30">✦</span>
              </span>
              <span className="mx-8 inline-flex items-center gap-2 text-sm font-bold text-rv-red">
                التوصيل مجاني لكل المحافظات لمدة شهر كامل
                <span className="mx-4 text-rv-red/30">✦</span>
                اطلب الآن واستمتع بالتوصيل المجاني
                <span className="mx-4 text-rv-red/30">✦</span>
                التوصيل مجاني لكل المحافظات — العرض ساري لفترة محدودة
                <span className="mx-4 text-rv-red/30">✦</span>
              </span>
            </div>
          </div>
          <StorySlider />
          <SignatureCollection />
          <ProductsGrid />
          <OfferSection />
          {/* CustomBlendStudio — temporarily hidden */}
          <WhyRovento />
          <Testimonials />
          <TrustBar />
          <FAQ />
          <Newsletter />
        </main>
        <Footer />
      </div>
      <CartDrawer />
      <WhatsAppFloat />
      <ExitIntentPopup />
    </div>
  );
}
