import { Link } from "react-router";
import { motion } from "framer-motion";
import { getProduct, formatPrice, type Product } from "@/lib/products";
import { BagVisual } from "./BagVisual";
import { Stars } from "./art";
import type { BlendVariant } from "./CoffeeBag";

/** إعدادات الشخصيات — الألوان والشارات */
const PERSONAS: Record<
  string,
  {
    bannerCls: string;
    nameEn: string;
    tag: string;
    strength: number;
    crema: number;
    roast: string;
    strengthCls: string;
    ctaCls: string;
    cardCls: string;
    glowColor: string;
    featured?: boolean;
  }
> = {
  "rovento-classic": {
    bannerCls: "bg-blue-800/90",
    nameEn: "CLASSIC",
    tag: "متوازن لأي وقت في اليوم",
    strength: 7,
    crema: 7,
    roast: "متوسط",
    strengthCls: "text-blue-400",
    ctaCls: "border border-stone-600 hover:border-blue-400 hover:text-blue-300",
    cardCls: "border-blue-500/30 hover:border-blue-500/80",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  "rovento-premium": {
    bannerCls: "bg-teal-800/90",
    nameEn: "PREMIUM",
    tag: "نكهات أعمق... تجربة فاخرة",
    strength: 9,
    crema: 9,
    roast: "داكن",
    strengthCls: "text-teal-400",
    ctaCls: "border border-stone-600 hover:border-teal-400 hover:text-teal-300",
    cardCls: "border-2 border-rv-gold shadow-2xl",
    featured: true,
    glowColor: "rgba(212, 175, 55, 0.12)",
  },
};

/** جدول المقارنة */
const COMPARE_ROWS = [
  { name: "Classic Blend", strength: "7/10", crema: "متوازنة ولطيفة", use: "قهوة سوداء / فلتر / يومي", price: 690, note: "/ 1 كجم", cls: "" },
  { name: "Premium Blend", strength: "9/10", crema: "غنية وكثيفة جدًا", use: "إسبريسو / بريكا / كابتشينو", price: 1200, note: "/ 1 كجم", cls: "bg-rv-gold/10 text-rv-gold" },
];

function BlendCard({
  product,
  variant,
  num,
}: {
  product: Product;
  variant: BlendVariant;
  num: number;
}) {
  const p = PERSONAS[product.slug]!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: num * 0.1 }}
      className={`relative flex flex-col overflow-hidden rounded-2xl border bg-coffee-900/90 text-center shadow-xl transition ${
        p.cardCls
      } ${p.featured ? "md:-translate-y-2" : ""}`}
    >
      {/* شريط الرأس الملون */}
      <div className={`px-6 py-4 ${p.bannerCls}`}>
        <h3 className="text-xl font-black tracking-widest text-white">
          {p.nameEn}
        </h3>
        <p className="mt-1 text-xs font-bold text-white/85">{p.tag}</p>
      </div>

      {p.featured && (
        <span className="absolute -top-0 right-4 z-10 flex items-center gap-1 rounded-b-lg bg-rv-gold px-3 py-1 text-xs font-black text-black shadow">
          ⭐ اختيار العشاق
        </span>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* صورة الكيس — كبيرة وواضحة */}
        <div className="relative mx-auto mb-5 grid h-64 w-full place-items-center overflow-hidden rounded-2xl border border-stone-700/50 bg-gradient-to-b from-stone-900/80 to-coffee-950 sm:h-72 md:h-80">
          {/* توهج خلف الكيس */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(280px 260px at 50% 45%, ${p.glowColor}, transparent 60%)`,
            }}
          />
          <BagVisual
            image={product.image}
            variant={variant}
            alt={product.name}
            className="relative h-56 w-auto object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.5)] sm:h-64 md:h-72"
          />
        </div>

        {/* تقييم تفصيلي */}
        <div className="mb-5 space-y-2.5 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-stone-400">قوة الطعم</span>
            <span className="flex items-center gap-1.5">
              <Stars value={Math.round(p.strength / 2)} />
              <span className={`font-mono font-bold ${p.strengthCls}`}>
                {p.strength}/10
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-stone-400">الكريما</span>
            <span className="flex items-center gap-1.5">
              <Stars value={Math.round(p.crema / 2)} />
              <span className={`font-mono font-bold ${p.strengthCls}`}>
                {p.crema}/10
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-stone-400">التحميص</span>
            <span className="font-mono font-bold text-stone-200">
              {p.roast}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-stone-400">النكهات</span>
            <span className="text-xs text-stone-300">
              {product.notes?.join(" · ")}
            </span>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between border-t border-stone-800 pt-4">
          <span className="text-sm text-stone-400">السعر</span>
          <div className="text-start">
            <span className="text-xl font-black text-white">
              {formatPrice(product.price)}
            </span>
            <span className="block text-xs text-stone-400">
              / {product.weight}
            </span>
          </div>
        </div>

        <Link
          to={`/product/${product.slug}`}
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-transparent text-sm font-black text-stone-200 transition ${p.ctaCls}`}
        >
          تسوق {p.nameEn === "CLASSIC" ? "كلاسيك" : "بريميوم"}
        </Link>
      </div>
    </motion.div>
  );
}

