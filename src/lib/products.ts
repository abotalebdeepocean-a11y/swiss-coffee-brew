import { IMAGES } from "./images";

export type CategoryId =
  | "beans"
  | "ground"
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

export interface Product {
  slug: string;
  name: string;
  nameEn: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  weight?: string;
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
}

export const CATEGORIES: Category[] = [
  { id: "beans", name: "حبوب القهوة", nameEn: "Coffee Beans", blurb: "حبوب مختارة من أجود المزارع، محمصة طازجة أسبوعيًا.", accent: "#c9a227", count: 4 },
  { id: "espresso", name: "حبوب الإسبريسو", nameEn: "Espresso Beans", blurb: "بلندات مصممة خصيصًا لاستخلاص إسبريسو متكامل بالكريما.", accent: "#d03b1e", count: 2 },
  { id: "ground", name: "القهوة المطحونة", nameEn: "Ground Coffee", blurb: "طحن مضبوط حسب طريقة التحضير — V60، إسبريسو، فرنش بريس.", accent: "#002fa7", count: 2 },
  { id: "capsules", name: "كبسولات", nameEn: "Capsules", blurb: "نفس الجودة في كبسولة جاهزة لكل لحظة.", accent: "#d03b1e", count: 1 },
  { id: "machines", name: "ماكينات القهوة", nameEn: "Coffee Machines", blurb: "ماكينات إسبريسو منزلية بمواصفات احترافية.", accent: "#c9a227", count: 1 },
  { id: "accessories", name: "إكسسوارات وأدوات", nameEn: "Accessories", blurb: "مطاحن، موازين، أكواب وكل ما يحتاجه الباريستا المنزلي.", accent: "#002fa7", count: 6 },
];

