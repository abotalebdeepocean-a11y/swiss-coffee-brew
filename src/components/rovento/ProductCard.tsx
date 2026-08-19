import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Eye, Plus, Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { CATEGORY_MAP, formatPrice, discountPercent, variantOf } from "@/lib/products";
import { useCart } from "@/lib/store";
import { BagVisual } from "./BagVisual";
import { blendVariantFor } from "./CoffeeBag";
import { Stars } from "./art";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { add } = useCart();
  const cat = CATEGORY_MAP[product.category];
  const discount = discountPercent(product);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const activeVariant = variantOf(product, variantId);
  const price = activeVariant?.price ?? product.price;
  const oldPrice = activeVariant?.oldPrice ?? product.oldPrice;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-card transition-all duration-300 hover:border-rv-gold/60 hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)]"
    >
      {/* صورة المنتج */}
      <Link
        to={`/product/${product.slug}`}
        className="relative grid aspect-[4/5] place-items-center overflow-hidden border-b border-stone-800 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent"
      >
        {/* توهج عند Hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(300px 260px at 50% 45%, ${product.accent}26, transparent 70%)`,
          }}
        />
        <div className="flex h-full w-full items-center justify-center p-5 transition-transform duration-500 group-hover:scale-[1.05]">
          <BagVisual
            image={product.image}
            variant={blendVariantFor(product.slug)}
            label={product.nameEn.slice(0, 10).toUpperCase()}
            alt={product.name}
            className="h-full max-h-72 w-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
          />
        </div>

        {/* الشارات */}
        <div className="absolute start-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {discount !== null && (
            <span className="bg-rv-red px-2 py-1 font-mono text-[10px] font-semibold text-white shadow-lg">
              خصم {discount}٪
            </span>
          )}
          {product.badge && !discount && (
            <span className="bg-rv-gold px-2 py-1 font-mono text-[10px] font-semibold text-black shadow-lg">
              {product.badge}
            </span>
          )}
          {product.isNew && !discount && !product.badge && (
            <span className="bg-rv-blue px-2 py-1 font-mono text-[10px] font-semibold text-white shadow-lg">
              جديد
            </span>
          )}
        </div>

        {/* زر المفضلة */}
        <button
          className="absolute end-2.5 top-2.5 grid size-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white/60 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:text-rv-red"
          aria-label="أضف للمفضلة"
        >
          <Heart className="size-3.5" />
        </button>

        {/* أزرار عند Hover */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col gap-2 bg-coffee-900/95 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={() => add(product.slug, 1, activeVariant?.id)}
            className="btn-gold flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-black"
          >
            <Plus className="size-4" />
            أضف إلى السلة
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-stone-700 text-xs font-semibold text-stone-400 transition-colors hover:border-rv-gold hover:text-rv-gold"
          >
            <Eye className="size-3.5" />
            عرض التفاصيل
          </Link>
        </div>
      </Link>

      {/* المعلومات */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: product.accent }}>
            {cat.name}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground">
            {activeVariant?.label ?? product.weight}
          </span>
        </div>
        <Link
          to={`/product/${product.slug}`}
          className="mt-2 line-clamp-2 text-[14px] font-semibold leading-snug transition-colors hover:text-rv-red sm:text-[15px]"
        >
          {product.name}
        </Link>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars value={product.rating} />
          <span className="font-mono text-[10px] text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* خيارات المقاس/الطحن */}
        {product.variants && product.variants.length > 1 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "h-6 border px-1.5 font-mono text-[9px] transition-colors",
                  v.id === activeVariant?.id
                    ? "border-rv-gold bg-rv-gold/10 text-rv-gold"
                    : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200",
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* السعر */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(price)}</span>
          {oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(oldPrice)}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
