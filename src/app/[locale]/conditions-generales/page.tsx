import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("terms_page");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-3 text-primary">{t("title")}</h1>
        <p className="text-sm text-ink-dim/60 mb-12">{t("last_updated", { date: "13 mai 2026" })}</p>

        <div className="text-ink-dim space-y-6 leading-relaxed text-[15px]">
          {/* Préambule */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("intro_title")}</h2>
          <p>{t("intro")}</p>

          {/* Services */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("services_title")}</h2>
          <p>{t("services_text")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("services_list_1")}</li>
            <li>{t("services_list_2")}</li>
            <li>{t("services_list_3")}</li>
            <li>{t("services_list_4")}</li>
            <li>{t("services_list_5")}</li>
            <li>{t("services_list_6")}</li>
          </ul>
          <p>{t("services_info")}</p>

          {/* Accès */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("access_title")}</h2>
          <p>{t("access_text")}</p>
          <p>{t("access_requirements")}</p>

          {/* Propriété intellectuelle */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("ip_title")}</h2>
          <p>{t("ip_text")}</p>
          <p>{t("ip_restriction")}</p>

          {/* Obligations */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("user_title")}</h2>
          <p>{t("user_text")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("user_list_1")}</li>
            <li>{t("user_list_2")}</li>
            <li>{t("user_list_3")}</li>
            <li>{t("user_list_4")}</li>
          </ul>

          {/* Formulaire de contact */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("contact_form_title")}</h2>
          <p>{t("contact_form_text")}</p>
          <p>{t("contact_form_privacy")}</p>

          {/* Responsabilité */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("liability_title")}</h2>
          <p>{t("liability_text")}</p>
          <p>{t("liability_exclusion")}</p>

          {/* Liens */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("links_title")}</h2>
          <p>{t("links_text")}</p>

          {/* Modifications */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("modifications_title")}</h2>
          <p>{t("modifications_text")}</p>

          {/* Droit applicable */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("law_title")}</h2>
          <p>{t("law_text")}</p>

          {/* Contact */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("contact_title")}</h2>
          <p>{t("contact_text")}</p>
          <p><a href={`mailto:${t("contact_email")}`} className="text-accent hover:underline font-medium">{t("contact_email")}</a></p>
          <p className="text-ink-dim/70">{t("contact_address")}</p>
        </div>
      </div>
    </section>
  );
}
