import { Award, Users, Target, Shield, Lightbulb, TrendingUp } from "lucide-react";
import { useTranslation } from "@/lib/I18nProvider";

export function CeoProfile() {
  const { t } = useTranslation();

  const leadershipPoints = [
    { icon: TrendingUp, text: t("highlight1") },
    { icon: Users, text: t("highlight2") },
    { icon: Target, text: t("highlight3") },
    { icon: Lightbulb, text: t("highlight4") },
    { icon: Shield, text: t("highlight5") },
    { icon: Award, text: t("highlight6") },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-mh-charcoal to-mh-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-mh-gold/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            {/* Section header */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-mh-cream mb-4">
                {t("ceoTitle")}
              </h2>
              <div className="gold-line w-24" />
            </div>

            {/* Name and title */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-mh-gold mb-2">
                {t("ceoName")}
              </h3>
              <p className="text-xl text-mh-cream/70">{t("ceoRole")}</p>
            </div>

            {/* Bio */}
            <div className="text-mh-cream/70 leading-relaxed space-y-4 mb-8">
              <p>{t("ceoBio1")}</p>
              <p>{t("ceoBio2")}</p>
              <p className="text-mh-gold/90">
                {t("ceoBio3")} <span className="font-bold">1995</span>
              </p>
              <p>{t("ceoBio4")}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl border border-mh-gold/20 bg-mh-gold/5">
                <div className="text-3xl font-bold text-mh-gold">+30</div>
                <div className="text-sm text-mh-cream/60">{t("ceoExp")}</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-mh-gold/20 bg-mh-gold/5">
                <div className="text-3xl font-bold text-mh-gold">2013</div>
                <div className="text-sm text-mh-cream/60">{t("ceoFounded")}</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-mh-gold/20 bg-mh-gold/5">
                <div className="text-3xl font-bold text-mh-gold">∞</div>
                <div className="text-sm text-mh-cream/60">{t("ceoAmbition")}</div>
              </div>
            </div>
          </div>

          {/* Profile card */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-mh-charcoal rounded-3xl border border-mh-gold/20 p-8">
                {/* Initials avatar */}
                <div className="w-48 h-48 mx-auto rounded-full border-4 border-mh-gold bg-mh-dark flex items-center justify-center mb-8">
                  <span className="text-5xl font-bold text-mh-gold">KH</span>
                </div>

                {/* Leadership points */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-mh-gold text-center mb-6">
                    {t("ceoHighlights")}
                  </h4>
                  {leadershipPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-mh-dark/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-mh-gold/10 flex items-center justify-center shrink-0">
                        <point.icon className="w-5 h-5 text-mh-gold" />
                      </div>
                      <span className="text-mh-cream/80">{point.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-mh-gold/10 rounded-full blur-[60px]" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-mh-gold/10 rounded-full blur-[40px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
