# Reference component inventory — bhaveshjain.com home page

Source files:
- `/tmp/ref-site/site/index.html` (519 lines, English home page)
- `/tmp/ref-site/site/styles.css` (2365 lines)
- `/tmp/ref-site/site/script.js` (283 lines)
- `/tmp/ref-site/site/theme.js` (41 lines)
- `/tmp/ref-site/site/de/index.html` (German mirror, same component tree)

Purpose of this document: a build-grade inventory so the same page can be reconstructed for a different owner (Nidhi Patel) without copying the reference owner's content, identity, or claims.

Conventions used below:
- DOM skeletons are condensed and preserve real tag and class names.
- Counts are exact for this page.
- "Priority" is **essential** (page fails without it), **supporting** (adds structure/credibility), or **decorative** (can be removed with no loss of meaning).
- Layout tokens referenced repeatedly: `--container: 1200px`, `--gutter: clamp(1.2rem, 4vw, 2rem)`, `--section-y: clamp(4rem, 10vh, 7rem)`, radii `8/14/20/28px`, section grid gap `1rem`.

Page order (document order):
`skip-link` → `scroll-progress` → `header.nav` → `main#top` [ `hero` (h1/lead/CTA/meta + portrait + tech strip) → `#work` → `#publications` → `#record` → `#writing` → `#about` → `#contact` ] → `footer.footer` → injected `#to-top`.

A note on the reference's own metadata: the page carries a full SEO/JSON-LD block, Open Graph and Twitter cards, hreflang alternates to `/de/`, a preloaded Geist/Fraunces font pair, and a boot script (`theme.js`) that applies a stored theme before first paint. None of that is a visible component, but the theme boot script is a hard dependency of the theme toggle (see 3.4).

---

## 1. Skip link — `<a class="skip-link">`

**Semantic element:** anchor, first focusable element in `<body>`.

**DOM skeleton**
```
body
└─ a.skip-link[href="#top"]  "Skip to content"
└─ div#scroll-progress[aria-hidden="true"]
```

**Content slots:** 1 fixed string ("Skip to content").

**Visual role:** invisible until keyboard-focused; then a bordered chip slides down from above the viewport at top-left. It is the accessibility entry point to `main#top` (which carries `tabindex="-1"` so focus can land on it non-visibly).

**Interactive states:**
- Default: `transform: translateY(-200%)`, off-screen.
- `:focus`: `translateY(0)`; 2px accent border, `--bg` fill, z-index 10000.
- No hover behaviour.

**Dependencies:** `main#top[tabindex="-1"]` must exist. Pure CSS; no JS.

**Order / spacing:** fixed overlay, removed from flow; does not affect hero spacing.

**Priority:** essential (accessibility).

---

## 2. Scroll progress bar — `<div id="scroll-progress">`

**Semantic element:** `<div>`, presentational, `aria-hidden="true"`.

**DOM skeleton**
```
div#scroll-progress[aria-hidden="true"]
```

**Content slots:** none (width is data).

**Visual role:** 2px gradient line pinned to the top of the viewport, growing left-to-right as a reading-position cue. It sits above the sticky header (`z-index: 200` vs nav `100`) and uses the warm gradient plus a soft orange glow.

**Interactive states:** none; `pointer-events: none`. Width is set inline by script. Disabled transition under `prefers-reduced-motion`.

**Dependencies:**
- `script.js` scroll-progress IIFE: reads `document.documentElement.scrollHeight/clientHeight`, sets `style.width = pct + '%'` inside `requestAnimationFrame`; passive scroll + resize listeners.
- CSS rule `#scroll-progress` appears twice: an early `display: none` base and a later v3 block that re-enables it (`display: block`). Net result: visible.

**Order / spacing:** fixed; no layout impact.

**Priority:** decorative.

---

## 3. Header / primary navigation — `<header class="nav">`

**Semantic element:** `<header>` with nested `<nav aria-label="Primary">`. Sticky at `top: 0`, `z-index: 100`, backdrop blur, translucent fill, 1px bottom border, `padding: 1rem var(--gutter)`.

**DOM skeleton**
```
header.nav
├─ a.nav-logo[href="#top"]
│  ├─ span.logo-mark            "B"
│  └─ span                      "Bhavesh Jain"
├─ nav.nav-links#nav-links[aria-label="Primary"]
│  ├─ a[href="#work"]           "Work"
│  ├─ a[href="#publications"]   "Publications"
│  ├─ a[href="#writing"]        "Writing"
│  ├─ a[href="#about"]          "About"
│  └─ a.nav-cta[href="#contact"] "Get in touch"
└─ div.nav-tools
   ├─ a.icon-btn.lang-toggle[href="de/"] "DE"
   ├─ button.icon-btn.theme-toggle[aria-label]
   │  ├─ svg.icon-moon
   │  └─ svg.icon-sun
   └─ button.icon-btn.nav-toggle[aria-expanded][aria-controls="nav-links"]
      └─ svg (three horizontal lines)
```

