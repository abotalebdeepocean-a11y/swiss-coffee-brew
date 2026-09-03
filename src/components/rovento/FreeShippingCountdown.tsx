import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Flame } from "lucide-react";

/** رقم واحد داخل صندوق — بينفلپ (flip) بسيط عند التغيير */
function Unit({
  value,
  label,
  urgent,
}: {
  value: number;
  label: string;
  urgent: boolean;
}) {
  const txt = String(value).padStart(2, "0");
  const numClass = urgent
    ? "text-red-400 drop-shadow-[0_0_18px_rgba(248,113,113,0.4)]"
    : "gold-gradient-text";
  const boxClass = urgent
    ? "border-red-400/50 shadow-[0_0_30px_-8px_rgba(248,113,113,0.25)]"
    : "border-rv-gold/25";

  return (
    <div
      className={`flex min-w-[72px] flex-col items-center rounded-2xl border bg-black/50 px-2 py-4 backdrop-blur-md sm:min-w-[96px] sm:px-3` + " " + boxClass}
    >
      <div className="relative flex h-[3.2rem] items-center justify-center overflow-hidden">
        <motion.span
          key={txt}
          initial={{ y: "-110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`block font-mono text-[2.4rem] leading-none font-black tabular-nums sm:text-[2.8rem] ${numClass}`}
        >
          {txt}
        </motion.span>
      </div>
      <span className="mt-2 text-[11px] font-black text-white/50">{label}</span>
    </div>
  );
}

/**
 * قسم الاستعجالية — كاونتدوان حقيقي حتى آخر يوم في الشهر الحالي
 * (أيام : ساعات : دقائق : ثواني) بمناسبة عرض الشحن المجاني.
 */
export function FreeShippingCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  /** آخر ثانية في الشهر الحالي (بتوقيت جهاز العميل) */
  const target = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59).getTime();
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  const urgent = diff > 0 && diff < 86_400_000; // أقل من 24 ساعة => أحمر

  return (
    <section id="offer" className="relative scroll-mt-20 overflow-hidden border-y border-rv-gold/10 bg-gradient-to-b from-[#160d07] to-[#0a0705] py-20 md:py-24">
      <div className="rv-noise pointer-events-none absolute inset-0" />
      {/* توهجات */}
      <motion.div
        animate={{ opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-[#d4a574]/[0.06] blur-[120px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[880px] px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-rv-gold/30 bg-rv-gold/10 px-4 py-1.5 text-xs font-black text-rv-gold">
            <Flame className="size-3.5" />
            عرض محدود الوقت فقط
          </span>

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl md:text-5xl">
            الشحن المجاني ينتهي <span className="gold-gradient-text">خلال:</span>
          </h2>

          {/* الكاونتدوان */}
          <div className="mt-10 flex items-start justify-center gap-1.5 sm:gap-2.5">
            <Unit value={days} label="أيام" urgent={urgent} />
            <span className="pt-6 text-2xl font-black text-rv-gold/60 sm:text-3xl">:</span>
            <Unit value={hours} label="ساعات" urgent={urgent} />
            <span className="pt-6 text-2xl font-black text-rv-gold/60 sm:text-3xl">:</span>
            <Unit value={minutes} label="دقائق" urgent={urgent} />
            <span className="pt-6 text-2xl font-black text-rv-gold/60 sm:text-3xl">:</span>
            <Unit value={seconds} label="ثواني" urgent={urgent} />
          </div>

          <p className="mt-8 text-sm font-bold text-white/55 md:text-base">
            بعدها سيكون الشحن <span className="text-white">100 جنيه</span> لجميع المحافظات
          </p>

          <a
            href="#products"
            className="rv-btn group mt-7 inline-flex h-[54px] items-center justify-center gap-2 rounded-[10px] border-2 border-rv-gold/60 px-9 text-base font-black text-rv-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-rv-gold hover:bg-rv-gold/10 hover:text-rv-gold-light"
          >
            اطلب دلوقتي
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </a>

          {/* طرق الدفع */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
            {["الدفع عند الاستلام", "فودافون كاش", "إنستاباي"].map((m) => (
              <span
                key={m}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-bold text-white/50"
              >
                {m}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
