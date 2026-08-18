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
          <stop stopColor="#c4a035" />
          <stop offset="0.5" stopColor="#b89528" />
          <stop offset="1" stopColor="#a07d1e" />
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
      <path
        d="M17 46 V33 Q17 28 21 28 Q25 28 25 33 V46 Z"
        fill={`url(#${grad})`}
        opacity="0.78"
      />
      <path
        d="M26 46 V22 Q26 16 32 16 Q38 16 38 22 V46 Z"
        fill={`url(#${grad})`}
      />
      <path
        d="M39 46 V29 Q39 24.5 43 24.5 Q47 24.5 47 29 V46 Z"
        fill={`url(#${grad})`}
        opacity="0.78"
      />
    </svg>
  );
}

/** Gold monogram circle with initials — used as signature avatar. */
export function ChairmanAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "shrink-0 grid place-items-center rounded-full border-2 border-mh-gold bg-mh-black",
        className,
      )}
    >
      <span className="text-lg font-black text-mh-gold">خ</span>
    </div>
  );
}

/** Thin gold divider line with a diamond in the middle. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-px flex-1 bg-mh-black/8" />
      <span className="size-1.5 rotate-45 bg-mh-gold" />
      <span className="h-px flex-1 bg-mh-black/8" />
    </div>
  );
}
