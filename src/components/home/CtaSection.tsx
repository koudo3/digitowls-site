"use client";

import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";

export default function CtaSection() {
  const t = useTranslations("cta_section");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-primary text-white relative overflow-hidden" id="contact">
      <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[160%] bg-gradient-to-br from-primary via-secondary to-accent blur-[120px] opacity-45 animate-drift pointer-events-none" style={{ animationDirection: "reverse" }} />

      <div className="max-w-[1100px] mx-auto relative z-[2]">
        <div className="text-center mb-14">
          <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-accent mb-8 font-medium">
            ◎ {t("label")}
          </div>
          <h2 className="reveal text-[clamp(36px,5vw,72px)] font-medium leading-[0.95] tracking-[-0.04em] mb-8">
            {t.rich("headline", {
              em: (chunks) => <em className="font-serif italic font-normal bg-gradient-to-r from-secondary-soft to-accent bg-clip-text text-transparent">{chunks}</em>,
              br: () => <br />,
            })}
          </h2>
          <p className="text-lg text-white/80 max-w-[54ch] mx-auto font-light">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8 lg:pt-4">
            <div>
              <h3 className="text-xl font-medium mb-3">{t("cta_primary")}</h3>
              <p className="text-white/60 text-[15px] mb-5">{t("subtitle")}</p>
              <a
                href="https://outlook.office.com/book/AITeam@digitowls.com/"
                className="text-[15px] font-medium px-7 py-4 rounded-[10px] bg-accent text-primary inline-flex items-center gap-2.5 transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)]"
              >
                {t("cta_primary")} →
              </a>
            </div>
            <div className="border-t border-white/10 pt-8">
              <p className="text-white/50 text-sm mb-1">{t("cta_email")}</p>
              <a href="mailto:info@digitowls.com" className="text-accent hover:text-white transition-colors text-lg">
                info@digitowls.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
