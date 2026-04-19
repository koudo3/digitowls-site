# Claude Design v6-2 Integration — Design Spec

## Goal

Faithfully integrate the Claude-generated design (`digitowls-v6-2.html`) into the existing Next.js site on a new branch `claudedesign`. This is a complete visual overhaul — from dark theme to light theme with new typography, new sections, new animations, and a new layout language — while preserving the existing Next.js architecture, i18n system, and routing.

## Reference

- Source HTML: `/Users/octavekoudoyor/Downloads/digitowls-v6-2.html`
- Current branch: `redesign` (one-page layout with anchor navigation)
- Target branch: `claudedesign` (branched from `redesign`)

## Architecture

The existing Next.js 14 App Router architecture is preserved:
- `src/app/[locale]/page.tsx` — main one-page layout with all sections
- `src/components/` — component tree
- `messages/fr.json` and `messages/en.json` — i18n translations via next-intl
- Tailwind CSS for styling (extended with new design tokens)
- Separate pages remain: `/produits`, `/blog`, `/carrieres`, `/services/[id]`

The design uses mostly CSS animations (no Framer Motion needed for most sections). The owl SVG in the hero requires vanilla JS for eye tracking.

## Design Tokens

### Colors (CSS variables + Tailwind config)

```
--primary: #141840
--primary-soft: #1C2150
--secondary: #2AB0C1
--secondary-soft: #5BC5D3
--secondary-wash: #E0F4F7
--accent: #F8BE1C
--accent-soft: #FFD657
--ink: #1F2937
--ink-dim: #6B7280
--surface: #F9FAFB
--surface-2: #F3F4F7
--border: #E5E7EB
--border-strong: #D1D5DB
--white: #FFFFFF
--gradient: linear-gradient(115deg, #141840 0%, #141840 15%, #2AB0C1 55%, #F8BE1C 100%)
--gradient-soft: linear-gradient(115deg, #141840 0%, #2AB0C1 60%, #F8BE1C 100%)
```

### Typography (Google Fonts)

| Variable | Font | Usage |
|----------|------|-------|
| `--sans` | Archivo (variable width 62-125, weight 100-900) | Body, headings |
| `--serif` | Instrument Serif (italic) | Accent words in titles via `<em>` |
| `--mono` | JetBrains Mono (300-500) | Labels, eyebrows, stats |
| `--brand-font` | Nunito (700-900) | Brand wordmark |

### Spacing & Layout

- Max content width: `1400px`
- Section padding: `140px 32px` (desktop), `80px 20px` (mobile)
- Card border-radius: `18-20px`
- Standard gap: `20-24px`

## Sections (in order)

### 1. Navbar

- Sticky top, semi-transparent white background (`rgba(249,250,251,0.9)`) with `backdrop-filter: blur(14px)`
- Left: brand logo (44x44) + wordmark "digitowls" in Nunito 800
- Center: links — Services, Proxym, Approche, Réalisations, Équipe, Carrières (with badge "3 postes")
- Right: CTA button "Démarrer un projet →" (dark background, white text, accent on hover)
- Active nav link: underline with accent color, scroll-spy based
- Mobile (≤720px): hide nav links, show only brand + CTA

### 2. Hero

- Full-width dark background (`--primary`) with animated gradient blob (`drift` animation 18s) and grid pattern overlay
- Two-column grid (1.4fr 1fr):
  - **Left:** Label pill ("Firme de consultation IA · Montréal" with pulsing dot), H1 with large Archivo type (`clamp(56px, 7.8vw, 128px)`), subtitle paragraph, two CTA buttons (accent "Démarrer votre projet IA →" + ghost "Découvrir les services")
  - **Right:** Glass card containing:
    - Header with "En direct · Montréal" and "FIG. 01"
    - KPI strip: 3 pills (Clients 98%, Équipe 96%, Innovation 4.9/5) with live dots
    - Animated owl SVG (280x280): line-art owl with gradient eyes, pupils that track cursor, ear tufts, beak, data orbit dots, chest histogram bars that dance, scan line that sweeps
    - 3 floating metric cards (ROI +42%, Précision IA 99.8%, Patterns 2.847) with float animation
    - Bottom stats: 350+ Experts, 7+ Clients, 4-6 Sem./POC
