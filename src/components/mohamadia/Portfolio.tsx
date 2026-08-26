import { Building2, Globe2, Truck, Briefcase } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function Portfolio() {
  const { t } = useTranslation();

  const portfolioItems = [
    {
      icon: Building2,
      title: t("portfolio1"),
      description: t("portfolio1Desc"),
      image: "/images/mohamadia/سابق. الاعمال/construction-1.jpg",
    },
    {
      icon: Truck,
      title: t("portfolio2"),
      description: t("portfolio2Desc"),
      image: "/images/mohamadia/سابق. الاعمال/mining-project.jpg",
    },
    {
      icon: Globe2,
      title: t("portfolio3"),
      description: t("portfolio3Desc"),
      image: "/images/mohamadia/سابق. الاعمال/trading-project.jpg",
    },
    {
      icon: Briefcase,
      title: t("portfolio4"),
      description: t("portfolio4Desc"),
      image: "/images/mohamadia/سابق. الاعمال/precious-metals.jpg",
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-mh-black relative">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 grid-dark" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mh-cream mb-4">
            {t("portfolioTitle")} <span className="text-mh-gold">{t("portfolioTitleHighlight")}</span>
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        {/* Portfolio grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-mh-charcoal border border-mh-gold/10 hover:border-mh-gold/30 transition-all"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mh-charcoal via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-mh-gold/10 flex items-center justify-center shrink-0 group-hover:bg-mh-gold/20 transition-colors">
                    <item.icon className="w-6 h-6 text-mh-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mh-cream mb-2">
                      {item.title}
                    </h3>
                    <p className="text-mh-cream/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional images gallery */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="relative h-40 rounded-xl overflow-hidden group">
            <img
              src="/images/mohamadia/سابق. الاعمال/construction-2.jpg"
              alt="مشاريعنا"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-mh-gold/0 group-hover:bg-mh-gold/20 transition-colors" />
          </div>
          <div className="relative h-40 rounded-xl overflow-hidden group">
            <img
              src="/images/mohamadia/سابق. الاعمال/construction-3.jpg"
              alt="مشاريعنا"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-mh-gold/0 group-hover:bg-mh-gold/20 transition-colors" />
          </div>
          <div className="relative h-40 rounded-xl overflow-hidden group">
            <img
              src="/images/mohamadia/سابق. الاعمال/rhodium-sample.jpg"
              alt="مشاريعنا"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-mh-gold/0 group-hover:bg-mh-gold/20 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}
