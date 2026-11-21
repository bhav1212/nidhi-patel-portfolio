# Wireframe annotations — Nidhi Patel portfolio

Gate 2 deliverable. Companion to [`index.html`](./index.html).

- **Direction:** C as structural base + A's typographic discipline + B's metadata handling (`MASTER_PROMPT.md` §5.3).
- **Scope note (2026-11-21):** `index.html` currently renders Direction C only. §5.4 also requires Directions A and B, `direction-a/b/c.md`, six direction screenshots, `reference-log.md` and `motion-storyboard.md`; those are still outstanding and are recorded as a blocker in `docs/reference/wireframe-verification.md`.
- **Authority:** `docs/plan.md` (approved Gate 1) and `data/nidhi-patel.json` (only fact source). Copy is lifted from `docs/reference/content-map.md` where it exists.
- **Status:** awaiting explicit Gate 2 approval. Nothing here is built, and nothing is deployed.
- **Frames:** desktop 1440 × 900, mobile 390 × 844, case-study template 1440 × 900. Each is a separate container with its own chrome; the fold line is drawn on each.
- **Toggles in `index.html`:** Both / Desktop 1440 / Mobile 390; annotations on/off. With annotations off, the desktop frame is the true 1440 composition: 1200px container, 120px margins.

## 1. Conventions used in the artefacts

| Convention | Meaning |
| --- | --- |
| Greyscale | Paper `#fff`, surface `#f4f4f4`, ink `#111`, muted `#555`, rules `#c8c8c8`. The plan's accent is rendered as solid ink so structure can be judged without colour; no brand hex appears in this artefact. |
| Type | Fraunces → `ui-serif` / Georgia; Geist → `system-ui`; JetBrains Mono → `ui-monospace`. No font file is requested, bundled or preloaded. |
| ① | Rotating-word slot. Plan §2 drops the rotator; the wireframe shows phrase 1 only, boxed and labelled. |
| `[TODO: …]` | A slot with no source-of-truth value. Never rendered as lorem ipsum, never silently filled. |
| Badge | Four states: **Public** solid border, **Method only** dashed, **On request** dotted, **Private** double. Each also carries a glyph and its own text, so colour is never the only signal. |
| Margin note | 200px rail on desktop frames. Not part of the design. At 390 the notes become inline chips above each section. |
| Focus ring | 3px ink, 2px offset — a stand-in for the build's 2px paper inner ring + 2px accent outer ring. Drawn statically on: desktop "Work" nav link, hero "View selected work", ledger row 1, mobile menu button. |
| Link destinations | Listed in each margin note. Links are inert in `index.html` (a tiny inline handler prevents navigation) to avoid dead `file://` jumps. |

## 2. Desktop home — section by section

| # | Component | Priority | Derives from | Purpose | Words |
| --- | --- | --- | --- | --- | --- |
| — | `SiteHeader` | P0 | `.nav`, `.nav-links`, `.nav-tools`, `.nav-toggle`, `.nav-cta` | Orientation + the two global affordances (theme, CV) | 13 |
| — | `TechStrip` | P1 | `.tech-strip` (marquee removed) | Six-tool stack signal immediately under the nav | 9 |
| — | `Hero` + `HeroMeta` + portrait slot | P0 | `.hero`, `.hero-grid`, `.hero-lead`, `.hero-cta-row`, `.hero-meta`, `.portrait-tag` | Name, role, value line, four meta cells, primary route in one screen | 108 |
| 01 | `ProjectLedger` + `LedgerRow` + `Badge` | P0 | `.bento-card` anatomy + `.pubs li` row rhythm | The evidence ledger: three systems and the decision each encodes | 170 |
| 02 | `ExperienceTimeline` + `ExperienceRow` | P1 (added) | `.about-grid` aside rhythm + `.pubs` rows; facts row adapts `.record` | Four employers, exact titles, what was done | 240 timeline (+26 facts) |
| 03 | `CredentialRail` | P0 | `.pubs` year rail, adapted | Two degrees and three verifiable Databricks credentials | 114 |
| 04 | `CapabilityGrid` + `CapabilityCluster` | P1 | occupies the dropped `.thinking-wrap` slot | The CV's skill grouping, each cluster linked to its evidence | 191 |
| 05 | `AboutBlock` | P0 | `.about-grid`, recomposed (prose-left/facts-aside removed) | Human context after the proof | 132 |
| 06 | `ContactBand` | P0 | `.contact`, radial plane flattened to a bordered surface | The single conversion point | 67 |
| — | `SiteFooter` | P0 | `.footer`, `.footer-links` | Navigation echo, legal line, build-time year | 38 |

