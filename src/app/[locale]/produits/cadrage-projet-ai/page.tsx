"use client";

import { useTranslations, useLocale } from "next-intl";

export default function CadragePage() {
  const t = useTranslations("cadrage_page");
  const locale = useLocale();

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center"><span>◎</span>Produit</div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary mb-4">
            {t("title")}
          </h1>
          <p className="text-xl font-medium text-secondary mb-4">{t("subtitle")}</p>
          <p className="text-lg text-ink-dim max-w-2xl mx-auto font-light">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-border rounded-[18px] p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-[0_14px_30px_rgba(20,24,64,0.06)]">
            <div className="text-secondary text-4xl font-bold font-mono mb-4">01</div>
            <h3 className="text-lg font-semibold text-primary mb-3">{t("card_1_title")}</h3>
            <p className="text-ink-dim text-sm leading-relaxed">{t("card_1_text")}</p>
          </div>

          <div className="bg-white border border-border rounded-[18px] p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-[0_14px_30px_rgba(20,24,64,0.06)]">
            <div className="text-secondary text-4xl font-bold font-mono mb-4">02</div>
            <h3 className="text-lg font-semibold text-primary mb-3">{t("card_2_title")}</h3>
            <p className="text-ink-dim text-sm leading-relaxed">{t("card_2_text")}</p>
          </div>

          <div className="bg-white border border-border rounded-[18px] p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-[0_14px_30px_rgba(20,24,64,0.06)]">
            <div className="text-secondary text-4xl font-bold font-mono mb-4">03</div>
            <h3 className="text-lg font-semibold text-primary mb-3">{t("card_3_title")}</h3>
            <ol className="space-y-3 text-ink-dim text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold shrink-0">1.</span>
                {t("card_3_step_1")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold shrink-0">2.</span>
                {t("card_3_step_2")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold shrink-0">3.</span>
                {t("card_3_step_3")}
              </li>
            </ol>
            <p className="text-secondary text-sm mt-4 italic">{t("card_3_footer")}</p>
          </div>
        </div>

        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://insight.digitowls.ai/chat"
            className="text-[15px] font-medium px-7 py-4 rounded-[10px] bg-accent text-primary inline-flex items-center gap-2.5 transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)]"
          >
            {t("cta")} →
          </a>
          <a
            href={`/${locale}/#contact`}
            className="text-[15px] font-medium px-7 py-4 rounded-[10px] border border-border text-primary inline-flex items-center gap-2.5 transition-all hover:bg-surface-2 hover:-translate-y-0.5"
          >
            {t("cta_advisor")}
          </a>
        </div>
      </div>
    </section>
  );
}
