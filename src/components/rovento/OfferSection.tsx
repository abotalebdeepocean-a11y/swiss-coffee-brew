import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Flame } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/store";

const DEAL_PRICE = 680; // 2 × بريميم 340
const DEAL_OLD = 840; // 2 × 420
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
    <div className="min-w-[70px] rounded-2xl border border-rv-gold/50 bg-black/80 px-4 py-3 text-center shadow-lg sm:min-w-[90px] sm:px-6 sm:py-4">
      <span className="block text-2xl font-black text-rv-gold sm:text-4xl">
        {value}
      </span>
      <span className="block text-[11px] font-bold uppercase text-stone-400 sm:text-xs">
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
      className="relative overflow-hidden border-y-2 border-rv-gold bg-gradient-to-br from-[#1a160e] via-[#241e11] to-[#1a160e] py-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center md:px-6">
        {/* شارة */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-rv-gold px-5 py-1.5 text-sm font-black uppercase tracking-wider text-black shadow-lg"
        >
          <Flame className="size-4 text-red-600" />
          عرض الأسبوع الخاص لعشاق القهوة في مصر
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mb-4 text-3xl font-black text-white sm:text-5xl"
        >
          🔥 اشترِ 2 واحصل على{" "}
          <span className="gold-gradient-text">خصم فوري {SAVE} ج.م</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto mb-8 max-w-2xl text-base text-stone-300 sm:text-lg"
        >
          احصل على كيسين من اختيارك (بريميم أو إنتنسو) بسعر استثنائي مع شحن
          مجاني لأي محافظة في مصر لفترة محدودة.
        </motion.p>

        {/* العداد التنازلي */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold text-rv-gold">
            ⏳ ينتهي العرض خلال:
          </p>
          <div className="flex items-center justify-center gap-2 font-mono sm:gap-3">
            <TimeBox value={days} unit="يوم" />
            <span className="text-2xl font-bold text-rv-gold">:</span>
            <TimeBox value={hours} unit="ساعة" />
            <span className="text-2xl font-bold text-rv-gold">:</span>
            <TimeBox value={minutes} unit="دقيقة" />
            <span className="text-2xl font-bold text-rv-gold">:</span>
            <TimeBox value={seconds} unit="ثانية" />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => add("rovento-premium", 2)}
          className="btn-gold inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-lg font-black shadow-2xl transition hover:scale-105"
        >
          <ShoppingBag className="size-6" />
          اطلب عرض الأسبوع الآن — كيسان بريميم بـ {formatPrice(DEAL_PRICE)}{" "}
          بدل {formatPrice(DEAL_OLD)}
        </button>
      </div>
    </section>
  );
}
