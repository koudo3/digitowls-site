"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <button onClick={switchLocale} className="text-sm text-white/70 hover:text-white border border-white/20 px-3 py-1 rounded transition-colors">
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}
