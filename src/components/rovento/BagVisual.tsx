import {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { CoffeeBag, type BlendVariant } from "./CoffeeBag";

const EXTENSIONS = [".webp", ".png", ".jpg"] as const;

function candidatesFor(base: string): string[] {
  return EXTENSIONS.map((ext) => `${base}${ext}`);
}

/**
 * أفضل مسار معروف لصورة على القرص — يُستخدم في preload داخل index.html
 * حتى لا يبدأ المتصفح التنزيل إلا بعد تشغيل JS. (اختياري: استخدمه لتوليد
 * قائمة preload محدثة دائمًا عند تغيير امتدادات الملفات.)
 */
export function bestKnownCandidate(base: string): string {
  return `${base}${EXTENSIONS[0]}`;
}

/**
 * Tries `base.png`, `base.jpg`, `base.webp` in order and returns `null`
 * once all of them fail — the caller then renders the SVG fallback art.
 * Used so real photos replace the SVG art the moment they exist, while a
 * missing file (or wrong extension) never shows a broken image.
 */
export function useImageCandidates(base?: string): {
  src: string | null;
  onError: () => void;
} {
  const candidates = useMemo(
    () => (base ? candidatesFor(base) : []),
    [base],
  );
  const [attempt, setAttempt] = useState(0);
  const [prevBase, setPrevBase] = useState(base);

  // Reset the retry chain when the base path changes (render-time state
  // adjustment — the React-sanctioned replacement for setState-in-effect).
  if (base !== prevBase) {
    setPrevBase(base);
    setAttempt(0);
  }

  const src = attempt < candidates.length ? candidates[attempt] : null;
  const onError = useCallback(() => setAttempt((a) => a + 1), []);
  return { src, onError };
}

/**
 * Real bag photo when `image` is set and reachable; otherwise the SVG bag.
 */
export function BagVisual({
  image,
  variant = "premium",
  label,
  className,
  style,
  alt,
  eager = false,
  width,
  height,
}: {
  image?: string;
  variant?: BlendVariant;
  label?: string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
  eager?: boolean;
  /** عرض العرض بالبكسل (لحجز المساحة ومنع CLS) */
  width?: number;
  /** ارتفاع العرض بالبكسل (لحجز المساحة ومنع CLS) */
  height?: number;
}) {
  const { src, onError } = useImageCandidates(image);

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? "ROVENTO coffee bag"}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={onError}
        width={width}
        height={height}
        className={className}
        style={style}
      />
    );
  }
  return (
    <CoffeeBag variant={variant} label={label} className={className} style={style} />
  );
}

/**
 * Full-bleed banner photo for the homepage slider; keeps the animated SVG
 * scene as the fallback so the slider is never empty.
 *
 * `src`/`onError` come from the parent's `useImageCandidates` so the parent
 * can react to whether the real photo loaded (e.g. hide its text overlay
 * when the banner carries baked-in copy). `scrim` picks a heavier gradient
 * for overlay text or a light one for ready-made ad banners.
 */
export function SlideVisual({
  src,
  onError,
  fallback,
  scrim = "auto",
}: {
  src: string | null;
  onError: () => void;
  fallback: () => ReactNode;
  scrim?: "auto" | "soft";
}) {
  if (src) {
    return (
      <>
      <img
        src={src}
        alt=""
        onError={onError}
        loading="lazy"
        decoding="async"
        width={2243}
        height={701}
        className="absolute inset-0 h-full w-full object-cover"
      />
        {scrim === "soft" ? (
          /* light scrim — the banner already carries its own copy */
          <div className="absolute inset-0 bg-black/15" />
        ) : (
          /* scrim so the overlay copy stays readable on any photo */
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/45" />
        )}
      </>
    );
  }
  return <>{fallback()}</>;
}
