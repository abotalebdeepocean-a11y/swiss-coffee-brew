import { useEffect } from "react";
import { Header } from "@/components/rovento/Header";
import { Hero } from "@/components/rovento/Hero";
import { BannerSlider } from "@/components/rovento/BannerSlider";
import { Categories } from "@/components/rovento/Categories";
import { SignatureCollection } from "@/components/rovento/SignatureCollection";
import { FeaturedProducts } from "@/components/rovento/FeaturedProducts";
import { WhyRovento } from "@/components/rovento/WhyRovento";
import { Testimonials } from "@/components/rovento/Testimonials";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";

export default function Landing() {
  useEffect(() => {
    document.title =
      "روڤينتو ROVENTO | قهوة مختصة مصرية — حبوب إسبريسو وتحضير احترافي";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <BannerSlider />
        <Categories />
        <SignatureCollection />
        <FeaturedProducts />
        <WhyRovento />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </div>
  );
}
