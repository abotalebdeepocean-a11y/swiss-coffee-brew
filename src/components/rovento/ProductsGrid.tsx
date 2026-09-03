import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/store";
import { CoffeeBag, blendVariantFor } from "./CoffeeBag";

export function ProductsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { add } = useCart();

  return (
    <section id="featured" className="relative bg-rv-cream py-20 md:py-28">
      {/* Section heading */}
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-rv-gold">
            Our Collection
          </span>
          <h2 className="font-display text-3xl font-black text-rv-darkBrown md:text-5xl">
            منتجاتنا
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-rv-gold" />
        </motion.div>

        {/* Products grid — 2x2 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-rv-brown/15 bg-white p-6 shadow-md transition-all duration-500 hover:border-rv-gold/40 hover:shadow-[0_20px_60px_rgba(179,139,51,0.12)]"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-rv-gold px-3 py-1 text-xs font-bold text-white">
                  {product.badge}
                </div>
              )}

              {/* Bag visual */}
              <div className="relative mx-auto mb-6 flex h-[240px] items-center justify-center">
                <CoffeeBag variant={blendVariantFor(product.slug)} className="h-full w-auto" />
              </div>

              {/* Product info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-black text-rv-darkBrown">
                    {product.name}
                  </h3>
                  <p className="text-xs text-rv-brown/50">{product.nameEn}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`size-3.5 ${
                        j < Math.floor(product.rating)
                          ? "fill-rv-gold text-rv-gold"
                          : "text-rv-brown/20"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-stone-500">
                    ({product.reviews})
                  </span>
                </div>

                {/* Notes */}
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-rv-brown/15 bg-rv-cream px-2.5 py-0.5 text-[10px] font-bold text-rv-brown/60"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between border-t border-rv-brown/10 pt-4">
                  <div>
                    <span className="text-2xl font-black text-rv-darkBrown">
                      {product.price.toLocaleString("en-EG")}
                    </span>
                    <span className="text-xs text-rv-brown/50"> ج.م</span>
                    {product.oldPrice && (
                      <span className="mr-2 text-xs text-rv-brown/40 line-through">
                        {product.oldPrice.toLocaleString("en-EG")}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => add(product.slug)}
                    className="flex items-center gap-2 rounded-xl bg-rv-gold px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-rv-darkGold hover:shadow-[0_8px_24px_rgba(179,139,51,0.3)]"
                  >
                    <ShoppingCart className="size-4" />
                    أضف للسلة
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <a
            href="/shop"
            className="group inline-flex items-center gap-2 border-b-2 border-rv-gold/30 pb-1 text-sm font-bold text-rv-brown/50 transition-colors hover:border-rv-gold hover:text-rv-gold"
          >
            عرض جميع المنتجات
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
