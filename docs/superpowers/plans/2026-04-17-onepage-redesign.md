# One-Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the DigiTowls multi-page site into a single-page layout with anchor navigation, active section highlighting, and smooth scrolling — keeping blog, produits, and carrieres as separate pages.

**Architecture:** The homepage (`src/app/[locale]/page.tsx`) imports all section components directly. The Navbar uses anchor links (`#services`, `#realisations`, `#about`, `#contact`) for on-page sections and standard routes for separate pages. An IntersectionObserver highlights the active section in the navbar. Four standalone pages (services, realisations, a-propos, contact) are deleted.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, next-intl, Framer Motion, IntersectionObserver (browser native)

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/app/[locale]/page.tsx` | Modify | Becomes the single page — imports all section components |
| `src/app/[locale]/layout.tsx` | Modify | Add `scroll-smooth` and `scroll-pt-20` to `<html>` |
| `src/components/layout/Navbar.tsx` | Rewrite | Anchor links + page links + IntersectionObserver active highlight |
| `src/components/home/ServicesGrid.tsx` | Modify | Remove Link wrapper — cards become display-only |
| `src/components/layout/Footer.tsx` | Modify | Update navigation and service links to anchors |
| `src/app/[locale]/services/page.tsx` | Delete | Content moved to homepage |
| `src/app/[locale]/realisations/page.tsx` | Delete | Content moved to homepage |
| `src/app/[locale]/a-propos/page.tsx` | Delete | Content moved to homepage |
| `src/app/[locale]/contact/page.tsx` | Delete | Content moved to homepage |

---

### Task 1: Add smooth scrolling and scroll offset to layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx:42-48`

- [ ] **Step 1: Add scroll-smooth and scroll-pt-20 to the html element**

The layout doesn't render `<html>` directly — it's in the root layout. Check if there's a root layout first. If not, we add the classes via the `<main>` wrapper approach. Actually, looking at the layout, Next.js App Router handles `<html>` in `src/app/layout.tsx`. We need to find and modify that file.

Run: `cat src/app/layout.tsx` to check if root layout exists.

If it exists, add `className="scroll-smooth scroll-pt-20"` to the `<html>` tag. If not, create it.

The root layout at `src/app/layout.tsx` should look like:

```tsx
import { Space_Grotesk, Nunito } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-body" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${nunito.variable} scroll-smooth scroll-pt-20`}>
      <body className="bg-primary text-white font-body antialiased">{children}</body>
    </html>
  );
}
```

If the root layout already exists and has a `className` on `<html>`, append `scroll-smooth scroll-pt-20` to the existing classes.

- [ ] **Step 2: Verify smooth scrolling works**

Run: `npm run dev`

Open browser, manually add `#services` to URL. Page should scroll smoothly (once sections exist). For now, just confirm the dev server starts without errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add smooth scrolling and scroll offset to root layout"
```

---

### Task 2: Build the unified homepage

**Files:**
- Modify: `src/app/[locale]/page.tsx`

The homepage currently renders Hero, ServicesGrid, ClientLogos, and CtaBanner. We add the remaining sections: Realisations (with filter + project cards), About (mission + team + values), and Contact (form + info + calendly).

- [ ] **Step 1: Rewrite the homepage to include all sections**

Replace `src/app/[locale]/page.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogos from "@/components/home/ClientLogos";
import CtaBanner from "@/components/home/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryFilter from "@/components/realisations/CategoryFilter";
import ProjectCard from "@/components/realisations/ProjectCard";
import MissionSection from "@/components/about/MissionSection";
import TeamGrid from "@/components/about/TeamGrid";
import ValuesSection from "@/components/about/ValuesSection";
import ContactForm from "@/components/contact/ContactForm";
import CalendlyEmbed from "@/components/contact/CalendlyEmbed";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { projects } from "@/data/projects";

