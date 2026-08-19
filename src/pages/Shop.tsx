import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { SlidersHorizontal, Tag, Grid3X3, LayoutList } from "lucide-react";
import { Header } from "@/components/rovento/Header";
import { Footer } from "@/components/rovento/Footer";
import { CartDrawer } from "@/components/rovento/CartDrawer";
import { WhatsAppFloat } from "@/components/rovento/WhatsAppFloat";
import { ProductCard } from "@/components/rovento/ProductCard";
import { IMAGES } from "@/lib/images";
import { useImageCandidates } from "@/components/rovento/BagVisual";
import {
  PRODUCTS,
  CATEGORIES,
  type CategoryId,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "المميزة" },
  { id: "price-asc", label: "السعر: من الأقل" },
  { id: "price-desc", label: "السعر: من الأعلى" },
  { id: "rating", label: "الأعلى تقييمًا" },
];

/** أيقونات الفئات */
const CATEGORY_ICONS: Record<string, string> = {
  all: "☕",
  beans: "🫘",
  espresso: "☕",
  capsules: "💊",
  machines: "⚙️",
  accessories: "🔧",
};

/** قائمة أسعار البن الرسمية */
function PriceListSection() {
  const { src, onError } = useImageCandidates(IMAGES.priceList);
  if (!src) return null;

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pt-8 md:px-6 md:pt-10">
      <div className="overflow-hidden rounded-2xl border border-stone-800 bg-coffee-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Tag className="size-4 text-rv-gold" />
            <h2 className="text-base font-black text-white">قائمة أسعار البن الرسمية</h2>
          </div>
          <p className="text-xs text-muted-foreground">أسعار الكيلو بجميع أنواع البن — محدثة باستمرار</p>
        </div>
        <div className="bg-white p-4 sm:p-6">
          <img
            src={src}
            onError={onError}
            alt="قائمة أسعار قهوة روفينتو بأنواع البن المختلفة"
            loading="lazy"
            className="mx-auto h-auto w-full max-w-3xl rounded-lg object-contain shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") ?? "all") as CategoryId | "all";
  const [sort, setSort] = useState<SortKey>("featured");

  useEffect(() => {
    document.title = "المتجر | روڤينتو ROVENTO — قهوة مختصة مصرية";
  }, []);

  const items = useMemo(() => {
    const base =
      category === "all"
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === category);
    switch (sort) {
      case "price-asc":
        return base.sort((a, b) => a.price - b.price);
      case "price-desc":
        return base.sort((a, b) => b.price - a.price);
      case "rating":
        return base.sort((a, b) => b.rating - a.rating);
      default:
        return [
          ...base.filter((p) => p.bestseller),
          ...base.filter((p) => !p.bestseller),
        ];
    }
  }, [category, sort]);

  const activeCat = CATEGORIES.find((c) => c.id === category);

  function setCategory(id: string) {
    if (id === "all") {
      setParams({});
    } else {
      setParams({ category: id });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* page header */}
        <section className="border-b border-white/10 bg-[#111111]">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-6 md:py-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-rv-red" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-rv-red">Shop · المتجر</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {activeCat ? activeCat.name : "كل المنتجات"}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              {activeCat
                ? activeCat.blurb
                : "حبوب مختارة، تحميص طازج، ومعدات احترافية — كل ما يحتاجه محب القهوة المنزلية في مكان واحد."}
            </p>
          </div>
        </section>

        {/* قائمة الأسعار */}
        <PriceListSection />

        <section className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
          {/* فلاتر الفئات — أقراص بسيطة */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="تصفية حسب الفئة">
              <button
                onClick={() => setCategory("all")}
                className={cn(
                  "inline-flex items-center gap-1.5 h-10 border px-4 text-sm font-semibold transition-all rounded-full",
                  category === "all"
                    ? "border-rv-gold bg-rv-gold/10 text-rv-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    : "border-white/15 text-muted-foreground hover:border-white/40 hover:text-foreground",
                )}
              >
                <span>☕</span>
                الكل ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 h-10 border px-4 text-sm font-semibold transition-all rounded-full",
                    category === c.id
                      ? "border-rv-gold bg-rv-gold/10 text-rv-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                      : "border-white/15 text-muted-foreground hover:border-white/40 hover:text-foreground",
                  )}
                >
                  <span>{CATEGORY_ICONS[c.id] ?? "📦"}</span>
                  {c.name}
                  <span className="font-mono text-[10px] text-muted-foreground">({c.count})</span>
                </button>
              ))}
            </div>

            {/* الترتيب */}
            <label className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 border border-white/15 bg-background px-3 text-sm outline-none transition-colors focus:border-rv-gold rounded-lg"
                aria-label="ترتيب المنتجات"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {/* عدد المنتجات */}
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            {items.length} منتج متاح
          </p>

          {/* الشبكة */}
          {items.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4">
              {items.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-4 border border-dashed border-white/15 py-20 text-center">
              <p className="text-lg font-semibold">لا توجد منتجات في هذه الفئة</p>
              <Link to="/shop" className="text-sm font-semibold text-rv-red underline-offset-4 hover:underline">
                عرض كل المنتجات
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </div>
  );
}
