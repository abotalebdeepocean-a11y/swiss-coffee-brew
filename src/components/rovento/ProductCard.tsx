import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Eye, Plus } from "lucide-react";
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
      className="group relative flex flex-col border border-white/10 bg-card transition-colors hover:border-white/25"
    >
      {/* art tile */}
      <Link
        to={`/product/${product.slug}`}
        className="relative grid aspect-[4/5] place-items-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent"
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(300px 260px at 50% 45%, ${product.accent}26, transparent 70%)`,
          }}
        />
        <div className="flex h-full w-full items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.05]">
          <BagVisual
            image={product.image}
            variant={blendVariantFor(product.slug)}
            label={product.nameEn.slice(0, 10).toUpperCase()}
            alt={product.name}
            className="h-full max-h-72 w-auto"
          />
        </div>

        {/* badges */}
        <div className="absolute start-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {discount !== null && (
            <span className="bg-rv-red px-2 py-1 font-mono text-[10px] font-semibold text-white">
              خصم {discount}٪
            </span>
          )}
          {product.badge && !discount && (
            <span className="bg-rv-gold px-2 py-1 font-mono text-[10px] font-semibold text-black">
              {product.badge}
            </span>
          )}
          {product.isNew && !discount && !product.badge && (
            <span className="bg-rv-blue px-2 py-1 font-mono text-[10px] font-semibold text-white">
              جديد
            </span>
          )}
        </div>

        {/* hover actions */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col gap-2 bg-background/95 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={() => add(product.slug, 1, activeVariant?.id)}
            className="flex h-10 w-full items-center justify-center gap-2 bg-rv-red text-sm font-bold text-white transition-colors hover:bg-[#b53219]"
          >
            <Plus className="size-4" />
            أضف إلى السلة
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="flex h-9 w-full items-center justify-center gap-2 border border-white/20 text-xs font-semibold text-muted-foreground transition-colors hover:border-rv-blue hover:text-foreground"
          >
            <Eye className="size-3.5" />
            عرض سريع
          </Link>
        </div>
      </Link>

      {/* info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color: product.accent }}
          >
            {cat.name}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground">
            {activeVariant?.label ?? product.weight}
          </span>
        </div>
        <Link
          to={`/product/${product.slug}`}
          className="mt-2 line-clamp-2 text-[15px] font-semibold leading-snug transition-colors hover:text-rv-red"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <Stars value={product.rating} />
          <span className="font-mono text-[10px] text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* مقاس/طحن — لو البلند فيه أكتر من خيار */}
        {product.variants && product.variants.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "h-7 border px-2 font-mono text-[10px] transition-colors",
                  v.id === activeVariant?.id
                    ? "border-rv-red bg-rv-red/10 text-rv-red"
                    : "border-white/15 text-muted-foreground hover:border-white/40 hover:text-foreground",
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold">{formatPrice(price)}</span>
          {oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
