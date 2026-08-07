import { useId, type CSSProperties } from "react";

export type BlendVariant = "premium" | "intenso" | "classic";

const BLEND_META: Record<
  BlendVariant,
  {
    label: string;
    accent: string;
    accentDark: string;
    blendText: string;
    flavor: string;
    roast: string;
    character: "cat" | "gorilla" | "mandrill";
  }
> = {
  premium: {
    label: "PREMIUM",
    accent: "#c9a227",
    accentDark: "#141210",
    blendText: "ESPRESSO BLEND",
    flavor: "Rich & Bold Flavor",
    roast: "FRESH DARK ROAST",
    character: "cat",
  },
  intenso: {
    label: "INTENSO",
    accent: "#d03b1e",
    accentDark: "#ffffff",
    blendText: "INTENSO BLEND",
    flavor: "Bold & Intense",
    roast: "FRESH DARK ROAST",
    character: "gorilla",
  },
  classic: {
    label: "CLASSIC",
    accent: "#002fa7",
    accentDark: "#ffffff",
    blendText: "CLASSIC BLEND",
    flavor: "Smooth & Fruity",
    roast: "FRESH MEDIUM ROAST",
    character: "mandrill",
  },
};

export const BAG_VIEWBOX = "0 0 480 700";

const BLEND_BY_SLUG: Record<string, BlendVariant> = {
  "rovento-premium": "premium",
  "rovento-intenso": "intenso",
  "rovento-classic": "classic",
};

/** Maps a product slug to the matching bag artwork variant. */
export function blendVariantFor(slug: string): BlendVariant {
  return BLEND_BY_SLUG[slug] ?? "premium";
}

/* ================================================================== */
/* Characters — the illustrated brand animals                          */
/* ================================================================== */

