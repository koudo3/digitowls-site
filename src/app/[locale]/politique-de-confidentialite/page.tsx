import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy_page");
  const year = new Date().getFullYear();

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-12 text-primary">{t("title")}</h1>

        <div className="text-ink-dim space-y-6 leading-relaxed text-[15px]">
          {/* Éditeur / Hébergeur */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("editor_title")}</h2>
          <p>{t("editor_text")}</p>
          <p>{t("editor_address")}</p>
          <p><a href={`mailto:${t("editor_email")}`} className="text-accent hover:underline">{t("editor_email")}</a></p>
          <p>{t("editor_director")}</p>
          <p>{t("editor_hosting")}</p>
          <p>{t("editor_conception")}</p>
          <p className="italic text-ink-dim/70">{t("editor_jurisdiction")}</p>

          {/* Conditions d'utilisation */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("conditions_title")}</h2>
          <p>{t("conditions_text")}</p>
          <p>{t("conditions_purpose")}</p>
          <p>{t("conditions_changes")}</p>

          {/* Droits d'auteur */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("copyright_title")}</h2>
          <p>{t("copyright_text")}</p>
          <p>{t("external_links_text")}</p>

          {/* Renseignements personnels */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("personal_info_title")}</h2>
          <p>{t("personal_info_intro")}</p>
          <p>{t("personal_info_text")}</p>
          <p>{t("personal_info_detail")}</p>
          <p>{t("dpo_text")}</p>
          <p><a href={`mailto:${t("dpo_email")}`} className="text-accent hover:underline font-medium">{t("dpo_email")}</a></p>

          {/* Traitement */}
          <h3 className="text-lg font-heading font-bold text-primary mt-8">{t("processing_title")}</h3>
          <p>{t("processing_intro")}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("processing_item_1")}</li>
            <li>{t("processing_item_2")}</li>
            <li>{t("processing_item_3")}</li>
          </ul>

          {/* Accès */}
          <h3 className="text-lg font-heading font-bold text-primary mt-8">{t("access_title")}</h3>
          <p>{t("access_text")}</p>

          {/* Conservation */}
          <h3 className="text-lg font-heading font-bold text-primary mt-8">{t("retention_title")}</h3>
          <p>{t("retention_text")}</p>
          <p>{t("rights_text")}</p>
          <p>{t("rights_exercise")}</p>
          <p><a href={`mailto:${t("dpo_email")}`} className="text-accent hover:underline font-medium">{t("dpo_email")}</a></p>
          <p>{t("rights_delay")}</p>

          {/* Cookies */}
          <h2 className="text-xl font-heading font-bold text-primary mt-10 uppercase tracking-wide">{t("cookies_title")}</h2>
          <p>{t("cookies_text")}</p>
          <p>{t("cookies_analytics")}</p>
          <p>{t("cookies_contact")}</p>
          <p><a href="mailto:info@digitowls.com" className="text-accent hover:underline font-medium">info@digitowls.com</a></p>

          {/* Footer */}
          <hr className="border-ink-dim/20 mt-12" />
          <p className="text-center text-ink-dim/60 text-sm">{t("copyright_footer", { year: String(year) })}</p>
        </div>
      </div>
    </section>
  );
}
