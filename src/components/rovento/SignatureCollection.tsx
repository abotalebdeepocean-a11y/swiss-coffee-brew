import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SIGNATURE_BLENDS, getProduct, formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/store";
import { BagVisual } from "./BagVisual";
import type { BlendVariant } from "./CoffeeBag";

/** إعدادات الشخصيات — ألوان وشارات حسب المرجع */
const PERSONAS: Record<
  string,
  {
    badge: string;
    badgeCls: string;
    tag: string;
    strength: number;
    strengthCls: string;
    ctaCls: string;
    cardCls: string;
    featured?: boolean;
  }
> = {
  "rovento-classic": {
    badge: "🟦 الخلطة الكلاسيكية (Classic)",
    badgeCls: "bg-blue-500/20 text-blue-400",
    tag: "متوازن • يومي • اقتصادي",
    strength: 7,
    strengthCls: "text-blue-400",
    ctaCls: "bg-blue-600 hover:bg-blue-500 text-white",
    cardCls: "border-blue-500/30 hover:border-blue-500/80",
  },
  "rovento-premium": {
    badge: "🟩 الخلطة الفاخرة (Premium / Espresso)",
    badgeCls: "bg-emerald-500/20 text-emerald-400",
    tag: "نكهات أعمق • كريما أغنى",
    strength: 9,
    strengthCls: "text-emerald-400",
    ctaCls: "btn-gold",
    cardCls: "border-2 border-rv-gold shadow-2xl",
    featured: true,
  },
  "rovento-intenso": {
    badge: "🟪 الخلطة المكثفة (Intenso)",
    badgeCls: "bg-purple-500/20 text-purple-400",
    tag: "قوة التركيز • قوام ثقيل",
    strength: 10,
    strengthCls: "text-purple-400",
    ctaCls: "bg-purple-600 hover:bg-purple-500 text-white",
    cardCls: "border-purple-500/30 hover:border-purple-500/80",
  },
};

const SHORT_DESC: Record<string, string> = {
  "rovento-classic":
    "مزيج مثالي للقهوة اليومية — طعم متوازن وحمضية لطيفة مع حمولة كافيين تناسب بداية اليوم، بسعر اقتصادي في متناول الجميع.",
  "rovento-premium":
    "خلطة الإسبريسو المميزة بتركيبة متوازنة من الأرابيكا والروبوستا تمنحك طبقة كريما ذهبية كثيفة وطعم الشوكولاتة الداكنة والمكسرات المحمصة.",
  "rovento-intenso":
    "لمن يبحث عن جرعة طاقة مضاعفة وتحميص داكن قوي — مثالي لمشروبات الحليب (لاتيه، كابتشينو) حيث يبرز طعم القهوة بقوة دون أن يختفي.",
};

