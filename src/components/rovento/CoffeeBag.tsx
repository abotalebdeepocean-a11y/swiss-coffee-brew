import { useId, type CSSProperties } from "react";

export type BlendVariant = "premium" | "intenso" | "classic";

type BadgeSpec = {
  top: string;
  bottom: string;
  x: number;
  icon: "drop" | "scale" | "wave" | "flame";
};

const BLEND_META: Record<
  BlendVariant,
  {
    label: string;
    /** لون الجوانب واللمسات — أصفر لبريميم، أحمر لإنتنسو، أزرق لكلاسيك */
    accent: string;
    accentDark: string;
    blendText: string;
    ratio: string;
    blendAr: string;
    roast: string;
    badge: BadgeSpec[];
  }
> = {
  premium: {
    label: "PREMIUM",
    accent: "#c9a227",
    accentDark: "#141210",
    blendText: "PREMIUM BLEND",
    ratio: "70% ARABICA · 30% ROBUSTA",
    blendAr: "خلاطة بريميوم",
    roast: "FRESH MEDIUM ROAST",
    badge: [
      { top: "RICH", bottom: "CREMA", x: 106, icon: "drop" },
      { top: "BALANCED", bottom: "TASTE", x: 177, icon: "scale" },
      { top: "SMOOTH", bottom: "FINISH", x: 248, icon: "wave" },
      { top: "MEDIUM", bottom: "ROAST", x: 319, icon: "flame" },
    ],
  },
  intenso: {
    label: "INTENSO",
    accent: "#d03b1e",
    accentDark: "#ffffff",
    blendText: "INTENSO BLEND",
    ratio: "30% ARABICA · 70% ROBUSTA",
    blendAr: "خلاطة إنتينسو",
    roast: "FRESH DARK ROAST",
    badge: [
      { top: "EXTRA", bottom: "CREMA", x: 106, icon: "drop" },
      { top: "STRONG", bottom: "BODY", x: 177, icon: "scale" },
      { top: "BOLD", bottom: "TASTE", x: 248, icon: "wave" },
      { top: "DARK", bottom: "ROAST", x: 319, icon: "flame" },
    ],
  },
  classic: {
    label: "CLASSIC",
    accent: "#002fa7",
    accentDark: "#ffffff",
    blendText: "CLASSIC BLEND",
    ratio: "50% ARABICA · 50% ROBUSTA",
    blendAr: "خلاطة كلاسيك",
    roast: "FRESH MEDIUM DARK ROAST",
    badge: [
      { top: "RICH", bottom: "CREMA", x: 106, icon: "drop" },
      { top: "WELL", bottom: "BALANCED", x: 177, icon: "scale" },
      { top: "SMOOTH", bottom: "TASTE", x: 248, icon: "wave" },
      { top: "MEDIUM", bottom: "DARK", x: 319, icon: "flame" },
    ],
  },
};

export const BAG_VIEWBOX = "0 0 480 700";

const BLEND_BY_SLUG: Record<string, BlendVariant> = {
  "rovento-bar-intenso-1kg": "intenso",
  "rovento-bar-intenso-500g": "intenso",
  "rovento-premium-1kg": "premium",
  "rovento-premium-500g": "premium",
  "rovento-classic": "classic",
};

/** Maps a product slug to the matching bag artwork variant. */
export function blendVariantFor(slug: string): BlendVariant {
  return BLEND_BY_SLUG[slug] ?? "premium";
}

/* ================================================================== */
/* The mosaic cat — ROVENTO's signature mascot (all three blends)      */
/* ================================================================== */

