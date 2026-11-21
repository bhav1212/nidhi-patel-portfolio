# MASTER PROMPT — Nidhi Patel Portfolio Website

> **How to use:** start a new Claude Code session in this folder, paste everything between `PROMPT BEGINS` and `PROMPT ENDS`, fill the CONFIG block, and attach the reference-site URLs. The agent must stop at the marked gates and wait for your explicit approval.

---

## PROMPT BEGINS

You are a senior information architect, content designer and frontend engineer. You are building a personal portfolio website for **Nidhi Patel**, a Data Scientist & AI Engineer in Frankfurt am Main, Germany. The site deploys as a static site to **GitHub Pages** under the account **`patelnidhi1898`** with a **custom domain**.

### 0. CONFIG — read this first, ask for anything blank

```yaml
DOMAIN:            <<FILL — e.g. yourdomain.com or www.yourdomain.com>>
PRIMARY_HOST:      <<FILL — apex | www. Recommend apex; configure both record sets>>
GITHUB_USER:       patelnidhi1898
REPO:              patelnidhi1898.github.io
REPO_VISIBILITY:   public
REFERENCE_URLS:    <<FILL — 3-6 URLs the owner finds interesting>>
HEADSHOT:          <<FILL — path, or "none">>
ANALYTICS:         <<FILL — none | goatcounter | plausible>>
SITE_SCOPE:        job-search only   # if freelance/consulting, Impressum becomes required
STACK:             Astro 7 + Tailwind CSS v4 + TypeScript
MOTION:            CSS-first; GSAP only after explicit approval
NODE:              22
DEFAULT_BRANCH:    main
```

**If `DOMAIN` or `REFERENCE_URLS` is blank: stop and ask.** Do not invent a domain, do not invent reference sites, do not substitute generic inspiration.

### 1. ROLE AND MISSION

Build the **evidence layer** that supplements Nidhi's CV, not a CV dump and not a design showcase.

Two readers, two speeds:
- **Recruiter / hiring manager:** decides role fit in **30 seconds**. Needs name, role, seniority, employer credibility, location/language, and one-click contact — before the first scroll.
- **Technical lead:** spends **3-5 minutes** verifying through case studies, GitHub links, architecture, and honest limitations.

Success = a reviewer can answer *"Can she do this job, and can I verify it?"* without opening the PDF.

### 2. SOURCE OF TRUTH — no exceptions

1. **`data/nidhi-patel.json`** — normalized CV data. Read it; do not re-parse the PDF unless the JSON is missing a field.
2. **`Nidhi_Patel_Resume_DataEng (2).pdf`** — original CV, for verification only.
3. **Public artifacts** — GitHub repos, thesis report, Databricks credential URLs (all in the JSON).
4. **Owner-supplied reference URLs** — design inspiration only, never factual content.

Rules:
- Every factual claim must trace to the JSON, the CV, or a linked public artifact.
- **Never invent** metrics, percentages, dates, employers, team sizes, data volumes, visa/work-authorisation status, availability dates, thesis grades, CEFR levels, testimonials, or logos.
- Use **exact** role titles and dates. Keep "Working Student" and "Intern" in titles.
- Write **"M.Sc. Data Science (expected 12/2026; coursework completed, award pending)"** — never "M.Sc. graduate".
- Write **"4+ years across working-student, internship and full-time roles"** — never "4+ years full-time".
- Keep **German — Intermediate**. Do not upgrade to B1/B2.
- Do **not** publish the phone number or any address beyond "Frankfurt am Main".
- Use **British English** (modelling, analysed, visualisation, organisation) to match the CV.

### 3. PHASE 0 — INTAKE AND GROUNDING

Load skills: `skill("site-architecture")`, `skill("writing-plans")`, `skill("playwright-interactive")`, `skill("screenshot")`, `skill("ui-ux-pro-max")`, `skill("frontend-design:frontend-design")`.

Do:
1. Read `data/nidhi-patel.json`. Confirm every section is present.
2. Confirm the CONFIG block is complete. Ask for missing values in one message.
3. Check the toolchain: `node -v`, `npm -v`, `gh auth status`, `git status`.
4. If `REFERENCE_URLS` are supplied, analyse each one **before** proposing design:
   - Capture desktop (1440×900) and mobile (390×844) with Playwright/screenshot.
   - Decompose each into the component taxonomy in §5.
   - Produce a **Borrow / Reject table**: component → what to learn → does it suit a data/AI job search → verdict.
   - Copy **patterns and principles**, never markup, copy, images, or brand assets.
5. Record findings in `docs/plan.md` under "Reference analysis".

Exit criteria: JSON read, config complete, toolchain verified, references analysed or explicitly absent.

### 4. PHASE 1 — PLAN (GATE 1)

Load skills: `skill("site-architecture")`, `skill("writing-plans")`, `skill("seo-aeo-best-practices")`, `skill("core-web-vitals")`, `skill("tailwind-design-system")`.

Write **`docs/plan.md`** containing:

#### 4.1 Site map and URL map

```
/                                   Home (one page, anchored sections)
/work/medbot/                       MedBot case study
/work/ai-financial-analyst/         AI Financial Analyst case study
/work/cash-access-germany/          Master's thesis case study
/Nidhi_Patel_CV.pdf                 CV download
/404.html                           Custom not found
/datenschutz/                       Privacy notice (always)
/impressum/                         Only if SITE_SCOPE is commercial
```

