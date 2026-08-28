import { useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Flame, Star, Trophy } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const BADGES = [
  { icon: Flame, label: "الأكثر مبيعًا", cls: "bg-red-600 text-white" },
  { icon: Star, label: "تقييم 4.9+", cls: "bg-rv-gold text-black" },
  { icon: Trophy, label: "اختيار الباريستا", cls: "bg-stone-800 text-rv-gold border border-rv-gold/40" },
];

export function BestSellers() {
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 5);
  const rowRef = useRef<HTMLDivElement>(null);

  function scrollRow(dir: 1 | -1) {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  return (
    <section
      id="bestsellers"
      className="border-b border-stone-800 bg-coffee-900/60 py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-rv-gold">
            اختيارات عشاق القهوة
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            الأكثر طلبًا ومبيعًا <span className="text-rv-red">في مصر</span>
          </h2>
          <p className="mt-3 text-lg text-stone-300">
            منتجاتنا الحاصلة على أعلى تقييمات من عملائنا في القاهرة والجيزة
            والإسكندرية وجميع المحافظات.
          </p>
        </div>

        {/* شارات التحويل */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {BADGES.map((b) => (
            <span
              key={b.label}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black shadow ${b.cls}`}
            >
              <b.icon className="size-4" />
              {b.label}
            </span>
          ))}
        </div>

        {/* سطر واحد فقط — سكرول أفقي + أسهم مثل المرجع */}
        <div className="relative">
          <div
            ref={rowRef}
            className="flex snap-x gap-4 overflow-x-auto pb-4 md:gap-5 [scrollbar-width:thin]"
          >
            {bestsellers.map((p, i) => (
              <div
                key={p.slug}
                className="w-[260px] shrink-0 snap-start sm:w-[280px]"
              >
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>

          {/* أسهم التنقل */}
          <button
            onClick={() => scrollRow(-1)}
            aria-label="السابق"
            className="absolute start-0 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-rv-gold/40 bg-coffee-950/90 text-rv-gold shadow-lg backdrop-blur transition hover:bg-rv-gold hover:text-black"
          >
            <ChevronRight className="size-5" />
          </button>
          <button
            onClick={() => scrollRow(1)}
            aria-label="التالي"
            className="absolute end-0 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-rv-gold/40 bg-coffee-950/90 text-rv-gold shadow-lg backdrop-blur transition hover:bg-rv-gold hover:text-black"
          >
            <ChevronLeft className="size-5" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="btn-gold inline-flex h-12 items-center gap-2 rounded-[10px] px-8 text-sm font-bold transition-all"
          >
            عرض كل المنتجات
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
