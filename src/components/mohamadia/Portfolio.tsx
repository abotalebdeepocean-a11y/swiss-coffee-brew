import { Building2, Globe2, Truck, Briefcase } from "lucide-react";

const portfolioItems = [
  {
    icon: Building2,
    title: "مشاريع مقاولات عامة",
    description: "تنفيذ مشاريع بناء وتشييد وفق أعلى المعايير",
  },
  {
    icon: Truck,
    title: "توريدات حكومية وتجارية",
    description: "توريد المواد والمعدات للقطاعين العام والخاص",
  },
  {
    icon: Globe2,
    title: "شركات تجارية دولية",
    description: "روابط تجارية مع شركاء في أسواق عالمية",
  },
  {
    icon: Briefcase,
    title: "استشارات تجارية",
    description: "حلول استشارية للمشاريع الاستراتيجية",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-mh-black relative">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 grid-dark" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mh-cream mb-4">
            سابقة <span className="text-mh-gold">أعمال مختارة</span>
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
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-mh-gold/10 flex items-center justify-center shrink-0 group-hover:bg-mh-gold/20 transition-colors">
                    <item.icon className="w-7 h-7 text-mh-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-mh-cream mb-2">
                      {item.title}
                    </h3>
                    <p className="text-mh-cream/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-mh-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
