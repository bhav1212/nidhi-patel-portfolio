# Design review — `content-map.md` against the reference site

**Reviewed.** `docs/reference/content-map.md` (758 lines) against `/tmp/ref-site/site/index.html` (519 lines), `/tmp/ref-site/site/styles.css` (2,365 lines), `theme.js`, `script.js`, `data/nidhi-patel.json`, and `MASTER_PROMPT.md` §4.2, §5.2, §5.4, §6.3.

**Method.** Every reference component named in the map was checked against the shipped markup and CSS. Every proposed colour pairing was measured with the WCAG relative-luminance formula; the data ramp was also simulated under deuteranopia and protanopia. Claims about the reference were spot-checked (bento grid, theme default, hero word-swap logic, light-mode accent override).

**Verdict.** The mapping is factually disciplined and unusually honest about Nidhi's constraints. It is not yet a design adaptation: two of its nine sections have no component definition or draft copy, the data palette is light-only, and the remaining compositional debt is large enough that the home page could still read as the reference in green. It is ready for revision, not for a wireframe gate.

---

## Ranked findings

### BLOCKER — do not wireframe until resolved

| # | Finding | Remedy |
|---|---|---|
| **B1** | **Experience and Capabilities are in the section order but absent from the component table.** A.3 defines the bento, year rail, proof grid, about grid and contact band; it defines nothing for section 4 (Experience) or section 5 (Capabilities). C.1–C.8 likewise contain no Experience copy. Two of nine sections cannot be drawn. | Add two A.3 rows. Experience: vertical timeline, 5.5rem date column, exact title, employer, location, role progression (Barkow: working student → full-time), 2–3 bullets from `experience[].highlights`, domain tag, confidentiality badge. Capabilities: 2×3 grid of the six CV clusters, five visible items plus an inline "also used". Draft the Experience copy as a new C.4 and renumber. |
| **B2** | **The data ramp is not designed for dark mode.** Measured on `--surface` dark (`#161B1A`): series 1 `#0E5F57` 2.32:1, series 2 `#35506B` 2.08:1, series 3 `#A16207` 3.54:1, series 4 `#9A4A3A` 2.83:1. Series 1, 2 and 4 fail the 3:1 graphical-object requirement. Under deuteranopia, series 1 and 2 collapse to (0.31, 0.32, 0.34) and (0.24, 0.30, 0.42) — not separable at chart-encoding sizes, contradicting §F.2's "four distinct hues … survive deuteranopia". The sequential choropleth's light end `#D6E6E0` is 1.24:1 on `--paper` and 1.12:1 on `--surface`: the lowest two bands are invisible. | Define a separate dark ramp (lift 1 and 2 to ≈7:1, desaturate 3 and 4), and never rely on hue alone: direct-label series, add dash or marker style, keep chart text in `--ink`. Raise the sequential low end to about `#8FB8AC` and give every band a `--line` hairline. Re-verify with a CVD simulator, not by eye. §6.3's "half-designed dark theme is worse than none" applies to the chart layer as much as the surface layer. |

### SHOULD FIX — material design or credibility defects

