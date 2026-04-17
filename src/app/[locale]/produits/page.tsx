import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ProductsPage() {
  const t = useTranslations("products_page");
  const tCadrage = useTranslations("cadrage_page");
  const locale = useLocale();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} description={t("description")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedSection>
            <Link
              href={`/${locale}/produits/cadrage-projet-ai`}
              className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:border-secondary/50 transition-colors"
            >
              <div className="mb-3 flex justify-center">
                <Image src="/images/icons/conseil-strategie.svg" alt="" width={48} height={48} />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-center">{tCadrage("title")}</h3>
              <p className="text-white/60 text-sm text-center">{tCadrage("subtitle")}</p>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
