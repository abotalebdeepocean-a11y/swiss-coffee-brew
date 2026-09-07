import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import {
  FREE_SHIPPING_START,
  FREE_SHIPPING_END,
  TWO_KG_DISCOUNT_RATE,
  formatArabicDate,
} from "@/lib/offer";

/**
 * The ONE real offer — luxury glass rectangle with a rotating neon gold
 * border, real olive-grove photo (shiny olives on the tree) glowing behind
 * the glass, and the yellow "خصم 10%" seal above the Bar Intenso bag.
 *
 * Olive photo: "Olive tree (Olea europaea) branch with immature olives,
 * Lisbon" by julesvernex2 — Wikimedia Commons, CC BY-SA 4.0.
 */
export function OfferBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { add } = useCart();

  /** Adds one of each blend → cart hits 2kg → 10% applies automatically */
  const handleBundle = () => {
    add("rovento-bar-intenso-1kg", 1);
    add("rovento-premium-1kg", 1);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#050505] py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ── Rotating neon border: oversized spinning conic layer behind
                 a 2px gap; the glass card covers its center ── */}
          <div className="relative rounded-[28px] p-[2px]">
            {/* Faint static ring — border is never invisible */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[2px] rounded-[26px] bg-[conic-gradient(from_0deg,rgba(201,168,76,0.16),rgba(201,168,76,0.05)_90deg,rgba(201,168,76,0.16)_180deg,rgba(201,168,76,0.05)_270deg,rgba(201,168,76,0.16))]"
            />
            {/* The rotating neon comet */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(201,168,76,0.55) 28deg, #e0c872 48deg, rgba(201,168,76,0.55) 68deg, transparent 96deg, transparent 360deg)",
                animation: "neonSpin 6.5s linear infinite",
                filter: "drop-shadow(0 0 8px rgba(224,200,114,0.65))",
              }}
            />

            {/* ── Glass card ── */}
            <div className="relative overflow-hidden rounded-[26px] bg-[#0a0a0a]/88 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {/* Shiny olives on the tree — real photo behind the glass */}
              <img
                src="/images/olives-tree.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
              />
              {/* Legibility scrims — text side darker, bags side lighter */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-[#050505]/55" />

              {/* Content */}
              <div className="relative z-10 grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.05fr_1fr] md:gap-10 md:p-12">
                {/* ─── Text ─── */}
                <div className="text-center md:text-right">
                  <div className="mb-5 inline-flex items-center gap-2.5 rounded-xl border border-[#c9a84c]/30 bg-[#050505]/80 px-4 py-2.5">
                    <Truck className="size-4 text-[#c9a84c]" />
                    <span className="text-sm font-black text-[#f5efe6]">
                      شحن مجاني
                    </span>
                  </div>

                  <h2 className="mb-3 text-2xl font-black leading-snug md:text-4xl">
                    <span className="text-[#f5efe6]">اشترِ كيسين </span>
                    <span className="gold-gradient-text">ووفّر أكتر</span>
                  </h2>

                  <p className="mb-2 text-sm leading-relaxed text-[#b0a898]">
                    خصم {TWO_KG_DISCOUNT_RATE * 100}% فوري على أي بلندَين —
                    بيتحسب تلقائيًا في السلة، بدون كود
                  </p>
                  <p className="mb-7 text-xs text-[#888888]">
                    شحن مجاني من {formatArabicDate(FREE_SHIPPING_START)} إلى{" "}
                    {formatArabicDate(FREE_SHIPPING_END)}
                  </p>

                  <button
                    onClick={handleBundle}
                    className="rv-btn inline-flex items-center gap-2.5 rounded-xl bg-[#c9a84c] px-7 py-3.5 text-sm font-black text-[#0a0a0a] shadow-lg shadow-[#c9a84c]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:shadow-[0_0_26px_rgba(201,168,76,0.4)]"
                  >
                    <ShoppingCart className="size-4" />
                    اشترِ الاتنين ووفّر
                  </button>
                </div>

                {/* ─── Bags + yellow seal ─── */}
                <div className="relative flex items-end justify-center gap-4 pb-2 md:gap-6">
                  {/* Soft glow pool under the bags */}
                  <div className="pointer-events-none absolute -bottom-3 left-1/2 h-14 w-[240px] -translate-x-1/2 rounded-full bg-[#c9a84c]/[0.14] blur-3xl" />

                  {/* Yellow 10% seal — above the Intenso bag */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
                    animate={
                      isInView ? { opacity: 1, scale: 1, rotate: -12 } : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.45,
                      ease: "easeOut",
                    }}
                    className="absolute -top-7 right-1 z-20 md:-top-9 md:right-4"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 14,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        aria-hidden="true"
                        className="absolute -inset-1.5 rounded-full"
                        style={{
                          background:
                            "conic-gradient(from 0deg, rgba(245,197,17,0.9), rgba(245,197,17,0.15) 40%, rgba(245,197,17,0.9) 70%, rgba(245,197,17,0.2) 100%)",
                          mask: "radial-gradient(farthest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3px))",
                          WebkitMask:
                            "radial-gradient(farthest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3px))",
                        }}
                      />
                      <div className="relative grid size-[74px] place-items-center rounded-full bg-[#f5c511] text-center shadow-[0_0_30px_rgba(245,197,17,0.55)] md:size-[92px]">
                        <div>
                          <p className="text-[10px] font-black leading-none text-[#1a0f08] md:text-[11px]">
                            خصم
                          </p>
                          <p className="text-2xl font-black leading-tight text-[#1a0f08] md:text-3xl">
                            10%
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Curved arrow: seal → bags */}
                  <svg
                    viewBox="0 0 100 90"
                    className="pointer-events-none absolute -bottom-1 right-16 z-10 w-12 rotate-[160deg] md:right-24 md:w-14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M50 8 C58 30, 52 55, 42 74"
                      stroke="#f5c511"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M28 58 L42 78 L56 60"
                      stroke="#f5c511"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>

                  {/* The two bags */}
                  <div className="animate-levitate relative z-[5]">
                    <img
                      src="/images/intenso-bag.webp"
                      alt="ROVENTO بار إنتنسو"
                      className="h-[120px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.75)] md:h-[155px]"
                    />
                  </div>
                  <div className="animate-levitate-reverse relative z-[5]">
                    <img
                      src="/images/premium-bag.webp"
                      alt="ROVENTO بريميوم"
                      className="h-[120px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.75)] md:h-[155px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