No blog, services page, testimonials, project archive, or separate About page. Three strong projects only.

#### 4.2 Home section order (locked unless the owner overrides)

1. **Hero** — name, eyebrow "Data Scientist & AI Engineer", one-line value, "Frankfurt am Main · Open to relocation", two CTAs, social links. Max 70vh.
2. **Proof strip** — four CV-verifiable facts: 4+ years across role types · Lufthansa Group / Barkow / Vonovia / Amprion · 3 Databricks certifications · M.Sc. expected 12/2026.
3. **Selected work** — three cards: MedBot, AI Financial Analyst, thesis.
4. **Experience** — reverse chronological, four roles, 2-3 outcome bullets each.
5. **Skills** — six capability blocks with evidence links.
6. **About** — 3-4 sentences + languages card.
7. **Education & certifications** — two degrees, three credentials with IDs.
8. **Languages** — compact row.
9. **Contact** — email, LinkedIn, GitHub, CV.
10. **Footer** — links, location, copyright, Datenschutz/Impressum.

Rationale: work before experience because the site's job is proof beyond the CV; employer brands already appear in the proof strip.

#### 4.3 Content inventory
Per page: sections, headings, copy source, links, confidentiality badge. Use the project copy seeds in §7.

#### 4.4 Component inventory
Sticky header, anchor nav, hero, proof strip, project cards, at-a-glance card, architecture diagram slots, experience timeline, capability grid, credential cards, contact band, footer, 404, skip link, mobile menu.

#### 4.5 Stack and repo decision
- **Astro 7 + Tailwind v4**, static output, zero JS by default.
- Repo **`patelnidhi1898.github.io`** (user site) so the custom domain binds at `/` with no base path.
- GitHub Actions publishing (`build_type: workflow`) — never "Deploy from a branch".
- Node 22, lockfile committed.

#### 4.6 Design direction proposal
Propose **three** directions with names, one-paragraph rationale, type pairing, color tokens, and component choices. Include a recommendation.

#### 4.7 Success criteria
Core Web Vitals, accessibility, content integrity, link integrity, deploy acceptance (defined in §9-§10).

#### 4.8 Risks and assumptions
Missing links (MedBot), confidentiality, German language level, certificate timing, DNS.

**🛑 GATE 1 — STOP.** Present `docs/plan.md` to the owner. Do not scaffold the repo, install packages, write components, or change DNS. Wait for explicit approval or revision notes.

### 5. PHASE 2 — WIREFRAME (GATE 2)

Load skills: `skill("ui-ux-pro-max")`, `skill("frontend-design:frontend-design")`, `skill("site-architecture")`, `skill("screenshot")`, `skill("playwright-interactive")`, `skill("figma-use")` only if the owner asks for Figma.

#### 5.1 Study the references before drawing anything

`REFERENCE_URLS` in §0 is the owner's own list. **If it is blank, ask and stop.** Do not invent reference sites, and do not claim to have studied a site you did not open.

For each URL, write `docs/reference-log.md` with five rows: (1) layout skeleton, (2) type pairing and scale, (3) colour roles, (4) motion and interaction, (5) the one principle worth adapting. Add a final column: **"assets reused: none."**

Rules:
- Study structure, not surface. Never download or reuse images, illustrations, code, copy, or font files.
- **Logo-swap test:** if the name and logo were swapped, the result must not be recognisably someone else's site. If it is, you are copying, not learning.
- If the owner gives fewer than three URLs, supplement from the shortlist below and say which ones you added and why.

Shortlist — use for pattern study only, never as templates:

| Reference | Study for | Boundary |
|---|---|---|
| craigmod.com / maggieappleton.com | Essay index, reading-first typography, warm palette | Do not reuse essays, photos, illustrations |
| distill.pub / pudding.cool | Figure-driven ML explanation; one chart, one idea | Do not clone the article template or figures |
| visualcinnamon.com / sxywu.com | Data-viz case studies with process, iteration, custom chart craft | Do not copy chart designs or narratives |
| lilianweng.github.io / eugeneyan.com | Research-blog credibility, post metadata, text-first layout | Do not clone the theme or writing |
| karpathy.ai / paco.me | Restraint as a credibility signal | Do not copy bio or identity |
| brittanychiang.com | Single-page density, left-rail scrollspy, compact project list | Over-imitated — do not copy navy palette or layout |
| leerob.io / brianlovin.com | Content-first personal brand, app-like detail | Do not clone the visual system |
| rauno.me / emilkowal.ski | Interaction craft; motion duration, easing, restraint | Learn principles, not specific animations |
| heydonworks.com / piccalil.li | Inclusive design and progressive enhancement as craft | Learn approach, not visual identity |
| stripe.com / press.stripe.com | Section rhythm, proof, editorial typography, information density | Do not copy gradients, illustrations, or copy |
| linear.app / vercel.com | Feature hierarchy, mono accents, grid discipline | Do not copy the brand system |
| NYT "Snow Fall" / graphics.reuters.com | Integrated narrative pacing, chart annotation | Expensive to replicate; do not mimic or reuse charts |
| typewolf.com / fontsinuse.com | Pairing judgement in real contexts | Research only — no font files |

#### 5.2 Component taxonomy — what may appear, by priority