function CatCharacter({ accent }: { accent: string }) {
  return (
    <g>
      {/* abstract shapes — multicolor mosaic vibe */}
      <ellipse
        cx="168"
        cy="372"
        rx="52"
        ry="34"
        fill="#d4267e"
        opacity="0.45"
        transform="rotate(-18 168 372)"
      />
      <ellipse
        cx="314"
        cy="398"
        rx="56"
        ry="36"
        fill="#2f6bff"
        opacity="0.42"
        transform="rotate(16 314 398)"
      />
      <circle cx="238" cy="348" r="30" fill={accent} opacity="0.35" />
      <circle cx="336" cy="318" r="14" fill="#d4267e" opacity="0.4" />
      <circle cx="146" cy="442" r="12" fill="#2f6bff" opacity="0.4" />

      {/* tail */}
      <path
        d="M 268 448 C 300 452 316 434 304 414"
        stroke="#e8dcc8"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      {/* body (sitting) */}
      <path
        d="M 196 380 C 190 420 196 452 216 462 C 230 468 250 468 264 462 C 284 452 290 420 284 380 Z"
        fill="#e8dcc8"
        stroke="#1c160f"
        strokeWidth="3"
      />
      {/* crossed legs */}
      <ellipse
        cx="220"
        cy="468"
        rx="24"
        ry="12"
        fill="#e8dcc8"
        stroke="#1c160f"
        strokeWidth="3"
        transform="rotate(-12 220 468)"
      />
      <ellipse
        cx="260"
        cy="468"
        rx="24"
        ry="12"
        fill="#e8dcc8"
        stroke="#1c160f"
        strokeWidth="3"
        transform="rotate(12 260 468)"
      />
      {/* head */}
      <circle cx="240" cy="336" r="40" fill="#e8dcc8" stroke="#1c160f" strokeWidth="3" />
      {/* ears — tinted with the blend accent */}
      <path
        d="M 206 306 L 196 268 L 228 296 Z"
        fill="#e8dcc8"
        stroke="#1c160f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 274 306 L 284 268 L 252 296 Z"
        fill="#e8dcc8"
        stroke="#1c160f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M 206 302 L 202 278 L 222 296 Z" fill={accent} />
      <path d="M 274 302 L 278 278 L 258 296 Z" fill={accent} />
      {/* glowing white eyes */}
      <ellipse cx="221" cy="334" rx="8" ry="10" fill="#ffffff" stroke="#1c160f" strokeWidth="2" />
      <ellipse cx="259" cy="334" rx="8" ry="10" fill="#ffffff" stroke="#1c160f" strokeWidth="2" />
      <circle cx="223" cy="335" r="3" fill="#1c160f" />
      <circle cx="257" cy="335" r="3" fill="#1c160f" />
      {/* nose + mouth */}
      <path d="M 235 348 L 245 348 L 240 355 Z" fill={accent} />
      <path
        d="M 240 355 C 236 360 233 358 231 355 M 240 355 C 244 360 247 358 249 355"
        stroke="#1c160f"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* whiskers */}
      <g stroke="#1c160f" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
        <line x1="204" y1="342" x2="172" y2="336" />
        <line x1="204" y1="350" x2="170" y2="352" />
        <line x1="276" y1="342" x2="308" y2="336" />
        <line x1="276" y1="350" x2="310" y2="352" />
      </g>
      {/* paws holding the cup */}
      <ellipse cx="212" cy="426" rx="11" ry="8" fill="#e8dcc8" stroke="#1c160f" strokeWidth="2.5" />
      <ellipse cx="268" cy="426" rx="11" ry="8" fill="#e8dcc8" stroke="#1c160f" strokeWidth="2.5" />
      {/* espresso cup (dark ceramic with accent R) + steam */}
      <g transform="translate(222 414)">
        <path d="M 0 0 L 36 0 L 32 24 L 4 24 Z" fill="#1c1a18" stroke="#1c160f" strokeWidth="2.5" />
        <path
          d="M 36 4 C 48 4 48 20 32 20"
          fill="none"
          stroke="#1c1a18"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <ellipse cx="18" cy="0" rx="18" ry="4" fill="#3a2414" />
        <text
          x="18"
          y="16"
          textAnchor="middle"
          fontFamily="'Archivo', sans-serif"
          fontWeight="900"
          fontSize="10"
          fill={accent}
        >
          R
        </text>
        <path
          d="M 10 -8 C 8 -14 12 -16 10 -22"
          stroke="#f2efe8"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 26 -8 C 24 -14 28 -16 26 -22"
          stroke="#f2efe8"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
    </g>
  );
}

