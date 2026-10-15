import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function TurkishCollection() {
  const products = PRODUCTS.filter((product) => product.category === "turkish");

  if (products.length === 0) return null;

  return (
    <section id="turkish-coffee" className="bg-[#0a0a0a] px-4 py-16 text-white md:px-6 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 text-center md:mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9a84c]">
            ROVENTO · TURKISH COFFEE
          </p>
          <h2 className="mt-3 text-2xl font-black md:text-3xl">القهوة التركية</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-400">
            اختيارات القهوة التركية المطحونة من ROVENTO. الصور المعروضة مؤقتة، والأسعار قيد الاعتماد؛ لذلك لا يمكن طلب هذه المنتجات حتى اعتماد تفاصيلها.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