export default function HomePage() {
  const t = useTranslations("realisations_page");
  const tServices = useTranslations("services_data");
  const tAbout = useTranslations("about_page");
  const tContact = useTranslations("contact_page");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Hero />

      <div id="services">
        <ServicesGrid />
      </div>

      <ClientLogos />
      <CtaBanner />

      <section id="realisations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("title")} description={t("description")} />
          <CategoryFilter
            categories={categories.map((c) => tServices(`${c}.title`))}
            active={activeCategory === "all" ? "all" : tServices(`${activeCategory}.title`)}
            onSelect={(label) => {
              if (label === "all") { setActiveCategory("all"); } else {
                const cat = categories.find((c) => tServices(`${c}.title`) === label);
                setActiveCategory(cat || "all");
              }
            }}
            allLabel={t("filter_all")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                title={t(`projects.${project.id}.title`)}
                description={t(`projects.${project.id}.description`)}
                image={project.image}
                tags={t.raw(`projects.${project.id}.tags`) as string[]}
                type={t(`projects.${project.id}.type`)}
                date={t(`projects.${project.id}.date`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={tAbout("title")} />
          <MissionSection />
          <TeamGrid />
          <ValuesSection />
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={tContact("title")} description={tContact("description")} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <AnimatedSection className="lg:col-span-2"><ContactForm /></AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                  <h3 className="font-heading font-bold text-lg">{tContact("info_title")}</h3>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{tContact("phone_label")}</p>
                    <a href="tel:+14384927832" className="text-secondary hover:underline">{tContact("phone_value")}</a>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{tContact("email_label")}</p>
                    <a href="mailto:candidature@digitowls.com" className="text-secondary hover:underline">{tContact("email_value")}</a>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{tContact("address_label")}</p>
                    <p className="text-white/80 whitespace-pre-line">{tContact("address_value")}</p>
                  </div>
                </div>
                <CalendlyEmbed />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify the homepage renders all sections**

Run: `npm run dev`

Open `http://localhost:3000/fr` in browser. Verify all sections appear in order: Hero → Services → Clients → CTA → Realisations → About → Contact. Check that the category filter in Realisations works (click tabs).

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: build unified homepage with all sections"
```

---

### Task 3: Make ServicesGrid cards display-only

**Files:**
- Modify: `src/components/home/ServicesGrid.tsx`

The ServicesGrid currently wraps each card in a `<Link>` to `/{locale}/services#service-id`. Since the services page is being removed, the cards should be display-only `<div>` elements.

- [ ] **Step 1: Replace Link wrapper with div**

Replace the full content of `src/components/home/ServicesGrid.tsx` with:

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ServicesGrid() {
  const t = useTranslations("services_section");
  const tServices = useTranslations("services_data");

  return (
    <section className="py-20 px-4 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading label={t("label")} title={t("title")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.1}>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <Image src={service.icon} alt="" width={48} height={48} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{tServices(`${service.id}.title`)}</h3>
                <p className="text-white/60 text-sm">{tServices(`${service.id}.short`)}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify cards render without links**

Run dev server, check that service cards are visible but no longer clickable links. Hover should not show pointer cursor or link URL.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/ServicesGrid.tsx
git commit -m "refactor: make ServicesGrid cards display-only"
```

---

### Task 4: Rewrite Navbar with anchor links and active section highlight

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

The navbar needs three changes:
1. Split links into anchor links (Services, Realisations, A propos) and page links (Produits, Blog, Carrieres)
2. Contact button scrolls to `#contact` instead of routing to `/contact`
3. IntersectionObserver highlights the currently visible section's link

- [ ] **Step 1: Rewrite Navbar.tsx**

Replace the full content of `src/components/layout/Navbar.tsx` with:

```tsx
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

  // Anchor links — scroll on homepage, navigate to homepage+anchor from other pages
  const anchorLinks = [
    { id: "services", label: t("services") },
    { id: "realisations", label: t("realisations") },
    { id: "about", label: t("about") },
  ];

  // Page links — always navigate to separate pages
  const pageLinks = [
    { href: `/${locale}/produits`, label: t("products") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/carrieres`, label: t("careers") },
  ];

  // IntersectionObserver for active section highlighting
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
      { threshold: 0.5, rootMargin: "-80px 0px 0px 0px" }
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
```

- [ ] **Step 2: Verify navbar behavior on homepage**

Run dev server. On the homepage:
1. Click "Services" — page smooth-scrolls to #services
2. Click "Réalisations" — page smooth-scrolls to #realisations
3. Click "À propos" — page smooth-scrolls to #about
4. Click "Contact" button — page smooth-scrolls to #contact
5. Scroll down — active link in navbar highlights with teal border as each section enters view
6. Click "Blog" — navigates to /fr/blog (separate page)

- [ ] **Step 3: Verify navbar behavior on separate pages**

Navigate to `/fr/blog`. Click "Services" in navbar — should navigate to `/fr/#services`. The Contact button should navigate to `/fr/#contact`.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: navbar with anchor links and active section highlight"
```

---

### Task 5: Update Footer links to use anchors

**Files:**
- Modify: `src/components/layout/Footer.tsx`

The footer has two sets of links to update:
1. Navigation links (Services, Réalisations, À propos) → anchor `/#section` on homepage
2. Service list links → `/#services` instead of `/services#service-id`

- [ ] **Step 1: Update Footer.tsx navigation and service links**

In `src/components/layout/Footer.tsx`, replace the navigation `<ul>` (lines 72-77):

Old:
```tsx
<ul className="space-y-2 text-sm text-white/50">
  <li><Link href={`/${locale}/services`} className="hover:text-white transition-colors">{tNav("services")}</Link></li>
  <li><Link href={`/${locale}/realisations`} className="hover:text-white transition-colors">{tNav("realisations")}</Link></li>
  <li><Link href={`/${locale}/a-propos`} className="hover:text-white transition-colors">{tNav("about")}</Link></li>
  <li><Link href={`/${locale}/blog`} className="hover:text-white transition-colors">{tNav("blog")}</Link></li>
</ul>
```

New:
```tsx
<ul className="space-y-2 text-sm text-white/50">
  <li><a href={`/${locale}/#services`} className="hover:text-white transition-colors">{tNav("services")}</a></li>
  <li><a href={`/${locale}/#realisations`} className="hover:text-white transition-colors">{tNav("realisations")}</a></li>
  <li><a href={`/${locale}/#about`} className="hover:text-white transition-colors">{tNav("about")}</a></li>
  <li><Link href={`/${locale}/blog`} className="hover:text-white transition-colors">{tNav("blog")}</Link></li>
</ul>
```

Then replace the services list (lines 81-89). Change each service link from `/${locale}/services#${service.id}` to `/${locale}/#services`:

Old:
```tsx
{services.map((service) => (
  <li key={service.id}>
    <Link href={`/${locale}/services#${service.id}`} className="hover:text-white transition-colors">
      {tServices(`${service.id}.title`)}
    </Link>
  </li>
))}
```

New:
```tsx
{services.map((service) => (
  <li key={service.id}>
    <a href={`/${locale}/#services`} className="hover:text-white transition-colors">
      {tServices(`${service.id}.title`)}
    </a>
  </li>
))}
```

- [ ] **Step 2: Verify footer links**

Click "Services" in footer navigation — should navigate to homepage #services section. Click any service name — should also go to homepage #services.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "refactor: update footer links to use anchor navigation"
```

---

### Task 6: Delete removed pages

**Files:**
- Delete: `src/app/[locale]/services/page.tsx`
- Delete: `src/app/[locale]/realisations/page.tsx`
- Delete: `src/app/[locale]/a-propos/page.tsx`
- Delete: `src/app/[locale]/contact/page.tsx`

- [ ] **Step 1: Delete the four page files**

```bash
rm src/app/[locale]/services/page.tsx
rm src/app/[locale]/realisations/page.tsx
rm src/app/[locale]/a-propos/page.tsx
rm src/app/[locale]/contact/page.tsx
```

- [ ] **Step 2: Delete empty directories if no other files remain**

```bash
rmdir src/app/[locale]/services 2>/dev/null
rmdir src/app/[locale]/realisations 2>/dev/null
rmdir src/app/[locale]/a-propos 2>/dev/null
rmdir src/app/[locale]/contact 2>/dev/null
```

(Some may fail if directories contain other files — that's fine.)

- [ ] **Step 3: Verify the site still works**

Run: `npm run dev`

1. Visit `http://localhost:3000/fr` — homepage renders all sections
2. Visit `http://localhost:3000/fr/services` — should show 404 (expected)
3. Visit `http://localhost:3000/fr/blog` — should still work
4. Visit `http://localhost:3000/fr/produits` — should still work
5. Visit `http://localhost:3000/fr/carrieres` — should still work

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`

Expected: Build completes with no errors. The homepage, blog, produits, and carrieres routes should be listed in the output.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: remove standalone pages moved to homepage"
```

---

### Task 7: Final verification and deploy

- [ ] **Step 1: Full site walkthrough**

Run: `npm run dev`

Test checklist:
1. Homepage (`/fr`): All sections visible in order — Hero, Services, Clients, CTA, Realisations, About, Contact
2. Navbar anchors: Click each anchor link → smooth scroll to correct section
3. Active highlight: Scroll through page → navbar link highlights match visible section
4. Category filter: Click realisations filter tabs → projects filter correctly
5. Contact form: Fill and submit → success message appears
6. Language switch: Switch to EN → all sections translate, anchors still work
7. Blog (`/fr/blog`): Loads correctly, navbar links navigate back to homepage sections
8. Produits (`/fr/produits/cadrage-projet-ai`): Loads correctly
9. Carrieres (`/fr/carrieres`): Loads correctly
10. Mobile: Resize to mobile width → hamburger menu works, anchor links scroll correctly
11. Footer: All links point to correct anchors or pages

- [ ] **Step 2: Build and deploy**

```bash
npm run build && vercel --prod
```

- [ ] **Step 3: Commit any final fixes if needed**

```bash
git add -A
git commit -m "fix: final adjustments after verification"
```
