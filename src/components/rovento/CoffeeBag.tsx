import { useId, type CSSProperties } from "react";

export type BlendVariant = "premium" | "intenso" | "classic";

const BLEND_META: Record<
  BlendVariant,
  { label: string; accent: string; accentDark: string }
> = {
  premium: { label: "PREMIUM", accent: "#c9a227", accentDark: "#1c160f" },
  intenso: { label: "INTENSO", accent: "#d03b1e", accentDark: "#ffffff" },
  classic: { label: "CLASSIC", accent: "#002fa7", accentDark: "#ffffff" },
};

export const BAG_VIEWBOX = "0 0 480 700";

const BLEND_BY_SLUG: Record<string, BlendVariant> = {
  "mish-premium": "premium",
  "mish-intenso": "intenso",
  "mish-classic": "classic",
};

/** Maps a product slug to the matching bag artwork variant. */
export function blendVariantFor(slug: string): BlendVariant {
  return BLEND_BY_SLUG[slug] ?? "premium";
}

/**
 * ROVENTO MISH stand-up pouch — brand asset recreated as crisp SVG.
 * Left half matte black, right half rust-terracotta, split down the middle.
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
      aria-label={`ROVENTO MISH ${seal} coffee bag`}
    >
      <defs>
        <linearGradient id={`${uid}-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#181818" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
        <linearGradient id={`${uid}-right`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#96512c" />
          <stop offset="100%" stopColor="#75331a" />
        </linearGradient>
        <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.09" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={`${uid}-body`}>
          <path d="M 84 118 C 58 128 54 150 54 192 L 54 480 C 54 566 108 656 172 660 L 308 660 C 372 656 426 566 426 480 L 426 192 C 426 150 422 128 396 118 Z" />
        </clipPath>
        <clipPath id={`${uid}-cup`}>
          <circle cx="240" cy="452" r="72" />
        </clipPath>
        <path
          id={`${uid}-ring`}
          d="M 344 178 m -33 0 a 33 33 0 1 1 66 0 a 33 33 0 1 1 -66 0"
        />
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
      <rect x="224" y="50" width="32" height="46" fill="#d8d3c8" rx="3" />
      <rect x="230" y="56" width="20" height="34" fill="#a89f8d" />

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
        <rect x="0" y="110" width="240" height="560" fill={`url(#${uid}-left)`} />
        <rect x="240" y="110" width="240" height="560" fill={`url(#${uid}-right)`} />
        <line
          x1="240"
          y1="118"
          x2="240"
          y2="660"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="2.5"
        />
        <rect x="54" y="118" width="372" height="545" fill={`url(#${uid}-shine)`} />

        {/* faint pharaonic line-art — left half */}
        <g stroke="#f2efe8" opacity="0.1" fill="none" strokeLinecap="round">
          <path d="M 118 470 l 0 26 M 118 470 l -7 8 M 118 470 l 7 8" />
          <circle cx="118" cy="462" r="6" />
          <path d="M 96 478 l 0 18 M 92 484 l 8 0 M 96 492 l 8 0" />
          <path d="M 138 492 c -8 -4 -8 -12 0 -14 c 8 2 8 10 0 14 Z" />
          <path d="M 160 468 l 14 0 M 164 462 l 6 0 M 162 474 l 6 0" />
        </g>

        {/* faint classical columns — right half */}
        <g stroke="#f2efe8" opacity="0.14" fill="none">
          <g>
            <rect x="284" y="436" width="8" height="56" />
            <rect x="280" y="430" width="16" height="7" />
            <rect x="280" y="490" width="16" height="5" />
          </g>
          <g>
            <rect x="302" y="446" width="7" height="46" />
            <rect x="298" y="440" width="15" height="7" />
            <rect x="298" y="490" width="15" height="5" />
          </g>
          <g>
            <rect x="320" y="438" width="8" height="54" />
            <rect x="316" y="432" width="16" height="7" />
            <rect x="316" y="490" width="16" height="5" />
          </g>
        </g>
      </g>
      <path
        d="M 84 118 C 58 128 54 150 54 192 L 54 480 C 54 566 108 656 172 660 L 308 660 C 372 656 426 566 426 480 L 426 192 C 426 150 422 128 396 118 Z"
        fill="none"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1.5"
      />

      {/* ================= BLEND SEAL ================= */}
      <g>
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
      </g>

      {/* ================= STAMP ================= */}
      <g>
        <circle
          cx="344"
          cy="178"
          r="33"
          fill="rgba(28,10,4,0.4)"
          stroke="#e8dcc8"
          strokeWidth="2"
        />
        <text fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill="#e8dcc8" letterSpacing="1.5">
          <textPath href={`#${uid}-ring`} startOffset="50%" textAnchor="middle">
            ROVENTO ROASTERY · EST MISH
          </textPath>
        </text>
        <text
          x="344"
          y="172"
          textAnchor="middle"
          fontFamily="'IBM Plex Sans Arabic', sans-serif"
          fontWeight="700"
          fontSize="13"
          fill="#e8dcc8"
        >
          محمص
        </text>
        <text
          x="344"
          y="190"
          textAnchor="middle"
          fontFamily="'IBM Plex Sans Arabic', sans-serif"
          fontWeight="700"
          fontSize="13"
          fill="#e8dcc8"
        >
          مصر
        </text>
      </g>

      {/* ================= MISH BLOB + WORDMARK ================= */}
      <path
        d="M 148 266 C 182 250 300 248 330 264 C 358 278 354 300 342 310 C 328 324 306 331 240 333 C 172 331 148 322 136 310 C 124 298 120 282 148 266 Z"
        fill="#e8dcc8"
      />
      {/* bean trio */}
      <g>
        <g transform="translate(214 272) rotate(-28)">
          <ellipse cx="0" cy="0" rx="8" ry="11.5" fill="#2a2118" />
          <path d="M 0 -10 C 3 -4 -3 4 0 10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" fill="none" />
        </g>
        <g transform="translate(266 272) rotate(28)">
          <ellipse cx="0" cy="0" rx="8" ry="11.5" fill="#2a2118" />
          <path d="M 0 -10 C 3 -4 -3 4 0 10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" fill="none" />
        </g>
        <g transform="translate(240 246)">
          <ellipse cx="0" cy="0" rx="8" ry="11.5" fill="#2a2118" />
          <path d="M 0 -10 C 3 -4 -3 4 0 10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" fill="none" />
        </g>
      </g>
      <text
        x="240"
        y="306"
        textAnchor="middle"
        fontFamily="'Archivo', sans-serif"
        fontWeight="900"
        fontSize="42"
        letterSpacing="0.3em"
        fill="#1c160f"
      >
        MISH
      </text>
      <text
        x="240"
        y="352"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontWeight="700"
        fontSize="19"
        fill="#f2efe8"
      >
        مش قهوة عادية
      </text>
      <text
        x="240"
        y="368"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="9"
        letterSpacing="4"
        fill="#f2efe8"
        opacity="0.85"
      >
        NOT ORDINARY COFFEE
      </text>

      {/* ================= SPLIT CREMA CUP ================= */}
      <g>
        <circle cx="240" cy="452" r="78" fill="#e4dcc9" />
        <circle cx="240" cy="452" r="72" fill="#141414" />
        <g clipPath={`url(#${uid}-cup)`}>
          <rect x="0" y="300" width="240" height="300" fill="#0d0d0d" />
          <path
            d="M 240 380 A 72 72 0 0 1 312 452 A 72 72 0 0 1 240 524 Z"
            fill="#b0793f"
          />
          <circle cx="272" cy="432" r="21" fill="#c08a4a" />
          <circle cx="302" cy="482" r="25" fill="#a96a32" />
          <circle cx="264" cy="498" r="14" fill="#c08a4a" />
          <circle cx="286" cy="446" r="10" fill="#c98f4c" />
          <circle cx="308" cy="450" r="7" fill="#d9a85c" />
          <circle cx="294" cy="462" r="5" fill="#e3bc7e" />
          <circle cx="284" cy="478" r="4" fill="#e3bc7e" />
          <circle cx="256" cy="466" r="6" fill="#a96a32" />
          <circle cx="276" cy="516" r="5" fill="#c98f4c" />
          <circle cx="300" cy="508" r="4" fill="#d9a85c" />
          <line x1="240" y1="380" x2="240" y2="524" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
          {/* hieroglyphics in the dark half of the cup */}
          <g stroke="#f2efe8" opacity="0.16" fill="none" strokeLinecap="round">
            <path d="M 200 440 l 0 20 M 200 440 l -6 6 M 200 440 l 6 6" />
            <circle cx="200" cy="433" r="5" />
            <path d="M 178 452 c -7 -4 -7 -11 0 -13 c 7 2 7 9 0 13 Z" />
            <path d="M 216 468 l 12 0" />
            <path d="M 188 478 l 0 14 M 184 484 l 8 0 M 188 490 l 8 0" />
          </g>
          {/* columns in the crema half of the cup */}
          <g stroke="#f2efe8" opacity="0.15" fill="none">
            <g>
              <rect x="270" y="398" width="6" height="34" />
              <rect x="267" y="393" width="12" height="6" />
              <rect x="267" y="430" width="12" height="4" />
            </g>
            <g>
              <rect x="284" y="404" width="5" height="28" />
              <rect x="281" y="399" width="11" height="6" />
              <rect x="281" y="430" width="11" height="4" />
            </g>
          </g>
        </g>
        <circle cx="240" cy="452" r="72" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        <path
          d="M 314 420 C 368 412 372 490 312 482"
          stroke="#e4dcc9"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="240" cy="452" r="78" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" />
      </g>

      {/* ================= ARABICA / ROBUSTA ================= */}
      <text
        x="200"
        y="548"
        textAnchor="middle"
        fontFamily="'Archivo', sans-serif"
        fontWeight="800"
        fontSize="14"
        letterSpacing="3"
        fill="#ffffff"
      >
        ARABICA
      </text>
      <text
        x="200"
        y="563"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#e8dcc8"
      >
        أرابيكا
      </text>
      <text
        x="200"
        y="578"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontSize="10.5"
        fill="#f2efe8"
        opacity="0.92"
      >
        نعومة، توازن،
      </text>
      <text
        x="200"
        y="591"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontSize="10.5"
        fill="#f2efe8"
        opacity="0.92"
      >
        نكهات راقية
      </text>

      <text
        x="280"
        y="548"
        textAnchor="middle"
        fontFamily="'Archivo', sans-serif"
        fontWeight="800"
        fontSize="14"
        letterSpacing="3"
        fill="#ffffff"
      >
        ROBUSTA
      </text>
      <text
        x="280"
        y="563"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#e8dcc8"
      >
        روبوستا
      </text>
      <text
        x="280"
        y="578"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontSize="10.5"
        fill="#f2efe8"
        opacity="0.92"
      >
        قوة، كثافة،
      </text>
      <text
        x="280"
        y="591"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontSize="10.5"
        fill="#f2efe8"
        opacity="0.92"
      >
        كريما غنية
      </text>

      {/* ================= BOTTOM BEANS ================= */}
      <g>
        <g transform="translate(186 650) rotate(18)">
          <ellipse cx="0" cy="0" rx="9" ry="13" fill="#241a10" />
          <path d="M 0 -11 C 3.5 -5 -3.5 5 0 11" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" fill="none" />
        </g>
        <g transform="translate(220 657) rotate(-14)">
          <ellipse cx="0" cy="0" rx="8" ry="11.5" fill="#241a10" />
          <path d="M 0 -10 C 3 -4 -3 4 0 10" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" fill="none" />
        </g>
        <g transform="translate(260 657) rotate(12)">
          <ellipse cx="0" cy="0" rx="8" ry="11.5" fill="#1d140c" />
          <path d="M 0 -10 C 3 -4 -3 4 0 10" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" fill="none" />
        </g>
        <g transform="translate(294 650) rotate(-20)">
          <ellipse cx="0" cy="0" rx="9" ry="13" fill="#1d140c" />
          <path d="M 0 -11 C 3.5 -5 -3.5 5 0 11" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" fill="none" />
        </g>
      </g>

      {/* ================= FOOTER ================= */}
      <line x1="150" y1="616" x2="330" y2="616" stroke="#f2efe8" strokeWidth="1.5" opacity="0.55" />
      <g stroke="#f2efe8" strokeWidth="2" fill="none" strokeLinecap="round">
        <circle cx="240" cy="629" r="7" />
        <path d="M 249 627 a 6 6 0 0 1 0 4" />
        <path d="M 235 619 c -2 -3 2 -3 0 -6 M 241 618 c -2 -3 2 -3 0 -6" opacity="0.8" />
      </g>
      <text
        x="240"
        y="652"
        textAnchor="middle"
        fontFamily="'IBM Plex Sans Arabic', sans-serif"
        fontWeight="600"
        fontSize="13"
        fill="#f2efe8"
      >
        حبوب قهوة محمصة
      </text>
      <text
        x="240"
        y="668"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="11"
        letterSpacing="3"
        fill="#f2efe8"
        opacity="0.85"
      >
        250 G
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
        stroke="#d03b1e"
        strokeWidth="5"
        opacity="0.85"
      />
      <rect x="90" y="126" width="108" height="26" fill="#d03b1e" />
    </svg>
  );
}