| # | Finding | Remedy |
|---|---|---|
| **S1** | **The section order silently overrides a "locked" order.** `MASTER_PROMPT.md` §4.2 locks Hero → Proof → Work → Experience → Skills → About → Education → Languages → Contact. The map moves Education ahead of About, merges Languages into About and the footer into the count, without presenting this as an owner override. | Surface it at Gate 2 as one explicit override with the reason (credentials corroborate capabilities; About should sit last). Do not let the deviation arrive as a fait accompli. |
| **S2** | **The proof strip is the weakest and most derivative section, and it sits second.** Three of its four cells are resumé facts, not proof; the fourth is a date ("12/2026 expected"), which advertises an unfinished degree as a headline statistic. The strip repeats Experience's opening and is structurally the reference's record grid moved up the page. | Either fold the four facts into the Experience header and delete the section, or keep three cells only: "4+ years", "4 employers", "3 public artefacts (2 repositories + 1 report)". Drop the degree from the strip; it belongs in Credentials. |
| **S3** | **The flagship card is the only project with no verifiable artefact.** MedBot gets the widest slot, while the AI Financial Analyst (public repo) and the thesis (public report) are narrower. A proof-first site inverts its own premise. | Make the AI Financial Analyst or the thesis the feature card. Keep MedBot as a narrow "Method only" card until a repository URL exists; if the URL never arrives, the card still earns its place through the pipeline story, not through width. |
| **S4** | **Fact duplication will make the page feel thin.** Miles & More appears in hero meta ("Currently"), the evidence panel ("Current role"), Experience, About and the contact chips — five times. Credentials appear in the panel, the proof strip and the credentials section. The eight hero stack chips repeat the 60-item Capabilities grid. | One fact, one home. Hero meta: location, relocation, focus, languages. Evidence panel: role, degree, public artefacts. Proof/Credentials: counts and IDs. Delete the contact language chip. Cut the hero strip to six tools not otherwise given prominence, or delete it. |
| **S5** | **German "Intermediate" is placed at the point of conversion.** It appears in hero meta, About and the contact meta chips. Honest, but the contact chip filters the candidate at the moment the recruiter decides to act, and the CV does not claim more than "Intermediate". | Keep it verbatim in hero meta and About. Replace the contact chip with "Open to relocation" or an availability line. Three placements over-weights a weakness. |
| **S6** | **The bento has been weakened into a generic two-up, and its 1440 layout is underspecified.** Three cards at "7/5 at 1440, 6/6 and full-width at 768–1023" does not say where the third card goes at 1440; the reference's signature is a 6-column grid with a row-spanning tall card interlocking with a 4-span feature. The map keeps the vocabulary and loses the composition. | Specify the 1440 grid literally. Either keep a three-card interlock (for example 7/5 on row one, 5/7 offset on row two) or adopt the project ledger in §7 below. Do not ship an accidental two-column list. |
| **S7** | **Capabilities is a 60-item wall placed fifth.** At seven visible items per cluster plus an "also used" line, it is roughly 60 tokens of text before the reader reaches credentials. It duplicates the proof strip's "3 certifications" and the hero stack row. The "seven visible" rule is also contradicted by the BI cluster, which shows six. | Show five per cluster plus the inline remainder; move Capabilities after Credentials; or reduce the home page to three clusters with evidence links and put the full 60 in a collapsible details block that is still in the DOM. Keep the one-to-one CV mapping; it is the section's only defensible structure. |
| **S8** | **Derivative risk is higher than the five "structural differences" claim.** Same three families, same numeral + rule + label grammar, same year-rail rhythm, same about-grid with facts aside, same contact band, same outcome arrow, same two-button hero. The differences listed in F.4 are mostly colour, type roles and a margin numeral — surface changes. The light paper `#FBFAF6` is within a few units of the reference light paper `#fafaf7`. | Accept that the grammar is shared (the prompt permits patterns) but add one structural signature the reference cannot claim: the project ledger in §7. Also change the About composition: a single measured paragraph plus a three-row "how I work" list is less recognisably his two-column prose/aside. |
| **S9** | **The font specification contradicts itself.** C.1 asks for Fraunces 600 italic; F.3 ships 400 roman, 500 roman and 400 italic. F.3 estimates 130–160KB and then sets a hard build failure above 150KB — the estimate can fail its own gate. | Fix the weights to 400/500 roman + 400 italic everywhere. Either set the estimate range to 120–145KB with a 150KB hard fail, or raise the fail threshold to 165KB and justify it. Measure the actual WOFF2 files at build. |
| **S10** | **Confidentiality badges are defined only for case studies.** A.5 defines Public / Method only / On request / Private, but the home cards use free-text status and the Experience rows have no badge at all — including a current employer and client-facing consulting work, which is exactly where a boundary needs stating. | Make the badge a component with four states and use it on work cards, Experience rows and the at-a-glance card. Barkow client work = "On request"; Miles & More = "Employer work, no results published". The badge should be visible, not in a tooltip. |
| **S11** | **No availability statement.** The contact copy states role targets and relocation but not when she can start. For the German market, notice period is a standard screening question, and the JSON contains no notice period. | Add "Available from [confirm]" to the contact band, with the placeholder visible at Gate 2. Do not invent a date and do not add a visa/work-authorisation claim (§7 forbids it). |
| **S12** | **Dark theme token table omits `--focus`.** The light table defines it; the dark table does not, and the focus ring paragraph does not say which theme it refers to. The accent measures 10.4:1 on dark paper, so the value is available — it is just unspecified. | Add `--focus: #5FD3BE` to the dark table and state the filled-CTA ring recipe for both themes (paper inner ring plus accent outer ring). Verify the ring is not obscured by the sticky header. |