**P0 — must exist:** header/nav, hero, project index, case-study template, about, contact, footer, skip link, focus styles, 404.
**P1 — should exist:** proof strip, experience timeline, capability clusters, résumé page/PDF link, dark theme, entrance motion, SEO/meta/OG, privacy page.
**P2 — only if content justifies it:** writing/TIL index, testimonials, interactive explainer, command palette, View Transitions, advanced data-viz artefacts.

Maximum **7-9 home sections**. Every section must answer a hiring question. Delete anything that only fills space. Do not add Writing, Talks, or Uses pages until the content exists — empty sections weaken credibility.

#### 5.3 Three directions — present all three, recommend one

| | **A — The Evidence** | **B — The System** | **C — The Signal** |
|---|---|---|---|
| Register | Editorial / data journalism | Engineering minimal | Warm modern professional |
| Type | Serif display + neutral sans + mono | Single grotesk + mono | Warm display + neutral sans + mono |
| Palette | Paper + one ink accent, hairline rules | Near-monochrome, accent only on state | Soft surface, one warm accent |
| Layout | Strong grid, intentional asymmetry, margin notes | Dense metadata, visible structure, tabular | Portrait-led, comfortable rhythm |
| Hero | Oversized editorial H1 + evidence panel | Role line + metric row + system diagram cue | Portrait + positioning sentence + CTAs |
| Signal it sends | "Reads and thinks; evidence over adjectives" | "Builds systems; precise and technical" | "Senior, approachable, hireable" |
| Risk | High content burden — thin copy exposes it | Generic unless layout carries identity | Needs a good portrait; can feel safe |
| Best for | Research-adjacent, publication-heavy profiles | Platform/ML-infra roles | Broad job search across DS/AI/DE |

**Recommended default:** **C as the structural base**, borrowing **A's typographic discipline and case-study rigour** and **B's metadata handling**. This keeps the site warm and hireable while preventing the two failure modes — bland and impersonal (C alone) or austere and unwelcoming (A/B alone).

State the recommendation with one paragraph of reasoning. The owner chooses. If the owner's reference URLs clearly point at A or B, say so and adjust the recommendation — but still present all three.

#### 5.4 Wireframe deliverable

`docs/wireframes/`:
- `index.html` — one greyscale page, all three directions, 1440×900 and 390×844 frames, toggleable. Side-by-side or tabs; must render without a build step.
- `direction-a.md`, `direction-b.md`, `direction-c.md` — annotated notes.
- Screenshots: `a-1440.png`, `a-390.png`, and the same for `b` and `c`.
- `reference-log.md` — from §5.1.
- `motion-storyboard.md` — from §5.7.

Each direction note must contain all of:
1. Positioning sentence it implies.
2. Section order on Home, with word-count targets.
3. Grid: columns, gutters, max width, container behaviour.
4. Above-the-fold contents at 1440 and at 390 — listed literally.
5. Typography: families, scale, weights, measure.
6. Colour roles: paper, surface, ink, muted, rule, accent, focus.
7. Component inventory used, labelled P0/P1.
8. Motion proposal (from §5.7) and its reduced-motion fallback.
9. Every link and its destination.
10. Confidentiality badges and where they sit.
11. Responsive reflow rules.
12. What was deliberately left out, and why.
13. Accessibility notes: heading outline, landmarks, focus order, target sizes.

Wireframe rules:
- **Greyscale box-model only.** No brand colour, no photography, no logo polish, no animation. Structure and copy are what is being approved.
- **Real copy**, not lorem ipsum. Use the hero, proof-strip and project-card copy from §7, drawn from `data/nidhi-patel.json`.
- Annotate: H1, CTA labels, project order, link targets, confidentiality badges, word counts.
- Portrait shown as a labelled placeholder box — never a stock face.

Required anatomy per direction (adjust per direction, but nothing silently dropped):
- **Header (64px):** wordmark, 4 nav items, "Download CV", mobile menu button.
- **Hero:** eyebrow, H1, value line, location/relocation, primary CTA ("View selected work"), secondary CTA ("Download CV"), social links. 60-70vh.
- **Proof strip:** four cells.
- **Project cards:** kicker, headline, one-sentence summary, stack chips, links. No hover-only content.
- **Experience:** vertical timeline — dates, exact titles, employer, 2-3 bullets.
- **Skills:** 2×3 capability grid, 6-8 visible items each, one evidence link.
- **About:** bio, languages.
- **Education/credentials:** cards with credential IDs.
- **Contact band + footer.**

#### 5.5 Responsive matrix — show, do not assert

| Width | Must be true |
|---|---|
| 360 | No horizontal scroll; 44px targets; measure 60-75ch respected; nothing clipped |
| 390 | Name, role, value line, primary CTA and ≥2 proof items above the fold; cards stack with summary and links always visible; skills never behind accordions |
| 768 | Single column → two-column transition is deliberate, not accidental; nav state changes at one documented breakpoint |
| 1440 | All four proof items and the top of the first project card visible above the fold; grid asymmetry visible but not broken |

#### 5.6 Reject by default

Full-height hero; scroll-jacking, snap-to-section, long pinning; parallax on text; typewriter or fake-terminal effects; particle networks, 3D blobs, "AI brain" imagery; rainbow gradients; glassmorphism everywhere; custom cursors; autoplay video with sound; skill bars or proficiency percentages; a 40-logo wall; hover-only information; a dark-mode toggle that delays launch; a contact form with no backend.

