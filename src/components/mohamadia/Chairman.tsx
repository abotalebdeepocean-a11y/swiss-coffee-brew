import { Quote } from "lucide-react";
import { CHAIRMAN_MESSAGE, COMPANY, ADVANTAGES } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Chairman() {
  return (
    <Section id="chairman" className="bg-mh-black">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-wide text-mh-gold">
              <span className="size-1.5 rotate-45 bg-mh-gold" aria-hidden="true" />
              نبذة عن الخبرة
            </span>
            <h2 className="mt-6 text-balance text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              كلمة <span className="text-mh-gold">رئيس مجلس الإدارة</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-8 text-white/40 md:text-lg">
              رؤية قيادية صاغها صاحبها على مدى ثلاثة عقود من العمل والبناء.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          {/* chairman message */}
          <Reveal className="h-full">
            <figure className="relative flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-12">
              <Quote className="size-10 text-mh-gold md:size-12" aria-hidden="true" />
              <blockquote className="mt-6 flex-1">
                <p className="text-pretty text-lg font-semibold leading-[2] text-white/80 md:text-xl md:leading-[2]">
                  «{CHAIRMAN_MESSAGE}»
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-white/8 pt-8">
                <div className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-mh-gold bg-white">
                  <span className="text-xl font-black text-mh-black">خ</span>
                </div>
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

          {/* advantages card — editorial dark */}
          <Reveal delay={0.15} className="h-full">
            <aside className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-mh-gold/20 bg-mh-gold/5 px-4 py-1.5 text-xs font-bold text-mh-gold">
                <span className="size-1.5 rotate-45 bg-mh-gold" aria-hidden="true" />
                مميزاتنا
              </span>

              <h3 className="mt-6 text-2xl font-black leading-snug text-white">
                {COMPANY.chairman}
              </h3>
              <p className="mt-2 text-sm font-bold text-mh-gold">
                {COMPANY.chairmanTitle}
              </p>

              <div className="my-7 flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-white/8" />
                <span className="size-1.5 rotate-45 bg-mh-gold" />
                <span className="h-px flex-1 bg-white/8" />
              </div>

              <ul className="space-y-4 text-sm font-bold text-white/70">
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