### NIT — correct or clarify, no redesign needed

| # | Finding | Remedy |
|---|---|---|
| **N1** | The reference-accent contrast argument pairs the **dark** token `#ff6b35` with the **light** paper. The reference light theme overrides `--accent` to `#a82a00` (6.70:1). The conclusion — raw orange is unusable on paper — is right; the premise is mispaired. | Reword: "the raw brand orange is 2.71:1 on paper; the reference fixes it by darkening to #a82a00 in light mode, which is a second accent identity." |
| **N2** | "Four accent hues" is followed by five tokens: `--accent`, `--accent-2`, `--accent-3`, `--accent-cyan`, `--accent-lime`. | Say five, or drop cyan and lime from the count and note they are category tints. |
| **N3** | A.6's counts are wrong. The tables contain KEEP 12, ADAPT 13, ADD 11, DROP 12 — not "KEEP 11 (12), ADAPT 17, ADD 9, DROP 12". The ADAPT figure is overstated by four. | Regenerate the counts from the table, or delete the paragraph; the "net effect" sentence does not depend on the totals. |
| **N4** | The evidence panel promises "two public artefacts" but omits the thesis GitHub repository, which is public. Appendix A correctly says two repositories and a report. | List all three links, or say "three public artefacts". |
| **N5** | "Accent appears exactly twice above the fold" is not true: rotating phrase, primary CTA, inline lead link, focus ring and possibly the wordmark. | Either remove the accent from the inline lead link (underline in ink) or restate the target as "two accent surfaces, one of them the CTA". |
| **N6** | "Roughly 180° away on the hue wheel" holds for orange and pink; purple is about 100° from verdigris. | Say "the warm half of the wheel" rather than a number. |
| **N7** | The light paper is effectively the reference's light paper. With identical families, the light theme is the closest surface overlap. | Warm or darken the paper by a few points (test the token table again), or accept it and rely on the structural move in §7. |
| **N8** | C.5 says seven visible items per cluster; the BI cluster has six. | Say "up to seven" or add one item from the CV. |
| **N9** | The 3-card bento's 1440 placement is not fully specified (see S6). | Add a literal column map for 1440, 1024, 768 and 390. |
| **N10** | "Two public repositories" in the proof strip counts the thesis repo; the thesis report is a third artefact. | Use "3 public artefacts" and enumerate in the dek. |

---

## 1. Which distinctive components are lost or weakened, and does it matter?

**Retained or improved**

- **Section-head grammar** (numeral, rule, label, H2, dek) — kept, and the hanging numeral at ≥1024px is a genuine improvement. This is the most transferable idea in the reference.
- **Hairline row rhythm, 68ch measure, outcome arrow, about grid, contact band, mobile-menu contract, visible-by-default reveal** — kept. Correct: these are patterns, not identity.
- **Hero word-swap** — the reference ships the markup and gradient with no rotation logic (`script.js` contains no `hero-swap` handling). The map adds a real rotator. That is a gain, not a loss, though the auto-rotation is a WCAG 2.2.2 risk the map already flags.

**Weakened, and it matters**

