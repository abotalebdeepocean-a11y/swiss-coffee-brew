import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";

interface CardSpec {
  slug: string;
  nameEn: string;
  nameAr: string;
  tag: string;
  desc: string;
  img: string;
  badge: string;
}

const CARDS: CardSpec[] = [
  {
    slug: "rovento-bar-intenso-1kg",
    nameEn: "Bar Intenso",
    nameAr: "بار انتينسو",
    tag: "كافيين أعلى · قوة عالية · مثالي مع الحليب",
    desc: "قهوة مكثفة بنكهة جريئة وعميقة، مثالية لعشاق الطعم القوي. محمصة بعناية فائقة لأفضل النتائج.",
    img: "/images/intenso-bag.webp",
    badge: "عرض محدود",
  },
  {
    slug: "rovento-premium-1kg",
    nameEn: "Premium",
    nameAr: "بريميوم",
    tag: "50% أرابيكا / 50% روبوستا · تحميص متوسط",
    desc: "القمة المطلقة من التميز. خليط فاخر من أجود أنواع البن العالمية، محمص بدقة عالية جداً.",
    img: "/images/premium-bag.webp",
    badge: "الأكثر مبيعاً",
  },
];

function priceOf(slug: string): number {
  return PRODUCTS.find((p) => p.slug === slug)?.price ?? 750;
}

/** منتجاتنا المختارة — بطاقتان لكل منتج رئيسي (1 كجم) */
export function ProductsShowcase() {
  const { add } = useCart();

  return (
    <section id="products" className="relative scroll-mt-20 overflow-hidden bg-rv-black py-20 md:py-28 rv-beans">
      {/* توهج ذهبي خفيف */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-[900px] -translate-x-1/2 bg-gradient-to-r from-transparent via-rv-gold/30 to-transparent" />
      <div className="pointer-events-none absolute right-[-120px] top-40 size-[320px] rounded-full bg-rv-gold/[0.04] blur-[110px]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">
            منتجاتنا <span className="gold-gradient-text">المختارة</span>
          </h2>
          <div className="mx-auto mt-5 h-[3px] w-28 rounded-full bg-gradient-to-r from-transparent via-rv-gold to-transparent" />
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/50 md:text-base">
            خليطان إسبريسو محمصيان طازجاً في القاهرة — كيس 1 كجم يجيلك لحد باب البيت.
          </p>
        </motion.div>

        {/* الشبكة */}
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:gap-8">
          {CARDS.map((c, i) => {
            const price = priceOf(c.slug);
            return (
              <motion.article
                key={c.slug}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-rv-gold/20 bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-3 hover:border-rv-gold/60 hover:shadow-[0_24px_70px_-20px_rgba(212,165,116,0.4)] md:p-7"
              >
                {/* الشارة */}
                <span className="absolute top-4 right-4 z-10 rounded-full bg-gradient-to-b from-rv-gold-light to-rv-gold px-3.5 py-1.5 text-[11px] font-black text-rv-black shadow-[0_4px_14px_rgba(212,165,116,0.35)]">
                  {c.badge}
                </span>

                {/* صورة الكيس — إطار ذهبي مزخرف */}
                <div className="relative mx-auto mb-4 flex h-64 w-full items-center justify-center md:h-80">
                  {/* لمعة خلف المنتج */}
                  <div className="absolute size-[70%] rounded-full bg-[radial-gradient(circle,rgba(212,165,116,0.16),transparent_65%)] blur-xl" />
                  {/* الإطار الذهبي المزخرف */}
                  <div className="rv-gold-frame relative flex h-[85%] w-[82%] items-center justify-center overflow-hidden rounded-lg border border-rv-gold/25 bg-black/30 p-4">
                    {/* أركان ذهبية إضافية */}
                    <div className="absolute top-1 right-1 size-2 rotate-45 border-t border-r border-rv-gold/40" />
                    <div className="absolute bottom-1 left-1 size-2 rotate-45 border-b border-l border-rv-gold/40" />
                    <img
                      src={c.img}
                      alt={`ROVENTO ${c.nameEn} — كيس 1 كجم`}
                      loading="lazy"
                      className="h-full w-full object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.04]"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* البيانات */}
                <div className="mt-2 flex flex-1 flex-col">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl font-black text-white transition-colors group-hover:text-rv-gold-light md:text-2xl">
                      {c.nameEn}
                    </h3>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-white/60">
                      1 كجم
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-black tracking-wide text-rv-gold/80 uppercase">{c.tag}</p>

                  <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-[15px]">
                    {c.desc}
                  </p>

                  {/* السعر + الشحن */}
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <p className="text-2xl font-black leading-none md:text-3xl">
                      <span className="gold-gradient-text">{price.toLocaleString("en-US")}</span>{" "}
                      <span className="text-sm font-black text-white md:text-base">جنيه</span>
                    </p>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-white/40">
                    <span className="size-1.5 rounded-full bg-rv-gold" />
                    الشحن 100 جنيه — مجاني هذا الشهر فقط
                  </p>

                  {/* زر الإضافة للسلة */}
                  <button
                    type="button"
                    onClick={() => add(c.slug, 1)}
                    className="rv-btn mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-b from-[#f0d488] via-rv-gold to-rv-gold-dark text-[15px] font-black text-rv-black shadow-[0_6px_24px_-6px_rgba(212,165,116,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_12px_36px_-6px_rgba(224,200,114,0.65)]"
                  >
                    <ShoppingCart className="size-5" />
                    أضف للسلة — {price.toLocaleString("en-US")} جنيه
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
