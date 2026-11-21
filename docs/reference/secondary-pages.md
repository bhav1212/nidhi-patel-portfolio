# Secondary pages and the template system — `bhav1212/mysite`

**Analysed:** `HEAD` = `01cac1f4` (2026-10-04), mirrored at `/tmp/ref-site`, secondary pages fetched 2026-11-21.
**Primary sources:** `site/index.html`, `site/de/index.html`, `site/styles.css`, `site/script.js`, `site/theme.js`, `site/README.md`.
**Secondary sources fetched:** `site-blog/index.html`, `site-blog/how-to-evaluate-llm-apps.html`, `site-blog/ai-latency-budget.html`, `site-blog/tags.html`, `site-travel/index.html`, `site-travel/_template-country.html`, `site-travel/alps-road-trip.html`, `site-travel/croatia-november.html`, `site-travel/data/countries.js`, `site-travel/data/atlas.js`, `scripts/build-site.py`, `scripts/update-blog.py`.
**Spec / plan:** `docs/superpowers/specs/2026-06-03-editorial-advisor-redesign-design.md` (121 lines) and `docs/superpowers/plans/2026-06-03-editorial-advisor-redesign.md` (90 lines).

**Assets reused: none.** No fonts, CSS, images, copy, data, or component code from this repository will be copied into the Nidhi Patel site. This document records structure and judgement only.

---

## 0. Bottom line

1. **The site that shipped is not the site the spec describes.** The "Editorial Advisor" spec and plan are committed documentation only: every implementation checkbox in the plan is still `- [ ]`, there is no `redesign/editorial-advisor` branch, and none of the defining visual decisions (amber accent, serif headlines, static hero, removed gradients) appear in shipped CSS or HTML.
2. **The shipped design is the pre-3D portfolio design, restored on 2026-09-17** after a three-day "Scale-inspired 3D portfolio experience" (2026-09-14 → 2026-09-17). The site was also repositioned from "advisory offering" to "portfolio" on 2026-08-15 — *before* the spec was added to the repository on 2026-09-07. The spec's advisory positioning was therefore stale when committed.
3. **What actually exists is a compact three-shell static system:** one home shell, one essay/detail shell (blog and travel share it), and one data-driven index shell (blog categories, travel atlas). There are **no** work-index, case-study, separate about, 404, or privacy pages to copy.
4. **The borrowable value is structural, not visual:** the measured article column, the static-shell + data-file index, the end-matter pattern, and the build-time validation contract.
5. **The weakest parts are exactly what the spec tried to fix:** rainbow gradient tokens, the word-swapping hero, the floating portrait, ambient monospace labels, and a travel index whose useful content is JavaScript-generated.

---

## 1. The design spec: intent, principles, rejected alternatives

### 1.1 Stated intent

The spec is explicit that this is a refinement, not a rebuild. It opens:

> "Take an already-good site (audited at **B+ overall**: A on SEO/IA, B+ on visual/content/a11y, C on performance) and elevate it to *distinctive and high-trust* through **editorial restraint** — not a teardown. Keep the strong bones (dark/light themes, section rhythm, reveal + count-up motion, SEO/IA), and apply an editorial visual language plus positioning fixes on top."

— spec §1, lines 11–13

The success criterion is a negative test as much as a positive one:

> "Reads as a distinctive, restrained **editorial advisor** site, not a 2024 gradient template."

— spec §10, line 106

Scope was deliberately narrow: `site/index.html` (EN), `site/de/index.html` (DE), shared `site/styles.css`, `site/script.js`, hero/social images. Blog, travel, `play.html`, `now/`, and n8n were out of scope but "must not break" (spec §9, lines 97–102).

### 1.2 Positioning locked in the spec

Three positioning decisions drive every content change:

> "**Lead angle:** *Independent AI advisor for European teams — no single wedge.* The three offerings (independent reviews, EU AI Act readiness, workshops & advisory) are presented **as equals**."

> "**EU AI Act readiness:** explicitly **not** the headline and **not** a singled-out highlight. It is one equal offering."

> "**Advisory-only integrity:** remove all copy implying hands-on implementation."

— spec §2, lines 15–19

This matters for the reference study because the **shipped site is a builder portfolio**, not an advisory site. The spec's content model cannot be transplanted; only its visual and structural discipline can.

### 1.3 Locked decisions (verbatim)

| Decision | Choice |
|---|---|
| Headline (serif centerpiece) | **"Clear judgment on high-stakes AI."** |
| Headline subline (plain) | "Independent advisor to European teams. Data scientist, six years, by day at Fraunhofer ISI." |
| Accent color | **Editorial amber/ember** (~`#e2622d`), near-monochrome otherwise |
| Engagement transparency | **Engagement types, no prices** (discreet block) |
| Testimonials | **Keep as-is, anonymized** (initials only, no LinkedIn links) |
| Hero word-swap | **Dropped** — replaced by the static serif headline |
| Framework / typography | Promote **Fraunces** to structural headline face; **Geist** body; **JetBrains Mono** only for true technical UI |

— spec §3, lines 21–31

### 1.4 Visual principles stated by the spec

**Typography** (spec §4.1, lines 35–39):
- Fraunces becomes the headline face for `h1`, `h2`, section/feature titles, and large pull-quotes; weight ~500–600; "tasteful italic for emphasis spans."
- Geist remains body/UI.
- JetBrains Mono is "demoted to *only* genuinely technical UI" — the working-stack strip and case-fragment metric labels. The ~20 ambient monospace labels (status badge, bento tags, section numbers, hero meta) are replaced with small-caps Geist where a label is still needed.
- Keep the fluid `clamp()` scale but "tighten heading rhythm for an editorial feel."

**Color** (spec §4.2, lines 41–47):
- Keep the dark base `#0a0a10` and the full light theme.
- "Retire the orange→pink→purple gradient from general UI" (logo, borders, section underlines, ambient glows, record numbers).
- "Introduce a single **amber/ember accent** `--accent: #e2622d`" used sparingly: primary CTA, one hairline underline motif, key numbers/links.
- Retire `--accent-2` (pink) and `--accent-3` (purple) from structural use. Keep them *defined* for legacy pages.
- Add a quiet warm-grey metadata token.
- Raise `--text-faint` from `0.42` to ~`0.55–0.60` for WCAG AA.

**Background and motion** (spec §4.3, lines 49–54):
- Replace the three-colour radial wash + grid overlay with "a single subtle warm glow"; drop or strongly fade the grid.
- "**Remove** the portrait `float-bob` animation and `1.2deg` rotation; static, authoritative portrait with a subtle frame."
- "**Keep:** scroll-reveal (subtle), count-up stats, scroll-progress bar, View Transitions, card cursor-glow (toned down)."
- "All motion continues to respect `prefers-reduced-motion`."

**Layout** (spec §4.4, lines 56–59):
- Generous margins, stronger type scale, hairline rules as section dividers.
- "Intentional asymmetry on the feature/case elements (offset, not the current uniform grid)."
- Large serif pull-quotes with visible quote marks.

### 1.5 Rejected alternatives (explicit and implicit)

The spec is unusually clear about what it is rejecting. Its alternatives are mostly *deletions*, not substitutions.