- **The bento interlock.** The reference's 6-column grid with a 4-span feature, a 2-span tall card spanning two rows and two 2-span thirds is the site's most recognisable layout. Three cards on a 12-column grid at 7/5 is a different, generic composition. The thesis-as-tall-card instruction preserves the vocabulary but not the interlock. This matters: with the portrait gone, the bento was the remaining spatial signature.
- **The portrait as human anchor.** Replacing it with an evidence panel is right (no photograph, and a stock face is banned), but the panel is a second column of text next to a hero that is already text. The reference's hero worked because one column was an object. The panel needs one visual element — a large credential count, a monogram plate, or a redrawn thesis figure — or the hero reads as a CV header. This matters for first-impression craft.
- **The full-bleed tech band.** The static eight-chip row loses the band's rhythm and breadth. It is the correct trade for honesty and no-JS behaviour, and it does not matter much — but the page then has no full-width horizontal event between hero and work. Consider one full-bleed hairline rule with the section numeral instead.

**Dropped, correctly**

Scroll-progress bar, ambient orbs, 56px graph paper, gradient-clipped text, cursor glow, tag pulse, marquee, page-load fade, page transition, count-up. These are identity or interaction debt. Dropping them is the right call for distinctness, but it removes every ambient texture in one move. The page needs one replacement texture that is not the reference's: the ledger or the hanging numeral rail can supply it.

**Not a loss:** publications and writing. They cannot exist without content.

---

## 2. Which reference components do not suit Nidhi, and what should replace them?

| Reference component | Unsuited because | Replacement | Verdict on the map |
|---|---|---|---|
| Publications year rail (title, authors, venue, DOI) | No publications; authors and venue are the hierarchy, and Nidhi has neither | Credentials rail (date, name, issuer, ID, verify) | Right replacement, but three short rows in a rail are thin. Add the credential ID as a right-aligned mono column so the rail has a second axis. |
| Writing block (flagship essay, dated rows) | No blog, no posts | Nothing. Do not add an empty Writing page | Right |
| Startup / "currently building" slot | No venture | Current internship line | Right |
| Portrait and pulse tag | No headshot; a stock face is banned | Evidence panel | Right job, wrong density. See §1. |
| Bento stat blocks ("7 agents", "12k+ sources") | No quantitative outcomes exist in the JSON | System facts (delivery, runtime, interface, retrieval) | Right, but the facts duplicate the stack chips and the at-a-glance card. Keep one fact per card, not four. |
| Record stat grid with count-up | Counts are modest and one is a date; count-up delays reading | Three static facts, folded into Experience | Partly right; the standalone section is not. |
| Marquee tech strip | Copying his stack would be a false claim; the mechanics duplicate announcements and trap focus | Static six-chip row | Right, subject to the duplication fix. |
| German toggle / `/de/` tree | German is a spoken level, not a translated edition | English only; level stated in About and hero meta | Right |
| Four-hue gradient identity | It is his brand and cannot pass the logo-swap test | One verdigris accent plus a data ramp | Right |
| Contact radial gradients | Identity, not affordance | Flat surface, hairline border, one accent rule | Right |
| Travel link, testimonials, skill bars, logo wall | Tone or never existed | Nothing | Right |

The one replacement that needs rethinking is the **proof strip**: it replaces the record grid with a section that is also a stat grid, now placed earlier, carrying weaker numbers. It is the most clone-like element on the page because it keeps his component and only changes the labels.

---

## 3. Is the section order defensible for a job search, or a clone of someone else's arc?

**It is not a clone of the reference's arc.** The reference runs Hero → Work → Publications → Track record → Writing → About → Contact. That is an academic/thought-leader sequence: evidence of output, then authority, then numbers, then thinking. Nidhi's proposed order — Hero → Proof → Work → Experience → Capabilities → Credentials → About → Contact — has no publications and no writing, and inserts the two resumé sections the reference never had. The narrative is a recruiter funnel, not his.

**It is defensible, with two reservations.**

