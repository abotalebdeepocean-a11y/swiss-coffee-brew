import { Link } from "react-router";
import { Crown, Flame, Sparkles, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SIGNATURE_BLENDS, getProduct, formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/store";
import { CoffeeBag, type BlendVariant } from "./CoffeeBag";
import { IntensityMeter } from "./art";
import { SectionHeading } from "./Section";

const PERSONAS: Record<
  string,
  { ar: string; en: string; icon: typeof Crown }
> = {
  "mish-premium": { ar: "الأسد الحكيم", en: "WISE LION", icon: Crown },
  "mish-intenso": { ar: "الغوريلا القوية", en: "POWERFUL GORILLA", icon: Flame },
  "mish-classic": { ar: "الماندريل المبدع", en: "CREATIVE MANDRILL", icon: Sparkles },
};

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
  const persona = PERSONAS[product.slug] ?? PERSONAS["mish-premium"];
  const PersonaIcon = persona.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: num * 0.1 }}
      className="group relative flex flex-col overflow-hidden border border-white/10 bg-card"
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
        <CoffeeBag
          variant={variant}
          className="h-64 w-auto transition-transform duration-500 group-hover:scale-[1.06] md:h-72"
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
          kicker="Signature Collection"
          title={
            <>
              مجموعة <span className="text-rv-red">MISH</span> المميزة
            </>
          }
          desc="ثلاثة بلندات، ثلاث شخصيات، نكهة واحدة لا تُنسى. كل كيس يحمل قصة مصرية ويصل إليك محمصًا طازجًا."
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
      </div>
    </section>
  );
}
