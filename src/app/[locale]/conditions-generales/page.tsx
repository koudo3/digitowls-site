import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("terms_page");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-8 text-primary">{t("title")}</h1>
        <div className="text-ink-dim space-y-4 leading-relaxed">
          <p>{t("intro")}</p>
          <h2 className="text-xl font-heading font-bold text-primary mt-8">{t("services_title")}</h2>
          <p>{t("services_text")}</p>
          <h2 className="text-xl font-heading font-bold text-primary mt-8">{t("ip_title")}</h2>
          <p>{t("ip_text")}</p>
          <h2 className="text-xl font-heading font-bold text-primary mt-8">{t("contact_title")}</h2>
          <p>{t("contact_text")}</p>
        </div>
      </div>
    </section>
  );
}