### SiteHeader — P0

- **Purpose:** identity, four anchors, theme control, language placeholder, CV. 64px tall, sticky.
- **Order:** wordmark → Work · Experience · About · Contact → EN chip → theme → Download CV.
- **Links:** `#work`, `#experience`, `#about`, `#contact`, `/Nidhi_Patel_CV.pdf`.
- **Language:** marked deferred. No `/de/` tree, no `hreflang`, no switcher, `aria-disabled="true"`, visually labelled "deferred". It is present so the composition is truthful, not because a translation exists.
- **Theme:** a three-state button (system → light → dark) with the current state in its accessible name. No toggle switch, no icon-only control, no flash-of-wrong-theme script in this file.
- **Responsive:** at 390 the four anchors collapse into the 44 × 44 menu button; theme becomes an icon button; the EN chip shrinks to a two-letter dashed chip; Download CV moves into the hero as a full-width button.

### TechStrip — P1

- **Purpose:** a fast stack read without a logo wall or a scrolling marquee.
- **Content:** Python, SQL, Azure Databricks, LangChain, PyTorch, Tableau — six items, plan Appendix, no additions.
- **Reference change:** the reference's infinite `.tech-strip-track` is deliberately not reproduced. It is a static list, no animation, no duplicate DOM for looping, no `aria-hidden` duplicates.
- **Responsive:** wraps to two lines at 390, label above; never scrolls horizontally.

### Hero — P0

- **Purpose:** in one screen — who, what role, what proof, what to do next.
- **H1:** two-step display inside one `h1` — the name at 64px on its own line, then the statement "Data Scientist & AI Engineer building [RAG systems] that hold up outside a notebook." at 38px. The 38px second step is what keeps the hero at 67vh without shrinking the 64px name below the plan's display size. One `h1` on the page; it is the LCP element and is never animated, split by word, or revealed on scroll.
- **① Rotating slot:** the reference type-swaps a phrase in the headline. Plan §2 drops the rotator from the home page, so this wireframe shows phrase 1 of 4 (RAG systems · LLM agents · anomaly models · Databricks pipelines) as a static, boxed slot with a note. Build ships the static sentence; the `sup` marker and the note both disappear.
- **Lead (36 words):** draft copy, unchanged from the content map: "I'm a data scientist with 4+ years across working-student, internship and full-time roles in Germany. I build retrieval-augmented LLM systems, explainable models and Databricks pipelines — and the public repositories and thesis report are linked below." The final sentence is the link promise that the ledger below keeps.
- **CTAs:** "View selected work" (primary → `#work`) and "Download CV" (`/Nidhi_Patel_CV.pdf`). Two only. No "Book a call", no Calendly.
- **Social row:** LinkedIn (`https://www.linkedin.com/in/nidhi-patel18`), GitHub (`https://github.com/patelnidhi1898`), Email (`mailto:nidhipatel18398@gmail.com`, subject pre-filled). 44px targets, underlined, never icon-only.
- **Meta grid (25 words):** Based in / Relocation / Focus / Languages — "Frankfurt am Main", "Open to relocation", "LLM/RAG systems · explainable ML · Azure Databricks", "English business fluent · German intermediate". No "Currently" row (plan Appendix A, S4). City-level location only; no street, no postcode.
- **EvidencePanel — removed at Gate 2.** The four-row panel (Current role, Credentials, Public work, Degree) duplicated `#credentials` and `#work` and, at 450px tall, pushed the ledger below the 900px fold. The four quick facts now sit in the meta row; the evidence they pointed at lives in its own section. The decision is reversible: restoring the panel costs the fold.
- **Portrait:** a labelled dashed 120 × 144 placeholder in the hero's second column, with a one-line caption. Plan §11.8 defaults to no photograph; if none arrives the column collapses and the lead takes the full measure. It is never a stock face and never the LCP.
- **Responsive:** single column at 390. H1 drops to 31/1.08 (name and statement still separate lines), the two CTAs become full-width stacked buttons, the social row becomes one mono line, the meta grid becomes a four-row definition list, and the portrait slot closes the section as a 96 × 115 box with its caption beside it. Name, role, value line, primary CTA and all four meta rows start above the 844 fold.

