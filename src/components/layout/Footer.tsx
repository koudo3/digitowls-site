import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-primary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo/owl-4.png" alt="DigiTowls" width={28} height={28} />
              <span className="font-body font-bold text-lg">digitowls</span>
            </div>
            <p className="text-sm text-white/50">{t("description")}</p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-4">{t("navigation")}</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href={`/${locale}/services`} className="hover:text-white transition-colors">{tNav("services")}</Link></li>
              <li><Link href={`/${locale}/realisations`} className="hover:text-white transition-colors">{tNav("realisations")}</Link></li>
              <li><Link href={`/${locale}/a-propos`} className="hover:text-white transition-colors">{tNav("about")}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-white transition-colors">{tNav("blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-4">{t("our_services")}</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Conseil &amp; Stratégie IA</li>
              <li>Solutions Fintech</li>
              <li>Prototypage Accéléré</li>
              <li>Formation IA</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href={`/${locale}/politique-de-confidentialite`} className="hover:text-white transition-colors">{t("privacy")}</Link></li>
              <li><Link href={`/${locale}/conditions-generales`} className="hover:text-white transition-colors">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/30">
          © {new Date().getFullYear()} DigiTowls. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
