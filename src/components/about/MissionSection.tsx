import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function MissionSection() {
  const t = useTranslations("about_page");
  return (
    <div className="space-y-16">
      <AnimatedSection className="py-8">
        <p className="text-secondary text-xl font-heading font-bold mb-6">{t("tagline")}</p>
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">{t("mission_title")}</h2>
        <p className="text-white/70 text-lg leading-relaxed max-w-3xl">{t("mission_text")}</p>
      </AnimatedSection>

      <AnimatedSection className="py-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">{t("partnership_title")}</h2>
        <p className="text-white/70 text-lg leading-relaxed max-w-3xl mb-4">{t("partnership_text")}</p>
        <ul className="space-y-3 max-w-3xl">
          <li className="text-white/70 pl-4 border-l-2 border-secondary">{t("partnership_local")}</li>
          <li className="text-white/70 pl-4 border-l-2 border-accent">{t("partnership_global")}</li>
        </ul>
      </AnimatedSection>

      <AnimatedSection className="py-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">{t("pillars_title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg text-secondary mb-3">
                {t(`pillar_${n}_title`)}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {t(`pillar_${n}_text`)}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
