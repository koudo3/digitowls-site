"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-primary text-white pt-[72px] pb-8 px-8 border-t border-white/[0.08]">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-white/[0.08] mb-8">
          {/* Brand */}
          <div>
            <div className="block max-w-[120px] mb-5">
              <Image src="/images/logo/digitowls-icon.svg" alt="digitowls" width={120} height={40} className="w-full h-auto mix-blend-multiply" />
            </div>
            <p className="text-white/60 max-w-[40ch] text-sm leading-relaxed font-light mb-6">{t("tagline")}</p>
            <div className="flex gap-2.5">
              <SocialIcon href="https://www.linkedin.com/company/digitowls" label="LinkedIn">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8 17v-7H5v7h3zM6.5 8.5A1.5 1.5 0 108.5 7 1.5 1.5 0 006.5 8.5zM19 17v-4c0-2-1-3-3-3a2.7 2.7 0 00-2.5 1.3V10H11v7h3v-3.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V17h2z"/>
              </SocialIcon>
              <SocialIcon href="https://x.com/anat0wl" label="Twitter">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </SocialIcon>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-5 font-medium">{t("col_services")}</h4>
            <ul className="space-y-3 list-none">
              <li><a href={`/${locale}/#services`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("svc_1")}</a></li>
              <li><a href={`/${locale}/#services`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("svc_2")}</a></li>
              <li><a href={`/${locale}/#services`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("svc_3")}</a></li>
              <li><a href={`/${locale}/#services`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("svc_4")}</a></li>
              <li><a href={`/${locale}/#services`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("svc_5")}</a></li>
              <li><a href={`/${locale}/#services`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("svc_6")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-5 font-medium">{t("col_contact")}</h4>
            <ul className="space-y-3 list-none">
              <li><a href="tel:+14384927832" className="text-sm text-white/70 hover:text-accent transition-colors">438-492-7832</a></li>
              <li><a href="mailto:info@digitowls.com" className="text-sm text-white/70 hover:text-accent transition-colors">info@digitowls.com</a></li>
            </ul>
            <p className="text-[13px] text-white/60 leading-normal mt-4">WeWork, Suite 400<br />3 Place Ville Marie<br />Montréal, H3B 2E3, QC</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-5 font-medium">{t("col_nav")}</h4>
            <ul className="space-y-3 list-none">
              <li><Link href={`/${locale}/blog`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("nav_blog")}</Link></li>
              <li><a href={`/${locale}/#carrieres`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("nav_careers")}</a></li>
              <li><Link href={`/${locale}/produits`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("nav_products")}</Link></li>
              <li><a href="https://brand.digitowls.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-accent transition-colors">{t("nav_brand")}</a></li>
              <li><Link href={`/${locale}/politique-de-confidentialite`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("nav_privacy")}</Link></li>
              <li><Link href={`/${locale}/conditions-generales`} className="text-sm text-white/70 hover:text-accent transition-colors">{t("nav_terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-white/40 max-md:flex-col max-md:gap-3 max-md:text-center">
          <div>© {new Date().getFullYear()} digitowls inc. · {t("rights")}</div>
          <div>{t("made_in")}</div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-[38px] h-[38px] rounded-[10px] bg-white/[0.06] flex items-center justify-center transition-all text-white/70 hover:bg-accent hover:text-primary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{children}</svg>
    </a>
  );
}
