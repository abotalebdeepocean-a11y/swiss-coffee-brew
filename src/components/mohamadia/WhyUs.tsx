import { Shield, Globe, Search, CreditCard } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function WhyUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: CreditCard,
      title: t("feature1Title"),
      description: t("feature1Desc"),
    },
    {
      icon: Shield,
      title: t("feature2Title"),
      description: t("feature2Desc"),
    },
    {
      icon: Globe,
      title: t("feature3Title"),
      description: t("feature3Desc"),
    },
    {
      icon: Search,
      title: t("feature4Title"),
      description: t("feature4Desc"),
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-mh-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mh-gold/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mh-cream mb-4">
            {t("whyUsTitle")} <span className="text-mh-gold">{t("whyUsTitleHighlight")}</span>?
          </h2>
          <div className="gold-line w-24 mx-auto mb-6" />
          <p className="text-xl text-mh-cream/60 max-w-2xl mx-auto">
            {t("whyUsSubtitle")}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-dark-editorial rounded-2xl p-8 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-mh-gold/10 flex items-center justify-center mb-6 group-hover:bg-mh-gold/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-mh-gold" />
                </div>
                <h3 className="text-2xl font-bold text-mh-gold mb-3">
                  {feature.title}
                </h3>
                <p className="text-mh-cream/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
