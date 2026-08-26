import { ArrowDown, Phone, Package } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background - Clean gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-mh-black via-mh-charcoal to-mh-black" />
        <div className="absolute inset-0 opacity-10 grid-editorial" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-mh-gold/10 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mh-gold/30 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 py-32 text-center">
        <div>
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
          <p className="text-xl md:text-2xl text-mh-cream/70 max-w-4xl mx-auto mb-12 leading-relaxed">
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
        </div>
      </div>

      {/* Banner Images Section - New project images */}
      <div className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Modular Building */}
            <div className="relative h-32 md:h-40 rounded-xl overflow-hidden group">
              <img
                src="/images/mohamadia/Projects/modular-building.jpg"
                alt="مباني معيارية"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-mh-gold/0 group-hover:bg-mh-gold/20 transition-colors" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs md:text-sm text-white bg-mh-black/70 px-2 py-1 rounded backdrop-blur-sm">
                  مباني معيارية
                </span>
              </div>
            </div>

            {/* Office Buildings */}
            <div className="relative h-32 md:h-40 rounded-xl overflow-hidden group">
              <img
                src="/images/mohamadia/Projects/office-buildings.webp"
                alt="مباني إدارية"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-mh-gold/0 group-hover:bg-mh-gold/20 transition-colors" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs md:text-sm text-white bg-mh-black/70 px-2 py-1 rounded backdrop-blur-sm">
                  مباني إدارية
                </span>
              </div>
            </div>

            {/* Construction Project 1 */}
            <div className="relative h-32 md:h-40 rounded-xl overflow-hidden group">
              <img
                src="/images/mohamadia/Projects/construction-project-1.jpg"
                alt="مشاريع إنشائية"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-mh-gold/0 group-hover:bg-mh-gold/20 transition-colors" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs md:text-sm text-white bg-mh-black/70 px-2 py-1 rounded backdrop-blur-sm">
                  مشاريع إنشائية
                </span>
              </div>
            </div>

            {/* Construction Project 2 */}
            <div className="relative h-32 md:h-40 rounded-xl overflow-hidden group">
              <img
                src="/images/mohamadia/Projects/construction-project-2.jpg"
                alt="مشاريع عامة"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-mh-gold/0 group-hover:bg-mh-gold/20 transition-colors" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs md:text-sm text-white bg-mh-black/70 px-2 py-1 rounded backdrop-blur-sm">
                  مشاريع عامة
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
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