- Gradient bar (6px) below hero

### 3. Clients (Marquee)

- White background with bottom border
- Left: label "Ils nous ont confié leur transformation IA" (mono, uppercase)
- Right: infinite horizontal marquee of client logos (grayscale, color on hover)
- Logos duplicated for seamless loop, 28s animation
- Fade masks on edges

### 4. Services

- Light background (`--surface`)
- Section eyebrow: "01 · Nos services" (mono, pill badge with secondary color)
- Title: "L'IA au service de votre croissance." with serif italic on "croissance"
- 3-column grid of 6 service cards:
  - White card with border, 20px radius
  - Gradient top border (3px) on hover, lift translateY(-6px) with shadow
  - Icon (56x56 rounded square), service number (mono), title, description, "En savoir plus →" link
  - Cards link to `/services/[id]` detail pages

### 5. Proxym (Alliance Stratégique)

- Dark background (`--primary`)
- Eyebrow: "02 · Alliance stratégique" (accent colored)
- Title: "Une force de frappe internationale." with serif italic
- 2-column grid (1.1fr 1fr):
  - Left: lead paragraph about Proxym partnership
  - Right: 2x2 grid of stat cards (glass cards with gradient top border): 350+ experts, 20 ans, 3 piliers, 1 équipe

### 6. Approche DOer

- Background: `--surface-2`
- Eyebrow: "03 · Approche « DOer »"
- Title: "Basée sur l'expérimentation de cas (très) concrets."
- 4-column grid of phase cards:
  - White cards with border, colored number badges (Phase 01-04)
  - Badge colors: primary, primary-soft, secondary, accent
  - Title with serif italic accent, description
  - Hover: lift + secondary border + shadow

### 7. Réalisations

- Light background
- Eyebrow: "04 · Réalisations"
- Title: "Des résultats concrets, une valeur mesurable."
- Asymmetric 6-column grid:
  - Case 1 & 2: span 3 columns each
  - Case 3, 4, 5: span 2 columns each
- Each case: visual area (4:3 aspect ratio with gradient background + SVG illustration), meta (tag + year), title with serif italic, client description
- Hover: lift + border color + shadow

### 8. Équipe

- Light background
- Eyebrow: "05 · Notre équipe"
- Title: "L'architecte de votre performance numérique."
- 4-column grid of 8 team members:
  - Photo card (3:4 aspect ratio) with gradient overlay on hover, zoom on image
  - LinkedIn badge (top-right, appears on hover)
  - Role (mono, uppercase, secondary color), name, bio
- Members: Octave Koudoyor (Président), Xavier Bouclet (VP), Alban Pellegrini (VP), Grégoire Guenot (VP), Alexander Kirilov (Architecte IA), Audrey Van Hoorebeke (Gestionnaire produit IA), Herlin Tang (Expert technologies), Luigi Tomegah (Expert technologies)
- Team photos need to be added to `public/images/team/`

### 9. Valeurs

- White background with top border
- Eyebrow: "06 · Nos valeurs"
- Title: "Quatre principes, une exigence."
- 4 columns separated by vertical borders:
  - Gradient top bar (40px wide, 3px tall)
  - Number "01/04" to "04/04" (mono)
  - Value name with serif italic accent: Innovation, Collaboration, Excellence, Intégrité
  - Description

### 10. Carrières

- Background: `--surface-2`
- Eyebrow: "07 · Carrières · 3 postes ouverts"
- Title: "Rejoignez une équipe de passionnés."
- Lead paragraph
- 3-column grid of job cards:
  - Badges: level (Senior), type (Temps plein), location (Montréal, QC)
  - Title with serif italic, description
  - "Postuler →" button (accent background, changes to dark on hover)
  - Gradient top border on hover
- Jobs: Spécialiste QA Automation, Architecte IA & Blockchain, Lead Dev Fullstack
- Spontaneous application card (dashed border, email link)

### 11. Testimonial

- Background: `--secondary-wash`
- Large serif quote mark
- Quote with serif italic accent
- Author with avatar circle

