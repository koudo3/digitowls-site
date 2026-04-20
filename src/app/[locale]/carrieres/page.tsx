import { useTranslations } from "next-intl";

const jobIds = ["qa-automation", "ai-blockchain-architect", "lead-fullstack"];

export default function CareersPage() {
  const t = useTranslations("careers_page");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center">
            <span>◎</span>
            {t("title")}
          </div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-ink-dim max-w-2xl mx-auto font-light">
            {t("description")}
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {jobIds.map((id) => (
            <div key={id} id={id} className="bg-white border border-border rounded-[18px] p-8 transition-all duration-300 hover:border-secondary hover:shadow-[0_14px_30px_rgba(20,24,64,0.06)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="font-heading font-bold text-xl md:text-2xl text-primary">
                  {t(`jobs.${id}.title`)}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary-wash text-secondary border border-secondary/20 font-semibold">
                    {t("level")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-2 text-ink-dim border border-border font-medium">
                    {t("type")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-2 text-ink-dim border border-border font-medium inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {t("location")}
                  </span>
                </div>
              </div>

              <p className="text-ink-dim mb-6">{t(`jobs.${id}.description`)}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-bold text-secondary text-sm uppercase tracking-wider mb-3">
                    {t("responsibilities_label")}
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
                    {t("requirements_label")}
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
                className="inline-flex items-center gap-2.5 text-sm font-semibold text-primary px-6 py-3 bg-accent rounded-[10px] transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)]"
              >
                {t("apply")} →
              </a>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-8 px-8 py-7 bg-white border border-dashed border-border rounded-[18px] hover:border-accent hover:border-solid transition-colors max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-6">
          <div className="text-sm text-ink-dim leading-relaxed flex-1">
            <strong className="block text-primary text-[17px] font-semibold mb-1 tracking-tight">{t("spontaneous_title")}</strong>
            {t("spontaneous_text")}
          </div>
          <a href={`mailto:${t("apply_email")}`} className="shrink-0 text-sm font-medium px-5 py-3 border border-border rounded-[10px] text-primary hover:border-accent hover:bg-accent/5 transition-all">
            {t("apply")} →
          </a>
        </div>
      </div>
    </section>
  );
}
