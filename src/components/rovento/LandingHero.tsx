import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { RoventoMark } from "./RoventoMark";

/**
 * Hero — "خذ حصاد الجبل إلى بيتك"
 * Real mountain-harvest photograph as the full-bleed background,
 * the two real bags float with prices beneath, exactly like the reference.
 */
export function LandingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { add } = useCart();

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-20"
    >
      {/* ═══ Full-bleed mountain photo background ═══ */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/mountain-harvest-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Legibility scrim — subtle, keeps the photo untouched visually */}
        <div className="absolute inset-0 bg-[#0a0a0a]/25" />
        {/* Top/bottom fades into the page */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="rv-noise absolute inset-0" />
      </div>

      {/* ═══ Top bar — origin story line ═══ */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-4 text-[10px] font-bold tracking-[0.35em] text-[#e0c872] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:text-xs"
      >
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#e0c872]/50" />
        من مزارع الجبال — إلى فنجانك
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#e0c872]/50" />
      </motion.div>

      {/* ═══ Headline ═══ */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        className="relative z-10 mt-6 text-center text-4xl font-black leading-[1.25] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] md:text-6xl lg:text-7xl"
      >
        <span className="text-[#f5efe6]">خذ حصاد </span>
        <span className="gold-gradient-text">الجبل</span>
        <span className="text-[#f5efe6]"> إلى بيتك</span>
      </motion.h1>

      {/* ═══ Offer subline ═══ */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.55 }}
        className="relative z-10 mt-4 text-center text-sm text-[#f5efe6]/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-base"
      >
        متوسط سعر الكيس:{" "}
        <span className="font-bold text-[#e0c872]">790 ج.م</span> — وفر حتى 300
        ج.م على الكيس الواحد مع خصم الكمية
      </motion.p>

      {/* ═══ The two bags with prices — like the reference ═══ */}
      <div className="relative z-10 mx-auto mt-10 flex max-w-[820px] items-end justify-center gap-6 px-4 md:mt-14 md:gap-16">
        {/* Bar Intenso — right (RTL first) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="group flex flex-1 flex-col items-center"
        >
          <div className="animate-levitate relative">
            <img
              src="/images/intenso-bag.webp"
              alt="ROVENTO بار إنتنسو"
              className="relative h-[210px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px] md:h-[320px]"
            />
          </div>

          {/* Price tag beneath */}
          <div className="mt-5 text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-black gold-gradient-text md:text-4xl">
                690
              </span>
              <span className="text-xs font-bold text-[#f5efe6]/80">ج.م</span>
            </div>
            <p className="mt-1 font-condensed text-[11px] tracking-[0.3em] text-[#f5efe6]/70 uppercase">
              Bar Intenso
            </p>
            <p className="mx-auto mt-1.5 max-w-[180px] text-[11px] leading-relaxed text-[#f5efe6]/80">
              قوية • غنية • جريئة — كريمة غنية وتحميص غامق وإسبريسو إيطالي
              أصيل
            </p>
          </div>

          <button
            onClick={() => add("rovento-bar-intenso-1kg")}
            className="rv-btn mt-4 flex items-center gap-2 rounded-xl bg-[#c9a84c] px-5 py-2.5 text-xs font-black text-[#0a0a0a] opacity-90 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:opacity-100 md:text-sm"
          >
            <ShoppingCart className="size-3.5" />
            اطلب بار إنتنسو
          </button>
        </motion.div>

        {/* Premium — left */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.85, ease: "easeOut" }}
          className="group flex flex-1 flex-col items-center"
        >
          <div className="animate-levitate-reverse relative">
            <img
              src="/images/premium-bag.webp"
              alt="ROVENTO بريميوم"
              className="relative h-[210px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px] md:h-[320px]"
            />
          </div>

          <div className="mt-5 text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-black gold-gradient-text md:text-4xl">
                890
              </span>
              <span className="text-xs font-bold text-[#f5efe6]/80">ج.م</span>
            </div>
            <p className="mt-1 font-condensed text-[11px] tracking-[0.3em] text-[#f5efe6]/70 uppercase">
              Premium
            </p>
            <p className="mx-auto mt-1.5 max-w-[180px] text-[11px] leading-relaxed text-[#f5efe6]/80">
              ناعمة • متوازنة • فاخرة — 100% أرابيكا ونكهة غنية وتجربة قيّمة
            </p>
          </div>

          <button
            onClick={() => add("rovento-premium-1kg")}
            className="rv-btn mt-4 flex items-center gap-2 rounded-xl border-2 border-[#c9a84c]/60 bg-[#0a0a0a]/30 px-5 py-2.5 text-xs font-black text-[#e0c872] opacity-90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a84c] hover:bg-[#c9a84c]/15 hover:opacity-100 md:text-sm"
          >
            <ShoppingCart className="size-3.5" />
            اطلب بريميوم
          </button>
        </motion.div>
      </div>

      {/* ═══ Mark + seal line ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-3 pb-14"
      >
        <RoventoMark size={30} className="opacity-80" />
        <span className="text-[10px] tracking-[0.4em] text-[#f5efe6]/60 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Rovento — Mountain Harvest
        </span>
      </motion.div>
    </section>
  );
}
