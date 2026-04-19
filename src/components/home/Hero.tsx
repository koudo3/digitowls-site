"use client";

import { useTranslations, useLocale } from "next-intl";
import OwlVisual from "./OwlVisual";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white py-[120px] px-8 max-md:py-[70px] max-md:px-5">
        {/* Animated gradient blob */}
        <div className="absolute -top-[20%] -right-[10%] w-[85%] h-[130%] bg-gradient-to-br from-primary via-secondary to-accent blur-[100px] opacity-55 animate-drift pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-primary to-transparent pointer-events-none" />
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        <div className="max-w-container mx-auto relative z-[2] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-20 lg:gap-20 items-center">
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-white/20 rounded-full text-xs font-medium tracking-widest text-white/90 mb-9 backdrop-blur-[10px] bg-white/[0.04]">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_#F8BE1C]" />
              {t("label")}
            </div>

            {/* Title */}
            <h1 className="text-[clamp(56px,7.8vw,128px)] font-medium leading-[0.93] tracking-[-0.045em] mb-9" style={{ fontVariationSettings: "'wdth' 95" }}>
              {t("title_line1")}<br />
              <em className="font-serif font-normal italic bg-gradient-to-r from-secondary-soft to-accent bg-clip-text text-transparent tracking-[-0.025em]">{t("title_line2")}</em><br />
              <span className="font-light text-white/85" style={{ fontVariationSettings: "'wdth' 80" }}>{t("title_line3")}</span><br />
              <span className="font-light text-white/85" style={{ fontVariationSettings: "'wdth' 80" }}>{t("title_line4")}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[19px] leading-relaxed text-white/80 max-w-[56ch] mb-12 font-light">
              {t.rich("subtitle", {
                strong: (chunks) => <strong className="text-white font-medium">{chunks}</strong>,
              })}
            </p>

            {/* CTAs */}
            <div className="flex gap-3.5 items-center flex-wrap">
              <a
                href={`/${locale}/produits/cadrage-projet-ai`}
                className="text-[15px] font-medium px-7 py-4 rounded-[10px] bg-accent text-primary inline-flex items-center gap-2.5 transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)]"
              >
                {t("cta_primary")} →
              </a>
              <a
                href="#services"
                className="text-[15px] font-medium px-7 py-4 rounded-[10px] border border-white/25 text-white inline-flex items-center gap-2.5 transition-all hover:bg-white/[0.08] hover:border-white/50"
              >
                {t("cta_secondary")}
              </a>
            </div>
          </div>

          <OwlVisual />
        </div>
      </section>
      <div className="gradient-bar" />
    </>
  );
}