### 01 Selected work — P0

- **Purpose:** replace the bento grid with an evidence ledger. Every row states the decision the work encodes, not just a title.
- **Dek (25 words):** "Three systems, each with a decision behind it. One is a public repository, one is a public report, and one is method-only until the repository is shareable." It tells the reader how to read the badges before they meet one.
- **Order:** AI Financial Analyst Agent (public repo) → Master's thesis (public report + repo) → MedBot (method only). Ordered by public verifiability, then recency. No card size encodes importance.
- **Columns at 1440:** Period 2 / System 3 / Decision 4 / Evidence 2 / Route 1. At 1024: 2 / 3 / 3 / 3 / 1. At 768 each row becomes two lines. At 390 each row becomes a definition list.
- **Row links:** the whole row is the link (one tab stop per row), with an accessible name that carries system + decision, e.g. "AI Financial Analyst Agent case study — an LLM agent that turns questions into structured investment analyses". No nested links inside a row.
- **Destinations:** `/work/ai-financial-analyst/`, `/work/cash-access-germany/`, `/work/medbot/`.
- **Badges:** row 1 Public, row 2 Public, row 3 Method only. Public = repository or report a reader can open today.
- **Banned here:** hover-only summaries, "read more" buttons, card images, tags as chips, logo marks, percentages.
- **Responsive:** at 390 the five cells become a `dl`: Period, System, Decision it encodes, Evidence, Route; Route is the underlined full-width link at the bottom of the row. Nothing is hidden behind a tap.

### 02 Experience — P1, added

- **Purpose:** the section the reference site does not have and this CV cannot omit. Written as four rows, not a card grid.
- **Facts row (26 words):** 4+ years across role types · 4 employers in Germany · 3 public artefacts. Static values in the DOM; no count-up, no animated numbers. This row replaces the deleted proof strip and is annotated as `TrackRecord`, adapted from `.record`.
- **Timeline (240 words):** Miles & More (09/2026 – Present) → Barkow Consulting (02/2024 – 06/2026, "working student, then full-time from 01/2026") → Vonovia (02/2023 – 01/2024) → Amprion (04/2022 – 09/2022). Exact job titles, exactly as in the JSON — never shortened for fit.
- **Date rail:** fixed 5.5rem until 768, then the date moves above the title.
- **Badges:** Private for employer work, On request for Barkow. Rationale: employer work is not publicly citable; Barkow's detail is available on request. Nothing here implies a public artefact exists.
- **Absolute dates:** `<time datetime>` on every date; "Present" is the only relative term.
- **Responsive:** bullets compress to their first clause at 390 (the same facts, not new claims); the facts row stays three across, at smaller type.

### 03 Credentials — P0

- **Purpose:** the reference's publication list, retyped for degrees and certifications. A year rail on the left, entry on the right.
- **Content:** M.Sc. Data Science, TU Dortmund (10/2020 – 12/2026 expected; "Coursework complete; degree award pending final credit registration") · B.E. Computer Engineering, GTU Ahmedabad (07/2015 – 05/2019) · three Databricks certifications, newest first (07/2026, 07/2026, 05/2026).
- **Credential IDs as text:** 189213182 · none issued · 183902279. The middle certificate says "No credential ID issued"; it never shows a blank or a fabricated number.
- **Verify links:** three external `credentials.databricks.com` URLs, opened in a new tab with `rel="noopener"` at build and an off-screen "(opens in a new tab)".
- **Badges:** none. A credential is either verifiable or it is not listed.
- **No grades, no GPA, no class rank** — none are in the JSON.
- **Responsive:** date stacks above the title at ≤640; only the surname-bearing long title wraps.

### 04 Capabilities — P1