1. **Proof before work is the weak move.** The strip's content is a resumé header: years, employer count, certification count, expected degree. None of it demonstrates quality, and placing it before the projects delays the only evidence of ability. For an early-career candidate, the employer names are the strongest credential; they are already in the strip, which is the argument for Experience coming early. A defensible alternative is Hero → Work → Experience (with the four proof facts in the Experience header) → Capabilities → Credentials → About → Contact. Either way, the standalone strip is the section to cut.
2. **Capabilities sits too high and Credentials too low.** A 60-item skill grid is the least persuasive section for a human reader; placing it before the verifiable credentials gives keywords priority over proof. Move Credentials above Capabilities.

**The order also silently departs from `MASTER_PROMPT.md` §4.2, which is marked locked.** That is a process issue, not a narrative one — see S1. It should be presented as an override at Gate 2, with the About/Education swap justified.

**Clone risk is not in the order. It is in the component grammar** (same section-head, same rail, same about grid, same contact band). Changing the order will not fix that; changing one structure will.

---

## 4. Is the palette distinct enough, and do the accents pass?

**Distinctness: yes at the accent, no at the ground.** Verdigris is genuinely far from orange/pink/purple and survives both themes as one hue. But the light paper `#FBFAF6` is essentially the reference's light paper `#fafaf7`, and the three type families are identical. A viewer who knows the reference will not mistake the accent, but could mistake the light theme's atmosphere. The type-role inversion (serif display, sans body) is what prevents a pure recolour, and it is doing most of the distinctiveness work. That is acceptable only if the layout also changes — which is why the structural move in §7 matters more than more colour tuning.

**Contrast: the text and UI tokens pass. The data layer does not.**

Measured values (WCAG 2.x):

| Pairing | Measured | Requirement | Result |
|---|---|---|---|
| `--ink` on `--paper` (light) | 16.74:1 | 4.5:1 body | Pass |
| `--muted` on `--paper` | 6.29:1 | 4.5:1 body | Pass |
| `--muted` on `--surface` | 5.72:1 | 4.5:1 body | Pass |
| `--accent` on `--paper` (light) | 7.20:1 | 4.5:1 body | Pass |
| `--accent` on `--surface` (light) | 6.54:1 | 4.5:1 body | Pass |
| `--accent-ink` on `--accent` (light) | 7.52:1 | 4.5:1 body | Pass |
| `--line` on `--paper` (light) | 3.58:1 | 3:1 UI | Pass |
| `--line` on `--surface` (light) | 3.26:1 | 3:1 UI | Pass (thin margin) |
| `--rule` on `--paper` (light) | 1.40:1 | decorative only | Pass as decorative; must never bound a control |
| `--ink` on `--paper` (dark) | 16.29:1 | 4.5:1 body | Pass |
| `--muted` on `--paper` (dark) | 8.01:1 | 4.5:1 body | Pass |
| `--accent` on `--paper` (dark) | 10.37:1 | 4.5:1 body | Pass |
| `--accent-ink` on `--accent` (dark) | 10.52:1 | 4.5:1 body | Pass |
| `--line` on `--paper` (dark) | 3.53:1 | 3:1 UI | Pass |
| `--line` on `--surface` (dark) | 3.26:1 | 3:1 UI | Pass (thin margin) |
| Data series 1–4 on light paper | 7.20 / 8.01 / 4.71 / 5.89 | 3:1 graphical | Pass |
| Data series 1–4 on light surface | 6.54 / 7.28 / 4.28 / 5.35 | 3:1 graphical | Pass; series 3 below 4.5 if used as text |
| Data series 1–4 on dark paper | 2.51 / 2.26 / 3.83 / 3.07 | 3:1 graphical | **Fail: 1 and 2** |
| Data series 1–4 on dark surface | 2.32 / 2.08 / 3.54 / 2.83 | 3:1 graphical | **Fail: 1, 2 and 4** |
| Sequential low end `#D6E6E0` on paper / surface | 1.24 / 1.12 | 3:1 between bands | **Fail** |

**Findings**

