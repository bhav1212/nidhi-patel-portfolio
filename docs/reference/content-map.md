# Content map — Nidhi Patel portfolio, adapted from the reference site

**Purpose.** This document translates the reference portfolio (`github.com/bhav1212/mysite`) into a content and component decision for **Nidhi Patel**. It sits between the extraction documents (`css-system.md`, `components-home.md`, `behaviour.md`, `site-meta.md`, `secondary-pages.md`) and the wireframe deliverable required by `MASTER_PROMPT.md` §5.4. It is not the plan and not the wireframe; it is the bridge.

**Sources, in order of authority**

1. `data/nidhi-patel.json` — the only permitted source of facts about Nidhi.
2. `MASTER_PROMPT.md` §2 (source of truth), §5.2–5.6 (taxonomy, directions, reject list), §7 (content rules).
3. The five extraction documents — structural learning only.

**Rules applied**

- British English throughout (modelling, analysed, organisation, colour, behaviour, centre, licence, prioritise).
- No invented metrics, percentages, dates, employers, grades, team sizes, data volumes, or links. Where a claim cannot be sourced, it is marked `[confirm]` or replaced with a qualitative outcome.
- No phone number. No address below "Frankfurt am Main".
- No reuse of the reference owner's copy, photograph, CV, logo, palettes, or prose. Asset reuse: **none**. Structural reuse of his code is authorised by the owner; content reuse is not.
- Every drafted claim is traceable to a JSON path — see Appendix A.

---

## 0. The delta that drives every decision

The reference and Nidhi are not the same kind of candidate, and pretending otherwise is the main failure mode of this adaptation.

| Dimension | Reference owner | Nidhi Patel | Consequence |
|---|---|---|---|
| Current position | Data scientist at a research institute, team lead | **Data Analytics Intern**, Miles & More (Lufthansa Group), since 09/2026 | Do not present the internship as a senior scientist role; lead with the 4+ year span and the artefacts |
| Seniority signal | Publications, team lead, startup | 4+ years across working-student, internship and full-time roles | Seniority is carried by breadth of employers and shipping evidence, not by titles |
| Publications | Four with DOIs | **None** | Publications section drops entirely |
| Writing | A blog subdomain with a flagship essay and dated posts | **None** | Writing block drops; no Writing nav item |
| Languages of the site | English and German editions | English only; German is a *spoken* level, not a translated edition | No `/de/`, no hreflang, no language toggle |
| Projects with public links | Several | **Two of three** (MedBot has no link in the JSON) | MedBot gets a "Method only" badge until a URL is supplied |
| Quantitative project outcomes | Every work card carries a number | **None in the JSON** | Every case study leads with decisions and scope; results are qualitative and labelled "not measured" |
| Portrait | Supplied, 827×1063 | **None supplied** | Hero second column becomes an evidence panel |
| Certifications | Not shown | **Three Databricks credentials**, two Academy Accreditations, two with credential IDs | Credentials become a real section, not a footnote |
| Location | Heilbronn | Frankfurt am Main, open to relocation | Meta and contact copy change; relocation is stated once, plainly |
| Palette | Orange → pink → purple gradient | To be defined | See §F; the gradient is the reference owner's identity, not a pattern |

The single most consequential row is **"no quantitative project outcomes"**. The reference's work cards and stat grid depend on numbers. Nidhi's cannot. Any card that promises a percentage would be fabricated, so the work cards must earn their place through *what was built and what decision was made*, and the stat grid must use only counts that already exist in the CV.

**Integrity audit of "4+ years".** The JSON states `yearsExperience: "4+"`. Summing listed employment (Amprion 6 months + Vonovia 12 + Barkow 28 + Miles & More ~3, to 21 November 2026) gives **49 months ≈ 4 years 1 month**, excluding the five-month gap between Amprion and Vonovia. The claim therefore holds on months worked, not merely on calendar span. This method is recorded in Appendix A and should be repeated in `docs/content-guide.md` so the claim is never re-derived differently on the site.

---

## A. Component decision table

