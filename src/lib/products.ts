import { IMAGES } from "./images";

export type CategoryId =
  | "beans"
  | "turkish"
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
  /** false until price/details are approved; unavailable products cannot be purchased */
  available?: boolean;
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
  isNew?: boolean;
  /** صور المعرض — حتى 5 صور للمنتج */
  gallery?: string[];
}

const CATEGORIES_RAW: Omit<Category, "count">[] = [
  { id: "beans", name: "حبوب القهوة", nameEn: "Coffee Beans", blurb: "حبوب قهوة للاستخدام اليومي.", accent: "#c9a227" },
  { id: "turkish", name: "قهوة تركية مطحونة", nameEn: "Turkish Ground Coffee", blurb: "اختيارات ROVENTO للقهوة التركية المطحونة.", accent: "#6b4423" },
  { id: "espresso", name: "حبوب الإسبريسو", nameEn: "Espresso Beans", blurb: "بلندات مصممة خصيصًا لاستخلاص إسبريسو متكامل بالكريما.", accent: "#d03b1e" },
  { id: "capsules", name: "كبسولات", nameEn: "Capsules", blurb: "نفس الجودة في كبسولة جاهزة لكل لحظة.", accent: "#d03b1e" },
  { id: "machines", name: "ماكينات القهوة", nameEn: "Coffee Machines", blurb: "ماكينات إسبريسو واحترافية — من الموكا بوت إلى الأوتوماتيك بالكامل.", accent: "#c9a227" },
  { id: "accessories", name: "إكسسوارات وأدوات", nameEn: "Accessories", blurb: "مطاحن، موازين، أكواب وكل ما يحتاجه الباريستا المنزلي.", accent: "#002fa7" },
];

export const PRODUCTS: Product[] = [
  // ====== المنتجات الأساسية + مجموعة القهوة التركية ======
  {
    slug: "rovento-bar-intenso-1kg",
    name: "ROVENTO BAR INTENSO — 1 كجم",
    nameEn: "ROVENTO Bar Intenso 1kg",
    category: "beans",
    price: 750,
    weight: "1 كجم",
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
    gallery: [
      IMAGES.products.barIntenso,
    ],
  },
  {
    slug: "rovento-premium-1kg",
    name: "ROVENTO PREMIUM — 1 كجم",
    nameEn: "ROVENTO Premium 1kg",
    category: "beans",
    price: 850,
    weight: "1 كجم",
    badge: "متوازن",
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
    gallery: [
      IMAGES.products.premium,
    ],
  },
  {
    slug: "rovento-gold-21-turkish",
    name: "ROVENTO GOLD 21",
    nameEn: "GOLD 21",
    category: "turkish",
    price: 650,
    weight: "1 كجم — قهوة تركية مطحونة",
    available: true,
    badge: "سعر تجريبي",
    accent: "#b28a35",
    image: "/images/gold-21-placeholder",
    roast: "تحميص متوسط",
    notes: [],
    description: "قهوة تركية مطحونة من مجموعة ROVENTO — سعر تجريبي مخصص لمعاينة المتجر.",
  },
  {
    slug: "rovento-jawad-18-turkish",
    name: "ROVENTO جواد 18",
    nameEn: "JAWAD 18",
    category: "turkish",
    price: 550,
    weight: "1 كجم — قهوة تركية مطحونة",
    available: true,
    badge: "سعر تجريبي",
    accent: "#8a6a42",
    image: "/images/jawad-18-placeholder",
    notes: [],
    description: "قهوة تركية مطحونة من ROVENTO — سعر تجريبي مخصص لمعاينة المتجر.",
  },
  {
    slug: "rovento-jawad-24-turkish",
    name: "ROVENTO جواد 24",
    nameEn: "JAWAD 24",
    category: "turkish",
    price: 750,
    weight: "1 كجم — قهوة تركية مطحونة",
    available: true,
    badge: "سعر تجريبي",
    accent: "#5c3925",
    image: "/images/jawad-24-placeholder",
    notes: [],
    description: "قهوة تركية مطحونة من ROVENTO، ضمن مجموعة القهوة التركية المخصصة للتحضير اليومي.",
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