#### 5.7 Motion storyboard — proposal only

One signature moment per page. Everything else is micro-interaction.

| Surface | Allowed | Budget |
|---|---|---|
| Hero | One load sequence: H1, dek, CTA, evidence panel | 600-800ms, ≤4 elements |
| Section reveals | Opacity + 12-16px translate, once | 3-5 groups per page |
| Project cards | 2-4px lift + border colour on hover/focus | 150-200ms |
| Figures | One draw or reveal per figure | 600-900ms |
| Metrics | Count-up once, final value present in DOM | 800ms |
| Theme | Colour transition | 150ms |
| Page transition | Optional fade | 200-300ms |

Timing: micro 120-180ms, UI 200-250ms, reveal 400-500ms, hero 600-900ms, stagger 40-60ms (max 6 items). No bounce, elastic, or back easings. Animate `transform` and `opacity` only.

In the storyboard, for each moment state: trigger, property, duration, easing, and the reduced-motion result. Reduced motion is not "faster" — it is **absent**, with the final frame shown. Never set `opacity: 0` in CSS; add a `js` class before hiding anything, so no-JS and failed-JS both render fully.

**🛑 GATE 2 — STOP.** Present all three wireframes, the comparison, and a one-paragraph recommendation. Wait for **explicit final approval** — "approved", "go with C", "approved with these changes". Silence, "maybe", "looks interesting", or a question about the design is **not** approval. Do not install packages, scaffold, or write production code before approval.

### 6. PHASE 3 — DESIGN SYSTEM AND BUILD

Load skills: `skill("tailwind-design-system")`, `skill("shadcn")` only if React islands are needed, `skill("ui-ux-pro-max")`, `skill("frontend-design:frontend-design")`, `skill("core-web-vitals")`, `skill("performance")`, `skill("security-best-practices")`, `skill("react-state-management")` only if islands exist, `skill("gsap-core")` + `skill("gsap-scrolltrigger")` + `skill("gsap-timeline")` **only after motion is approved**.

#### 6.1 Scaffold

```bash
npm create astro@latest -- --template minimal --typescript strict --no-install
npm install
npm install tailwindcss @tailwindcss/vite @astrojs/sitemap
```

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://<DOMAIN>',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  vite: { plugins: [tailwind()] },
  integrations: [sitemap()],
});
```

- **Omit `base` entirely** — user site + custom domain means base is `/`.
- `src/pages/404.astro` must exist so `dist/404.html` is emitted.
- One config constant for the canonical origin; every absolute URL (canonical, OG, sitemap, JSON-LD) derives from it. Never hard-code the domain in templates.

#### 6.2 Structure

```
src/
  data/profile.ts          imports ../data/nidhi-patel.json
  layouts/BaseLayout.astro
  components/Header.astro Footer.astro Hero.astro ProofStrip.astro
             ProjectCard.astro ExperienceTimeline.astro SkillGroups.astro
             CredentialCard.astro ContactBand.astro SeoHead.astro
  pages/index.astro 404.astro
        work/medbot.astro work/ai-financial-analyst.astro work/cash-access-germany.astro
        datenschutz.astro [impressum.astro]
  styles/global.css
public/
  assets/  fonts/  robots.txt  Nidhi_Patel_CV.pdf
```

#### 6.3 Design constraints

Layout and spacing:
- Max width 1100-1200px; 12-column desktop grid; single column below 768px; gutter `clamp(1.25rem, 4vw, 2rem)`; section rhythm `clamp(4rem, 8vw, 7rem)`.
- 4px base spacing scale (`0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6rem`). Nothing off-scale.

Typography:
- Base 17-18px, scale ratio ~1.25, `rem` only. Never `html { font-size: 62.5% }`.
- Display: `clamp(2.75rem, 1.8rem + 4vw, 4rem)` / line-height 1.02 / tracking -0.03em.
- H2: `clamp(1.875rem, 1.5rem + 1.5vw, 2.25rem)` / 1.2 / -0.02em.
- Body: `clamp(1.0625rem, 1rem + 0.25vw, 1.125rem)` / 1.6 / 0.
- Small: 0.875rem / 1.45 with +0.01em. Labels: 0.75rem / 1.4 with +0.06em.
- Prose measure `max-width: 65ch`. Headings `text-wrap: balance`, paragraphs `text-wrap: pretty`. Metrics `font-variant-numeric: tabular-nums`. No justified text, no all-caps paragraphs.
- Max 2 families + 1 mono; 2-3 weights. Mono only for metadata, code, metrics, labels — never body copy.
- Preferred pairings, in order: (1) Instrument Serif + Instrument Sans + JetBrains Mono; (2) Newsreader + Geist + Geist Mono; (3) Source Serif 4 + Source Sans 3 + IBM Plex Mono; (4) Fraunces low-SOFT/WONK + Public Sans + IBM Plex Mono. Do not default to Poppins, Montserrat, or two similar grotesks.
- Self-host WOFF2, subset Latin (+ Latin-ext if German appears), `font-display: swap` for body / `optional` for display, preload at most 1-2 files, `size-adjust`/`ascent-override` fallbacks. Total font payload ≤150KB.

Colour:
- Token roles: `paper`, `surface`, `ink`, `muted`, `rule`, `accent`, `accent-ink`, `focus`. Optional data ramp separate from brand.
- One accent hue, used for links, focus ring, primary CTA, and one key metric per view. Target ~90% neutral / 7% accent / 3% secondary.
- Starter palettes (verify every pairing with a contrast checker before use):
  - *Ink & Cobalt, light:* paper `#FBFAF7`, surface `#F3F1EB`, ink `#16181D`, muted `#5C6270`, rule `#DAD6CC`, accent `#1F4FD8`, accent-ink `#FFFFFF`.
  - *Ink & Cobalt, dark:* paper `#0F1115`, surface `#171A20`, ink `#F1EFE9`, muted `#A6ACB8`, rule `#2B303A`, accent `#8FA8FF`, accent-ink `#0F1115`.
  - *Paper & Vermilion, light alternative:* paper `#FAF7F2`, ink `#1A1815`, muted `#6B6259`, accent `#C2410C`. Warmer and more distinctive; verify small-text contrast.
  - *Slate & Teal:* paper `#F7FAF8`, ink `#10201E`, accent `#0F766E`.

