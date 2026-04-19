# Claude Design v6-2 Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faithfully reproduce the Claude-generated design (digitowls-v6-2.html) in the existing Next.js project on a new branch `claudedesign`.

**Architecture:** Rewrite all existing components to match the light-theme design. Add new sections (Proxym, Careers, Testimonial). Replace Framer Motion animations with CSS keyframe animations and vanilla JS. Keep Next.js App Router, next-intl i18n, and Tailwind CSS architecture intact.

**Tech Stack:** Next.js 14, Tailwind CSS, next-intl, Google Fonts (Archivo, Instrument Serif, JetBrains Mono, Nunito), CSS animations, vanilla JS for owl eye tracking.

**Reference file:** `/Users/octavekoudoyor/Downloads/digitowls-v6-2.html`

---

### Task 1: Create branch and update design foundations (fonts, colors, global CSS)

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create the `claudedesign` branch from `redesign`**

```bash
git checkout redesign
git checkout -b claudedesign
```

- [ ] **Step 2: Update `src/app/layout.tsx` with new Google Fonts**

Replace the entire file content:

```tsx
import type { Metadata } from "next";
import { Archivo, Nunito } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "digitowls — Votre vision IA, amplifiée",
  description: "Firme de consultation IA — du conseil au déploiement de solutions sur mesure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${archivo.variable} ${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

Note: Archivo and Nunito are loaded via `next/font/google` for optimization. Instrument Serif and JetBrains Mono are loaded via `<link>` because `next/font` doesn't support Instrument Serif well.

- [ ] **Step 3: Update `tailwind.config.ts` with new design tokens**

Replace the entire file content:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141840",
        "primary-soft": "#1C2150",
        secondary: "#2AB0C1",
        "secondary-soft": "#5BC5D3",
        "secondary-wash": "#E0F4F7",
        accent: "#F8BE1C",
        "accent-soft": "#FFD657",
        ink: "#1F2937",
        "ink-dim": "#6B7280",
        surface: "#F9FAFB",
        "surface-2": "#F3F4F7",
        border: "#E5E7EB",
        "border-strong": "#D1D5DB",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        brand: ["var(--font-nunito)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1400px",
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "glow-pulse": "glow-pulse 6s ease-in-out infinite",
        blink: "blink 1.6s ease-in-out infinite",
        "orbit-pulse": "orbit-pulse 3s ease-in-out infinite",
        "bar-dance": "bar-dance 1.3s ease-in-out infinite",
        "scan-sweep": "scan-sweep 6s ease-in-out infinite",
        "metric-float": "metric-float 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-5%, 3%) scale(1.05)" },
          "66%": { transform: "translate(3%, -3%) scale(0.95)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        blink: {
          "50%": { opacity: "0.3" },
        },
        "orbit-pulse": {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "bar-dance": {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1.3)" },
        },
        "scan-sweep": {
          "0%, 8%": { top: "8%", opacity: "0" },
          "12%": { opacity: "0.95" },
          "48%": { top: "92%", opacity: "0.95" },
          "56%, 100%": { top: "92%", opacity: "0" },
        },
        "metric-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 32px))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Update `src/app/globals.css` with light theme base and reveal animation**

Replace the entire file content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-surface text-ink font-sans antialiased;
    font-size: 16px;
    line-height: 1.55;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

@layer components {
  /* Reveal on scroll animation */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .reveal.in {
    opacity: 1;
    transform: translateY(0);
  }

  /* Gradient bar */
  .gradient-bar {
    height: 6px;
    background: linear-gradient(115deg, #141840 0%, #141840 15%, #2AB0C1 55%, #F8BE1C 100%);
  }

  /* Section eyebrow */
  .section-eyebrow {
    @apply inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-widest text-secondary;
    padding: 6px 14px;
    border: 1px solid #2AB0C1;
    border-radius: 100px;
    background: #E0F4F7;
    margin-bottom: 24px;
  }

  /* Section title */
  .section-title {
    font-size: clamp(44px, 5.6vw, 96px);
    font-weight: 500;
    line-height: 0.96;
    letter-spacing: -0.035em;
    color: #141840;
    max-width: 18ch;
    margin-bottom: 72px;
  }
  .section-title em {
    font-family: 'Instrument Serif', ui-serif, Georgia, serif;
    font-style: italic;
    font-weight: 400;
    color: #2AB0C1;
    letter-spacing: -0.025em;
  }
}
```

- [ ] **Step 5: Update `src/app/[locale]/layout.tsx` to remove pt-16 (navbar handles its own spacing)**

Replace `<main className="pt-16">{children}</main>` with `<main>{children}</main>`.

- [ ] **Step 6: Verify the build compiles**

```bash
cd /Users/octavekoudoyor/digitowls-site && npm run build 2>&1 | tail -5
```

Expected: Build succeeds (may have warnings about unused components but no errors).

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx tailwind.config.ts src/app/globals.css src/app/[locale]/layout.tsx
git commit -m "feat: update design foundations — light theme, new fonts, design tokens"
```

---

### Task 2: Rewrite Navbar component

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `messages/fr.json` (nav section)
- Modify: `messages/en.json` (nav section)

- [ ] **Step 1: Rewrite `src/components/layout/Navbar.tsx`**

Replace the entire file with:

```tsx
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
          <Image src="/images/logo/owl-4.svg" alt="digitowls" width={44} height={44} />
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
```

- [ ] **Step 2: Update `messages/fr.json` nav section**

Replace the `"nav"` key:

```json
"nav": {
  "services": "Services",
  "proxym": "Proxym",
  "approach": "Approche",
  "realisations": "Réalisations",
  "team": "Équipe",
  "careers": "Carrières",
  "about": "À propos",
  "products": "Produits",
  "blog": "Blog",
  "contact": "Contact",
  "cta": "Démarrer un projet"
}
```

- [ ] **Step 3: Update `messages/en.json` nav section**

Replace the `"nav"` key:

```json
"nav": {
  "services": "Services",
  "proxym": "Proxym",
  "approach": "Approach",
  "realisations": "Projects",
  "team": "Team",
  "careers": "Careers",
  "about": "About",
  "products": "Products",
  "blog": "Blog",
  "contact": "Contact",
  "cta": "Start a project"
}
```

- [ ] **Step 4: Verify the build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Navbar.tsx messages/fr.json messages/en.json
git commit -m "feat: rewrite navbar with light theme and scroll spy"
```

---

### Task 3: Rewrite Hero component with animated owl SVG

**Files:**
- Modify: `src/components/home/Hero.tsx`
- Create: `src/components/home/OwlVisual.tsx`
- Modify: `messages/fr.json` (hero section)
- Modify: `messages/en.json` (hero section)

- [ ] **Step 1: Create `src/components/home/OwlVisual.tsx`**

