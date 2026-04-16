import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("hero");
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-heading">
        {t("title_1")} <span className="text-accent">{t("title_2")}</span>
      </h1>
    </main>
  );
}