| Rejected thing | Replaced with | Stated reason | Evidence |
|---|---|---|---|
| Full teardown / rebuild | In-place refinement of an already-good site | "not a teardown" | spec §1 |
| The 2024 gradient template look | Near-monochrome + one amber accent | The audit's B+ visual score needed distinctiveness | spec §1, §4.2, §10 |
| Orange→pink→purple gradient in UI | Single amber; gradients retained only as legacy aliases | Reads as a generic AI-startup template | spec §4.2 |
| `--accent-2` / `--accent-3` in structural UI | One accent | "one accent discipline" | spec §4.2, §11 |
| ~20 ambient mono labels | Small-caps Geist labels; mono only for technical data | Mono had become decoration | spec §4.1 |
| Hero word-swap animation | Static serif headline | Replace motion with authority | spec §3, §4.3 |
| Floating / rotated portrait | Static framed portrait | Same | spec §4.3 |
| Three-colour radial wash + grid | One warm glow, more whitespace | Visual noise | spec §4.3 |
| Six-card work spray | 2–3 deep case fragments (problem → approach → outcome) | Depth over surface area | spec §5.3 |
| EU AI Act card as "featured" | Three equal service cards | Positioning: "no single wedge" | spec §2, §5.4 |
| Prices on engagements | Engagement *shapes*, no prices | Discretion | spec §3, §5.9 |
| Blog mirrored into `/de` | DE home links to the English blog | Blog is English-only | spec §5.5, §9 |
| Invented or amplified testimonials | Keep existing, anonymized, verbatim | Integrity | spec §9, plan §6.11 |
| Production deploy during design | Local preview; explicit approval | Owner control | spec header, plan guardrails |

The plan adds its own guardrails, which are as important as the design decisions:

> "**No production deploy.** Do not run `site/deploy.sh`. Do not touch shared nginx."
> "**Mobile-first:** tap targets ≥44px; verify at 360px."
> "**Don't break shared pages:** after CSS edits, load `play.html` + `now/` + one blog post locally and confirm they still render."
> "Keep `--accent-2/3`, cyan, lime tokens *defined* (blog/demo pages reference them) — just stop using them in homepage UI."
> "**Stop. Await approval before any production step.**"

— plan lines 13–19, 82

### 1.6 What the spec leaves undefined

The spec covers only the home page. It does **not** define:
- a work index or a case-study page template;
- a separate About or CV page;
- a 404 page;
- a privacy notice / Impressum;
- article-level TOC, figures, captions, or citation styling;
- a multi-project content model.

Those gaps are why §6 of this document has to synthesise archetypes from the home, blog, and travel shells rather than copy them.

---

## 2. What the plan said the build would do versus what shipped

### 2.1 Provenance and timeline

The commit history is decisive. The spec is dated 2026-06-03 but was **added to the repository on 2026-09-07**, after the site had already been repositioned away from the advisory model.

| Date | Commit | Message | Consequence |
|---|---|---|---|
| 2026-08-15 | `16857346` | "Reposition the site from advisory offering to portfolio" | The spec's advisory positioning is already superseded |
| 2026-09-07 | `cbd1cfc6` | "Add editorial-advisor redesign plan and design spec" | Documentation only; no code change |
| 2026-09-14 | `dee63368` | "Add Scale-inspired 3D portfolio experience" | A different redesign attempt ships |
| 2026-09-14 | `64af2dde` | "Restore portfolio brand palette" | 3D palette correction |
| 2026-09-14 | `df650470` | "Refine spatial portfolio experience" | 3D iteration |
| 2026-09-17 | `0bbe6c27` | "Restore pre-3D site design" | 3D design removed (1,383 CSS lines, 628 JS lines, Three.js vendor files) |
| 2026-10-04 | `01cac1f4` | "Remove self-hosted wording for the GitHub Pages migration" | Current HEAD |

The only branches in the repository are `main` and `migration/github-pages`. There is no `redesign/editorial-advisor` branch.

### 2.2 Plan task status

Every task in the committed plan is still unchecked. The plan was never executed as written.

| Plan task | Planned outcome | Shipped? | Evidence |
|---|---|---|---|
| 1. Branch + local preview | `redesign/editorial-advisor`; Playwright baselines | **No** | Branch absent from `gh api repos/.../branches` |
| 2. Amber monochrome tokens | `--accent: #e2622d`, amber-only `--grad-warm`, `--text-faint: 0.58` | **No** (one partial) | `site/styles.css:84` still `--accent: #ff6b35`; `:98` still the three-stop rainbow `--grad-warm`; `:98` is the single amber change that did not happen. `--text-faint` *did* move to `0.62` at `:82` |
| 3. Editorial type + motion calm | Fraunces `h1`/`h2`; remove portrait rotation/float; quote marks 0.10; 44px icons | **No** (a11y partial) | `:195–203` sets headings to `var(--sans)`; `:1727–1732` still `@keyframes float-bob` and `.hero-portrait { animation: float-bob ... }`; `:326` icon buttons are 38px desktop, 44px only below 920px (`:1223`) |
| 4. Homepage editorial CSS | `.best-for`, `.cases`, `.thinking`, `.engagements`, calm contact | **No** | Zero `.best-for`, `.case`, `.engagements` in HTML or CSS; only `.thinking-wrap` exists (7 HTML hits, 15 CSS hits) |
| 5. Calm motion | Remove hero word-swap IIFE | **No** | `site/index.html:187` still uses `<span id="hero-swap">`; `site/styles.css:1655` still animates it; the swap script is gone, so the span is now static but still gradient-filled |
| 6. Rewrite EN home | Static serif headline, 3 case blocks, equal services, process rewrite, engagements | **No** | `site/index.html` still "I build production AI in research and industry", six `.section` blocks, four bento cards, no services/process/engagements |
| 7. Rewrite DE home | Mirror EN; JSON-LD; fix engagement-guide path | **Partial** | DE mirrors the *shipped* portfolio, not the redesign. JSON-LD is present on both. Engagement-guide path is gone; redirects now handle it |
| 8. Images, a11y, QA | WebP/AVIF, skip link, `aria-hidden` SVGs, optional esbuild, Playwright QA | **Partial** | WebP + `<picture>` shipped (`index.html:223–226`); skip link shipped (`:153`); `aria-hidden` is **not** on the nav toggle SVGs; no `site/build/minify.mjs`; no AVIF |
| 9. Report + stop | Screenshots, local URL, await approval | **No evidence** | No report artifact; no redesign branch |

### 2.3 Decision-by-decision divergence

| Decision | Spec / plan said | Shipped site says | Verdict |
|---|---|---|---|
| Accent | `#e2622d` amber | `#ff6b35` orange; `--accent-2 #f72585`, `--accent-3 #7209b7` | Not shipped |
| Gradient | Retire from general UI | `--grad-warm` used on nav CTA, primary buttons, scroll progress, logo mark, stat numbers, avatar ring, `.bento-card.b-feature::after` | Not shipped |
| Headings | Fraunces structural | Geist for all `h1–h4`; Fraunces only `.serif`, `.b-outcome`, atlas numerals | Not shipped |
| Hero | Static serif "Clear judgment on high-stakes AI." | "I build production AI in research and industry." with `#hero-swap` span | Not shipped |
| Portrait | Static, framed | `.hero-portrait` still `float-bob`; hover still `rotate(0deg) scale(1.015)` | Not shipped |
| Background | One warm glow | Three radial gradients + 56px grid (`styles.css:158–190`) | Not shipped |
| Mono labels | Only true technical UI | Mono on section numbers, tags, metas, eyebrows, pub years, post meta, atlas labels | Not shipped |
| Work section | 2–3 deep case fragments | Four bento cards (Vorschau, JIH Trend Radar, air cargo, publications pointer) | Not shipped |
| Services | Three equal cards | No services section at all | Not shipped (section removed entirely) |
| Process | Advisory-only rewrite | No process section | Not shipped |
| Engagements | Discreet no-price block | No engagements section | Not shipped |
| Testimonials | Keep anonymized | No testimonials section | Removed earlier |
| DE parity | Mirror the redesign | DE mirrors the old portfolio 1:1 | Shipped as parity of the wrong design |
| Paper count | "five peer-reviewed papers" (spec §5.3) | "Four peer-reviewed papers" (`index.html:218`, `:304`) | Content drift |
| Location | Neckarsulm (spec §5.1) | Heilbronn (hero and footer) | Content drift |
| Publications | Not central to advisory IA | Dedicated section with four papers + DOIs | Portfolio IA won |

