"use client";

import { useTranslations } from "next-intl";

const phases = [
  { key: "phase_1", badgeColor: "bg-primary text-accent" },
  { key: "phase_2", badgeColor: "bg-primary-soft text-accent" },
  { key: "phase_3", badgeColor: "bg-secondary text-white" },
  { key: "phase_4", badgeColor: "bg-accent text-primary" },
];

export default function ApprocheDOer() {
  const t = useTranslations("approche_doer");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2" id="approche">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow"><span>03</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-md:gap-8">
          {phases.map((phase, i) => (
            <div key={phase.key} className="reveal bg-white border border-border rounded-[18px] p-7 relative transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-[0_14px_30px_rgba(20,24,64,0.06)]">
              <div className={`absolute -top-3.5 left-6 ${phase.badgeColor} font-mono text-[11px] font-medium px-3.5 py-1.5 rounded-full tracking-widest`}>
                Phase {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[26px] font-semibold tracking-tight mt-4 mb-3.5 text-primary">
                {t.rich(`${phase.key}_title`, {
                  em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
                })}
              </h3>
              <p className="text-sm leading-relaxed text-ink-dim">{t(`${phase.key}_desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
