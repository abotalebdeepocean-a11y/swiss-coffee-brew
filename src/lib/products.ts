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
  // ====== حبوب الإسبريسو — القائمة الرئيسية ======
  {
    slug: "rovento-bar-intenso",
    name: "ROVENTO بار انتينسو — حبوب إسبريسو قوية",
    nameEn: "ROVENTO Bar Intenso",
    category: "espresso",
    price: 650,
    weight: "1 كجم",
    rating: 4.9,
    reviews: 187,
    badge: "قوي وجريء",
    accent: "#1a1a2e",
    image: IMAGES.bags.intenso,
    roast: "تحميص غامق",
    arabica: 30,
    robusta: 70,
    intensity: 5,
    notes: ["كريمة غنية", "عمق في النكهة", "تأثير إيطالي"],
    description:
      "قوي وكتير بتأثير ايطالي — عمق في النكهة وكريمة غنية. كريمة غنية (Rich Crema)، تحميص غامق (Dark Roast)، قوة عالية (Full Body). مثالي لعشاق الإسبريسو القوي والكورتوادو.",
    brewing: ["إسبريسو", "كورتوادو", "ماكياتو"],
    bestseller: true,
    gallery: [
      IMAGES.products.barIntenso,
      IMAGES.bags.intenso,
      IMAGES.bags.macro,
      IMAGES.bags.twoPackages,
    ],
    testimonials: [
      { name: "خالد ر.", text: "البار انتينسو قوي وجريء بجد. بستخدمه للكورتوادو والطعم لا يُقاوم. أقوى إسبريسو جربته في مصر!", rating: 5, date: "2026-08-12" },
      { name: "منى أ.", text: "أحسن إسبريسو جربته بالموكا بوت. الكريما بتبان فورًا. مفيش مقارنة مع أي منتج تاني.", rating: 5, date: "2026-08-01" },
      { name: "عمر ش.", text: "بحبه قوي بس قوي شوية عليّا. بخلطه مع الكلاسيك والنتيجة ممتازة. لل Stromger coffe lovers بس!", rating: 4, date: "2026-07-25" },
    ],
  },
  {
    slug: "rovento-classic",
    name: "ROVENTO كلاسيك — التوليفة الذهبية لروفينتو",
    nameEn: "ROVENTO Classic Blend",
    category: "beans",
    price: 750,
    weight: "1 كجم",
    rating: 4.8,
    reviews: 203,
    badge: "التوليفة الذهبية",
    accent: "#1a5276",
    image: IMAGES.bags.classic,
    roast: "تحميص متوسط-غامق",
    arabica: 70,
    robusta: 30,
    intensity: 4,
    notes: ["توازن مثالي", "كريمة متوازنة", "قوة معتدلة"],
    description:
      "التوليفة الذهبية لروفينتو — توازن مثالي بين القوة والنكهة. كريمة متوازنة (Balanced Crema)، تحميص متوسط-غامق (Medium-Dark Roast)، قوة متوازنة (Balanced Body). طعم مكتمل يناسب الجميع.",
    brewing: ["إسبريسو", "كابتشينو", "لاتيه", "V60"],
    bestseller: true,
    gallery: [
      IMAGES.products.classic,
      IMAGES.bags.classic,
      IMAGES.bags.twoPackages,
      IMAGES.bags.macro,
    ],
    testimonials: [
      { name: "هدى م.", text: "الكلاسيك يومي ممتاز. طعم متوازن ومش غالي. بطلبة كل شهر. التوليفة الذهبية فعلاً!", rating: 5, date: "2026-08-08" },
      { name: "طارق ج.", text: "بحبه في الفلتر و الإسبريسو. نكهة الكراميل واضحة ومنعشة. أنصح المبتدئين يبدأوا بيه.", rating: 5, date: "2026-07-30" },
      { name: "فاطمة ز.", text: "أفضل قهوة في السعر ده. التغليف ممتاز والتوصيل سريع. طعم مكتمل بالأساس للجميع.", rating: 5, date: "2026-07-18" },
    ],
  },
  {
    slug: "rovento-arabica",
    name: "ROVENTO أرابيكا — 100% أرابيكا نقي",
    nameEn: "ROVENTO Arabica 100%",
    category: "beans",
    price: 950,
    weight: "1 كجم",
    rating: 4.8,
    reviews: 96,
    badge: "100% أرابيكا",
    accent: "#6c3483",
    image: IMAGES.bags.arabica,
    roast: "تحميص متوسط",
    arabica: 100,
    robusta: 0,
    intensity: 3,
    notes: ["نكهة فاكهية", "حموضة متوسطة", "قوة ناعمة"],
    description:
      "100% أرابيكا — نكهة فاكهية وخفيفة مع حموضة متوسطة. نكهة فاكهية (Fruity Notes)، تحميص متوسط (Medium Roast)، قوة ناعمة (Smooth Body). من أجود مزارع الأرابيكا في العالم.",
    brewing: ["إسبريسو", "فلتر", "V60", "كولد برو"],
    isNew: true,
    gallery: [
      IMAGES.products.arabica,
      IMAGES.bags.arabica,
      IMAGES.bags.macro,
      IMAGES.bags.twoPackages,
    ],
    testimonials: [
      { name: "مريم س.", text: "أرابيكا 100% بجد مفيش زيها. النكهة الفاكهية حلوة جدًا في الفلتر. بقت قهوتي المفضلة.", rating: 5, date: "2026-08-15" },
      { name: "يوسف ع.", text: "أول مرة أجرّب أرابيكا نقية بالشكل ده. حموضة معتدلة وطعم فاكهي مميز. ممتازة للفلتر.", rating: 5, date: "2026-08-08" },
      { name: "りん ف.", text: "قهوة فاخرة بمعنى الكلمة. بتقشر في الكوب وبتعطي رائحة فاكهية قبل ما تشربها. سوبرب!", rating: 4, date: "2026-07-29" },
    ],
  },
  {
    slug: "rovento-colombia",
    name: "ROVENTO كولومبيا — أصل واحد من مزارع كولومبيا",
    nameEn: "ROVENTO Colombia Single Origin",
    category: "beans",
    price: 950,
    weight: "1 كجم",
    rating: 4.8,
    reviews: 74,
    badge: "أصل واحد",
    accent: "#8b4513",
    image: IMAGES.bags.colombia,
    roast: "تحميص متوسط",
    arabica: 100,
    robusta: 0,
    intensity: 3,
    notes: ["نكهة شوكولاتة", "حموضة معتدلة", "من مزارع كولومبيا"],
    description:
      "من مزارع كولومبيا المختارة — حموضة معتدلة ونكهة شوكولاتة غنية. حموضة معتدلة (Medium Acidity)، تحميص متوسط (Medium Roast)، نكهة شوكولاتة (Chocolate Notes). أصل واحد يحكي قصة كل حبة.",
    brewing: ["إسبريسو", "فلتر", "V60", "فرنش بريس"],
    isNew: true,
    gallery: [
      IMAGES.products.colombia,
      IMAGES.bags.colombia,
      IMAGES.bags.macro,
      IMAGES.bags.twoPackages,
    ],
    testimonials: [
      { name: "سلمى ح.", text: "كولومبيا بجد بتحكي قصة. النكهة الشوكولاتية واضحة والحموضة معتدلة. من أحسن الإبريزو جربته.", rating: 5, date: "2026-08-14" },
      { name: "كريم م.", text: "حبوب كولومبيا مختارة بعناية. طعم مميز مش موجود في أي قهوة تانية في مصر.", rating: 5, date: "2026-08-06" },
      { name: "دانة ر.", text: "أول مرة أشرب كولومبيا أصل واحد. الطعم غني ومركّز. شكرًا روفينتو على التجربة دي.", rating: 5, date: "2026-07-22" },
    ],
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
    image: IMAGES.machines.espressoHome,
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
    image: IMAGES.accessories.grinderHand,
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
    image: IMAGES.accessories.grinderElectric,
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
    image: IMAGES.accessories.v60,
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
    image: IMAGES.accessories.frenchPress,
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
    image: IMAGES.accessories.kettle,
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
    image: IMAGES.accessories.scale,
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
    image: IMAGES.accessories.cups,
    notes: ["سيراميك سميك", "سعة ٩٠ مل", "صحون مرفقة"],
    description:
      "أكواب إسبريسو سيراميكية بجدران سميكة تحافظ على حرارة الكوب وكريمته. تصميم سويسري نظيف يكمل طاولة قهوتك.",
    brewing: ["إسبريسو"],
  },

  // ====== ماكينات القهوة (بصور حقيقية) ======
  {
    slug: "machine-espresso-pro",
    name: "ماكينة إسبريسو شبه احترافية — PID",
    nameEn: "Semi-Pro Espresso Machine",
    category: "machines",
    price: 38500,
    oldPrice: 42000,
    weight: "ضمان سنتين",
    rating: 4.9,
    reviews: 23,
    badge: "احترافية",
    accent: "#c9a227",
    image: IMAGES.machines.espressoPro,
    notes: ["تحكم PID بالحرارة", "مقياس ضغط", "جسم فولاذي"],
    description:
      "ماكينة إسبريسو شبه احترافية بتحكم رقمي PID في الحرارة ومقياس ضغط دقيق — تجربة كافيه محترف في مطبخك. مبخرة حليب قوية لللاتيه آرت.",
    brewing: ["إسبريسو", "كابتشينو", "لاتيه"],
    isNew: true,
  },
  {
    slug: "machine-automatic",
    name: "ماكينة إسبريسو أوتوماتيك بالكامل",
    nameEn: "Fully Automatic Espresso Machine",
    category: "machines",
    price: 27500,
    weight: "ضمان سنتين",
    rating: 4.8,
    reviews: 31,
    badge: "ضغطة واحدة",
    accent: "#002fa7",
    image: IMAGES.machines.automatic,
    notes: ["مطحنة مدمجة", "١٢ وصفة", "تنظيف ذاتي"],
    description:
      "كل شيء بضغطة واحدة: طحن طازج واستخلاص ورغوة حليب — من الحبة إلى الكوب في دقيقة. مثالية للمكاتب وعشاق الإسبريسو المشغولين.",
    brewing: ["إسبريسو", "كابتشينو", "أمريكانو"],
    isNew: true,
  },
  {
    slug: "machine-capsule",
    name: "ماكينة كبسولات ١٩ بار",
    nameEn: "Capsule Coffee Machine",
    category: "machines",
    price: 8900,
    oldPrice: 10500,
    weight: "ضمان سنة",
    rating: 4.6,
    reviews: 44,
    badge: "خصم ١٥٪",
    accent: "#d03b1e",
    image: IMAGES.machines.capsule,
    notes: ["١٩ بار", "تسخين ٢٥ ثانية", "تصميم مدمج"],
    description:
      "كوب إسبريسو وكابتشينو بجودة عالية في ٢٥ ثانية — متوافقة مع أشهر كبسولات القهوة، وصغيرة الحجم تناسب أي مطبخ أو مكتب.",
    brewing: ["كبسولات"],
  },
  {
    slug: "machine-moka",
    name: "موكا بوت إسبريسو — ٣ أكواب",
    nameEn: "Moka Pot 3-Cup",
    category: "machines",
    price: 1250,
    weight: "ألمنيوم",
    rating: 4.7,
    reviews: 96,
    accent: "#c9a227",
    image: IMAGES.machines.moka,
    notes: ["للموقد العادي", "٣ أكواب", "سهل التنظيف"],
    description:
      "طريقة الإسبريسو الكلاسيكية على الموقد — قهوة غنية ومركزة بلا كهرباء. رفيق السفر والبيت، سهل الاستخدام والتنظيف.",
    brewing: ["موكا بوت"],
    bestseller: true,
  },
  {
    slug: "machine-cezve",
    name: "جازة قهوة تركية نحاسية",
    nameEn: "Turkish Coffee Pot (Cezve)",
    category: "machines",
    price: 550,
    weight: "نحاس",
    rating: 4.8,
    reviews: 118,
    accent: "#b45309",
    image: IMAGES.machines.cezve,
    notes: ["نحاس مطروق", "مقبض خشبي", "سعة ٢ فنجان"],
    description:
      "جازة نحاسية تقليدية لإعداد القهوة العربية والتركية على أصولها — رغوة كثيفة ونكهة أصيلة لكل بيت مصري.",
    brewing: ["قهوة تركية"],
    isNew: true,
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

export const SIGNATURE_BLENDS = ["rovento-classic", "rovento-bar-intenso"];

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
