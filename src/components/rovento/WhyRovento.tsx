import { motion } from "framer-motion";
import {
  Flame,
  Package,
  Truck,
  Headset,
  RotateCcw,
  Sprout,
} from "lucide-react";

const FEATURES = [
  {
    icon: Flame,
    emoji: "🔥",
    title: "تحميص طازج",
    desc: "نحمص القهوة في القاهرة على دفعات صغيرة ومدروسة للحفاظ على النكهة العطرية والطزاجة القصوى قبل وصولها إليك مباشرة.",
  },
  {
    icon: Sprout,
    emoji: "🌱",
    title: "حبوب مختارة بعناية",
    desc: "مزج مدروس بعناية من أجود حبوب الأرابيكا والروبوستا العالمية لضمان القوام الغني والكريما الذهبية بدون مرارة مزعجة.",
  },
  {
    icon: Package,
    emoji: "🛡️",
    title: "تغليف احترافي",
    desc: "عبوات فاخرة مزودة بصمام أحادي الاتجاه (One-way Valve) لتفريغ الغازات وحفظ الزيوت العطرية من الأكسدة والرطوبة.",
  },
  {
    icon: Headset,
    emoji: "💬",
    title: "دعم حقيقي واستشارة",
    desc: "فريقنا متاح عبر واتساب المباشر لمساعدتك في ترشيح نوع القهوة والطحنة المناسبة لأدواتك — موكا بوت أو إسبريسو أو فلتر.",
  },
  {
    icon: Truck,
    emoji: "🚚",
    title: "شحن سريع داخل مصر",
    desc: "توصيل سريع ومضمون خلال 24 إلى 72 ساعة للقاهرة والجيزة والإسكندرية وكافة المحافظات بالتعاون مع أفضل شركات الشحن.",
  },
  {
    icon: RotateCcw,
    emoji: "↩️",
    title: "استرجاع سهل وضمان",
    desc: "ضمان ذهبي حقيقي: في حالة وجود أي مشكلة بالمنتج أو عدم رضاك، نضمن لك استبدال أو استرجاع فوري بدون تعقيد.",
  },
];

export function WhyRovento() {
  return (
    <section
      id="why"
      className="border-b border-stone-800 bg-coffee-900/40 py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-rv-gold">
            جودة نثق بها وتليق بك
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            لماذا يختار عشاق القهوة في مصر{" "}
            <span className="text-rv-red">روفينتو؟</span>
          </h2>
          <p className="mt-3 text-lg text-stone-300">
            صممنا تجربتنا بالكامل لنحل أكبر المشاكل التي تواجه محبي القهوة مع
            العلامات التجارية المستوردة والمحمصات المحلية.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-stone-800 bg-coffee-900/90 p-6 transition-colors hover:border-rv-gold/50"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-rv-gold/10 text-2xl">
                <f.icon className="size-5 text-rv-gold" />
              </div>
              <h3 className="text-xl font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