### 2.4 What shipped instead

The shipped home has **six `.section` blocks plus a hero** (`site/index.html:182–501`):

1. Hero — word-swapping H1, portrait, credibility meta, auto-scrolling tech strip.
2. `#work` — four bento cards (feature, tall, two thirds), one metric per card.
3. `#publications` — `<ol class="pubs">`, year rail + title + authors + venue + DOI.
4. `#record` — four count-up stat cards.
5. `#writing` — flagship essay card + three link rows + "More on the blog".
6. `#about` — three-paragraph prose + facts aside (working on, languages, elsewhere).
7. `#contact` — single email CTA + LinkedIn + résumé + location/timezone/language meta.

The blog and travel sites ship as separate subdomains with their own shells and near-duplicate stylesheets. There is no page for a work index, a case study, a standalone About, a 404, or privacy.

### 2.5 What the plan got right

Even though it was not executed, the plan is a good model for the Nidhi build:

- **Token-first**, global changes before page rewrites.
- **Scope guard**: `.home` body class so shared pages are not broken.
- **Mobile-first as a hard rule**, verified at 360px.
- **Progressive enhancement**: the site must still work as plain static files; the optional build is not wired to production.
- **Validation as a first-class step**: grep checks, Playwright at two widths, both languages.
- **Explicit stop gate** before deploy.
- **No invented social proof**.

The failure was not the plan's quality; it was that the plan was committed without being run, and a different redesign (3D) bypassed the gate and had to be reverted. For Nidhi, the gate itself needs to be enforced, not just documented.

---

## 3. How an essay or case-study page is structured

The blog post is the only article template in the repository. Travel detail pages reuse the same shell with a lighter body. The template is short-form: the sample posts declare `wordCount` 566–578 and `timeRequired` `PT3M` (e.g. `site-blog/ai-latency-budget.html:46–47`), and the blog updater assumes 220 words/minute (`site/README.md:55`).

### 3.1 Page shell

Every article page is the same five-part shell:

```
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>

  <header class="nav">
    <a class="nav-logo" href="https://bhaveshjain.com/">…</a>
    <nav class="nav-links" id="nav-links" aria-label="Primary">
      Work · About · Writing (active) · Get in touch
    </nav>
    <div class="nav-tools">
      theme toggle · mobile menu toggle
    </div>
  </header>

  <main id="main-content" tabindex="-1">
    <article class="post">
      cover → meta → h1 → body → sources → prev/next → back
    </article>
  </main>

  <footer class="footer-compact">copyright · links</footer>
  <script src="/script.js"></script>
</body>
```

Evidence: `site-blog/ai-latency-budget.html:79–168`; CSS `site/styles.css:1351–1568` for `.post`, `:1603–1616` for `.footer-compact`, `:2203–2244` for `.post-nav`.

Key differences from the home shell:
- The blog nav links back to the main site by absolute URL and marks Writing as `.active`.
- There is no language toggle on blog/travel pages.
- The footer is `.footer-compact`, not the home `.footer`: a thin top border, copyright left, links right.
- `theme.js` loads in `<head>` before CSS so the saved theme paints before first paint (`site-blog/ai-latency-budget.html:8`).
- `script.js` loads at the end of `<body>` without `defer`; because it is after content, it does not block rendering.
- The blog uses absolute `/styles.css`; travel uses relative `styles.css`; the home uses `styles.css` / `../styles.css`.

### 3.2 Header block

The header is content, not just chrome:

1. **Cover** — `.post-cover`, a full-width inline SVG at `viewBox="0 0 1200 525"`, `max-height: 360px`. On mobile it bleeds edge-to-edge (negative gutter margins); at ≥720px it becomes a rounded, bordered card (`styles.css:1363–1403`). The SVG usually carries a one-line mono route or thesis in the lower-left, e.g. `// FKB → Neuschwanstein → …` (`site-travel/alps-road-trip.html:49`) or `// vibes are not evals` (`site-blog/how-to-evaluate-llm-apps.html:123`).
2. **Meta row** — `.post-meta`, mono at `0.78rem`, faint: date, optional "Updated" date, read time, tags. Tags link to `tags.html#slug`.
3. **Title** — a single `<h1>`, `clamp(2rem, 4.5vw, 3rem)`, `line-height 1.1`, weight 700. On mobile it drops to `clamp(1.7rem, 6vw, 2.2rem)`.
4. **Standfirst** — the first paragraph, visually indistinguishable from body prose. There is no `.post-standfirst` class in the reference.

### 3.3 Prose measure and type

- `.post` is `max-width: 720px`, centred, with `padding: clamp(2rem, 5vh, 3.5rem) var(--gutter) var(--section-y)` (`styles.css:1357–1362`).
- Body paragraphs are `1.04rem` / `line-height: 1.7` (`:1452–1457`). At the default 16px root, the 720px column yields roughly **65–72 characters** per line — a comfortable reading measure, even though it is specified in pixels, not `ch`.
- `h2` is `1.5rem`; `h3` is `1.2rem`; both use Geist, weight 600, negative tracking. The serif is **not** used for article headings in the shipped design.
- Lists are `1.02rem` / `1.65`; markers are faint. Links are accent-coloured with a 1px underline at 30% accent. `strong` is the full text colour. `em` is italic.
- `blockquote` exists in CSS (`:1479–1487`): 3px accent left border, surface background, italic, rounded right corners. No sample post uses it.
- `code` and `pre` are styled for technical posts (`:1494–1518`), but the sample posts are prose-only.
- Tables are styled (`:1526–1537`), but no sample post uses one.
- Images: `.post img` gets `max-width: 100%`, rounded `var(--r-md)`, 1px border, `margin: 1.6rem 0` (`:1519–1525`). This is the only figure-ish rule.

### 3.4 Figures and captions — absent

There is **no** `<figure>`, `<figcaption>`, or caption CSS anywhere in the reference. The only visuals are:
- inline SVG covers in `.post-cover`;
- travel cover SVGs (sometimes `role="img"` + `aria-label`, e.g. `_template-country.html:42`);
- optional in-article `<img>` tags, which get the generic image rule but no caption/credit pattern.

For Nidhi's case studies, figures are essential, so the template must add a figure contract rather than inherit one. See §3.7–3.8.

### 3.5 Table of contents — absent

There is **no** TOC component, no heading-anchor generation, and no scroll-spy for article headings in the reference. The only in-page IDs in an article are the sources section (`id="sources-title"`) and tag targets. The blog is short-form (≈570 words), so a TOC is not needed there.

For a 1,500–2,500-word case study, a TOC should be added, but it should be static HTML generated at build time (not a JS widget). See §3.7.