- **Purpose:** fill the hole left by dropping the writing section. Six clusters in a 2 × 3 grid: modelling and analytics · generative AI and LLM engineering · cloud and data engineering · MLOps and delivery · programming and databases · languages.
- **Per cluster:** up to five named items visible (plan's cap), then an inline "Also used" tail. No accordions, no tabs, no progress bars, no percentage bars, no logo wall.
- **Languages** is the sixth cluster as a four-row definition list: English Business Fluent, German Intermediate, Gujarati Native, Hindi Native. It is not a separate section, and it is not repeated in About.
- **Evidence link per cluster:** thesis case study · MedBot / AI Financial Analyst · Miles & More + Barkow + credentials · MedBot · experience · none (languages).
- **`[TODO: owner to confirm cluster merge]`:** the CV has six skill categories plus languages, which is seven clusters. To hold the 2 × 3 grid and keep Languages, "BI & Visualisation" is folded into the modelling cluster as a tail. The alternative is a 2 × 4 grid with Languages in the fourth row; that is the owner's call at approval.
- **Responsive:** single column at 390, cluster dividers become rules, evidence link stays visible (never behind a tap).

### 05 About — P0

- **Purpose:** the human paragraph after the proof. Recomposed: no portrait, no second facts panel, no repeated language list, no prose-left / facts-aside split.
- **Composition:** one 74-word paragraph → a three-row "How I work" definition list (Modelling / Delivery / Evidence) → one sentence on working in English and German.
- **Copy source:** draft in the content map, fact-checked against the JSON (M.Sc. dates, employers, cities, domains). The paragraph deliberately ends on the current role, so About and Experience agree.
- **65ch measure** on the paragraph; no pull quote, no signature graphic.
- **Responsive:** same order at 390, 14px paragraph; "How I work" rows stack label above text.

### 06 Contact — P0

- **Purpose:** the only conversion point. No form, no calendar embed, no phone number.
- **H2:** "Let's talk about the role." Eyebrow: "Get in touch".
- **Body (36 words):** "I'm looking for Data Scientist, Machine Learning Engineer, AI Engineer or Data Analyst positions, and I'm open to relocation. Tell me the problem the team is trying to solve and I'll point you at the closest thing I've built."
- **Buttons:** Email me (primary, `mailto:nidhipatel18398@gmail.com` with a subject) · Connect on LinkedIn · Download CV.
- **Chips:** Frankfurt am Main · open to relocation / Available from `[TODO: availability date]`. Languages live in the hero meta and the Capabilities cluster, never as a Contact chip (plan Appendix A, S5).
- **Privacy:** the phone number exists in the JSON with `phonePublic: false` and is **not** published anywhere in this artefact. No visa or notice-period claim is made; the availability chip is the only place a date may appear, and it is a TODO until the owner supplies one.
- **Responsive:** buttons stack full-width; chips wrap to two lines; band padding drops from 38 to 20px.

### Footer — P0

- **Purpose:** navigation echo, contact echo, legal line. Not a section, no heading level above `h2` inside `footer`.
- **Content:** Nidhi Patel / Frankfurt am Main, Germany · Site (Work, Experience, About, Contact) · Elsewhere (Email, LinkedIn, GitHub, CV) · Legal (Datenschutz) · © 2026 Nidhi Patel + "Built in Frankfurt am Main · English only".
- **Year:** written into the build output, not injected by `#year` JavaScript.
- **Responsive:** four columns → one column of three groups; legal line wraps.

## 3. Mobile reflow rules (390)

The mobile frame is a separately composed page, not a scaled desktop. Same facts and same copy, different structure.

| Element | Desktop | 390 |
| --- | --- | --- |
| Nav | 4 inline anchors + theme + EN + CV | Wordmark + theme icon + dashed EN chip + 44px menu button (`aria-expanded`, `aria-controls`) |
| Hero | 2 steps: 64px name / 38px statement; lead + portrait column | 1 column, 31px H1, full-width stacked CTAs, meta as a 4-row `dl`, portrait slot last |
| Ledger | 5-column row | `dl` per row; period → system → decision → evidence → route; route is the full-width link |
| Experience | 5.5rem date rail | Date above title; facts row stays 3-up at smaller type; bullets compressed to first clause |
| Credentials | 5.5rem date rail | Date above title; verify link on its own line |
| Capabilities | 3 × 2 grid | Single column with rules; evidence link visible |
| About | Prose + how-list | Same order, 14px prose |
| Contact | Bordered band, 3 inline buttons, 2 chips | Bordered band, 3 stacked full-width buttons, 2 chips wrapped |
| Footer | 4 columns | 3 groups stacked + legal line |
| Annotations | 200px rail | Inline chip above each section (toggleable) |

Global mobile rules: 20px gutters; the design page is fluid at 360 CSS px with no horizontal scroll (verified headless: `.m-page` scrollWidth = clientWidth = 360); nothing below 24 × 24; nav and menu 44 × 44; the fold at 844 crosses the meta row, i.e. after the hero CTAs and inside the four meta rows. The 390px frame canvas is fixed document chrome, not design content.

## 4. Case-study template — MedBot (method-only variant)

- **Shell:** skip link → header (Work is `aria-current="page"`) → breadcrumb → mono meta row → H1 → standfirst → at-a-glance `dl` → 800px article + 220px TOC rail → sources → prev/next → "Back to selected work" → compact footer.
- **H1:** "MedBot: a document assistant that deploys itself." Standfirst: "A retrieval-augmented question-answering service where the pipeline that ships it is as much of the project as the model."
- **At a glance:** Role "Personal project" · Timeline `[TODO: project timeline]` · Stack LangChain, FAISS, Flask, Docker, Jenkins, Trivy · Artefacts `[TODO: repository URL]` · Publication state **Method only**. Team is omitted because the JSON states none (plan Appendix A, S5).
- **Sections and budgets:** 1 The problem 110–140 · 2 What it does 80–110 · 3 How it works 220–300 · 4 The delivery pipeline 120–160 · 5 What changed 100–140 · 6 What I would do next 60–90 · Limitations (no number) · 7 Stack and links 40. Target 700–900 words. Each section currently carries one CV-backed seed sentence plus a `[TODO: body copy — n words]` marker; the seed words total 151.
- **Figure:** 16:9 dashed slot between §3 and §4, captioned as a conceptual redraw, not a screenshot. Hand-authored inline SVG at build; HTML labels so text scales and themes.
- **Limitations block:** bordered, before Sources. "No benchmark result is published. Usage numbers do not exist. This is a runnable service with an automated build and scan pipeline, not a production system serving users." This is the honesty device that makes the rest of the page credible.
- **TOC:** only renders when the page exceeds 1,500 words (plan). Shown here to demonstrate the layout; at 700–900 it would be omitted. No scroll-spy; static anchors.
- **Prev/next:** "Next project — An LLM analyst that shows its sources →" and "Previous — ← Where cash access thins". Both are the full card, 44px minimum.
- **Variant switch:** Public swaps the badge, fills artefacts with the GitHub URL and adds a repository link in §7. The shell does not change; only the badge, the artefacts cell and one sentence.
- **Responsive (not drawn):** at 390 the TOC is omitted, the at-a-glance grid becomes one column, the figure keeps 16:9 but loses the caption's second sentence, prev/next stack.

## 5. Confidentiality badges

| State | Border | Glyph | Use in this wireframe | Meaning |
| --- | --- | --- | --- | --- |
| Public | 2px solid | ● | Ledger rows 1 and 2 | A reader can open the repository or the report today |
| Method only | dashed | ◐ | Ledger row 3, case-study meta + at-a-glance | The approach is describable; the artefact is not public |
| On request | dotted, 2px | ○ | Barkow Consulting row | Detail is shareable privately, not published |
| Private | double, 3px | ▣ | Miles & More, Vonovia, Amprion, current role in Experience | Employer work; nothing is citable publicly |

Rules: never colour alone; never a tooltip or `title` attribute as the only explanation; the badge text is real text in the DOM; badges are not interactive and are not links.

## 6. Word-count ledger (measured from `index.html`)

| Section | Budget (plan §4) | Measured | Verdict |
| --- | --- | --- | --- |
| Hero prose (eyebrow + H1 + lead + meta + controls) | 85–110 | 108 | inside |
| 01 Selected work | 170–210 | 170 | inside (floor; the dek was cut to one line for the fold) |
| 02 Experience — timeline | 220–260 | 240 | inside |
| 02 Experience — facts row | not budgeted | 26 | separate component (TrackRecord) |
| 03 Credentials | 90–120 | 114 | inside |
| 04 Capabilities | 150–190 | 191 | **+1 over** |
| 05 About | 100–130 | 132 | **+2 over** |
| 06 Contact | 50–70 | 67 | inside (after removing the language chip) |
| Footer | 30–40 | 38 | inside |
| Case study (seeds only) | 700–900 target | 151 seeds + 6 placeholders | awaits body copy |

Two overages, both deliberate and both fixable without changing structure:

- **Capabilities +1.** 191 against a 150–190 band. The six "Also used" tails carry ~70 words of the section; dropping two items from any one tail lands it inside. No structural change needed.
- **About +2.** 132 against 100–130, after trimming the repeated degree clause and "day to day" in this revision. One more clause (e.g. the Ahmedabad origin, 9 words) closes it if the owner prefers a hard ceiling.

The mobile frame measures ~1,100 words because it repeats the page; it is not a separate copy budget.

## 7. Motion storyboard (text only — no animation exists in `index.html`)

One signature moment. Everything else is a state change, and reduced motion means the motion is absent, not faster.

| ID | Element | Trigger | Change | Duration / easing | Reduced motion | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| M1 | Ledger rows | First time the ledger enters the viewport (IntersectionObserver, once) | Rows translate 8px up and settle, staggered 60ms, max 3 rows | 220ms, `cubic-bezier(.2,.6,.2,1)` | No transform, rows painted in final position | The only orchestrated moment. Gated behind `has-js`; CSS default is the final state. |
| M2 | Nav link underline | Hover / focus | Underline grows from 0 to 100% | 120ms linear | Instant underline | Focus underline is permanent, not animated. |
| M3 | Theme toggle | Activate | Icon morph + one 140ms crossfade of colour tokens | 140ms linear | Instant swap | No view-transition API. No flash of wrong theme. |
| M4 | Menu panel (mobile) | Menu button | Panel slides down 12px + fades in; scrim 0 → 40% | 160ms out, 120ms in | Panel appears/disappears instantly | Focus returns to the button on Escape; no focus trap. |
| M5 | Button press | `:active` | Translate 1px down | 80ms | No transform | Press feedback only. |
| M6 | Case-study TOC | Anchor click | Native scroll, no smooth-scroll override | — | Same | `scroll-behavior` left at default. |
| M7 | Case-study figure | In view | None | — | — | Figures never animate; diagrams are static SVG. |

Global rules: no `opacity: 0` in the CSS; no scroll-driven animations; no marquee, parallax, count-up, typewriter or cursor effects; `prefers-reduced-motion: reduce` removes M1, M2, M4 and M5 triggers entirely; the hero H1 and the portrait slot never animate; nothing above the fold moves on load.

## 8. Accessibility pass (summary)

- **Heading outline:** in the built page, one `h1` per page; `h2` per section; `h3` for project names, role titles, degrees, credentials and clusters. In this multi-frame wireframe document the single `h1` is the document title, page frames are `h2`, section titles `h3` and entry titles `h4`. No skipped levels in either. Section numerals are decorative and `aria-hidden`; the text carries the name. Full table in `index.html` §Accessibility annotation pass.
- **Landmarks:** skip link → banner (`header`) → primary `nav` → `main#main-content` → `footer`; case study adds one `article` and a labelled TOC `nav`.
- **Focus order:** skip link → wordmark → 4 anchors → (language, not focusable) → theme → CV → hero CTAs → 3 ledger rows → 3 verify links → 5 capability evidence links → 3 contact buttons → footer. Mobile adds the menu button before the hero.
- **Target sizes:** 48px buttons (44px floor), 44px nav and icon buttons, 44px ledger rows, 24px inline links, 44px skip link. Nothing interactive below 24 × 24.
- **Focus visibility:** 2px paper inner + 2px accent outer ring, offset 2px; ledger rows inset by 3px so the hairline cannot clip it; sticky header must not cover the ring (scroll-margin-top on anchors).
- **Contrast targets:** body 4.5:1, large text 3:1, UI borders and focus 3:1, badges checked at their 9.5–10px size (text plus border style, never colour alone).
- **Measure:** 65ch prose (About), 68ch article, 52ch hero lead. Line height 1.6 body / 1.02 display.
- **Zoom/reflow:** usable at 360 CSS px and 400% zoom with no horizontal scroll; ledger becomes a definition list before it can overflow. 360 is verified, 400% zoom is a Gate 3a test.
- **Not claimed:** no automated conformance run yet; axe + keyboard + one screen-reader pass happen at Gate 3a on the built pages.

## 9. Open TODO slots in `index.html`

Every one is visible in the artefact, never silently filled.

1. `[TODO: project dates — not recorded in the CV]` — ledger row 1, desktop and mobile.
2. `[TODO: thesis period — not recorded in the CV]` — ledger row 2, desktop and mobile.
3. `[TODO: project dates — not recorded in the CV]` — ledger row 3 (MedBot), desktop and mobile.
4. `[TODO: availability date]` — contact chip, desktop and mobile. Plan §11.2 default; no date is invented.
5. `[TODO: owner to confirm cluster merge]` — capabilities annotation; six skill categories + languages = seven clusters.
6. `[TODO: project timeline — not in the JSON]` — case-study at-a-glance.
7. `[TODO: repository URL]` — case-study at-a-glance artefacts, and `[TODO: repository URL — keep "Method only" until supplied]` in §7.
8. `[TODO: reading time]` — case-study meta row; computed at build.
9. `[TODO: hand-authored SVG]` — case-study figure slot.
10. `[TODO: body copy — n words]` ×6 — case-study sections 1–6, each with its plan budget (110–140, 80–110, 220–300, 120–160, 100–140, 60–90).

Non-TODO placeholders that are decisions, not missing data: the portrait slot ("none supplied"), the ① rotating-slot note (rotator dropped by plan §2), and the "no credential ID issued" line (a real fact).

## 10. Facts that must not be invented

- No metric, percentage, benchmark, latency, accuracy or user number appears anywhere. Where the source has none, the page says so (case-study Limitations).
- No employer, title, date, city or credential beyond `data/nidhi-patel.json`.
- Phone number never published (`phonePublic: false`).
- Location never more precise than the city.
- Availability has no date until the owner gives one.
- No "years of experience" figure other than "4+", which is the JSON's value.
- No German-language claim beyond "German — Intermediate".
- No team size or team composition is stated anywhere; the JSON contains none.

## 11. Validation performed on `index.html`

- Tag balance: parsed with Python's `html.parser`; zero unclosed elements, zero mismatched closes.
- External requests: zero `<link>`, zero `<script src>`, zero `<img>`, zero `@import`, zero CSS `url()`. The only absolute URLs are `href` values on outbound links (LinkedIn, GitHub, three Databricks verification pages), which are inert in this file.
- Standalone open: one inline script (inert links) and one inline `<style>`; no build step, no fonts, no images, no network.
- Rendered and screenshotted headless at 1440 and 390 to confirm the fold lines, the rail maths (200 + 20 + 1200 + 20 = 1440) and the mobile reflow.
- Greyscale check: every colour in the stylesheet is a grey or near-black; there are no chromatic hex, `rgb()`, `hsl()`, gradient or `url()` values.
- Fold check at 1440 × 900 (measured in the browser, frame coords include the 36px chrome): header 37–102, tech strip 102–152, hero 152–757 (606px, 67.3vh), meta row 647–719, ledger section starts 758, first ledger row top 919 — 18px above the 937px fold line. All four meta cells and the top of the first project card are above the fold.
- Annotation-rail check: the rail is 200px and its notes may not add height to a section. SiteHeader, TechStrip and Hero share one rail row because their combined notes (721px) would otherwise stretch three separate rows; the rail now ends level with the hero content (721px) instead of adding phantom space. Measured rail 721 vs content 721.

## 12. What Gate 2 is asking you to approve

1. Direction C's structure: ledger instead of bento, timeline added, credentials before capabilities, About recomposed.
2. The hero sentence and the ① slot decision (static phrase, rotator dropped).
3. The ledger's three rows, their order and their decision sentences.
4. The four-state badge system and the badge each row carries.
5. Capabilities as six clusters, including Languages, with the BI merge.
6. The two marginal word counts (Capabilities +1, About +2) and whether to trim. Contact is now inside its band.
7. The case-study shell and its section list, before any body copy is written.

Nothing moves to build until that approval is explicit.
