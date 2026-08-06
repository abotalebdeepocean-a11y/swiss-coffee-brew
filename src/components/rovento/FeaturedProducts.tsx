import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./Section";

export function FeaturedProducts() {
  const featured = [
    ...PRODUCTS.filter((p) => p.bestseller),
    ...PRODUCTS.filter((p) => p.isNew),
  ];
  const seen = new Set<string>();
  const list = featured.filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)));
  const rest = PRODUCTS.filter((p) => !seen.has(p.slug));
  const items = [...list, ...rest].slice(0, 8);

  return (
    <section id="featured" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            kicker="Featured Products"
            title={
              <>
                الأكثر <span className="text-rv-red">طلبًا</span> هذا الأسبوع
              </>
            }
            className="mb-0 md:mb-0"
          />
          <Link
            to="/shop"
            className="group mb-2 inline-flex h-11 items-center gap-2 border border-white/20 px-5 text-sm font-semibold transition-colors hover:border-rv-red hover:text-rv-red"
          >
            عرض كل المنتجات
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
