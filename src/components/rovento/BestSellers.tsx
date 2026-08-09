import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./Section";

export function BestSellers() {
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 5);

  return (
    <section id="featured" className="border-b border-white/10 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            kicker="Best Sellers"
            title={
              <>
                الأكثر <span className="text-rv-red">طلبًا</span> — سطر واحد
              </>
            }
            desc="اخترنا لك الأفضل مبيعًا فقط. لا تشتت — ركّز على اللي يختاره الجميع."
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

        {/* ONE ROW — horizontal scroll, never wraps */}
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 md:gap-5 [scrollbar-width:thin]">
          {bestsellers.map((p, i) => (
            <div
              key={p.slug}
              className="w-[260px] shrink-0 snap-start sm:w-[280px]"
            >
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
