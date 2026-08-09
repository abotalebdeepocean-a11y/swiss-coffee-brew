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

export function OfferSection() {
  const { add } = useCart();

  return (
    <section id="offers" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeading
          index="01"
          kicker="Weekly Offer"
          title={
            <>
              عرض الأسبوع: <span className="text-rv-red">كيسان بخصم حقيقي</span>
            </>
          }
          desc="ركّزنا على الأفضل عندنا. اختار البلند اللي يناسب طقوسك — تحميص طازج يصلك خلال ٤٨ ساعة في كل مصر."
        />

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
                className="group relative flex flex-col overflow-hidden border border-white/10 bg-card md:flex-row"
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