**Content slots:**
- Logo: 1 initial character + 1 display name.
- Nav links: 5 anchors total (4 section anchors + 1 pill CTA).
- Tools: 1 language link, 1 theme button with 2 SVG icons, 1 hamburger button with 1 SVG.
- Notable: **`#record` is a page section but has no nav link.** The nav's four anchors map only to Work, Publications, Writing, About.

**Visual role:** persistent identity mark and section wayfinding. The logo mark is a gradient rounded square with the owner's initial; the nav is the page's only global control surface.

**Interactive states:**
- Nav link hover/focus-visible: text goes to full `--text`, background `--surface`, plus a 1px accent underline that scales from `scaleX(0)` to `1` from the left (`::before`, hidden under 640px).
- Active section: `.is-active` class (set by script) keeps the link at full text colour and keeps the underline at `scaleX(1)`.
- `.nav-cta`: warm gradient pill with glow; hover lifts 1px, shadow intensifies, and a white shine sweeps across (`::after` translateX -100% → 100%).
- `.icon-btn` hover: background `--surface-hi`, text `--text`, border `--border-hi`.
- Logo hover: mark rotates -4°, scales 1.06, gains orange halo; wordmark letter-spacing tightens slightly.
- `.nav.is-scrolled` (scrollY > 32): background opacity increases, shadow appears, bottom border becomes transparent, padding tightens (transitioned 0.25s).
- Theme button: moon and sun cross-fade/rotate (0.32s/0.42s); on light theme the sun is visible and the moon rotated -90° and scaled down. Under reduced motion the transition is removed.
- Hamburger: hidden by default; `display: inline-flex` only at ≤640px once JS adds `.nav-ready` to `<html>`. Here `.nav-toggle` is styled via the `.icon-btn` path, not the legacy bare-button path.
- Mobile open state: `.nav-links.open` becomes an absolute dropdown below the header, right-aligned, column flex, 0.95 alpha background + blur, 1px border, 20px radius, min-width 220px; links become full-width, right-aligned, 44px minimum height; the CTA keeps its gradient pill.

**Dependencies:**
- `theme.js`: applies stored `localStorage.theme === 'light'` as `data-theme="light"` before paint, adds `.has-js`; `.theme-toggle` is only displayed when `.has-js` is present.
- `script.js` nav IIFE: toggles `.open`, `aria-expanded`, moves focus to first link on open, closes on link click, Escape (restores focus to toggle), outside click, and on crossing 641px; adds `.nav-ready` so the menu is progressive-enhancement-safe (without JS the links simply wrap below the logo at ≤640px).
- `script.js` active-link IIFE: maps each `href="#..."` to its section, uses a 110px line below the nav, and at page bottom selects the bottom-most section.
- `script.js` nav shadow IIFE: toggles `.is-scrolled` past 32px.
- Body-scroll lock is **not** implemented; the dropdown scrolls with the page.

**Order / spacing:** first block in flow after the fixed helpers; sticky, so page content starts beneath it. Desktop: logo left, links centre-right, tools far right, `gap: 1rem`. ≤640px: padding drops to `0.85rem var(--gutter)`.

**Priority:** essential.

---

## 4. Hero — `<section class="hero">`

**Semantic element:** `<section>` (no heading id, no `aria-labelledby`). Contains a `.container` for the text/portrait grid and a full-bleed tech strip outside it.

**DOM skeleton**
```
section.hero
├─ div.container
│  └─ div.hero-grid
│     ├─ div.hero-text
│     │  ├─ h1
│     │  │  "I build "
│     │  │  span.swap-wrap > span#hero-swap "production AI"
│     │  │  <br/> "in research and industry."
│     │  ├─ p.hero-lead  [inline a.link-accent]
│     │  ├─ div.hero-cta-row
│     │  │  ├─ a.btn.btn-gradient[href="#work"]
│     │  │  │  "See the work" + svg arrow
│     │  │  └─ a.btn.btn-ghost[href="#writing"] "Read the writing"
│     │  └─ div.hero-meta
│     │     └─ div.hero-meta-item ×4
│     │        ├─ span.label
│     │        └─ span.value   [may contain <a>]
│     └─ div.hero-portrait
│        ├─ picture
│        │  ├─ source[srcset="profile.webp"][type="image/webp"]
│        │  └─ img[src="profile.jpg"][alt][width="827"][height="1063"]
│        └─ div.portrait-tag
│           ├─ span.pulse
│           └─ "HEILBRONN · DE"
└─ div.tech-strip[tabindex="0"][aria-label]
```