/* ================================================================== */
/* Bottom icon row — per-blend benefits (matches the real bags)        */
/* ================================================================== */

function BadgeIcon({ kind }: { kind: "drop" | "scale" | "wave" | "flame" }) {
  if (kind === "drop") {
    return (
      <path
        d="M 0 -6 C 3 -2 5 1 5 3.5 A 5 5 0 0 1 -5 3.5 C -5 1 -3 -2 0 -6 Z"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    );
  }
  if (kind === "scale") {
    return (
      <g stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round">
        <path d="M -5 0 L 5 0 M 0 -5 L 0 5" />
        <path d="M -5 0 L -3 4 M 5 0 L 3 4 M -3 4 L 3 4" />
      </g>
    );
  }
  if (kind === "wave") {
    return (
      <g fill="none" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round">
        <path d="M -4 4 C -2 0 0 4 2 0" />
        <path d="M 1 2 C 3 -2 5 2 6 -1" opacity="0.7" />
      </g>
    );
  }
  return (
    <g>
      <path
        d="M 0 4 C -4 1 -2 -2 0 -4 C 1 -1 1 0 2 0 C 4 0 5 2 4 4 C 2 5 1 5 0 4 Z"
        fill="#c9a227"
      />
      <circle cy="-4" r="1.6" fill="#c9a227" />
    </g>
  );
}

/* ================================================================== */
/* The bag                                                             */
/* ================================================================== */

/**
 * ROVENTO stand-up pouch — recreated to match the real bags:
 * black body, colored side gussets (gold / red / blue), the mosaic cat,
 * blend name + Arabic name + composition ratio, quality badge, benefits row.
 */
