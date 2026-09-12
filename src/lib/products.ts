import { IMAGES } from "./images";

export type CategoryId =
  | "beans"
  | "espresso"
  | "capsules"
  | "machines"
  | "accessories";

export interface Category {
  id: CategoryId;
  name: string;
  nameEn: string;
  blurb: string;
  accent: string;
  count: number;
}

export interface ProductVariant {
  /** معرّف الخيار (مقاس/طحن) — يُحفظ في السلة */
  id: string;
  /** الاسم الظاهر للعميل: "250 جم" / "1 كجم" / "مطحون إسبريسو" */
  label: string;
  price: number;
  oldPrice?: number;
  weight: string;
}

export interface Product {
  slug: string;
  name: string;
  nameEn: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  weight?: string;
  /**
   * خيارات المقاس/الطحن لنفس البلند (بدل منتجات مكررة بنفس الصورة).
   * أول خيار هو الافتراضي — وسعره يساوي price/oldPrice الأساسيين.
   */
  variants?: ProductVariant[];
  rating: number;
  reviews: number;
  badge?: string;
  /** accent color for the blend seal / UI chip */
  accent: string;
  /** real bag photo (base path in /public/images) — falls back to SVG art */
  image?: string;
  roast?: string;
  arabica?: number;
  robusta?: number;
  intensity?: number;
  notes: string[];
  description: string;
  brewing?: string[];
  bestseller?: boolean;
  isNew?: boolean;
  /** صور المعرض — حتى 5 صور للمنتج */
  gallery?: string[];
  /** تعليقات العملاء */
  testimonials?: { name: string; text: string; rating: number; date: string }[];
}

const CATEGORIES_RAW: Omit<Category, "count">[] = [
  { id: "beans", name: "حبوب القهوة", nameEn: "Coffee Beans", blurb: "حبوب مختارة من أجود المزارع، محمصة طازجة أسبوعيًا.", accent: "#c9a227" },
  { id: "espresso", name: "حبوب الإسبريسو", nameEn: "Espresso Beans", blurb: "بلندات مصممة خصيصًا لاستخلاص إسبريسو متكامل بالكريما.", accent: "#d03b1e" },
  { id: "capsules", name: "كبسولات", nameEn: "Capsules", blurb: "نفس الجودة في كبسولة جاهزة لكل لحظة.", accent: "#d03b1e" },
  { id: "machines", name: "ماكينات القهوة", nameEn: "Coffee Machines", blurb: "ماكينات إسبريسو واحترافية — من الموكا بوت إلى الأوتوماتيك بالكامل.", accent: "#c9a227" },
  { id: "accessories", name: "إكسسوارات وأدوات", nameEn: "Accessories", blurb: "مطاحن، موازين، أكواب وكل ما يحتاجه الباريستا المنزلي.", accent: "#002fa7" },
];

