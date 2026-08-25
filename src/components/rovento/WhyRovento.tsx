import { motion } from "framer-motion";
import {
  Flame,
  Package,
  Gem,
  Sparkles,
  Truck,
} from "lucide-react";

const FEATURES = [
  {
    icon: Gem,
    title: "حبوب مختارة من أفضل المزارع",
    desc: "نختار حبوبنا بنفسنا من أفضل المزارع في إثيوبيا وكولومبيا والبرازيل. لا وسطاء. فقط ما يليق بفنجانك.",
  },
  {
    icon: Flame,
    title: "تحميص احترافي",
    desc: "نحمص يومياً في القاهرة بمعدات احترافية. القهوة اللي توصلك عمرها ما يتعدى 7 أيام من التحميص.",
  },
  {
    icon: Sparkles,
    title: "جودة ثابتة",
    desc: "كل كيس يمر بـ 7 مراحل مراقبة جودة. النكهة واحدة في كل مرة — مضمونة 100%.",
  },
  {
    icon: Gem,
    title: "نكهات متوازنة",
    desc: "كل بلند مصمم بعناية ليمنحك تجربة فريدة — من الكراميل للشوكولاتة للفاكهة.",
  },
  {
    icon: Package,
    title: "تعبئة احترافية",
    desc: "أكياس بصمام تنفس وحماية ثلاثية الطبقات ضد الرطوبة. نكهتك محفوظة لحد آخر حبة.",
  },
];

export function WhyRovento() {
  return (
    <section
      id="why-rovento"
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
            خمسة أسباب تخلي روفينتو اختيار عشاق القهوة في مصر.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 5) * 0.08 }}
              className="group rounded-2xl border border-stone-800 bg-coffee-900/90 p-5 transition-colors hover:border-rv-gold/50"
            >
              <div className="mb-4 grid size-10 place-items-center rounded-xl bg-rv-gold/10">
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
