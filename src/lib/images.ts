/**
 * ROVENTO — image slots for real photos.
 *
 * Drop your files into `public/images/` and they replace the SVG artwork
 * automatically. Base names have NO extension: the app tries `.png` → `.jpg`
 * → `.webp` in order, and falls back to the SVG art when nothing is found.
 *
 * ضع صورك في `public/images/` وستحل محل رسومات SVG تلقائيًا.
 * الأسماء بدون امتداد — الموقع يجرب png ثم jpg ثم webp، ويرجع للرسم
 * الاحتياطي لو الصورة مش موجودة. راجع `public/images/README.txt`.
 */
export const IMAGES = {
  /** كيس الهيرو — صورة بريميوم عالية الجودة بخلفية داكنة */
  heroBag: "/images/bag-premium-scene",
  /** حقائب ROVENTO الحقيقية — الصور المنسقة بمقاس ثابت (800×1000) */
  bags: {
    /** كيس PREMIUM BLEND — النسر الأخضر الفاخر */
    premium: "/images/bag-premium-real",
    /** كيس CLASSIC BLEND — الببغاء الأزرق */
    classic: "/images/bag-classic-real",
    /** كيس CLASSIC 1 كجم */
    classic1kg: "/images/bag-classic-1kg-real",
    /** كيس BAR INTENSO — الغامق القوي */
    intenso: "/images/bag-intenso-new",
    /** كيس ARABICA — الأرابيكا النقي */
    arabica: "/images/bag-arabica-new",
    /** كيس COLOMBIA SINGLE ORIGIN */
    colombia: "/images/bag-colombia-new",
    /** الكيسين مع بعض */
    twoPackages: "/images/bag-two-packages",
    /** صورة اختيار */
    choose: "/images/bag-two-packages",
    /** صورة ماكرو */
    macro: "/images/bag-macro-closeup",
    /** صورة خاصة */
    special: "/images/bag-special-package",
    /** صورة تمهيد */
    upcoming: "/images/bag-upcoming",
  },
  /** بنرات السلايدر (صور حقيقية من Google Drive — محدثة) */
  banners: {
    /** السلايد 1 — بنر ROVENTO الرئيسي */
    hero: "/images/banner-hero",
    /** السلايد 2 — موكا بوت + كيس */
    workshop: "/images/banner-workshop",
    /** السلايد 3 — أكياس ROVENTO */
    signature: "/images/banner-signature",
    /** السلايد 4 — بنر متعدد */
    collections: "/images/banner-collections",
    /** صورة قسم بريكا */
    brika: "/images/banner-brika",
    /** بانر قسم خلطتك الخاصة */
    customBlend: "/images/banner-collections",
    /** بانر الكيس CLASSIC 1 كجم */
    classic1kg: "/images/bag-classic-1kg-real",
  },
  /** قائمة أسعار البن الرسمية */
  priceList: "/images/price-list",
  /** شعار ROVENTO الحقيقي */
  logo: "/images/rovento-logo",
  /** حبوب خام لقسم خلطتك الخاصة — اختياري: ضع صورة حبوب أرابيكا/روبوستا */
  beans: {
    arabica: "/images/bean-arabica",
    robusta: "/images/bean-robusta",
  },
  /** ماكينات القهوة — صور حقيقية (Wikimedia Commons) */
  machines: {
    espressoHome: "/images/machine-espresso-home",
    espressoPro: "/images/machine-espresso-pro",
    automatic: "/images/machine-automatic",
    capsule: "/images/machine-capsule",
    moka: "/images/machine-moka",
    cezve: "/images/machine-cezve",
  },
  /** إكسسوارات وأدوات — صور حقيقية (Wikimedia Commons) */
  accessories: {
    grinderHand: "/images/acc-grinder-hand",
    grinderElectric: "/images/acc-grinder-electric",
    v60: "/images/acc-v60",
    frenchPress: "/images/acc-french-press",
    kettle: "/images/acc-kettle",
    scale: "/images/acc-scale",
    cups: "/images/acc-cups",
  },
} as const;