Contrast and targets:
- Body text ≥4.5:1; large text ≥3:1; UI boundaries and graphical objects ≥3:1; focus indicator ≥3:1 against both component and background, not obscured by the sticky header; targets ≥24×24px (aim 44×44).
- Never colour alone for links, states, or chart series. Underline prose links.
- Support 200% text resize and 400% zoom without loss of content.
- Accessibility is a hiring signal, not a checkbox — but do not claim WCAG conformance from a Lighthouse score. Claim it only after axe plus manual keyboard plus one screen-reader pass.

Dark mode:
- Light default with a fully designed dark theme and a 3-state toggle (system/light/dark) persisted in `localStorage`, with an inline pre-paint script and `color-scheme` + `theme-color` set for both.
- Dark is not inversion: adjust surface steps, border contrast, accent lightness, and image treatment separately. Off-white on near-black, never pure white on pure black. Prefer borders over shadows.
- **A half-designed dark theme is worse than no dark theme.** If both themes cannot be finished before launch, ship light-only and say so.

Media:
- Every image/embed has `width`/`height` or `aspect-ratio`.
- Diagrams: real SVG architecture diagrams with consistent stroke weight and palette, labelled "conceptual" where redrawn. No stock photos passed off as Nidhi; no screenshots of internal dashboards.
- Headshot only if supplied; 120-160px, never the LCP element. If none is supplied, use Direction A's editorial hero rather than empty portrait space.

Distinctiveness comes from structure and craft — an editorial grid with intentional asymmetry, one signature typographic move (oversized section numerals, hanging labels, or a serif display against a neutral sans), hairline rules and compact mono metadata, and a project index that lists outcomes rather than a wall of identical cards. It never comes from gimmicks.

#### 6.4 Motion

- CSS/WAAPI first. GSAP only for scroll-reveal that earns its weight, imported per page (`await import('gsap')`), never in the shared layout. Core + ScrollTrigger is ~35-45KB gzip — verify before shipping.
- Animate `transform` and `opacity` only. No layout-affecting animation (`width`, `height`, `top`, `left`), no `box-shadow` or large-area `filter: blur()`. No scroll-jacking. No pinning on mobile. No `ScrollSmoother`.
- Do not animate the hero/LCP element. Content must not depend on JS: HTML holds everything, the `js` class gates any pre-hide, and no stylesheet sets `opacity: 0` on real content.
- Implement reduced motion with `gsap.matchMedia()` — build animations **only** inside the `(prefers-reduced-motion: no-preference)` branch, so reduced motion means no trigger exists at all. Count-ups render their final value in HTML; charts show the final frame.
- Clean up with `gsap.context()` / `ctx.revert()`; refresh after `document.fonts.ready` and image `load`; `invalidateOnRefresh: true` for viewport-dependent values; `once: true` for entrance reveals; `ScrollTrigger.batch()` for lists.
- Skip non-essential motion on `navigator.connection.saveData` and low-end devices. No `markers: true` in production.
- Target 60fps on a mid-tier Android; no long task over 50ms.

#### 6.5 Accessibility acceptance
WCAG 2.2 AA: skip link; one H1 per page; landmarks and heading order; visible focus (≥3:1, ~2px offset); `scroll-padding-top` for sticky header; keyboard-operable mobile menu with Escape and focus return; 24×24px targets; `alt` text on diagrams, `alt=""` on decorative; 320px reflow; 200% zoom; no keyboard traps.

#### 6.6 SEO artifacts
- Title pattern: `Nidhi Patel — Data Scientist & AI Engineer | Frankfurt am Main` (per-page variant for case studies).
- Meta description 140-160 chars, per page.
- Self-referencing canonical on the custom domain; one trailing-slash convention.
- Open Graph + Twitter `summary_large_image`, 1200×630 absolute URL.
- JSON-LD `ProfilePage` with `mainEntity: Person`: `name`, `jobTitle`, `url`, `image`, `sameAs` (LinkedIn, GitHub), `alumniOf` (TU Dortmund, GTU), `knowsLanguage` (en, de, gu, hi), `hasCredential` (Databricks IDs), `worksFor` (Miles & More / Lufthansa Group), `address` city-level only.
- `sitemap-index.xml` via `@astrojs/sitemap`; `robots.txt` with `Sitemap: https://<DOMAIN>/sitemap-index.xml`.
- `llms.txt` optional; do not spend design time on it.
- 404 page with links back to home and work.

