import { Gem, Disc, Flame, Diamond, Box, Layers } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function Minerals() {
  const { t } = useTranslation();

  const minerals = [
    {
      icon: Gem,
      name: t("mineral1"),
      gradient: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-500/10",
      image: "/images/mohamadia/minerals/precious-metals.jpg",
    },
    {
      icon: Disc,
      name: t("mineral2"),
      gradient: "from-orange-600 to-red-700",
      bgColor: "bg-orange-500/10",
      image: "/images/mohamadia/minerals/nickel-chrome.jpg",
    },
    {
      icon: Flame,
      name: t("mineral3"),
      gradient: "from-gray-400 to-gray-600",
      bgColor: "bg-gray-500/10",
      image: "/images/mohamadia/minerals/nickel-chrome.jpg",
    },
    {
      icon: Diamond,
      name: t("mineral4"),
      gradient: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500/10",
      image: "/images/mohamadia/minerals/precious-metals.jpg",
    },
    {
      icon: Box,
      name: t("mineral5"),
      gradient: "from-slate-300 to-slate-500",
      bgColor: "bg-slate-500/10",
      image: "/images/mohamadia/minerals/metals-overview.webp",
    },
    {
      icon: Layers,
      name: t("mineral6"),
      gradient: "from-indigo-400 to-purple-600",
      bgColor: "bg-indigo-500/10",
      image: "/images/mohamadia/minerals/metals-overview.webp",
    },
  ];

  return (
    <section
      id="minerals"
      className="py-24 bg-gradient-to-b from-mh-black to-mh-charcoal relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-mh-gold/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-mh-gold/5 rounded-full blur-[60px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mh-cream mb-4">
            {t("mineralsTitle")} <span className="text-mh-gold">{t("mineralsTitleHighlight")}</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-6" />
          <p className="text-xl text-mh-cream/60 max-w-2xl mx-auto">
            {t("mineralsSubtitle")}
          </p>
        </div>

        {/* Minerals grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {minerals.map((mineral, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-mh-gold/20 bg-mh-dark/50 hover:border-mh-gold/40 transition-all hover:scale-105"
            >
              {/* Mineral Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={mineral.image}
                  alt={mineral.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mh-dark via-mh-dark/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${mineral.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <mineral.icon className="w-8 h-8 text-mh-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mh-cream group-hover:text-mh-gold transition-colors">
                      {mineral.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Gold accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mh-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-mh-gold/20 bg-mh-gold/5 hover:bg-mh-gold/10 transition-colors">
            <span className="text-mh-cream/70 text-lg">
              {t("mineralExtra")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
