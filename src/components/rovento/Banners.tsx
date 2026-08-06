import type { CSSProperties, ReactNode } from "react";
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
/* Slide 01 — Dusty Egyptian workshop, sun rays from the window       */
/* ================================================================== */
function WorkshopScene() {
  const dust: [number, number, number, number][] = [
    [420, 640, 5, 0],
    [560, 700, 3, 1.4],
    [700, 620, 4, 2.2],
    [860, 680, 3, 3.1],
    [980, 600, 5, 1.8],
    [620, 740, 2.5, 4.2],
  ];
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
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <Vignette />
      </defs>
      <rect width={cx} height={cy} fill="url(#ws-bg)" />

      {/* wall planks */}
      <g stroke="#ffffff" opacity="0.03">
        {[120, 260, 400, 540, 680, 820, 960, 1100, 1240, 1380, 1520].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="750" strokeWidth="2" />
        ))}
      </g>

      {/* warm glow behind the bag */}
      <circle cx="1250" cy="470" r="420" fill="url(#ws-sun)" opacity="0.3" />

      {/* window + sun rays */}
      <g>
        <rect x="150" y="80" width="190" height="160" fill="#ffd9a0" opacity="0.1" />
        <rect x="150" y="80" width="190" height="160" fill="none" stroke="#2e1f13" strokeWidth="10" />
        <line x1="245" y1="80" x2="245" y2="240" stroke="#2e1f13" strokeWidth="7" />
        <line x1="150" y1="160" x2="340" y2="160" stroke="#2e1f13" strokeWidth="7" />
        <g className="animate-ray" fill="url(#ws-ray)">
          <polygon points="150,80 540,330 640,330 245,80" />
          <polygon points="245,80 760,430 880,430 340,80" opacity="0.65" style={{ animationDelay: "1.4s" }} />
          <polygon points="190,240 480,560 600,560 245,240" opacity="0.4" style={{ animationDelay: "2.6s" }} />
        </g>
        <circle cx="245" cy="160" r="70" fill="url(#ws-sun)" />
      </g>

      {/* tools on the wall */}
      <g fill="#0f0a06" stroke="rgba(255,255,255,0.07)">
        <g transform="translate(520 250) rotate(-12)">
          <rect x="-70" y="-10" width="140" height="26" />
          <path d="M -70 -10 L -120 10 L -70 16 Z" />
        </g>
        <g transform="translate(700 220)">
          <path d="M -50 0 A 50 50 0 0 1 50 0 Z" fill="none" strokeWidth="16" />
          <rect x="-60" y="-8" width="110" height="16" />
        </g>
      </g>

      {/* workbench */}
      <g>
        <rect x="0" y="750" width={cx} height="150" fill="#1a110a" />
        <rect x="0" y="748" width={cx} height="7" fill="#3a2817" />
        {[220, 460, 700, 940, 1180, 1420].map((x) => (
          <line key={x} x1={x} y1="755" x2={x} y2="900" stroke="#0a0705" strokeWidth="3" opacity="0.5" />
        ))}
        <rect x="150" y="800" width="70" height="100" fill="#110c07" />
        <rect x="1380" y="800" width="70" height="100" fill="#110c07" />
      </g>

      {/* dust */}
      <g>
        {dust.map(([x, y, r, d], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill="#ffd9a0"
            className="animate-dust"
            style={{ "--dx": "26px", animationDelay: `${d}s` } as CSSProperties}
            opacity="0.5"
          />
        ))}
      </g>

      {/* the hero bag on the bench */}
      <g transform="rotate(-3 1250 500)">
        <CoffeeBag variant="premium" x={1070} y={252} width={360} height={495} />
      </g>

      <rect width={cx} height={cy} fill="url(#vignette)" />
    </svg>
  );
}