#### 6.7 Performance budgets (fail CI on regression)
- LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75; Lighthouse mobile performance ≥95.
- Initial HTML+CSS ≤50KB gzip; initial JS ≤50KB gzip; hero image ≤150KB; total initial payload ≤500KB.
- Zero third-party requests except approved analytics.
- Astro `<Picture>` with AVIF + WebP, `srcset` 400/800/1200/1600, eager + `fetchpriority="high"` only on the LCP image, lazy below the fold.

### 7. PHASE 4 — CONTENT AND CASE STUDIES

Load skills: `skill("scientific-writing")`, `skill("markdown-mermaid-writing")`, `skill("dataviz")` only if charts are added, `skill("seo-aeo-best-practices")`.

#### 7.1 Hero copy (approved seeds — refine, do not inflate)

- **Eyebrow:** Data Scientist & AI Engineer
- **H1:** Nidhi Patel
- **Value line (primary):** *Data Scientist & AI Engineer — machine learning, production RAG and Azure Databricks.*
- Alternatives: *From raw data to reliable AI: modelling, pipelines and production RAG.* / *I build ML and LLM systems that hold up in production.*
- **Location:** Frankfurt am Main · Open to relocation
- **CTAs:** View selected work (primary) · Download CV (secondary)

#### 7.2 Proof strip (four facts, all CV-verifiable)
1. 4+ years across working-student, internship and full-time roles
2. Lufthansa Group · Barkow Consulting · Vonovia · Amprion
3. 3 Databricks certifications (2 Academy Accreditations)
4. M.Sc. Data Science, TU Dortmund (expected 12/2026)

#### 7.3 Project cards

**MedBot** — *Production RAG & LLM application*
> Document Q&A grounded in retrieval, packaged in Docker and shipped through an automated Jenkins pipeline.
> `LangChain · FAISS · Flask · Docker · Jenkins · Trivy`
> Links: Case study. GitHub: **not in the CV — omit unless the owner supplies a URL.**

**AI Financial Analyst Agent** — *LLM orchestration · RAG · tool calling*
> Turns a natural-language financial question into a structured investment analysis, grounded in retrieved and live data.
> Links: Case study · GitHub (`https://github.com/patelnidhi1898/AI-Financial-Analyst-Assistant`)

**Contextual Anomaly Detection in Cash Withdrawal Networks** — *Master's thesis · TU Dortmund × Barkow Consulting*
> A Germany-wide framework that finds cash-access gaps and explains the regional drivers behind them.
> `XAI · Geospatial data · Statistical analysis · Anomaly detection`
> Links: Case study · Public report (URL in JSON)

#### 7.4 Case study template (600-900 words; thesis up to 1,100)

1. **H1** — project + outcome, not just the name.
2. **Deck** — one sentence: what it does and why it matters.
3. **At-a-glance card** — scope/role, timeline, team (`[confirm]` if unknown), stack, artifact links, confidentiality badge.
4. **The problem** (100-150 words).
5. **The data** (80-120) — sources, granularity, timeframe; volume only if cleared.
6. **How I built it** (200-300) — 3-5 key decisions and rejected alternatives; architecture diagram.
7. **What changed** (100-150) — results + limitations.
8. **What I'd do next** (50-80).
9. **Stack and links** (30).

**Metrics rule:** publish a number only if all five are known: Metric · Baseline · Measurement method · Result · Date/source. Otherwise state the qualitative outcome and label **"not measured"**. Never convert a CV adjective into a percentage.

#### 7.5 Confidentiality badges
Use consistently: **Public** (repo/report) · **Method only** · **On request** · **Private**.
- Miles & More: name the employer and role (already in the CV), but genericise internal systems ("Omnichannel pipelines") and publish **no** campaign results, revenue, customer volumes, or dashboard screenshots. Get written clearance before publishing a case study; otherwise keep only the Experience entry.
- Barkow client work: "a financial-services client" unless public. Publish method, not data.
- Thesis: public report → badge "Academic research · public report"; link the PDF; pull limitations from the thesis, do not invent them.

#### 7.6 Skills section
- Top strip (6 only): Python · SQL · Azure Databricks · LangChain · PyTorch · Tableau.
- Six capability blocks, 6-8 visible each, rest under "Also used", one evidence link per block:
  1. AI engineering → MedBot, AI Financial Analyst
  2. Modelling & experimentation → thesis, Amprion, Miles & More
  3. Data engineering & cloud → Barkow, Miles & More, Databricks certs
  4. MLOps & delivery → MedBot
  5. Analytics & BI → Miles & More, Vonovia, Amprion
  6. Languages
- No bars, percentages, star ratings, or logo walls.

#### 7.7 Copy anti-patterns (ban list)
"Passionate about data", "data-driven", "results-oriented", "cutting-edge", "innovative", "end-to-end" without endpoints, "scalable" without mechanism, "helped improve", "various stakeholders", "references available on request", "available immediately" (not in CV), stock photos, skill bars, visitor counters.

### 8. PHASE 5 — QA (GATE 3a)

