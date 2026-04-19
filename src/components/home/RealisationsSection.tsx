"use client";

import { useTranslations } from "next-intl";

const cases = [
  { id: "case_1", span: "col-span-6 lg:col-span-3", bgClass: "bg-gradient-to-br from-secondary-wash to-white" },
  { id: "case_2", span: "col-span-6 lg:col-span-3", bgClass: "bg-gradient-to-br from-accent/10 to-white" },
  { id: "case_3", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-primary/[0.04] to-white" },
  { id: "case_4", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-secondary-wash to-accent/[0.06]" },
  { id: "case_5", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-primary/5 to-secondary-wash" },
];

export default function RealisationsSection() {
  const t = useTranslations("realisations_page");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5" id="realisations">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow"><span>04</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </h2>

        <div className="grid grid-cols-6 gap-5">
          {cases.map((c) => (
            <div key={c.id} className={`${c.span} cursor-pointer transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1.5 reveal`}>
              <div className={`aspect-[4/3] ${c.bgClass} border border-border rounded-2xl relative overflow-hidden mb-4 transition-all duration-300 flex items-center justify-center hover:border-primary hover:shadow-[0_14px_30px_rgba(20,24,64,0.08)]`}>
                {/* Simple placeholder for visual area */}
                <div className="w-3/4 h-3/4 opacity-30 flex items-center justify-center">
                  <svg viewBox="0 0 100 75" className="w-full h-full" fill="none" stroke="#141840" strokeWidth="0.8">
                    <rect x="10" y="10" width="80" height="55" rx="4" />
                    <circle cx="50" cy="37" r="15" stroke="#2AB0C1" />
                    <circle cx="50" cy="37" r="5" fill="#F8BE1C" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-ink-dim mb-2.5">
                <span className="text-secondary font-medium">{t(`${c.id}.tag`)}</span>
                <span>{t(`${c.id}.year`)}</span>
              </div>
              <h3 className="text-[22px] font-semibold leading-tight tracking-tight mb-2 text-primary">
                {t.rich(`${c.id}.title`, {
                  em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
                })}
              </h3>
              <p className="text-sm text-ink-dim leading-normal">{t(`${c.id}.client`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
