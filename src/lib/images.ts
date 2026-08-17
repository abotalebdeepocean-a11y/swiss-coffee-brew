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
  /** كيس الهيرو — الكيس الأخضر الحقيقي PREMIUM (المنتج الرئيسي).
   * حذفنا صور الأكياس غير الحقيقية (الموسيقى الببغاء/الحمراء)
   * — يظهر هنا دائمًا منتج روفينتو الحقيقي. */
  heroBag: "/images/bag-premium",
  /** حقائب ROVENTO الحقيقية — الأخضر (PREMIUM) والأزرق (CLASSIC) فقط،
   * والباقي بيقع تلقائيًا على تصميم SVG الفخم. */
  bags: {
    /** كيس PREMIUM BLEND الأخضر (70٪ أرابيكا) — المنتج الرئيسي */
    premium: "/images/bag-premium",
    /** كيس INTENSO BLEND — لا توجد صورة حقيقية: يظهر تصميم SVG */
    intenso: "/images/bag-intenso",
    /** كيس CLASSIC BLEND الأزرق (50٪ أرابيكا) — المنتج الأساسي */
    classic: "/images/bag-classic",
    /** كيس CLASSIC 1 كجم — الغلاف الحقيقي (صورة جديدة من العميل) */
    classic1kg: "/images/bag-classic-1kg",
    /** كيس INNOVATION BLEND (أصل إثيوبي) */
    innovation: "/images/bag-innovation",
    /** ORIGIN COLLECTION — إثيوبيا أصل واحد (كيس أسود بفيل ذهبي) */
    origin: "/images/bag-origin",
    /** MASTERY COLLECTION — إتقان الإسبريسو (كيس بني ببورتافلتر) */
    mastery: "/images/bag-mastery",
    /** SIGNATURE COLLECTION — تحميص داكن (كيس كريمي) */
    signatureCream: "/images/bag-signature-cream",
    /** حبوب مصرية أصل واحد (جانب أصفر) */
    egyptian: "/images/bag-egyptian",
    /** علبة كبسولات ROVENTO (10) */
    capsules: "/images/bag-capsules",
  },
  /** بنرات السلايدر الأربعة (من صورك الحقيقية من Google Drive) */
  banners: {
    /** السلايد 1 — بنر ROVENTO الرئيسي «مش قهوة… دي شخصية» (داكن + أكياس) */
    hero: "/images/banner-hero",
    /** السلايد 2 — موكا بوت + كيس أسود «طعم قهوة… لا ينسى» */
    workshop: "/images/banner-workshop",
    /** السلايد 3 — أكياس ROVENTO المتعددة جنب بعض */
    signature: "/images/banner-signature",
    /** السلايد 4 — صمام الكيس + حبوب ذهبية (الطزاجة) */
    collections: "/images/banner-collections",
    /** صورة قسم بريكا — موكا بوت + كيس أزرق «عندما يلقى الإتقان بالإبداع» */
    brika: "/images/banner-brika",
    /** بانر قسم «خلطتك الخاصة» (BLEND LAB) — ضع صورة حبوب/خلط هنا */
    customBlend: "/images/banner-customblend",
    /** بانر الكيس الأخضر/الأزرق الحقيقي — غلاف CLASSIC 1 كجم */
    classic1kg: "/images/bag-classic-1kg",
  },
  /** قائمة أسعار البن الرسمية (صورة حقيقية من العميل) */
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