This is the animated owl card from the hero. Create a new file:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export default function OwlVisual() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pupils = document.querySelectorAll("[data-eye]");
    const handler = (e: MouseEvent) => {
      pupils.forEach((pupil) => {
        const rect = pupil.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.hypot(dx, dy) / 28, 5);
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        pupil.setAttribute("transform", `translate(${x}, ${y})`);
      });
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="relative aspect-square max-w-[480px] justify-self-end w-full" ref={containerRef}>
      <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-[20px] p-8 overflow-hidden flex flex-col">
        {/* Glow */}
        <div className="absolute -top-[30%] -left-[20%] w-[85%] h-[85%] bg-gradient-to-br from-primary via-secondary to-accent blur-[60px] opacity-50 rounded-full animate-glow-pulse pointer-events-none" />

        {/* Header */}
        <div className="relative z-[2] flex justify-between font-mono text-[11px] text-white/55 tracking-widest uppercase mb-5">
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-blink" />
            {t("card_live")}
          </span>
          <span>FIG. 01</span>
        </div>

        {/* KPI Strip */}
        <div className="relative z-[3] grid grid-cols-3 gap-2 mb-2.5">
          <KpiPill color="text-green-500" value="98" unit="%" label={t("kpi_clients")} />
          <KpiPill color="text-secondary" value="96" unit="%" label={t("kpi_team")} delay="0.6s" />
          <KpiPill color="text-accent" value="4.9" unit="/5" label={t("kpi_innovation")} delay="1.2s" />
        </div>

        {/* Owl Display */}
        <div className="relative z-[2] flex-1 flex justify-center items-center py-5">
          {/* Scan Line */}
          <div className="absolute left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_10px_#F8BE1C,0_0_4px_#F8BE1C] z-[4] pointer-events-none opacity-0 animate-scan-sweep" style={{ animationDelay: "1.5s" }} />

          {/* Floating Metrics */}
          <div className="absolute inset-0 pointer-events-none z-[5]">
            <div className="absolute top-[4%] right-[-4%] bg-primary/55 border border-white/12 rounded-[10px] px-3 py-2 backdrop-blur-[12px] min-w-[78px] animate-metric-float">
              <div className="font-mono text-[8px] text-white/55 tracking-widest uppercase mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-accent animate-blink" />
                {t("metric_roi")}
              </div>
              <div className="text-xl font-bold tracking-tight leading-none text-white flex items-baseline gap-0.5">
                <span className="text-green-500 text-sm">↗</span> <span className="text-accent">+42</span><span className="text-xs font-medium opacity-70 ml-0.5">%</span>
              </div>
            </div>
            <div className="absolute top-[42%] left-[-6%] bg-primary/55 border border-white/12 rounded-[10px] px-3 py-2 backdrop-blur-[12px] min-w-[78px] animate-metric-float" style={{ animationDelay: "1.3s" }}>
              <div className="font-mono text-[8px] text-white/55 tracking-widest uppercase mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-accent animate-blink" />
                {t("metric_precision")}
              </div>
              <div className="text-xl font-bold tracking-tight leading-none text-white flex items-baseline gap-0.5">
                <span className="text-secondary-soft">99.8</span><span className="text-xs font-medium opacity-70 ml-0.5">%</span>
              </div>
            </div>
            <div className="absolute bottom-[6%] right-[-2%] bg-primary/55 border border-white/12 rounded-[10px] px-3 py-2 backdrop-blur-[12px] min-w-[78px] animate-metric-float" style={{ animationDelay: "2.6s" }}>
              <div className="font-mono text-[8px] text-white/55 tracking-widest uppercase mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-accent animate-blink" />
                {t("metric_patterns")}
              </div>
              <div className="text-xl font-bold tracking-tight leading-none text-white">2<span className="text-white/50 mx-px">.</span>847</div>
            </div>
          </div>

          {/* Owl SVG */}
          <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" className="w-[220px] h-auto">
            <defs>
              <linearGradient id="owlGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2AB0C1" />
                <stop offset="100%" stopColor="#F8BE1C" />
              </linearGradient>
            </defs>
            <ellipse cx="140" cy="165" rx="95" ry="105" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
            <ellipse cx="140" cy="105" rx="78" ry="68" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
            <path d="M 85 58 L 72 32 L 98 62" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round" opacity="0.9" />
            <path d="M 195 58 L 208 32 L 182 62" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round" opacity="0.9" />
            <circle cx="112" cy="105" r="32" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
            <circle cx="168" cy="105" r="32" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
            <circle cx="112" cy="105" r="22" fill="url(#owlGrad)" opacity="0.95" />
            <circle cx="168" cy="105" r="22" fill="url(#owlGrad)" opacity="0.95" />
            <circle cx="112" cy="105" r="10" fill="#141840" data-eye />
            <circle cx="168" cy="105" r="10" fill="#141840" data-eye />
            <circle cx="109" cy="102" r="3" fill="#FFFFFF" />
            <circle cx="165" cy="102" r="3" fill="#FFFFFF" />
            <path d="M 132 128 L 140 145 L 148 128 Z" fill="#F8BE1C" />
            <g>
              <circle className="animate-orbit-pulse" cx="220" cy="50" r="2.8" fill="#2AB0C1" />
              <circle className="animate-orbit-pulse" style={{ animationDelay: "0.6s" }} cx="245" cy="110" r="2.2" fill="#F8BE1C" />
              <circle className="animate-orbit-pulse" style={{ animationDelay: "1.2s" }} cx="55" cy="55" r="2.8" fill="#F8BE1C" />
              <circle className="animate-orbit-pulse" style={{ animationDelay: "1.8s" }} cx="30" cy="115" r="2.2" fill="#2AB0C1" />
              <circle className="animate-orbit-pulse" style={{ animationDelay: "2.4s" }} cx="145" cy="20" r="2" fill="#2AB0C1" />
            </g>
            <g>
              <line x1="100" y1="242" x2="180" y2="242" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="0.7" />
              <rect className="origin-bottom animate-bar-dance" x="103" y="210" width="6" height="30" fill="#FFFFFF" opacity="0.7" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.1s", animationDuration: "1.1s" }} x="113" y="195" width="6" height="45" fill="#2AB0C1" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.3s", animationDuration: "1.5s" }} x="123" y="180" width="6" height="60" fill="#FFFFFF" opacity="0.95" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.5s", animationDuration: "1.2s" }} x="133" y="200" width="6" height="40" fill="#F8BE1C" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.25s", animationDuration: "1.4s" }} x="143" y="185" width="6" height="55" fill="#2AB0C1" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.15s", animationDuration: "1.0s" }} x="153" y="215" width="6" height="25" fill="#FFFFFF" opacity="0.75" />
              <rect className="origin-bottom animate-bar-dance" style={{ animationDelay: "0.4s", animationDuration: "1.3s" }} x="163" y="195" width="6" height="45" fill="#F8BE1C" />
              <text x="140" y="258" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#FFFFFF" opacity="0.55" letterSpacing="1.5">ANALYZING · 1.2M/J</text>
            </g>
          </svg>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-[2] grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
          <div>
            <b className="block text-2xl font-semibold text-white tracking-tight">350+</b>
            <span className="font-mono text-[10px] text-white/55 tracking-widest uppercase">{t("stat_experts")}</span>
          </div>
          <div>
            <b className="block text-2xl font-semibold text-white tracking-tight">7+</b>
            <span className="font-mono text-[10px] text-white/55 tracking-widest uppercase">{t("stat_clients")}</span>
          </div>
          <div>
            <b className="block text-2xl font-semibold text-white tracking-tight">4–6</b>
            <span className="font-mono text-[10px] text-white/55 tracking-widest uppercase">{t("stat_poc")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiPill({ color, value, unit, label, delay }: { color: string; value: string; unit: string; label: string; delay?: string }) {
  return (
    <div className={`relative ${color} bg-white/[0.04] border border-white/10 rounded-[10px] px-2.5 py-2 flex items-center gap-2 overflow-hidden`}>
      <div className="absolute bottom-0 left-2 right-2 h-0.5 rounded bg-current opacity-25" />
      <div className="w-[22px] h-[22px] flex items-center justify-center rounded-[7px] shrink-0" style={{ background: "color-mix(in srgb, currentColor 18%, transparent)" }}>
        <svg className="w-[13px] h-[13px]" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="5" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-sm font-bold text-white tracking-tight">{value}<span className="text-[10px] font-medium opacity-55 ml-0.5">{unit}</span></span>
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/50 mt-px">{label}</span>
      </div>
      <span className="absolute top-2 right-2 w-[5px] h-[5px] rounded-full bg-current animate-blink" style={delay ? { animationDelay: delay } : undefined} />
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/home/Hero.tsx`**

Replace the entire file:

```tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import OwlVisual from "./OwlVisual";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white py-[120px] px-8 max-md:py-[70px] max-md:px-5">
        {/* Animated gradient blob */}
        <div className="absolute -top-[20%] -right-[10%] w-[85%] h-[130%] bg-gradient-to-br from-primary via-secondary to-accent blur-[100px] opacity-55 animate-drift pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-primary to-transparent pointer-events-none" />
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        <div className="max-w-container mx-auto relative z-[2] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-20 lg:gap-20 items-center">
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-white/20 rounded-full text-xs font-medium tracking-widest text-white/90 mb-9 backdrop-blur-[10px] bg-white/[0.04]">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_#F8BE1C]" />
              {t("label")}
            </div>

            {/* Title */}
            <h1 className="text-[clamp(56px,7.8vw,128px)] font-medium leading-[0.93] tracking-[-0.045em] mb-9" style={{ fontVariationSettings: "'wdth' 95" }}>
              {t("title_line1")}<br />
              <em className="font-serif font-normal italic bg-gradient-to-r from-secondary-soft to-accent bg-clip-text text-transparent tracking-[-0.025em]">{t("title_line2")}</em><br />
              <span className="font-light text-white/85" style={{ fontVariationSettings: "'wdth' 80" }}>{t("title_line3")}</span><br />
              <span className="font-light text-white/85" style={{ fontVariationSettings: "'wdth' 80" }}>{t("title_line4")}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[19px] leading-relaxed text-white/80 max-w-[56ch] mb-12 font-light">
              {t.rich("subtitle", {
                strong: (chunks) => <strong className="text-white font-medium">{chunks}</strong>,
              })}
            </p>

            {/* CTAs */}
            <div className="flex gap-3.5 items-center flex-wrap">
              <a
                href={`/${locale}/produits/cadrage-projet-ai`}
                className="text-[15px] font-medium px-7 py-4 rounded-[10px] bg-accent text-primary inline-flex items-center gap-2.5 transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)]"
              >
                {t("cta_primary")} →
              </a>
              <a
                href="#services"
                className="text-[15px] font-medium px-7 py-4 rounded-[10px] border border-white/25 text-white inline-flex items-center gap-2.5 transition-all hover:bg-white/[0.08] hover:border-white/50"
              >
                {t("cta_secondary")}
              </a>
            </div>
          </div>

          <OwlVisual />
        </div>
      </section>
      <div className="gradient-bar" />
    </>
  );
}
```

- [ ] **Step 3: Update `messages/fr.json` hero section**

Replace the `"hero"` key:

```json
"hero": {
  "label": "Firme de consultation IA · Montréal",
  "title_line1": "Votre vision IA,",
  "title_line2": "amplifiée.",
  "title_line3": "Du conseil au",
  "title_line4": "déploiement.",
  "subtitle": "Accompagnement stratégique en intelligence artificielle — du <strong>conseil</strong> au <strong>déploiement de solutions sur mesure</strong>. Pour les banques, les assurances et les entreprises qui veulent faire de l'IA un levier de croissance concret.",
  "cta_primary": "Démarrer votre projet IA",
  "cta_secondary": "Découvrir les services",
  "card_live": "En direct · Montréal",
  "kpi_clients": "Clients",
  "kpi_team": "Équipe",
  "kpi_innovation": "Innovation",
  "metric_roi": "ROI projet",
  "metric_precision": "Précision IA",
  "metric_patterns": "Patterns",
  "stat_experts": "Experts Proxym",
  "stat_clients": "Clients majeurs",
  "stat_poc": "Sem. / POC"
}
```

- [ ] **Step 4: Update `messages/en.json` hero section**

Replace the `"hero"` key:

```json
"hero": {
  "label": "AI Consulting Firm · Montreal",
  "title_line1": "Your AI vision,",
  "title_line2": "amplified.",
  "title_line3": "From consulting to",
  "title_line4": "deployment.",
  "subtitle": "Strategic AI consulting — from <strong>advisory</strong> to <strong>deployment of tailored solutions</strong>. For banks, insurance companies, and enterprises that want to turn AI into a concrete growth lever.",
  "cta_primary": "Start your AI project",
  "cta_secondary": "Discover our services",
  "card_live": "Live · Montreal",
  "kpi_clients": "Clients",
  "kpi_team": "Team",
  "kpi_innovation": "Innovation",
  "metric_roi": "Project ROI",
  "metric_precision": "AI Precision",
  "metric_patterns": "Patterns",
  "stat_experts": "Proxym Experts",
  "stat_clients": "Major Clients",
  "stat_poc": "Wks / POC"
}
```

- [ ] **Step 5: Verify the build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add src/components/home/Hero.tsx src/components/home/OwlVisual.tsx messages/fr.json messages/en.json
git commit -m "feat: rewrite hero with animated owl SVG and light theme"
```

---

### Task 4: Rewrite ClientLogos as infinite marquee

**Files:**
- Modify: `src/components/home/ClientLogos.tsx`
- Modify: `messages/fr.json` (clients_section)
- Modify: `messages/en.json` (clients_section)

- [ ] **Step 1: Rewrite `src/components/home/ClientLogos.tsx`**

Replace the entire file:

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { clients } from "@/data/clients";

export default function ClientLogos() {
  const t = useTranslations("clients_section");

  return (
    <div className="bg-white py-14 border-b border-border overflow-hidden">
      <div className="max-w-container mx-auto px-8 flex items-center gap-14 max-md:flex-col max-md:items-start max-md:gap-7">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim shrink-0 max-w-[180px] leading-relaxed">
          {t("label")}
        </div>
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)",
          }}
        >
          <div className="flex items-center gap-16 w-max animate-marquee hover:[animation-play-state:paused]">
            {/* Set 1 */}
            {clients.map((client) => (
              <Image
                key={client.name}
                src={client.logo}
                alt={client.name}
                width={150}
                height={38}
                className="h-[38px] w-auto max-w-[150px] object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 hover:scale-[1.08] transition-all duration-300 shrink-0"
              />
            ))}
            {/* Set 2 (duplicate for seamless loop) */}
            {clients.map((client) => (
              <Image
                key={`dup-${client.name}`}
                src={client.logo}
                alt=""
                width={150}
                height={38}
                className="h-[38px] w-auto max-w-[150px] object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 hover:scale-[1.08] transition-all duration-300 shrink-0"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `messages/fr.json` clients_section**

Replace the `"clients_section"` key:

```json
"clients_section": {
  "label": "Ils nous ont confié leur transformation IA",
  "title": "Nos clients",
  "testimonials_title": "Ce qu'ils disent de nous",
  "testimonial_1": {
    "quote": "digitowls a été un partenaire précieux. Leur approche professionnelle et leurs solutions innovantes ont considérablement amélioré notre sécurité informatique.",
    "author": "Jeanne Dupont",
    "role": "VP. Opérations · Banque Nationale"
  },
  "testimonial_2": {
    "quote": "Leur expertise en IA nous a permis de transformer nos processus.",
    "author": "Marc Tremblay",
    "role": "Directeur IT"
  }
}
```

- [ ] **Step 3: Update `messages/en.json` clients_section similarly**

```json
"clients_section": {
  "label": "They trusted us with their AI transformation",
  "title": "Our clients",
  "testimonials_title": "What they say about us",
  "testimonial_1": {
    "quote": "digitowls has been an invaluable partner. Their professional approach and innovative solutions have significantly improved our IT security.",
    "author": "Jeanne Dupont",
    "role": "VP. Operations · Banque Nationale"
  },
  "testimonial_2": {
    "quote": "Their AI expertise has allowed us to transform our processes.",
    "author": "Marc Tremblay",
    "role": "IT Director"
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/home/ClientLogos.tsx messages/fr.json messages/en.json
git commit -m "feat: rewrite client logos as infinite marquee"
```

---

### Task 5: Rewrite ServicesGrid with light theme cards

**Files:**
- Modify: `src/components/home/ServicesGrid.tsx`
- Modify: `messages/fr.json` (services_section, services_data)
- Modify: `messages/en.json` (services_section, services_data)

- [ ] **Step 1: Rewrite `src/components/home/ServicesGrid.tsx`**

Replace the entire file:

```tsx
"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { services } from "@/data/services";

const serviceIcons = [
  // Conseil & Stratégie
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 12l3-3 3 3 6-6 6 6"/><circle cx="6" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="6" r="1.2" fill="currentColor"/></svg>,
  // Fintech
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="8" cy="15" r="1" fill="currentColor"/><path d="M12 15h5"/></svg>,
  // Prototypage
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>,
  // Formation
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 8l9-5 9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></svg>,
  // Talents
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="8" r="4"/><path d="M1 22v-2a6 6 0 016-6h4a6 6 0 016 6v2"/><circle cx="18" cy="8" r="3"/><path d="M23 22v-2a4 4 0 00-3-3.87"/></svg>,
  // Audit
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z"/><path d="M9 12l2 2 4-4"/></svg>,
];

export default function ServicesGrid() {
  const t = useTranslations("services_section");
  const tServices = useTranslations("services_data");
  const locale = useLocale();

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5" id="services">
      <div className="max-w-container mx-auto">
        <div className="section-eyebrow"><span>01</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.id}`}
              className="reveal group bg-white border border-border rounded-[20px] p-7 transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] relative overflow-hidden flex flex-col cursor-pointer hover:border-secondary hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(20,24,64,0.08)] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100"
            >
              <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-secondary-wash to-white border border-border flex items-center justify-center mb-6 transition-all duration-300 text-primary group-hover:bg-primary group-hover:text-accent group-hover:border-primary [&_svg]:w-[26px] [&_svg]:h-[26px]">
                {serviceIcons[i]}
              </div>
              <div className="font-mono text-[11px] text-ink-dim tracking-widest mb-2.5">Service {String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-[22px] font-semibold leading-tight tracking-tight text-primary mb-3.5">{tServices(`${service.id}.title`)}</h3>
              <p className="text-sm leading-relaxed text-ink-dim mb-6 flex-1">{tServices(`${service.id}.description`)}</p>
              <span className="self-start font-mono text-xs font-medium text-primary inline-flex items-center gap-2 tracking-widest uppercase py-2 border-b border-transparent group-hover:border-primary group-hover:gap-3.5 transition-all">
                {t("learn_more")} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `messages/fr.json` services_section**

Replace the `"services_section"` key:

```json
"services_section": {
  "label": "Nos services",
  "eyebrow": "Nos services",
  "title": "L'IA au service<br>de votre <em>croissance.</em>",
  "learn_more": "En savoir plus"
}
```

- [ ] **Step 3: Add `description` field to each service in `messages/fr.json` services_data**

For each service, add a `"description"` field with the full description from the design:
- `conseil-strategie.description`: "Transformez votre vision en feuille de route opérationnelle. Audit de maturité, identification des cas d'usage à fort ROI, accompagnement au changement."
- `fintech-assurances.description`: "L'excellence digitale bancaire avec Proxym. Core banking, conformité réglementaire, détection de fraude, souscription augmentée."
- `prototypage.description`: "De l'idée au prototype fonctionnel en 4 à 6 semaines. Validation technique, économique et métier avant passage à l'échelle."
- `formation.description`: "Préparez vos équipes à l'ère de l'intelligence artificielle. Programmes pour dirigeants, chefs de produit, développeurs et métiers."
- `talents.description`: "L'expertise technique nouvelle génération, intégrée chez vous. Architectes IA, data scientists, ingénieurs ML, product managers."
- `audit.description`: "Sécurisez vos fondations technologiques. Revue d'architecture, dette technique, conformité, cybersécurité, optimisation cloud."

- [ ] **Step 4: Do the same for `messages/en.json` services_section and services_data**

```json
"services_section": {
  "label": "Our services",
  "eyebrow": "Our services",
  "title": "AI at the service<br>of your <em>growth.</em>",
  "learn_more": "Learn more"
}
```

And add English `description` fields to each service.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/ServicesGrid.tsx messages/fr.json messages/en.json
git commit -m "feat: rewrite services grid with light theme cards and SVG icons"
```

---

### Task 6: Create Proxym section

**Files:**
- Create: `src/components/home/ProxymSection.tsx`
- Modify: `messages/fr.json` (add proxym_section)
- Modify: `messages/en.json` (add proxym_section)

- [ ] **Step 1: Create `src/components/home/ProxymSection.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";

const stats = [
  { num: "350", unit: "+", key: "stat_1" },
  { num: "20", unit: "ans", key: "stat_2" },
  { num: "3", unit: "piliers", key: "stat_3" },
  { num: "1", unit: "équipe", key: "stat_4" },
];

export default function ProxymSection() {
  const t = useTranslations("proxym_section");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-primary text-white overflow-hidden" id="proxym">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow !text-accent !bg-accent/10 !border-accent/30">
          <span>02</span>{t("eyebrow")}
        </div>
        <h2 className="section-title reveal !text-white">
          {t.rich("title", {
            em: (chunks) => <em className="!text-accent">{chunks}</em>,
          })}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[100px] max-lg:gap-[60px] items-center">
          <p className="reveal text-xl leading-relaxed text-white/80 font-light max-w-[52ch]">
            {t.rich("lead", {
              strong: (chunks) => <strong className="text-white font-medium">{chunks}</strong>,
              em: (chunks) => <em className="font-serif italic text-secondary-soft font-normal">{chunks}</em>,
            })}
          </p>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.key} className="reveal bg-white/5 border border-white/10 rounded-2xl p-7 transition-all hover:bg-white/[0.08] hover:-translate-y-[3px] relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent">
                <div className="text-[56px] font-semibold leading-none tracking-[-0.04em] mb-2.5 text-white flex items-baseline gap-1">
                  {stat.num}<span className="text-[22px] text-accent font-medium tracking-tight">{stat.unit}</span>
                </div>
                <div className="text-[13px] text-white/60 leading-normal">{t(stat.key)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `proxym_section` to `messages/fr.json`**

```json
"proxym_section": {
  "eyebrow": "Alliance stratégique",
  "title": "Une force de frappe<br><em>internationale.</em>",
  "lead": "digitowls est le <strong>représentant exclusif de Proxym au Canada</strong>. Cette alliance permet d'offrir au marché canadien le meilleur des deux mondes : <em>l'agilité locale</em> d'une équipe montréalaise réactive et au fait des enjeux nord-américains, combinée à <em>la puissance globale</em> d'un leader européen de la transformation numérique.",
  "stat_1": "Experts Proxym mobilisables sur vos projets",
  "stat_2": "D'expérience en transformation numérique",
  "stat_3": "Innovation Lab, Banque & Assurance, Talents",
  "stat_4": "Montréalaise — proche, réactive, bilingue"
}
```

- [ ] **Step 3: Add `proxym_section` to `messages/en.json`**

```json
"proxym_section": {
  "eyebrow": "Strategic Alliance",
  "title": "An international<br><em>strike force.</em>",
  "lead": "digitowls is the <strong>exclusive representative of Proxym in Canada</strong>. This alliance offers the Canadian market the best of both worlds: <em>local agility</em> from a responsive Montreal team aware of North American challenges, combined with <em>global power</em> from a European leader in digital transformation.",
  "stat_1": "Proxym experts available for your projects",
  "stat_2": "Years of digital transformation experience",
  "stat_3": "Innovation Lab, Banking & Insurance, Talent",
  "stat_4": "Montreal-based — close, responsive, bilingual"
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/home/ProxymSection.tsx messages/fr.json messages/en.json
git commit -m "feat: add Proxym strategic alliance section"
```

---

### Task 7: Rewrite Approche DOer as phase cards

**Files:**
- Modify: `src/components/about/ApprocheDOer.tsx`
- Modify: `messages/fr.json` (approche_doer)
- Modify: `messages/en.json` (approche_doer)

- [ ] **Step 1: Rewrite `src/components/about/ApprocheDOer.tsx`**

Replace the entire file:

```tsx
"use client";

import { useTranslations } from "next-intl";

const phases = [
  { key: "phase_1", badgeColor: "bg-primary text-accent" },
  { key: "phase_2", badgeColor: "bg-primary-soft text-accent" },
  { key: "phase_3", badgeColor: "bg-secondary text-white" },
  { key: "phase_4", badgeColor: "bg-accent text-primary" },
];

export default function ApprocheDOer() {
  const t = useTranslations("approche_doer");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2" id="approche">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow"><span>03</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-md:gap-8">
          {phases.map((phase, i) => (
            <div key={phase.key} className="reveal bg-white border border-border rounded-[18px] p-7 relative transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-[0_14px_30px_rgba(20,24,64,0.06)]">
              <div className={`absolute -top-3.5 left-6 ${phase.badgeColor} font-mono text-[11px] font-medium px-3.5 py-1.5 rounded-full tracking-widest`}>
                Phase {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[26px] font-semibold tracking-tight mt-4 mb-3.5 text-primary">
                {t.rich(`${phase.key}_title`, {
                  em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
                })}
              </h3>
              <p className="text-sm leading-relaxed text-ink-dim">{t(`${phase.key}_desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `messages/fr.json` approche_doer**

Replace the `"approche_doer"` key:

```json
"approche_doer": {
  "eyebrow": "Approche « DOer »",
  "title": "Basée sur l'expérimentation<br>de cas <em>(très)</em> concrets.",
  "phase_1_title": "<em>Use</em> Case",
  "phase_1_desc": "Identification du cas métier à fort potentiel. Cadrage précis des objectifs, contraintes et critères de réussite.",
  "phase_2_title": "<em>Proof</em> of Concept",
  "phase_2_desc": "Prototype fonctionnel en 4 à 6 semaines. Validation technique, économique et utilisateur en conditions réelles.",
  "phase_3_title": "<em>Itérations</em>",
  "phase_3_desc": "Raffinements successifs basés sur les retours terrain. Ajustement du modèle, des données et de l'expérience.",
  "phase_4_title": "Industriali<em>sation</em>",
  "phase_4_desc": "Intégration pleine dans votre SI, gouvernance, monitoring, formation des équipes. L'IA passe en production."
}
```

- [ ] **Step 3: Update `messages/en.json` approche_doer similarly**

```json
"approche_doer": {
  "eyebrow": "DOer Approach",
  "title": "Based on experimentation<br>of <em>(very)</em> concrete cases.",
  "phase_1_title": "<em>Use</em> Case",
  "phase_1_desc": "Identifying high-potential business cases. Precise scoping of objectives, constraints, and success criteria.",
  "phase_2_title": "<em>Proof</em> of Concept",
  "phase_2_desc": "Functional prototype in 4 to 6 weeks. Technical, economic, and user validation in real conditions.",
  "phase_3_title": "<em>Iterations</em>",
  "phase_3_desc": "Successive refinements based on field feedback. Model, data, and experience adjustments.",
  "phase_4_title": "Industriali<em>zation</em>",
  "phase_4_desc": "Full integration into your IS, governance, monitoring, team training. AI goes to production."
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/about/ApprocheDOer.tsx messages/fr.json messages/en.json
git commit -m "feat: rewrite approach section as phase cards"
```

---

### Task 8: Rewrite Réalisations with asymmetric grid and SVG illustrations

**Files:**
- Create: `src/components/home/RealisationsSection.tsx`
- Modify: `messages/fr.json` (realisations_page)
- Modify: `messages/en.json` (realisations_page)

- [ ] **Step 1: Create `src/components/home/RealisationsSection.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";

const cases = [
  { id: "case_1", span: "col-span-6 lg:col-span-3", bgClass: "bg-gradient-to-br from-secondary-wash to-white" },
  { id: "case_2", span: "col-span-6 lg:col-span-3", bgClass: "bg-gradient-to-br from-accent/10 to-white" },
  { id: "case_3", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-primary/[0.04] to-white" },
  { id: "case_4", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-secondary-wash to-accent/[0.06]" },
  { id: "case_5", span: "col-span-6 md:col-span-3 lg:col-span-2", bgClass: "bg-gradient-to-br from-primary/5 to-secondary-wash" },
];

export default function RealisationsSection() {
  const t = useTranslations("realisations_page");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5" id="realisations">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow"><span>04</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </h2>

        <div className="grid grid-cols-6 gap-5">
          {cases.map((c) => (
            <div key={c.id} className={`${c.span} cursor-pointer transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1.5 reveal`}>
              <div className={`aspect-[4/3] ${c.bgClass} border border-border rounded-2xl relative overflow-hidden mb-4 transition-all duration-300 flex items-center justify-center hover:border-primary hover:shadow-[0_14px_30px_rgba(20,24,64,0.08)]`}>
                {/* Simple placeholder for visual area */}
                <div className="w-3/4 h-3/4 opacity-30 flex items-center justify-center">
                  <svg viewBox="0 0 100 75" className="w-full h-full" fill="none" stroke="#141840" strokeWidth="0.8">
                    <rect x="10" y="10" width="80" height="55" rx="4" />
                    <circle cx="50" cy="37" r="15" stroke="#2AB0C1" />
                    <circle cx="50" cy="37" r="5" fill="#F8BE1C" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-ink-dim mb-2.5">
                <span className="text-secondary font-medium">{t(`${c.id}.tag`)}</span>
                <span>{t(`${c.id}.year`)}</span>
              </div>
              <h3 className="text-[22px] font-semibold leading-tight tracking-tight mb-2 text-primary">
                {t.rich(`${c.id}.title`, {
                  em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
                })}
              </h3>
              <p className="text-sm text-ink-dim leading-normal">{t(`${c.id}.client`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `messages/fr.json` realisations_page**

Replace the `"realisations_page"` key:

```json
"realisations_page": {
  "eyebrow": "Réalisations",
  "title": "Des résultats concrets,<br>une valeur <em>mesurable.</em>",
  "description": "Nos réalisations",
  "filter_all": "Tous",
  "case_1": {
    "tag": "Assistant AI",
    "year": "2025",
    "title": "Banques & <em>finances</em>",
    "client": "Agent conversationnel client, assistant conformité IA, synthétiseur de rapports financiers."
  },
  "case_2": {
    "tag": "Desjardins · Kafka",
    "year": "2023",
    "title": "Plateforme <em>data</em> temps réel",
    "client": "Fondation multi-cloud Apache Kafka — architecture événementielle au cœur des usages critiques."
  },
  "case_3": {
    "tag": "Fnac · Sécurité",
    "year": "2025",
    "title": "Détection <em>logistique</em>",
    "client": "Agents d'assistance de détection de sécurité logistique."
  },
  "case_4": {
    "tag": "RH",
    "year": "2025",
    "title": "Assistant <em>RH</em>",
    "client": "Analyse de données RH et automatisation du recrutement."
  },
  "case_5": {
    "tag": "Santé · ML",
    "year": "2025",
    "title": "Assistants <em>santé</em>",
    "client": "Agent vocal, planification prédictive, solutions ML."
  },
  "projects": {}
}
```

- [ ] **Step 3: Update `messages/en.json` realisations_page similarly**

```json
"realisations_page": {
  "eyebrow": "Projects",
  "title": "Concrete results,<br>measurable <em>value.</em>",
  "description": "Our projects",
  "filter_all": "All",
  "case_1": {
    "tag": "AI Assistant",
    "year": "2025",
    "title": "Banking & <em>finance</em>",
    "client": "Customer conversational agent, AI compliance assistant, financial report synthesizer."
  },
  "case_2": {
    "tag": "Desjardins · Kafka",
    "year": "2023",
    "title": "Real-time <em>data</em> platform",
    "client": "Multi-cloud Apache Kafka foundation — event-driven architecture at the heart of critical use cases."
  },
  "case_3": {
    "tag": "Fnac · Security",
    "year": "2025",
    "title": "<em>Logistics</em> detection",
    "client": "Logistics security detection assistance agents."
  },
  "case_4": {
    "tag": "HR",
    "year": "2025",
    "title": "<em>HR</em> assistant",
    "client": "HR data analysis and recruitment automation."
  },
  "case_5": {
    "tag": "Health · ML",
    "year": "2025",
    "title": "<em>Health</em> assistants",
    "client": "Voice agent, predictive planning, ML solutions."
  },
  "projects": {}
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/home/RealisationsSection.tsx messages/fr.json messages/en.json
git commit -m "feat: add realisations section with asymmetric grid"
```

---

### Task 9: Rewrite TeamGrid with photo cards and LinkedIn badges

**Files:**
- Modify: `src/components/about/TeamGrid.tsx`

- [ ] **Step 1: Rewrite `src/components/about/TeamGrid.tsx`**

Replace the entire file:

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { team } from "@/data/team";

export default function TeamGrid() {
  const tTeam = useTranslations("team_data");

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-md:gap-4">
      {team.filter(m => m.id !== "olivier-trudeau").map((member) => (
        <div key={member.id} className="reveal group">
          <div className="aspect-[3/4] bg-primary rounded-[18px] mb-5 relative overflow-hidden transition-all duration-[400ms] group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_48px_rgba(20,24,64,0.18)]">
            <Image
              src={member.image}
              alt={tTeam(`${member.id}.name`)}
              fill
              className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2] pointer-events-none" />
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3.5 right-3.5 text-white/90 z-[3] transition-all w-8 h-8 flex items-center justify-center rounded-lg bg-primary/40 backdrop-blur-[8px] group-hover:text-accent group-hover:bg-primary/75"
                aria-label={`LinkedIn ${tTeam(`${member.id}.name`)}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8 17v-7H5v7h3zM6.5 8.5A1.5 1.5 0 108.5 7 1.5 1.5 0 006.5 8.5zM19 17v-4c0-2-1-3-3-3a2.7 2.7 0 00-2.5 1.3V10H11v7h3v-3.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V17h2z"/></svg>
              </a>
            )}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-secondary mb-1.5 font-medium">{tTeam(`${member.id}.role`)}</div>
          <h3 className="text-xl font-semibold tracking-tight mb-2 text-primary">{tTeam(`${member.id}.name`)}</h3>
          <p className="text-[13px] text-ink-dim leading-relaxed">{tTeam(`${member.id}.bio`)}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/TeamGrid.tsx
git commit -m "feat: rewrite team grid with photo cards and LinkedIn badges"
```

---

### Task 10: Rewrite ValuesSection with vertical columns

**Files:**
- Modify: `src/components/about/ValuesSection.tsx`

- [ ] **Step 1: Rewrite `src/components/about/ValuesSection.tsx`**

Replace the entire file:

```tsx
"use client";

import { useTranslations } from "next-intl";

const values = [
  { id: "innovation", num: "01 / 04" },
  { id: "collaboration", num: "02 / 04" },
  { id: "excellence", num: "03 / 04" },
  { id: "integrity", num: "04 / 04" },
];

export default function ValuesSection() {
  const tValues = useTranslations("values_data");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-md:[&>div]:border-b max-md:[&>div]:border-border max-md:[&>div]:py-8 max-md:[&>div]:px-0 lg:[&>div]:border-r lg:[&>div]:border-border lg:[&>div:last-child]:border-r-0">
      {values.map((value, i) => (
        <div
          key={value.id}
          className={`reveal relative py-12 ${i === 0 ? "pr-8 lg:pr-8" : "px-8"} ${i === values.length - 1 ? "lg:pr-0" : ""}`}
        >
          <div className={`absolute top-0 ${i === 0 ? "left-0" : "left-8"} w-10 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent rounded-b-sm`} />
          <div className="font-mono text-xs text-ink-dim tracking-widest my-6">{value.num}</div>
          <h3 className="text-[30px] font-semibold tracking-tight mb-4 leading-none text-primary">
            {tValues.rich(`${value.id}.title_rich`, {
              em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
            })}
          </h3>
          <p className="text-sm leading-relaxed text-ink-dim">{tValues(`${value.id}.description`)}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Update `messages/fr.json` values_data with title_rich**

For each value, add a `"title_rich"` key:

```json
"values_data": {
  "innovation": { "title": "Innovation", "title_rich": "<em>Innovation</em>", "description": "Nous repoussons les limites de l'IA pour créer des solutions avant-gardistes — et utiles." },
  "collaboration": { "title": "Collaboration", "title_rich": "Collabo<em>ration</em>", "description": "Nous travaillons main dans la main avec nos clients pour atteindre leurs objectifs." },
  "excellence": { "title": "Excellence", "title_rich": "<em>Excellence</em>", "description": "Nous visons l'excellence dans chaque projet et chaque interaction." },
  "integrity": { "title": "Intégrité", "title_rich": "Intégrité", "description": "Transparence et éthique guident toutes nos décisions." }
}
```

- [ ] **Step 3: Update `messages/en.json` values_data similarly**

- [ ] **Step 4: Commit**

```bash
git add src/components/about/ValuesSection.tsx messages/fr.json messages/en.json
git commit -m "feat: rewrite values section with vertical columns"
```

---

### Task 11: Create Careers section, Testimonial section, and CTA section

**Files:**
- Create: `src/components/home/CareersSection.tsx`
- Create: `src/components/home/TestimonialSection.tsx`
- Create: `src/components/home/CtaSection.tsx`
- Modify: `messages/fr.json` (add careers_home, testimonial, cta_section)
- Modify: `messages/en.json` (add careers_home, testimonial, cta_section)

- [ ] **Step 1: Create `src/components/home/CareersSection.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";

const jobs = [
  { key: "job_1", email_subject: "Sp%C3%A9cialiste%20QA%20Automation" },
  { key: "job_2", email_subject: "Architecte%20IA%20%26%20Blockchain" },
  { key: "job_3", email_subject: "Lead%20D%C3%A9veloppeur%20Fullstack" },
];

export default function CareersSection() {
  const t = useTranslations("careers_home");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2" id="carrieres">
      <div className="max-w-container mx-auto relative">
        <div className="section-eyebrow"><span>07</span>{t("eyebrow")}</div>
        <h2 className="section-title reveal">
          {t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </h2>
        <p className="reveal text-lg leading-relaxed text-ink-dim max-w-[62ch] -mt-10 mb-14 font-light">
          {t.rich("lead", {
            strong: (chunks) => <strong className="text-primary font-medium">{chunks}</strong>,
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <div key={job.key} className="reveal group bg-white border border-border rounded-[18px] p-7 flex flex-col transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] relative overflow-hidden hover:border-accent hover:-translate-y-[5px] hover:shadow-[0_18px_40px_rgba(20,24,64,0.1)] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100">
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-secondary-wash text-secondary border border-secondary/20 font-semibold">{t(`${job.key}.level`)}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-2 text-ink-dim border border-border font-medium">{t(`${job.key}.type`)}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-2 text-ink-dim border border-border font-medium inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {t(`${job.key}.location`)}
                </span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight leading-tight text-primary mb-3.5 min-h-[58px]">
                {t.rich(`${job.key}.title`, {
                  em: (chunks) => <em className="font-serif italic text-secondary font-normal">{chunks}</em>,
                })}
              </h3>
              <p className="text-sm leading-relaxed text-ink-dim mb-6 flex-1">{t(`${job.key}.desc`)}</p>
              <a
                href={`mailto:candidature@digitowls.com?subject=${job.email_subject}`}
                className="self-start inline-flex items-center gap-2.5 text-sm font-semibold text-primary px-5 py-3 bg-accent rounded-[10px] transition-all group-hover:bg-primary group-hover:text-accent"
              >
                {t("apply")} <span className="inline-block transition-transform group-hover:translate-x-[3px]">→</span>
              </a>
            </div>
          ))}
        </div>

        <div className="reveal flex items-center justify-between gap-8 px-8 py-7 bg-white border border-dashed border-border-strong rounded-2xl mt-2 hover:border-accent hover:border-solid transition-colors max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-6">
          <div className="text-sm text-ink-dim leading-relaxed flex-1">
            <strong className="block text-primary text-[17px] font-semibold mb-1 tracking-tight">{t("spontaneous_title")}</strong>
            {t("spontaneous_text")}
          </div>
          <a href="mailto:candidature@digitowls.com" className="shrink-0 text-sm font-medium px-5 py-3 border border-border rounded-[10px] text-primary hover:border-accent hover:bg-accent/5 transition-all">
            {t("spontaneous_cta")} →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/home/TestimonialSection.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function TestimonialSection() {
  const t = useTranslations("testimonial");

  return (
    <section className="bg-secondary-wash py-[140px] px-8 max-md:py-20 max-md:px-5 text-center">
      <div className="max-w-[960px] mx-auto">
        <div className="font-serif text-[72px] text-accent leading-[0.8] -mb-5 italic">&ldquo;</div>
        <p className="reveal text-[clamp(28px,3.6vw,48px)] leading-[1.25] tracking-tight text-primary font-normal max-w-[26ch] mx-auto my-6 mb-10">
          {t.rich("quote", {
            em: (chunks) => <em className="font-serif italic text-secondary">{chunks}</em>,
          })}
        </p>
        <div className="inline-flex items-center gap-4 text-sm text-ink-dim">
          <div className="w-10 h-10 rounded-full bg-primary text-accent flex items-center justify-center font-semibold text-sm">
            {t("avatar")}
          </div>
          <div className="text-left">
            <b className="text-primary font-semibold block">{t("author")}</b>
            {t("role")}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/home/CtaSection.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function CtaSection() {
  const t = useTranslations("cta_section");

  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-primary text-white relative overflow-hidden" id="contact">
      <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[160%] bg-gradient-to-br from-primary via-secondary to-accent blur-[120px] opacity-45 animate-drift pointer-events-none" style={{ animationDirection: "reverse" }} />

      <div className="max-w-[1100px] mx-auto relative z-[2] text-center">
        <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-accent mb-8 font-medium">
          ◎ {t("label")}
        </div>
        <h2 className="reveal text-[clamp(48px,7vw,104px)] font-medium leading-[0.95] tracking-[-0.04em] mb-8">
          {t.rich("headline", {
            em: (chunks) => <em className="font-serif italic font-normal bg-gradient-to-r from-secondary-soft to-accent bg-clip-text text-transparent">{chunks}</em>,
          })}
        </h2>
        <p className="text-lg text-white/80 max-w-[54ch] mx-auto mb-12 font-light">{t("subtitle")}</p>
        <div className="inline-flex gap-3.5 flex-wrap justify-center">
          <a
            href="https://calendly.com/digitowls"
            className="text-[15px] font-medium px-7 py-4 rounded-[10px] bg-accent text-primary inline-flex items-center gap-2.5 transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(248,190,28,0.3)]"
          >
            {t("cta_primary")} →
          </a>
          <a
            href="mailto:candidature@digitowls.com"
            className="text-[15px] font-medium px-7 py-4 rounded-[10px] border border-white/25 text-white inline-flex items-center gap-2.5 transition-all hover:bg-white/[0.08] hover:border-white/50"
          >
            {t("cta_email")}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add `careers_home`, `testimonial`, and `cta_section` to `messages/fr.json`**

```json
"careers_home": {
  "eyebrow": "Carrières · 3 postes ouverts",
  "title": "Rejoignez une équipe<br>de <em>passionnés.</em>",
  "lead": "Nous recherchons des profils <strong>engagés, opérationnels et très bons dans ce qu'ils font</strong>. Tous nos postes sont à Montréal, en temps plein, avec accès aux projets de Banque Nationale, Desjardins, Intact — et au réseau Proxym international.",
  "apply": "Postuler",
  "spontaneous_title": "Aucun poste ne correspond à votre profil ?",
  "spontaneous_text": "Envoyez-nous votre CV — on trouvera peut-être une piste ensemble. L'IA appliquée évolue vite, et les bons profils trouvent toujours leur place chez nous.",
  "spontaneous_cta": "Candidature spontanée",
  "job_1": {
    "level": "Senior",
    "type": "Temps plein",
    "location": "Montréal, QC",
    "title": "Spécialiste <em>QA</em> Automation",
    "desc": "Mettez les tests automatisés, la qualité et la fiabilité au cœur de nos produits. Selenium, Cypress, Playwright, pipelines CI/CD (Jenkins, GitLab, GitHub Actions), tests de performance (JMeter, k6)."
  },
  "job_2": {
    "level": "Senior",
    "type": "Temps plein",
    "location": "Montréal, QC",
    "title": "Architecte <em>IA</em> & Blockchain",
    "desc": "Portez une vision stratégique, concevez des architectures robustes, livrez des cas d'usage concrets. IA/ML (Python, TensorFlow, PyTorch, LLM), blockchain (Ethereum, Solidity, Web3), cloud (AWS, Azure, GCP)."
  },
  "job_3": {
    "level": "Senior",
    "type": "Temps plein",
    "location": "Montréal, QC",
    "title": "Lead Dev <em>Fullstack</em>",
    "desc": "Dirigez techniquement une équipe, concevez des applications web & mobiles performantes. React/Next.js, Node.js, TypeScript, bases SQL/NoSQL, pratiques DevOps et CI/CD, mentorat."
  }
},
"testimonial": {
  "quote": "digitowls a été un partenaire <em>précieux</em>. Leur approche professionnelle et leurs solutions innovantes ont considérablement amélioré notre sécurité informatique.",
  "avatar": "JD",
  "author": "Jeanne Dupont",
  "role": "VP. Opérations · Banque Nationale"
},
"cta_section": {
  "label": "Prêt à transformer votre entreprise avec l'IA ?",
  "headline": "Réservez une <em>consultation</em><br>gratuite avec nos experts.",
  "subtitle": "Quelques lignes suffisent pour commencer. Nous répondons sous 48 heures ouvrables.",
  "cta_primary": "Réserver maintenant",
  "cta_email": "candidature@digitowls.com"
}
```

- [ ] **Step 5: Add the same keys to `messages/en.json`**

```json
"careers_home": {
  "eyebrow": "Careers · 3 open positions",
  "title": "Join a team<br>of <em>passionate people.</em>",
  "lead": "We're looking for <strong>committed, hands-on profiles who are very good at what they do</strong>. All positions are in Montreal, full-time, with access to Banque Nationale, Desjardins, Intact projects — and the international Proxym network.",
  "apply": "Apply",
  "spontaneous_title": "No position matches your profile?",
  "spontaneous_text": "Send us your resume — we might find a path together. Applied AI evolves fast, and great profiles always find their place with us.",
  "spontaneous_cta": "Spontaneous application",
  "job_1": {
    "level": "Senior",
    "type": "Full-time",
    "location": "Montreal, QC",
    "title": "<em>QA</em> Automation Specialist",
    "desc": "Put automated testing, quality, and reliability at the heart of our products. Selenium, Cypress, Playwright, CI/CD pipelines (Jenkins, GitLab, GitHub Actions), performance testing (JMeter, k6)."
  },
  "job_2": {
    "level": "Senior",
    "type": "Full-time",
    "location": "Montreal, QC",
    "title": "<em>AI</em> & Blockchain Architect",
    "desc": "Carry a strategic vision, design robust architectures, deliver concrete use cases. AI/ML (Python, TensorFlow, PyTorch, LLM), blockchain (Ethereum, Solidity, Web3), cloud (AWS, Azure, GCP)."
  },
  "job_3": {
    "level": "Senior",
    "type": "Full-time",
    "location": "Montreal, QC",
    "title": "Lead <em>Fullstack</em> Dev",
    "desc": "Technically lead a team, design performant web & mobile applications. React/Next.js, Node.js, TypeScript, SQL/NoSQL databases, DevOps and CI/CD practices, mentoring."
  }
},
"testimonial": {
  "quote": "digitowls has been an <em>invaluable</em> partner. Their professional approach and innovative solutions have significantly improved our IT security.",
  "avatar": "JD",
  "author": "Jeanne Dupont",
  "role": "VP. Operations · Banque Nationale"
},
"cta_section": {
  "label": "Ready to transform your business with AI?",
  "headline": "Book a free <em>consultation</em><br>with our experts.",
  "subtitle": "A few lines are enough to get started. We respond within 48 business hours.",
  "cta_primary": "Book now",
  "cta_email": "candidature@digitowls.com"
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/home/CareersSection.tsx src/components/home/TestimonialSection.tsx src/components/home/CtaSection.tsx messages/fr.json messages/en.json
git commit -m "feat: add careers, testimonial, and CTA sections"
```

---

### Task 12: Rewrite Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `messages/fr.json` (footer)
- Modify: `messages/en.json` (footer)

- [ ] **Step 1: Rewrite `src/components/layout/Footer.tsx`**

Replace the entire file:

```tsx
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
            <div className="block max-w-[220px] mb-5">
              <Image src="/images/logo/owl-4.svg" alt="digitowls" width={180} height={60} className="w-full h-auto" />
            </div>
            <p className="text-white/60 max-w-[40ch] text-sm leading-relaxed font-light mb-6">{t("tagline")}</p>
            <div className="flex gap-2.5">
              <SocialIcon href="https://www.linkedin.com/company/lafabriquedigitowl" label="LinkedIn">
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
              <li><a href="mailto:candidature@digitowls.com" className="text-sm text-white/70 hover:text-accent transition-colors">candidature@digitowls.com</a></li>
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
```

- [ ] **Step 2: Update `messages/fr.json` footer**

Replace the `"footer"` key:

```json
"footer": {
  "tagline": "Firme de consultation en intelligence artificielle. Représentant exclusif de Proxym au Canada. Basée à Montréal.",
  "col_services": "Services",
  "svc_1": "Conseil & Stratégie",
  "svc_2": "Fintech & Assurances",
  "svc_3": "Prototypage POC",
  "svc_4": "Formation IA",
  "svc_5": "Placement Talents",
  "svc_6": "Audit Technologique",
  "col_contact": "Contact",
  "col_nav": "Navigation",
  "nav_blog": "Blog",
  "nav_careers": "Carrières",
  "nav_products": "Produits",
  "nav_brand": "Image de marque",
  "nav_privacy": "Politique de confidentialité",
  "rights": "Tous droits réservés",
  "made_in": "Conçu avec soin à Montréal · Québec, Canada",
  "description": "Firme de consultation en intelligence artificielle.",
  "navigation": "Navigation",
  "our_services": "Nos services",
  "contact": "Contact",
  "legal": "Légal",
  "privacy": "Politique de confidentialité",
  "terms": "Conditions générales",
  "branding": "Image de marque",
  "follow_us": "Suivez-nous"
}
```

- [ ] **Step 3: Update `messages/en.json` footer similarly**

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx messages/fr.json messages/en.json
git commit -m "feat: rewrite footer with 4-column layout"
```

---

### Task 13: Rewrite main page to assemble all sections + add scroll reveal JS

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Create: `src/components/ui/ScrollReveal.tsx`

- [ ] **Step 1: Create `src/components/ui/ScrollReveal.tsx`**

This component initializes the IntersectionObserver for `.reveal` elements:

```tsx
"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const revs = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), i * 50);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revs.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
```

- [ ] **Step 2: Rewrite `src/app/[locale]/page.tsx`**

Replace the entire file:

```tsx
"use client";

import Hero from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProxymSection from "@/components/home/ProxymSection";
import ApprocheDOer from "@/components/about/ApprocheDOer";
import RealisationsSection from "@/components/home/RealisationsSection";
import TeamSection from "@/components/home/TeamSection";
import CareersSection from "@/components/home/CareersSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CtaSection from "@/components/home/CtaSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <Hero />
      <ClientLogos />
      <ServicesGrid />
      <ProxymSection />
      <ApprocheDOer />
      <RealisationsSection />
      <TeamSection />
      <CareersSection />
      <TestimonialSection />
      <CtaSection />
    </>
  );
}
```

- [ ] **Step 3: Create `src/components/home/TeamSection.tsx`**

This wraps the team grid and values in their own sections:

```tsx
"use client";

import { useTranslations } from "next-intl";
import TeamGrid from "@/components/about/TeamGrid";
import ValuesSection from "@/components/about/ValuesSection";

export default function TeamSection() {
  const t = useTranslations("team_section");

  return (
    <>
      <section className="py-[140px] px-8 max-md:py-20 max-md:px-5" id="equipe">
        <div className="max-w-container mx-auto relative">
          <div className="section-eyebrow"><span>05</span>{t("eyebrow")}</div>
          <h2 className="section-title reveal">
            {t.rich("title", {
              em: (chunks) => <em>{chunks}</em>,
            })}
          </h2>
          <TeamGrid />
        </div>
      </section>

      <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-white border-t border-border">
        <div className="max-w-container mx-auto relative">
          <div className="section-eyebrow"><span>06</span>{t("values_eyebrow")}</div>
          <h2 className="section-title reveal">
            {t.rich("values_title", {
              em: (chunks) => <em>{chunks}</em>,
            })}
          </h2>
          <ValuesSection />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Add `team_section` to `messages/fr.json`**

```json
"team_section": {
  "eyebrow": "Notre équipe",
  "title": "L'architecte de votre<br>performance <em>numérique.</em>",
  "values_eyebrow": "Nos valeurs",
  "values_title": "Quatre principes,<br>une <em>exigence.</em>"
}
```

- [ ] **Step 5: Add `team_section` to `messages/en.json`**

```json
"team_section": {
  "eyebrow": "Our team",
  "title": "The architect of your<br>digital <em>performance.</em>",
  "values_eyebrow": "Our values",
  "values_title": "Four principles,<br>one <em>standard.</em>"
}
```

- [ ] **Step 6: Verify the build**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 7: Commit**

```bash
git add src/app/[locale]/page.tsx src/components/ui/ScrollReveal.tsx src/components/home/TeamSection.tsx messages/fr.json messages/en.json
git commit -m "feat: assemble all sections in main page with scroll reveal"
```

---

### Task 14: Clean up unused components and verify full build

**Files:**
- Delete: `src/components/home/CtaBanner.tsx`
- Delete: `src/components/contact/ContactForm.tsx`
- Delete: `src/components/contact/CalendlyEmbed.tsx`
- Delete: `src/components/about/MissionSection.tsx`
- Delete: `src/components/realisations/ProjectCard.tsx`
- Delete: `src/components/realisations/CategoryFilter.tsx`
- Delete: `src/components/ui/SectionHeading.tsx` (if no longer imported)
- Delete: `src/components/ui/AnimatedSection.tsx` (if no longer imported)
- Delete: `src/components/ui/Button.tsx` (if no longer imported)

- [ ] **Step 1: Check which components are still imported elsewhere**

```bash
cd /Users/octavekoudoyor/digitowls-site
grep -r "CtaBanner\|ContactForm\|CalendlyEmbed\|MissionSection\|ProjectCard\|CategoryFilter\|SectionHeading\|AnimatedSection\|Button" src/ --include="*.tsx" -l
```

Only delete components that are NOT imported by any remaining file. Keep `SectionHeading`, `AnimatedSection`, and `Button` if they are used by service detail pages, blog pages, careers page, or other routes.

- [ ] **Step 2: Delete unused components**

```bash
rm src/components/home/CtaBanner.tsx
rm src/components/contact/ContactForm.tsx
rm src/components/contact/CalendlyEmbed.tsx
rm src/components/about/MissionSection.tsx
rm src/components/realisations/ProjectCard.tsx
rm src/components/realisations/CategoryFilter.tsx
```

- [ ] **Step 3: Run full build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds. If there are import errors in other pages (services/[id], carrieres, etc.), fix the imports.

- [ ] **Step 4: Run dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000/fr` and verify all sections render correctly.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused components from old design"
```

---

### Task 15: Fix service detail pages and other routes for light theme

**Files:**
- Modify: `src/components/services/ServiceBlock.tsx`
- Modify: `src/app/[locale]/services/[id]/page.tsx`
- Modify: `src/app/[locale]/carrieres/page.tsx` (if it references removed components)

- [ ] **Step 1: Update ServiceBlock for light theme**

The `ServiceBlock` component uses dark-theme classes. Update text colors:
- Replace `text-white/70` → `text-ink-dim`
- Replace `text-white` → `text-primary`
- Replace `bg-white/5` → `bg-white`
- Replace `border-white/10` → `border-border`
- Ensure the component renders correctly on the light background.

- [ ] **Step 2: Update service detail page**

The page at `src/app/[locale]/services/[id]/page.tsx` wraps ServiceBlock in a section. Update:
- Change `className="py-20"` to `className="py-[140px] px-8 max-md:py-20 max-md:px-5"`
- Change `max-w-7xl` to `max-w-container`

- [ ] **Step 3: Check carrieres page**

Read `src/app/[locale]/carrieres/page.tsx` and ensure it doesn't import deleted components. Update its styling for light theme if needed.

- [ ] **Step 4: Build and verify**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: update service detail pages and other routes for light theme"
```