export function CoffeeBag({
  variant = "premium",
  label,
  className,
  style,
  x,
  y,
  width,
  height,
}: {
  variant?: BlendVariant;
  label?: string;
  className?: string;
  style?: CSSProperties;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  const meta = BLEND_META[variant];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const seal = label ?? meta.label;

  return (
    <svg
      viewBox={BAG_VIEWBOX}
      x={x}
      y={y}
      width={width}
      height={height}
      className={className}
      style={style}
      role="img"
      aria-label={`ROVENTO ${seal} coffee bag`}
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23211f" />
          <stop offset="45%" stopColor="#141312" />
          <stop offset="100%" stopColor="#0b0b0b" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.42" r="0.55">
          <stop offset="0%" stopColor="#c9a227" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={`${uid}-gusset`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={meta.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={meta.accent} stopOpacity="0.45" />
        </linearGradient>
        <clipPath id={`${uid}-body`}>
          <path d="M 84 118 C 58 128 54 150 54 192 L 54 480 C 54 566 108 656 172 660 L 308 660 C 372 656 426 566 426 480 L 426 192 C 426 150 422 128 396 118 Z" />
        </clipPath>
      </defs>

      {/* ================= ZIP + BAND ================= */}
      <rect
        x="84"
        y="58"
        width="312"
        height="30"
        fill="#1b1b1b"
        stroke="rgba(255,255,255,0.08)"
      />
      <line x1="92" y1="70" x2="388" y2="70" stroke="#3a3a3a" strokeWidth="2" />
      <line x1="92" y1="77" x2="388" y2="77" stroke="#3a3a3a" strokeWidth="2" />
      <rect x="224" y="50" width="32" height="46" fill={meta.accent} rx="3" />
      <rect x="230" y="56" width="20" height="34" fill={meta.accent} opacity="0.65" />

      <rect x="84" y="90" width="312" height="28" fill="#101010" />
      <text
        x="240"
        y="109"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="10"
        letterSpacing="3"
        fill="#f2efe8"
        opacity="0.9"
      >
        ROVENTO · محمصة مصر
      </text>

      {/* ================= BODY ================= */}
      <g clipPath={`url(#${uid}-body)`}>
        <rect x="0" y="110" width="480" height="560" fill={`url(#${uid}-body)`} />
        <circle cx="240" cy="400" r="260" fill={`url(#${uid}-glow)`} />
        <rect x="54" y="118" width="372" height="545" fill={`url(#${uid}-shine)`} />

        {/* colored side gussets — gold / red / blue */}
        <rect x="54" y="118" width="26" height="545" fill={`url(#${uid}-gusset)`} />
        <rect x="400" y="118" width="26" height="545" fill={`url(#${uid}-gusset)`} />
        <rect x="54" y="118" width="26" height="545" fill="#000000" opacity="0.22" />
        <rect x="400" y="118" width="26" height="545" fill="#000000" opacity="0.22" />

        {/* ===== crown-R monogram ===== */}
        <g transform="translate(240 148)">
          <path
            d="M -20 16 L -20 -8 L -10 -20 L 0 -12 L 10 -20 L 20 -8 L 20 16 Z"
            fill="#141210"
            stroke={meta.accent}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text
            x="0"
            y="10"
            textAnchor="middle"
            fontFamily="'Archivo', sans-serif"
            fontWeight="900"
            fontSize="21"
            fill={meta.accent}
          >
            R
          </text>
        </g>

        {/* ===== ROVENTO wordmark ===== */}
        <text
          x="240"
          y="200"
          textAnchor="middle"
          fontFamily="'Archivo', sans-serif"
          fontWeight="900"
          fontSize="34"
          letterSpacing="0.14em"
          fill="#e8dcc8"
        >
          ROVENTO
        </text>
        <text
          x="240"
          y="224"
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="10.5"
          letterSpacing="8"
          fill={meta.accent}
        >
          COFFEE
        </text>
        <text
          x="240"
          y="242"
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="8.5"
          letterSpacing="3.5"
          fill="#f2efe8"
          opacity="0.72"
        >
          {meta.roast}
        </text>

        {/* ===== the mosaic cat ===== */}
        <g transform="translate(0 22)">
          <CatCharacter accent={meta.accent} />
        </g>

        {/* ===== PREMIUM QUALITY badge ===== */}
        <g transform="translate(330 386)">
          <circle r="47" fill={meta.accent} opacity="0.16" />
          <circle r="42" fill="#141210" stroke={meta.accent} strokeWidth="2" />
          <circle r="37" fill="none" stroke={meta.accent} strokeWidth="0.75" opacity="0.55" />
          <text
            y="-18"
            textAnchor="middle"
            fontFamily="'Archivo', sans-serif"
            fontWeight="800"
            fontSize="7"
            letterSpacing="1.6"
            fill={meta.accent}
          >
            PREMIUM
          </text>
          <text
            y="-8"
            textAnchor="middle"
            fontFamily="'Archivo', sans-serif"
            fontWeight="800"
            fontSize="7"
            letterSpacing="1.6"
            fill={meta.accent}
          >
            QUALITY
          </text>
          <text
            y="8"
            textAnchor="middle"
            fontFamily="'Archivo', sans-serif"
            fontWeight="900"
            fontSize="12"
            fill="#f2efe8"
          >
            100%
          </text>
          <text
            y="20"
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="5.6"
            letterSpacing="0.6"
            fill="#f2efe8"
            opacity="0.8"
          >
            ARABICA &
          </text>
          <text
            y="29"
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="5.6"
            letterSpacing="0.6"
            fill="#f2efe8"
            opacity="0.8"
          >
            ROBUSTA
          </text>
        </g>

        {/* ===== blend name + ratio + Arabic ===== */}
        <text
          x="240"
          y="512"
          textAnchor="middle"
          fontFamily="'Archivo', sans-serif"
          fontWeight="800"
          fontSize="15"
          letterSpacing="4.5"
          fill={meta.accent}
        >
          {meta.blendText}
        </text>
        <text
          x="240"
          y="530"
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="8.5"
          letterSpacing="1.4"
          fill="#f2efe8"
          opacity="0.9"
        >
          {meta.ratio}
        </text>
        <text
          x="240"
          y="546"
          textAnchor="middle"
          fontFamily="'IBM Plex Sans Arabic', sans-serif"
          fontWeight="700"
          fontSize="12"
          fill="#f2efe8"
        >
          {meta.blendAr}
        </text>

        {/* ===== benefits row ===== */}
        <line x1="96" y1="560" x2="384" y2="560" stroke={meta.accent} strokeWidth="1.5" opacity="0.5" />
        {meta.badge.map((b) => (
          <g key={b.top + b.bottom} transform={`translate(${b.x} 596)`}>
            <rect x="-33" y="-17" width="66" height="48" fill="#141210" stroke={meta.accent} strokeWidth="1.3" opacity="0.9" />
            <g transform="translate(0 -7)">
              <BadgeIcon kind={b.icon} />
            </g>
            <text
              y="23"
              textAnchor="middle"
              fontFamily="'Archivo', sans-serif"
              fontWeight="800"
              fontSize="7.4"
              letterSpacing="0.9"
              fill="#e8dcc8"
            >
              {b.top}
            </text>
            <text
              y="33"
              textAnchor="middle"
              fontFamily="'Archivo', sans-serif"
              fontWeight="700"
              fontSize="7"
              letterSpacing="0.7"
              fill={meta.accent}
            >
              {b.bottom}
            </text>
          </g>
        ))}
      </g>

      {/* bag outline */}
      <path
        d="M 84 118 C 58 128 54 150 54 192 L 54 480 C 54 566 108 656 172 660 L 308 660 C 372 656 426 566 426 480 L 426 192 C 426 150 422 128 396 118 Z"
        fill="none"
        stroke="rgba(242,239,232,0.14)"
        strokeWidth="1.5"
      />

      {/* ================= BLEND SEAL ================= */}
      <rect x="90" y="126" width="112" height="26" fill={meta.accent} />
      <text
        x="146"
        y="144"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="600"
        fontSize="10.5"
        letterSpacing="2.5"
        fill={meta.accentDark}
      >
        {seal}
      </text>

      {/* ================= FOOTER ================= */}
      <line x1="150" y1="622" x2="330" y2="622" stroke={meta.accent} strokeWidth="1.5" opacity="0.55" />
      <text
        x="240"
        y="642"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="10"
        letterSpacing="3.5"
        fill={meta.accent}
      >
        FOCUS · BREW · ACHIEVE
      </text>
      <text
        x="240"
        y="664"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontWeight="600"
        fontSize="12.5"
        fill="#f2efe8"
      >
        حبوب قهوة محمصة طازجة
      </text>
    </svg>
  );
}

/** Silhouette-only pouch used inside banner scenes */
export function BagSilhouette({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox={BAG_VIEWBOX} className={className} style={style} aria-hidden="true">
      <path
        d="M 84 118 C 58 128 54 150 54 192 L 54 480 C 54 566 108 656 172 660 L 308 660 C 372 656 426 566 426 480 L 426 192 C 426 150 422 128 396 118 Z"
        fill="#0c0c0c"
        stroke="rgba(242,239,232,0.22)"
        strokeWidth="2"
      />
      <path
        d="M 84 118 C 58 128 54 150 54 192 L 54 480 C 54 566 108 656 172 660 L 308 660 C 372 656 426 566 426 480 L 426 192 C 426 150 422 128 396 118 Z"
        fill="none"
        stroke="#c9a227"
        strokeWidth="5"
        opacity="0.85"
      />
      <rect x="90" y="126" width="108" height="26" fill="#c9a227" />
    </svg>
  );
}
