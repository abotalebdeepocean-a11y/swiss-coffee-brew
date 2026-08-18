import { useEffect } from "react";
import { Header } from "@/components/mohamadia/Header";
import { Hero } from "@/components/mohamadia/Hero";
import { WhoWeAre } from "@/components/mohamadia/WhoWeAre";
import { Sectors } from "@/components/mohamadia/Sectors";
import { Chairman } from "@/components/mohamadia/Chairman";
import { Leadership } from "@/components/mohamadia/Leadership";
import { Values } from "@/components/mohamadia/Values";
import { WhyUs } from "@/components/mohamadia/WhyUs";
import { Portfolio } from "@/components/mohamadia/Portfolio";
import { Contact } from "@/components/mohamadia/Contact";
import { Footer } from "@/components/mohamadia/Footer";
import { WhatsAppFloat } from "@/components/mohamadia/WhatsAppFloat";
import { ExportTool } from "@/components/mohamadia/ExportTool";

/**
 * بروفايل شركة المحمدية للمقاولات العامة والتوريدات العمومية —
 * صفحة تعريفية احترافية بهوية minimalist editorial (أسود + أبيض + بيج).
 */
export default function Landing() {
  useEffect(() => {
    document.title = "شركة المحمدية للمقاولات العامة والتوريدات العمومية";
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-mh-cream text-mh-black">
      <Header />
      <main id="mohamadia-export-target">
        <Hero />
        <WhoWeAre />
        <Sectors />
        <Chairman />
        <Leadership />
        <Values />
        <WhyUs />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ExportTool />
    </div>
  );
}
