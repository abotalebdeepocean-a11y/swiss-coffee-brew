import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, Percent, CalendarDays } from "lucide-react";
import {
  FREE_SHIPPING_START,
  FREE_SHIPPING_END,
  TWO_KG_DISCOUNT_RATE,
  formatArabicDate,
} from "@/lib/offer";

/**
 * Section 2 — Limited-time offer banner.
 * The ONE real dated offer: free shipping for one month from a real date
 * + 10% off when buying 2kg of any blend. No countdown, no codes.
 */
export function OfferBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] pb-4 pt-8 md:pb-6">
      <div className="mx-auto max-w-[1000px] px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-[#c9a84c]/20 bg-[#111111]"
        >
          {/* Subtle gold glow — single light source */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_65%)]" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-8 text-center md:flex-row md:justify-between md:text-right">
            {/* Main offer */}
            <div className="max-w-[560px]">
              <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
                <Truck className="size-5 text-[#c9a84c]" />
                <span className="text-base font-black text-[#f5efe6] md:text-lg">
                  شحن مجاني على كل الطلبات
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#b0a898]">
                من {formatArabicDate(FREE_SHIPPING_START)} إلى{" "}
                {formatArabicDate(FREE_SHIPPING_END)}
              </p>
            </div>

            {/* 2kg discount */}
            <div className="flex items-center gap-4 rounded-xl border border-[#c9a84c]/25 bg-[#0a0a0a] px-5 py-4">
              <Percent className="size-6 shrink-0 text-[#c9a84c]" />
              <div className="text-right">
                <p className="text-sm font-black text-[#e0c872] md:text-base">
                  خصم {TWO_KG_DISCOUNT_RATE * 100}%
                </p>
                <p className="text-xs text-[#888888]">
                  عند شراء 2 كيلو من أي بلند
                </p>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="relative z-10 flex items-center justify-center gap-2 border-t border-white/[0.06] py-3">
            <CalendarDays className="size-3.5 text-[#888888]" />
            <span className="text-[11px] text-[#888888]">
              الخصم بيتحسب تلقائيًا في السلة
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
