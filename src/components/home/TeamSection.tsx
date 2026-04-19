"use client";

import { useTranslations } from "next-intl";
import TeamGrid from "@/components/about/TeamGrid";
import ValuesSection from "@/components/about/ValuesSection";

export default function TeamSection() {
  const t = useTranslations("team_section");

  return (
    <>
      <section className="py-[140px] px-8 max-md:py-20 max-md:px-5" id="equipe">
        <div className="max-w-container mx-auto">
          <div className="section-eyebrow"><span>05</span>{t("eyebrow")}</div>
          <h2 className="section-title reveal">
            {t.rich("title", {
              em: (chunks) => <em>{chunks}</em>,
              br: () => <br />,
            })}
          </h2>
          <TeamGrid />
        </div>
      </section>

      <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
        <div className="max-w-container mx-auto">
          <div className="section-eyebrow"><span>06</span>{t("values_eyebrow")}</div>
          <h2 className="section-title reveal">
            {t.rich("values_title", {
              em: (chunks) => <em>{chunks}</em>,
              br: () => <br />,
            })}
          </h2>
          <ValuesSection />
        </div>
      </section>
    </>
  );
}