1. **B2 is the real blocker**, not the accent. The token table's own numbers are accurate; the ramp was only checked on light paper, and the chart layer was never rethemed. A thesis choropleth is the site's signature data artefact, so this is not a corner case.
2. **The deuteranopia claim is wrong.** "Four distinct hues rather than four tints" is true in normal vision and false under simulation: series 1 and 2 converge. Use direct labels and a second encoding (pattern or marker) as a matter of course. The 3/4 pair also converges, though less severely.
3. **`--line` at 3.26:1 on surface has no headroom.** If any token is adjusted later (a warmer surface, a lighter line), the UI boundary drops below 3:1. Record the pairing in a token test, not in prose.
4. **The focus recipe is under-specified for dark mode** (S12). The inner paper ring is the part that makes a filled CTA focusable; state it for both themes.
5. **90/7/3 is a plausible target, but the "twice above the fold" line is not true** (N5). The inline hero link is a third accent use. Decide whether that link should be ink-underlined instead.

---

## 5. Does the adaptation handle the six constraints?

| Constraint | Handled? | How | What remains |
|---|---|---|---|
| **No publications** | Yes | Publications section dropped; year-rail pattern reused for credentials and degrees. The thesis badge says "Academic research · public report", never "published". | No authority section remains for an academic-adjacent CV; the thesis case study and credential IDs have to carry it. That is acceptable. |
| **No blog** | Yes | Writing block and nav item dropped; no empty page. | The "how I think" signal is gone. Do not invent it. If a post ever exists, add it then, not before. |
| **No startup** | Yes | "Currently building" replaced by the real internship line. | None. This is the correct call; a fake venture would be the worst possible invention. |
| **No portrait** | Yes | Evidence panel replaces the portrait column. | The hero becomes text beside text, and the panel repeats the meta row. Give the panel one visual object and delete the duplicate "Currently" row. |
| **German Intermediate** | Yes, over-corrected | Verbatim in hero meta, About aside and contact chips; never upgraded to B1/B2. | Three placements, one of them at the CTA. Reduce to two (hero meta and About). |
| **Three projects, not four** | Yes | Three cards; the fourth reference card ("Four peer-reviewed papers") disappears. | The 1440 layout is underspecified (S6), and the widest card is the unverifiable one (S3). |
| **M.Sc. expected, not graduated** | Yes | "Expected 12/2026", "coursework complete, award pending" fixed as wording. | The date appears in the proof strip as a headline stat; remove it there. |
| **Current role is an internship** | Flagged, unresolved | Hero meta states "Data Analytics Intern" beside the headline. | This is a Gate 2 decision, correctly identified. Design cannot resolve it; the copy must not imply a title she does not hold. |

**One additional constraint the map handles well:** the absence of any quantitative outcome. Every work card leads with a decision and ends with a qualitative outcome; the "not measured" line is explicit. That is the right response and should survive revision.

---

## 6. What must be ADDED that the reference does not have?

| Addition | Required by | Status in the map | Action |
|---|---|---|---|
| **Experience timeline** (dates, exact titles, employer, location, role progression, 2–3 bullets, domain, badge) | §5.2 P1, §5.4 anatomy | **Missing** — section listed, no component, no copy | **B1.** Define and draft it. Use `roleProgression` for Barkow (working student → full-time); it is a seniority signal the CV already contains. |
| **Capability grid** (2×3, evidence link per cluster) | §5.2 P1, §5.4 | **Missing component**, content drafted in C.5 | **B1.** Define the grid; reduce to five visible items per cluster. |
| **Confidentiality badges** (Public / Method only / On request / Private) | §5.4 items 10–11 | Partial: defined for case studies, free text on cards, absent on Experience | **S10.** One badge component, used on work cards, Experience rows and the at-a-glance card. |
| **Certifications with IDs and verify links** | §5.4 | Present, exact names, "No credential ID issued" rule | Keep. Verify all three URLs resolve before build. |
| **Availability statement** | Job-search requirement; not in §5.4 | Missing | **S11.** Add "Available from [confirm]" to Contact; ask the owner, never invent. |
| **Role targets** | §4.2 | Present in Contact ("Data Scientist, ML Engineer or AI Engineer") | Keep exact; these are `profile.roleTargets`. |
| **Public-artefact inventory** | Integrity | Present but inconsistent ("two" vs three) | **N4/N10.** Count three: AI Financial Analyst repo, thesis repo, thesis report. |
| **404, Datenschutz, print stylesheet, JSON-LD, security.txt** | §5.2/§5.4/§6.6 | Present in A.5 | Keep. The Datenschutz page must match the analytics decision (default: none). |
| **CV download asset** | §4.2 | Referenced but no path/encoding decision | Specify the published filename (no spaces or parentheses), file size, and a visible `download` attribute. |

