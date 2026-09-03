import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "☕",
    title: "جودة عالمية",
    desc: "منتقاة من أفضل المزارع العالمية وممحمصة بطرق احترافية.",
  },
  {
    icon: "🚚",
    title: "شحن مجاني (هذا الشهر)",
    desc: "توصيل لجميع المحافظات برسوم 100 جنيه — مجاني لمدة شهر واحد.",
  },
  {
    icon: "💯",
    title: "ضمان الرضا",
    desc: "إذا لم تعجبك، نسترجعها بدون أسئلة. استرجاع كامل المبلغ.",
  },
];

/** مميزات روفينتو — ٣ بطاقات بسيطة */
export function FeatureHighlights() {
  return (
    <section id="features" className="relative scroll-mt-20 overflow-hidden bg-[#0a0705] py-20 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/[0.03] blur-[130px]" />

      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-black tracking-[0.2em] text-rv-gold/70 uppercase">
            ليه تختار روفينتو؟
          </span>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            جودة تتكلم <span className="gold-gradient-text">عن نفسها</span>
          </h2>
        </motion.div>

        {/* البطاقات */}
        <div className="grid gap-5 sm:grid-cols-3 md:gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-rv-gold/40 hover:bg-rv-gold/[0.05] md:p-9"
            >
              <div className="mx-auto flex size-[64px] items-center justify-center rounded-full border border-rv-gold/25 bg-rv-gold/10 text-3xl transition-transform duration-300 group-hover:scale-125">
                {f.icon}
              </div>
              <h3 className="mt-5 text-lg font-black text-white transition-colors group-hover:text-rv-gold-light md:text-xl">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
