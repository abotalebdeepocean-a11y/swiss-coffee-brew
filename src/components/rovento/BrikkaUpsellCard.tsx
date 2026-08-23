import { motion } from "framer-motion";
import { Zap, Check, Star, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";
import { IMAGES } from "@/lib/images";
import { useImageCandidates } from "./BagVisual";

const BUNDLE_PRICE = 2999;
const ORIGINAL_PRICE = 3000;

/**
 * يظهر داخل صفحة المنتج (تحت زر "أضف للسلة") —
 * يعرض باقة البريكا كـ upsell مع مقارنة سعر واضحة
 */
export function BrikkaUpsellCard() {
  const { add } = useCart();
  const { src: brikaSrc, onError: brikaError } = useImageCandidates(
    IMAGES.banners.brika,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="mt-6 overflow-hidden rounded-2xl border-2 border-rv-gold/30 bg-gradient-to-br from-[#1B2E26]/80 via-coffee-900 to-[#0A0A0A]"
    >
      {/* شريط علوي */}
      <div className="flex items-center justify-center gap-2 bg-rv-gold/15 px-4 py-2">
        <Zap className="size-3.5 text-rv-gold" />
        <span className="text-xs font-black text-rv-gold">
          70% من اللي اشتروا الكيس، اشتروا المكنة معاه
        </span>
      </div>

      <div className="p-5">
        {/* المحتوى الرئيسي */}
        <div className="flex items-center gap-4">
          {/* صورة المكنة */}
          <div className="relative shrink-0">
            <img
              src={brikaSrc ?? `${IMAGES.machines.moka}.webp`}
              onError={brikaError}
              alt="موكا بوت بريكا"
              loading="lazy"
              className="h-24 w-auto object-contain drop-shadow-[0_8px_24px_rgba(212,175,55,0.2)]"
            />
            <span className="absolute -left-1 -top-1 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-black text-white">
              خصم 25%
            </span>
          </div>

          {/* النص + السعر */}
          <div className="flex-1">
            <h4 className="text-sm font-black text-white">
              احصل على كريمة حقيقية مع موكا بوت بريكا
            </h4>
            <p className="mt-1 text-[11px] text-stone-400">
              المكنة الوحيدة اللي بتعمل Crema — + كيس Premium 1 كجم
            </p>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-black text-rv-gold">
                {formatPrice(BUNDLE_PRICE)}
              </span>
              <span className="text-xs text-stone-500 line-through">
                {formatPrice(ORIGINAL_PRICE)}
              </span>
              <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[9px] font-black text-white">
                وفّر 1,000 ج
              </span>
            </div>
          </div>
        </div>

        {/* نقاط سريعة */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["كريمة حقيقية", "3 دقايق", "إيطالي أصلي", "ضمان سنة"].map(
            (t) => (
              <span
                key={t}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold text-stone-300"
              >
                <Check className="size-2.5 text-emerald-400" />
                {t}
              </span>
            ),
          )}
        </div>

        {/* زر الشراء */}
        <button
          onClick={() => add("machine-moka")}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rv-gold to-[#b89728] text-sm font-black text-black shadow-lg shadow-rv-gold/20 transition hover:-translate-y-0.5 hover:shadow-rv-gold/30"
        >
          أضف الباقة للسلة — {formatPrice(BUNDLE_PRICE)}
          <Zap className="size-4" />
        </button>

        {/* ملاحظة ثقة */}
        <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-stone-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-2.5 text-emerald-400" /> ضمان
          </span>
          <span>•</span>
          <span>🚚 توصيل مجاني</span>
          <span>•</span>
          <span>⚡ شحن 24 ساعة</span>
        </div>
      </div>
    </motion.div>
  );
}
