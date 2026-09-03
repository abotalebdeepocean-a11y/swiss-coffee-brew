import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/lib/store";
import { GoldParticles } from "./GoldParticles";

const OFFERS = [
  {
    slug: "rovento-bar-intenso-1kg",
    label: "اطلب Bar Intenso الآن",
    price: 700,
    icon: ShoppingBag,
  },
  {
    slug: "rovento-premium-1kg",
    label: "اطلب Premium الآن",
    price: 890,
    icon: Sparkles,
  },
];

/** نداء العمل النهائي — قبل الفوتر مباشرة */
export function FinalCallToAction() {
  const { add } = useCart();

  return (
    <section className="relative overflow-hidden bg-[#050505] py-20 md:py-28">
      {/* توهج ذهبي خلفي */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/[0.05] blur-[140px]" />
      <GoldParticles count={16} />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-black text-white sm:text-5xl md:text-6xl">
            جاهز <span className="gold-gradient-text">لِلبدء؟</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/55 md:text-lg">
            اطلب الآن واستمتع بالشحن المجاني هذا الشهر —
            <span className="font-bold text-rv-gold-light"> كل كيس بيتحمص طازة قبل الشحن.</span>
          </p>
        </motion.div>

        {/* الأزرار */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {OFFERS.map((o) => (
            <button
              key={o.slug}
              type="button"
              onClick={() => add(o.slug, 1)}
              className="rv-btn group inline-flex min-h-[58px] w-full max-w-[420px] items-center justify-center gap-3 rounded-[10px] bg-gradient-to-b from-[#f0d488] via-rv-gold to-rv-gold-dark px-9 text-base font-black text-rv-black shadow-[0_10px_36px_-10px_rgba(212,165,116,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_50px_-10px_rgba(224,200,114,0.75)] sm:w-auto"
            >
              <o.icon className="size-5" />
              {o.label}
              <span className="font-mono text-lg">— {o.price.toLocaleString("en-US")} جنيه</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          ))}
        </motion.div>

        {/* الثقة */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 text-xs font-bold text-white/40"
        >
          الدفع عند الاستلام · فودافون كاش · إنستاباي · توصيل 24-72 ساعة لجميع المحافظات
        </motion.p>
      </div>
    </section>
  );
}
