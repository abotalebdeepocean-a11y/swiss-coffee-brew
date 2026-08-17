import { useId } from "react";
import { cn } from "@/lib/utils";

/** Architectural emblem — three overlapping towers with arched tops, in gold. */
export function Emblem({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const grad = `mh-emblem-${uid}`;

  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient
          id={grad}
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f0d98c" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#a8842a" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="29.5"
        stroke={`url(#${grad})`}
        strokeWidth="2"
        opacity="0.9"
      />
      {/* left tower */}
      <path
        d="M17 46 V33 Q17 28 21 28 Q25 28 25 33 V46 Z"
        fill={`url(#${grad})`}
        opacity="0.78"
      />
      {/* center tower */}
      <path
        d="M26 46 V22 Q26 16 32 16 Q38 16 38 22 V46 Z"
        fill={`url(#${grad})`}
      />
      {/* right tower */}
      <path
        d="M39 46 V29 Q39 24.5 43 24.5 Q47 24.5 47 29 V46 Z"
        fill={`url(#${grad})`}
        opacity="0.78"
      />
    </svg>
  );
}

/** Circular gold monogram used as the executive avatar (KH). */
export function Monogram({
  className,
  textClassName,
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full border border-mh-gold/60 bg-[radial-gradient(circle_at_30%_25%,#16233c,#080d18_70%)] shadow-[0_0_30px_rgba(212,175,55,0.18)]",
        className,
      )}
    >
      <span
        className={cn(
          "gold-gradient-text select-none font-black leading-none tracking-[0.18em]",
          textClassName,
        )}
        dir="ltr"
      >
        KH
      </span>
    </div>
  );
}

/** Thin gold divider line with a diamond in the middle. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-mh-gold/40 to-transparent" />
      <span className="size-1.5 rotate-45 bg-mh-gold/80" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-mh-gold/40 to-transparent" />
    </div>
  );
}
