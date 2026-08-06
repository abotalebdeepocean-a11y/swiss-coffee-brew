import { motion } from "framer-motion";
import {
  Zap,
  Flame,
  Award,
  ShieldCheck,
  Truck,
  Headset,
} from "lucide-react";
import { SectionHeading } from "./Section";

const FEATURES = [
  {
    icon: Zap,
    title: "تركيز أعلى",
    en: "SHARPER FOCUS",
    desc: "كافيين متوازن ونكهة نظيفة تمنحك قوة دفع لإنجاز يومك.",
  },
  {
    icon: Flame,
    title: "نكهة أغنى",
    en: "RICHER FLAVOR",
    desc: "تحميص احترافي يبرز طبقات النكهة من أول رشفة حتى آخر قطرة.",
  },
  {
    icon: Award,
    title: "تحميص احترافي",
    en: "CRAFT ROASTING",
    desc: "دفعات صغيرة ومنحنيات تحميص مضبوطة يوميًا على أيدي محمصين خبراء.",
  },
  {
    icon: ShieldCheck,
    title: "جودة ثابتة",
    en: "CONSISTENT QUALITY",
    desc: "كل كيس يمر بفحص جودة صارم — نفس المذاق في كل مرة تطلبها.",
  },
  {
    icon: Truck,
    title: "شحن سريع",
    en: "FAST SHIPPING",
    desc: "شحن لكل محافظات مصر خلال ٤٨ ساعة، وتوصيل مجاني للطلبات فوق ١٠٠٠ ج.م.",
  },
  {
    icon: Headset,
    title: "دعم العملاء",
    en: "REAL SUPPORT",
    desc: "فريقنا يرد عليك على واتساب من ٩ صباحًا حتى ١١ مساءً يوميًا.",
  },
];

export function WhyRovento() {
  return (
    <section id="why" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeading
          index="04"
          kicker="Why ROVENTO"
          title={
            <>
              لماذا <span className="text-rv-red">روفينتو</span>؟
            </>
          }
          desc="لسنا مجرد براند قهوة. نحن طقوس يومية لعقول مصرية تصنع الفرق."
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
