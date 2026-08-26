import { useEffect } from "react";
import { Header } from "@/components/mohamadia/Header";
import { Hero } from "@/components/mohamadia/Hero";
import { WhyUs } from "@/components/mohamadia/WhyUs";
import { Minerals } from "@/components/mohamadia/Minerals";
import { Portfolio } from "@/components/mohamadia/Portfolio";
import { CeoProfile } from "@/components/mohamadia/CeoProfile";
import { Contact } from "@/components/mohamadia/Contact";
import { Footer } from "@/components/mohamadia/Footer";
import { useTranslation } from "@/lib/I18nProvider";

export default function Landing() {
  const { locale } = useTranslation();

  useEffect(() => {
    document.title = locale === "ar"
      ? "المحمدية للمقاولات العامة والتوريدات العمومية"
      : "Al Muhamadia for General Contracting & Supplies";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className={`min-h-screen bg-mh-black text-stone-100 antialiased ${locale === "ar" ? "font-sans" : "font-sans"}`}>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Minerals />
        <Portfolio />
        <CeoProfile />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
