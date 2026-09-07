import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { RoventoMark } from "./RoventoMark";

/**
 * Hero — "خذ حصاد الجبل إلى بيتك"
 * Cinematic mountain-harvest scene built from layered SVG ridges + mist,
 * single warm light source. The two real bags float with prices beneath,
 * exactly like the reference layout.
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
      {/* ═══ Mountain scene — layered sepia ridges, single light ═══ */}
      <div className="pointer-events-none absolute inset-0">
        {/* Sky glow — the sun low over the terraces */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(224,200,114,0.16)_0%,rgba(201,168,76,0.05)_38%,transparent_68%)]" />

        {/* Far ridge */}
        <svg
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          className="absolute top-[16%] left-0 h-[42%] w-full"
        >
          <path
            d="M0 420 L0 300 Q120 180 260 240 T520 200 T780 260 T1040 190 T1290 250 L1440 210 L1440 420 Z"
            fill="#111111"
            opacity="0.85"
          />
        </svg>

        {/* Terraced mid ridge — stepped terraces like the reference */}
        <svg
          viewBox="0 0 1440 380"
          preserveAspectRatio="none"
          className="absolute top-[38%] left-0 h-[36%] w-full"
        >
          <path
            d="M0 380 L0 240 Q160 150 320 210 T640 160 T960 220 T1280 150 L1440 200 L1440 380 Z"
            fill="#16130d"
          />
          {/* Terrace lines catching the light */}
          <path
            d="M0 268 Q200 190 400 236 T800 196 T1200 186 L1440 226"
            fill="none"
            stroke="#c9a84c"
            strokeOpacity="0.10"
            strokeWidth="1.5"
          />
          <path
            d="M0 300 Q220 226 440 264 T880 232 T1300 220 L1440 252"
            fill="none"
            stroke="#c9a84c"
            strokeOpacity="0.07"
            strokeWidth="1.5"
          />
          <path
            d="M0 332 Q240 262 480 292 T960 268 L1440 286"
            fill="none"
            stroke="#c9a84c"
            strokeOpacity="0.05"
            strokeWidth="1.5"
          />
        </svg>

        {/* Near ridge — darkest, grounds the scene */}
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="absolute top-[62%] left-0 h-[30%] w-full"
        >
          <path
            d="M0 300 L0 180 Q200 90 420 150 T860 110 T1300 150 L1440 120 L1440 300 Z"
            fill="#0f0d08"
          />
        </svg>

        {/* Mist bands between ridges */}
        <div className="absolute top-[34%] left-0 h-24 w-full bg-[linear-gradient(to_bottom,transparent,rgba(201,168,76,0.045),transparent)]" />
        <div className="absolute top-[58%] left-0 h-20 w-full bg-[linear-gradient(to_bottom,transparent,rgba(224,200,114,0.03),transparent)]" />

        {/* Film grain */}
        <div className="rv-noise absolute inset-0" />

        {/* Bottom fade into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* ═══ Top bar — origin story line ═══ */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-4 text-[10px] font-bold tracking-[0.35em] text-[#c9a84c]/50 uppercase md:text-xs"
      >
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a84c]/30" />
        من مزارع الجبال — إلى فنجانك
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a84c]/30" />
      </motion.div>

      {/* ═══ Headline ═══ */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        className="relative z-10 mt-6 text-center text-4xl font-black leading-[1.25] md:text-6xl lg:text-7xl"
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
        className="relative z-10 mt-4 text-center text-sm text-[#b0a898] md:text-base"
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
            <div className="pointer-events-none absolute inset-0 -m-10 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.10)_0%,transparent_70%)] blur-2xl" />
            <img
              src="/images/intenso-bag.webp"
              alt="ROVENTO بار إنتنسو"
              className="relative h-[210px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.75)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px] md:h-[320px]"
            />
          </div>

          {/* Price tag beneath — like the reference layout */}
          <div className="mt-5 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-black gold-gradient-text md:text-4xl">
                690
              </span>
              <span className="text-xs font-bold text-[#888888]">ج.م</span>
            </div>
            <p className="mt-1 font-condensed text-[11px] tracking-[0.3em] text-[#888888] uppercase">
              Bar Intenso
            </p>
            <p className="mt-1.5 max-w-[180px] text-[11px] leading-relaxed text-[#b0a898]">
              قوية • غنية • جريئة — كريمة غنية وتحميص غامق وإسبريسو إيطالي
              أصيل
            </p>
          </div>

          <button
            onClick={() => add("rovento-bar-intenso-1kg")}
            className="rv-btn mt-4 flex items-center gap-2 rounded-xl bg-[#c9a84c] px-5 py-2.5 text-xs font-black text-[#0a0a0a] opacity-90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:opacity-100 hover:shadow-lg hover:shadow-[#c9a84c]/20 md:text-sm"
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
            <div className="pointer-events-none absolute inset-0 -m-10 rounded-full bg-[radial-gradient(circle,rgba(224,200,114,0.10)_0%,transparent_70%)] blur-2xl" />
            <img
              src="/images/premium-bag.webp"
              alt="ROVENTO بريميوم"
              className="relative h-[210px] w-auto object-contain drop-shadow-[0_36px_50px_rgba(0,0,0,0.75)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[260px] md:h-[320px]"
            />
          </div>

          <div className="mt-5 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-black gold-gradient-text md:text-4xl">
                890
              </span>
              <span className="text-xs font-bold text-[#888888]">ج.م</span>
            </div>
            <p className="mt-1 font-condensed text-[11px] tracking-[0.3em] text-[#888888] uppercase">
              Premium
            </p>
            <p className="mt-1.5 max-w-[180px] text-[11px] leading-relaxed text-[#b0a898]">
              ناعمة • متوازنة • فاخرة — 100% أرابيكا ونكهة غنية وتجربة قيّمة
            </p>
          </div>

          <button
            onClick={() => add("rovento-premium-1kg")}
            className="rv-btn mt-4 flex items-center gap-2 rounded-xl border-2 border-[#c9a84c]/40 px-5 py-2.5 text-xs font-black text-[#c9a84c] opacity-90 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:opacity-100 md:text-sm"
          >
            <ShoppingCart className="size-3.5" />
            اطلب بريميوم
          </button>
        </motion.div>
      </div>

      {/* ═══ Mark + scroll hint ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-3 pb-14"
      >
        <RoventoMark size={30} className="opacity-60" />
        <span className="text-[10px] tracking-[0.4em] text-[#888888]/60 uppercase">
          Rovento — Mountain Harvest
        </span>
      </motion.div>
    </section>
  );
}
