import { useState } from "react";
import { PRODUCTS, CATEGORIES, type CategoryId } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

/** كل الأصناف التانية: حبوب أصول + كبسولات + ماكينات + أدوات */ 
export function OtherVarieties() {
  const [filter, setFilter] = useState<Filter>("all");

  const bestsellerSlugs = new Set(
    PRODUCTS.filter((p) => p.bestseller).map((p) => p.slug),
  );
  const base = PRODUCTS.filter((p) => !bestsellerSlugs.has(p.slug));
  const others =
    filter === "all" ? base.slice(0, 8) : base.filter((p) => p.category === filter);

  return (
    <section id="varieties" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-2xl font-black sm:text-3xl">
            تصفح منتجات روفينتو <span className="text-rv-red">حسب التصنيف</span>
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            اختار القسم لفرز القهوة والأدوات بسرعة دون عناء
          </p>
        </div>

        {/* فلاتر سريعة — أقراص دائرية */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-bold shadow transition",
              filter === "all"
                ? "btn-gold"
                : "bg-stone-800 text-stone-200 hover:bg-stone-700",
            )}
          >
            الكل
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-bold shadow transition",
                filter === c.id
                  ? "btn-gold"
                  : "bg-stone-800 text-stone-200 hover:bg-stone-700",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {filter !== "all" && (
            <p className="col-span-full mb-2 font-mono text-[11px] tracking-widest text-stone-500">
              {CATEGORIES.find((c) => c.id === filter)?.name} — {others.length}{" "}
              منتج
            </p>
          )}
          {others.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        {others.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            مفيش منتجات في الفئة دي هنا — كل المنتجات متاحة في المتجر.
          </p>
        )}
      </div>
    </section>
  );
}