**Content slots:**
- `h1`: 3 text fragments — fixed prefix, 1 highlight phrase in the swap span, fixed suffix. The highlight phrase is the visual centrepiece.
- `.hero-lead`: 1 paragraph (about 4 lines at desktop), containing exactly 1 inline accent link plus optional internal links. Reference text names role, employer, years, and a positioning claim.
- `.hero-cta-row`: 2 buttons. Primary carries a trailing arrow SVG; secondary has no icon.
- `.hero-meta`: 4 items, each a mono uppercase label + value. Reference labels: Based in, Currently, Focus, Published. Two values contain links (one 1 link, one 2 links, one internal anchor).
- Portrait: 1 image in 2 formats, 1 alt string, 1 location tag with a pulsing dot.
- Grid ratio: `1.7fr 1fr`; portrait `aspect-ratio: 1/1.2`, `max-width: 400px`, rotated 1.2° resting.

**Visual role:** the page's entire argument in one screen. The gradient-italic serif span gives the name/role phrase a distinct voice; the lead establishes credibility; the buttons offer the two intents (see evidence / read thinking); the meta grid answers the four recruiter questions at a glance (where, currently doing, focus, proof). The portrait is the human anchor; the tilt and pulse tag make it feel alive rather than like a CV photo.

**Interactive states:**
- `#hero-swap`: the wrapping `.swap-wrap` is gradient-filled text (serif italic, warm gradient), with `background-size: 200% 200%` and a 6s `gradient-shift` animation. **No word-rotation script exists in `script.js`** — the id and span structure are swap-ready, but the reference build only animates the gradient. Any word-swap behaviour must be authored.
- `.link-accent`: accent colour; inherits the global inline-link underline animation where one exists.
- `.btn`: 0.85rem × 1.4rem, fully rounded, 0.95rem text, flex with 0.55rem gap.
- `.btn-gradient` hover: lift 2px and stronger shadow. `.btn-ghost` hover: background to `--surface-hi`, border to `--border-hi`.
- `.hero-portrait` hover: rotation to 0° and scale 1.015 over 0.4s.
- `.hero-meta-item .value a`: 1px bottom border; hover turns accent.
- Mobile ≤640px: buttons stretch full-width with 48px min-height; meta becomes a single column with 1rem gaps.

**Dependencies:** `--grad-warm`, `--serif` (Fraunces), `--mono` (JetBrains Mono), profile assets. The `#hero-swap` id is unused by JS. The portrait tag has no JS; the `.pulse` dot is CSS-animated (see 14).

**Order / spacing:** top padding `clamp(4rem, 10vh, 7rem)`, bottom `clamp(3rem, 7vh, 5rem)`; grid gap `clamp(2rem, 5vw, 4rem)`. Lead has 2.2rem bottom margin; CTA row 2.4rem; meta separated by a 1px top border and 1.6rem padding. Tech strip follows with `margin-top: clamp(3rem, 6vh, 4rem)`.

**Priority:** essential.

---

## 5. Tech-strip marquee — `<div class="tech-strip">`

**Semantic element:** `<div>` with `tabindex="0"` and an `aria-label` that explains the auto-scroll and focus-to-pause. Labels are `<span>`s, not a list.

**DOM skeleton**
```
div.tech-strip[tabindex="0"][aria-label="…auto-scrolling — focus to pause"]
├─ span.tech-strip-label "Working stack"
└─ div.tech-strip-track
   └─ div.tech-strip-items
      └─ span ×12
```

**Content slots:** 1 section label; 12 technology names (reference: Python, PyTorch, LangGraph, FastAPI, Postgres, pgvector, Docker, AWS · GCP, Weights & Biases, Pandas · Polars, scikit-learn, Anthropic · OpenAI APIs). JS duplicates the entire item set to 24 for a seamless -50% loop.

**Visual role:** signals breadth of tooling in one horizontal band; the infinite drift adds motion without asking for attention. It visually terminates the hero and separates it from section 01.

**Interactive states:**
- Hover on the strip: animation paused (`animation-play-state: paused`).
- Keyboard focus anywhere in the strip (`:focus-within`): also paused, hence `tabindex="0"`.
- Individual span hover: colour turns accent.
- Reduced motion: no animation at all, no duplication, and the row is simply readable/scrollable.
- Edges are masked with a 4% fade on each side; webkit scrollbar hidden.

**Dependencies:**
- `script.js` tech-strip IIFE duplicates `innerHTML` **only when reduced motion is not requested**.
- CSS `@keyframes tech-scroll` (0 → -50%, 40s linear infinite) inside `prefers-reduced-motion: no-preference`.
- The track has `overflow: hidden`; the outer strip is flex with label + track.
- `tabindex="0"` on a non-interactive div is a deliberate pause affordance; it creates a tab stop with no role, which is worth reconsidering in a rebuild.

**Order / spacing:** full-bleed, outside `.container`; 1.4rem vertical padding, top and bottom 1px borders, 1.25rem gap between label and track. Label has its own gradient fade so items disappear under it.

**Priority:** supporting.

---

## 6. Section shell and section-head — `<section class="section">` + `<div class="section-head">`

Repeated 5 times: `01 Selected work`, `02 Publications`, `03 Track record`, `04 How I think`, `05 About`. Contact uses a different head treatment (see 12).