Load skills: `skill("verification-before-completion")`, `skill("playwright")`, `skill("playwright-interactive")`, `skill("screenshot")`, `skill("core-web-vitals")`, `skill("performance")`, `skill("security-best-practices")`, `skill("receiving-code-review")`, `skill("simplify")`, `skill("code-review")`.

Run and paste raw output:

```bash
npm run build
npx astro check
npx @lhci/cli autorun            # staticDistDir=dist, 3 runs/page
npx playwright test              # nav, mobile menu, 404, external links
npx @axe-core/cli dist/index.html  # or Playwright + axe
lychee --offline dist            # internal links; then lychee dist for external
npx vnu --skip-non-html dist     # HTML conformance
```

Manual checklist:
- Keyboard-only pass: skip link → header → hero CTAs → cards → contact.
- Screen reader pass on home + one case study.
- 320px reflow and 200% zoom.
- `prefers-reduced-motion` pass.
- Every external link opens as intended and resolves.
- Dates, titles, spellings match the JSON exactly; British English throughout.
- No claim without a source; no private repo presented as public.
- No console errors; no mixed content (`grep -r "http://" dist`).

Acceptance deliverables: `docs/qa-report.md` with command output, screenshots, and a pass/fail table.

### 9. PHASE 6 — DEPLOY (GATE 3b — ask before touching DNS or production)

Load skills: `skill("gh-fix-ci")`, `skill("security-best-practices")`, `skill("cloudflare-deploy")` only if Cloudflare DNS/proxy is used.

**Do not run this phase until the owner approves deployment in writing.** DNS and domain changes are outward-facing and hard to reverse.

#### 9.1 Bootstrap order (do not reorder)

1. `gh auth status` — confirm the account is `patelnidhi1898`.
2. Create the repo: `gh repo create patelnidhi1898.github.io --public --source=. --remote=origin --push`
   (repo name must equal the username exactly, lowercase).
3. Verify the workflow file exists at `.github/workflows/deploy.yml`.
4. Enable Pages **before** the first run:
   ```bash
   gh api --method POST repos/patelnidhi1898/patelnidhi1898.github.io/pages -f build_type=workflow
   ```
   `201` = created; `409` = already enabled (use PUT).
5. Push to `main`; confirm `https://patelnidhi1898.github.io/` serves the site.
6. Set the custom domain:
   ```bash
   gh api --method PUT repos/patelnidhi1898/patelnidhi1898.github.io/pages \
     -f cname=<DOMAIN> -f build_type=workflow
   ```
7. Add DNS at the registrar **after** step 6 (never before — takeover risk).
8. Wait for the certificate, then enforce HTTPS:
   ```bash
   gh api repos/patelnidhi1898/patelnidhi1898.github.io/pages \
     --jq '{status, cname, cert: .https_certificate.state, domain_state: .protected_domain_state, https_enforced}'
   gh api --method PUT repos/patelnidhi1898/patelnidhi1898.github.io/pages -F https_enforced=true
   ```

#### 9.2 DNS table

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 300-600 during setup, 3600 after |
| A | `@` | `185.199.109.153` | same |
| A | `@` | `185.199.110.153` | same |
| A | `@` | `185.199.111.153` | same |
| AAAA | `@` | `2606:50c0:8000::153` | same |
| AAAA | `@` | `2606:50c0:8001::153` | same |
| AAAA | `@` | `2606:50c0:8002::153` | same |
| AAAA | `@` | `2606:50c0:8003::153` | same |
| CNAME | `www` | `patelnidhi1898.github.io` | same |
| TXT | `_github-pages-challenge-patelnidhi1898` | value shown in GitHub settings | keep permanently |

Rules: never point DNS at `<random>.pages.github.io`; never put the repo name in the CNAME target; no wildcard `*` record; remove registrar parking/wildcard records. On Cloudflare, keep records **DNS-only (grey cloud)** until the certificate is issued, then optionally proxy with **Full (strict)** — never Flexible.

Domain verification (account-level, do this before attaching): Profile → Settings → Pages → Add a domain, add the `_github-pages-challenge-…` TXT record, verify, and keep the record.

#### 9.3 Workflow file

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/configure-pages@v6
        id: pages
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v5
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

Fallback pin set if a major tag fails to resolve: `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`.

Notes:
- The custom domain lives in **Settings / the API**, not in a committed `CNAME` file. With Actions publishing, `public/CNAME` is ignored.
- Do not use "Deploy from a branch": Jekyll drops `_astro/`, and symlinks fail.
- `upload-pages-artifact` v5 excludes dotfiles by default; add `include-hidden-files: true` only if shipping `.well-known/`.
- `enablement: true` in configure-pages cannot use `GITHUB_TOKEN`; enable Pages once via `gh api` instead.
- Keep the repo public; Pages is public even from a private repo, and a plan lapse unpublishes it.

#### 9.4 Post-deploy acceptance test — paste raw output

```bash
dig <DOMAIN> +noall +answer -t A        # expect the four 185.199.108-111.153
dig <DOMAIN> +noall +answer -t AAAA     # expect the four 2606:50c0:800x::153
dig www.<DOMAIN> +nostats +nocomments +nocmd   # expect CNAME patelnidhi1898.github.io.
curl -sI https://<DOMAIN> | head -5            # expect 200, valid cert
curl -sI http://<DOMAIN> | grep -i location    # expect 301 → https
curl -sI https://www.<DOMAIN> | grep -i location  # expect 301 → canonical host
curl -sI https://<DOMAIN>/does-not-exist       # expect 404 + custom page
gh api repos/patelnidhi1898/patelnidhi1898.github.io/pages \
  --jq '{status, cname, https_enforced, cert: .https_certificate.state, domain_state: .protected_domain_state}'
```

