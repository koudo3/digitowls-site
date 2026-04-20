import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy_page");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-8 text-primary">{t("title")}</h1>
        <div className="text-ink-dim space-y-4 leading-relaxed">
          <p>{t("intro")}</p>
          <h2 className="text-xl font-heading font-bold text-primary mt-8">{t("data_collection_title")}</h2>
          <p>{t("data_collection_text")}</p>
          <h2 className="text-xl font-heading font-bold text-primary mt-8">{t("data_usage_title")}</h2>
          <p>{t("data_usage_text")}</p>
          <h2 className="text-xl font-heading font-bold text-primary mt-8">{t("contact_title")}</h2>
          <p>{t("contact_text")}</p>
        </div>
      </div>
    </section>
  );
}