export function SignatureCollection() {
  const blends = ["rovento-classic", "rovento-premium"]
    .map((slug) => getProduct(slug)!)
    .filter(Boolean);
  const variants: BlendVariant[] = ["classic", "premium"];

  return (
    <section
      id="featured"
      className="border-b border-stone-800 bg-coffee-900/50 py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* رأس القسم */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <span className="text-sm font-bold uppercase tracking-wider text-rv-gold">
            اختر ما يناسب مزاجك
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            اختر <span className="text-rv-red">شخصيتك</span> في فنجانك
          </h2>
          <p className="mt-3 text-base text-stone-300 md:text-lg">
            منتجا روفينتو الأساسيان — توازن يومي اقتصادي، أو كريما إسبريسو غنية
            فاخرة. الكيسان الأصليان بأعلى جودة تحميص في مصر.
          </p>
        </div>

        {/* الكروت — منتجان فقط */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {blends.map((product, i) => (
            <BlendCard
              key={product.slug}
              product={product}
              variant={variants[i]}
              num={i}
            />
          ))}
        </div>

        {/* جدول المقارنة — محسّن */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-12 max-w-4xl rounded-3xl border border-stone-800 bg-coffee-900/80 p-4 shadow-2xl sm:p-6 md:mt-14 md:p-8"
        >
          <div className="mb-6 text-center">
            <h3 className="text-xl font-black text-white sm:text-2xl">
              مقارنة سريعة بين منتجي روفينتو
            </h3>
            <p className="mt-1 text-xs text-stone-400 sm:text-sm">
              اختار الخلطة الأنسب لطريقة تحضيرك المفضلة
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-right text-sm">
              <thead>
                <tr className="border-b border-stone-800 text-rv-gold">
                  <th className="px-3 py-3 font-black sm:px-4">النوع</th>
                  <th className="px-3 py-3 text-center font-black sm:px-4">القوة</th>
                  <th className="hidden px-4 py-3 font-black sm:table-cell">
                    الكريما
                  </th>
                  <th className="hidden px-4 py-3 font-black md:table-cell">
                    أفضل استخدام
                  </th>
                  <th className="px-3 py-3 text-center font-black sm:px-4">السعر</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {COMPARE_ROWS.map((r) => (
                  <tr
                    key={r.name}
                    className={`transition hover:bg-stone-800/40 ${r.cls}`}
                  >
                    <td className={`px-3 py-4 font-bold sm:px-4 ${r.cls}`}>{r.name}</td>
                    <td className="px-3 py-4 text-center font-mono font-bold sm:px-4">
                      {r.strength}
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">{r.crema}</td>
                    <td className="hidden px-4 py-4 md:table-cell">{r.use}</td>
                    <td className="px-3 py-4 text-center font-bold sm:px-4">
                      {formatPrice(r.price)}
                      <span className="block text-[10px] font-normal text-stone-500">
                        {r.note}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-stone-500">
            * بريميم (70٪ أرابيكا) وكلاسيك (50٪ أرابيكا) — يُباعان كيس 1 كجم، والمطحون متاح.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