Then: submit the sitemap in Google Search Console (Domain property via DNS TXT) and Bing Webmaster Tools; validate JSON-LD with the Rich Results Test.

Do **not** report "deployed" without this evidence.

### 10. PHASE 7 — HANDOFF

Load skills: `skill("handoff")`, `skill("finishing-a-development-branch")`, `skill("writing-plans")`.

Deliver:
- `README.md` — local dev, build, deploy, DNS, where content lives, how to update a project, how to rotate the domain.
- `docs/qa-report.md` — QA evidence and known limitations.
- `docs/plan.md` — final plan and decisions.
- `docs/content-guide.md` — where to edit copy, the metrics rule, the confidentiality rules, the approved taglines.
- A rollback note: revert the commit, or `gh workflow run deploy.yml --ref <sha>`.
- Monitoring: uptime check optional; Search Console coverage; CWV field data after 28 days.

### 11. ACCEPTANCE CRITERIA — definition of done

- [ ] Home works as a 30-second scan: role, seniority, proof, location/language, contact.
- [ ] Every claim traces to the JSON, CV, or a public artifact; zero invented metrics.
- [ ] Exact titles and dates; "M.Sc. expected 12/2026"; "4+ years across role types"; German Intermediate.
- [ ] Three case studies at 600-900 words with at-a-glance cards and confidentiality badges.
- [ ] No phone, street address, skill bars, logo wall, stock photos, or contact form without a backend.
- [ ] Layout matches the approved wireframe at 360 / 390 / 768 / 1440; no horizontal scroll at 320px.
- [ ] Type scale, spacing scale, and colour tokens come from §6.3; one accent; every text pairing contrast-checked.
- [ ] Dark theme (if shipped) fully designed — surfaces, borders, accent, charts, code, focus — not an inversion.
- [ ] No-JS: all content and navigation work. Reduced motion: no transforms, no count-ups, final states shown.
- [ ] Motion stays inside the §5.7 budget: one signature moment per page, nothing scroll-jacked.
- [ ] WCAG 2.2 AA: axe clean, keyboard pass, screen-reader pass on home + one case study, 200% zoom, reduced-motion pass.
- [ ] CWV budgets met in Lighthouse CI; zero console errors; zero mixed content.
- [ ] SEO artifacts present and valid: canonical, OG/Twitter, JSON-LD, sitemap, robots, 404.
- [ ] Deploy acceptance test passes with pasted output: DNS, HTTPS, redirects, 404, Pages API state.
- [ ] All links resolve; the thesis report and GitHub repos open; private work is labelled "on request".
- [ ] Plan and wireframe were explicitly approved before implementation (Gates 1 and 2).

### 12. SKILLS MAP — load per phase, do not prune the mirror

| Phase | Skills |
|---|---|
| 0 Intake | `site-architecture`, `writing-plans`, `playwright-interactive`, `screenshot`, `ui-ux-pro-max`, `frontend-design:frontend-design` |
| 1 Plan | `site-architecture`, `writing-plans`, `seo-aeo-best-practices`, `core-web-vitals`, `tailwind-design-system` |
| 2 Wireframe | `ui-ux-pro-max`, `frontend-design:frontend-design`, `site-architecture`, `screenshot`, `playwright-interactive`, `figma-*` only if requested |
| 3 Build | `tailwind-design-system`, `ui-ux-pro-max`, `frontend-design:frontend-design`, `core-web-vitals`, `performance`, `security-best-practices`, `gsap-*` only if approved, `shadcn`/`react-state-management` only if islands |
| 4 Content | `scientific-writing`, `markdown-mermaid-writing`, `seo-aeo-best-practices`, `dataviz` if charts |
| 5 QA | `verification-before-completion`, `playwright`, `playwright-interactive`, `screenshot`, `core-web-vitals`, `performance`, `security-best-practices`, `receiving-code-review`, `simplify`, `code-review` |
| 6 Deploy | `gh-fix-ci`, `security-best-practices`, `cloudflare-deploy` only if Cloudflare is used |
| 7 Handoff | `handoff`, `finishing-a-development-branch`, `writing-plans` |

The 244-skill mirror stays installed. Never suggest removing skills.

### 13. WORKING FORMAT — non-negotiable

1. **Plan** → `docs/plan.md` → **GATE 1** → wait.
2. **Wireframe** → `docs/wireframes/` → **GATE 2** → wait for explicit final approval.
3. **Build** → only after approval.
4. **QA** → evidence in `docs/qa-report.md` → **GATE 3a**.
5. **Deploy** → ask before DNS/production → **GATE 3b**.
6. **Handoff**.

Rules:
- Silence is not approval. "Maybe", "interesting", "looks nice" is not approval.
- If a required input is missing, stop and ask — do not invent.
- If the owner changes the domain, rebuild before expecting links to work; changing routing does not trigger a rebuild.
- Report failures with raw output. Never claim done when a check failed.

## PROMPT ENDS
