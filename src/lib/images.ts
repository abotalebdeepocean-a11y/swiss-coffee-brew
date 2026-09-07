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
  /** كيس الهيرو — صورة البريميوم (النسر) — مقاس موحد */
  heroBag: "/images/premium-bag",
  /** حقائب ROVENTO الحقيقية — مقاس موحد (1100×1100) عشان الكيسين يظهروا بنفس الحجم */
  bags: {
    /** كيس BAR INTENSO — الأمامي */
    intenso: "/images/intenso-bag",
    /** كيس BAR INTENSO — الخلفي (نفس المقياس — النسخة النظيفة بلا عيب الظل) */
    intensoBack: "/images/intenso-bag-back-clean",
    /** كيس PREMIUM — الأمامي */
    premium: "/images/premium-bag",
    /** كيس PREMIUM — الخلفي (نفس المقياس) */
    premiumBack: "/images/premium-bag-back",
    /** صورة ماكرو — كيس بار إنتنسو (للخلفيات) */
    macro: "/images/intenso-bag",
    /** صورة الكيسين معاً — مقاس موحد */
    twoPackages: "/images/intenso-bag",
  },
  /** صور المنتجات — الأمامي والخلفي لكل منتج */
  products: {
    barIntenso: "/images/intenso-bag",
    barIntensoBack: "/images/intenso-bag-back-clean",
    premium: "/images/premium-bag",
    premiumBack: "/images/premium-bag-back",
  },
  /** بنرات السلايدر (صور حقيقية من Google Drive — محدثة) */
  banners: {
    /** السلايد 1 — البنر الرئيسي */
    hero: "/images/banner-main",
    /** السلايد 2 — بنر تاني */
    workshop: "/images/banner-2",
    /** السلايد 3 — بنر الطلب الآن */
    signature: "/images/banner-order",
    /** السلايد 4 — بنر الفخامة */
    collections: "/images/banner-velvet",
    /** السلايد 5 — بنر اختيار الباكيجتين */
    choose: "/images/banner-choose",
    /** صورة قسم بريكا */
    brika: "/images/banner-brika-new",
    /** بانر قسم خلطتك الخاصة */
    customBlend: "/images/banner-2",
    /** بانر الكيس CLASSIC 1 كجم */
    classic1kg: "/images/premium-bag",
  },
  /** شعار ROVENTO الحقيقي */
  logo: "/images/rovento-logo-final",
  /** حبوب خام لقسم خلطتك الخاصة */
  beans: {
    arabica: "/images/bean-arabica",
    robusta: "/images/bean-robusta",
  },
  /** درجات التحميص — صور حبوب بن حقيقية (بدون امتداد — useImageCandidates يجرب .webp/.png/.jpg) */
  roastLevels: {
    light: "/images/bean-light",
    medium: "/images/bean-medium",
    dark: "/images/bean-dark",
  },
  /** صور مقارنة درجات التحميص */
  roastCompare: {
    lightDark: "/images/roast-compare-light-dark",
    mediumLight: "/images/roast-compare-medium-light",
    darkMedium: "/images/roast-compare-dark-medium",
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
