import { Quote } from "lucide-react";
import { CHAIRMAN_MESSAGE, COMPANY, ADVANTAGES } from "./content";
import { ChairmanAvatar, GoldDivider } from "./Emblem";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Chairman() {
  return (
    <Section id="chairman" className="bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="نبذة عن الخبرة"
            title={
              <>
                كلمة <span className="gold-text">رئيس مجلس الإدارة</span>
              </>
            }
            subtitle="رؤية قيادية صاغها صاحبها على مدى ثلاثة عقود من العمل والبناء."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          {/* chairman message */}
          <Reveal className="h-full">
            <figure className="card-dark relative flex h-full flex-col rounded-[1.75rem] p-8 md:p-12">
              <div
                className="absolute inset-x-0 top-0 h-1 rounded-t-[1.75rem] bg-gradient-to-r from-transparent via-mh-gold to-transparent"
                aria-hidden="true"
              />
              <Quote className="size-10 text-mh-gold md:size-12" aria-hidden="true" />
              <blockquote className="mt-6 flex-1">
                <p className="text-pretty text-lg font-semibold leading-[2] text-white/80 md:text-xl md:leading-[2]">
                  «{CHAIRMAN_MESSAGE}»
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
                <ChairmanAvatar className="size-14" />
                <div>
                  <p className="text-lg font-black text-white md:text-xl">
                    {COMPANY.chairman}
                  </p>
                  <p className="mt-1 text-sm font-bold text-mh-gold-soft">
                    {COMPANY.chairmanTitle}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* advantages card — dark */}
          <Reveal delay={0.15} className="h-full">
            <aside className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-mh-gold/20 bg-[#111] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.4)] md:p-10">
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mh-gold/70 to-transparent"
                aria-hidden="true"
              />
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-mh-gold/30 bg-mh-gold/10 px-4 py-1.5 text-xs font-bold text-mh-gold-soft">
                <span className="size-1.5 rotate-45 bg-mh-gold" aria-hidden="true" />
                مميزاتنا
              </span>

              <h3 className="mt-6 text-2xl font-black leading-snug text-white">
                {COMPANY.chairman}
              </h3>
              <p className="mt-2 text-sm font-bold text-mh-gold-soft">
                {COMPANY.chairmanTitle}
              </p>

              <GoldDivider className="my-7" />

              <ul className="space-y-4 text-sm font-bold text-white/80">
                {ADVANTAGES.map((item) => (
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
