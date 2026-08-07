import {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { CoffeeBag, type BlendVariant } from "./CoffeeBag";

const EXTENSIONS = [".png", ".jpg", ".webp"] as const;

function candidatesFor(base: string): string[] {
  return EXTENSIONS.map((ext) => `${base}${ext}`);
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
}: {
  image?: string;
  variant?: BlendVariant;
  label?: string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
  eager?: boolean;
}) {
  const { src, onError } = useImageCandidates(image);

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? "ROVENTO coffee bag"}
        loading={eager ? "eager" : "lazy"}
        onError={onError}
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
 */
export function SlideVisual({
  image,
  fallback,
}: {
  image?: string;
  fallback: () => ReactNode;
}) {
  const { src, onError } = useImageCandidates(image);

  if (src) {
    return (
      <>
        <img
          src={src}
          alt=""
          onError={onError}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* scrim so the overlay copy stays readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/45" />
      </>
    );
  }
  return <>{fallback()}</>;
}
