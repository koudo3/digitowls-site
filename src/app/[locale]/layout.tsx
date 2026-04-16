import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";
  return {
    title: {
      default: "DigiTowls AI — " + (isEn ? "Your AI vision amplified" : "Votre vision IA amplifiée"),
      template: "%s | DigiTowls AI",
    },
    description: isEn
      ? "AI consulting firm — from strategy to deployment of tailored solutions."
      : "Firme de consultation IA — du conseil au déploiement de solutions sur mesure.",
    openGraph: {
      title: "DigiTowls AI",
      description: isEn ? "Your AI vision amplified" : "Votre vision IA amplifiée",
      images: ["/og-image.png"],
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