export const PRODUCTS: Product[] = [
  // ====== حبوب الإسبريسو — المنتجان فقط ======
  {
    slug: "rovento-bar-intenso-1kg",
    name: "ROVENTO بار انتينسو — 1 كجم",
    nameEn: "ROVENTO Bar Intenso 1kg",
    category: "beans",
    price: 750,
    oldPrice: 790,
    weight: "1 كجم",
    rating: 4.9,
    reviews: 187,
    badge: "قوي وجريء",
    accent: "#1a1a2e",
    image: IMAGES.bags.intenso,
    roast: "تحميص وسط",
    arabica: 30,
    robusta: 70,
    intensity: 5,
    notes: ["كريمة غنية", "عمق في النكهة", "تأثير إيطالي"],
    description:
      "البار انتينسو: ٧٠٪ روبوسيتا ٣٠٪ ارابيكا ، خليط من حبوب قهوة كولومبي و هندي و جواتيمالي. اتعمل من فكرة واحدة: إسبريسو يفرض احترامه من أول رشفة — الكريمة دي مش بتتلاشى، بيدّي جسم كثيف وكافيين أعلى. البلند اللي بيخلي الكورتادو والماكياتو تجربة يومية مختلفة بجد.",
    brewing: ["إسبريسو", "كورتوادو", "ماكياتو"],
    bestseller: true,
    gallery: [
      IMAGES.products.barIntenso,
    ],
    testimonials: [
      { name: "خالد ر.", text: "البار انتينسو قوي وجريء بجد. بستخدمه للكورتوادو والطعم لا يُقاوم. أقوى إسبريسو جربته في مصر!", rating: 5, date: "2026-08-12" },
      { name: "منى أ.", text: "أحسن إسبريسو جربته بالموكا بوت. الكريما بتبان فورًا. مفيش مقارنة مع أي منتج تاني.", rating: 5, date: "2026-08-01" },
      { name: "عمر ش.", text: "بحبه قوي بس قوي شوية عليّا. بخلطه مع الكلاسيك والنتيجة ممتازة.", rating: 4, date: "2026-07-25" },
    ],
  },
  {
    slug: "rovento-premium-1kg",
    name: "ROVENTO بريميوم — 1 كجم",
    nameEn: "ROVENTO Premium 1kg",
    category: "beans",
    price: 850,
    oldPrice: 950,
    weight: "1 كجم",
    rating: 4.9,
    reviews: 214,
    badge: "الأكثر مبيعًا",
    accent: "#c9a227",
    image: IMAGES.bags.premium,
    roast: "تحميص متوسط",
    arabica: 50,
    robusta: 50,
    intensity: 4,
    notes: ["رائحة غنية متوازنة", "جسم ناعم", "حلاوة معتدلة", "لمسة نهائية طويلة"],
    description:
      "البريميوم: ٥٠٪ أرابيكا ٥٠٪ روبوسيتا ، خليط متوازن من حبوب قهوة كولومبي و جواتيمالي و هندي. بتحميص متوسط بيدّيك نعومة وحلاوة معتدلة ولمسة نهائية طويلة — مش محتاج تفهم في القهوة، أول رشفة هتعرفها لوحدها. إسبريسو يفتح يومك، أو لاتيه وكابتشينو بجودة الكافيهات — من غير ما تحس إنك محتاج سكر.",
    brewing: ["إسبريسو", "لاتيه", "كابتشينو", "فلتر"],
    bestseller: true,
    gallery: [
      IMAGES.products.premium,
    ],
    testimonials: [
      { name: "سارة ك.", text: "الطعم متوازن وحلو من غير سكر. بستخدمها في اللاتيه كل صبح. أنصح بيها جدًا.", rating: 5, date: "2026-08-05" },
      { name: "نور ه.", text: "هديتها لأبويا وقال أحلى قهوة جربها. التغليف فخم والتوصيل سريع. 10/10", rating: 5, date: "2026-07-20" },
    ],
  },
];

/** الفئات مع العدد الفعلي للمنتجات — محسوبة ديناميكيًا */
export const CATEGORIES: Category[] = CATEGORIES_RAW.map((c) => ({
  ...c,
  count: PRODUCTS.filter((p) => p.category === c.id).length,
}));

/** الفئات التي بها منتجات فعلًا — تُستخدم في الفلاتر والتنقل */
export const ACTIVE_CATEGORIES: Category[] = CATEGORIES.filter((c) => c.count > 0);

export const CATEGORY_MAP: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

export const SIGNATURE_BLENDS = ["rovento-bar-intenso-1kg", "rovento-premium-1kg"];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** يرجع الخيار المختار من variants — أو الأول افتراضيًا، أو undefined لو مفيش خيارات */
export function variantOf(
  product: Product,
  variantId?: string,
): ProductVariant | undefined {
  if (!product.variants || product.variants.length === 0) return undefined;
  return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
}

export function productsByCategory(id: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === id);
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString("en-US")} ج.م`;
}

export function discountPercent(p: Product): number | null {
  if (!p.oldPrice) return null;
  return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
}
