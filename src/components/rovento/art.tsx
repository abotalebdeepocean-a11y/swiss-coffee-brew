import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Coffee bean                                                        */
/* ------------------------------------------------------------------ */
export function Bean({
  color = "#3a2b1c",
  className,
  style,
  x,
  y,
  width,
  height,
}: {
  color?: string;
  className?: string;
  style?: CSSProperties;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      viewBox="0 0 40 58"
      x={x}
      y={y}
      width={width}
      height={height}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <ellipse cx="20" cy="29" rx="17" ry="26" fill={color} />
      <path
        d="M20 5 C 27 22 13 36 20 53"
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="13.5"
        cy="18"
        rx="4.5"
        ry="8.5"
        fill="rgba(255,255,255,0.16)"
        transform="rotate(-24 13.5 18)"
      />
    </svg>
  );
}

export const BEAN_COLORS = ["#332418", "#4a3523", "#5d4430", "#241a10", "#6b4e33"];

/* ------------------------------------------------------------------ */
/* Steam wisps                                                        */
/* ------------------------------------------------------------------ */
let steamUid = 0;

export function Steam({
  className,
  delay = 0,
  opacity = 0.55,
  color = "#f2efe8",
  x,
  y,
  width,
  height,
}: {
  className?: string;
  delay?: number;
  opacity?: number;
  color?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  const id = `steam-${++steamUid}`;
  return (
    <svg
      viewBox="0 0 44 64"
      x={x}
      y={y}
      width={width}
      height={height}
      className={cn("animate-steam", className)}
      style={
        {
          animationDelay: `${delay}s`,
          "--steam-opacity": opacity,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="28%" stopColor={color} stopOpacity="0.75" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M22 64 C 13 50 31 40 22 26 C 15 16 26 7 22 0"
        stroke={`url(#${id})`}
        strokeWidth="3.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M31 62 C 24 50 38 42 31 30"
        stroke={`url(#${id})`}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M12 60 C 6 48 18 41 11 29"
        stroke={`url(#${id})`}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Top-view crema cup (split dark/crema)                              */
/* ------------------------------------------------------------------ */
export function CremaCup({
  className,
  style,
  x,
  y,
  width,
  height,
}: {
  className?: string;
  style?: CSSProperties;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `${uid}-cupclip`;
  const crema = [
    [276, 446, 11, "#c98f4c"],
    [298, 464, 8, "#d9a85c"],
    [308, 494, 13, "#b57a3d"],
    [270, 512, 9, "#c98f4c"],
    [290, 526, 6, "#d9a85c"],
    [318, 476, 5, "#e3bc7e"],
    [252, 468, 6, "#a96a32"],
    [286, 488, 4, "#e3bc7e"],
    [304, 516, 5, "#c98f4c"],
  ] as const;
  return (
    <svg
      viewBox="0 0 200 200"
      x={x}
      y={y}
      width={width}
      height={height}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="100" cy="100" r="80" />
        </clipPath>
      </defs>
      {/* ceramic wall */}
      <circle cx="100" cy="100" r="80" fill="#e4dcc9" />
      <circle cx="100" cy="100" r="74" fill="#141414" />
      {/* left: opaque dark coffee */}
      <circle cx="100" cy="100" r="74" fill="#0d0d0d" clipPath={`url(#${clip})`} />
      <rect x="100" y="26" width="74" height="148" fill="#a96a32" />
      {/* crema base right */}
      <path
        d="M100 26 A 74 74 0 0 1 174 100 A 74 74 0 0 1 100 174 Z"
        fill="#b0793f"
      />
      {/* crema pools + bubbles */}
      <circle cx="122" cy="86" r="22" fill="#c08a4a" />
      <circle cx="144" cy="120" r="26" fill="#a96a32" />
      <circle cx="118" cy="140" r="18" fill="#c08a4a" />
      {crema.map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c} />
      ))}
      <circle cx="118" cy="72" r="3" fill="#e3bc7e" opacity="0.8" />
      <circle cx="156" cy="98" r="3" fill="#e3bc7e" opacity="0.7" />
      <circle cx="138" cy="152" r="2.5" fill="#e3bc7e" opacity="0.7" />
      {/* center seam */}
      <line x1="100" y1="26" x2="100" y2="174" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
      {/* handle */}
      <path
        d="M 172 128 C 212 118 214 172 174 162"
        stroke="#e4dcc9"
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 172 128 C 212 118 214 172 174 162"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* WhatsApp glyph                                                     */
/* ------------------------------------------------------------------ */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Brand logo — uses the real Rovento logo image                       */
/* ------------------------------------------------------------------ */
export function Logo({ className, size = "default" }: { className?: string; size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "h-8 md:h-9",
    default: "h-10 md:h-12",
    large: "h-14 md:h-18",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img
        src="/images/rovento-logo.webp"
        alt="ROVENTO Coffee Logo"
        className={cn(
          "w-auto object-contain",
          sizeClasses[size],
        )}
        loading="eager"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small line-art marks used across sections                          */
/* ------------------------------------------------------------------ */
export function IntensityMeter({
  value,
  max = 5,
  color = "#d03b1e",
  className,
}: {
  value: number;
  max?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)} dir="ltr">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-4"
          style={{
            backgroundColor: i < value ? color : "rgba(242,239,232,0.14)",
          }}
        />
      ))}
    </div>
  );
}

export function Stars({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-3.5"
          aria-hidden="true"
        >
          <path
            d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.11l-4.94 2.6.94-5.5-4-3.9 5.53-.8z"
            fill={i < Math.round(value) ? "#c9a227" : "rgba(242,239,232,0.18)"}
          />
        </svg>
      ))}
    </div>
  );
}
