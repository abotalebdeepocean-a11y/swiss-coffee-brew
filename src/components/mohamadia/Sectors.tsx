import { SECTORS } from "./content";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function Sectors() {
  return (
    <Section id="sectors" className="bg-mh-cream">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="قطاعات العمل الرئيسية"
            eyebrowEn="Key Business Sectors"
            title={
              <>
                <span className="text-mh-black editorial-heading">EIGHT STRATEGIC</span>{" "}
                <span className="text-mh-gold-deep editorial-heading">SECTORS</span>
              </>
            }
            subtitle="نغطي نطاقاً واسعاً من القطاعات لخدمة المشاريع الحكومية والخاصة داخل وخارج جمهورية مصر العربية."
            subtitleEn="We cover a wide spectrum of sectors to serve government and private projects inside and outside the Arab Republic of Egypt."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {SECTORS.map((item, i) => (
            <Reveal key={item.num} delay={(i % 2) * 0.1}>
              <div className="card-editorial group flex gap-5 rounded-2xl p-6 md:p-7">
                <span className="shrink-0 text-4xl font-black text-mh-black/10 transition-colors group-hover:text-mh-gold editorial-heading">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-lg font-black text-mh-black">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-mh-gold-deep uppercase tracking-wider mt-1">
                    {item.titleEn}
                  </p>
                  <p className="mt-2.5 text-sm leading-7 text-mh-black/50">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
