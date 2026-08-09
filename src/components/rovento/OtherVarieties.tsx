import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./Section";

/** كل الأصناف التانية: حبوب أصول + مطحون + كبسولات + باقي الأكياس */
export function OtherVarieties() {
  const bestsellerSlugs = new Set(
    PRODUCTS.filter((p) => p.bestseller).map((p) => p.slug),
  );
  const others = PRODUCTS.filter(
    (p) => !bestsellerSlugs.has(p.slug),
  ).slice(0, 8);

  return (
    <section id="varieties" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="04"
            kicker="More Varieties"
            title={
              <>
                أصناف <span className="text-rv-red">أخرى</span> من روفينتو
              </>
            }
            desc="من أصول إثيوبيا إلى المطحون والكبسولات — كل الأصناف محمصة طازجة أسبوعيًا."
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

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {others.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
