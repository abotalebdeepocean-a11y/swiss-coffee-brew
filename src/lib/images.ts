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
  /** كيس الهيرو — كيس سيجنتشر الكريمي الاحترافي (بدل صورة القطة).
   * لو عندك صورة أفضل (زي كيس الببغاء الكحلي من إعلان BIALETTI)
   * ضعها هنا بنفس الاسم bag-hero وستحل محلها فورًا. */
  heroBag: "/images/bag-hero",
  /** حقائب ROVENTO الحقيقية (من صورك) + باقي أصناف الأكياس */
  bags: {
    /** كيس PREMIUM BLEND بجوانب صفراء */
    premium: "/images/bag-premium",
    /** كيس INTENSO BLEND بجوانب حمراء */
    intenso: "/images/bag-intenso",
    /** كيس CLASSIC BLEND بجوانب زرقاء */
    classic: "/images/bag-classic",
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
