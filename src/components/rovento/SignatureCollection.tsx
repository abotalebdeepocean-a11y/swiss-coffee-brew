import { Link } from "react-router";
import { Cat, Flame, Sparkles, ChevronLeft, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { SIGNATURE_BLENDS, getProduct, formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/store";
import { BagVisual } from "./BagVisual";
import type { BlendVariant } from "./CoffeeBag";
import { IntensityMeter } from "./art";
import { SectionHeading } from "./Section";

const PERSONAS: Record<
  string,
  { ar: string; en: string; icon: typeof Cat }
> = {
  "rovento-premium": { ar: "القطّة الفضولية — نكهات أعمق", en: "RICHER FLAVOR", icon: Cat },
  "rovento-intenso": { ar: "القطّة الجريئة — كريما كثيفة", en: "BOLD CREMA", icon: Flame },
  "rovento-classic": { ar: "القطّة الهادئة — متوازن يوميًا", en: "DAILY BALANCE", icon: Sparkles },
};

/** مقارنة سريعة يحبها العميل المصري قبل الشراء */
const COMPARE = [
  { slug: "rovento-classic", name: "كلاسيك", strength: 7, tag: "متوازن · يومي · اقتصادي", color: "#002fa7" },
  { slug: "rovento-premium", name: "بريميم", strength: 9, tag: "نكهات أعمق · كريما أغنى", color: "#c9a227" },
  { slug: "rovento-intenso", name: "إنتنسو", strength: 10, tag: "جريء · قوي · لإسبريسو خالص", color: "#d03b1e" },
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
  const persona = PERSONAS[product.slug] ?? PERSONAS["rovento-premium"];
  const PersonaIcon = persona.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: num * 0.1 }}
      className="group relative flex flex-col overflow-hidden border border-white/10 bg-card transition-colors hover:border-rv-gold/40"
    >
      <span
        className="absolute inset-x-0 top-0 z-10 h-1.5"
        style={{ backgroundColor: product.accent }}
      />
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <span className="font-mono text-[11px] tracking-[0.28em] text-muted-foreground">
          BLEND 0{num + 1}
        </span>
        <span
          className="font-mono text-[11px] uppercase tracking-[0.24em]"
          style={{ color: product.accent }}
        >
          {variant}
        </span>
      </div>

      {/* art */}
      <div className="relative grid place-items-center overflow-hidden px-6 py-8">
        <div
          className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px 260px at 50% 50%, ${product.accent}1f, transparent 70%)`,
          }}
        />
        <BagVisual
          image={product.image}
          variant={variant}
          alt={`ROVENTO ${variant} bag`}
          className="h-60 w-auto transition-transform duration-500 group-hover:scale-[1.06] md:h-64"
        />
      </div>

      {/* persona */}
      <div className="flex items-center gap-3 px-5">
        <span
          className="grid size-9 place-items-center border"
          style={{ color: product.accent, borderColor: product.accent + "66" }}
        >
          <PersonaIcon className="size-4" />
        </span>
        <div>
          <p className="text-sm font-bold">{persona.ar}</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
            {persona.en}
          </p>
        </div>
      </div>

      {/* specs */}
      <div className="mt-5 space-y-2.5 border-t border-white/10 px-5 py-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">التحميص</span>
          <span className="font-semibold">{product.roast}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">التكوين</span>
          <span className="font-mono text-xs">
            {product.arabica}٪ أرابيكا · {product.robusta}٪ روبوستا
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">الشدة</span>
          <IntensityMeter value={product.intensity ?? 3} color={product.accent} />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.notes.map((n) => (
            <span
              key={n}
              className="border border-white/10 px-2 py-1 text-[11px] text-muted-foreground"
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="mt-auto flex items-center justify-between border-t border-white/10 px-5 py-4">
        <div>
          <p className="text-lg font-bold">{formatPrice(product.price)}</p>
          {product.oldPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/product/${product.slug}`}
            className="flex h-10 items-center gap-1.5 border border-white/20 px-4 text-xs font-semibold transition-colors hover:border-rv-blue hover:text-rv-blue"
          >
            التفاصيل
            <ChevronLeft className="size-3.5" />
          </Link>
          <button
            onClick={() => add(product.slug)}
            className="h-10 bg-rv-red px-4 text-xs font-bold text-white transition-colors hover:bg-[#b53219]"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function SignatureCollection() {
  const blends = SIGNATURE_BLENDS.map((slug) => getProduct(slug)!).filter(Boolean);
  const variants: BlendVariant[] = ["premium", "intenso", "classic"];

  return (
    <section id="signature" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeading
          index="02"
          kicker="Find Your Blend"
          title={
            <>
              اختار <span className="text-rv-red">شخصيتك في فنجانك</span>
            </>
          }
          desc="كل بلند له طابعه: ذهبي متوازن، أحمر جريء، أزرق ناعم — قارن واختار اللي يناسب يومك. الكل محمص طازج ويصلك خلال 48 ساعة."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {blends.map((product, i) => (
            <BlendCard
              key={product.slug}
              product={product}
              variant={variants[i]}
              num={i}
            />
          ))}
        </div>

        {/* مقارنة سريعة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-10 border border-white/10 bg-card"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
            <Gauge className="size-4 text-rv-red" />
            <h3 className="text-base font-bold">مقارنة سريعة — القوة</h3>
            <span className="ms-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Strength · من 10
            </span>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-3">
            {COMPARE.map((c, i) => {
              const p = getProduct(c.slug)!;
              return (
                <div key={c.slug} className="bg-background p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: c.color }}>
                      {c.name}
                    </span>
                    <span className="font-display text-2xl font-black font-wide">
                      {c.strength}
                      <span className="text-sm font-bold text-muted-foreground">/10</span>
                    </span>
                  </div>
                  <div className="mt-3 h-2 w-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.strength * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.1 }}
                      className="h-full"
                      style={{ backgroundColor: c.color }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{c.tag}</p>
                  <Link
                    to={`/product/${p.slug}`}
                    className="mt-3 inline-block text-xs font-semibold text-rv-red underline-offset-4 hover:underline"
                  >
                    عرض البلند ←
                  </Link>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
