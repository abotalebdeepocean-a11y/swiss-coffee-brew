import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 md:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-mh-gold/30 bg-mh-gold/5 px-4 py-1.5 text-xs font-bold tracking-wide text-mh-gold-soft">
        <span className="size-1.5 rotate-45 bg-mh-gold" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-6 text-balance text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-pretty text-base leading-8 text-white/50 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
