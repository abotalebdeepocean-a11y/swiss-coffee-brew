import { Shield, Globe, Search, CreditCard } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function WhyUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: CreditCard,
      title: t("feature1Title"),
      description: t("feature1Desc"),
      image: "/images/mohamadia/business-meeting.jpg",
    },
    {
      icon: Shield,
      title: t("feature2Title"),
      description: t("feature2Desc"),
      image: "/images/mohamadia/construction-1.jpg",
    },
    {
      icon: Globe,
      title: t("feature3Title"),
      description: t("feature3Desc"),
      image: "/images/mohamadia/construction-2.jpg",
    },
    {
      icon: Search,
      title: t("feature4Title"),
      description: t("feature4Desc"),
      image: "/images/mohamadia/construction-3.jpg",
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
              className="card-dark-editorial rounded-2xl overflow-hidden group"
            >
              {/* Feature image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mh-black/80 via-mh-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-full bg-mh-gold/20 backdrop-blur-sm flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-mh-gold" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-mh-gold mb-2">
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
