"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const SECTION_IDS = ["services", "proxym", "approche", "realisations", "equipe", "carrieres"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const navLinks = [
    { id: "services", label: t("services") },
    { id: "proxym", label: t("proxym") },
    { id: "approche", label: t("approach") },
    { id: "realisations", label: t("realisations") },
    { id: "equipe", label: t("team") },
    { id: "carrieres", label: t("careers"), badge: "3" },
  ];

  const updateActiveNav = useCallback(() => {
    if (!isHomePage) return;
    const navHeight = 60;
    const triggerY = window.scrollY + navHeight + 80;
    let activeId: string | null = null;

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const bottom = top + el.offsetHeight;
      if (top <= triggerY && bottom > triggerY) {
        activeId = id;
      }
    }

    if (!activeId && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      activeId = SECTION_IDS[SECTION_IDS.length - 1];
    }

    setActiveSection(activeId || "");
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveNav();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    updateActiveNav();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, [isHomePage, updateActiveNav]);

  const getHref = (id: string) => (isHomePage ? `#${id}` : `/${locale}/#${id}`);

  return (
    <nav className="sticky top-0 z-[100] bg-surface/90 backdrop-blur-[14px] border-b border-border">
      <div className="max-w-container mx-auto px-8 py-3.5 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3 text-primary">
          <Image src="/images/logo/digitowls-icon.svg" alt="digitowls" width={44} height={44} className="mix-blend-multiply" />
          <span className="font-brand text-[26px] font-extrabold tracking-tight leading-none">digitowls</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-9 text-sm font-medium text-ink list-none">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={getHref(link.id)}
                className={`relative py-1.5 transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-accent after:transition-[width] after:duration-300 ${
                  activeSection === link.id
                    ? "text-primary font-medium after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="inline-flex items-center gap-1 ml-1.5 font-mono text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink" />
                    {link.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href={getHref("contact")}
            className="text-sm font-medium px-5 py-2.5 bg-primary text-white rounded-lg transition-all hover:bg-accent hover:text-primary hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            {t("cta")} →
          </a>
        </div>

        <button className="lg:hidden text-ink" onClick={() => setMobileOpen(!mobileOpen)}>
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
        <div className="lg:hidden px-8 pb-4 space-y-2">
          {navLinks.map((link) => (
            <a key={link.id} href={getHref(link.id)} className="block text-sm text-ink-dim hover:text-primary py-2" onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <LanguageSwitcher />
            <a href={getHref("contact")} className="text-sm font-medium px-5 py-2.5 bg-primary text-white rounded-lg">
              {t("cta")} →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
