"use client";

import { useTranslations } from "next-intl";

const stats = [
  { num: "350", unit: "+", key: "stat_1" },
  { num: "20", unit: "ans", key: "stat_2" },
  { num: "3", unit: "piliers", key: "stat_3" },
  { num: "1", unit: "équipe", key: "stat_4" },
];

export default function ProxymSection() {
  const t = useTranslations("proxym_section");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-primary text-white overflow-hidden" id="proxym">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow !text-accent !bg-accent/10 !border-accent/30">
          <span>02</span>{t("eyebrow")}
        </div>
        <h2 className="section-title reveal !text-white">
          {t.rich("title", {
            em: (chunks) => <em className="!text-accent">{chunks}</em>,
          })}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[100px] max-lg:gap-[60px] items-center">
          <p className="reveal text-xl leading-relaxed text-white/80 font-light max-w-[52ch]">
            {t.rich("lead", {
              strong: (chunks) => <strong className="text-white font-medium">{chunks}</strong>,
              em: (chunks) => <em className="font-serif italic text-secondary-soft font-normal">{chunks}</em>,
            })}
          </p>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.key} className="reveal bg-white/5 border border-white/10 rounded-2xl p-7 transition-all hover:bg-white/[0.08] hover:-translate-y-[3px] relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent">
                <div className="text-[56px] font-semibold leading-none tracking-[-0.04em] mb-2.5 text-white flex items-baseline gap-1">
                  {stat.num}<span className="text-[22px] text-accent font-medium tracking-tight">{stat.unit}</span>
                </div>
                <div className="text-[13px] text-white/60 leading-normal">{t(stat.key)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