### 3.6 End matter

The article closes with three distinct blocks, in this order:

1. **Sources** — `<section class="post-sources" aria-labelledby="sources-title">` containing `<h2 id="sources-title">Sources and further reading</h2>` and a `<ul>` of links. It sits *inside* `.post-body`, so it inherits prose styling. Evidence: `ai-latency-budget.html:144–145`.
2. **Previous / next** — `<nav class="post-nav" aria-label="More posts">` with two equal columns, each a card: mono uppercase label (`← Previous article` / `Next article →`) + title. Collapses to one column at ≤640px (`styles.css:2203–2244`). The blog updater regenerates this from post order (`scripts/update-blog.py:124–128`).
3. **Back link** — `<a class="post-back" href="./">← All posts</a>`, a pill with mono label, surface background, 1px border, `translateX(-2px)` on hover (`styles.css:1539–1560`).

There is no author bio, no newsletter block, no related-posts grid beyond prev/next, and no comments.

### 3.7 Reusable template skeleton

This is the reference shell with the missing figure/TOC/standfirst slots added. Replace `{{…}}`; keep the class names if the reference CSS is being adapted, or map them to the new token system.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{TITLE}} — {{NAME}}</title>
  <meta name="description" content="{{STANDFIRST}}">
  <link rel="canonical" href="{{CANONICAL}}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{{TITLE}} — {{NAME}}">
  <meta property="og:description" content="{{STANDFIRST}}">
  <meta property="og:image" content="{{OG_IMAGE}}">
  <meta name="twitter:card" content="summary_large_image">
  <script src="/theme.js"></script>
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">{ … Article / CreativeWork … }</script>
</head>
<body>
<a class="skip-link" href="#main-content">Skip to content</a>

<header class="nav">
  <a class="nav-logo" href="/">{{NAME}}</a>
  <nav class="nav-links" id="nav-links" aria-label="Primary">
    <a href="/#work">Work</a>
    <a href="/#about">About</a>
    <a href="/#contact" class="nav-cta">Contact</a>
  </nav>
  <div class="nav-tools">
    <button class="icon-btn theme-toggle" aria-label="Toggle theme">…</button>
    <button class="icon-btn nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">…</button>
  </div>
</header>

<main id="main-content" tabindex="-1">
<article class="post">

  <div class="post-cover">
    <!-- Inline SVG diagram, or a <picture> with explicit width/height and alt -->
  </div>

  <div class="post-meta">
    <time datetime="{{DATE}}">{{DATE}}</time>
    <span class="dot">·</span><span>{{READ_MIN}} min read</span>
    <span class="dot">·</span><a class="tag" href="/#work">#{{TAG}}</a>
  </div>

  <h1>{{TITLE}}</h1>
  <p class="post-standfirst">{{STANDFIRST}}</p>

  <div class="post-body">

    <nav class="toc" aria-labelledby="toc-title">
      <h2 id="toc-title">Contents</h2>
      <ol>
        <li><a href="#context">Context</a></li>
        <li><a href="#constraints">Constraints</a></li>
        <li><a href="#approach">Approach</a></li>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#results">Results</a></li>
        <li><a href="#limits">What did not work</a></li>
      </ol>
    </nav>

    <h2 id="context">Context</h2>
    <p>…</p>

    <figure>
      <img src="{{SRC}}" alt="{{ALT}}" width="{{W}}" height="{{H}}" loading="lazy">
      <figcaption>{{CAPTION}} <span class="credit">{{CREDIT}}</span></figcaption>
    </figure>

    <h2 id="approach">Approach</h2>
    <p>…</p>

    <section class="post-sources" aria-labelledby="sources-title">
      <h2 id="sources-title">Sources and further reading</h2>
      <ul><li><a href="{{URL}}">{{LABEL}}</a></li></ul>
    </section>
  </div>

  <nav class="post-nav" aria-label="More projects">
    <a class="post-nav-link prev" href="{{PREV}}">
      <span class="pn-label">← Previous project</span>
      <span class="pn-title">{{PREV_TITLE}}</span>
    </a>
    <a class="post-nav-link next" href="{{NEXT}}">
      <span class="pn-label">Next project →</span>
      <span class="pn-title">{{NEXT_TITLE}}</span>
    </a>
  </nav>

  <a class="post-back" href="/#work">← All work</a>
</article>
</main>

<footer class="footer-compact">
  <div>© <span id="year"></span> {{NAME}}</div>
  <div class="links">
    <a href="/">Home</a><a href="/#work">Work</a>
    <a href="mailto:{{EMAIL}}">Email</a>
    <a href="/datenschutz/">Datenschutz</a>
  </div>
</footer>
<script src="/script.js"></script>
</body>
</html>
```

### 3.8 CSS contract for the article shell

The reference rules, normalised for the new site:

```css
.post {
  max-width: 720px;              /* reference; consider 760–800px for figures */
  margin-inline: auto;
  padding: clamp(2rem, 5vh, 3.5rem) var(--gutter) var(--section-y);
}

.post-body {
  font-size: 1.04rem;
  line-height: 1.7;
}

.post-body :is(p, ul, ol, blockquote) {
  max-width: 68ch;               /* explicit measure; reference relies on 720px */
}

.post-body h2 {
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 2.4rem 0 0.9rem;
}

.post-body h3 {
  font-size: 1.2rem;
  margin: 1.8rem 0 0.7rem;
}

figure { margin: 2rem 0; }

figure img {
  width: 100%;
  height: auto;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
}

figcaption {
  margin-top: 0.6rem;
  font-family: var(--mono);
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--text-faint);
}

figcaption .credit { display: block; opacity: 0.75; }

.toc {
  margin: 2rem 0;
  padding: 1rem 1.2rem;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: var(--surface);
}

