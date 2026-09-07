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
 * The ONE real offer — built from the official campaign creative:
 * "اشترِ 2 كيس ووفّر أكتر" + خصم 10% gold seal + شحن مجاني pill,
 * both bags side by side with the seal arrow pointing at them.
 * No countdown, no codes — real dates, auto-applied in cart.
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
    <section ref={ref} className="relative bg-[#0a0a0a] py-10 md:py-14">
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-[#c9a84c]/20 bg-[#111111]"
        >
          {/* Single soft gold light — palette only */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />

          <div className="relative z-10 grid items-center gap-10 p-6 md:grid-cols-[1.05fr_1fr] md:p-10">
            {/* ─── Text side ─── */}
            <div className="text-center md:text-right">
              {/* Free-shipping pill — like the campaign */}
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-xl border border-[#c9a84c]/30 bg-[#0a0a0a] px-4 py-2.5">
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
                className="rv-btn inline-flex items-center gap-2.5 rounded-xl bg-[#c9a84c] px-7 py-3.5 text-sm font-black text-[#0a0a0a] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:shadow-[#c9a84c]/30"
              >
                <ShoppingCart className="size-4" />
                اشترِ الاتنين ووفّر
              </button>
            </div>

            {/* ─── Visual side: bags + gold seal + arrow (campaign composition) ─── */}
            <div className="relative flex items-end justify-center gap-3 pt-8 md:gap-6 md:pt-4">
              {/* Gold seal — خصم 10% */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="absolute -top-1 right-2 z-20 md:right-6"
              >
                <div className="grid size-20 place-items-center rounded-full border-4 border-[#e0c872] bg-[#c9a84c] text-center shadow-xl shadow-black/40 md:size-24">
                  <div>
                    <p className="text-[11px] font-black leading-none text-[#0a0a0a]">
                      خصم
                    </p>
                    <p className="text-2xl font-black leading-tight text-[#0a0a0a] md:text-3xl">
                      10%
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Arrow from seal to bags — like the campaign */}
              <svg
                viewBox="0 0 100 90"
                className="pointer-events-none absolute -bottom-1 right-14 z-10 w-14 rotate-[155deg] md:right-24 md:w-16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M50 8 C58 30, 52 55, 42 74"
                  stroke="#c9a84c"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d="M28 58 L42 78 L56 60"
                  stroke="#c9a84c"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>

              {/* The two bags */}
              <div className="animate-levitate">
                <img
                  src="/images/intenso-bag.webp"
                  alt="ROVENTO بار إنتنسو"
                  className="h-[110px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] md:h-[140px]"
                />
              </div>
              <div className="animate-levitate-reverse">
                <img
                  src="/images/premium-bag.webp"
                  alt="ROVENTO بريميوم"
                  className="h-[110px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] md:h-[140px]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
