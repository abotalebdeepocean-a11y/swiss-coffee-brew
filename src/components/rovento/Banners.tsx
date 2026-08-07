import type { CSSProperties, ReactNode } from "react";
import { IMAGES } from "@/lib/images";
import { CoffeeBag } from "./CoffeeBag";
import { Bean, Steam, CremaCup, BEAN_COLORS } from "./art";

/* ================================================================== */
/* Shared helpers                                                     */
/* ================================================================== */

const cx = 1600;
const cy = 900;

function Beans({ list }: { list: [number, number, number, number, number, string][] }) {
  return (
    <>
      {list.map(([x, y, s, rot, delay, color], i) => (
        <Bean
          key={i}
          x={x}
          y={y}
          width={40 * s}
          height={58 * s}
          color={color}
          className="animate-float svg-center"
          style={
            {
              "--rot": `${rot}deg`,
              animationDelay: `${delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

function Vignette({ from = "rgba(8,6,4,0)" }: { from?: string }) {
  return (
    <defs>
      <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor="rgba(6,4,3,0.92)" />
      </linearGradient>
    </defs>
  );
}

/* ================================================================== */
/* Slide 01 — «ليست مجرد قهوة… إنها وقود العظماء!» (sunset campaign)  */
/* ================================================================== */
function SunsetScene() {
  return (
    <svg viewBox={`0 0 ${cx} ${cy}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="sun-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#150d20" />
          <stop offset="45%" stopColor="#3c1f17" />
          <stop offset="72%" stopColor="#7c3c16" />
          <stop offset="100%" stopColor="#e8943f" />
        </linearGradient>
        <radialGradient id="sun-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffe6b8" />
          <stop offset="55%" stopColor="#ffb45e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffb45e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sun-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sun-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241509" />
          <stop offset="100%" stopColor="#0d0704" />
        </linearGradient>
        <Vignette />
      </defs>
      <rect width={cx} height={cy} fill="url(#sun-sky)" />

      {/* heavy clouds */}
      <g fill="#120b16" opacity="0.8">
        <ellipse cx="260" cy="120" rx="230" ry="58" />
        <ellipse cx="520" cy="90" rx="180" ry="46" />
        <ellipse cx="980" cy="130" rx="260" ry="64" />
        <ellipse cx="1330" cy="100" rx="220" ry="52" />
        <ellipse cx="170" cy="200" rx="150" ry="40" opacity="0.6" />
        <ellipse cx="1450" cy="210" rx="180" ry="44" opacity="0.6" />
      </g>

      {/* sun + glow */}
      <circle cx="1150" cy="560" r="300" fill="url(#sun-core)" />
      <circle cx="1150" cy="560" r="78" fill="#ffd9a0" opacity="0.95" />
      <circle cx="1150" cy="560" r="58" fill="#fff1d0" />

      {/* layered mountains */}
      <path
        d="M 0 640 L 220 470 L 420 610 L 640 430 L 860 620 L 1080 470 L 1290 610 L 1500 440 L 1600 560 L 1600 900 L 0 900 Z"
        fill="#150c12"
      />
      <path
        d="M 0 680 L 300 540 L 560 660 L 820 520 L 1100 660 L 1340 540 L 1600 660 L 1600 900 L 0 900 Z"
        fill="#1d1218"
      />
      <path
        d="M 0 720 L 380 600 L 700 710 L 1000 590 L 1300 700 L 1600 590 L 1600 900 L 0 900 Z"
        fill="#26151c"
      />

      {/* river of light */}
      <path
        d="M 1090 620 L 1210 620 L 1480 900 L 800 900 Z"
        fill="url(#sun-river)"
        opacity="0.55"
      />

      {/* tabletop */}
      <rect x="0" y="726" width={cx} height="174" fill="url(#sun-table)" />
      <rect x="0" y="724" width={cx} height="6" fill="#4a2c14" />
      {[180, 420, 660, 900, 1140, 1380].map((x) => (
        <line key={x} x1={x} y1="730" x2={x} y2="900" stroke="#050302" strokeWidth="3" opacity="0.55" />
      ))}

      {/* the bag — center-right (like the real banner) */}
      <CoffeeBag variant="premium" x={1070} y={238} width={330} height={472} />

      {/* espresso cup on the table + steam */}
      <CremaCup x={330} y={560} width={290} height={290} />
      <Steam x={398} y={330} width={110} height={160} delay={0} opacity={0.55} />
      <Steam x={470} y={300} width={92} height={140} delay={1.3} opacity={0.45} />

      {/* beans on the table */}
      <Beans
        list={[
          [170, 800, 1.3, 18, 0.4, BEAN_COLORS[0]],
          [620, 830, 1.1, -24, 1.6, BEAN_COLORS[1]],
          [900, 795, 1.4, 10, 2.8, BEAN_COLORS[3]],
          [1560, 820, 1.2, -14, 1.1, BEAN_COLORS[4]],
          [1500, 855, 1.0, 22, 4.4, BEAN_COLORS[0]],
          [540, 855, 0.9, -32, 5.2, BEAN_COLORS[1]],
        ]}
      />

      <rect width={cx} height={cy} fill="url(#vignette)" />
    </svg>
  );
}

/* ================================================================== */
/* Slide 02 — Egyptian workshop: rustic wall, window, stove, logs      */
/* ================================================================== */
function WorkshopScene() {
  return (
    <svg viewBox={`0 0 ${cx} ${cy}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="ws-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a1a10" />
          <stop offset="55%" stopColor="#181008" />
          <stop offset="100%" stopColor="#0b0806" />
        </linearGradient>
        <radialGradient id="ws-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ws-ray" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ws-fire" cx="0.5" cy="0.6" r="0.5">
          <stop offset="0%" stopColor="#ff9d3f" />
          <stop offset="60%" stopColor="#d64f1e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7a1e0c" stopOpacity="0" />
        </radialGradient>
        <Vignette />
      </defs>
      <rect width={cx} height={cy} fill="url(#ws-bg)" />

      {/* wall planks */}
      <g stroke="#ffffff" opacity="0.03">
        {[120, 260, 400, 540, 680, 820, 960, 1100, 1240, 1380, 1520].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="740" strokeWidth="2" />
        ))}
      </g>

      {/* warm glow behind the bag */}
      <circle cx="400" cy="480" r="360" fill="url(#ws-sun)" opacity="0.22" />

      {/* window (right) + sun rays */}
      <g>
        <rect x="1000" y="80" width="200" height="168" fill="#ffd9a0" opacity="0.12" />
        <rect x="1000" y="80" width="200" height="168" fill="none" stroke="#2e1f13" strokeWidth="10" />
        <line x1="1100" y1="80" x2="1100" y2="248" stroke="#2e1f13" strokeWidth="7" />
        <line x1="1000" y1="164" x2="1200" y2="164" stroke="#2e1f13" strokeWidth="7" />
        <g className="animate-ray" fill="url(#ws-ray)">
          <polygon points="1000,80 560,360 660,360 1200,80" />
          <polygon points="1100,80 380,470 500,470 1200,80" opacity="0.6" style={{ animationDelay: "1.6s" }} />
          <polygon points="1000,248 620,560 740,560 1200,248" opacity="0.35" style={{ animationDelay: "2.8s" }} />
        </g>
        <circle cx="1100" cy="164" r="66" fill="url(#ws-sun)" />
      </g>

      {/* cast-iron stove with glowing fire (below the window) */}
      <g transform="translate(990 392)">
        <rect x="-14" y="-90" width="28" height="90" fill="#191311" />
        <rect x="-26" y="-124" width="52" height="40" fill="#221a15" rx="6" />
        <rect x="-52" y="0" width="104" height="240" rx="14" fill="#1c1512" stroke="#0d0906" strokeWidth="3" />
        <rect x="-34" y="24" width="68" height="96" rx="10" fill="#120c0a" stroke="#3a2a1e" strokeWidth="4" />
        <circle cx="0" cy="72" r="44" fill="url(#ws-fire)" className="animate-pulse" />
        {/* flames */}
        <g fill="#ff7a2f" opacity="0.9">
          <path d="M -18 96 C -12 66 -4 60 0 76 C 4 58 12 64 18 96 Z" />
          <path d="M -10 96 C -6 74 0 70 4 84 C 8 68 14 76 16 96 Z" fill="#ffc46b" opacity="0.8" />
        </g>
        <path d="M -52 150 L -40 160 L -60 178 L -46 186 L -58 200 L -30 240 L 30 240 L 52 200 L 38 186 L 52 178 L 40 160 L 52 150 Z" fill="#16100d" />
        {/* legs */}
        <rect x="-46" y="238" width="14" height="34" fill="#0d0906" />
        <rect x="32" y="238" width="14" height="34" fill="#0d0906" />
      </g>

      {/* smoke from the chimney */}
      <Steam x={1006} y={170} width={90} height={140} delay={0.4} opacity={0.35} />
      <Steam x={1064} y={150} width={70} height={120} delay={2.1} opacity={0.3} />

      {/* stacked logs next to the stove */}
      <g>
        {[
          [1280, 660, -6],
          [1330, 656, 3],
          [1380, 664, -3],
          [1305, 700, 5],
          [1360, 696, -5],
          [1410, 702, 2],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <rect x="-34" y="-13" width="68" height="26" rx="12" fill="#3a2a17" stroke="#1c120a" strokeWidth="2" />
            <ellipse cx="-32" cy="0" rx="7" ry="13" fill="#5c4526" stroke="#1c120a" strokeWidth="2" />
          </g>
        ))}
      </g>

      {/* workbench */}
      <g>
        <rect x="0" y="744" width={cx} height="156" fill="#1a110a" />
        <rect x="0" y="742" width={cx} height="7" fill="#3a2817" />
        {[220, 460, 700, 940, 1180, 1420].map((x) => (
          <line key={x} x1={x} y1="749" x2={x} y2="900" stroke="#0a0705" strokeWidth="3" opacity="0.5" />
        ))}
        <rect x="150" y="800" width="70" height="100" fill="#110c07" />
        <rect x="1380" y="800" width="70" height="100" fill="#110c07" />
      </g>

      {/* the bag on the left (like the real photo) */}
      <g transform="rotate(-2.5 395 470)">
        <CoffeeBag variant="premium" x={240} y={250} width={320} height={460} />
      </g>

      <rect width={cx} height={cy} fill="url(#vignette)" />
    </svg>
  );
}

/* ================================================================== */
/* Slide 03 — the three signature bags on the workshop bench           */
/* ================================================================== */
function SignatureScene() {
  return (
    <svg viewBox={`0 0 ${cx} ${cy}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="sg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#221510" />
          <stop offset="55%" stopColor="#150d09" />
          <stop offset="100%" stopColor="#0a0705" />
        </linearGradient>
        <linearGradient id="sg-beam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sg-bench" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c1d10" />
          <stop offset="100%" stopColor="#120b06" />
        </linearGradient>
        <Vignette />
      </defs>
      <rect width={cx} height={cy} fill="url(#sg-bg)" />

      {/* machinery hints + grid */}
      <g stroke="#f2efe8" opacity="0.04">
        {[200, 400, 600, 800, 1000, 1200, 1400].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2={cy} strokeWidth="1" />
        ))}
        {[180, 360, 540].map((y) => (
          <line key={y} x1="0" y1={y} x2={cx} y2={y} strokeWidth="1" />
        ))}
      </g>

      {/* sunbeam from the upper-right window */}
      <polygon points="1250,0 1600,0 1600,520 980,120" fill="url(#sg-beam)" className="animate-ray" />
      <rect x="1330" y="0" width="180" height="120" fill="#ffd9a0" opacity="0.07" />
      <rect x="1330" y="0" width="180" height="120" fill="none" stroke="#2e1f13" strokeWidth="8" />

      {/* workbench */}
      <rect x="0" y="618" width={cx} height="282" fill="url(#sg-bench)" />
      <rect x="0" y="616" width={cx} height="7" fill="#46301a" />
      {[140, 320, 500, 680, 860, 1040, 1220, 1400, 1580].map((x) => (
        <line key={x} x1={x} y1="626" x2={x} y2="900" stroke="#0a0604" strokeWidth="2.5" opacity="0.4" />
      ))}
      {/* bench legs */}
      <rect x="120" y="780" width="60" height="120" fill="#0d0805" />
      <rect x="1420" y="780" width="60" height="120" fill="#0d0805" />

      {/* the three signature bags — premium / intenso / classic */}
      <g transform="rotate(-2.5 900 400)">
        <CoffeeBag variant="premium" x={760} y={190} width={244} height={380} />
      </g>
      <g transform="rotate(0 1120 400)">
        <CoffeeBag variant="intenso" x={1008} y={180} width={244} height={390} />
      </g>
      <g transform="rotate(2.5 1340 400)">
        <CoffeeBag variant="classic" x={1256} y={190} width={244} height={380} />
      </g>

      {/* beans on the bench */}
      <Beans
        list={[
          [430, 760, 1.2, 14, 0.4, BEAN_COLORS[0]],
          [680, 800, 1.0, -22, 1.6, BEAN_COLORS[1]],
          [720, 745, 1.3, 8, 2.8, BEAN_COLORS[3]],
          [1000, 790, 0.9, 26, 3.9, BEAN_COLORS[2]],
          [1480, 770, 1.2, -12, 1.1, BEAN_COLORS[4]],
          [380, 820, 1.0, 18, 4.4, BEAN_COLORS[0]],
          [1180, 820, 0.85, -30, 5.2, BEAN_COLORS[1]],
        ]}
      />

      <rect width={cx} height={cy} fill="url(#vignette)" />
    </svg>
  );
}

/* ================================================================== */
/* Slide 04 — the three bags on a dark, gold-lit surface               */
/* ================================================================== */
function CollectionsScene() {
  return (
    <svg viewBox={`0 0 ${cx} ${cy}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <radialGradient id="cl-bg" cx="0.5" cy="0.38" r="0.8">
          <stop offset="0%" stopColor="#241708" />
          <stop offset="55%" stopColor="#120b06" />
          <stop offset="100%" stopColor="#060403" />
        </radialGradient>
        <radialGradient id="cl-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#c9a227" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cl-surface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c130a" />
          <stop offset="100%" stopColor="#050302" />
        </linearGradient>
        <Vignette from="rgba(6,4,3,0)" />
      </defs>
      <rect width={cx} height={cy} fill="url(#cl-bg)" />

      {/* gold hairline frame */}
      <rect x="28" y="28" width={cx - 56} height={cy - 56} fill="none" stroke="#c9a227" strokeWidth="1.5" opacity="0.28" />
      <rect x="38" y="38" width={cx - 76} height={cy - 76} fill="none" stroke="#c9a227" strokeWidth="0.75" opacity="0.18" />

      {/* warm glow */}
      <circle cx="1060" cy="430" r="520" fill="url(#cl-glow)" />

      {/* reflective surface */}
      <rect x="0" y="640" width={cx} height="260" fill="url(#cl-surface)" />
      <line x1="0" y1="640" x2={cx} y2="640" stroke="#c9a227" strokeWidth="1.5" opacity="0.35" />
      {/* faint reflections of the bags */}
      <ellipse cx="800" cy="700" rx="150" ry="26" fill="#c9a227" opacity="0.05" />
      <ellipse cx="1060" cy="700" rx="150" ry="26" fill="#c9a227" opacity="0.06" />
      <ellipse cx="1320" cy="700" rx="150" ry="26" fill="#c9a227" opacity="0.05" />

      {/* the three bags in a fan arrangement */}
      <g transform="rotate(-4 800 420)">
        <CoffeeBag variant="premium" x={690} y={218} width={232} height={380} />
      </g>
      <g transform="rotate(0 1060 420)">
        <CoffeeBag variant="intenso" x={944} y={205} width={232} height={390} />
      </g>
      <g transform="rotate(4 1320 420)">
        <CoffeeBag variant="classic" x={1204} y={218} width={232} height={380} />
      </g>

      {/* beans on the surface */}
      <Beans
        list={[
          [560, 760, 1.1, 16, 0.4, BEAN_COLORS[0]],
          [680, 830, 0.95, -20, 1.6, BEAN_COLORS[1]],
          [1500, 780, 1.2, 10, 2.8, BEAN_COLORS[3]],
          [900, 850, 0.8, 28, 3.9, BEAN_COLORS[2]],
          [1220, 845, 0.9, -12, 1.1, BEAN_COLORS[4]],
          [460, 830, 0.75, 22, 4.4, BEAN_COLORS[0]],
          [1420, 840, 0.85, -26, 5.2, BEAN_COLORS[1]],
        ]}
      />

      <rect width={cx} height={cy} fill="url(#vignette)" />
    </svg>
  );
}

/* ================================================================== */
/* SLIDES                                                              */
/* ================================================================== */

interface Slide {
  id: string;
  kicker: string;
  title: ReactNode;
  sub: string;
  ctaLabel: string;
  href: string;
  image: string;
  Scene: () => ReactNode;
}

export const SLIDES: Slide[] = [
  {
    id: "hero",
    kicker: "01 — IT'S NOT JUST COFFEE",
    title: (
      <>
        ليست مجرد قهوة…
        <br />
        <span className="text-rv-red">إنها وقود العظماء!</span>
      </>
    ),
    sub: "مصنوعة من أجود حبوب الأرابيكا والروبوستا، بخبرة تحميص دقيقة تمنحك تركيزًا صافيًا وطاقة إيجابية وطعمًا لا يُنسى.",
    ctaLabel: "اطلب الآن",
    href: "/shop",
    image: IMAGES.banners.hero,
    Scene: SunsetScene,
  },
  {
    id: "workshop",
    kicker: "02 — FROM EGYPT'S HEART",
    title: (
      <>
        من قلب مصر…
        <br />
        إلى عشاق القهوة حول العالم.
      </>
    ),
    sub: "محمصة صغيرة في قلب القاهرة · تحميص طازج يصل إلى باب بيتك",
    ctaLabel: "اكتشف المجموعة",
    href: "/shop",
    image: IMAGES.banners.workshop,
    Scene: WorkshopScene,
  },
  {
    id: "signature",
    kicker: "03 — THE SIGNATURE COLLECTION",
    title: (
      <>
        ثلاثة بلندات…
        <br />
        وشخصية واحدة لا تُنسى.
      </>
    ),
    sub: "بريميم · إنتنسو · كلاسيك — كل كيس يحمل القطّة الشهيرة ونكهة مختصة تصل طازجة.",
    ctaLabel: "تسوق البلندات",
    href: "/shop?category=beans",
    image: IMAGES.banners.signature,
    Scene: SignatureScene,
  },
  {
    id: "collections",
    kicker: "04 — FROM ORIGIN TO CUP",
    title: (
      <>
        من قلب المزرعة…
        <br />
        إلى كوبك الأول.
      </>
    ),
    sub: "أصول مختارة من إثيوبيا والبرازيل ومزارع مختصة — ROVENTO تجلب العالم إلى فنجانك.",
    ctaLabel: "اكتشف الأصول",
    href: "/shop?category=beans",
    image: IMAGES.banners.collections,
    Scene: CollectionsScene,
  },
];
