import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SPECS = [
  { label: "NET WT.", value: "1 kg (35.2 oz)", icon: "⚖️" },
  { label: "Storage", value: "Store in a cool, dry place", icon: "🏪" },
  { label: "Roast", value: "Fresh Daily — Cairo, Egypt", icon: "🔥" },
  { label: "Shipping", value: "Free to all Egyptian governorates", icon: "🚚" },
];

export function LuxurySpecs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-rv-black py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-rv-black via-rv-dark/50 to-rv-black" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-rv-gold/60">
            Specifications
          </span>
          <h2 className="font-display text-3xl font-black text-white md:text-4xl">
            مواصفات <span className="gold-gradient-text">المنتج</span>
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-transparent via-rv-gold to-transparent" />
        </motion.div>

        {/* Specs grid */}
        <div className="mx-auto grid max-w-[800px] gap-4 sm:grid-cols-2">
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-rv-gold/15 hover:bg-white/[0.04]"
            >
              <span className="text-2xl">{spec.icon}</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-rv-gold/50">
                  {spec.label}
                </p>
                <p className="mt-0.5 text-sm font-bold text-white">{spec.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dual bag display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex items-center justify-center gap-6 md:gap-12"
        >
          <img
            src="/images/intenso-bar-real.webp"
            alt="Bar Intenso"
            className="w-[120px] md:w-[180px] bag-shadow"
          />
          <div className="text-center">
            <div className="font-condensed text-lg tracking-wider text-rv-gold/40">
              ✦
            </div>
          </div>
          <img
            src="/images/premium-eagle-real.webp"
            alt="Premium"
            className="w-[120px] md:w-[180px] bag-shadow"
          />
        </motion.div>
      </div>
    </section>
  );
}
