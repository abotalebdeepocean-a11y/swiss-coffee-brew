import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Flame, Clock, Percent } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";

const DEAL_PRICE = 2400; // 2 × بريميم 1200 (1 كجم)
const DEAL_OLD = 2800; // 2 × 1400 سعر الباقة قبل الخصم
const SAVE = DEAL_OLD - DEAL_PRICE;

/** عداد تنازلي حي حتى نهاية الأسبوع */
function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const target = useMemo(() => {
    const d = new Date();
    const daysToSunday = (7 - d.getDay()) % 7 || 7;
    const t = new Date(d);
    t.setDate(t.getDate() + daysToSunday);
    t.setHours(23, 59, 59, 0);
    return t.getTime();
  }, []);

  const diff = Math.max(0, target - now);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(diff / 86_400_000)),
    hours: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    minutes: pad(Math.floor((diff % 3_600_000) / 60_000)),
    seconds: pad(Math.floor((diff % 60_000) / 1000)),
  };
}

function TimeBox({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-rv-gold/40 bg-black/80 px-3 py-3 shadow-lg sm:px-5 sm:py-4 md:min-w-[100px]">
      <span className="block text-3xl font-black text-rv-gold sm:text-5xl">
        {value}
      </span>
      <span className="mt-1 block text-[10px] font-bold uppercase text-stone-400 sm:text-xs">
        {unit}
      </span>
    </div>
  );
}

export function OfferSection() {
  const { add } = useCart();
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section
      id="deal"
      className="relative overflow-hidden border-y-2 border-rv-gold bg-gradient-to-br from-[#1a160e] via-[#241e11] to-[#1a160e] py-12 md:py-16"
    >
      {/* توهج في الخلفية */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.12),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center md:px-6">
        {/* شارة العرض */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-rv-gold px-5 py-1.5 text-sm font-black uppercase tracking-wider text-black shadow-lg"
        >
          <Flame className="size-4 text-red-600" />
          عرض الأسبوع الخاص لعشاق القهوة في مصر
        </motion.div>

        {/* العنوان الرئيسي */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mb-3 text-2xl font-black text-white sm:text-4xl md:text-5xl"
        >
          🔥 اشترِ 2 واحصل على{" "}
          <span className="gold-gradient-text">خصم فوري {SAVE} ج.م</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto mb-6 max-w-2xl text-sm text-stone-300 md:text-lg"
        >
          على كيسين من بريميم 70٪ أرابيكا (1 كجم) — لفترة محدودة، مع شحن مجاني
          لأي محافظة في مصر.
        </motion.p>

        {/* بادج التوفير */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-900/20 px-6 py-3"
        >
          <Percent className="size-5 text-red-400" />
          <div className="text-start">
            <span className="block text-lg font-black text-red-400">
              وفّر {SAVE} ج.م
            </span>
            <span className="text-xs text-stone-400">
              بدل {formatPrice(DEAL_OLD)} → {formatPrice(DEAL_PRICE)}
            </span>
          </div>
        </motion.div>

        {/* العداد التنازلي */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-rv-gold">
            <Clock className="size-4" />
            <span>ينتهي العرض خلال:</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <TimeBox value={days} unit="يوم" />
            <span className="text-2xl font-bold text-rv-gold sm:text-3xl">:</span>
            <TimeBox value={hours} unit="ساعة" />
            <span className="text-2xl font-bold text-rv-gold sm:text-3xl">:</span>
            <TimeBox value={minutes} unit="دقيقة" />
            <span className="text-2xl font-bold text-rv-gold sm:text-3xl">:</span>
            <TimeBox value={seconds} unit="ثانية" />
          </div>
        </div>

        {/* CTA الرئيسي */}
        <button
          onClick={() => add("rovento-premium", 2)}
          className="btn-gold inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-black shadow-2xl transition hover:scale-105 sm:px-10 sm:py-5 sm:text-lg"
        >
          <ShoppingBag className="size-5 sm:size-6" />
          اطلب العرض الآن — كيسان بـ {formatPrice(DEAL_PRICE)}
        </button>

        {/* ملاحظات الثقة */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-400">
          <span>⏳ العرض ساري حتى نفاد الكمية</span>
          <span className="hidden sm:inline">·</span>
          <span>📦 الدفع عند الاستلام</span>
          <span className="hidden sm:inline">·</span>
          <span>🚚 شحن مجاني</span>
        </div>
      </div>
    </section>
  );
}