**Semantic element:** `<section class="section" id="…">` → `.container` → `.section-head`. Each section's `h2` is the de facto accessible name; only some ids are referenced by nav.

**DOM skeleton**
```
section.section#work
└─ div.container
   ├─ div.section-head.reveal
   │  ├─ div.section-num
   │  │  ├─ span.n      "01"
   │  │  ├─ span.line
   │  │  └─ span        "Selected work"
   │  ├─ h2             "AI systems that work<br/>after the demo."
   │  └─ p              dek / one-sentence framing
   └─ …section body…
```

**Content slots:**
- 1 index number (zero-padded, accent-coloured).
- 1 hairline rule (32px × 1px) between number and label.
- 1 uppercase mono label naming the section.
- 1 `h2`; the reference uses a deliberate line break in Work (`<br/>`) but not elsewhere.
- 1 optional dek paragraph. Present in Work, Publications, Writing; **absent** in Track record and About.

**Visual role:** establishes rhythm and hierarchy. The number + rule + label reads like a document section marker, and the 720px cap keeps the heading measure editorial. It is the strongest signature of the reference's "report, not landing page" register.

**Interactive states:** none. The whole head is a `.reveal` target (fade/translate on first viewport entry, with `data-delay` used on cards rather than the head).

**Dependencies:** `.reveal` + IntersectionObserver from `script.js`; `data-delay="1..5"` CSS transition delays (0.07s steps).

**Order / spacing:** `margin-bottom: 3rem`; section vertical padding `var(--section-y)`; `h2` bottom margin 1rem; dek max-width 56ch, 1.1rem.

