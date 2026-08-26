import { Gem, Disc, Flame, Diamond, Box, Layers } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function Minerals() {
  const { t } = useTranslation();

  const minerals = [
    {
      icon: Gem,
      name: t("mineral1"),
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      icon: Disc,
      name: t("mineral2"),
      gradient: "from-orange-600 to-red-700",
    },
    {
      icon: Flame,
      name: t("mineral3"),
      gradient: "from-gray-400 to-gray-600",
    },
    {
      icon: Diamond,
      name: t("mineral4"),
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: Box,
      name: t("mineral5"),
      gradient: "from-slate-300 to-slate-500",
    },
    {
      icon: Layers,
      name: t("mineral6"),
      gradient: "from-indigo-400 to-purple-600",
    },
  ];

  return (
    <section
      id="minerals"
      className="py-24 bg-gradient-to-b from-mh-black to-mh-charcoal relative"
    >
      <div className="max-w-7xl mx-auto px-4">
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
              className="group relative overflow-hidden rounded-2xl border border-mh-gold/20 bg-mh-dark/50 hover:border-mh-gold/40 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity ${mineral.gradient}" />
              <div className="relative p-8 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${mineral.gradient} flex items-center justify-center shrink-0`}>
                  <mineral.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-mh-cream">
                    {mineral.name}
                  </h3>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mh-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-mh-gold/20 bg-mh-gold/5">
            <span className="text-mh-cream/70">
              {t("mineralExtra")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