/** Premium — the curious cat: sitting cross-legged, holding a coffee cup. */
function CatCharacter() {
  return (
    <g>
      {/* abstract shapes — magenta / blue / gold */}
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
      <circle cx="238" cy="348" r="30" fill="#c9a227" opacity="0.35" />
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
      {/* ears */}
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
      <path d="M 206 302 L 202 278 L 222 296 Z" fill="#d4267e" />
      <path d="M 274 302 L 278 278 L 258 296 Z" fill="#d4267e" />
      {/* glowing white eyes */}
      <ellipse cx="221" cy="334" rx="8" ry="10" fill="#ffffff" stroke="#1c160f" strokeWidth="2" />
      <ellipse cx="259" cy="334" rx="8" ry="10" fill="#ffffff" stroke="#1c160f" strokeWidth="2" />
      <circle cx="223" cy="335" r="3" fill="#1c160f" />
      <circle cx="257" cy="335" r="3" fill="#1c160f" />
      {/* nose + mouth */}
      <path d="M 235 348 L 245 348 L 240 355 Z" fill="#d4267e" />
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
      {/* espresso cup + steam */}
      <g transform="translate(222 414)">
        <path d="M 0 0 L 36 0 L 32 24 L 4 24 Z" fill="#ffffff" stroke="#1c160f" strokeWidth="2.5" />
        <path
          d="M 36 4 C 48 4 48 20 32 20"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <ellipse cx="18" cy="0" rx="18" ry="4" fill="#3a2414" />
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

/** Intenso — the powerful gorilla. */
function GorillaCharacter() {
  return (
    <g>
      <ellipse
        cx="170"
        cy="380"
        rx="50"
        ry="34"
        fill="#d03b1e"
        opacity="0.4"
        transform="rotate(-16 170 380)"
      />
      <ellipse
        cx="312"
        cy="400"
        rx="52"
        ry="34"
        fill="#8a2a12"
        opacity="0.4"
        transform="rotate(14 312 400)"
      />
      <circle cx="240" cy="346" r="28" fill="#d03b1e" opacity="0.3" />
      {/* shoulders */}
      <path
        d="M 176 470 C 176 410 200 392 240 392 C 280 392 304 410 304 470 Z"
        fill="#241c14"
        stroke="#0f0a06"
        strokeWidth="3"
      />
      {/* head */}
      <ellipse cx="240" cy="352" rx="56" ry="50" fill="#2e241a" stroke="#0f0a06" strokeWidth="3" />
      {/* ears */}
      <circle cx="180" cy="352" r="13" fill="#2e241a" stroke="#0f0a06" strokeWidth="2.5" />
      <circle cx="300" cy="352" r="13" fill="#2e241a" stroke="#0f0a06" strokeWidth="2.5" />
      {/* heavy brow */}
      <path
        d="M 196 322 C 216 308 264 308 284 322"
        stroke="#0f0a06"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      {/* eyes */}
      <ellipse cx="220" cy="338" rx="7" ry="5" fill="#ffffff" />
      <ellipse cx="260" cy="338" rx="7" ry="5" fill="#ffffff" />
      <circle cx="222" cy="339" r="2.5" fill="#0f0a06" />
      <circle cx="258" cy="339" r="2.5" fill="#0f0a06" />
      {/* wide nose */}
      <ellipse cx="230" cy="366" rx="9" ry="7" fill="#0f0a06" />
      <ellipse cx="250" cy="366" rx="9" ry="7" fill="#0f0a06" />
      {/* mouth */}
      <path
        d="M 222 388 C 232 394 248 394 258 388"
        stroke="#0f0a06"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Classic — the creative mandrill with its colorful face. */
function MandrillCharacter() {
  return (
    <g>
      <ellipse
        cx="170"
        cy="380"
        rx="50"
        ry="34"
        fill="#002fa7"
        opacity="0.4"
        transform="rotate(-16 170 380)"
      />
      <ellipse
        cx="312"
        cy="400"
        rx="52"
        ry="34"
        fill="#c9a227"
        opacity="0.4"
        transform="rotate(14 312 400)"
      />
      {/* shoulders */}
      <path
        d="M 180 470 C 180 410 205 394 240 394 C 275 394 300 410 300 470 Z"
        fill="#1c1c22"
        stroke="#0c0c10"
        strokeWidth="3"
      />
      {/* head */}
      <ellipse cx="240" cy="354" rx="54" ry="48" fill="#2b2b33" stroke="#0c0c10" strokeWidth="3" />
      {/* ears */}
      <circle cx="182" cy="354" r="12" fill="#2b2b33" stroke="#0c0c10" strokeWidth="2.5" />
      <circle cx="298" cy="354" r="12" fill="#2b2b33" stroke="#0c0c10" strokeWidth="2.5" />
      {/* blue face */}
      <ellipse cx="240" cy="362" rx="36" ry="30" fill="#2f6bff" />
      {/* eyes */}
      <ellipse cx="226" cy="344" rx="6" ry="7" fill="#ffffff" />
      <ellipse cx="254" cy="344" rx="6" ry="7" fill="#ffffff" />
      <circle cx="227" cy="345" r="2.2" fill="#0c0c10" />
      <circle cx="253" cy="345" r="2.2" fill="#0c0c10" />
      {/* red nose ridge */}
      <path d="M 232 356 L 248 356 L 244 376 L 236 376 Z" fill="#d03b1e" />
      {/* cheek grooves */}
      <path
        d="M 210 358 L 222 366 M 270 358 L 258 366"
        stroke="#0c0c10"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* mouth */}
      <path
        d="M 224 382 C 232 388 248 388 256 382"
        stroke="#0c0c10"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* golden crest */}
      <path d="M 214 310 C 230 296 250 296 266 310 C 258 300 222 300 214 310 Z" fill="#c9a227" />
    </g>
  );
}

/* ================================================================== */
/* Bottom badges — 100% ARABICA · RICH AROMA · FULL BODY · DARK ROAST  */
/* ================================================================== */

const BADGES: { top: string; bottom: string; x: number; icon: "bean" | "aroma" | "body" | "roast" }[] = [
  { top: "100%", bottom: "ARABICA", x: 128, icon: "bean" },
  { top: "RICH", bottom: "AROMA", x: 195, icon: "aroma" },
  { top: "FULL", bottom: "BODY", x: 262, icon: "body" },
  { top: "DARK", bottom: "ROAST", x: 329, icon: "roast" },
];

function BadgeIcon({ kind }: { kind: "bean" | "aroma" | "body" | "roast" }) {
  if (kind === "bean") {
    return (
      <g transform="translate(0 1) rotate(32)">
        <ellipse rx="5" ry="8" fill="#c9a227" />
        <path d="M 0 -6 C 2 -2 -2 2 0 6" stroke="#141210" strokeWidth="1.4" fill="none" />
      </g>
    );
  }
  if (kind === "aroma") {
    return (
      <g fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round">
        <path d="M -3 4 C -5 1 -1 -1 -3 -4" />
        <path d="M 3 4 C 1 1 5 -1 3 -4" />
      </g>
    );
  }
  if (kind === "body") {
    return (
      <g>
        <circle r="5" fill="none" stroke="#c9a227" strokeWidth="2" />
        <circle cy="2" r="2.2" fill="#c9a227" />
      </g>
    );
  }
  return (
    <path
      d="M 0 5 C -4 2 -2 -2 0 -5 C 1 -2 1 -1 2 0 C 4 0 5 2 4 5 C 2 6 1 6 0 5 Z"
      fill="#c9a227"
    />
  );
}

/* ================================================================== */
/* The bag                                                             */
/* ================================================================== */

/**
 * ROVENTO stand-up pouch — brand asset recreated as crisp SVG.
 * Charcoal body, gold accents, the illustrated animal character,
 * ESPRESSO BLEND, Rich & Bold Flavor, and the Focus. Brew. Achieve. motto.
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
      <rect x="224" y="50" width="32" height="46" fill="#c9a227" rx="3" />
      <rect x="230" y="56" width="20" height="34" fill="#a88a1f" />

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

        {/* ===== crown-R monogram ===== */}
        <g transform="translate(240 150)">
          <path
            d="M -20 16 L -20 -8 L -10 -20 L 0 -12 L 10 -20 L 20 -8 L 20 16 Z"
            fill="#141210"
            stroke="#c9a227"
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
            fill="#c9a227"
          >
            R
          </text>
        </g>

        {/* ===== ROVENTO wordmark ===== */}
        <text
          x="240"
          y="202"
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
          y="226"
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
          y="244"
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="8.5"
          letterSpacing="3.5"
          fill="#f2efe8"
          opacity="0.72"
        >
          {meta.roast}
        </text>

        {/* ===== character ===== */}
        <g transform="translate(0 22)">
          {meta.character === "cat" && <CatCharacter />}
          {meta.character === "gorilla" && <GorillaCharacter />}
          {meta.character === "mandrill" && <MandrillCharacter />}
        </g>

        {/* ===== blend name ===== */}
        <text
          x="240"
          y="522"
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
          y="540"
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#f2efe8"
          opacity="0.85"
        >
          {meta.flavor}
        </text>

        {/* ===== bottom badges ===== */}
        <line x1="96" y1="556" x2="384" y2="556" stroke="#c9a227" strokeWidth="1.5" opacity="0.5" />
        {BADGES.map((b) => (
          <g key={b.bottom} transform={`translate(${b.x} 592)`}>
            <rect x="-27" y="-16" width="54" height="46" fill="#141210" stroke="rgba(201,162,39,0.45)" strokeWidth="1.5" />
            <g transform="translate(0 -6)">
              <BadgeIcon kind={b.icon} />
            </g>
            <text
              y="22"
              textAnchor="middle"
              fontFamily="'Archivo', sans-serif"
              fontWeight="800"
              fontSize="8.5"
              letterSpacing="1.2"
              fill="#e8dcc8"
            >
              {b.top}
            </text>
            <text
              y="33"
              textAnchor="middle"
              fontFamily="'Archivo', sans-serif"
              fontWeight="700"
              fontSize="7.5"
              letterSpacing="1"
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
        stroke="rgba(201,162,39,0.25)"
        strokeWidth="1.5"
      />

      {/* ================= BLEND SEAL ================= */}
      <rect x="90" y="126" width="108" height="26" fill={meta.accent} />
      <text
        x="144"
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
      <line x1="150" y1="622" x2="330" y2="622" stroke="#c9a227" strokeWidth="1.5" opacity="0.55" />
      <text
        x="240"
        y="642"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="10"
        letterSpacing="3.5"
        fill="#c9a227"
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
        حبوب قهوة محمصة · 250 G
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