/* ================================================================== */
/* Slide 02 — Premium beans floating in slow motion                   */
/* ================================================================== */
function FloatingBeansScene() {
  const beans: [number, number, number, number, number, string][] = [
    [240, 190, 1.7, -14, 0, BEAN_COLORS[1]],
    [540, 640, 2, 22, 1.3, BEAN_COLORS[0]],
    [920, 170, 1.5, -30, 2.5, BEAN_COLORS[2]],
    [1190, 650, 2.3, 12, 0.7, BEAN_COLORS[0]],
    [1430, 250, 1.6, -8, 1.9, BEAN_COLORS[3]],
    [330, 430, 1.2, 40, 3.1, BEAN_COLORS[4]],
    [700, 380, 1.05, -22, 2.3, BEAN_COLORS[3]],
    [1060, 370, 1.35, 18, 3.5, BEAN_COLORS[1]],
    [1500, 500, 1.9, -34, 1.1, BEAN_COLORS[2]],
    [110, 570, 1.35, 26, 2.9, BEAN_COLORS[0]],
    [620, 120, 0.95, 10, 3.9, BEAN_COLORS[4]],
    [1360, 110, 1.15, -18, 4.3, BEAN_COLORS[3]],
    [800, 560, 0.85, -12, 4.6, BEAN_COLORS[2]],
    [1180, 250, 0.8, 33, 5.1, BEAN_COLORS[4]],
  ];
  return (
    <svg viewBox={`0 0 ${cx} ${cy}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <radialGradient id="fb-bg" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0%" stopColor="#33200f" />
          <stop offset="55%" stopColor="#160f08" />
          <stop offset="100%" stopColor="#0a0805" />
        </radialGradient>
        <radialGradient id="fb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
        </radialGradient>
        <Vignette />
      </defs>
      <rect width={cx} height={cy} fill="url(#fb-bg)" />
      <circle cx="800" cy="430" r="560" fill="url(#fb-glow)" />

      <g stroke="#f2efe8" opacity="0.04">
        {[140, 280, 420, 560, 700, 840, 980, 1120, 1260, 1400, 1540].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2={cy} strokeWidth="1" />
        ))}
        {[140, 280, 420, 560, 700, 840].map((y) => (
          <line key={y} x1="0" y1={y} x2={cx} y2={y} strokeWidth="1" />
        ))}
      </g>

      <Beans list={beans} />

      {/* soft spotlight streak */}
      <rect
        x="1050"
        y="-100"
        width="240"
        height="1200"
        fill="url(#fb-glow)"
        opacity="0.5"
        transform="rotate(24 1050 500)"
      />

      <rect width={cx} height={cy} fill="url(#vignette)" />
    </svg>
  );
}

/* ================================================================== */
/* Slide 03 — Espresso extraction, crema + steam                      */
/* ================================================================== */
function EspressoScene() {
  return (
    <svg viewBox={`0 0 ${cx} ${cy}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <radialGradient id="es-bg" cx="0.62" cy="0.5" r="0.7">
          <stop offset="0%" stopColor="#251408" />
          <stop offset="60%" stopColor="#110b06" />
          <stop offset="100%" stopColor="#080605" />
        </radialGradient>
        <radialGradient id="es-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#e8a15c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e8a15c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="es-surface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c130c" />
          <stop offset="100%" stopColor="#0a0705" />
        </linearGradient>
        <Vignette />
      </defs>
      <rect width={cx} height={cy} fill="url(#es-bg)" />

      <g stroke="#f2efe8" opacity="0.045">
        {[200, 400, 600, 800, 1000, 1200, 1400].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2={cy} strokeWidth="1" />
        ))}
        {[180, 360, 540, 720].map((y) => (
          <line key={y} x1="0" y1={y} x2={cx} y2={y} strokeWidth="1" />
        ))}
      </g>

      <circle cx="1180" cy="560" r="420" fill="url(#es-glow)" />

      {/* portafilter silhouette */}
      <g transform="translate(300 600) rotate(-10)">
        <circle r="86" fill="#14110d" stroke="rgba(242,239,232,0.22)" strokeWidth="4" />
        <circle r="64" fill="#0c0a07" />
        <path d="M -30 78 L -46 120 L -6 120 Z" fill="#1a1610" />
        <rect x="-170" y="26" width="120" height="18" rx="4" fill="#3a2b1c" transform="rotate(-8 -110 35)" />
        <Bean x={-46} y={-46} width={34} height={49} color="#241a10" />
        <Bean x={12} y={-30} width={30} height={43} color="#332418" />
      </g>

      {/* the shot */}
      <g>
        <CremaCup x={1060} y={470} width={380} height={380} />
        <Steam x={1150} y={240} width={120} height={170} delay={0} opacity={0.5} />
        <Steam x={1240} y={220} width={100} height={150} delay={1.2} opacity={0.42} />
        <Steam x={1320} y={260} width={90} height={140} delay={2.3} opacity={0.38} />
      </g>

      {/* scattered beans on the counter */}
      <Beans
        list={[
          [120, 800, 1.3, 18, 0.4, BEAN_COLORS[0]],
          [430, 830, 1.1, -24, 1.6, BEAN_COLORS[1]],
          [700, 795, 1.5, 10, 2.8, BEAN_COLORS[3]],
          [880, 850, 1.0, 30, 3.9, BEAN_COLORS[2]],
          [1480, 810, 1.4, -14, 1.1, BEAN_COLORS[4]],
          [1560, 845, 1.1, 22, 4.4, BEAN_COLORS[0]],
          [620, 840, 0.9, -32, 5.2, BEAN_COLORS[1]],
        ]}
      />

      <rect x="0" y="740" width={cx} height="160" fill="url(#es-surface)" opacity="0.55" />
      <rect width={cx} height={cy} fill="url(#vignette)" />
    </svg>
  );
}