**Priority:** essential (it is the page's structural grammar).

---

## 7. Work bento grid — `<div class="bento">` with `<article class="bento-card">`

**Semantic element:** `<div class="bento">` containing four `<article>` elements. Grid: 6 columns, `grid-auto-rows: minmax(220px, auto)`, 1rem gap.

**DOM skeleton**
```
div.bento
├─ article.bento-card.b-feature.reveal
│  ├─ span.b-tag
│  ├─ h3
│  ├─ p
│  └─ div.bento-stats
│     └─ div.stat ×3
│        ├─ span.stat-num
│        └─ span.stat-label
├─ article.bento-card.b-tall.reveal[data-delay="1"]
│  ├─ span.b-tag
│  ├─ h3
│  ├─ p
│  ├─ p.b-outcome            [may contain <strong>]
│  └─ div.bento-illus[aria-hidden="true"]
│     └─ svg (concentric circles, radius line, 3 dots)
├─ article.bento-card.b-third.reveal[data-delay="2"]
│  ├─ span.b-tag
│  ├─ h3
│  ├─ p
│  └─ p.b-outcome
└─ article.bento-card.b-third.reveal[data-delay="3"]
   ├─ span.b-tag
   ├─ h3
   ├─ p
   └─ p.b-outcome > a.link-accent
```

**Content slots:**
- 4 cards total:
  - **Feature** (spans 4 of 6 columns): 1 tag, 1 title, 1 body paragraph, 3 stats (number + label pairs).
  - **Tall** (spans 2 columns, 2 rows): 1 tag, 1 title, 1 body, 1 outcome line, 1 decorative SVG.
  - **Two thirds** (2 columns each): 1 tag, 1 title, 1 body, 1 outcome line each. One outcome is plain text with `<strong>` on the metric; the other is an inline link to `#publications`.
- Reference tags: "Building · vorschau.ai", "Fraunhofer ISI", "M.Sc. thesis", "Publications".
- Outcome lines use a CSS-generated `→` prefix (accent, non-italic) and are serif italic.
- Stats are vertical rows: mono accent number left, small label right.

**Visual role:** the portfolio's evidence section. Asymmetric sizing encodes importance — the flagship product gets 4 columns and a stats block; the tall card gets the only illustration and a "used by" credibility line; the two small cards cover thesis and publications. It reads as a composed magazine spread rather than a uniform card grid.

**Interactive states:**
- Card hover: translateY(-3px), border to `--border-hi`, background to `--surface-2`, 0.25s.
- Mouse-glow: JS writes `--mx`/`--my` percentages; `::before` radial highlight fades in on hover (accent at 10%).
- Outcome arrow: `→` nudges 4px right on card hover.
- Tag pulse: on `.is-in`, a one-shot 1.6s accent halo expands behind `.b-tag` (suppressed for reduced motion).
- Feature card: gradient surface + gradient border via masked `::after`.
- Whole card is **not** a link; only the explicit inline link is clickable.

**Dependencies:**
- `.reveal`/IntersectionObserver and `data-delay` stagger.
- Mouse-glow listener in `script.js` (targets `.bento-card`, `.quote-card`, `.record-card`, `.post-card`).
- Inline SVG in the tall card is purely decorative and uses `currentColor`; `aria-hidden="true"`.
- Responsive: ≤920px the grid becomes 2 columns and every card spans 2; ≤640px it becomes 1 column. The tall card loses its row span.

**Order / spacing:** first body block inside `#work`, 3rem below the head. Cards are internally `padding: 1.6rem`, column flex, 0.7rem gap; `.b-outcome` is pushed to the bottom with `margin-top: auto` above a 1px rule.

**Priority:** essential.

---

## 8. Publications list — `<ol class="pubs">` with `<li class="pub">`

**Semantic element:** ordered list. Visual order is newest-first; the year rail is a separate `<span>`, not a counter.

**DOM skeleton**
```
ol.pubs.reveal
└─ li.pub ×4
   ├─ span.pub-year          "2026"
   └─ div.pub-body
      ├─ h3.pub-title > a[href][target="_blank"][rel="noopener"]
      ├─ p.pub-authors
      ├─ p.pub-venue
      └─ a.pub-doi[href][target="_blank"][rel="noopener"] "DOI: …"
```

**Content slots:** 4 entries. Per entry: 1 year, 1 title, 1 author string, 1 venue string, 1 DOI string. The title and DOI point to the same URL; both open in a new tab. Reference entries include an English and a German title, and one author string prefixed "with …".

**Visual role:** academic credibility. The left 5.5rem year rail creates a scannable timeline; rows are separated by hairlines rather than cards, which reads as a CV/publication record and deliberately contrasts with the card-heavy Work section.

**Interactive states:**
- Title link hover: accent colour.
- DOI hover: faint grey to accent.
- No row-level hover, no card hover, no reveal per row (the whole list is one `.reveal`).

**Dependencies:** none beyond CSS and the `.reveal` observer. No JSON-LD dependency for display (the page also emits ScholarlyArticle JSON-LD, which is optional).

**Order / spacing:** `#publications` body. Each `.pub` is a 2-column grid (`5.5rem 1fr`, 1.2rem gap), `padding: 1.4rem 0`, `border-top: 1px solid`; last child adds a bottom border. ≤640px collapses to one column and stacks the year above the body.

**Priority:** supporting — and **content-conditional** (see final section).

---

## 9. Record stat grid — `<div class="record">` with `.record-card`

**Semantic element:** plain `<div>`s. Each number is a `<div>`, not a `<data>` or `<output>`; the accessible value is the final text.

**DOM skeleton**
```
div.record
└─ div.record-card.reveal[data-delay="0..3"] ×4
   ├─ div.record-num[data-target="6"][data-suffix="+"]  "6+"
   ├─ div.record-label
   └─ div.record-sub
```

**Content slots:** 4 cards. Each: 1 numeric target, 1 optional suffix, 1 label (≤6 words), 1 sub-line (3–5 words). Reference targets: 6+, 4, 12+, 7. One card has no suffix attribute at all.

**Visual role:** compresses the CV into four glanceable proof points. The serif gradient numerals are the largest type on the page after the h1, so the section reads as a scoreboard. The sub-lines stop the numbers from being context-free.

**Interactive states:**
- Count-up: on first intersection of `#record` (threshold 0.08, rootMargin bottom 18%), every `.record-num` animates from 0 to target over 1100ms with cubic ease-out, appending the suffix each frame.
- Cards also receive `.is-in` at that moment, which drives the reveal animation.
- Hover: radial mouse-glow (`--mx`/`--my`) on `.record-card::before`, same mechanism as bento.
- Reduced motion: numbers are written instantly as `target + suffix`, cards marked `.is-in`, no observer.
- No IntersectionObserver: cards shown, numbers **left as authored in HTML** (the script returns early without writing them).
- Gradient numerals have an 8s background-position animation; disabled under reduced motion.

**Dependencies:** `data-target` (integer) and `data-suffix` (string) are the JS contract; the visible text must already equal the final value for no-JS correctness. The script also hardcodes `document.getElementById('record')`, so the section id is load-bearing.

**Order / spacing:** 4-column grid, 1rem gap, 1.5rem/1.4rem card padding. Cards are border + surface, no hover lift (only glow). ≤920px: 2 columns; ≤640px: still 2 columns with `minmax(0, 1fr)` and `overflow-wrap: anywhere`.

**Priority:** supporting.

---

## 10. Writing block — `<div class="thinking-wrap">`

**Semantic element:** one `<a class="thinking-feature">` as a whole-card link, plus a `<div class="thinking-list">` of separate anchors. Note the class prefix is `thinking-`, while the section id is `writing` — a naming mismatch to normalise in a rebuild.

**DOM skeleton**
```
div.thinking-wrap.reveal
├─ a.thinking-feature[href]
│  ├─ span.t-eyebrow        "Flagship · Evaluation · Updated …"
│  ├─ h3
│  ├─ p
│  └─ span.t-read           "Read the essay →"
└─ div.thinking-list
   ├─ a.thinking-link[href] ×3
   │  ├─ span.tl-meta       "AI / ML · 2026-09-04"
   │  └─ text node          title
   └─ a.thinking-more[href] "More on the blog →"
```

**Content slots:** 1 flagship card (eyebrow with up to 3 metadata tokens, title, 1–2 sentence summary, read cue), 3 link rows (category · date + title), 1 "more" link. Total 5 outbound links.

**Visual role:** shows thinking and voice, not just output. The 1.4fr/1fr split gives one essay editorial weight and treats the rest as an index, which avoids a grid of six identical blog cards.

**Interactive states:**
- Feature hover: border to accent, background to `--surface-2`, lift 3px; `.t-read` gap widens from 0.4rem to 0.6rem (arrow moves).
- Link row hover: text to accent, `padding-left` increases 0.3rem (a slide cue).
- More link: accent, no underline.
- No focus-specific styling beyond the global 2px accent outline.

**Dependencies:** none in JS. Entirely external links in the reference (separate blog subdomain). `.reveal` observer only.

**Order / spacing:** `#writing` body. Two-column grid `1.4fr 1fr` with `clamp(1.2rem, 3vw, 2rem)` gap; feature padding `clamp(1.6rem, 3vw, 2.2rem)`; list rows `padding: 1rem 0` with hairline top borders, first row borderless. ≤820px: single column.

**Priority:** supporting — and **content-conditional**.

---

## 11. About grid — `<div class="about-grid">`

**Semantic element:** `<div class="about-prose">` (three paragraphs) plus `<aside class="about-facts">` for the fact panel.

**DOM skeleton**
```
div.about-grid.reveal
├─ div.about-prose
│  └─ p ×3                  [each may contain a.link-accent]
└─ aside.about-facts
   └─ div.about-fact ×3
      ├─ span.label
      └─ span.value         [may contain several <a>]
```

**Content slots:** 3 prose paragraphs (paragraph 1 ~40 words, paragraph 2 ~85, paragraph 3 ~45 in the reference); 3 fact rows. Reference labels: Working on, Languages, Elsewhere. The Elsewhere value holds 4 links separated by `·`. Prose contains 3 inline links.

**Visual role:** the human paragraph after the evidence. The bordered aside acts as a spec sheet, giving the eye a short, scannable alternative to prose without repeating the hero meta.

**Interactive states:** inline link hover (global underline/animation); aside links turn accent. The panel itself is static.

**Dependencies:** none. `.reveal` only. Global `main p a` underline treatment is inherited.

**Order / spacing:** `#about` body. Grid `1.6fr 1fr`, gap `clamp(1.5rem, 4vw, 3rem)`, `align-items: start`. Prose 1rem/1.7, paragraphs separated by 1rem. Facts panel: 1.5rem padding, border, 20px radius, 1.1rem row gap. ≤920px: single column.

**Priority:** essential.

---

## 12. Contact band — `<section class="section" id="contact">` with `.contact`

**Semantic element:** `<section>` containing one `<div class="contact">` panel. Unlike other sections it does not use `.section-head` or `.section-num`.

**DOM skeleton**
```
section.section#contact
└─ div.container
   └─ div.contact.reveal
      ├─ span.section-eyebrow "Get in touch"
      ├─ h2
      ├─ p
      ├─ div.contact-row
      │  ├─ a.btn.btn-gradient[href="mailto:…?subject=Hello"]
      │  │  "Email me" + svg envelope
      │  ├─ a.btn.btn-ghost[href="…"] "Connect on LinkedIn"
      │  └─ a.btn.btn-ghost[href="assets/resume.pdf"] "Résumé"
      └─ div.contact-meta
         └─ span ×3 (emoji span[aria-hidden] + text)
```

**Content slots:** 1 eyebrow, 1 h2 ("Say hello."), 1 paragraph, 3 buttons (1 primary with icon, 2 ghost), 3 meta chips (location, timezone/availability, languages).

**Visual role:** the page's closing conversion surface. A centred, multi-radial gradient panel with a gradient border makes it visibly different from every other section and gives the page a natural end-stop. The three meta chips answer logistics without another list.

**Interactive states:** button hover states as in the hero (lift/glow for gradient, surface shift for ghost). Meta chips are static. The email button pre-fills the subject.

**Dependencies:** only CSS. Gradient uses three radial layers plus a base linear gradient; the border uses the same masked-pseudo technique as the feature card. `.reveal`.

**Order / spacing:** last section before the footer; `padding: clamp(3rem, 6vh, 5rem) var(--gutter)` inside the panel; `contact-row` is inline-flex, centred, 0.7rem gap; `contact-meta` is 1.6rem below, mono 0.78rem, 1.6rem gaps. ≤640px: button row becomes a column.

**Priority:** essential.

---

## 13. Footer — `<footer class="footer">`

**Semantic element:** `<footer>`; two child `<div>`s, one for the copyright, one for links. Not a `<nav>`, though it functions as one.

**DOM skeleton**
```
footer.footer
├─ div
│  "© " span#year " Bhavesh Jain · Hand-built"
└─ div.footer-links
   ├─ a[href="de/"] "Deutsch"
   ├─ a[href="assets/resume.pdf"] "Résumé"
   ├─ a[href="mailto:…"] "Email"
   ├─ a[href="…linkedin…"] "LinkedIn"
   ├─ a[href="…github…"] "GitHub"
   └─ a[href="https://travel…"] "Travel"
```

**Content slots:** 1 copyright line with a JS-filled year span and a one-word craft note; 6 links.

**Visual role:** quiet close. It repeats the contact channels in compact form and carries the language switch as a low-priority duplicate of the DE toggle.

**Interactive states:** link hover brightens from faint to full text. No other states.

**Dependencies:** `script.js` year stamp loops `#year` and writes the current year. The fixed `#to-top` button hides itself when the footer enters the viewport; on ≤640px the footer gets 4.5rem bottom padding as a second guarantee of clearance.

**Order / spacing:** `margin-top: var(--section-y)`, 1px top border, `2.5rem var(--gutter) 2rem` padding, space-between with wrap. ≤640px: column, left-aligned, 4.5rem bottom padding.

**Priority:** supporting.

---

## 14. Scroll-to-top button — `#to-top` (JS-injected)

**Semantic element:** `<button type="button" aria-label="Scroll to top" title="Scroll to top">` created at runtime and appended to `<body>`. It has no HTML source in `index.html`.

**DOM skeleton**
```
body
└─ button#to-top
   └─ svg[aria-hidden="true"] (chevron-up)
```

**Content slots:** 1 accessible label, 1 title, 1 icon.

**Visual role:** recovery affordance on a long page. It is fixed bottom-right, appears after 600px of scroll, and hides as soon as the footer is within 8px of the viewport bottom so it never covers footer links.

**Interactive states:**
- Hidden by default; `.is-visible` toggled on scroll.
- Click: `window.scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'})`.
- Hover/focus styling comes from the shared button rules (accent outline on focus-visible).

**Dependencies:** `script.js` motion-v4 IIFE; `.footer` / `.footer-compact` lookup; `prefers-reduced-motion` check. If JS fails, the button simply does not exist — acceptable progressive enhancement.

**Order / spacing:** fixed overlay, no flow impact. Not part of the author's markup, so it should be considered an optional add-on rather than a page component.

**Priority:** supporting (optional).

---

## 15. Decorative layer (non-component effects)

These are visual behaviours, not content components, but they carry much of the reference's character and must be budgeted deliberately.

| Effect | Implementation | Scope | Reduced-motion behaviour |
|---|---|---|---|
| Ambient gradient orbs | `body::before` fixed, three radial gradients, `orb-drift 22s` | whole page | animation none |
| Faint grid | `body::after` fixed, 56px lines at 0.012 alpha | whole page | static (no animation) |
| Page-load fade | `body` `page-fade 0.42s` | first paint | skipped |
| Gradient text | `.swap-wrap`, `.record-num` `gradient-shift` 6s/8s | hero + stats | animation none |
| Card cursor glow | radial `::before` driven by `--mx`/`--my` | bento, record | listener not attached |
| Tag pulse | one-shot halo on `.b-tag` | bento cards | animation none |
| Portrait tilt | 1.2° rest, 0° + 1.015 scale on hover | hero | transition remains but no motion loop |
| Reveal | opacity/translate on `.is-in` via IO | 17 elements | all marked `.is-in` immediately |
| Scroll progress | width % | global | no transition |

**Priority:** decorative.

---

## Component → purpose → reuse difficulty

Difficulty assumes a rebuild for a different owner using the same design language, not a straight file copy.

| # | Component | Purpose | Reuse difficulty | Why |
|---|---|---|---|---|
| 1 | Skip link | keyboard entry | Low | 15 lines of CSS |
| 2 | Scroll progress | reading-position cue | Low | 20-line IIFE; can drop |
| 3 | Header / nav shell | global identity + wayfinding | Medium | sticky blur, scrolled state, active-section logic |
| 3.1 | Logo mark + wordmark | identity | Low | one letter + gradient tile |
| 3.2 | Nav links + CTA pill | section access + conversion | Low | 5 anchors; update ids |
| 3.3 | DE toggle | language switch | Low markup / **conditional** | needs a real second edition |
| 3.4 | Theme toggle | light/dark | Medium | needs full token set + pre-paint boot script |
| 3.5 | Hamburger + dropdown | mobile nav | Medium | focus management, Escape, outside click, `nav-ready` |
| 4 | Hero text block | positioning statement | Low | content-heavy, structurally simple |
| 4.1 | h1 with word-swap span | signature line | Low | swap behaviour must be written; reference only animates gradient |
| 4.2 | Lead with inline link | credibility paragraph | Low | plain prose |
| 4.3 | CTA row | two intents | Low | button classes exist |
| 4.4 | 4-item meta grid | recruiter facts | Low | 4 label/value pairs |
| 4.5 | Portrait block + pulse tag | human anchor | Low | needs a photo + 2 formats |
| 5 | Tech-strip marquee | stack breadth | Medium | duplication JS, mask, pause-on-focus, reduced motion |
| 6 | Section head | structural rhythm | Low | repeated 5×, pure CSS |
| 7 | Bento grid | evidence of work | **High** | 6-col asymmetric layout with 3 breakpoints; content must justify 4 cards |
| 7.1 | Feature card + stats | flagship product | Medium | fixed 3-stat block; needs real metrics |
| 7.2 | Tall card + SVG | secondary project | Medium | custom SVG is owner-specific and decorative |
| 7.3 | Third-width cards | thesis / publications | Low | simple, but content-specific |
| 8 | Publications list | academic proof | Low structurally / **conditional** | only if owner has papers |
| 9 | Record stat grid | quantified proof | Medium | count-up + data attributes + no-JS fallback |
| 10 | Writing block | voice / thinking | Medium / **conditional** | needs 1 flagship + 3 posts + a blog home |
| 11 | About grid | human context | Low | prose + 3 facts |
| 12 | Contact band | conversion | Low | self-contained gradient panel |
| 13 | Footer | close + links | Low | update link set |
| 14 | Scroll-to-top | recovery | Low | optional injection |
| 15 | Decorative layer | character | Low each / Medium collectively | motion budget and reduced-motion discipline |

---

## Components that only make sense with matching owner content

These must be dropped, replaced, or reframed when the owner lacks the underlying material.

1. **Publications list (§8)** — requires peer-reviewed papers with title, authors, venue, year, and a resolvable DOI. Without them the section has no honest content; the reference's own nav link and two cross-references (hero meta "4 peer-reviewed papers" and a bento card) also break and must be replaced together. Nidhi's CV has certifications and education, not publications — a "Certifications & credentials" list using the same year-rail pattern is the natural substitution, but it is a different component semantically.
2. **Writing block (§10)** — requires a blog with at least one flagship essay and three dated posts, plus a stable blog home URL. Without a blog the section becomes either a dead "Writing" page (explicitly forbidden by the master prompt) or should be replaced by something the owner actually produces.
3. **Bilingual / DE toggle (§3.3, footer "Deutsch", `<html lang>` alternates)** — requires a complete second-language edition at a real URL, with translated metadata, a language-aware theme toggle label, and hreflang tags. A toggle pointing at a stub is worse than no toggle. Nidhi is based in Germany and lists German as intermediate, but that is not a translated site.
4. **Travel-site footer link** — requires an actual travel subdomain. Pure noise otherwise.
5. **"Currently" hero meta with two live product links** — requires public, working URLs. If the owner's projects have no links (Nidhi's project records currently have an empty `links` object), the slot must become a non-link status line or be replaced by another fact.
6. **Bento "Publications" card and "M.Sc. thesis" card** — the first assumes a publications section to link to; the second assumes a thesis with a quantified outcome. Both are content-specific, not layout-specific.
7. **Record stats naming papers/agents** — "4 peer-reviewed papers" and "7 agents in the Vorschau pipeline" are claims about the reference owner's work. The component survives, but every label, sub-line, target, and suffix must be re-derived from the new owner's CV; numbers cannot be carried over.
8. **Portrait asset** — requires a real photo, ideally pre-cropped to 827×1063 with a WebP alternate. Without one, the hero's second column needs a different object (a diagram, a typographic block, or nothing).
9. **Tech-strip contents** — the component is reusable, but the 12 items are the reference owner's stack (Postgres, pgvector, Weights & Biases, Anthropic/OpenAI APIs). They must be replaced, not copied, or the strip becomes a false claim.
10. **JSON-LD `Person` / `ScholarlyArticle` graph and `sameAs` links** — not visible, but carries the same conditional content and must be regenerated for the new owner, including email, employer, and canonical domain.

---

## Rebuild notes that fall out of the inventory

- The page's design signature is not the gradient (replaceable); it is the **section grammar**: mono number + hairline + uppercase label, a capped editorial h2, hairline-separated rows in Publications, and asymmetric bento sizing. Those patterns transfer to a different palette without loss.
- Two JS contracts are load-bearing and easy to miss: `#record` must exist for count-up, and `.record-num` must contain its final value in HTML for the no-JS path. Likewise `#year` must exist for the footer stamp.
- The mobile menu is progressive-enhancement-safe only because `.nav-ready` is added by JS; the `html:not(.nav-ready)` fallback wraps links below the header. Preserve both paths or mobile no-JS breaks.
- The reference uses `tabindex="0"` on the tech strip without a role; a rebuild should either add an explicit pause control or accept the tab stop knowingly.
- `.theme-toggle` is hidden until `.has-js` is set, and the theme is applied pre-paint by a separate blocking script. Copying the toggle without the boot script produces a flash of the wrong theme.
- Class naming is inconsistent in the reference (`thinking-*` inside `#writing`, `b-*` abbreviations, `nav-ready` on `<html>`). Normalise in a rebuild rather than propagating it.
