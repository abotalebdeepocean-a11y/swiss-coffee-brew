import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ChevronLeft, Timer } from "lucide-react";
import { getProduct, formatPrice, discountPercent } from "@/lib/products";
import { useCart } from "@/lib/store";
import { BagVisual } from "./BagVisual";
import { blendVariantFor } from "./CoffeeBag";
import { SectionHeading } from "./Section";

const OFFERS = [
  {
    slug: "rovento-premium",
    tag: "الأكثر مبيعًا",
    note: "كوب متوازن غني بالكريما — مثالي للإسبريسو واللاتيه",
  },
  {
    slug: "rovento-intenso",
    tag: "إسبريسو قوي",
    note: "كريما كثيفة وطعم جريء — لعشاق الكورتوادو والماكياتو",
  },
];

/** عدد تنازلي حي حتى نهاية الأسبوع الحالي */
function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const target = useMemo(() => {
    const d = new Date();
    const day = d.getDay(); // 0 = الأحد
    const daysToSunday = (7 - day) % 7 || 7;
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

function CountdownBox({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="grid size-14 place-items-center border border-rv-gold/40 bg-background/80 md:size-16">
      <span className="font-display text-xl font-black text-rv-gold font-wide md:text-2xl">
        {value}
      </span>
      <span className="text-[9px] text-muted-foreground">{unit}</span>
    </div>
  );
}

export function OfferSection() {
  const { add } = useCart();
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section
      id="offers"
      className="relative overflow-hidden border-b border-white/10 py-20 md:py-28"
    >
      {/* خلفية ذهبية خفيفة */}
      <div className="absolute inset-0 bg-gradient-to-b from-rv-gold/[0.07] via-transparent to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 50% 0%, rgba(201,162,39,0.12), transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <SectionHeading
            index="03"
            kicker="Weekly Offer"
            title={
              <>
                🔥 اشترِ 2 واحصل على{" "}
                <span className="text-rv-red">خصم فوري</span>
              </>
            }
            desc="ركّزنا على الأفضل عندنا. اختار البلند اللي يناسب طقوسك — تحميص طازج يصلك خلال ٤٨ ساعة في كل مصر."
            className="mb-0 md:mb-0"
          />
          {/* عداد تنازلي */}
          <div className="mb-2">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-rv-gold">
              <Timer className="size-3.5" />
              ينتهي العرض خلال
            </p>
            <div className="flex gap-2">
              <CountdownBox value={days} unit="يوم" />
              <span className="self-center text-xl font-black text-rv-gold">:</span>
              <CountdownBox value={hours} unit="ساعة" />
              <span className="self-center text-xl font-black text-rv-gold">:</span>
              <CountdownBox value={minutes} unit="دقيقة" />
              <span className="self-center text-xl font-black text-rv-gold">:</span>
              <CountdownBox value={seconds} unit="ثانية" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {OFFERS.map((o, i) => {
            const p = getProduct(o.slug)!;
            const off = discountPercent(p);

            return (
              <motion.div
                key={o.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="group relative flex flex-col overflow-hidden border border-rv-gold/25 bg-card transition-colors hover:border-rv-gold/50 md:flex-row"
              >
                <span
                  className="absolute inset-x-0 top-0 z-10 h-1.5"
                  style={{ backgroundColor: p.accent }}
                />

                {/* art */}
                <div className="relative grid place-items-center overflow-hidden px-6 py-10 md:w-1/2">
                  <div
                    className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(300px 300px at 50% 50%, ${p.accent}1f, transparent 70%)`,
                    }}
                  />
                  <BagVisual
                    image={p.image}
                    variant={blendVariantFor(p.slug)}
                    alt={p.name}
                    className="h-72 w-auto transition-transform duration-500 group-hover:scale-[1.05] md:h-80"
                  />
                  {off && (
                    <span className="absolute start-4 top-6 z-10 grid size-16 place-items-center rounded-full bg-rv-red text-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                      <span>
                        <span className="block text-lg font-black leading-none">
                          {off}%
                        </span>
                        <span className="block font-mono text-[8px] tracking-widest">
                          خصم
                        </span>
                      </span>
                    </span>
                  )}
                </div>

                {/* copy */}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="border border-rv-red/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-rv-red">
                      {o.tag}
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: p.accent }}
                    >
                      {p.roast}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold leading-snug">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {o.note}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.notes.map((n) => (
                      <span
                        key={n}
                        className="border border-white/10 px-2 py-1 text-[11px] text-muted-foreground"
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="font-display text-3xl font-black font-wide">
                          {formatPrice(p.price)}
                        </span>
                        {p.oldPrice && (
                          <span className="pb-1 text-sm text-muted-foreground line-through">
                            {formatPrice(p.oldPrice)}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-rv-gold">
                        <Timer className="size-3.5" />
                        عرض لفترة محدودة
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/product/${p.slug}`}
                        className="flex h-11 items-center gap-1.5 border border-white/20 px-4 text-xs font-semibold transition-colors hover:border-rv-blue hover:text-rv-blue"
                      >
                        التفاصيل
                        <ChevronLeft className="size-4" />
                      </Link>
                      <button
                        onClick={() => add(p.slug)}
                        className="h-11 bg-rv-red px-6 text-sm font-bold text-white transition-colors hover:bg-[#b53219]"
                      >
                        اطلب الآن
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