/* ================================================================== */
/* Slide 04 — Artistic flat-lay setup                                 */
/* ================================================================== */
function SetupScene() {
  return (
    <svg viewBox={`0 0 ${cx} ${cy}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="st-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#191512" />
          <stop offset="50%" stopColor="#101010" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <radialGradient id="st-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f2efe8" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#f2efe8" stopOpacity="0" />
        </radialGradient>
        <Vignette />
      </defs>
      <rect width={cx} height={cy} fill="url(#st-bg)" />
      <circle cx="700" cy="470" r="520" fill="url(#st-glow)" />

      <g stroke="#f2efe8" opacity="0.05">
        {[160, 320, 480, 640, 800, 960, 1120, 1280, 1440].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2={cy} strokeWidth="1" />
        ))}
        {[150, 300, 450, 600, 750].map((y) => (
          <line key={y} x1="0" y1={y} x2={cx} y2={y} strokeWidth="1" />
        ))}
      </g>

      <g transform="rotate(-5 800 450)">
        {/* Swiss accent blocks */}
        <rect x="170" y="120" width="64" height="64" fill="#d03b1e" />
        <rect x="420" y="118" width="220" height="30" fill="#002fa7" />

        {/* notebook */}
        <g>
          <rect x="1130" y="120" width="280" height="330" fill="#1a1a1a" stroke="rgba(242,239,232,0.14)" />
          <rect x="1130" y="120" width="14" height="330" fill="#d03b1e" />
          {[190, 240, 290, 340].map((y) => (
            <line key={y} x1="1180" y1={y} x2="1370" y2={y} stroke="rgba(242,239,232,0.1)" strokeWidth="3" />
          ))}
        </g>

        {/* tamper */}
        <g transform="translate(420 260)">
          <rect x="-22" y="-90" width="44" height="70" rx="3" fill="#241a10" />
          <circle r="44" fill="#2c2c2c" stroke="rgba(242,239,232,0.2)" />
          <circle r="30" fill="#1c1c1c" />
          <line x1="0" y1="-34" x2="0" y2="30" stroke="rgba(242,239,232,0.15)" strokeWidth="2" />
        </g>

        {/* the bag */}
        <CoffeeBag variant="intenso" x={150} y={380} width={300} height={412} />

        {/* the cup */}
        <CremaCup x={620} y={250} width={400} height={400} />

        {/* Swiss poster card */}
        <g>
          <rect x="1090" y="600" width="320" height="180" fill="#f2efe8" />
          <rect x="1090" y="600" width="46" height="180" fill="#d03b1e" />
          <text x="1180" y="668" fontFamily="'Archivo', sans-serif" fontWeight="900" fontSize="40" fill="#141414">
            MISH
          </text>
          <text x="1180" y="706" fontFamily="'IBM Plex Mono', monospace" fontSize="13" letterSpacing="3" fill="#141414">
            NOT ORDINARY
          </text>
          <text x="1180" y="738" fontFamily="'IBM Plex Sans Arabic', sans-serif" fontWeight="700" fontSize="20" fill="#d03b1e">
            مش قهوة عادية
          </text>
        </g>

        {/* beans */}
        <Beans
          list={[
            [560, 760, 1.4, 16, 0.5, BEAN_COLORS[1]],
            [660, 800, 1.1, -26, 1.7, BEAN_COLORS[0]],
            [820, 770, 1.6, 8, 2.9, BEAN_COLORS[2]],
            [900, 820, 1.0, 34, 4.0, BEAN_COLORS[3]],
            [1040, 770, 1.2, -12, 1.3, BEAN_COLORS[4]],
            [980, 500, 0.9, 40, 3.6, BEAN_COLORS[0]],
            [1120, 330, 0.8, -18, 4.8, BEAN_COLORS[1]],
          ]}
        />

        {/* portafilter */}
        <g transform="translate(1340 470) rotate(14)">
          <circle r="76" fill="#14110d" stroke="rgba(242,239,232,0.2)" strokeWidth="3" />
          <circle r="56" fill="#0c0a07" />
          <path d="M -28 68 L -44 106 L -6 106 Z" fill="#1a1610" />
          <rect x="64" y="-9" width="120" height="18" rx="3" fill="#3a2b1c" />
        </g>
      </g>

      <rect width={cx} height={cy} fill="url(#vignette)" />
    </svg>
  );
}

/* ================================================================== */
/* Slide registry                                                     */
/* ================================================================== */
export interface Slide {
  id: string;
  kicker: string;
  title: ReactNode;
  sub: string;
  ctaLabel: string;
  href: string;
  Scene: () => ReactNode;
}

export const SLIDES: Slide[] = [
  {
    id: "workshop",
    kicker: "01 — FROM EGYPT'S HEART",
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
    Scene: WorkshopScene,
  },
  {
    id: "beans",
    kicker: "02 — CRAFTED BEANS",
    title: (
      <>
        حبوب مختارة بعناية.
        <br />
        تحميص احترافي. نكهة لا تُنسى.
      </>
    ),
    sub: "أرابيكا وروبوستا بنِسَب مضبوطة لكل أسلوب تحضير",
    ctaLabel: "تسوق الحبوب",
    href: "/shop?category=beans",
    Scene: FloatingBeansScene,
  },
  {
    id: "espresso",
    kicker: "03 — THE FIRST SIP",
    title: (
      <>
        الفرق يبدأ
        <br />
        من أول رشفة.
      </>
    ),
    sub: "إسبريسو كامل الكريما… في مطبخك أنت",
    ctaLabel: "اشترِ حبوب الإسبريسو",
    href: "/shop?category=espresso",
    Scene: EspressoScene,
  },
  {
    id: "experience",
    kicker: "04 — THE FULL EXPERIENCE",
    title: (
      <>
        ليست قهوة فقط…
        <br />
        إنها تجربة كاملة.
      </>
    ),
    sub: "من الحبة إلى الكوب — معدات، أدوات، ومجتمع محبي القهوة",
    ctaLabel: "تصفح المتجر",
    href: "/shop",
    Scene: SetupScene,
  },
];
