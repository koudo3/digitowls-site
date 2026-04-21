"use client";

import { useTranslations } from "next-intl";

export default function CtaSection() {
  const t = useTranslations("cta_section");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-primary text-white relative overflow-hidden" id="contact">
      <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[160%] bg-gradient-to-br from-primary via-secondary to-accent blur-[120px] opacity-45 animate-drift pointer-events-none" style={{ animationDirection: "reverse" }} />

      <div className="max-w-[1100px] mx-auto relative z-[2] text-center">
        <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-accent mb-8 font-medium">
          ◎ {t("label")}
        </div>
        <h2 className="reveal text-[clamp(48px,7vw,104px)] font-medium leading-[0.95] tracking-[-0.04em] mb-8">
          {t.rich("headline", {
            em: (chunks) => <em className="font-serif italic font-normal bg-gradient-to-r from-secondary-soft to-accent bg-clip-text text-transparent">{chunks}</em>,
            br: () => <br />,
          })}
        </h2>
        <p className="text-lg text-white/80 max-w-[54ch] mx-auto mb-12 font-light">{t("subtitle")}</p>
        <div className="inline-flex gap-3.5 flex-wrap justify-center">
          <a
            href="https://outlook.office.com/bookwithme/user/956fba07c5854cf89edfd8c0e7fc6476@digitowls.com?anonymous&ismsaljsauthenabled&ep=plink"
            className="text-[15px] font-medium px-7 py-4 rounded-[10px] bg-accent text-primary inline-flex items-center gap-2.5 transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)]"
          >
            {t("cta_primary")} →
          </a>
          <a
            href="mailto:info@digitowls.com"
            className="text-[15px] font-medium px-7 py-4 rounded-[10px] border border-white/25 text-white inline-flex items-center gap-2.5 transition-all hover:bg-white/[0.08] hover:border-white/50"
          >
            {t("cta_email")}
          </a>
        </div>
      </div>
    </section>
  );
}
