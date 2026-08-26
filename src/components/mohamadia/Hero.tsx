import { ArrowDown, Phone, Package } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Company profile image as background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/mohamadia/company-profile.png')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-mh-black/80 via-mh-black/70 to-mh-black/90" />
        <div className="absolute inset-0 opacity-10 grid-editorial" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-mh-gold/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-mh-gold/30 bg-mh-gold/10 mb-8 backdrop-blur-sm">
          <span className="text-mh-gold text-sm font-medium">
            {t("badge")}
          </span>
        </div>

        {/* Main heading */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-mh-gold">{t("heroTitle1")}</span>
          <br />
          <span className="text-mh-cream">{t("heroTitle2")}</span>
          <br />
          <span className="text-mh-cream">{t("heroTitle3")}</span>
        </h2>

        {/* Description */}
        <p className="text-xl md:text-2xl text-mh-cream/70 max-w-4xl mx-auto mb-12 leading-relaxed backdrop-blur-sm bg-mh-black/30 p-4 rounded-xl">
          {t("heroDesc")}
          <span className="text-mh-gold font-semibold">{t("heroDescHighlight")}</span>
          {t("heroDescEnd")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="tel:+201060991949"
            className="flex items-center gap-3 bg-mh-gold text-mh-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-mh-gold-soft transition-all hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            {t("callNow")}
          </a>
          <a
            href="#minerals"
            className="flex items-center gap-3 border-2 border-mh-gold text-mh-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-mh-gold/10 transition-all backdrop-blur-sm"
          >
            <Package className="w-5 h-5" />
            {t("requiredMinerals")}
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#why-us"
          className="inline-flex flex-col items-center text-mh-cream/50 hover:text-mh-gold transition-colors"
        >
          <span className="text-sm mb-2">{t("discoverMore")}</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
