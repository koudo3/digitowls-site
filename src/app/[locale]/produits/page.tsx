"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const products = [
  {
    key: "cadrage",
    href: "cadrage-projet-ai",
    icon: "◎",
    accent: "text-accent",
  },
  {
    key: "diagnostic",
    href: null,
    icon: "⬡",
    accent: "text-secondary",
  },
  {
    key: "dashboards",
    href: null,
    icon: "◈",
    accent: "text-accent",
  },
];

export default function ProductsPage() {
  const t = useTranslations("products_page");
  const locale = useLocale();

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center">
            <span>◎</span>
            {t("eyebrow")}
          </div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-ink-dim max-w-2xl mx-auto font-light">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {products.map((product) => {
            const card = (
              <div className="bg-white border border-border rounded-[18px] p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-[0_14px_30px_rgba(20,24,64,0.06)] flex flex-col">
                <div
                  className={`${product.accent} text-4xl mb-4`}
                >
                  {product.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {t(`${product.key}_title`)}
                </h3>
                <p className="text-sm text-secondary font-medium mb-3">
                  {t(`${product.key}_subtitle`)}
                </p>
                <p className="text-ink-dim text-sm leading-relaxed flex-1">
                  {t(`${product.key}_text`)}
                </p>
                {product.href ? (
                  <span className="mt-6 text-sm font-medium text-secondary inline-flex items-center gap-1">
                    {t("discover")} →
                  </span>
                ) : (
                  <span className="mt-6 text-xs font-medium text-ink-dim/50 uppercase tracking-wide">
                    {t("coming_soon")}
                  </span>
                )}
              </div>
            );

            if (product.href) {
              return (
                <Link
                  key={product.key}
                  href={`/${locale}/produits/${product.href}`}
                  className="block"
                >
                  {card}
                </Link>
              );
            }

            return (
              <div key={product.key} className="opacity-75">
                {card}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href={`/${locale}/#contact`}
            className="text-[15px] font-medium px-7 py-4 rounded-[10px] bg-accent text-primary inline-flex items-center gap-2.5 transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)]"
          >
            {t("cta")} →
          </a>
        </div>
      </div>
    </section>
  );
}
