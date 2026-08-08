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
  { id: "beans", name: "حبوب القهوة", nameEn: "Coffee Beans", blurb: "حبوب مختارة من أجود المزارع، محمصة طازجة أسبوعيًا.", accent: "#c9a227", count: 7 },
  { id: "espresso", name: "حبوب الإسبريسو", nameEn: "Espresso Beans", blurb: "بلندات مصممة خصيصًا لاستخلاص إسبريسو متكامل بالكريما.", accent: "#d03b1e", count: 4 },
  { id: "ground", name: "القهوة المطحونة", nameEn: "Ground Coffee", blurb: "طحن مضبوط حسب طريقة التحضير — V60، إسبريسو، فرنش بريس.", accent: "#002fa7", count: 2 },
  { id: "capsules", name: "كبسولات", nameEn: "Capsules", blurb: "نفس الجودة في كبسولة جاهزة لكل لحظة.", accent: "#d03b1e", count: 1 },
  { id: "machines", name: "ماكينات القهوة", nameEn: "Coffee Machines", blurb: "ماكينات إسبريسو واحترافية — من الموكا بوت إلى الأوتوماتيك بالكامل.", accent: "#c9a227", count: 6 },
  { id: "accessories", name: "إكسسوارات وأدوات", nameEn: "Accessories", blurb: "مطاحن، موازين، أكواب وكل ما يحتاجه الباريستا المنزلي.", accent: "#002fa7", count: 7 },
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
    arabica: 30,
    robusta: 70,
    intensity: 5,
    notes: ["كاكاو داكن", "بندق", "بهارات دافئة"],
    description:
      "لأصحاب الإسبريسو الجريء. نسبة روبوستا عالية (70٪) تعني كريما كثيفة وطعمًا قويًا لا يخذلك تحت الضغط. خيار الباريستا المحترف للكورتوادو والماكياتو.",
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
    roast: "تحميص متوسط-غامق",
    arabica: 50,
    robusta: 50,
    intensity: 3,
    notes: ["كراميل", "أزهار", "حمضيات"],
    description:
      "بلند متوازن تمامًا: 50٪ أرابيكا و50٪ روبوستا بتحميص متوسط-غامق يعطي كوبًا ناعمًا غنيًا بالكريما. مثالي للقطرة V60 والفرنش بريس ولجميع أفراد البيت.",
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
    roast: "تحميص متوسط-غامق",
    arabica: 50,
    robusta: 50,
    intensity: 3,
    notes: ["كراميل", "أزهار", "حمضيات"],
    description:
      "طحن خشن مناسب للفرنش بريس والتنقيط البارد — نفس بلند كلاسيك المتوازن بكمية كبيرة مثالية للبيوت والمكاتب.",
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
    arabica: 30,
    robusta: 70,
    intensity: 5,
    notes: ["كاكاو داكن", "بندق", "بهارات دافئة"],
    description:
      "الخيار الأول للكافيهات والمكاتب. ثبات في الجودة والاستخلاص مع كل دفعة، وسعر اقتصادي للحجم الكبير.",
    brewing: ["إسبريسو", "أمريكانو"],
  },
  {
    slug: "rovento-innovation",
    name: "ROVENTO إنوفيشن بليند — أصل إثيوبي 500 جم",
    nameEn: "ROVENTO Innovation Blend",
    category: "beans",
    price: 420,
    oldPrice: 480,
    weight: "500 جم",
    rating: 4.8,
    reviews: 38,
    badge: "أصل واحد",
    accent: "#0d9488",
    image: IMAGES.bags.innovation,
    roast: "تحميص متوسط",
    arabica: 100,
    robusta: 0,
    intensity: 3,
    notes: ["فاكهة", "شوكولاتة", "زهور"],
    description:
      "أرابيكا إثيوبية 100٪ بنكهات فاكهية وزهرية تليق بالقهوة المختصة. تحميص متوسط يبرز حلاوة الفاكهة مع جسم متوازن — مثالي للإسبريسو والفلتر والكولد برو.",
    brewing: ["إسبريسو", "فلتر", "كولد برو"],
    isNew: true,
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
    image: IMAGES.bags.capsules,
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

  // ====== مجموعات الأكياس الجديدة (من فولدر الصور) ======
  {
    slug: "rovento-origin-ethiopia",
    name: "ROVENTO أوريجن — إثيوبيا أصل واحد 1 كجم",
    nameEn: "ROVENTO Origin Collection — Ethiopia",
    category: "beans",
    price: 1450,
    oldPrice: 1650,
    weight: "1 كجم",
    rating: 4.8,
    reviews: 52,
    badge: "أصل واحد",
    accent: "#c9a227",
    image: IMAGES.bags.origin,
    roast: "تحميص متوسط (إسبريسو)",
    arabica: 100,
    robusta: 0,
    intensity: 4,
    notes: ["زهور", "شوكولاتة", "فواكه حمراء"],
    description:
      "من مجموعة الأصول — حبوب إثيوبية فريدة بنكهات زهرية وفاكهية واضحة. تحميص متوسط مصمم للإسبريسو يمنحك كريما كثيفة وجسمًا غنيًا بعطر لا يُنسى.",
    brewing: ["إسبريسو", "فلتر", "كولد برو"],
    isNew: true,
  },
  {
    slug: "rovento-mastery",
    name: "ROVENTO ماستري — إتقان الإسبريسو 1 كجم",
    nameEn: "ROVENTO Mastery Collection",
    category: "espresso",
    price: 1550,
    weight: "1 كجم",
    rating: 4.9,
    reviews: 41,
    badge: "إتقان",
    accent: "#b45309",
    image: IMAGES.bags.mastery,
    roast: "تحميص متوسط (إسبريسو)",
    arabica: 100,
    robusta: 0,
    intensity: 4,
    notes: ["كراميل", "مكسرات", "كاكاو"],
    description:
      "قهوة استثنائية لطعم استثنائي — أرابيكا 100٪ محمصة بإتقان لاستخلاص إسبريسو متوازن بكريما ذهبية وجسم غني. اختيار من يبحث عن الكمال في الكوب.",
    brewing: ["إسبريسو", "كابتشينو"],
  },
  {
    slug: "rovento-signature-1kg",
    name: "ROVENTO سيجنتشر — تحميص داكن 1 كجم",
    nameEn: "ROVENTO Signature Collection — Dark Roast",
    category: "beans",
    price: 1320,
    weight: "1 كجم",
    rating: 4.7,
    reviews: 63,
    badge: "تحميص داكن",
    accent: "#a16207",
    image: IMAGES.bags.signatureCream,
    roast: "تحميص غامق (إسبريسو)",
    arabica: 70,
    robusta: 30,
    intensity: 4,
    notes: ["كاكاو", "بهارات", "فانيليا"],
    description:
      "من المجموعة المميزة — كاكاو وبهارات بعطر عميق وطعم مدخن. تحميص داكن يمنحك كوبًا ثقيل الجسم بقوام مخملي يناسب الإسبريسو واللاتيه.",
    brewing: ["إسبريسو", "لاتيه", "فلتر"],
  },
  {
    slug: "rovento-classic-1kg",
    name: "ROVENTO كلاسيك بليند — 1 كجم",
    nameEn: "ROVENTO Classic Blend 1kg",
    category: "beans",
    price: 1050,
    oldPrice: 1200,
    weight: "1 كجم",
    rating: 4.8,
    reviews: 78,
    badge: "أفضل قيمة",
    accent: "#002fa7",
    image: IMAGES.bags.classic1kg,
    roast: "تحميص متوسط-غامق",
    arabica: 50,
    robusta: 50,
    intensity: 3,
    notes: ["كراميل", "أزهار", "حمضيات"],
    description:
      "نفس بلند كلاسيك المتوازن 50/50 بكمية 1 كجم اقتصادية للبيوت والمكاتب — كوب ناعم غني بالكريما يناسب كل أفراد البيت.",
    brewing: ["V60", "فرنش بريس", "دريپ"],
  },
  {
    slug: "rovento-egyptian-1kg",
    name: "ROVENTO حبوب مصرية — أصل واحد 1 كجم",
    nameEn: "ROVENTO Egyptian Single Origin",
    category: "espresso",
    price: 980,
    weight: "1 كجم",
    rating: 4.7,
    reviews: 57,
    badge: "من قلب مصر",
    accent: "#c9a227",
    image: IMAGES.bags.egyptian,
    roast: "تحميص متوسط",
    arabica: 70,
    robusta: 30,
    intensity: 4,
    notes: ["شوكولاتة", "توفي", "مكسرات"],
    description:
      "فخر محلي — حبوب بن مصرية مختارة محمصة طازجة بلمسة ROVENTO. إسبريسو غني بالكريما بنكهة شوكولاتة وتوفي، ودعم مباشر للمزارع المحلي.",
    brewing: ["إسبريسو", "أمريكانو"],
    isNew: true,
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
