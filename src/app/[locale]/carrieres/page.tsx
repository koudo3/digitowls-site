import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const jobIds = ["qa-automation", "ai-blockchain-architect", "lead-fullstack"];

export default function CareersPage() {
  const t = useTranslations("careers_page");

  return (
    <section className="py-20">
      <div className="max-w-container mx-auto px-8 max-md:px-5">
        <SectionHeading title={t("title")} description={t("description")} />

        <div className="space-y-8 mb-16">
          {jobIds.map((id, i) => (
            <AnimatedSection key={id} delay={i * 0.1}>
              <div className="bg-white border border-border rounded-xl p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-primary">
                    {t(`jobs.${id}.title`)}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                    <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full">
                      {t("level")}
                    </span>
                    <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                      {t("type")}
                    </span>
                    <span className="text-xs bg-surface-2 text-ink-dim px-3 py-1 rounded-full">
                      {t("location")}
                    </span>
                  </div>
                </div>

                <p className="text-ink-dim mb-6">{t(`jobs.${id}.description`)}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-heading font-bold text-secondary text-sm uppercase tracking-wider mb-3">
                      Responsabilités
                    </h4>
                    <ul className="space-y-2">
                      {(t.raw(`jobs.${id}.responsibilities`) as string[]).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-ink-dim text-sm">
                          <span className="text-secondary mt-0.5 shrink-0">→</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-secondary text-sm uppercase tracking-wider mb-3">
                      Exigences
                    </h4>
                    <ul className="space-y-2">
                      {(t.raw(`jobs.${id}.requirements`) as string[]).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-ink-dim text-sm">
                          <span className="text-accent mt-0.5 shrink-0">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={`mailto:${t("apply_email")}?subject=${encodeURIComponent(t(`jobs.${id}.title`))}`}
                  className="inline-block bg-accent hover:bg-accent/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  {t("apply")}
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-white border border-border rounded-xl p-8 text-center">
            <h3 className="font-heading font-bold text-xl mb-3 text-primary">{t("spontaneous_title")}</h3>
            <p className="text-ink-dim">
              {t("spontaneous_text")}{" "}
              <a href={`mailto:${t("apply_email")}`} className="text-secondary hover:underline">
                {t("apply_email")}
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
