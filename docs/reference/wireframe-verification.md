# Wireframe verification — Gate 2

Date: 2026-11-21
Scope: `docs/wireframes/index.html` and `docs/wireframes/notes.md`, checked against `MASTER_PROMPT.md` §5.4–§5.7, the approved `docs/plan.md`, and `data/nidhi-patel.json`.
Method: source inspection, Python `html.parser` structure pass, regex audits, headless Chrome measurement (Playwright), and JSON string reconciliation. No production code, build or deploy was touched.

## Checklist

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Greyscale only; no brand hex, gradient or fetched image | **PASS** | One inline stylesheet. Zero non-grey hex values, zero `rgb()`/`hsl()`, zero `gradient()`, zero CSS `url()`. Zero `<img>`, `<link>` or external `<script src>`. The only chromatic token in the project was removed from `notes.md`. |
| 2 | Real copy; every name/date/title matches JSON; no phone or street address | **PASS** | All roles, employers, durations, degrees, institutions, certification IDs and project names reconcile against `data/nidhi-patel.json`. The private phone number and street address are absent. Fixed: email typo at line 634; hero "Currently" row replaced by Relocation (lines 643–646 and 1091–1096); language chip removed from Contact; MedBot Team cell removed; Role changed to "Personal project" (line 1364); invented rejected-alternatives and manual-checklist copy replaced with CV-backed sentences (lines 1382, 1391); "grounds every figure" overclaim removed from both ledger aria-labels. |
| 3 | All required reference-derived components present and labelled | **PASS** | Labelled: SiteHeader, TechStrip, Hero + HeroMeta + portrait, ProjectLedger + LedgerRow + Badge, ExperienceTimeline + ExperienceRow, CredentialRail, CapabilityGrid + CapabilityCluster, AboutBlock, ContactBand, SiteFooter, plus CaseStudyLayout + CaseStudyMetaRail + Badge. Proof strip is absent by the approved plan override (facts moved to the Experience header). Scroll-progress bar is an approved plan drop; scroll-to-top is reference-only runtime chrome and is noted as omitted in `notes.md`. |
| 4 | Desktop and mobile frames show real reflow; no horizontal overflow at 360px | **PASS** | Mobile is a separately composed page, not a scaled desktop. `.m-page` is now `width:100%; max-width:390px` (line 344), so content is fluid inside the fixed 390px review canvas. Headless test at a forced 360px content width: `scrollWidth = clientWidth = 360`; the only elements crossing the frame edge are the document-chrome fold overlay and annotation badge, not design content. Desktop frame is a true 1440px composition; fold check: hero 115–720 (605px), first ledger row starts at 890 against a 900px fold (top of first card visible). Mobile fold at 844: H1 196–331, lead 345–494, CTAs 512–618, meta starts 678, so name/role/value/primary CTA plus at least three of four meta cells are above the fold. |
| 5 | Exactly one h1; no skipped heading levels | **PASS** | One `h1`: "Nidhi Patel — portfolio wireframe · Gate 2" (line 498). Five `h2`, 35 `h3`, 30 `h4`; parser reports no skipped levels. All frame headings were demoted (page titles to `h2`, section titles to `h3`, entry titles to `h4`) and every dependent CSS selector was updated. The accessibility table now explains the distinction between this multi-frame document and the built page. |
| 6 | Focus states visible; skip link present; targets at least 24px | **PASS** | Global `:focus-visible` ring at line 31; ledger rows use an inset ring at line 259. Skip link at line 495 targets `#doc-main`, and `<main>` has `tabindex="-1"` (line 527). `.cs-toc a` and `.cs-crumb a` now have `min-height:24px` (lines 439, 453). Headless measurement found zero visible anchors or buttons below 24×24 at 1600px or 390px. |
| 7 | Standalone: no external URL requests; no JS dependency for content | **PASS** | No external stylesheet, script, font, image or `@import`. The only script is a small inline handler that makes non-hash links inert for the review artefact; removing it changes no content. All copy and both frames render with JavaScript disabled. Absolute URLs occur only as outbound anchor `href` values. |
| 8 | File size and `[TODO]` slots reported | **PASS** | `index.html` is 107,276 bytes / 1,597 lines. 24 `[TODO: …]` markers in 17 distinct forms, all visible and intentional: project/thesis dates, availability date, cluster-merge confirmation, reading time, project timeline, repository URL, six case-study body-copy budgets, hand-authored SVG, and one convention example. No lorem ipsum; no invented value fills a slot. `notes.md` is updated to the same figures. |

## Blockers

**BLOCKER — MASTER_PROMPT §5.4 deliverable is incomplete.** `index.html` contains Direction C only; there is no A/B/C switch or A/B composition. `docs/wireframes/` contains only `index.html` and `notes.md`; `direction-a.md`, `direction-b.md`, `direction-c.md`, `a-1440.png`/`a-390.png`/`b-*`/`c-*`, `reference-log.md` and `motion-storyboard.md` are all absent. §5.4 requires all three directions and those companion files at Gate 2. This cannot be fixed by copy edits inside the two reviewed files; it needs the missing design work and artefacts. `notes.md` now carries an explicit scope note recording the gap.

No other spec-level blocker was found after the fixes above. The eight content criteria pass; the deliverable fails only on §5.4 completeness.

## Fixes applied during verification

- `docs/wireframes/index.html`: heading demotion plus dependent CSS selectors; email typo; hero meta (desktop and mobile) changed to Based in / Relocation / Focus / Languages; Contact language chips removed; mobile social row turned into real 44px anchors; mobile theme span replaced with a button; duplicate CSS removed; case-study header/nav/breadcrumb/prev/back destinations corrected; Team removed; Role corrected; invented MedBot and AI Financial Analyst claims replaced; TOC and breadcrumb 24px targets added; `tabindex="-1"` on the document main; `.m-page` made fluid; annotation text corrected from five to four focus demos and from proof items to meta cells.
- `docs/wireframes/notes.md`: stale claims about "Currently", proof items, Contact language chip, team size, 320px reflow, accent hex, seed word total (330 → 151), Hero (96 → 108), Contact (74 → 67) and the four-control focus demo corrected; §5.4 scope gap recorded.

## Verdict

**FAIL** — the wireframe content and accessibility checks pass, but Gate 2 cannot be signed off while Directions A and B, the six direction screenshots, `direction-a/b/c.md`, `reference-log.md` and `motion-storyboard.md` are missing.
