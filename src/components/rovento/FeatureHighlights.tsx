import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "☕",
    labelEn: "QUALITY",
    title: "جودة عالمية",
    desc: "نختار أفضل حبوب القهوة من أفضل مزارع العالم والمحمصة بطرق احترافية للحصول على فรส مثالي.",
  },
  {
    icon: "🚚",
    labelEn: "SHIPPING",
    title: "شحن مجاني",
    desc: "شحن مجاني لجميع المحافظات هذا الشهر فقط — التوصيل من 24 إلى 72 ساعة.",
  },
  {
    icon: "🛡️",
    labelEn: "GUARANTEE",
    title: "ضمان الرضا",
    desc: "استرجاع كامل المبلغ بدون أي أسئلة — الضمان وصل لحد بابك.",
  },
];

/** مميزات روفينتو — بطاقات كلاسيكية بأعمدة رومانية */
export function FeatureHighlights() {
  return (
    <section id="features" className="relative scroll-mt-20 overflow-hidden bg-[#0a0705] py-24 md:py-32">
      {/* خلفية مزخرفة */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04)_0%,transparent_70%)]" />
      <div className="rv-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <div className="rv-divider mb-6 text-rv-gold/40">◆</div>
          <span className="text-xs font-black tracking-[0.22em] text-rv-gold/60 uppercase">
            ليه تختار روفينتو؟
          </span>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            جودة تتكلم <span className="gold-gradient-text">عن نفسها</span>
          </h2>
          <div className="rv-divider mt-6 text-rv-gold/30">◆</div>
        </motion.div>

        {/* الأعمدة الكلاسيكية — 3 أعمدة رومانية */}
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.18, ease: "easeOut" }}
              className="rv-pillar group relative bg-gradient-to-b from-white/[0.025] to-transparent transition-all duration-300 hover:bg-rv-gold/[0.03]"
            >
              {/* عنوان الإنجليزي العلوي */}
              <span className="mb-4 block text-[11px] font-black tracking-[0.18em] text-rv-gold/50 uppercase">
                {f.labelEn}
              </span>

              {/* الأيقونة */}
              <div className="mx-auto mb-4 flex size-[56px] items-center justify-center rounded-full border border-rv-gold/25 bg-rv-gold/[0.07] text-2xl transition-transform duration-300 group-hover:scale-115">
                {f.icon}
              </div>

              {/* العنوان */}
              <h3 className="text-lg font-black text-white transition-colors group-hover:text-rv-gold-light">
                {f.title}
              </h3>

              {/* الوصف */}
              <p className="mt-3 text-sm leading-relaxed text-white/50">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