.toc h2 {
  margin: 0 0 0.6rem;
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.toc ol { margin: 0; padding-left: 1.2rem; }
.toc li { font-size: 0.92rem; line-height: 1.6; }
```

The reference's `.post` is 720px with no explicit `ch` measure. For a technical case study with a figure rail, widening `.post` to ~800px while keeping prose at `68ch` is a better compromise than shrinking figures to fit 720px.

### 3.9 Content and derivation contract

The blog's template is backed by a small, strict pipeline. The same approach is worth copying for case studies.

- **JSON-LD `BlogPosting` is the source of truth** for title, description, category (`articleSection`), tags (`keywords`), publication/update dates, `wordCount`, and `timeRequired` (`site/README.md:39–42`; `ai-latency-budget.html:28–76`).
- **Body boundary:** `scripts/update-blog.py:88` extracts the body with `<div class="post-body">([\s\S]*?)</div>\s*<nav class="post-nav"`. The template must preserve that exact order.
- **Derived outputs:** the updater regenerates the index, tag index, RSS feed, sitemap, previous/next nav, visible dates, reading times (220 wpm), and tag links (`site/README.md:54–62`; `update-blog.py:104–195`).
- **Build validation:** `scripts/build-site.py:89–131` enforces exactly one `<h1>` per page, one valid canonical, `alt` on every `<img>`, no duplicate IDs, all local links/anchors/sitemap targets resolving, valid JSON/XML, and travel cover files existing.
- **Editorial rule:** "Preserve an existing article's publication date when revising it and update `dateModified` instead. Use real publication dates for new work rather than backdating it. Examples should be labeled as illustrative; do not add unverified personal experiences, study results, or customer metrics" (`site/README.md:42–44`).

That last rule should be adopted verbatim for Nidhi's case studies.

---

## 4. The German home versus the English home

### 4.1 Structural verdict

The two pages are a **1:1 structural mirror**. The diff of `site/index.html` (519 lines) vs `site/de/index.html` (521 lines) shows no section added, removed, reordered, or re-laid-out. Every class, ID, SVG, card count, stat, publication, and link target is the same. The only differences are translation, relative paths, metadata, and a handful of locale-specific labels.

| Dimension | English `/` | German `/de/` | Same? |
|---|---|---|---|
| `<html lang>` | `en` | `de` | No |
| Title | `Bhavesh Jain · Data Scientist · Heilbronn, Germany` | `… Heilbronn, Deutschland` | No |
| Meta description | English | German | No |
| `og:locale` | absent | `de_DE` | No |
| Canonical / hreflang | `/` + en/de/x-default | `/de/` + en/de/x-default | Correct pair |
| Stylesheet path | `styles.css` | `../styles.css` | No |
| Portrait `src` | `assets/profile.jpg` | `../assets/profile.jpg` | No |
| Portrait `srcset` | `/assets/profile.webp` | `/assets/profile.webp` | Same absolute URL |
| Nav labels | Work · Publications · Writing · About · Get in touch | Arbeit · Publikationen · Schreiben · Über mich · Kontakt | Translated |
| Hero H1 | "I build production AI / in research and industry." | "Ich baue produktionsreife KI / in Forschung und Industrie." | Translated, same two-line shape |
| Hero CTA | "See the work" / "Read the writing" | "Arbeiten ansehen" / "Texte lesen" | Translated |
| Meta labels | Based in · Currently · Focus · Published | Standort · Aktuell · Fokus · Publiziert | Translated |
| Work section | 4 bento cards | 4 bento cards | Same |
| Publications | 4 entries, venue strings in English | 4 entries, venue strings partly German ("ISPIM-Konferenz", "19. Symposium…") | Translated |
| Record | 4 stat cards | 4 stat cards | Same |
| Writing | Flagship + 3 links to English blog | Same links; lede adds "(Blog auf Englisch.)" | Same targets |
| About | 3 paragraphs + facts aside | 3 paragraphs + facts aside | Translated |
| Contact | "Say hello." / "Email me" | "Sagen Sie Hallo." / "Per E-Mail schreiben" | Translated |
| Footer | "Hand-built" | "Handgebaut" | Translated |
| Identity/tagline | Same | Same | Yes |

### 4.2 Copy and length

- The section order and block counts are identical: hero, work, publications, record, writing, about, contact.
- Rough tag-stripped body text is **≈740 words EN / ≈690 words DE**, so the German page is not a cut-down version; it is a translation of the same content.
- German copy is often longer per sentence (compounds, verb-final clauses), but the page does not add or drop claims. Example: the EN hero lead is two sentences; the DE lead is three clauses but the same content.
- The two pages share the same four publications and the same four numbers. There is no DE-only publication or metric.
- The DE `about` prose is a close translation, not a rewrite. The DE focus line changes "LLM eval · forecasting · foresight" to "LLM-Eval · Forecasting · Vorausschau".
- The DE page keeps English job titles ("Data Scientist", "Team Lead Data & Development") and English publication titles. That is a deliberate signal: the CV vocabulary stays international.

### 4.3 Metadata and SEO differences

- Both pages carry a `Person` JSON-LD graph with `jobTitle: "Data Scientist"`, `worksFor`, `addressLocality: "Heilbronn"`, and four `ScholarlyArticle` entries. The DE page does **not** add `inLanguage` or a German `jobTitle`.
- Both have `hreflang` en/de/x-default pairs and self-canonicals.
- Both preload the same Geist and Fraunces WOFF2 files.
- The DE page's `og:locale` is the only Open Graph locale signal.
- The DE page's lang toggle points to `../` and is labelled "English version"; the EN toggle points to `de/` and is labelled "Deutsche Version".

### 4.4 Design lesson for Nidhi

The reference treats translation as a **content-layer concern**, not a design-layer one. That is the right model if Nidhi needs EN + DE: one template, one token set, two content files, hreflang pairs, and no separate CSS. The failure mode to avoid is the reference's own: mirroring a design that is already obsolete, then having to redo both languages.

---

## 5. The travel sub-site: index and detail pattern

Travel is the most interesting template in the repository because it is a **data-driven index** rather than a hand-maintained list. It is also the most fragile.

### 5.1 Data model

`site-travel/data/countries.js` is the single source of truth:

```js
window.ATLAS = {
  status: { traveling: false, next: null },
  countries: [
    {
      slug: "alps-road-trip",
      cover: "assets/covers/alps.svg",
      country: "Alps loop",
      region: "Europe",
      flag: "🇩🇪🇦🇹🇮🇹",
      date: "2025-08",
      dateLabel: "Aug 2025",
      duration: "9 days",
      type: "road-trip",
      kind: "report",          // "report" | "sketch" | "home"
      title: "The Alps in a loop",
      teaser: "Bavaria → Tyrol → Dolomites → Hallstatt → Königssee",
      song: { title, artist, url },
      meal: "…",
      moment: "…",
      route: [{ city, lat, lng }, …]
    }
  ]
};
```

Fields are optional except `slug`, `country`, `region`, `date`, `dateLabel`, `kind`, and `cover` (for the thumbnail). `data/atlas.js` uses `kind !== "home"` to exclude the home base from the card grid and the trip count.

### 5.2 Index pattern

`site-travel/index.html` is a single `<section class="section">` with a narrow shell:

1. Sticky nav with only the logo and theme toggle — no nav links, because travel is a satellite site.
2. `section-num` eyebrow (`· / Atlas`), then a JS-injected status pill (`On the road`, `Next up`, or `Back home`).
3. A single `<h1>`: "Fourteen countries, briefly."
4. A one-sentence lede: full write-ups vs route skeletons.
5. **Constellation map** — `assets/world-map.svg` is fetched and inlined by `script.js`; pins are overlaid as `.cpin` dots; `atlas.js` draws chronological quadratic Bézier arcs between pins. A legend distinguishes home from visited.
6. **Numbers panel** — four `.atlas-num` cards injected from data: total countries, cumulative days, full reports vs sketches, most recent trip. The day count is parsed from `duration` strings (`9 days`, `2 weeks`) by `atlas.js:16–23`.
7. **Toolbar** — an `<h2>` "The 14, briefly." plus a three-button sort group: Recent first / By region / Timeline. Buttons are `aria-pressed` toggles and reorder the existing DOM nodes; "Timeline" also switches the card grid to a row layout.
8. **No-script fallback** — a `<noscript>` list of all 13 detail-page links. This is the only no-JS content beyond the H1 and lede.
9. **Contact sheet** — a responsive grid of `.cs-thumb` cards, each a cover image + country + date label, sorted by date descending. The cards are generated entirely by `atlas.js:111–131`.
10. Compact footer.

The visual idea is strong: a personal atlas, not a blog index. The technical weakness is that the useful index — cards, numbers, map, sorting — does not exist without JavaScript. Only the `<noscript>` link list does.

### 5.3 Detail pattern

`site-travel/alps-road-trip.html` (120 lines) and `croatia-november.html` (116 lines) reuse the blog `.post` shell, but with a lighter body:

```
article.post
  .post-cover                 inline SVG, viewBox 1200×525, route line bottom-left
  .post-meta                  date · read time · #travel #country
  h1
  intro <p>                   what the trip was, what this page is
  h2 "The route, day by day"  one <p> per day, bold date prefix
  h2 "Practical notes"        <ul> of concrete advice
  h2 "What I'd write more about"  <ul> of follow-up ideas
  [.trip-card]                injected before the back link by atlas.js
  a.post-back                 "← All travel posts"
footer-compact
```

There is **no `.post-body` wrapper** and no `post-nav` / `post-sources` on travel detail pages. That makes travel a lighter variant, not a drop-in reuse of the blog template: the blog updater's body-extraction regex would not match it.

The optional `.trip-card` is the most distinctive detail component. `atlas.js:25–62` looks up the current slug in `window.ATLAS` and injects a three-column card before `.post-back`:

```
One song   → linked title + artist
One meal   → one sentence
One moment → one sentence
```

This is a nice pattern for a human, memorable detail on an otherwise factual page. It is content-dependent: if the fields are missing, it prints "Coming soon." — which is exactly the kind of empty state to avoid on a job-search site.

### 5.4 The country template

`site-travel/_template-country.html` is a 97-line placeholder file. It is excluded from the public build because `build-site.py:52–61` refuses paths with a leading `_`. Placeholders: `{{TITLE}}`, `{{TEASER}}`, `{{SLUG}}`, `{{FLAG}}`, `{{COUNTRY}}`, `{{DATE_DISPLAY}}`, `{{READ_TIME}}`, `{{TAG}}`. The template includes:

- an illustrated SVG cover with a country flag, country name, and teaser line;
- the same meta row;
- `h1`, teaser paragraph;
- three fixed sections: "The route", "Practical notes", "What I would write more about";
- `post-back`;
- the three travel scripts.

This is a good model for a **small, repeatable content type**: one template file, a naming convention (`slug.html`), a data entry, and a generator script (`bin/new-trip.sh`) that scaffolds the page. For Nidhi, the equivalent is a case-study template plus a `new-project` scaffold, not a hand-edited one-off.

### 5.5 Risks in the travel pattern

1. **Extensionless canonicals vs GitHub Pages.** Detail pages are files like `alps-road-trip.html`, but their canonical URLs are `https://travel.bhaveshjain.com/alps-road-trip` (no `.html`). The old nginx config used `try_files $uri $uri/ $uri.html =404`; GitHub Pages does not do extensionless HTML routing. `site/README.md:30–31` even warns that "A server with extensionless HTML routing is needed to exercise travel's canonical URLs." On Pages, the canonical URL and the actual file URL can diverge unless Cloudflare redirects, directory-index pages, or a Worker are added. **Do not copy this pattern without verifying the deployed behaviour.**
2. **JS-only index content.** The map, numbers, contact sheet, and sorting are injected. With JS disabled or blocked, the index is an H1, a lede, and a link list. That fails the reference's own progressive-enhancement principle.
3. **Three nearly identical stylesheets.** `site/styles.css` is 69,253 bytes / 2,404 lines; `site-travel/styles.css` is 2,403 lines; the blog uses a build-time copy of the main stylesheet. There is no shared source. Every token change must be made in two places (and copied to the blog). For Nidhi, one stylesheet is enough.
4. **Inline SVG covers are code, not assets.** They are hand-authored, theme-aware, and cheap to load, but they are per-page and not reusable. A `cover.svg` per project is fine; a bespoke illustration per page is not.
5. **Data and page can drift.** The detail page's prose is hand-written; `countries.js` holds a different `teaser`, `title`, song/meal/moment. The build validates that cover files exist, but not that the two copies of the title/teaser agree. A single content file per project (front-matter or JSON) would be better.

### 5.6 Reusable index skeleton (if Nidhi needs one)

```html
<main id="top" tabindex="-1">
<section class="section index-head">
  <div class="container">
    <p class="section-eyebrow">Selected work</p>
    <h1>{{INDEX_TITLE}}</h1>
    <p class="lede">{{INDEX_LEDE}}</p>
  </div>
</section>

<section class="project-grid container" aria-label="Projects">
  <a class="project-card" href="/projects/{{SLUG}}/">
    <div class="project-meta">{{YEAR}} · {{DISCIPLINE}} · {{STACK}}</div>
    <h2>{{TITLE}}</h2>
    <p>{{PROBLEM}} → {{OUTCOME}}</p>
    <span class="project-stat">{{METRIC}}</span>
  </a>
</section>
</main>
```

Do **not** add filters, sort toggles, a map, or a tag cloud for three projects. Those are travel-atlas solutions to a travel-atlas problem (14 countries, heterogeneous completeness). Nidhi's site has three projects; a static three-card grid is the correct scale.

---

## 6. Reusable page archetypes for the new site

The reference has three shells and no case-study/about/404/privacy pages. The archetypes below combine what exists with what the Nidhi scope requires (`MASTER_PROMPT.md` §3: home, `/projects/<slug>/`, `/datenschutz/`, 404; no blog, no services, no project archive, no separate About page).

| Archetype | Route | Reference base | Required blocks | Build? |
|---|---|---|---|---|
| Home | `/` | Main home + travel index discipline | Hero, proof strip, 3 work cards, at-a-glance, experience, capabilities/credentials, contact | Yes |
| Work index | `/projects/` or `/#work` | Blog category index + travel contact sheet | H1, lede, 3 cards | **Optional / defer** — master prompt bans a project archive; use `/#work` |
| Case study | `/projects/<slug>/` | Blog post shell + spec's problem→approach→outcome | Breadcrumb, title, standfirst, meta rail, hero figure, context, constraints, approach, architecture, results, limits, links, back/next | Yes, ×3 |
| About & CV | `/#about` + `/cv/` or PDF | Home `about-grid` + facts aside | 3 paragraphs, facts aside, timeline, CV download | Yes (anchor first; PDF preferred) |
| 404 | `/404.html` | None (reference relies on GitHub Pages default) | H1, one sentence, route out (home/work/contact), `noindex` | Yes |
| Privacy | `/datenschutz/` | None (reference has no privacy page) | Controller, hosting, logs, cookies, analytics, contact, rights, retention, date | Yes (required) |

### 6.1 Home

**Borrow:** the reference's section rhythm (eyebrow → H2 → lede → evidence), the `#work` card pattern, the `record` stat pattern, the `about-grid` prose + facts aside, and the single contact band.

**Reject:** the six-section portfolio IA is already too broad for a job-search site. The reference has publications, record, writing, and about as separate blocks; Nidhi needs a tighter 7-section page.

**Recommended contents (7 blocks, max 9):**

1. **Hero** — name, "Data Scientist & AI Engineer", one-line proof (years + domain), primary CTA `Email me` / `Download CV`, secondary `See work`, location/availability meta. No word-swap, no floating portrait, no gradient headline.
2. **Proof strip** — 3–4 verifiable facts, each with a number and a source/anchor. Not a count-up animation; the number must exist in the HTML.
3. **Selected work** — exactly 3 cards. Each: problem → approach → outcome, one metric, one stack line, link to the case study. No 6-card bento spray.
4. **At a glance** — location, work authorization, languages (German/English level), availability, core stack. A definition list, not a card cloud.
5. **Experience** — reverse chronological, 4 roles, 2–3 outcome bullets each. Dates and employers visible; no "passionate" adjectives.
6. **Capabilities & credentials** — a compact grid of data engineering / ML / analytics capabilities plus degrees/certifications. No skill percentage bars.
7. **Contact** — one email CTA, LinkedIn, GitHub, CV. No form unless there is a backend or a tested third-party endpoint.

**Acceptance checks:** one `<h1>`; 360px no horizontal scroll; every claim in the first viewport is backed later; no section is an empty placeholder; all anchors resolve; dark and light both complete; reduced motion removes, not speeds up, animation.

### 6.2 Work index

**Recommendation: do not build a separate `/projects/` archive.** `MASTER_PROMPT.md` explicitly says "No … project archive" and "Three strong projects only." The home `#work` block is the index; each card links directly to `/projects/<slug>/`.

If the owner later wants a shareable index URL, build it as a static three-card page using the travel index's *discipline* (one H1, one lede, one grid) without its machinery (no JS filter, no map, no data file). The blog index's category sections are also overkill: three projects do not need category headings and counts.

**Minimum viable index:**

```
H1: "Three systems, end to end."
Lede: one sentence on the through-line (data → model → decision).
3 × project card: year · discipline · stack / title / problem → outcome / metric.
Footer link: contact.
```

### 6.3 Case study

This is the most important page on the site and the one the reference does **not** provide. The blog post shell is the right skeleton, but a case study needs evidence, figures, and limits.

**Borrow from the reference:** the `.post` narrow column, the cover/meta/H1 header, the prose rhythm, the sources block, the prev/next and back-link end matter, the JSON-LD-as-source-of-truth pipeline.

**Add beyond the reference:** a standfirst class, a static TOC, `<figure>`/`<figcaption>` with credit, a meta rail (role, timeline, team, stack, status), an architecture diagram slot, a results table, and a "what did not work" section.

**Required contents (13):**

1. Back link / breadcrumb to `/#work`.
2. Title — outcome-shaped, not technology-shaped.
3. Standfirst — one sentence: problem + result.
4. Meta rail — role, timeline, team, stack, status (shipped / prototype / research).
5. Hero figure — the system or the result, not a decorative gradient.
6. Context — who had the problem, why it mattered.
7. Constraints — data access, latency, compliance, team size, non-goals.
8. Approach — 2–3 key decisions and the alternatives rejected.
9. Architecture / data-flow figure with a caption that explains the arrows.
10. Results — metric, baseline, denominator, and what the metric does not capture.
11. Limitations / what did not work — the trust-building section.
12. Links — repo, demo, paper, or "code available on request".
13. End matter — previous/next project + back to work.

**Length:** 1,200–2,000 words. If over ~1,500, add the static TOC. Keep prose at 68ch; let figures extend to ~880px inside a 720–800px article if needed.

**Avoid:** a chronological diary ("first we… then we…"), a technology list with no decisions, a single aggregate accuracy number, unlabeled illustrative data, and a "results" section with no baseline.

### 6.4 About and CV

The reference has no separate About page. It has a strong `about-grid` on the home: three prose paragraphs plus a facts aside (`site/index.html:434–476`). That is the right pattern for a job-search site, because the technical lead is already on the home page.

**Use:**

- `/#about` anchor with 3 short paragraphs: (1) who and where, (2) current work and domain, (3) evidence/trajectory and what she wants next.
- Facts aside: location, languages, availability, work authorization, "elsewhere" links, CV download.
- A compact timeline if the CV has four roles; otherwise the `#experience` section is enough.
- CV as a **PDF** linked from the hero and footer; optionally a print-optimised `/cv/` HTML page with `@media print` that hides nav/footer and uses the same prose measure.

**Avoid:** duplicating the home About copy verbatim on a separate page; a photo-heavy biography; a "passions" section; a separate page that exists only because a template had one.

### 6.5 404

The reference has no `404.html`; GitHub Pages serves its default. That is a missed trust signal, especially when old URLs or truncated links are shared.

**Build `/404.html`:**

- same shell as the article page (nav + footer);
- one `<h1>`: "This page doesn't exist."
- one sentence: "The link may be old, or the page may have moved."
- three routes: `Home`, `Selected work`, `Contact`.
- `<meta name="robots" content="noindex">`;
- no auto-redirect (a redirect to home hides the error and breaks back-button expectations);
- no JS required.

**Avoid:** a full-screen animation, a joke that delays the route out, or a search box that does not work.

### 6.6 Privacy / Datenschutz

The reference has no privacy page. For a German-based job-search site, a Datenschutz page is required as soon as the site is public and processes any personal data (contact email, server logs, hosting).

**Build `/datenschutz/`** using the article shell:

1. Controller (name, contact).
2. Hosting — GitHub Pages, Inc.; server logs and IP processing.
3. Cookies — state "none" if none; if a theme preference is stored in `localStorage`, disclose it as strictly necessary.
4. Analytics — state "none" if none; if added later, name the provider and legal basis.
5. Contact — email, purpose, retention.
6. Rights — access, rectification, erasure, objection, complaint.
7. Retention.
8. Last updated date.

**Rules:**

- No consent banner if there are no non-essential cookies or trackers. A banner with nothing to consent to is worse than none.
- Do not copy a generic legal template; the controller and hosting facts must be real.
- If the site is bilingual, provide the privacy notice in German (primary) and English, or a German notice with an English summary.
- Impressum is only required if the site becomes freelance/consulting (`MASTER_PROMPT.md` config: `SITE_SCOPE: job-search only`).

### 6.7 Shared shell contract

All archetypes should share exactly one shell:

```
<head>
  meta charset/viewport
  title + description
  canonical + hreflang (if bilingual)
  OG/Twitter
  theme.js (before CSS)
  styles.css
  JSON-LD (Person on home; Article/CreativeWork on case studies; WebPage on privacy)
</head>
<body>
  skip link
  header.nav (logo, nav links, theme toggle, mobile toggle)
  main#main-content[tabindex="-1"]
    page content
  footer (home) or footer-compact (article/privacy)
  script.js
</body>
```

The reference varies this shell in three ways that should be normalised for Nidhi:
- blog nav uses absolute URLs to the main site; use root-relative `/` instead;
- travel nav omits nav links entirely; a satellite site still needs a route home;
- home uses `.footer`, article uses `.footer-compact`; keep both but define them from the same tokens.

---

## 7. Borrow / reject table for the Nidhi site

| Component / pattern | Source | What to learn | Fit for a data/AI job search | Verdict | Assets reused |
|---|---|---|---|---|---|
| Editorial restraint; one accent; whitespace | Spec §4, not shipped | Confidence comes from fewer colours and stronger type | High: technical lead values signal over decoration | **Borrow the principle** | None |
| Fraunces display + Geist body | Spec §4.1 | Serif headline / sans body pairing reads editorial, not templated | Medium: test against Nidhi's CV tone; do not copy the exact pairing blindly | **Borrow selectively** | None |
| Mono only for technical metadata | Spec §4.1 | Mono as a *label*, not wallpaper | High: stack names, dates, metrics | **Borrow** | None |
| Rainbow gradient tokens | Shipped CSS | The reference's own spec calls this a 2024 template | Low: dates the site and weakens trust | **Reject** | None |
| Word-swap hero | Shipped home | Motion without information | Low: static headline is stronger for a job search | **Reject** | None |
| Floating/rotated portrait | Shipped CSS | Playful, but not authoritative | Low–medium: a static, well-lit portrait is better | **Reject the motion** | None |
| Four-card bento work spray | Shipped home | Visual variety, but unequal depth | Low: three evidence-led cards beat four teasers | **Reject the count; borrow the card anatomy** | None |
| `.record` stat cards + count-up | Shipped home | Numbers need denominators and context | Medium: use static numbers with sources; skip the count-up | **Borrow structure, reject animation** | None |
| Publications year-rail list | Shipped home | Dense, scannable citation layout | Only if Nidhi has real publications | **Conditional** | None |
| Writing flagship + link rows | Shipped home | Good hierarchy for 1 flagship + 3 links | Only if 2+ real posts exist; master prompt bans empty Writing | **Conditional / likely reject** | None |
| `about-grid` prose + facts aside | Shipped home | Human prose next to scannable facts | High | **Borrow** | None |
| Blog `.post` shell | Blog | Narrow measure, cover/meta/H1, sources, prev/next | High for case studies | **Borrow, extend with figures/TOC/limits** | None |
| `.post-nav` prev/next cards | Blog | Clear end-of-article navigation | High | **Borrow** | None |
| `.post-back` pill | Blog/travel | One obvious route back to the index | High | **Borrow** | None |
| Travel atlas index (map + numbers + sort) | Travel | Data-driven index, chronological arcs | Low for 3 projects; high complexity, JS-dependent | **Reject for now** | None |
| Travel contact-sheet cards | Travel | Image + country + date, responsive grid | Medium if projects have strong covers | **Borrow the grid, not the JS** | None |
| Travel `.trip-card` (song/meal/moment) | Travel | Memorable human detail | Low for a job search; risks "Coming soon" empties | **Reject** | None |
| `_template-country.html` + scaffold script | Travel | Repeatable content type | High: use for case-study template + `new-project` | **Borrow the workflow** | None |
| Extensionless canonical URLs | Travel | Clean URLs | Risky on GitHub Pages without redirects | **Reject unless verified** | None |
| ~2,400-line duplicated stylesheets | All three sites | Shared visual language | Low: one stylesheet is enough | **Reject duplication** | None |
| Build-time validation (one H1, canonical, alt, links, JSON, sitemap) | `build-site.py` | Catch structural regressions before deploy | High | **Borrow** | None |
| JSON-LD as source of truth + derived index/feed | `update-blog.py` | Single source, generated navigation | High if there is a writing/case-study collection | **Borrow** | None |
| 220 wpm reading time | `update-blog.py` | Honest metadata | Medium | **Borrow if articles exist** | None |
| Skip link, focus-visible rings, `prefers-reduced-motion` | Shipped CSS/JS | Baseline accessibility | High | **Borrow** | None |
| 44px tap targets | Spec/plan, partial | Mobile-first hard rule | High | **Borrow and finish it (desktop too)** | None |
| Self-hosted fonts, WebP + `<picture>`, explicit dimensions | Shipped assets | Performance without a framework | High | **Borrow** | None |
| 3D / Three.js portfolio | Reverted commit `dee63368` | Immersive but heavy | Low: perf risk, hard to maintain, was reverted | **Reject** | None |
| Placeholder/empty pages | Reference gaps | A route without content is worse than no route | — | **Reject empty pages** | None |

---

## 8. Open questions and build implications

1. **Three case studies with real metrics?** The reference's work cards each have a number (7 agents, 12k sources, <4 min, 12% better). If Nidhi's projects lack real metrics, the cards must lead with scope and decisions, not invented numbers. `site/README.md:42–44` is the right rule: no unverified customer metrics.
2. **Bilingual?** The reference mirrors EN/DE at the content layer. If Nidhi needs German, budget for two content files and hreflang, but only one template and one stylesheet. If not, skip the DE route entirely; a half-translated site is worse than an English-only one.
3. **Publications?** The year-rail list is excellent, but only if there are 3+ real papers. Otherwise omit the section; the CV already carries publications.
4. **Writing?** The master prompt bans an empty Writing page. The reference's flagship + link-row pattern is good, but only after 2+ real posts exist. Do not ship a "Writing" nav item pointing at nothing.
5. **Privacy controller details and hosting.** The privacy page cannot be written without the real controller name, address, and hosting provider. Get these from the owner before drafting.
6. **Custom domain and canonical URLs.** The reference's travel extensionless canonicals are a live risk on GitHub Pages. For Nidhi, use either `/projects/<slug>/index.html` (directory URLs) or `.html` URLs with matching canonicals. Do not mix.
7. **Deploy gate.** The reference's plan had a stop gate; the 3D redesign bypassed it and was reverted. The Nidhi build should keep the plan's gate and make the approval artifact explicit: wireframe → approval → build → local preview → approval → deploy.
8. **One stylesheet, one shell.** The reference's three-site duplication is the main maintenance cost. Nidhi's site should have one `styles.css`, one `script.js`, one `theme.js`, and one article shell used by every case study and by the privacy page.

---

## Appendix A — File and line map used in this analysis

| Claim | Evidence |
|---|---|
| Spec intent / audit | `docs/superpowers/specs/…design.md:11–13` |
| Positioning | spec `:15–19` |
| Locked decisions | spec `:21–31` |
| Typography rules | spec `:35–39` |
| Colour rules | spec `:41–47` |
| Motion rules | spec `:49–54` |
| IA (10 blocks) | spec `:61–72` |
| Content changes | spec `:74–83` |
| Mobile-first | spec `:93–95` |
| Out of scope | spec `:97–102` |
| Success criteria | spec `:104–110` |
| Plan tasks / guardrails | `docs/superpowers/plans/…redesign.md:13–19, 21–82` |
| All plan boxes unchecked | plan `:22–82` |
| Shipped tokens (orange/gradient) | `site/styles.css:67–115` |
| Shipped headings (sans) | `site/styles.css:195–203` |
| Shipped portrait float | `site/styles.css:1727–1732` |
| Shipped word-swap/gradient | `site/index.html:186–189`; `site/styles.css:428–432, 1655–1659` |
| Post shell | `site/styles.css:1351–1568` |
| Post nav | `site/styles.css:2203–2244` |
| Footer compact | `site/styles.css:1603–1616` |
| Blog index sections | `site-blog/index.html:69–263` |
| Blog article skeleton | `site-blog/ai-latency-budget.html:79–168` |
| Travel index | `site-travel/index.html:20–81` |
| Travel detail | `site-travel/alps-road-trip.html:21–120` |
| Travel template | `site-travel/_template-country.html:1–97` |
| Travel data model | `site-travel/data/countries.js:11–65` |
| Travel index runtime | `site-travel/data/atlas.js:16–169` |
| Build validation | `scripts/build-site.py:89–131` |
| Blog updater contract | `scripts/update-blog.py:88, 104–195`; `site/README.md:54–62` |
| Editorial integrity rule | `site/README.md:42–44` |
| Commit timeline | GitHub API: `16857346`, `cbd1cfc6`, `dee63368`, `0bbe6c27`, `01cac1f4` |

## Appendix B — Mirror locations

- Reference mirror: `/tmp/ref-site/site/` (home, CSS, JS, DE)
- Fetched secondary pages: `/tmp/ref-fetch/site-blog_index.html`, `site-blog_ai-latency-budget.html`, `site-blog_how-to-evaluate-llm-apps.html`, `site-blog_tags.html`, `site-travel_index.html`, `site-travel_alps-road-trip.html`, `site-travel_croatia-november.html`, `site-travel__template-country.html`
- Fetched data/scripts: `/tmp/ref-fetch/site-travel_data_countries.js`, `site-travel_data_atlas.js`, `site_script.js`, `site_theme.js`, `scripts_build-site.py`, `scripts_update-blog.py`