---

## 7. What is at risk of being too derivative, and what is the one structural move?

### The derivative risk, stated plainly

If the site ships as described, a designer who knows the reference will see: the same three typefaces, the same numeral/rule/label section heads, the same hairline-separated rail, the same prose-left/facts-right about block, the same centred contact band, the same two-button hero, the same italic outcome line with an arrow. The five "structural differences" in F.4 are real but mostly tonal: colour, type roles, a margin numeral, a text panel where a portrait was, and a three-card variant of a four-card grid. The logo-swap test is likely to pass at a glance and fail on a second look.

That is not a reason to abandon the grammar. It is a reason to spend the one structural bet on something the reference cannot claim.

### The move: replace the bento with a **project index / evidence ledger**

Make Selected work a table-like index rather than a card grid:

```
PERIOD      SYSTEM                          DECISION IT ENCODES                       EVIDENCE        ROUTE
2025–26     MedBot                          Ship, scan, deploy as one pipeline         Method only     Case study
2025        AI Financial Analyst Agent      Ground every figure in a tool call         Public — repo   Case study
2025–26     Cash-access anomaly detection   Explain the drivers, not the score         Public — report Case study
```

Why this is the right single move:

- It converts the site's biggest constraint — no metrics, one unverifiable project, confidential employer work — into the visual system. The **Evidence** column becomes the signature, and the confidentiality taxonomy becomes a design element rather than a disclaimer.
- It uses the reference's own craft vocabulary (mono metadata, tabular numerals, hairline rows, a section numeral) without reusing its composition (the bento). The grammar stays; the spatial idea changes.
- It fixes three findings at once: the flagship-width problem (S3), the underspecified three-card grid (S6), and the thin credentials rail (the ledger and the rail can share a row rhythm without looking like a resumé table).
- It is defensible on its own merits for a data-engineering profile: an index is what a data person would build. It reads as a chosen structure, not a reduced card grid.
- It gives the hanging section numerals something to belong to: the page becomes a document with a date rail, not a landing page with cards.

If a card layout must be kept, the fallback is the **experience spine**: a dated left rail running through Work and Experience, so every project sits beside the role that produced it. That is also unlike the reference, but it is a larger content burden. Pick one and commit; do not ship cards plus a timeline plus a rail plus a stat strip, which is the current nine-section plan.

**One further deletion supports the move:** drop the standalone About grid and replace it with one measured paragraph plus a three-row "How I work" list (modelling, delivery, evidence). It removes the most recognisably his composition and gives the page a second, quieter structural signature.

---

## Appendix — what to decide at the next gate

1. **Experience and Capabilities components** — approve the timeline and 2×3 grid, and the Experience copy (B1).
2. **Data ramp** — approve a dark variant and direct labelling before any chart is drawn (B2).
3. **Section order** — accept or reject the override of §4.2, and decide whether the proof strip survives (S1, S2).
4. **Flagship** — AI Financial Analyst or thesis in the wide slot, MedBot narrow until a repo exists (S3).
5. **Structural move** — ledger or experience spine. This is the decision that determines whether the site is an adaptation or a reskin (S8, §7).
6. **Placeholders that must be answered, not defaulted:** availability date, MedBot URL, domain.
