"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "@/components/ui/Button";

const SECTION_IDS = ["services", "realisations", "about", "contact"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const anchorLinks = [
    { id: "services", label: t("services") },
    { id: "realisations", label: t("realisations") },
    { id: "about", label: t("about") },
  ];

  const pageLinks = [
    { href: `/${locale}/produits`, label: t("products") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/carrieres`, label: t("careers") },
  ];

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.1, rootMargin: "-80px 0px -50% 0px" }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [isHomePage]);

  const getAnchorHref = (id: string) => {
    if (isHomePage) return `#${id}`;
    return `/${locale}/#${id}`;
  };

  const getContactHref = () => {
    if (isHomePage) return "#contact";
    return `/${locale}/#contact`;
  };

  const anchorLinkClass = (id: string) => {
    const base = "text-sm transition-colors";
    if (activeSection === id) {
      return `${base} text-white border-b-2 border-secondary pb-1`;
    }
    return `${base} text-white/70 hover:text-white`;
  };

  return (
    <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image src="/images/logo/owl-4.svg" alt="DigiTowls" width={32} height={32} />
            <span className="font-body font-bold text-lg">digitowls</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {anchorLinks.map((link) => (
              <a key={link.id} href={getAnchorHref(link.id)} className={anchorLinkClass(link.id)}>{link.label}</a>
            ))}
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.label}</Link>
            ))}
            <LanguageSwitcher />
            <Button href={getContactHref()} variant="secondary">{t("contact")}</Button>
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
            {anchorLinks.map((link) => (
              <a key={link.id} href={getAnchorHref(link.id)} className="block text-sm text-white/70 hover:text-white py-2" onClick={() => setMobileOpen(false)}>{link.label}</a>
            ))}
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block text-sm text-white/70 hover:text-white py-2" onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <LanguageSwitcher />
              <Button href={getContactHref()} variant="secondary">{t("contact")}</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
