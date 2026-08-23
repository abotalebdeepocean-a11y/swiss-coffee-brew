import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Clock } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";

const BUNDLE_PRICE = 2999;

/**
 * شريط لزق يظهر في أسفل الشاشة لما المستخدم يسكرول على صفحة منتج.
 * يختفي لو المستخدم ضغط X أو لما يضيف البريكا للسلة.
 */
export function BrikkaStickyBar() {
  const { add, items } = useCart();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // ما يظهرش لو المستخدم ضغط X أو لو البريكا في السلة
    if (dismissed) return;
    const hasBrikka = items.some((i) => i.slug === "machine-moka");
    if (hasBrikka) {
      setVisible(false);
      return;
    }

    function onScroll() {
      // يظهر بعد 600px سكرول
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed, items]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-rv-gold/30 bg-gradient-to-r from-[#1B2E26] via-coffee-900 to-[#0A0A0A] shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 md:px-6">
            {/* النص */}
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-rv-gold/20 p-2 text-rv-gold sm:grid md:hidden lg:grid">
                <Zap className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-white sm:text-sm">
                  🎁 عرض البريكا: كيس + مكنة ={" "}
                  <span className="text-rv-gold">
                    {formatPrice(BUNDLE_PRICE)}
                  </span>
                </p>
                <p className="flex items-center gap-1 text-[10px] text-stone-400">
                  <Clock className="size-2.5" /> عرض محدود — توفير 1,000 جنيه
                </p>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  add("machine-moka");
                  setDismissed(true);
                }}
                className="hidden h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-rv-gold to-[#b89728] px-4 text-xs font-black text-black shadow-lg shadow-rv-gold/20 transition hover:-translate-y-0.5 sm:flex"
              >
                اشتري الآن
                <Zap className="size-3.5" />
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="grid size-8 place-items-center rounded-full text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-300"
                aria-label="إغلاق"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
