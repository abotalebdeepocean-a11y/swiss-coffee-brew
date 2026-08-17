import { Quote } from "lucide-react";
import { CHAIRMAN_MESSAGE, COMPANY } from "./content";
import { GoldDivider, Monogram } from "./Emblem";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Chairman() {
  return (
    <Section id="chairman">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="نبذة عن الخبرة"
            title={
              <>
                كلمة <span className="gold-gradient-text">رئيس مجلس الإدارة</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          {/* chairman message */}
          <Reveal className="h-full">
            <figure className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-8 md:p-12">
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mh-gold/60 to-transparent"
                aria-hidden="true"
              />
              <Quote
                className="size-10 text-mh-gold/50 md:size-12"
                aria-hidden="true"
              />
              <blockquote className="mt-6 flex-1">
                <p className="text-pretty text-lg font-semibold leading-[2] text-slate-100 md:text-2xl md:leading-[2]">
                  «{CHAIRMAN_MESSAGE}»
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
                <Monogram className="size-14 text-xl" />
                <div>
                  <p className="text-lg font-black text-white md:text-xl">
                    {COMPANY.chairman}
                  </p>
                  <p className="mt-1 text-sm font-bold text-mh-gold">
                    {COMPANY.chairmanTitle}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* executive summary card */}
          <Reveal delay={0.15} className="h-full">
            <aside className="gold-border-glow flex h-full flex-col rounded-[1.75rem] border border-mh-gold/25 bg-gradient-to-b from-mh-navy-800/80 to-mh-navy-900/70 p-8 md:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-mh-gold/30 bg-mh-gold/[0.08] px-4 py-1.5 text-xs font-bold text-mh-gold-soft">
                <span className="size-1.5 rotate-45 bg-mh-gold/80" aria-hidden="true" />
                نبذة عن الخبرة
              </span>

              <h3 className="mt-6 text-2xl font-black leading-snug text-white">
                {COMPANY.chairman}
              </h3>
              <p className="mt-2 text-sm font-bold text-mh-gold">
                {COMPANY.chairmanTitle}
              </p>

              <p className="mt-5 text-pretty text-sm leading-8 text-slate-300 md:text-[15px]">
                {COMPANY.bio}
              </p>

              <GoldDivider className="my-7" />

              <ul className="space-y-4 text-sm font-bold text-slate-200">
                {[
                  "خبرة عملية في إدارة العقود والتوريدات منذ 1995",
                  "تعاون دولي وشراكات استراتيجية موثقة",
                  "قطاعات: المعادن · المقاولات · التجارة العامة",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-mh-gold"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
