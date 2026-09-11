import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { getProduct } from "@/lib/products";

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { add } = useCart();
  const intensoPrice = getProduct("rovento-bar-intenso-1kg")?.price;
  const premiumPrice = getProduct("rovento-premium-1kg")?.price;
  const intensoOld = getProduct("rovento-bar-intenso-1kg")?.oldPrice;
  const premiumOld = getProduct("rovento-premium-1kg")?.oldPrice;

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-[800px] px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-3 text-2xl font-black md:text-3xl lg:text-4xl">
            <span className="gold-gradient-text">
              جاهز تجرب قهوة على أصولها؟
            </span>
          </h2>
          <p className="mb-10 text-sm text-[#888888]">
            اختار الكيس اللي يناسبك وابدأ رحلتك مع روفينتو
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => add("rovento-premium-1kg")}
              className="rv-btn flex items-center gap-3 rounded-xl bg-[#c9a84c] px-8 py-4 text-base font-black text-[#0a0a0a] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0c872] hover:shadow-[#c9a84c]/30"
            >
              <ShoppingCart className="size-5" />
              جرّب الفاخر ← {premiumPrice} ج.م
              {premiumOld && (
                <span className="rv-old-price rv-old-price-dark rv-price-flash-dark text-xs font-bold text-rv-black/60">
                  {premiumOld}
                </span>
              )}
            </button>
            <button
              onClick={() => add("rovento-bar-intenso-1kg")}
              className="rv-btn flex items-center gap-3 rounded-xl border-2 border-[#c9a84c]/40 px-8 py-4 text-base font-black text-[#c9a84c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10"
            >
              <ShoppingCart className="size-5" />
              جرّب القوي ← {intensoPrice} ج.م
              {intensoOld && (
                <span className="rv-old-price rv-old-price-dark rv-price-flash-dark text-xs font-bold text-rv-black/60">
                  {premiumOld}
                </span>
              )}
            </button>
          </div>

          {/* Ornamental divider */}
          <div className="rv-divider mt-12">
            <span className="text-xs text-[#c9a84c]/40">◆</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
