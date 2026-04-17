# One-Page Redesign — DigiTowls

## Goal

Convert the DigiTowls website from a multi-page layout to a single-page layout with anchor navigation and active section highlighting in the navbar. Blog, Produits, and Carrieres remain as separate pages.

## Architecture

The homepage (`src/app/[locale]/page.tsx`) becomes the single page that renders all main sections in sequence. The existing section components (Hero, ServicesGrid, ClientLogos, CtaBanner, MissionSection, TeamGrid, ValuesSection, ProjectCard/CategoryFilter, ContactForm, CalendlyEmbed) are reused as-is — they're already self-contained. The Navbar switches from route-based links to anchor links for on-page sections, and gains an IntersectionObserver-based active section highlight.

Separate pages that remain unchanged: `/blog`, `/blog/[slug]`, `/produits`, `/produits/cadrage-projet-ai`, `/carrieres`, `/politique-de-confidentialite`, `/conditions-generales`.

## Tech Stack

- Next.js 14 (App Router), Tailwind CSS, next-intl, Framer Motion (existing)
- IntersectionObserver API (browser native, no new dependency)
- `scroll-behavior: smooth` via Tailwind's `scroll-smooth` class

## Pages Removed

The following standalone pages are removed since their content moves to the homepage:

- `src/app/[locale]/services/page.tsx`
- `src/app/[locale]/realisations/page.tsx`
- `src/app/[locale]/a-propos/page.tsx`
- `src/app/[locale]/contact/page.tsx`

The components they use are NOT removed — they are imported directly into the homepage.

## Homepage Section Order

Each section gets an `id` attribute for anchor targeting:

1. **Hero** — no id (top of page)
2. **Services** — `id="services"` — ServicesGrid + ServiceBlock for each service
3. **Clients** — `id="clients"` — ClientLogos with testimonials
4. **CTA Banner** — no id — CtaBanner linking to cadrage-projet-ai
5. **Realisations** — `id="realisations"` — CategoryFilter + ProjectCard grid
6. **A propos** — `id="about"` — MissionSection + TeamGrid + ValuesSection
7. **Contact** — `id="contact"` — ContactForm + contact info + CalendlyEmbed

## Navbar Changes

### Anchor links (on-page sections)

These links use `#section` anchors when on the homepage, and `/{locale}/#section` when navigating from a separate page:

| Label (FR) | Label (EN) | Anchor |
|---|---|---|
| Services | Services | #services |
| Réalisations | Projects | #realisations |
| À propos | About | #about |

### Separate page links

These remain as standard Next.js Link routes:

| Label (FR) | Label (EN) | Route |
|---|---|---|
| Produits | Products | /{locale}/produits |
| Blog | Blog | /{locale}/blog |
| Carrières | Careers | /{locale}/carrieres |

### Contact button

The "Contact" CTA button in the navbar scrolls to `#contact` on the homepage (or navigates to `/{locale}/#contact` from other pages).

### Active section highlighting

- An `IntersectionObserver` watches each section with `id` on the homepage
- When a section is ≥50% visible, its corresponding navbar link gets the active style
- Active style: `text-white` (instead of `text-white/70`) + a bottom border in teal (`border-b-2 border-secondary`)
- Only applies on the homepage — on separate pages, no anchor link is highlighted

### Smooth scrolling

Add `scroll-smooth` class to the `<html>` element. This gives native smooth scrolling for all anchor navigation. Add `scroll-pt-20` (80px) to offset for the fixed navbar height.

## Services Section on Homepage

Currently the services page (`/services`) renders a detailed view with ServiceBlock (tagline, approach, results) for each service. On the one-page homepage, use the compact ServicesGrid (6-card overview) that already exists. Each card links to the detailed service info.

Two options for detail:
- **Chosen approach:** The ServicesGrid cards on the homepage are display-only (no link to a separate page). The full detail (tagline, approach, results) is removed since `/services` page is deleted. If detailed service info is needed later, it can be re-added.
- Keep the content concise on the one page — the 6-card grid with title + short description is sufficient.

## Realisations Section on Homepage

Import the CategoryFilter and ProjectCard grid directly. The filter tabs (Tous, IA Conversationnelle, Data & Analytics, etc.) work the same way with client-side state. No routing changes needed since it's already a client component.

## About Section on Homepage

Combines three sub-components in sequence:
1. MissionSection (tagline, mission, Proxym partnership, 3 pillars)
2. TeamGrid (9 members with photos)
3. ValuesSection (4 values with icons)

A single `id="about"` wraps all three.

## Contact Section on Homepage

The contact page layout (2-column: form on left, info + Calendly on right) moves directly to the homepage. Same grid layout: `lg:grid-cols-3` with form spanning 2 columns.

## Footer Changes

Footer service links currently point to `/{locale}/services#service-id`. Since `/services` is removed, these should scroll to `#services` on the homepage. The navigation links in the footer also update to use anchors for on-page sections.

## Translation Changes

No new translation keys needed. The `nav` translations already exist. The section components use their existing translation namespaces.

## What Does NOT Change

- All existing components (Hero, ServicesGrid, ClientLogos, etc.) — reused as-is
- Blog pages and MDX rendering
- Produits pages (index + cadrage-projet-ai)
- Carrieres page
- Legal pages
- Footer structure (just link targets change)
- Contact form API route
- i18n routing and middleware
- Mobile hamburger menu behavior (same links, just anchor vs route)
