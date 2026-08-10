import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Gift, X } from "lucide-react";

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
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
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
          className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md border border-rv-gold/40 bg-[#111110] p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute end-3 top-3 grid size-9 place-items-center border border-white/15 transition-colors hover:border-rv-red hover:text-rv-red"
              aria-label="إغلاق"
            >
              <X className="size-4" />
            </button>

            <span className="mx-auto grid size-14 place-items-center rounded-full border border-rv-gold/40 bg-rv-gold/10 text-rv-gold">
              <Gift className="size-6" />
            </span>
            <h3 className="mt-5 text-2xl font-bold">
              استنى… 🎁 <span className="text-rv-gold">كوبون خصم 10%</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              قبل ما تسيب الموقع — خصم 10% على أول طلب ليك. انسخ الكود واستخدمه
              عند إتمام الطلب عبر واتساب أو في المتجر.
            </p>

            <button
              onClick={copyCode}
              className="mt-6 flex w-full items-center justify-center gap-3 border-2 border-dashed border-rv-gold/50 bg-rv-gold/5 py-4 transition-colors hover:border-rv-gold hover:bg-rv-gold/10"
            >
              <span dir="ltr" className="font-mono text-2xl font-black tracking-[0.2em] text-rv-gold">
                {COUPON}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                {copied ? (
                  <>
                    <Check className="size-4 text-emerald-400" />
                    تم النسخ!
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    انسخ
                  </>
                )}
              </span>
            </button>

            <div className="mt-5 flex items-center gap-2">
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="h-11 flex-1 bg-rv-red text-sm font-bold text-white transition-colors hover:bg-[#b53219]"
              >
                تسوق الآن
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="h-11 flex-1 border border-white/20 text-sm font-semibold text-muted-foreground transition-colors hover:border-white/40 hover:text-foreground"
              >
                لسه بفكر
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
