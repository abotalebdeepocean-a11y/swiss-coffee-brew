import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { discountedPriceFor2kg } from "@/lib/offer";

/**
 * FEATURED PRODUCT — Apple-style product spotlight.
 * One product takes the whole stage: giant typography, the bag on a
 * dramatic pedestal of light, spec callouts orbiting, live 2kg price.
 */
export function FeaturedProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { add } = useCart();

  const price = 750;
  const price2kg = discountedPriceFor2kg(price);

  const CALLOUTS = [
    { label: "الكريما", value: "9/10" },
    { label: "القوة", value: "5/5" },
    { label: "الكافيين", value: "عالي" },
    { label: "الأصل", value: "الجواتيمالا · الهند" },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-36"
    >
      {/* Single dramatic top light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.10)_0%,transparent_60%)]" />
      <div className="rv-noise pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-4 md:px-6">
        {/* Section kicker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center md:mb-20"
        >
          <span className="font-condensed text-xs tracking-[0.4em] text-[#c9a84c]/60 uppercase">
            Featured Product
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            <span className="gold-gradient-text">بار إنتنسو</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-sm leading-relaxed text-[#b0a898]">
            الإسبريسو الإيطالي الأصيل — كريمة غنية وجسم كامل. البلند الأكثر
            جرأة في المحمصة
          </p>
        </motion.div>

        {/* The stage: giant bag + spec callouts */}
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr_1fr]">
          {/* Right callouts (desktop) */}
          <div className="hidden flex-col gap-8 md:flex">
            {CALLOUTS.slice(0, 2).map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
                className="border-r-2 border-[#c9a84c]/25 pr-4 text-right"
              >
                <p className="text-[10px] tracking-[0.25em] text-[#888888] uppercase">
                  {c.label}
                </p>
                <p className="mt-1 text-xl font-black text-[#f5efe6]">
                  {c.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* The bag on its pedestal of light */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Light cone */}
            <div className="pointer-events-none absolute -top-8 h-[420px] w-[340px] bg-[radial-gradient(ellipse_at_top,rgba(224,200,114,0.14)_0%,transparent_65%)] blur-xl" />
            <div className="animate-levitate relative">
              <img
                src="/images/intenso-bag-front-new.webp"
                alt="ROVENTO بار إنتنسو — المنتج المميز"
                className="relative h-[300px] w-auto object-contain drop-shadow-[0_44px_60px_rgba(0,0,0,0.8)] md:h-[420px]"
              />
            </div>
            {/* Pedestal shadow */}
            <div className="mt-2 h-4 w-40 rounded-[100%] bg-black/80 blur-md md:w-52" />
          </motion.div>

          {/* Left callouts (desktop) */}
          <div className="hidden flex-col gap-8 md:flex">
            {CALLOUTS.slice(2).map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.55 + i * 0.15 }}
                className="border-l-2 border-[#c9a84c]/25 pl-4"
              >
                <p className="text-[10px] tracking-[0.25em] text-[#888888] uppercase">
                  {c.label}
                </p>
                <p className="mt-1 text-xl font-black text-[#f5efe6]">
                  {c.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile callouts — horizontal grid */}
          <div className="grid grid-cols-2 gap-4 md:col-span-3 md:hidden">
            {CALLOUTS.map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-white/[0.06] bg-[#111111] p-3 text-center"
              >
                <p className="text-[9px] tracking-[0.2em] text-[#888888] uppercase">
                  {c.label}
                </p>
                <p className="mt-1 text-sm font-black text-[#f5efe6]">
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-5 text-center md:mt-16"
        >
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-black gold-gradient-text md:text-5xl">
              {price}
            </span>
            <span className="text-sm font-bold text-[#888888]">
              ج.م / كيس 1 كجم
            </span>
          </div>
          <p className="text-xs text-[#b0a898]">
            كيسين (2 كجم) بسعر خاص:{" "}
            <span className="font-black text-[#e0c872]">
              {price2kg * 2} ج.م
            </span>{" "}
            <span className="text-[#888888] line-through">
              {price * 2} ج.م
            </span>{" "}
            — خصم 10% تلقائي
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button
              onClick={() => add("rovento-bar-intenso-1kg")}
              className="rv-btn flex items-center gap-2.5 rounded-xl bg-[#c9a84c] px-8 py-4 text-sm font-black text-[#0a0a0a] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:shadow-[#c9a84c]/30"
            >
              <ShoppingCart className="size-4" />
              أضف للسلة — {price} ج.م
            </button>
            <button
              onClick={() => add("rovento-bar-intenso-1kg", 2)}
              className="rv-btn flex items-center gap-2.5 rounded-xl border-2 border-[#c9a84c]/40 px-8 py-4 text-sm font-black text-[#c9a84c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10"
            >
              <ShoppingCart className="size-4" />
              اطلب كيسين — {price2kg * 2} ج.م
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