export const PRODUCTS: Product[] = [
  {
    slug: "rovento-premium",
    name: "ROVENTO بريميم بليند — حبوب إسبريسو",
    nameEn: "ROVENTO Premium Blend", 
    category: "beans",
    price: 340,
    oldPrice: 420,
    weight: "250 جم",
    rating: 4.9,
    reviews: 214,
    badge: "الأكثر مبيعًا",
    accent: "#c9a227",
    image: IMAGES.bags.premium,
    roast: "تحميص متوسط",
    arabica: 70,
    robusta: 30,
    intensity: 4,
    notes: ["شوكولاتة", "كراميل", "فواكه مجففة"],
    description:
      "البلند الأمثل لبداية يومك. حبوب عربية مختارة بعناية مدمجة مع روبوستا عالية الجودة لتعطيك كوبًا متوازنًا، حلو المذاق، غني بالكريما. مثالي للإسبريسو واللاتيه.",
    brewing: ["إسبريسو", "لاتيه", "كابتشينو"],
    bestseller: true,
  },
  {
    slug: "rovento-intenso",
    name: "ROVENTO إنتنسو بليند — حبوب إسبريسو",
    nameEn: "ROVENTO Intenso Blend", 
    category: "espresso",
    price: 310,
    weight: "250 جم",
    rating: 4.8,
    reviews: 168,
    badge: "إسبريسو قوي",
    accent: "#d03b1e",
    image: IMAGES.bags.intenso,
    roast: "تحميص غامق",
    arabica: 60,
    robusta: 40,
    intensity: 5,
    notes: ["كاكاو داكن", "بندق", "بهارات دافئة"],
    description:
      "لأصحاب الإسبريسو الجريء. كمية روبوستا أعلى تعني كريما كثيفة ونكهة قوية لا تخذلك تحت الضغط. خيار الباريستا المحترف لعمل الكورتوادو والماكياتو.",
    brewing: ["إسبريسو", "كورتوادو", "ماكياتو"],
    bestseller: true,
  },
  {
    slug: "rovento-classic",
    name: "ROVENTO كلاسيك بليند — قهوة التقطير",
    nameEn: "ROVENTO Classic Blend", 
    category: "beans",
    price: 285,
    weight: "250 جم",
    rating: 4.7,
    reviews: 142,
    accent: "#002fa7",
    image: IMAGES.bags.classic,
    roast: "تحميص فاتح",
    arabica: 75,
    robusta: 25,
    intensity: 3,
    notes: ["كراميل", "أزهار", "حمضيات"],
    description:
      "نكهات راقية تظهر جمال القهوة العربية. تحميص فاتح يبرز الحموضة الزهرية واللمسة الحمضية المنعشة. مثالي لتحضير V60 والكميكس والشاي بالقهوة.",
    brewing: ["V60", "كميكس", "دريپ"],
    isNew: true,
  },
  {
    slug: "rovento-premium-1kg",
    name: "ROVENTO بريميم بليند — 1 كجم",
    nameEn: "ROVENTO Premium Blend 1kg", 
    category: "beans",
    price: 1150,
    oldPrice: 1350,
    weight: "1 كجم",
    rating: 4.9,
    reviews: 96,
    badge: "أفضل قيمة",
    accent: "#c9a227",
    // حتى تُرفع صورة 1 كجم المخصصة، نعرض صورة كيس البريميم نفسها
    image: IMAGES.bags.premium,
    roast: "تحميص متوسط",
    arabica: 70,
    robusta: 30,
    intensity: 4,
    notes: ["شوكولاتة", "كراميل", "فواكه مجففة"],
    description:
      "نفس بريميم بليند بكمية اقتصادية لعشاق القهوة اليومية. الكيس محكم الإغلاق ليحافظ على النكهة والطراوة لأسبوعين كاملين.",
    brewing: ["إسبريسو", "لاتيه", "مقطرة"],
  },
  {
    slug: "rovento-ground-premium",
    name: "بن بريميم مطحون — طحن إسبريسو",
    nameEn: "ROVENTO Ground — Premium", 
    category: "ground",
    price: 340,
    weight: "250 جم",
    rating: 4.8,
    reviews: 87,
    accent: "#c9a227",
    // حتى تُرفع صورة البن المطحون المخصصة، نعرض صورة كيس البريميم نفسها
    image: IMAGES.bags.premium,
    roast: "تحميص متوسط",
    arabica: 70,
    robusta: 30,
    intensity: 4,
    notes: ["شوكولاتة", "كراميل", "فواكه مجففة"],
    description:
      "مطحون طحنًا ناعمًا مضبوطًا لماكينات الإسبريسو المنزلية. نفس حبوب البريميم مع راحة عدم الحاجة لمطحنة.",
    brewing: ["إسبريسو", "موكا بوت"],
  },
  {
    slug: "rovento-ground-classic-500",
    name: "بن كلاسيك مطحون — 500 جم",
    nameEn: "ROVENTO Ground — Classic 500g", 
    category: "ground",
    price: 520,
    weight: "500 جم",
    rating: 4.7,
    reviews: 61,
    accent: "#002fa7",
    image: IMAGES.bags.groundClassic,
    roast: "تحميص فاتح",
    arabica: 75,
    robusta: 25,
    intensity: 3,
    notes: ["كراميل", "أزهار", "حمضيات"],
    description:
      "طحن خشن مناسب للفرنش بريس والتنقيط البارد. الكمية الكبيرة مثالية للبيوت والمكاتب.",
    brewing: ["فرنش بريس", "كولد برو"],
  },
  {
    slug: "rovento-espresso-intenso-1kg",
    name: "حبوب إسبريسو إنتنسو — 1 كجم",
    nameEn: "ROVENTO Espresso Intenso 1kg", 
    category: "espresso",
    price: 1180,
    weight: "1 كجم",
    rating: 4.9,
    reviews: 73,
    badge: "للعمل",
    accent: "#d03b1e",
    image: IMAGES.bags.intenso1kg,
    roast: "تحميص غامق",
    arabica: 60,
    robusta: 40,
    intensity: 5,
    notes: ["كاكاو داكن", "بندق", "بهارات دافئة"],
    description:
      "الخيار الأول للكافيهات والمكاتب. ثبات في الجودة والاستخلاص مع كل دفعة، وسعر اقتصادي للحجم الكبير.",
    brewing: ["إسبريسو", "أمريكانو"],
  },
  {
    slug: "rovento-capsules",
    name: "كبسولات ROVENTO — علبة 10",
    nameEn: "ROVENTO Capsules x10", 
    category: "capsules",
    price: 260,
    oldPrice: 300,
    weight: "10 كبسولة",
    rating: 4.6,
    reviews: 54,
    badge: "خصم ١٣٪",
    accent: "#d03b1e",
    roast: "تحميص متوسط",
    arabica: 70,
    robusta: 30,
    intensity: 4,
    notes: ["شوكولاتة", "بندق", "كراميل"],
    description:
      "نكهة ROVENTO كاملة في كبسولة متوافقة مع أشهر ماكينات الكبسولات. جاهزة في ثوانٍ بنفس جودة الكوب المختص.", 
    brewing: ["ماكينات كبسولات"],
    isNew: true,
  },
  {
    slug: "machine-espresso",
    name: "ماكينة إسبريسو منزلية ١٥ بار",
    nameEn: "Espresso Machine 15 bar",
    category: "machines",
    price: 18900,
    oldPrice: 21500,
    weight: "ضمان سنتين",
    rating: 4.8,
    reviews: 39,
    badge: "عرض خاص",
    accent: "#c9a227",
    notes: ["١٥ بار", "مبخرة حليب", "تصميم فولاذي"],
    description:
      "ماكينة إسبريسو بمواصفات شبه احترافية: مضخة ١٥ بار، مبخرة حليب قوية لللاتيه آرت، وتسخين سريع. صديقة للمبتدئين ووفية للمحترفين.",
    brewing: ["إسبريسو", "كابتشينو", "لاتيه"],
  },
  {
    slug: "grinder-hand",
    name: "مطحنة يدوية سيراميك",
    nameEn: "Hand Grinder",
    category: "accessories",
    price: 1450,
    weight: "معدنية",
    rating: 4.7,
    reviews: 88,
    accent: "#002fa7",
    notes: ["نواة سيراميك", "درجات طحن مضبوطة", "هيكل ألمنيوم"],
    description:
      "مطحنة يدوية بخاصية درجات طحن مضبوطة من الإسبريسو الناعم إلى الفرنش بريس الخشن. اختيار محبي التقطير والقهوة المختصة.",
    brewing: ["كل الطرق"],
  },
  {
    slug: "grinder-electric",
    name: "مطحنة كهربائية باريستا",
    nameEn: "Electric Grinder",
    category: "accessories",
    price: 3200,
    oldPrice: 3700,
    weight: "ضمان سنة",
    rating: 4.6,
    reviews: 47,
    badge: "خصم ١٤٪",
    accent: "#c9a227",
    notes: ["نواة معدنية", "٤٠ درجة طحن", "حاوية ٥٠ جم"],
    description:
      "مطحنة كهربائية سريعة بنواة معدنية مسطحة للحفاظ على حرارة الحبوب، و٤٠ درجة طحن تغطي كل طرق التحضير.",
    brewing: ["كل الطرق"],
    bestseller: true,
  },
  {
    slug: "v60-kit",
    name: "طقم V60 كامل",
    nameEn: "V60 Kit",
    category: "accessories",
    price: 650,
    weight: "فلاتر + إبريق",
    rating: 4.8,
    reviews: 112,
    accent: "#002fa7",
    notes: ["سيراميك", "١٠٠ فلتر", "إبريق زجاجي"],
    description:
      "كل ما تحتاجه لبدء رحلة التقطير: قمع V60 سيراميكي، إبريق زجاجي مدرّج، ومئة فلتر ورقي. أسهل طريقة للقهوة المختصة في البيت.",
    brewing: ["V60", "دريپ"],
    bestseller: true,
  },
  {
    slug: "french-press",
    name: "فرنش بريس ٦٠٠ مل",
    nameEn: "French Press 600ml",
    category: "accessories",
    price: 450,
    weight: "زجاج مقاوم",
    rating: 4.6,
    reviews: 65,
    accent: "#d03b1e",
    notes: ["هيكل معدني", "فلتر شبكي", "سعة ٦٠٠ مل"],
    description:
      "فرنش بريس أنيق بإطار معدني مقاوم للصدأ. تحضير غني وكامل الجسم في أربع دقائق فقط.",
    brewing: ["فرنش بريس"],
  },
  {
    slug: "gooseneck-kettle",
    name: "غلاية غوزنيك كهربائية",
    nameEn: "Gooseneck Kettle",
    category: "accessories",
    price: 1350,
    weight: "١ لتر",
    rating: 4.7,
    reviews: 58,
    accent: "#c9a227",
    notes: ["تحكم بالحرارة", "عنق إوزة", "سعة ١ لتر"],
    description:
      "غلاية بعنق الإوزة وتحكم دقيق بدرجة الحرارة — أداة لا غنى عنها لعشاق V60 والتنقيط اليدوي.",
    brewing: ["V60", "كميكس", "شاي"],
  },
  {
    slug: "barista-scale",
    name: "ميزان باريستا رقمي",
    nameEn: "Barista Scale",
    category: "accessories",
    price: 850,
    weight: "دقة ٠.١ جم",
    rating: 4.8,
    reviews: 92,
    accent: "#002fa7",
    notes: ["دقة ٠.١ جم", "مؤقت مدمج", "شحن USB"],
    description:
      "ميزان حساس بمؤقت مدمج لضبط نسبة القهوة إلى الماء باحترافية — السر وراء كوب متسق كل مرة.",
    brewing: ["كل الطرق"],
  },
  {
    slug: "cups-set",
    name: "طقم أكواب إسبريسو — قطعتان",
    nameEn: "Espresso Cup Set",
    category: "accessories",
    price: 380,
    weight: "سيراميك",
    rating: 4.5,
    reviews: 44,
    accent: "#d03b1e",
    notes: ["سيراميك سميك", "سعة ٩٠ مل", "صحون مرفقة"],
    description:
      "أكواب إسبريسو سيراميكية بجدران سميكة تحافظ على حرارة الكوب وكريمته. تصميم سويسري نظيف يكمل طاولة قهوتك.",
    brewing: ["إسبريسو"],
  },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

export const SIGNATURE_BLENDS = ["rovento-premium", "rovento-intenso", "rovento-classic"];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
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
