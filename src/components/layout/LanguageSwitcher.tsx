"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const newLocale = locale === "fr" ? "en" : "fr";
  const segments = pathname.split("/");
  segments[1] = newLocale;
  const newPath = segments.join("/");

  return (
    <Link
      href={newPath}
      className="text-sm text-white/70 hover:text-white border border-white/20 px-3 py-1 rounded transition-colors"
    >
      {locale === "fr" ? "EN" : "FR"}
    </Link>
  );
}
