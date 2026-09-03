import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Flame,
  Droplets,
  Zap,
  Coffee,
} from "lucide-react";
import { useCart } from "@/lib/store";

const SPECS = [
  { icon: Flame, label: "تحميص غامق", value: "Dark Roast" },
  { icon: Droplets, label: "كريمة غنية", value: "Rich Crema" },
  { icon: Zap, label: "قوة عالية", value: "Full Body" },
  { icon: Coffee, label: "30% أرابيكا", value: "70% روبوستا" },
];

const FLAVOR_NOTES = ["كريمة غنية", "عمق في النكهة", "تأثير إيطالي", "كورتوادو"];

export function FloatingProductHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { add } = useCart();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#faf7f0] via-white to-[#faf7f0] py-16 md:py-24"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-editorial opacity-20" />
        {/* Gold glow */}
        <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rv-gold/5 blur-[180px]" />
      </div>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto mb-10 max-w-[1200px] px-4 text-center md:px-6"
      >
        <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.3em] text-rv-gold">
          Featured Product
        </span>
        <h2 className="font-display text-2xl font-black text-rv-darkBrown md:text-4xl">
          المنتج الرئيسي
        </h2>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-rv-gold" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
        {/* ── Floating Bag ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Gold glow behind bag */}
            <div className="absolute -inset-16 rounded-full bg-rv-gold/8 blur-[100px]" />

            {/* Shadow on ground */}
            <motion.div
              animate={{ scaleX: [1, 1.05, 1], opacity: [0.1, 0.06, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 left-1/2 h-5 w-[65%] -translate-x-1/2 rounded-[50%] bg-rv-brown/10 blur-xl"
            />

            {/* ── The Bag Image ── */}
            <div className="relative w-[260px] md:w-[340px]">
              <img
                src="/images/product-hero/bar-intenso-front.png"
                alt="كيس روفينتو بار انتينسو — 1 كجم"
                className="w-full drop-shadow-[0_16px_40px_rgba(26,26,46,0.15)]"
                loading="eager"
              />

              {/* Rating badge */}
              <div className="absolute -right-2 top-4 rounded-xl border border-rv-gold/30 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm md:-right-6">
                <div className="flex items-center gap-1">
                  <Star className="size-3.5 fill-rv-gold text-rv-gold" />
                  <span className="text-xs font-black text-rv-darkBrown">
                    4.9
                  </span>
                </div>
                <span className="text-[9px] text-rv-brown/60">187 تقييم</span>
              </div>

              {/* Price tag */}
              <div className="absolute -bottom-3 -left-2 rounded-xl bg-rv-gold px-4 py-2 shadow-xl md:-bottom-4 md:-left-6">
                <span className="text-lg font-black text-white">700</span>
                <span className="mr-1 text-xs font-bold text-white/80">
                  ج.م
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Product Info Panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 text-center md:text-start"
          dir="rtl"
        >
          {/* Name */}
          <div>
            <span className="mb-2 inline-block rounded-full border border-rv-gold/30 bg-rv-gold/10 px-3 py-1 text-xs font-bold text-rv-gold">
              الأكثر مبيعاً
            </span>
            <h3 className="mt-3 font-display text-3xl font-black text-rv-darkBrown md:text-4xl">
              بار انتينسو
            </h3>
            <p className="text-sm font-medium text-rv-brown/50">
              ROVENTO Bar Intenso — 1 kg
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${i < 5 ? "fill-rv-gold text-rv-gold" : "text-rv-brown/20"}`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-rv-darkBrown">4.9</span>
            <span className="text-xs text-rv-brown/50">(187 تقييم)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline justify-center gap-3 md:justify-start">
            <span className="text-4xl font-black text-rv-darkBrown">700</span>
            <span className="text-lg font-bold text-rv-brown/50">ج.م</span>
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-600">
              1 كجم
            </span>
          </div>

          {/* Flavor notes */}
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {FLAVOR_NOTES.map((note) => (
              <span
                key={note}
                className="rounded-full border border-rv-brown/15 bg-rv-cream/80 px-3 py-1.5 text-xs font-bold text-rv-brown/70 transition-colors hover:border-rv-gold/40 hover:text-rv-gold"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-3">
            {SPECS.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2.5 rounded-xl border border-rv-brown/10 bg-white p-3 shadow-sm"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rv-gold/10">
                  <spec.icon className="size-4.5 text-rv-gold" />
                </div>
                <div>
                  <p className="text-xs font-bold text-rv-darkBrown">
                    {spec.label}
                  </p>
                  <p className="text-[10px] text-rv-brown/50">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-rv-brown/70 md:text-base">
            قوي وجريء بتأثير إيطالي — عمق في النكهة وكريمة غنية. مثالي
            لعشاق الإسبريسو القوي والكورتوادو. تحميص غامق بدرجة عالية
            من الجسم والكريما.
          </p>

          {/* Add to Cart CTA */}
          <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row md:justify-start">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => add("rovento-bar-intenso-1kg")}
              className="flex items-center gap-3 rounded-xl bg-rv-gold px-8 py-4 text-lg font-black text-white shadow-xl shadow-rv-gold/25 transition-shadow hover:shadow-[0_12px_40px_rgba(179,139,51,0.35)]"
            >
              <ShoppingCart className="size-5" />
              أضف للسلة — 700 ج.م
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => add("rovento-bar-intenso-500g")}
              className="flex items-center gap-2 rounded-xl border-2 border-rv-brown/15 bg-transparent px-6 py-3.5 text-sm font-bold text-rv-darkBrown transition-all hover:border-rv-gold/40 hover:bg-rv-gold/10"
            >
              <Coffee className="size-4 text-rv-gold" />
              نص كيلو — 400 ج.م
            </motion.button>
          </div>

          {/* Brewing methods */}
          <div className="flex items-center justify-center gap-2 text-xs text-rv-brown/40 md:justify-start">
            <span>مثالي لـ:</span>
            {["إسبريسو", "كورتوادو", "ماكياتو"].map((method) => (
              <span
                key={method}
                className="rounded-full bg-rv-brown/5 px-2.5 py-0.5 font-medium text-rv-brown/60"
              >
                {method}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rv-gold/20 to-transparent" />
    </section>
  );
}