/** جدول المقارنة — نفس روح المرجع */
const COMPARE_ROWS = [
  { name: "Classic Blend", strength: "7/10", crema: "متوازنة ولطيفة", use: "قهوة سوداء / فلتر / يومي", price: 285, note: "/ 250 جم", cls: "" },
  { name: "Espresso Blend (Premium)", strength: "9/10", crema: "غنية وكثيفة جدًا", use: "إسبريسو / بريكا / كابتشينو", price: 340, note: "/ 250 جم", cls: "bg-rv-gold/10 text-rv-gold" },
  { name: "Intenso Blend", strength: "10/10", crema: "داكنة وثقيلة", use: "مشروبات الحليب الساخنة", price: 310, note: "/ 250 جم", cls: "" },
  { name: "ROVENTO Origin — إثيوبيا", strength: "8.5/10", crema: "مخملية وناعمة بطعم التوت والزهور", use: "إسبريسو سينجل أوريجن فاخر", price: 1450, note: "/ 1 كجم", cls: "" },
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
  const { add } = useCart();
  const p = PERSONAS[product.slug]!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: num * 0.1 }}
      className={`relative flex flex-col justify-between rounded-2xl border bg-coffee-900/90 p-6 text-center shadow-xl transition ${
        p.cardCls
      } ${p.featured ? "md:-translate-y-2" : ""}`}
    >
      {p.featured && (
        <span className="absolute -top-3.5 right-6 flex items-center gap-1 rounded-full bg-rv-gold px-3 py-1 text-xs font-black text-black shadow">
          <Star className="size-3.5" />
          اختيار العشاق
        </span>
      )}

      <div>
        <span
          className={`mb-4 inline-block rounded-full px-4 py-1 text-xs font-bold ${p.badgeCls}`}
        >
          {p.badge}
        </span>
        <h3 className="text-2xl font-black text-white">{product.nameEn}</h3>
        <p className="mb-4 mt-1 text-base font-bold text-rv-gold">{p.tag}</p>

        {/* صورة الكيس الحقيقية */}
        <div className="relative mx-auto mb-5 grid h-44 w-32 place-items-center rounded-xl border border-stone-800 bg-stone-950">
          <BagVisual
            image={product.image}
            variant={variant}
            alt={product.name}
            className="h-40 w-auto"
          />
        </div>

        <p className="mb-6 text-sm leading-relaxed text-stone-400">
          {SHORT_DESC[product.slug]}
        </p>
      </div>

      <div className="border-t border-stone-800 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-stone-400">القوة:</span>
          <span className={`font-bold ${p.strengthCls}`}>
            {p.strength} / 10
          </span>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-stone-400">السعر:</span>
          <span className="text-xl font-black text-white">
            {formatPrice(product.price)}
            <span className="text-xs text-stone-400"> / 250 جم</span>
          </span>
        </div>
        <button
          onClick={() => add(product.slug)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-black transition ${p.ctaCls}`}
        >
          <ShoppingCart className="size-4" />
          أضف إلى السلة
        </button>
      </div>
    </motion.div>
  );
}

export function SignatureCollection() {
  const blends = SIGNATURE_BLENDS.map((slug) => getProduct(slug)!).filter(Boolean);
  const variants: BlendVariant[] = ["premium", "intenso", "classic"];

  return (
    <section
      id="signature"
      className="border-b border-stone-800 bg-coffee-900/50 py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* رأس القسم */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-rv-gold">
            اختر ما يناسب مزاجك
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            اختار <span className="text-rv-red">شخصيتك</span> في فنجانك
          </h2>
          <p className="mt-3 text-lg text-stone-300">
            صممنا خلطات روفينتو بعناية فائقة لتلائم أوقاتك المختلفة — توازن يومي
            اقتصادي، كريما إسبريسو غنية، أو قوة تركيز مضاعفة.
          </p>
        </div>

        {/* الكروت */}
        <div className="grid gap-8 md:grid-cols-3">
          {blends.map((product, i) => (
            <BlendCard
              key={product.slug}
              product={product}
              variant={variants[i]}
              num={i}
            />
          ))}
        </div>

        {/* جدول المقارنة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-14 max-w-4xl rounded-3xl border border-stone-800 bg-coffee-900/80 p-6 shadow-2xl sm:p-8"
        >
          <div className="mb-6 text-center">
            <h3 className="text-xl font-black text-white sm:text-2xl">
              مقارنة سريعة بين خلطات روفينتو
            </h3>
            <p className="mt-1 text-xs text-stone-400 sm:text-sm">
              اختار الخلطة الأنسب لطريقة تحضيرك المفضلة
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-right text-sm">
              <thead>
                <tr className="border-b border-stone-800 text-rv-gold">
                  <th className="px-4 py-3 font-black">النوع</th>
                  <th className="px-4 py-3 text-center font-black">القوة</th>
                  <th className="hidden px-4 py-3 font-black sm:table-cell">
                    طبيعة الكريما
                  </th>
                  <th className="hidden px-4 py-3 font-black md:table-cell">
                    أفضل استخدام
                  </th>
                  <th className="px-4 py-3 text-center font-black">السعر</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {COMPARE_ROWS.map((r) => (
                  <tr
                    key={r.name}
                    className={`transition hover:bg-stone-800/40 ${r.cls}`}
                  >
                    <td className={`px-4 py-4 font-bold ${r.cls}`}>{r.name}</td>
                    <td className="px-4 py-4 text-center font-mono font-bold">
                      {r.strength}
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">{r.crema}</td>
                    <td className="hidden px-4 py-4 md:table-cell">{r.use}</td>
                    <td className="px-4 py-4 text-center font-bold">
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
            * أسعار الكيس 250 جم — 1 كجم والمطحون متاحان داخل كل بلند، والأصول
            تُباع كيلو كامل.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
