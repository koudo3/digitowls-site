"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();

  const links = [
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/realisations`, label: t("realisations") },
    { href: `/${locale}/a-propos`, label: t("about") },
    { href: `/${locale}/blog`, label: t("blog") },
  ];

  return (
    <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image src="/images/logo/owl-4.png" alt="DigiTowls" width={32} height={32} />
            <span className="font-body font-bold text-lg">digitowls</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link>
            ))}
            <LanguageSwitcher />
            <Button href={`/${locale}/contact`} variant="secondary">{t("contact")}</Button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block text-sm text-white/70 hover:text-white py-2" onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <LanguageSwitcher />
              <Button href={`/${locale}/contact`} variant="secondary">{t("contact")}</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
