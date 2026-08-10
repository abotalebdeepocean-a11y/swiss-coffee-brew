import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { PRODUCTS, CATEGORIES, type CategoryId } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./Section";
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
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="06"
            kicker="More Varieties"
            title={
              <>
                أصناف <span className="text-rv-red">أخرى</span> من روفينتو
              </>
            }
            desc="من أصول إثيوبيا إلى الكبسولات والأدوات — كل الأصناف محمصة طازجة أسبوعيًا، والمقاسات (1 كجم / مطحون) متاحة داخل كل بلند."
            className="mb-0 md:mb-0"
          />
          <Link
            to="/shop"
            className="group mb-2 inline-flex h-11 items-center gap-2 border border-white/20 px-5 text-sm font-semibold transition-colors hover:border-rv-red hover:text-rv-red"
          >
            كل المنتجات
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* فلاتر سريعة */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "h-9 border px-4 text-sm font-semibold transition-colors",
              filter === "all"
                ? "border-rv-red bg-rv-red text-white"
                : "border-white/15 text-muted-foreground hover:border-white/40 hover:text-foreground",
            )}
          >
            الكل
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={cn(
                "h-9 border px-4 text-sm font-semibold transition-colors",
                filter === c.id
                  ? "border-rv-red bg-rv-red text-white"
                  : "border-white/15 text-muted-foreground hover:border-white/40 hover:text-foreground",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
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
