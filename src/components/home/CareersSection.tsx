"use client";

import { useTranslations } from "next-intl";

const jobs = [
  { key: "job_1", email_subject: "Sp%C3%A9cialiste%20QA%20Automation" },
  { key: "job_2", email_subject: "Architecte%20IA%20%26%20Blockchain" },
  { key: "job_3", email_subject: "Lead%20D%C3%A9veloppeur%20Fullstack" },
];

export default function CareersSection() {
  const t = useTranslations("careers_home");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2" id="carrieres">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow"><span>07</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
            br: () => <br />,
          })}
        </h2>
        <p className="reveal text-lg leading-relaxed text-ink-dim max-w-[62ch] -mt-10 mb-14 font-light">
          {t.rich("lead", {
            strong: (chunks) => <strong className="text-primary font-medium">{chunks}</strong>,
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <div key={job.key} className="reveal group bg-white border border-border rounded-[18px] p-7 flex flex-col transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] relative overflow-hidden hover:border-accent hover:-translate-y-[5px] hover:shadow-[0_18px_40px_rgba(20,24,64,0.1)] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100">
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary-wash text-secondary border border-secondary/20 font-semibold">{t(`${job.key}.level`)}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-2 text-ink-dim border border-border font-medium">{t(`${job.key}.type`)}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-2 text-ink-dim border border-border font-medium inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {t(`${job.key}.location`)}
                </span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight leading-tight text-primary mb-3.5 min-h-[58px]">
                {t.rich(`${job.key}.title`, {
                  em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
                })}
              </h3>
              <p className="text-sm leading-relaxed text-ink-dim mb-6 flex-1">{t(`${job.key}.desc`)}</p>
              <a
                href={`mailto:candidature@digitowls.com?subject=${job.email_subject}`}
                className="self-start inline-flex items-center gap-2.5 text-sm font-semibold text-primary px-5 py-3 bg-accent rounded-[10px] transition-all group-hover:bg-primary group-hover:text-accent"
              >
                {t("apply")} <span className="inline-block transition-transform group-hover:translate-x-[3px]">→</span>
              </a>
            </div>
          ))}
        </div>

        <div className="reveal flex items-center justify-between gap-8 px-8 py-7 bg-white border border-dashed border-border-strong rounded-2xl mt-2 hover:border-accent hover:border-solid transition-colors max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-6">
          <div className="text-sm text-ink-dim leading-relaxed flex-1">
            <strong className="block text-primary text-[17px] font-semibold mb-1 tracking-tight">{t("spontaneous_title")}</strong>
            {t("spontaneous_text")}
          </div>
          <a href="mailto:candidature@digitowls.com" className="shrink-0 text-sm font-medium px-5 py-3 border border-border rounded-[10px] text-primary hover:border-accent hover:bg-accent/5 transition-all">
            {t("spontaneous_cta")} →
          </a>
        </div>
      </div>
    </section>
  );
}