### 12. CTA Section

- Dark background with animated gradient blob
- Mono label "Prêt à transformer votre entreprise avec l'IA ?"
- Title: "Réservez une consultation gratuite avec nos experts."
- Subtitle
- Two buttons: "Réserver maintenant →" (accent) + email (ghost)

### 13. Footer

- Dark background
- 4-column layout:
  - Col 1: logo image + tagline + social icons (LinkedIn, Twitter, YouTube)
  - Col 2: Services list (6 links)
  - Col 3: Contact info (phone, email, address)
  - Col 4: Navigation (Blog, Carrières, Produits, Image de marque, Politique de confidentialité)
- Bottom bar: copyright + "Conçu avec soin à Montréal"

## Animations

### CSS Keyframes
- `drift`: gradient blob movement (18s, infinite)
- `glow-pulse`: hero card glow (6s, infinite)
- `blink`: live dots (1.6s, infinite)
- `orbit-pulse`: data points around owl (3s, staggered delays)
- `bar-dance`: histogram bars (1-1.5s, staggered)
- `scan-sweep`: scan line across owl (6s, delayed)
- `metric-float`: floating stat cards (4s, staggered)
- `marquee`: client logo scroll (28s, linear, infinite)

### JavaScript
- Owl pupil tracking: `mousemove` listener, calculates angle/distance, translates pupil circles
- Scroll reveal: IntersectionObserver with threshold 0.12, adds `.in` class
- Scroll spy: `scroll` listener with `requestAnimationFrame`, highlights active nav link based on section position

## Responsive Breakpoints

### ≤1024px (tablet)
- Hero: single column
- Services: 2 columns
- Approach: 2 columns
- Cases: all span full width, cases 3-5 span 3
- Team: 2 columns
- Values: 2 columns
- Proxym: single column
- Jobs: 2 columns

### ≤720px (mobile)
- Nav links hidden (brand + CTA only)
- Hero: reduced padding, smaller visual
- Clients: vertical layout
- Services: single column
- Approach: single column
- Cases: all full width
- Team: 2 columns with reduced gap
- Values: single column with horizontal borders
- Footer: 2 columns
- Jobs: single column

## i18n

All text content must be translated in both `messages/fr.json` and `messages/en.json`. New translation keys needed for:
- Proxym section (eyebrow, title, lead paragraph, stat labels)
- Carrières section (eyebrow, title, lead, 3 job cards with badges/titles/descriptions, spontaneous text)
- Testimonial (quote, author name, author title)
- CTA section (label, headline, subtitle)
- Updated navbar labels
- Updated footer content
- Hero (label, h1 lines, subtitle, CTA labels, card labels, KPI labels, stat labels, metric labels)
- All section eyebrows and titles
- Service descriptions (updated)

## Assets Needed

- Team photos: `public/images/team/team-octave.jpg`, `team-xavier.jpg`, `team-alban.jpg`, `team-gregoire.jpg`, `team-alexander.jpg`, `team-audrey.jpg`, `team-herlin.jpg`, `team-luigi.jpg`
- Brand logo for footer: `public/images/digitowls-logo.png`
- Icon for navbar: `public/images/digitowls-icon.png` (already exists as owl logo)

## What's Removed

- Dark theme for content sections (services, realisations, about, contact)
- Framer Motion `ApprocheDOer` flow diagram component
- `ContactForm` component (replaced by CTA section with Calendly link)
- `CalendlyEmbed` inline component
- `MissionSection` component (replaced by Proxym section)
- Old `CategoryFilter` for realisations (replaced by fixed asymmetric grid)
- `CtaBanner` component (replaced by new CTA section)

## What's Preserved

- Next.js 14 App Router with `src/` directory
- `[locale]` dynamic segment for i18n
- next-intl v4.9.1
- Tailwind CSS (config extended with new tokens)
- Separate pages: `/produits/cadrage-projet-ai`, `/blog`, `/carrieres`, `/services/[id]`
- `ServiceBlock` component and service detail pages
- Color palette base values (primary, secondary, accent)
- Google Fonts loading via `next/font` or `<link>`
