import { useEffect } from "react";
import { Header } from "@/components/mohamadia/Header";
import { Hero } from "@/components/mohamadia/Hero";
import { Chairman } from "@/components/mohamadia/Chairman";
import { Leadership } from "@/components/mohamadia/Leadership";
import { Values } from "@/components/mohamadia/Values";
import { WhyUs } from "@/components/mohamadia/WhyUs";
import { Metals } from "@/components/mohamadia/Metals";
import { Works } from "@/components/mohamadia/Works";
import { Contact } from "@/components/mohamadia/Contact";
import { Footer } from "@/components/mohamadia/Footer";
import { WhatsAppFloat } from "@/components/mohamadia/WhatsAppFloat";
import { ExportTool } from "@/components/mohamadia/ExportTool";

/**
 * بروفايل شركة المحمدية للمقاولات العامة والتوريدات العمومية —
 * صفحة تعريفية احترافية بأسلوب راقٍ (ناف بلو + ذهبي).
 * الهيرو (الشركة + بطاقة المدير التنفيذي) → كلمة رئيس مجلس الإدارة
 * → ما يميز قيادتنا → قيمنا → لماذا المحمدية؟ → المعادن المطلوبة
 * → سابقة أعمال مختارة → تواصل معنا → الفوتر.
 */
export default function Landing() {
  useEffect(() => {
    document.title = "شركة المحمدية للمقاولات العامة والتوريدات العمومية";
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-mh-navy-950 text-foreground">
      <Header />
      <main>
        <Hero />
        <Chairman />
        <Leadership />
        <Values />
        <WhyUs />
        <Metals />
        <Works />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ExportTool />
    </div>
  );
}
