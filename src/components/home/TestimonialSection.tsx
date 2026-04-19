"use client";

import { useTranslations } from "next-intl";

export default function TestimonialSection() {
  const t = useTranslations("testimonial");

  return (
    <section className="bg-secondary-wash py-[140px] px-8 max-md:py-20 max-md:px-5 text-center">
      <div className="max-w-[960px] mx-auto">
        <div className="font-serif text-[72px] text-accent leading-[0.8] -mb-5 italic">&ldquo;</div>
        <p className="reveal text-[clamp(28px,3.6vw,48px)] leading-[1.25] tracking-tight text-primary font-normal max-w-[26ch] mx-auto my-6 mb-10">
          {t.rich("quote", {
            em: (chunks) => <em className="font-serif italic text-secondary">{chunks}</em>,
          })}
        </p>
        <div className="inline-flex items-center gap-4 text-sm text-ink-dim">
          <div className="w-10 h-10 rounded-full bg-primary text-accent flex items-center justify-center font-semibold text-sm">
            {t("avatar")}
          </div>
          <div className="text-left">
            <b className="text-primary font-semibold block">{t("author")}</b>
            {t("role")}
          </div>
        </div>
      </div>
    </section>
  );
}