Verdicts: **KEEP** (port the behaviour, restyle to Nidhi's tokens), **ADAPT** (same job, different content or structure), **ADD** (required and absent from the reference), **DROP** (not ported). Priority follows `MASTER_PROMPT.md` §5.2: P0 must exist, P1 should, P2 only if content justifies it.

### A.1 Navigation and chrome

| Reference component | Verdict | What it becomes for Nidhi | Why | Priority |
|---|---|---|---|---|
| Skip link | **KEEP** | "Skip to content" → `#main`, 2px accent ring, 2px offset, instant appearance | Cheap, correct, and the reference's implementation is already sound | P0 |
| Scroll-progress bar | **DROP** | — | Decorative gradient chrome. With a single accent and no gradient identity it has no visual reason to exist, and reading position is not a hiring signal | — |
| Sticky header | **KEEP** | Wordmark · Work · Experience · About · Contact · Download CV · theme · menu | The 30-second scan needs one stable control surface; four anchors is the right number for nine sections | P0 |
| Gradient logo tile | **ADAPT** | Mono `NP` in a hairline 28px square, ink on paper, no fill, 1px rule | The gradient tile is the reference owner's mark. Retaining it fails the logo-swap test in §5.1 | P0 |
| Gradient nav CTA pill | **ADAPT** | Solid accent pill, `--accent` fill, `--accent-ink` label | Same affordance, no borrowed brand | P0 |
| German language toggle | **DROP** | — | There is no German edition. A toggle pointing at a stub is worse than none (see §E) | — |
| Theme toggle | **ADAPT** | Three-state system / light / dark, inline pre-paint script, `color-scheme` set, `theme-color` driven by the resolved theme, storage key `np-theme` | The reference defaults everyone to dark, ignores the OS, and lets `theme-color` disagree with the page. All three are user-hostile | P1 |
| Mobile menu disclosure | **KEEP** | Same contract: `aria-expanded`, Escape restores focus to the toggle, outside click, close on breakpoint, `.nav-ready` gate | This is the reference's best interaction detail and it degrades correctly without JS | P0 |
| Active-section nav indicator | **KEEP** | Scroll-position algorithm retained; add `aria-current="true"` and derive the 110px offset from a CSS variable | The reference's indicator is visual-only, so assistive tech gets nothing | P1 |
| Scroll-to-top button | **KEEP** | Real `<button hidden>` in the markup, revealed past 600px, hidden over the footer | The reference injects it after `DOMContentLoaded`, which can flash unstyled and never exists pre-JS | P2 |

### A.2 Hero

| Reference component | Verdict | What it becomes for Nidhi | Why | Priority |
|---|---|---|---|---|
| H1 with word-swap span | **ADD** | A working four-phrase rotator. The reference ships the markup and the gradient but *no rotation logic at all* (`behaviour.md` §8) | The mechanic is the component the owner asked for; it has to be built, not copied | P0 |
| Hero lead with one inline link | **ADAPT** | ≤45-word lead, one inline link to `#work` | Structure transfers; prose must be Nidhi's | P0 |
| Two-button CTA row | **KEEP** | "View selected work" (primary) · "Download CV" (secondary) | Two intents, unchanged | P0 |
| Four-item meta grid | **KEEP** | Based in · Currently · Focus · Languages | Answers the four recruiter questions. "Published" has no equivalent, so "Languages" takes the slot — German level is a real Frankfurt hiring question | P1 |
| Portrait + pulsing location tag | **DROP** | Replaced by an evidence panel (below) | No headshot supplied; a stock face is banned and an empty portrait frame is worse than no column | — |
| — | **ADD** | **Evidence panel**: current role, three credential names, two public artefacts, M.Sc. expected date. Hairline border, mono labels, no shadow | Gives the second column a job when there is no portrait, and puts the most verifiable facts above the fold | P1 |
| Auto-scrolling tech strip | **ADAPT** | Static, wrapping "Core stack" row of eight mono chips, no animation, no duplication | Keeps the breadth signal; removes the reference's half-empty no-JS loop, the duplicated screen-reader read, and a focusable non-control | P1 |
| Ambient gradient orbs + graph-paper grid | **DROP** | — | Pure identity, fixed-position paint cost on every scroll, and the only thing keeping the rainbow alive | — |
| Gradient-clipped text | **DROP** | Rotating phrase in Fraunces italic, `--accent`, with a 1px accent rule beneath | The reference's gradient text has no fallback and turns transparent if `background-clip` fails | — |

### A.3 Home sections

| Reference component | Verdict | What it becomes for Nidhi | Why | Priority |
|---|---|---|---|---|
| Section head: number + rule + label + H2 + dek | **KEEP** | "01 — Selected work" grammar retained; at ≥1024px the numeral hangs in the left margin instead of sitting inside the head | The strongest transferable idea in the site — a document register rather than a landing page. The hanging numeral keeps the pattern while shifting the composition away from the reference | P0 |
| Bento work grid (6 columns, 4 cards) | **ADAPT** | 3 cards on a 12-column grid: 7/5 at 1440, 6/6 and full-width at 768–1023, single column below 768 | Three projects, not four. Asymmetry still encodes importance without a four-card spray | P0 |
| Feature card + 3-stat block | **ADAPT** | Flagship card gains a **system facts** list (stack, delivery path, artefact status), never invented metrics | The reference's stats are claims about his work; Nidhi has no quantitative outcomes | P0 |
| Tall card + decorative SVG | **ADAPT** | Thesis card is the tall one; the SVG illustration is dropped | The reference's illustration is owner-specific and decorative; a thesis deserves a real figure or nothing | P0 |
| `.b-outcome` serif italic outcome line | **KEEP** | "→" prefix + one sentence, bottom-aligned above a hairline | Good scannability. The arrow glyph is a pattern, not an asset | P0 |
| Publications year-rail list | **ADAPT** | **Credentials and education rail**: date rail (5.5rem) + title + issuer + credential ID + verify link | No publications exist. The row rhythm fits credentials exactly and is more honest than a cards grid | P0 |
| Record stat grid (4 cards, count-up) | **ADAPT** | Four static stat cards; final values in the HTML; no count-up | The values must be auditable at a glance and in the DOM. Count-up is decoration that delays reading | P1 |
| Writing block (flagship + link rows) | **DROP** | — | No posts. `MASTER_PROMPT.md` §5.2 bans an empty Writing page | — |
| About prose + facts aside | **KEEP** | Three paragraphs + aside (based in, relocation, languages, elsewhere, CV) | The human layer after the evidence; the aside prevents repeating the hero meta verbatim | P0 |
| Contact band with radial gradients | **ADAPT** | Flat `--surface` plane, 1px `--line` border, one 48px accent rule at the top-left, three buttons, three meta chips | Same conversion job, no multi-radial gradient identity, and no masked gradient border to port | P0 |
| Footer | **ADAPT** | Build-time copyright year, four site links, four elsewhere links, Datenschutz | Fixes the reference's blank year in the no-JS path without adding a JS dependency | P0 |

### A.4 Motion and decoration

| Reference component | Verdict | What it becomes for Nidhi | Why | Priority |
|---|---|---|---|---|
| IntersectionObserver reveal | **KEEP** | Visible by default, `.js` class gates any pre-hide, one-shot, stagger via `animation-delay` | The reference's best engineering decision. Its `data-delay` stagger is inert dead code — do not port the transition-delay rules | P1 |
| Count-up numerals | **DROP** | — | Saves an rAF loop; the signature moment is spent on the hero rotator instead | — |
| Card cursor glow (`--mx`/`--my`) | **DROP** | CSS-only 2px hover lift and border change | Unthrottled `mousemove` writes are the reference's clearest INP risk, and the effect is pointer-only decoration | — |
| Tag pulse halo | **DROP** | — | Novelty with no informational value | — |
| Marquee animation | **DROP** | — | Goes with the tech strip | — |
| Page-load fade | **DROP** | — | Delays the first paint of an LCP-adjacent element for no benefit | — |
| Section heading underline draw | **ADAPT** | 2px accent rule, 200ms, `transform: scaleX()` only, no 900ms delay | Keeps the cue, removes the delayed theatre | — |
| Theme icon cross-fade | **KEEP** | 320ms opacity + rotate, absent under reduced motion | Small, contained, correct | — |
| Page-transition fade | **DROP** | — | The reference's version is a no-op behind View Transitions and adds 220ms of artificial latency otherwise | — |

### A.5 Page types and metadata (all ADD — the reference has none)

| Component | Verdict | Becomes | Why | Priority |
|---|---|---|---|---|
| 404 page | **ADD** | One H1, one sentence, three routes out, `noindex`, no redirect | The reference relies on the host default; a custom 404 is a trust signal | P0 |
| Datenschutz page | **ADD** | Eight sections: controller, hosting, logs, local storage, analytics (none), contact, rights, retention | Required for a German-based personal site that publishes an email address | P1 |
| Case-study template | **ADD** | Reference essay shell + meta rail + TOC + figure contract + limitations + prev/next | The reference has no case study, only a 570-word blog post | P0 |
| At-a-glance card | **ADD** | Role · timeline · team · stack · artefacts · confidentiality badge | Stops the technical lead hunting for scope | P0 |
| Confidentiality badge | **ADD** | Public · Method only · On request · Private | Employer and client work needs a stated boundary | P0 |
| `<figure>` + `<figcaption>` + credit | **ADD** | 16:9 slot, mono caption, "Conceptual redraw" label where applicable | The reference has no caption pattern at all | P1 |
| JSON-LD `ProfilePage` + `Person` | **ADD** | `hasCredential`, `alumniOf`, `worksFor`, `knowsLanguage`, city-level address | The reference emits `ScholarlyArticle` nodes, the wrong shape for this site | P1 |
| Print stylesheet | **ADD** | Case studies print clean; nav, menu and to-top hidden | The reference has no `@media print`; printing yields a near-black page | P2 |
| `security.txt` | **ADD** | Committed under `public/.well-known/`, future `Expires` | The reference has one live but not in the repo, so it drifts | P2 |

### A.6 Component count

- **KEEP:** 11 (skip link, header, mobile menu, active nav, lead, CTA row, meta grid, section head, outcome line, about grid, reveal, theme icons = 12 counting the icon micro-interaction).
- **ADAPT:** 17.
- **ADD:** 9.
- **DROP:** 12 (progress bar, DE toggle, portrait, orbs/grid, gradient text, writing block, count-up, cursor glow, tag pulse, marquee, page fade, page transition).
- **Net effect:** the page keeps the reference's *grammar* — mono numeral, hairline, editorial measure, asymmetric cards, rail-separated rows — and loses its *surface*: gradient, orbs, marquee, glow, portrait.

---

## B. Revised home section order

Nine sections maximum, counting the footer as one. The master prompt's ten-item list is compressed by merging "About" with "Languages" and "Education" with "Certifications"; both merges remove a section that would otherwise hold three lines.

**Word-count rule used throughout:** visible prose words only. Navigation labels, CTA labels, mono field labels, credential IDs, and URLs are excluded. Targets are ranges, not quotas; the whole page should land between **750 and 900 prose words**, which is the same order as the reference's ≈740-word English home.

| # | Section | Anchor | Hiring question it answers | Prose target | Why it sits here |
|---|---|---|---|---|---|
| 1 | **Hero** | `#top` | *Who is this, what does she do, and can I contact her without scrolling?* | 55–75 (90–120 incl. evidence panel) | Name, role, one claim, two CTAs, four facts. The evidence panel does the work the portrait does on the reference — it is the first verifiable object |
| 2 | **Proof strip** | `#proof` | *Is any of this checkable, or is it a personal brand?* | 20–28 | Four counts that already exist in the CV. Placed before the projects so employer credibility lands before self-directed work |
| 3 | **Selected work** | `#work` | *Has she actually built anything that ran?* | 140–180 | Three cards, each ending in an outcome and a route to a case study. Work before experience because the site's job is proof beyond the CV |
| 4 | **Experience** | `#experience` | *Where has she worked, at what level, and for how long?* | 160–200 | Reverse chronological, four roles, exact titles including "Intern" and "Working Student". Employer names already appeared in §2, so this section explains rather than introduces |
| 5 | **Capabilities** | `#capabilities` | *Does her stack match the job description I am hiring for?* | 90–120 | Six clusters mirroring the CV's six categories, seven visible items each, one evidence link per cluster |
| 6 | **Education and credentials** | `#credentials` | *Are the qualifications real, current, and checkable?* | 60–85 | Two degrees and three Databricks credentials with IDs and verification links. Sits after capabilities because it corroborates them |
| 7 | **About and languages** | `#about` | *Would she fit the team, and how good is her German?* | 120–140 | Three short paragraphs and a facts aside. Last before contact because it is the only section written in the first person about intent |
| 8 | **Contact** | `#contact` | *How do I reach her, and what is she asking for?* | 40–55 | Email, LinkedIn, CV. One plain statement of the roles sought and the relocation position |
| 9 | **Footer** | — | *Where is everything else, and is this site legitimate?* | 15–25 | Site links, elsewhere links, Datenschutz, build-time year |

**Navigation mapping:** Work · Experience · About · Contact, plus a "Download CV" CTA. Capabilities and credentials are reachable by scroll and from the evidence panel but do not take nav slots — four anchors is the most a 64px bar can carry without becoming a menu.

---

## C. Draft copy

All copy below is **draft for approval**. Nothing here is final until the owner signs it off at Gate 2. Anything marked `[confirm]` is a fact the JSON does not contain and must not be published without an answer.

### C.1 Hero

**Eyebrow (mono, 0.72rem, +0.18em):**

> Data Scientist & AI Engineer · Frankfurt am Main

**H1 — structure.** Two lines inside one `<h1>`: the name, then the claim with the rotating phrase. This keeps "Nidhi Patel" as the first text in the H1 for SEO and screen readers while giving the hero the reference's signature motion.

```
Nidhi Patel
Data Scientist & AI Engineer building [RAG systems] that hold up outside a notebook.
```

**Rotating phrases (4).** All plural, so the verb "hold up" agrees with every one:

1. `RAG systems` — MedBot
2. `LLM agents` — AI Financial Analyst Agent
3. `anomaly models` — Master's thesis
4. `Databricks pipelines` — Miles & More, Barkow Consulting, three Databricks credentials

**Mechanic specification**

| Property | Value |
|---|---|
| Markup | One grid cell containing four `<span>`s; container `aria-hidden="true"`; a visually hidden static sentence carries the accessible text |
| Animation | Opacity cross-fade only. 2.2s per phrase (1.6s hold, 300ms out, 300ms in). One full cycle then settle on phrase 1 |
| Total run | ~8.8s, once per page load. Not infinite |
| Pause | `:hover` and `:focus-within` on the hero pause the cycle |
| Reduced motion | No animation and no second phrase: phrase 1 only. Not "faster" — absent |
| No JS | Phrase 1 only. Everything else is CSS |
| CLS | The grid cell is sized by the widest phrase, so the line never reflows. Reserve with `min-height` on the H1 line |
| Colour | Rotating phrase in `--accent`, Fraunces 600 italic; the rest of the line in `--ink`, Fraunces 400 |
| Underline | 1px `--accent` rule under the phrase, offset 4px. Not a gradient, not a highlight block |

**Accessible text (visually hidden, always present):**

> Nidhi Patel — Data Scientist & AI Engineer building RAG systems, LLM agents, anomaly models and Databricks pipelines that hold up outside a notebook.

**Static alternative, if the rotator is rejected at the gate** (recommended fallback, one line, no loss of meaning):

> Nidhi Patel — Data Scientist & AI Engineer building RAG systems, LLM agents and Databricks pipelines that hold up outside a notebook.

**Hero lead — 35 words (limit 45):**

> I'm a data scientist with 4+ years across working-student, internship and full-time roles in Germany. I build retrieval-augmented LLM systems, explainable models and Databricks pipelines — and the public repositories and thesis report are linked below.

**CTAs:** `View selected work` (primary, solid accent) · `Download CV` (secondary, hairline border).

**Hero meta — four items:**

| Label | Value |
|---|---|
| BASED IN | Frankfurt am Main · open to relocation |
| CURRENTLY | Data Analytics Intern, Miles & More (Lufthansa Group) |
| FOCUS | LLM/RAG systems · explainable ML · Azure Databricks |
| LANGUAGES | English business fluent · German intermediate |

No link is attached to "Currently": the JSON has no public employer URL, and inventing one would be a broken or misleading link.

**Evidence panel — right column, replacing the portrait:**

| Panel row | Content |
|---|---|
| CURRENT ROLE | Data Analytics Intern — Marketing, Strategy & Customer Insights · Miles & More (Lufthansa Group) · since 09/2026 |
| CREDENTIALS | 3 Databricks certifications, 2 Academy Accreditations → `#credentials` |
| PUBLIC WORK | AI Financial Analyst Agent (GitHub) · Thesis report (PDF) → case studies |
| DEGREE | M.Sc. Data Science, TU Dortmund — expected 12/2026 |

The panel is four rows of mono label + value, hairline-separated, on `--surface` with a 1px `--line` border. No shadow, no rotation, no pulse.

### C.2 Proof strip — four stats

Only counts that already exist in the JSON. No percentages, no "12% better", no derived multipliers.

| Number | Label | Sub-line | Source |
|---|---|---|---|
| **4+** | years across role types | Working student, intern, full-time | `profile.yearsExperience`; 49 months of listed employment |
| **4** | employers in Germany | Energy, real estate, consulting, loyalty | `experience[]` — Amprion, Vonovia, Barkow, Miles & More |
| **3** | Databricks certifications | Two Academy Accreditations | `certifications[]` |
| **12/2026** | M.Sc. Data Science expected | TU Dortmund · coursework complete | `education[0]` |

The fourth card is a date, not a quantity. It must **not** be count-up animated, and its final value must be present in the HTML. If a fifth slot were ever needed, "4 languages" (English, German, Gujarati, Hindi) is the only other fully sourced count — but four is the cap.

**Section dek (one line, 14 words):**

> Four numbers a reviewer can check against the CV, the credential register and GitHub.

### C.3 Selected work — three cards

Card order: MedBot (flagship, widest), AI Financial Analyst (narrow), thesis (full width at mid breakpoints / tall at 1440). Order is by relevance to AI-engineering roles, not by date; the thesis is the deepest work and closes the section.

**Card 1 — MedBot** · tag `PRODUCTION RAG` · status `Personal project · no public repository`

> **MedBot**
>
> Document question answering grounded in retrieval: LangChain and FAISS behind a Flask API, packaged in Docker and shipped through a Jenkins pipeline that scans every image with Trivy.
>
> → Build, test, image scan and deploy run as one pipeline instead of a checklist.
>
> `LangChain · FAISS · Flask · Docker · Jenkins · Trivy`
>
> Links: Case study. Repository: **not in the CV** — omit until the owner supplies a URL.

System facts (the adapted stat block, no invented numbers): Delivery `Jenkins CI/CD + Trivy` · Runtime `Docker` · Interface `Flask` · Retrieval `FAISS`.

**Card 2 — AI Financial Analyst Agent** · tag `LLM ORCHESTRATION` · status `Personal project · public repository`

> **AI Financial Analyst Agent**
>
> Turns a natural-language question about a company into a structured investment analysis, with figures grounded in retrieved filings and live market data rather than model memory.
>
> → Model routing, tool calling and structured JSON outputs, so the report is assembled from cited inputs rather than one free-text answer.
>
> `LLM orchestration · RAG · Tool calling · Structured outputs`
>
> Links: Case study · [GitHub](https://github.com/patelnidhi1898/AI-Financial-Analyst-Assistant)

**Card 3 — Thesis** · tag `MASTER'S THESIS` · status `Academic research · public report`

> **Contextual Anomaly Detection in Cash Withdrawal Distribution Network**
>
> A Germany-wide framework that finds regions where cash access is thinning, then explains which geographic and socioeconomic factors drive the gap.
>
> → Named Thüringen and Brandenburg as structurally underserved, and attributed the gap to regional and socioeconomic drivers rather than a black-box score.
>
> `Python · Explainable AI · Geospatial data · Statistical analysis`
>
> Links: Case study · [Report (PDF)](https://github.com/patelnidhi1898/Contextual-Anomaly-Detection-in-Cash-Withdrawal-Resource-Distribution/blob/main/Thesis_report_Contextual%20Anomaly%20Detection.pdf) · [GitHub](https://github.com/patelnidhi1898/Contextual-Anomaly-Detection-in-Cash-Withdrawal-Resource-Distribution)

**Section dek (two lines, 26 words):**

> Three systems, each with a decision behind it. One is a public repository, one is a public report, and one is method-only until the repository is shareable.

That sentence is the confidentiality statement and the honesty signal in one. Do not soften it.

### C.4 Education and credentials — rail entries

Two sub-blocks in one section, both using the reference's year-rail rhythm: a fixed 5.5rem date column, then the body. At ≤640px the date stacks above the title.

**Degrees**

| Date | Entry |
|---|---|
| 10/2020 – 12/2026 (expected) | **M.Sc. Data Science** — Technical University Dortmund. Coursework complete; degree award pending final credit registration. |
| 07/2015 – 05/2019 | **B.E. Computer Engineering** — Gujarat Technological University, Ahmedabad. |

Wording is fixed: "expected 12/2026", "coursework complete, award pending". Never "M.Sc. graduate" or "M.Sc. Data Science (2026)".

**Certifications** — newest first, exact names from the JSON, hyphen preserved:

| Issued | Credential | Issuer | ID | Verify |
|---|---|---|---|---|
| 07/2026 | Academy Accreditation - Azure Databricks Platform Architect | Databricks | 189213182 | `credentials.databricks.com/fddc2f4d-…` |
| 07/2026 | Get Started with Databricks for Data Engineering | Databricks | — (none issued) | `credentials.databricks.com/8ad6ef4d-…` |
| 05/2026 | Academy Accreditation - Generative AI Fundamentals | Databricks | 183902279 | `credentials.databricks.com/fdecab02-…` |

Rules: the credential with no ID renders "No credential ID issued", not a blank cell. All three links open in a new tab with `rel="noopener"`. Full URLs come from `certifications[].verificationUrl` at build time, never retyped.

**Section dek (18 words):**

> Two degrees, three Databricks credentials, and a verification link for every one of them.

### C.5 Capabilities — six clusters

Every item below appears verbatim in `skills[]`. Seven visible per cluster, remainder in a collapsed "Also used" line that is **not** an accordion — it is always visible, smaller and muted. No bars, no percentages, no star ratings, no logo wall.

| # | Cluster (CV category) | Visible (7) | Also used | Evidence link |
|---|---|---|---|---|
| 1 | **Modelling and experimentation** (Data Science & ML) | Predictive Modelling · Anomaly Detection · Time-Series Forecasting · Feature Engineering · A/B Testing · Hypothesis Testing · Explainable AI (SHAP) | scikit-learn, XGBoost, PyTorch, TensorFlow, statsmodels | Thesis case study · Amprion role |
| 2 | **Generative AI and LLM engineering** | LLMs · RAG · LangChain · LangGraph · Multi-Agent Systems · Tool Calling · Guardrails | Prompt Engineering, Embeddings, Vector Databases (FAISS), Hugging Face, Input/Output Validation, Human-in-the-Loop Workflows, LLM Monitoring & Observability | MedBot · AI Financial Analyst |
| 3 | **Cloud and data engineering** | Azure Databricks · Apache Spark · Delta Lake · Medallion Architecture · Azure Storage · ETL Pipelines · Data Quality | Data Modelling, Data Validation | Miles & More role · Barkow role · Databricks credentials |
| 4 | **MLOps and delivery** | Docker · Jenkins · CI/CD · Trivy · MLflow · Model Deployment · Workflow Automation | Flask, FastAPI, Streamlit, Git | MedBot |
| 5 | **Programming and databases** | Python (pandas, NumPy) · SQL · R · PostgreSQL · MySQL · SQL Server · SQLite | MongoDB | Experience section |
| 6 | **Analytics and BI** | Tableau · Power BI · Excel · Plotly · Matplotlib · Seaborn | — (all six visible) | Miles & More · Vonovia · Amprion |

Count check: 12 + 14 + 9 + 11 + 8 + 6 = **60 items**, exactly the CV total. Cluster names are editorial; item names are not.

**Deviation from `MASTER_PROMPT.md` §7.6:** that list makes "Languages" a seventh capability block. Here languages live in the About aside instead, so the grid maps one-to-one onto the CV's six categories. This keeps the count verifiable and avoids a seventh block holding four words.

**Section dek (17 words):**

> Grouped the way the CV groups them, with a link to the work that proves each group.

### C.6 About — three paragraphs, 137 words (limit 140)

> I'm a data scientist in Frankfurt am Main, finishing an M.Sc. in Data Science at TU Dortmund (expected 12/2026; coursework complete, award pending). I came to it through computer engineering in Ahmedabad, which is where I got into the habit of asking how a model actually runs.

> Since 2022 I've worked across energy trading, real estate, consulting and airline loyalty: forecasting European fuel prices at Amprion, building Tableau and Power BI dashboards at Vonovia, writing Python ETL pipelines and anomaly-detection frameworks at Barkow Consulting, and doing customer lifecycle and pricing analytics on Azure Databricks at Miles & More.

> What I want next is a role where modelling and delivery are the same job: retrieval that gets evaluated, pipelines that get monitored, and a result a stakeholder can check without asking me to trust it. I'm open to relocation.

**Facts aside:**

| Label | Value |
|---|---|
| BASED IN | Frankfurt am Main |
| RELOCATION | Open |
| LANGUAGES | English (business fluent) · German (intermediate) · Gujarati and Hindi (native) |
| ELSEWHERE | LinkedIn · GitHub · Email |
| CV | Download PDF |

### C.7 Contact band

**Eyebrow:** `Get in touch`

**H2:**

> Let's talk about the role.

**Paragraph — 37 words:**

> I'm looking for Data Scientist, Machine Learning Engineer or AI Engineer positions, and I'm open to relocation. Tell me the problem the team is trying to solve and I'll point you at the closest thing I've built.

**Buttons:** `Email me` (mailto, subject pre-filled "Data Scientist role — Nidhi Patel") · `Connect on LinkedIn` · `Download CV`.

**Meta chips (3):** Frankfurt am Main · English business fluent, German intermediate · Open to relocation.

No contact form. There is no backend, and `MASTER_PROMPT.md` §5.6 bans one without it.

### C.8 Footer

**Left:** `© 2026 Nidhi Patel` — rendered at build time, never by `#year` JavaScript.

**Site links (4):** Work · Experience · About · Contact
**Elsewhere (4):** Email · LinkedIn · GitHub · CV (PDF)
**Legal line:** Datenschutz

Footer prose target: 15–25 words including the copyright. No "Hand-built" or any other reference phrase.

---

## D. Case-study page outlines

All three use one shell, adapted from the reference's blog post (`secondary-pages.md` §3) and extended with what a case study needs and a 570-word post does not.

### D.0 Shared shell

```
skip link
header (same as home, Work marked current)
main
  article.post
    breadcrumb            ← Work
    meta row              mono: discipline · status · reading time
    h1                    outcome-shaped
    standfirst            one sentence, problem + result
    at-a-glance card      role / timeline / team / stack / artefacts / badge
    table of contents     only if >1,500 words
    body @ 68ch
      sections…
      figure slots        full-width to 880px inside an 800px article
    sources
    prev / next project
    back to work
footer (compact)
```

**Additions over the reference:** a standfirst class (the reference has none), a static build-time TOC, `<figure>`/`<figcaption>` with an optional credit line, a meta rail, a limitations section, and a confidentiality badge. **Retained:** the narrow measure, the mono meta row, the sources block, prev/next cards, and the back pill.

**Structural note:** widen the article to 800px but cap prose at 68ch. The reference's 720px column is right for 570-word posts and too narrow for architecture figures.

---

### D.1 MedBot — `a document assistant that deploys itself`

**H1:** *MedBot: a document assistant that deploys itself*
**Standfirst (22 words):** *A retrieval-augmented question-answering service where the pipeline that ships it is as much of the project as the model.*

**At a glance**

| Field | Value |
|---|---|
| Role | Solo personal project |
| Timeline | `[confirm]` — no dates in the JSON |
| Team | One |
| Stack | LangChain, FAISS, Flask, Docker, Jenkins, Trivy |
| Artefacts | None public — `[confirm]` repository URL, or keep "Method only" |
| Badge | **Method only** until a URL exists; **Public** afterwards |

**Sections and budgets**

| § | Heading | Words | Content |
|---|---|---|---|
| 1 | The problem | 110–140 | Long documents defeat keyword search; a general chatbot answers fluently and invents the passage it did not retrieve. The project asks what "grounded" actually costs to build |
| 2 | What it does | 80–110 | Index a document set, ask a question, receive an answer plus the retrieved passages it was built from |
| 3 | How it works | 220–300 | Three decisions with rejected alternatives: local FAISS over a hosted vector store (no infrastructure dependency); Flask over FastAPI (the constraint that taught the lesson, `[confirm]` — do not assert a reason the owner did not have); a single container over split services |
| 4 | The delivery pipeline | 120–160 | Commit → test → image build → Trivy scan → deploy. What the pipeline removed: the manual checklist. What it did not add: an evaluation gate |
| 5 | What changed | 100–140 | Qualitative only. **Retrieval quality, latency and answer accuracy: not measured.** Say so in one sentence rather than implying a benchmark |
| 6 | What I would do next | 60–90 | An evaluation set with known answers; retrieval metrics (recall@k) before generation metrics; guardrails and input/output validation, both already in the skills list; LLM monitoring |
| 7 | Stack and links | 40 | Stack list; repository status |

**Figure 1 (after §3):** ingest → chunk → embed → FAISS → retrieve → prompt → LLM → answer, with the Jenkins pipeline drawn as a parallel band beneath. SVG, 16:9, one stroke weight, labelled *Conceptual architecture — redrawn, not a screenshot*.

**Target length:** 700–900 words. No TOC needed.

**Copy risk:** the CV says "containerised practices to package the application as a scalable AI service". Write "a runnable service with an automated build and scan pipeline", not "production system serving users". No usage numbers exist.

---

### D.2 AI Financial Analyst Agent — `an LLM analyst that shows its sources`

**H1:** *An LLM analyst that shows its sources*
**Standfirst (24 words):** *Turns a question about a company into a structured investment analysis, with every figure pulled from a tool call rather than recalled by the model.*

**At a glance**

| Field | Value |
|---|---|
| Role | Solo personal project |
| Timeline | `[confirm]` |
| Team | One |
| Stack | LLM orchestration, RAG, tool calling, structured outputs |
| Artefacts | GitHub — https://github.com/patelnidhi1898/AI-Financial-Analyst-Assistant |
| Badge | **Public** |

**Sections and budgets**

| § | Heading | Words | Content |
|---|---|---|---|
| 1 | The problem | 110–140 | An LLM asked for a share price will produce one whether or not it knows it. Financial analysis is a domain where a plausible wrong number is worse than no answer |
| 2 | The design | 200–280 | Question → plan → tool calls (market data, web) → retrieval → synthesis → structured JSON → report. Why routing exists (cheap model for extraction, stronger model for synthesis — `[confirm]` which models); why prompt chaining rather than one long prompt |
| 3 | Grounding, and what grounding does not fix | 140–180 | Numbers arrive through tool calls, context through retrieval, output through a JSON schema. Still unverified: whether the retrieved context is the *right* context. Name that honestly |
| 4 | What changed | 100–140 | The output is checkable line by line. **Accuracy against a benchmark: not measured.** No evaluation harness exists in the repository |
| 5 | What I would do next | 60–90 | A question set with known answers; abstention when a tool fails; a cost and latency budget per report; logging of every tool call |
| 6 | Stack and links | 40 | Stack list, repository link |

**Figure 1 (after §2):** the orchestration graph, with tool calls drawn as side branches and the JSON schema as the terminal node. Label *Conceptual pipeline*.

**Target length:** 700–900 words.

**Copy risk:** "investment analyses and recommendations" is in the CV; do not let the case study read as financial advice. Add one line: *Built as a technical exercise; not investment advice.*

---

### D.3 Master's thesis — `where cash access thins`

**H1:** *Where cash access thins: mapping Germany's withdrawal gaps*
**Standfirst (23 words):** *A context-aware anomaly detection framework that finds the regions losing cash access — and names the structural reasons rather than ranking raw counts.*

**At a glance**

| Field | Value |
|---|---|
| Role | Master's thesis, TU Dortmund × Barkow Consulting GmbH |
| Timeline | Degree 10/2020 – 12/2026 (expected); thesis period `[confirm]` |
| Team | `[confirm]` — thesis supervision and any client-side collaboration |
| Stack | Python, anomaly detection, explainable AI, statistical analysis, geospatial data |
| Artefacts | [Report (PDF)] · [GitHub] |
| Badge | **Academic research · public report** |

**Sections and budgets**

| § | Heading | Words | Content |
|---|---|---|---|
| 1 | The problem | 140–180 | Cash access is infrastructure for people who cannot or will not bank digitally. Branch and ATM closures are usually measured as raw density, which punishes rural regions for being rural. The thesis asks what an *anomaly* looks like once context is included |
| 2 | The data | 100–140 | Geographic, socioeconomic and financial data at a regional level. Granularity, timeframe and volume: `[confirm]` — the JSON records none, and inventing them is forbidden. If the thesis states them, quote it; otherwise write "regional-level" without a number |
| 3 | The method | 240–320 | Context features; the anomaly model; explainable attribution; statistical testing of the drivers. Two decisions and one rejected alternative, drawn from the thesis — **read the report, do not infer** |
| 4 | Findings | 140–180 | Thüringen and Brandenburg identified as structurally underserved; socioeconomic and regional drivers quantified; recommendations for equitable financial access |
| 5 | Limitations | 100–140 | Taken from the thesis's own limitations section, quoted or closely paraphrased. No invented caveats, no invented robustness claims |
| 6 | What I would do next | 60–90 | Temporal validation across years; finer granularity; linking to policy datasets |
| 7 | Stack, report and code | 40 | Stack list, both links |

**Figure 1 (after §3):** a Germany map with anomaly scores, drawn as a single-hue sequential ramp from the data palette, with the two named regions annotated. Labelled *Conceptual redraw of the thesis result — not the original figure*. A second figure slot after §4 for the driver attribution chart if the thesis contains one that can be redrawn.

**Target length:** 900–1,100 words (the master prompt allows the thesis more room). TOC required above 1,500 words only, so this page may skip it; add it if figures push the scroll length past three screens.

**Copy risk:** no thesis grade, no distinction claim, no "published in" language. The report lives in a GitHub repository — that is a public report, not a peer-reviewed publication.

---

## E. What is dropped, and why

| Dropped | Why | What replaces it |
|---|---|---|
| **Publications section** (year rail, 4 papers, DOIs) | Nidhi has no publications in the JSON. The component needs title, authors, venue, year and a resolvable DOI; without them it is an empty academic costume | The same year-rail *pattern*, reused for credentials and degrees — a different component semantically, and honest |
| **Writing block** (flagship essay + 3 link rows + "More on the blog") | There is no blog and no dated post. `MASTER_PROMPT.md` §5.2 forbids an empty Writing page, and a Writing nav item pointing at nothing is worse than no item | Nothing. The space goes to Selected work, which is where the evidence actually is |
| **Writing / Publications nav items** | They would map to dropped sections | Four anchors: Work, Experience, About, Contact |
| **German toggle, `/de/` tree, hreflang, `og:locale` pair** | German **Intermediate** is a spoken level, not a translated edition. The reference's own German page is a hand-maintained duplicate that had already drifted (`site-meta.md` §5.6) | English only, `<html lang="en">`, no hreflang, no x-default. German level appears in the hero meta, About aside and content meta |
| **Travel sub-site and footer "Travel" link** | No travel content exists; the reference link is pure noise for a job search | Nothing |
| **Startup / "currently building vorschau.ai" slot** | Nidhi has no venture. A fake "currently building" line is the most damaging kind of invention on a portfolio | "Currently: Data Analytics Intern, Miles & More (Lufthansa Group)" — a real, checkable line |
| **The orange → pink → purple gradient identity** (`--grad-warm`, `--grad-cool`, `--grad-border`, `--shadow-glow`) | It is the reference owner's brand, and his own design spec calls it a 2024 template look. Retaining it would fail the logo-swap test immediately | One accent hue (verdigris) and one data ramp. See §F |
| **Gradient-clipped text** (`.swap-wrap`, `.record-num`) | No fallback if `background-clip: text` is unsupported — the text goes transparent. It is also the most recognisable surface element of the reference | Italic Fraunces phrase in solid accent with a hairline rule |
| **Portrait, floating portrait, tilt, `float-bob`, pulse tag** | No headshot was supplied. A stock face is banned; an empty 1:1.2 frame wastes the hero's best real estate | Evidence panel. If a headshot arrives later, the panel moves below the lead and the portrait takes the column at 120–160px, never as the LCP |
| **Ambient orbs, 56px graph-paper grid, `orb-drift`** | Fixed-position paint on every scroll, pure identity, and it is the only remaining rainbow | Flat `--paper` ground; hierarchy from type and hairlines |
| **Hero word-swap as shipped** | It was never implemented — the markup and gradient exist, the logic does not (`behaviour.md` §8) | Rebuilt properly: four phrases, CSS-only, one cycle, absent under reduced motion |
| **Tech-strip marquee contents** | The twelve items are the reference owner's stack (pgvector, Weights & Biases, Anthropic/OpenAI APIs). Copying them would be a false claim | A static "Core stack" row of eight of Nidhi's own tools |
| **Marquee mechanics** | No-JS produces a half-empty jumping strip; the duplicate is read twice by screen readers; the focusable non-control traps keyboard users | Static wrapping row |
| **Scroll-progress bar** | Decorative, gradient, and redundant on a nine-section page | Nothing |
| **Card cursor glow, tag pulse, page-load fade, page transition** | INP risk, pointer-only, or latency with no information gain | Hover lift and border change only |
| **Count-up numerals** | The values must be readable immediately and present in the HTML; counting is theatre | Static numbers |
| **Record stats naming papers/agents** | "4 peer-reviewed papers", "7 agents" are claims about a different person | The four sourced counts in §C.2 |
| **`ScholarlyArticle` JSON-LD graph** | Wrong entity type for someone without publications | `ProfilePage` + `Person` + `hasCredential` + `alumniOf` |
| **Theme default dark, generic `theme` storage key, OS-ignoring toggle, mismatched `theme-color`** | All four are documented defects | Light default following `prefers-color-scheme`, `np-theme` key, three-state toggle, `color-scheme` set |
| **Three-repo deploy, deploy keys, rsync, Cloudflare-only headers and redirects** | Built for three hostnames. This is one site | One repo, `upload-pages-artifact` + `deploy-pages`, headers in the repo |
| **Travel `.trip-card` (song / meal / moment)** | Tone mismatch for a job search, and it prints "Coming soon" when data is absent — exactly the empty state to avoid | Nothing |
| **Testimonials, skill bars, logo wall, visitor counter** | Never existed in the reference; still banned | Nothing |
| **`llms.txt`** | Manually drifting duplicate of facts that already exist on the page | Optional, generated from the same data, or omitted |

**Kept because it is structure, not identity:** the section-head grammar, the hairline row rhythm, the 68ch measure, the about-grid with a facts aside, the outcome line with its arrow, the prev/next and back-link end matter, the visible-by-default reveal contract, and the `nav-ready` progressive-enhancement gate.

---

## F. Palette and type for Nidhi

The brief is to keep the **Fraunces / Geist / JetBrains Mono** structure and replace the **orange → pink → purple** identity. Keeping the families is right: they are already in the page's DNA and they are open-licensed. What must change is *which family does which job*, and every colour.

### F.1 Why the reference palette cannot travel

| Reference token | Value | Problem for Nidhi |
|---|---|---|
| `--accent` dark | `#ff6b35` | 2.71:1 on the reference's own light paper — fails body-text contrast before it is even Nidhi's |
| `--accent-2` | `#f72585` | Second hue; breaks one-accent discipline |
| `--accent-3` | `#7209b7` | Third hue, and it never retheme in light mode |
| `--grad-warm` | `#d93a00 → #e4086d → #7209b7` | Three-stop gradient across every CTA, logo, stat and progress bar |
| `--shadow-glow` | orange at 0.5 | Warm halo baked into five component shadows |
| `--accent-cyan`, `--accent-lime` | `#00d9f5`, `#c9f86b` | Four accents in total, used as category tints |

Four accent hues and a rainbow gradient is the reference owner's identity. Reproducing it would make the site a recolour of his, which is exactly what the logo-swap test forbids.

### F.2 Recommendation — **"Bone & Verdigris"**

One accent: a deep blue-green. Rationale, in order of weight:

1. **It fits the work.** Verdigris is the colour of oxidised copper — instrumentation, monitoring, things that have been outside. The profile is RAG evaluation, pipeline monitoring, explainable models. The colour argues the same thing the copy does.
2. **It is maximally distant from the reference** on the hue wheel (orange/pink/purple sit roughly 180° away), so no surface can be mistaken for his.
3. **It survives both themes** without a second hue: 7.2:1 on light paper, 10.4:1 on dark paper. The reference needed a darkened light-mode accent *and* a vibrant dark-mode accent because orange is intrinsically weak on paper; verdigris does not.
4. **It is not navy.** The over-imitated Brittany Chiang palette is banned by `MASTER_PROMPT.md` §5.1; a blue-green with a warm paper ground reads editorial rather than SaaS.

**Light theme (default)**

| Token | Hex | Role | Measured contrast |
|---|---|---|---|
| `--paper` | `#FBFAF6` | Page ground | — |
| `--surface` | `#F2EFE7` | Cards, aside, contact plane | ink 15.2:1 |
| `--ink` | `#171A1C` | Body and headings | 16.7:1 on paper |
| `--muted` | `#565F5E` | Secondary text, deks | 6.3:1 paper / 5.7:1 surface |
| `--rule` | `#D9D5CA` | Decorative hairlines only | 1.4:1 — decorative, never a boundary |
| `--line` | `#87847A` | Functional borders: inputs, chips, cards, the 1px focus-adjacent edge | 3.6:1 paper / 3.3:1 surface |
| `--accent` | `#0E5F57` | Links, CTA fill, focus ring, one stat | 7.2:1 paper / 6.5:1 surface |
| `--accent-ink` | `#FFFFFF` | Text on accent fill | 7.5:1 on accent |
| `--focus` | `#0E5F57` | 2px ring, 2px offset | 7.2:1 vs paper, 7.5:1 vs accent-ink |

**Dark theme**

| Token | Hex | Role | Measured contrast |
|---|---|---|---|
| `--paper` | `#0E1211` | Page ground | — |
| `--surface` | `#161B1A` | Cards, aside | ink 15.0:1 |
| `--ink` | `#EDEFEA` | Body and headings | 16.3:1 on paper |
| `--muted` | `#A2ABA7` | Secondary text | 8.0:1 paper / 7.4:1 surface |
| `--rule` | `#2A3230` | Decorative hairlines | 1.4:1 — decorative |
| `--line` | `#636D6A` | Functional borders | 3.5:1 paper / 3.3:1 surface |
| `--accent` | `#5FD3BE` | Links, CTA fill, focus | 10.4:1 paper / 9.6:1 surface |
| `--accent-ink` | `#08110F` | Text on accent fill | 10.5:1 on accent |

**Two tokens where the reference has one, deliberately.** `--rule` is a decorative hairline at 1.4:1 and `--line` is a functional boundary at ≥3:1. The reference uses one border token for both, which means its card edges technically fail the non-text contrast requirement while looking fine. Splitting them costs nothing and makes the WCAG claim defensible.

**Focus on a filled button.** An accent ring on an accent fill is invisible. Primary CTAs get a 2px `--paper` inner ring plus the 2px accent outer ring, so the indicator is visible on both light and dark and on both filled and ghost controls.

**Data ramp (case-study figures only, never home chrome)**

| Series | Hex | Contrast on `--paper` light |
|---|---|---|
| 1 | `#0E5F57` | 7.2:1 |
| 2 | `#35506B` | 8.0:1 |
| 3 | `#A16207` | 4.7:1 |
| 4 | `#9A4A3A` | 5.9:1 |

Four distinct hues rather than four tints, so the series survive deuteranopia. A sequential single-hue ramp from `#0E5F57` to `#D6E6E0` serves the choropleth on the thesis page. Rule: **the brand accent is never used as a categorical series on the home page**; a chart that needs colour uses the ramp, so the accent stays meaningful.

**Discipline target:** roughly 90% neutral / 7% accent / 3% ramp. Above the fold, accent appears exactly twice — the rotating phrase and the primary CTA.

### F.3 Type

Same three families, different division of labour. This inversion is the main reason the site will not read as a recolour of the reference.

| Family | Reference shipped | Nidhi uses it for | Why |
|---|---|---|---|
| **Fraunces** | Accents only: `.serif`, the hero swap span, outcome lines, record numerals, quote marks. Single 400 weight, faux italic | **Structural display:** H1 name and claim, all H2s, pull quotes, the rotating phrase (italic). Real roman 400/500 and a **real italic** | The reference's own unshipped redesign wanted exactly this and never got it. Promoting the serif is the cheapest way to be unmistakably not his site, and it pairs with a warm paper ground |
| **Geist** | Everything structural: body, all headings, buttons, nav | **Body and UI only:** prose, lead, buttons, nav, form-free controls | Body sans under a serif display is the pairing `MASTER_PROMPT.md` §6.3 prefers; it also stops the all-sans heading sameness |
| **JetBrains Mono** | Around twenty ambient labels: eyebrows, section numbers, tags, metas, publication years, post metadata, atlas labels | **Metadata only:** section numerals, dates, credential IDs, stack chips, meta labels, figure captions, reading time | The reference's own spec calls this "mono as wallpaper". Demoting it makes it mean something again |

**Fraunces settings:** `opsz` driven by size, `SOFT` 0, `WONK` 0 for headings; `WONK` 1 only for the rotating phrase and pull quotes, where the odd letterform is the point. Weights: 400 roman, 500 roman, 400 italic. **Ship a real italic file.** The reference declares only roman and lets the browser synthesise an oblique, which is visible at display sizes and looks cheap.

**Scale** (from `MASTER_PROMPT.md` §6.3, adjusted for a wider serif):

| Role | Size | Line-height | Tracking |
|---|---|---|---|
| H1 name | `clamp(3rem, 1.8rem + 4.6vw, 4.75rem)` | 0.98 | −0.03em |
| H1 claim line | `clamp(1.35rem, 1.1rem + 1.2vw, 1.9rem)` | 1.25 | −0.015em |
| H2 | `clamp(1.875rem, 1.5rem + 1.5vw, 2.375rem)` | 1.15 | −0.02em |
| H3 (card title) | `1.375rem` | 1.2 | −0.015em |
| Body | `clamp(1.0625rem, 1rem + 0.25vw, 1.125rem)` | 1.6 | 0 |
| Small | `0.875rem` | 1.45 | +0.01em |
| Mono label | `0.75rem` | 1.4 | +0.06em, uppercase |

Measure 65ch for prose, 52ch for the hero lead, 68ch in case studies. `text-wrap: balance` on headings, `pretty` on paragraphs, `tabular-nums` on every numeral in the stat strip and credential IDs.

**Font payload:** Fraunces roman variable + Fraunces italic variable + Geist variable + JetBrains Mono 400, Latin subset only (Latin-1 covers Düsseldorf, Thüringen, Mönchengladbach). Estimate 130–160KB; the build must measure every WOFF2 and record the total, with a hard fail above 150KB. The reference ships six files with unmeasured sizes and no italic at all — do not inherit that.

### F.4 Five structural differences from the reference

Use these as the logo-swap test checklist. If the name were changed, none of these would read as his site:

1. **Serif display, sans body** — he ships sans headings with serif accents.
2. **Verdigris on warm bone** — he ships a four-hue warm gradient on near-black.
3. **Hanging section numerals in the margin** at ≥1024px — his numerals sit inside the head.
4. **An evidence panel where the portrait would be** — he ships a tilted, floating portrait with a pulse tag.
5. **Three asymmetric cards with system facts** — he ships a four-card bento with metric blocks.

What deliberately *is* shared: the numeral + hairline + label grammar, the 68ch measure, hairline-separated rows, and the outcome arrow. Those are patterns, and `MASTER_PROMPT.md` §5.1 explicitly permits learning patterns.

---

## G. Risks and open questions for the approval gate

### G.1 Content risks

| # | Risk | Consequence if unresolved | Recommended default |
|---|---|---|---|
| 1 | **No quantitative outcomes for any project** | Every case study's "results" section must be qualitative. If the wireframe shows a metric, it is fabricated | Publish qualitative outcomes with an explicit "not measured" line. Do not add a number to make a card look stronger |
| 2 | **MedBot has no public repository** | The flagship card has no verifiable artefact, which weakens the strongest project | Badge "Method only" and a case study that shows the pipeline design. Supply the URL before launch if possible |
| 3 | **Current role is an internship** while the headline says "Data Scientist & AI Engineer" | A reviewer may read the combination as inflation. This is the single most likely credibility objection | Keep both, but make the hero meta and About say "Data Analytics Intern" plainly. The 4+ year span carries the headline. Owner to confirm the headline is acceptable |
| 4 | **Thesis report and repository are public — verify** | A 404 on the report link is worse than no link | Check both URLs resolve without authentication before build; re-check at QA |
| 5 | **Confidentiality of employer work** | Miles & More is a current employer; Barkow work was client-facing. Publishing campaign results, revenue, volumes or dashboards is a real risk | Miles & More: name the employer and role, genericise internal systems, publish **no** results. Barkow: "a financial-services client" unless cleared in writing. No case study for either |
| 6 | **Thesis metrics, grade and limitations are not in the JSON** | Inventing a grade or a limitation is the most damaging possible error | Read the thesis PDF; quote its limitations; never state a grade |
| 7 | **"Production"** is used in master-prompt seeds for MedBot, but the CV says "containerised … scalable AI service" | Overclaiming a live system invites a question the project cannot answer | Say "a runnable service with an automated build and scan pipeline". Reserve "production" for employer work |
| 8 | **German level** | Upgrading Intermediate to B1/B2 is an explicit prohibition | Keep "German — Intermediate" verbatim, three places: hero meta, About aside, contact meta |
| 9 | **60 skills is a lot of claim** | A keyword grid with no evidence reads as padding | Seven visible per cluster, one evidence link each, and an explicit "Also used" line rather than hiding items |
| 10 | **Thesis appears in three places** (work card, credentials rail, Barkow experience) | Repetition makes the page feel thin | Card links to the case study; the rail lists the degree only; the Barkow bullet mentions the framework once |

### G.2 Design and build risks

| # | Risk | Consequence | Recommended default |
|---|---|---|---|
| 11 | **Rotating H1 and WCAG 2.2.2** (Pause, Stop, Hide) | A strict auditor can argue the auto-rotating phrase needs a pause mechanism. Reduced motion alone does not satisfy 2.2.2 | One cycle then settle, pause on hover/focus-within, absent under reduced motion. **If the owner wants zero risk, use the static H1 and accept no rotator** |
| 12 | **No headshot** | The hero's second column has no object | Evidence panel. If a photo arrives, it is 120–160px in the aside, never the LCP |
| 13 | **Dark mode scope** | A half-designed dark theme is worse than none (`MASTER_PROMPT.md` §6.3) | Both themes are fully tokenised (done above). If charts or figures are not finished for dark by launch, ship light-only and say so — do not ship a broken toggle |
| 14 | **The reference's CSS is not portable as-is** | Masked gradient borders, runtime `--mx/--my`, default-dark cascade, double gutter, inert stagger (`css-system.md` §7) | Port the *effective* values, not the cascade. One stylesheet, one shell, no duplication |
| 15 | **Font payload and faux italic** | Over 150KB, or a synthesised oblique at 4.75rem | Ship real roman and italic, Latin subset, measure every file, fail the build over budget |
| 16 | **Contrast of `--rule` vs `--line`** | Using the decorative hairline for functional edges drops below 3:1 | Two tokens, as specified. Verify every pairing with a checker, not by eye |
| 17 | **Mobile proof strip** | Four stats at 360px can become a 2×2 grid that pushes the projects below two screens | 2×2 at ≤640, 4×1 above. Name, role, first stat and both CTAs must be above the fold at 390 |
| 18 | **Long thesis title in a card** | "Contextual Anomaly Detection in Cash Withdrawal Distribution Network" is 68 characters and will wrap to four lines in a narrow card | Give the thesis card the full-width slot at ≤1023px; allow `text-wrap: balance`; never truncate the title |

### G.3 Inputs still missing (blocking Gate 2)

| # | Input | Why it blocks | Default if unanswered |
|---|---|---|---|
| 19 | **Custom domain** | Canonical, OG, sitemap, JSON-LD and the Pages CNAME all derive from it | Cannot launch. Ask, do not invent |
| 20 | **MedBot repository URL** | Determines the badge, the case-study link and whether the flagship is verifiable | Badge stays "Method only" |
| 21 | **Analytics decision** (none / GoatCounter / Plausible) | Changes the Datenschutz wording and whether a processor must be named | **None.** Ship with no analytics; the privacy page is then short and true |
| 22 | **Headshot** (path or "none") | Determines the hero layout at Gate 2 | None — evidence panel |
| 23 | **Thesis period, team, data granularity** | Three at-a-glance fields and the data section | `[confirm]` placeholders, not guesses |
| 24 | **Case-study reading times** | The reference derives them at 220 wpm; ours need honest counts from the finished drafts | Compute at build, do not hard-code |
| 25 | **Dark mode: ship or light-only** | Scope decision, not a detail | Ship both; the tokens are already defined |
| 26 | **Is the headline acceptable alongside an internship title?** | Affects the hero, the meta and the About paragraph | Keep, with the internship stated plainly in the adjacent meta row |

### G.4 What the gate must actually decide

Five decisions, not twenty-six questions:

1. **Hero mechanic** — rotator with the 2.2.2 caveat, or the static line.
2. **Headline positioning** — "Data Scientist & AI Engineer" beside an internship title, or a modified headline.
3. **MedBot** — method-only case study, or hold the card until a repository exists.
4. **Theme** — both themes, or light-only.
5. **Domain** — the one input that cannot be defaulted.

The remaining items are defaults this document already recommends and the owner can accept in one line.

---

## Appendix A — Traceability

Every drafted claim, and where it comes from. A build agent must be able to check any sentence on the page against this table.

| Claim as written | Source | Note |
|---|---|---|
| "4+ years across working-student, internship and full-time roles in Germany" | `profile.yearsExperience`; `experience[]` | 49 months of listed employment, verified by summing role durations |
| "Data Scientist & AI Engineer" | `profile.headline` | Exact phrase in the CV headline |
| "Frankfurt am Main · open to relocation" | `profile.location.city`, `.openToRelocation` | City only; no street address |
| "Data Analytics Intern, Miles & More (Lufthansa Group)" | `experience[0].role`, `.company` | Exact title; do not shorten to "Data Scientist" |
| "since 09/2026" | `experience[0].start`, `.durationDisplay` | Current role |
| "4 employers in Germany" | `experience[].company` (4 entries) | Amprion, Vonovia, Barkow, Miles & More |
| "3 Databricks certifications, two Academy Accreditations" | `certifications[]` (3); 2 names contain "Academy Accreditation" | Count, not a rank |
| "M.Sc. Data Science, TU Dortmund, expected 12/2026, coursework complete, award pending" | `education[0].degree`, `.institution`, `.end`, `.endStatus`, `.details[0]` | Exact approved wording; never "graduate" |
| "B.E. Computer Engineering, Gujarat Technological University" | `education[1]` | — |
| "retrieval-augmented" | `projects[0].highlights[0]`, `.themes[]` | MedBot |
| "LangChain, FAISS, Flask, Docker, Jenkins, Trivy" | `projects[0].stack` | Exact list |
| "AI Financial Analyst: model routing, tool calling, structured JSON outputs" | `projects[1].highlights[2]`, `.stack` | — |
| "Thüringen and Brandenburg … structurally underserved" | `projects[2].highlights[2]` | The only two regions named; do not add others |
| "explainable AI / XAI" | `projects[2].stack`, `skills[0]` | Do not say "SHAP" about the thesis unless the report confirms it |
| "English business fluent · German intermediate" | `languages[0].level`, `languages[1].level` | Note the CV's exact wording differs per language; keep "business fluent" for English |
| "Gujarati and Hindi (native)" | `languages[2]`, `languages[3]` | — |
| "60 skills in six categories" | `skills[].items` — 12+14+9+11+8+6 | Verified count |
| "two public repositories and a thesis report" | `projects[1].links.github`, `projects[2].links.github`, `.report` | MedBot has none |
| "Azure Databricks, Tableau, SQL, Python at Miles & More" | `experience[0].stack` | — |
| "European fuel prices … at Amprion" | `experience[3].highlights[0]` | "for trading applications" is in the same bullet |
| Credential IDs `189213182`, `183902279` | `certifications[1].credentialId`, `[2].credentialId` | The third has no ID |
| Email, LinkedIn, GitHub | `contact.email`, `.linkedin.url`, `.github.url` | Phone exists in the JSON but `phonePublic: false` — **never render it** |

**Claims that must never appear on the site:** any percentage or multiplier; a thesis grade; a team size for projects; a data volume; a visa or work-authorisation statement; "available immediately"; "references available on request"; "passionate about data"; a publication; a testimonial; a customer count; a revenue figure; a dashboard screenshot from Miles & More.
