import { motion } from "framer-motion";
import {
  Flame,
  Package,
  Truck,
  Headset,
  RotateCcw,
  Coffee,
} from "lucide-react";
import { SectionHeading } from "./Section";

const FEATURES = [
  {
    icon: Flame,
    title: "تحميص طازج",
    en: "FRESH ROAST",
    desc: "نحمص على دفعات صغيرة أسبوعيًا للحفاظ على النكهة — الكيس اللي يصلك محمص حديثًا.",
  },
  {
    icon: Coffee,
    title: "حبوب مختارة",
    en: "SELECTED BEANS",
    desc: "مزج مدروس من أجود حبوب الأرابيكا والروبوستا من مزارع موثوقة.",
  },
  {
    icon: Package,
    title: "تغليف احترافي",
    en: "PRO PACKAGING",
    desc: "صمام أحادي الاتجاه يحافظ على الطزاجة ويمنع دخول الهواء والأكسدة.",
  },
  {
    icon: Headset,
    title: "دعم حقيقي",
    en: "REAL SUPPORT",
    desc: "واتساب مباشر لأي استفسار — فريقنا يرد من ٩ صباحًا حتى ١١ مساءً يوميًا.",
  },
  {
    icon: Truck,
    title: "شحن سريع",
    en: "FAST SHIPPING",
    desc: "خلال ٢٤–٧٢ ساعة لكل محافظات مصر، وتوصيل مجاني للطلبات فوق ١٠٠٠ ج.م.",
  },
  {
    icon: RotateCcw,
    title: "استرجاع سهل",
    en: "EASY RETURNS",
    desc: "في حالة وجود أي مشكلة بالمنتج — نستبدله لك أو نرد فلوسك بلا تعقيد.",
  },
];

export function WhyRovento() {
  return (
    <section id="why" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeading
          index="07"
          kicker="Why ROVENTO"
          title={
            <>
              لماذا <span className="text-rv-red">روفينتو</span>؟
            </>
          }
          desc="بن شاهين وعبد المعبود وLavazza عندهم قهوة… لكن اللي عندنا: تحميص طازج، دعم حقيقي، وتجربة كاملة لحد باب بيتك."
        />

        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.en}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative bg-background p-7 transition-colors hover:bg-rv-ink"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid size-12 place-items-center border transition-colors ${
                    i % 3 === 0
                      ? "border-rv-red/40 text-rv-red group-hover:bg-rv-red group-hover:text-white"
                      : i % 3 === 1
                        ? "border-rv-blue/40 text-rv-blue group-hover:bg-rv-blue group-hover:text-white"
                        : "border-rv-gold/40 text-rv-gold group-hover:bg-rv-gold group-hover:text-black"
                  }`}
                >
                  <f.icon className="size-5" />
                </span>
                <span className="font-mono text-xs tracking-[0.3em] text-white/20">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{f.title}</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                {f.en}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
