import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Swiss-style section heading: numbered mono kicker + strong Arabic title */
export function SectionHeading({
  index,
  kicker,
  title,
  desc,
  className,
  align = "start",
}: {
  index?: string;
  kicker: string;
  title: ReactNode;
  desc?: string;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        {index && (
          <span className="font-mono text-xs tracking-[0.3em] text-rv-red">
            {index}
          </span>
        )}
        <span className="h-px w-8 bg-rv-red" />
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-bold leading-snug text-balance md:text-[42px] md:leading-[1.25]">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {desc}
        </p>
      )}
    </div>
  );
}
