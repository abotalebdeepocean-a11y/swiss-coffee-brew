import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, X } from "lucide-react";

const COUPON = "ROVENTO10";
const SEEN_KEY = "rovento-exit-popup-seen";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0 && !sessionStorage.getItem(SEEN_KEY)) {
        sessionStorage.setItem(SEEN_KEY, "1");
        setOpen(true);
      }
    }
    function onGift() {
      setOpen(true);
    }
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("rovento:open-promo", onGift);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("rovento:open-promo", onGift);
    };
  }, []);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(COUPON);
    } catch {
      /* تجاهل */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border-2 border-rv-gold bg-coffee-900 p-6 text-center shadow-2xl sm:p-8"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute left-4 top-4 text-stone-400 transition-colors hover:text-white"
              aria-label="إغلاق"
            >
              <X className="size-6" />
            </button>

            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-rv-gold/20 text-3xl">
              🎁
            </div>
            <h3 className="text-2xl font-black text-white">
              هدية خاصة لعملاء <span className="text-rv-gold">روفينتو</span>!
            </h3>
            <p className="mb-6 mt-2 text-sm text-stone-300">
              استخدم كوبون الخصم التالي واحصل على{" "}
              <span className="font-bold text-rv-gold">خصم 10% فوري</span> على
              أي طلب اليوم:
            </p>

            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-rv-gold/40 bg-black p-4">
              <span
                dir="ltr"
                className="font-mono text-xl font-black tracking-wider text-rv-gold"
              >
                {COUPON}
              </span>
              <button
                onClick={copyCode}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  copied ? "bg-emerald-500 text-white" : "btn-gold"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    تم النسخ!
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    نسخ الكود
                  </>
                )}
              </button>
            </div>

            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="btn-gold flex h-12 w-full items-center justify-center rounded-xl text-base font-black"
            >
              استخدم الكود واطلب الآن
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full py-2 text-xs font-bold text-stone-400 transition-colors hover:text-white"
            >
              لسه بفكر — مش دلوقتي
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
