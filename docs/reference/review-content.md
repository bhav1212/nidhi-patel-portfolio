# Adversarial fidelity review — `content-map.md`

**Reviewed:** `docs/reference/content-map.md` (759 lines)
**Against:** `data/nidhi-patel.json`, `Nidhi_Patel_Resume_DataEng (2).pdf`, `MASTER_PROMPT.md` §2 and §7.
**Method:** every drafted sentence, number, date, title, credential and URL checked against a JSON path or CV line; arithmetic recomputed; links compared byte-for-byte; privacy fields checked; spelling checked; draft prose compared with the reference extraction documents for voice reuse.

**Verdict:** the factual spine is sound — links, dates, employer names, degree status, credential IDs and the 60-skill count all match. One fabricated tool attribution is a blocker. The main weaknesses are the 49-month audit (wrong), several compliance claims that misdescribe `MASTER_PROMPT.md` §7.6, invented case-study history, and internal count errors.

---

## BLOCKER

### B1. Databricks attributed to Barkow in the H1 rotator
- **Quote (line 176):** "`Databricks pipelines` — Miles & More, Barkow Consulting, three Databricks credentials"
- **Evidence:** `experience[1].stack` for Barkow is `["Python","SQL","ETL Pipelines","Anomaly Detection","Geospatial Data"]`. No Azure Databricks appears anywhere in Barkow's entry. Only Miles & More (`experience[0].stack`) and the three Databricks certifications support the phrase.
- **Correction:** "`Databricks pipelines` — Miles & More, three Databricks credentials". Do not attach Barkow to Databricks in any surface. (Line 202's unattributed "Databricks pipelines" is fine.)

---

## SHOULD FIX

### S1. The 49-month audit is arithmetically wrong under every consistent convention
- **Quote (line 41):** "Summing listed employment (Amprion 6 months + Vonovia 12 + Barkow 28 + Miles & More ~3, to 21 November 2026) gives **49 months ≈ 4 years 1 month**, excluding the five-month gap between Amprion and Vonovia."
- **Evidence:** inclusive month count = 6 + 12 + **29** + 3 = **50**. Elapsed count = 5 + 11 + 28 + 2 = **46**. 49 mixes conventions (Barkow is elapsed, Amprion is inclusive). The Amprion→Vonovia gap is **4 calendar months** (10/2022–01/2023); it is 5 only as a date difference.
- **Correction:** "50 months of listed employment (04/2022–11/2026 = 55 months, less the 5-month elapsed gap) ≈ 4 years 2 months." The published "4+ years" still holds; the arithmetic and method do not.
- **Why it matters:** line 41 says this method should be copied into `docs/content-guide.md`, so the error propagates.

### S2. "§7.6 makes Languages a seventh block" is false
- **Quote (line 335):** "that list makes "Languages" a seventh capability block."
- **Evidence:** `MASTER_PROMPT.md` §7.6 enumerates exactly six blocks, with Languages at **6**, not 7.
- **Correction:** "makes Languages its sixth block."

### S3. Core-stack row of eight contradicts §7.6's "6 only"
- **Quotes (lines 74, 543):** "Static, wrapping "Core stack" row of eight mono chips"; "A static "Core stack" row of eight of Nidhi's own tools".
- **Evidence:** §7.6: "Top strip (6 only): Python · SQL · Azure Databricks · LangChain · PyTorch · Tableau."
- **Correction:** use the six named tools, or record an explicit, gate-approved deviation. Do not silently ship eight.

### S4. Component counts do not match the document's own tables
- **Quotes (lines 124–126):** "**KEEP:** 11 (… = 12 counting the icon micro-interaction)"; "**ADAPT:** 17."; "**ADD:** 9."
- **Recount:** KEEP = **12** (the parenthetical enumerates 12); ADAPT = **13** (A.1: 3, A.2: 2, A.3: 7, A.4: 1); ADD = **11** (A.2: 2 + A.5: 9); DROP = 12 (correct).
- **Correction:** KEEP 12 · ADAPT 13 · ADD 11 · DROP 12.

### S5. "Team | One" violates the §2 and Appendix A ban on invented team sizes
- **Quotes (lines 432, 468, 758):** at-a-glance "| Team | One |"; "| Role | Solo personal project |"; Appendix: "a team size for projects" is in the never-appear list.
- **Evidence:** JSON gives `role: "Personal project"` only; it never states team size. "Solo" is an inference.
- **Correction:** "| Team | `[confirm]` — personal project, presumed solo |". If "solo" is kept, label it derived and get owner sign-off.

### S6. Unsourced claim about the public repository's contents
- **Quote (line 480):** "No evaluation harness exists in the repository".
- **Evidence:** the JSON links the repo but records nothing about its internals. This is only permissible if verified by reading the public repo, and the document does not say it was.
- **Correction:** "No benchmark result is published." Or verify the repo and cite it.

### S7. Invented project history in the MedBot case study
- **Quotes (lines 443–444):** "local FAISS over a hosted vector store (no infrastructure dependency)"; "a single container over split services"; "What the pipeline removed: the manual checklist."
- **Evidence:** none of these rejected alternatives or the prior manual checklist appears in `projects[0]` or the CV. Only the Flask/FastAPI line is hedged with `[confirm]`.
- **Correction:** mark all three `[confirm]` and let the owner supply the decisions; or reduce the section to the CV facts (LangChain, FAISS, Flask, Docker, Jenkins, Trivy).

### S8. Routing rationale is invented; the `[confirm]` covers the wrong thing
- **Quote (line 478):** "Why routing exists (cheap model for extraction, stronger model for synthesis — `[confirm]` which models)"
- **Evidence:** `projects[1].highlights[2]` says "model routing" but gives no cost/quality rationale. The hedge only covers model identity.
- **Correction:** "Why routing exists (`[confirm]` — owner to supply the reason)."

### S9. "retrieved filings" and "cited inputs" are not in the JSON
- **Quote (line 267):** "figures grounded in retrieved filings and live market data rather than model memory"; line 269: "the report is assembled from cited inputs".
- **Evidence:** `projects[1].highlights[1]` says "RAG-style grounding and tool calling with live financial and web data via APIs". No filings, no citations.
- **Correction:** "grounded in retrieved sources and live market and web data"; "assembled from retrieved inputs" (drop "cited" unless citations exist).

### S10. Repo count contradicts itself
- **Quotes (lines 289, 752):** "One is a public repository, one is a public report, and one is method-only"; Appendix: "two public repositories and a thesis report".
- **Evidence:** the thesis has both a GitHub repo (`projects[2].links.github`) and a report.
- **Correction:** "Two are public repositories, one of which ships a public report; the third is method-only." The present sentence undercounts the public repos and reads as if only AI Financial is public.

### S11. "PRODUCTION RAG" tag contradicts the document's own mitigation
- **Quotes (lines 249, 684):** "tag `PRODUCTION RAG`" vs G.1 #7 "Reserve "production" for employer work".
- **Evidence:** the CV subtitle is "Production RAG & LLM Application", so the tag is traceable, but the document cannot both publish it and tell the build to avoid "production".
- **Correction:** pick one — tag it `RAG · LLM APPLICATION` and keep the CV subtitle as a citation, or delete the G.1 #7 recommendation. Do not do both.

### S12. "client-facing" and "a financial-services client" are not supported
- **Quotes (line 682):** "Barkow work was client-facing"; "Barkow: "a financial-services client"".
- **Evidence:** `experience[1]` says "Collaborated with technical teams" and "coordinated research outputs with stakeholders"; domain is "Consulting / geospatial & financial data". No client, no client sector.
- **Correction:** "Barkow: publish method only; genericise any counterparty as 'a client' unless cleared."

### S13. Appendix calls a shortened title the "exact title"
- **Quote (line 738):** "| "Data Analytics Intern, Miles & More (Lufthansa Group)" | `experience[0].role`, `.company` | Exact title; do not shorten to "Data Scientist" |"
- **Evidence:** the exact role is "Data Analytics Intern – Marketing, Strategy & Customer Insights".
- **Correction:** quote the full role, or change the note to "role type exact; department omitted from the meta row, full title in the evidence panel."

---

## NIT

### N1. Word-count labels are wrong
Line 316 "18 words" = 14; line 287 "26 words" = 27; line 424 "22 words" = 19; line 460 "24 words" = 25; line 495 "23 words" = 22; line 200 "35 words" = 36. Recompute or drop the counts.

### N2. "Seven visible per cluster" is not true for cluster 6
Lines 322 and 331: the heading says "Seven visible per cluster", but "Analytics and BI" has six and is marked "(all six visible)". Say "six or seven visible per cluster".

### N3. "Four counts" but the fourth is a date
Line 141: "Four counts that already exist in the CV", while line 239 correctly says "The fourth card is a date, not a quantity." Say "Four checkable facts".

### N4. Font-budget contradiction
Line 656: "Estimate 130–160KB … with a hard fail above 150KB." An estimate that can reach 160KB cannot coexist with a 150KB fail threshold. Raise the threshold or tighten the estimate.

### N5. Unsourced motivation in the About paragraph
Line 343: "which is where I got into the habit of asking how a model actually runs". Not in the JSON or CV. Mark `[confirm]` or replace with a sourced fact (B.E. coursework in AI / Data Mining & BI).

### N6. "scans every image with Trivy" adds a universal
Line 253. The CV says "integrated Trivy for container vulnerability scanning". Write "that scans the built image with Trivy".

### N7. Unspecified superlative
Line 247: "the thesis is the deepest work". No source for a ranking of her own work. Say "the most substantial artefact" or drop it.

### N8. "anomaly models" vs the source wording
Line 175 and line 194. The JSON says "Anomaly Detection"; the thesis says "context-aware anomaly detection framework". Use "anomaly detection" in the rotator and the accessible text.

### N9. "hold up outside a notebook" asserts evidence the document says does not exist
Lines 168, 194, 198 vs D.1 §5 and D.2 §4 ("not measured"). This is process language presented as an outcome claim. Either use the approved §7.1 line "hold up in production" with owner sign-off, or say "built to run outside a notebook".

### N10. Ambiguous "§2" cross-reference
Line 143: "Employer names already appeared in §2". No numbered §2 exists in this document; employers first appear in §C.2 and in `MASTER_PROMPT.md` §7.2. Name the target.

---

## Points that are clean

- **Privacy.** No phone number, no street address, no personal email anywhere. `phonePublic: false` is respected; location is city-level only ("Frankfurt am Main"). Datenschutz itself names no processor. Clean.
- **Links.** All four URLs are byte-identical to the JSON: AI Financial GitHub, thesis GitHub, thesis report PDF (including `%20` escapes). No invented or retyped link. Clean.
- **Degree status.** "expected 12/2026" and "coursework complete; degree award pending final credit registration" throughout; never "graduate", never "(2026)". Clean.
- **Employers and dates.** Miles & More 09/2026–present, Barkow 02/2024–06/2026, Vonovia 02/2023–01/2024, Amprion 04/2022–09/2022, M.Sc. 10/2020–12/2026, B.E. 07/2015–05/2019 — all match the JSON and CV. No wrong date format. Clean.
- **Credentials.** Three certifications, exact names with the hyphen preserved, IDs `189213182` and `183902279` correct, ID-less credential handled explicitly. Clean.
- **Skills.** 60 items in six categories = 12+14+9+11+8+6; every item verbatim from `skills[]`. Clean.
- **British spelling.** Consistent in prose (modelling, behaviour, colour, containerised, genericise, oxidised, artefact). "color" appears only in CSS identifiers (`color-scheme`, `theme-color`) and "artifact" only inside the `upload-pages-artifact` action name. Clean.
- **Reference voice.** No lifted reference copy: the reference H1 ("I build production AI in research and industry") is not reused, and the three drafts are original. The debt is structural, as declared. Clean.
