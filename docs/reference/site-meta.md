# Reference site: head, SEO, theming, i18n, deployment

Source: `/tmp/ref-site` snapshot of `bhav1212/mysite` (private), studied 2026-11-21.
This document records what the reference does, verbatim where it matters, and ends
with what the Nidhi Patel portfolio must do differently.

**Provenance caveats**

- `site/assets/` (fonts, images, résumé, social card) is **not present** in the
  snapshot. Font byte sizes therefore cannot be measured from these files. The
  live `https://bhaveshjain.com/` was checked and is now a different Next.js
  build (unhashed `/assets/fonts/*.woff2` return 404), so it cannot supply the
  missing sizes either. Do not copy a size number from this document; none is
  verifiable.
- `.well-known/security.txt` is **not in the snapshot** but does exist live; its
  live contents are recorded in §6.5 with that caveat.
- `scripts/build-site.py`, `scripts/update-blog.py`, `site-blog/`, and
  `site-travel/` are referenced by the README/workflow but are not in the
  snapshot. Behaviour below is what the surviving files prove, not what the
  scripts might do.

## File inventory

| File | Lines | Role |
| --- | ---: | --- |
| `site/index.html` | 519 | English page; full head, JSON-LD, body |
| `site/de/index.html` | 521 | German page; hand-maintained duplicate |
| `site/styles.css` | — | 6 `@font-face` blocks, dark-default tokens |
| `site/theme.js` | 30 | Pre-paint theme application and toggle |
| `site/script.js` | 282 | Nav, reveal, counters, scroll chrome |
| `site/robots.txt` | 6 | Crawl allow + three sitemaps |
| `site/sitemap.xml` | 22 | Two URLs with `xhtml:link` alternates |
| `site/manifest.json` | 15 | PWA manifest |
| `site/llms.txt` | 34 | LLM/AEO discovery file |
| `site/README.md` | 167 | Build/deploy/fonts/release checks |
| `docs/github-pages-migration.md` | 157 | DNS, Cloudflare, rollback record |
| `.github/workflows/publish-sites.yml` | 96 | Build three sites, publish three repos |

---

## 1. Head, meta, canonical, hreflang, Open Graph, Twitter

### 1.1 Exact English head order (`site/index.html:1-38`, `:148-150`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Bhavesh Jain — data scientist in Heilbronn, Germany. Machine learning systems for forecasting, LLM evaluation, and strategic foresight, at Fraunhofer ISI and the Joint Innovation Hub." />
<meta name="keywords" content="Bhavesh Jain, data scientist, machine learning, LLM evaluation, strategic foresight, time series forecasting, Fraunhofer ISI, Heilbronn" />
<meta name="author" content="Bhavesh Jain" />
<meta name="theme-color" content="#fafaf7" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#0a0a10" media="(prefers-color-scheme: dark)" />
<link rel="canonical" href="https://bhaveshjain.com/" />
<link rel="alternate" href="https://bhaveshjain.com/" hreflang="en" />
<link rel="alternate" href="https://bhaveshjain.com/de/" hreflang="de" />
<link rel="alternate" href="https://bhaveshjain.com/" hreflang="x-default" />

<meta property="og:site_name" content="Bhavesh Jain" />
<meta property="og:title" content="Bhavesh Jain — Data Scientist, Germany" />
<meta property="og:description" content="Machine learning systems for forecasting, LLM evaluation, and strategic foresight — in research and in production." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://bhaveshjain.com/" />
<meta property="og:image" content="https://bhaveshjain.com/assets/social-card.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:alt" content="Bhavesh Jain — Data Scientist" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://bhaveshjain.com/assets/social-card.png" />
<meta name="twitter:image:alt" content="Bhavesh Jain — Data Scientist" />

<title>Bhavesh Jain · Data Scientist · Heilbronn, Germany</title>
<script src="/theme.js"></script>
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<link rel="icon" sizes="any" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="alternate" type="application/rss+xml" title="Bhavesh Jain — Writing" href="https://blog.bhaveshjain.com/feed.xml" />

<script type="application/ld+json"> … §2 … </script>

<link rel="preload" href="/assets/fonts/geist-400-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/assets/fonts/fraunces-400-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="styles.css" />
</head>
```

### 1.2 German head deltas (`site/de/index.html:1-38`)

Identical tag set except:

| Item | English | German |
| --- | --- | --- |
| `<html lang>` | `en` | `de` |
| `description` | English text | German text |
| `keywords` | English text | German text |
| `author` | present | **absent** |
| canonical | `https://bhaveshjain.com/` | `https://bhaveshjain.com/de/` |
| `og:title` | `Bhavesh Jain — Data Scientist, Germany` | `Bhavesh Jain — Data Scientist · Deutschland` |
| `og:description` | English | German |
| `og:url` | `https://bhaveshjain.com/` | `https://bhaveshjain.com/de/` |
| `og:locale` | **absent** | `de_DE` |
| `<title>` | `… Heilbronn, Germany` | `… Heilbronn, Deutschland` |

The hreflang triple is byte-identical on both pages:

```html
<link rel="alternate" href="https://bhaveshjain.com/" hreflang="en" />
<link rel="alternate" href="https://bhaveshjain.com/de/" hreflang="de" />
<link rel="alternate" href="https://bhaveshjain.com/" hreflang="x-default" />
```

### 1.3 What is deliberately present

- `theme-color` has two declarations keyed to `prefers-color-scheme` — but see
  §4.4: the page theme itself does not follow the OS.
- Absolute canonical on every page; trailing slash on the German URL.
- `og:image` is absolute, 1200×630, typed, and has alt text.
- `twitter:card` is `summary_large_image`.
- RSS autodiscovery points at the separate blog host, from both languages.
- Icons: SVG (any), `/favicon.ico`, 180×180 Apple touch icon.
- JSON-LD is a single `@graph` block, not microdata and not RDFa.

### 1.4 What is missing or weak (inherit only knowingly)

| Gap | Consequence |
| --- | --- |
| No `og:locale` on English | Inconsistent with `de_DE`; English falls back to `en_US` heuristics |
| No `og:locale:alternate` on either page | Weak locale-pair signal to social parsers |
| No `twitter:title`, `twitter:description`, `twitter:site`, `twitter:creator` | Twitter/X falls back to OG; no attribution |
| No `og:image:secure_url` | Rarely needed on HTTPS, but incomplete |
| No `meta name="robots"` | Fine for allow-all, but nothing per-page |
| `meta keywords` present | Ignored by Google since 2009; dead weight, slight footprint |
| No `color-scheme` meta/CSS property | Form controls and scrollbars can mismatch the theme |
| No `og:type=profile` or `article` | Always `website`; correct for a single-page portfolio but flat |
| No `twitter:url` | Not a real tag; listed here to prevent inventing one |
| JSON-LD placed **before** font preloads | Preload discovery is later than necessary in the byte stream |
| `theme.js` is synchronous in `<head>` | One extra blocking round trip before CSS (§4.3) |
| No CSP meta | Headers are applied at Cloudflare only (§8.4) |
| No `<noscript>` | Acceptable: content is in HTML; JS only enhances |

---

## 2. JSON-LD graph

One script, `application/ld+json`, one `@graph` array, five entities. Only the
`Person` node has an `@id`; the four articles reference it by `@id`. No
`WebSite`, `ProfilePage`, `BreadcrumbList`, or `mainEntityOfPage`.

### 2.1 Entity map

| # | `@type` | Identifying properties | Links |
| ---: | --- | --- | --- |
| 0 | `Person` | `name`, `url`, `image`, `jobTitle`, `worksFor`, `knowsAbout`, `address`, `email`, `sameAs`, `@id` | `@id = https://bhaveshjain.com/#person` |
| 1 | `ScholarlyArticle` | `headline`, `name`, `datePublished`, `sameAs`, `identifier`, `publisher` | `author.@id` → person |
| 2 | `ScholarlyArticle` | same shape | `author.@id` → person |
| 3 | `ScholarlyArticle` | same shape, **no `publisher`** | `author.@id` → person |
| 4 | `ScholarlyArticle` | same shape, **no `publisher`** | `author.@id` → person |

### 2.2 Full English graph (exact)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Bhavesh Jain",
      "url": "https://bhaveshjain.com/",
      "image": "https://bhaveshjain.com/assets/profile.jpg",
      "jobTitle": "Data Scientist",
      "worksFor": {
        "@type": "Organization",
        "name": "Fraunhofer-Institut für System- und Innovationsforschung ISI",
        "url": "https://www.isi.fraunhofer.de/"
      },
      "knowsAbout": [
        "Data Science",
        "Machine Learning",
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "Multi-Agent Systems",
        "MLOps",
        "Time Series Forecasting",
        "Strategic Foresight"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Heilbronn",
        "addressCountry": "DE"
      },
      "email": "mailto:hello@bhaveshjain.com",
      "sameAs": [
        "https://www.linkedin.com/in/bhav1212/",
        "https://github.com/bhav1212"
      ],
      "@id": "https://bhaveshjain.com/#person"
    },
    {
      "@type": "ScholarlyArticle",
      "headline": "From Black Box to Glass Box: Designing Transparent Multi-agent Systems for Enterprise Users",
      "name": "From Black Box to Glass Box: Designing Transparent Multi-agent Systems for Enterprise Users",
      "datePublished": "2026",
      "sameAs": "https://doi.org/10.1007/978-3-032-29586-6_24",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "DOI",
        "value": "10.1007/978-3-032-29586-6_24"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Springer Nature Switzerland"
      },
      "author": { "@id": "https://bhaveshjain.com/#person" }
    },
    {
      "@type": "ScholarlyArticle",
      "headline": "Multi-agent Retrieval-Augmented Generation for Enhancing Answer Generation and Knowledge Retrieval",
      "name": "Multi-agent Retrieval-Augmented Generation for Enhancing Answer Generation and Knowledge Retrieval",
      "datePublished": "2025",
      "sameAs": "https://doi.org/10.1007/978-3-032-05179-0_22",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "DOI",
        "value": "10.1007/978-3-032-05179-0_22"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Springer Nature Switzerland"
      },
      "author": { "@id": "https://bhaveshjain.com/#person" }
    },
    {
      "@type": "ScholarlyArticle",
      "headline": "Predicting Tech Readiness through Bibliometric Analysis using Unsupervised Machine Learning",
      "name": "Predicting Tech Readiness through Bibliometric Analysis using Unsupervised Machine Learning",
      "datePublished": "2025",
      "sameAs": "https://doi.org/10.24406/publica-5777",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "DOI",
        "value": "10.24406/publica-5777"
      },
      "author": { "@id": "https://bhaveshjain.com/#person" }
    },
    {
      "@type": "ScholarlyArticle",
      "headline": "Fallstudienbasierte Analyse der Integration generativer KI-Werkzeuge in die strategische Vorausschau",
      "name": "Fallstudienbasierte Analyse der Integration generativer KI-Werkzeuge in die strategische Vorausschau",
      "datePublished": "2025",
      "sameAs": "https://digital.ub.uni-paderborn.de/doi/10.17619/UNIPB/1-2467",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "DOI",
        "value": "10.17619/UNIPB/1-2467"
      },
      "author": { "@id": "https://bhaveshjain.com/#person" }
    }
  ]
}
```

### 2.3 German graph deltas

The German block is 3,687 characters vs 3,680 for English. Exactly two changes:

1. `Person.url` → `https://bhaveshjain.com/de/`.
2. Four `knowsAbout` strings translated:
   `Large Language Models` → `Große Sprachmodelle`,
   `Multi-Agent Systems` → `Multi-Agenten-Systeme`,
   `Time Series Forecasting` → `Zeitreihen-Forecasting`,
   `Strategic Foresight` → `Strategische Vorausschau`.

Everything else, including `Person.@id`, is identical. Article titles stay in
their published language (correct).

### 2.4 Observations

- `@id` linking is correct and minimal: one canonical person node, N article
  nodes pointing at it.
- Nested `"@context"` inside the `Person` is redundant (already at the graph
  root). Harmless, but noise.
- Articles have **no `@id`**, so nothing else can reference them and they cannot
  be deduplicated across pages.
- `email` is a `mailto:` URI; schema.org expects a plain address. Both parse,
  but plain text is the cleaner value.
- `worksFor` has no `@id`; the employer cannot be resolved as an entity.
- `image` points at `profile.jpg` while the page serves `profile.webp` first.
  Acceptable, but the structured-data image should ideally match the primary.
- `datePublished` is a year string (`"2026"`), not an ISO date. Google accepts
  year-only for older scholarship; `Date` is preferable when known.
- No `description`, `alumniOf`, `hasCredential`, `award`, or ORCID/Scholar in
  `sameAs`. For a portfolio, `alumniOf` and `hasCredential` are the notable
  omissions.
- No `ProfilePage` wrapper, so Google has no page-level entity tying the URL to
  the person. For a personal portfolio, `ProfilePage` + `mainEntity` is the
  stronger shape.

---

## 3. Font loading

### 3.1 Strategy

Self-hosted, no third-party font host, no `preconnect`. Six files: three families
× two subsets (Latin, Latin Extended). One URL per family/subset is reused across
all weights, so a weight change does not download another file. Declarations live
at the top of `site/styles.css` (lines 1–55), not in the HTML.

### 3.2 Declared faces

| Family | `font-weight` declared | `font-style` | Subsets | Files | Preloaded |
| --- | --- | --- | --- | --- | --- |
| Fraunces | `400` (single weight) | `normal` | latin, latin-ext | `fraunces-400-latin.woff2`, `fraunces-400-latin-ext.woff2` | latin only |
| Geist | `100 900` (variable) | `normal` | latin, latin-ext | `geist-400-latin.woff2`, `geist-400-latin-ext.woff2` | latin only |
| JetBrains Mono | `400 800` (variable) | `normal` | latin, latin-ext | `jetbrains-mono-400-latin.woff2`, `jetbrains-mono-400-latin-ext.woff2` | **none** |

All six declarations use `font-display: swap`. None declare italic. The stylesheet
still applies `font-style: italic` to `.serif`, so the browser synthesises an
oblique Fraunces — an intentional-looking but faux italic.

### 3.3 Preloads

Exactly two, both in the head after the JSON-LD and before the stylesheet:

```html
<link rel="preload" href="/assets/fonts/geist-400-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/assets/fonts/fraunces-400-latin.woff2" as="font" type="font/woff2" crossorigin />
```

- `crossorigin` is present, which is mandatory for font preloads even same-origin.
- JetBrains Mono is not preloaded although mono labels appear above the fold
  (nav meta, stats, eyebrows). That is one late request on first paint.
- Latin-ext is not preloaded. Correct for English; the German page uses umlauts
  that live in Latin-1 (`U+00E4`, `U+00F6`, `U+00FC`, `U+00DF`), covered by the
  Latin subset, so German does not need latin-ext for its own copy.
- No `media` attribute on preloads, so both download regardless of viewport.

### 3.4 Unicode ranges (identical per subset across all three families)

Latin:

```text
U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
```

Latin Extended:

```text
U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF
```

### 3.5 File sizes

**Not measurable from this snapshot.** `site/assets/fonts/` is absent, and the
live site no longer serves these unhashed paths (all six return HTTP 404). The
table below records only what is provable; every size cell would be a guess and
is therefore left out.

| File | Size | Evidence |
| --- | --- | --- |
| `fraunces-400-latin.woff2` | unknown | absent from snapshot |
| `fraunces-400-latin-ext.woff2` | unknown | absent from snapshot |
| `geist-400-latin.woff2` | unknown | absent from snapshot |
| `geist-400-latin-ext.woff2` | unknown | absent from snapshot |
| `jetbrains-mono-400-latin.woff2` | unknown | absent from snapshot |
| `jetbrains-mono-400-latin-ext.woff2` | unknown | absent from snapshot |

What the README does assert: Geist is a variable font covering 100–900 and
JetBrains Mono covers 400–800; each family/subset uses a single URL across
weights. Treat the `-400-` in the filenames as a build label, not as a static
single-weight file.

**Action for the new site:** record actual `Content-Length` (or `stat -c %s`)
for every shipped WOFF2 in a font budget table, and fail CI if the total
exceeds the budget. Do not inherit an unmeasured font stack.

---

## 4. `theme.js`: pre-paint approach

Full file (`site/theme.js`, 30 lines):

```js
(() => {
  const root = document.documentElement;
  root.classList.add('has-js');
  try {
    if (localStorage.getItem('theme') === 'light') root.dataset.theme = 'light';
  } catch {}

  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.theme-toggle');
    const sync = () => {
      const light = root.dataset.theme === 'light';
      const german = root.lang === 'de';
      buttons.forEach(button => {
        const label = german
          ? (light ? 'Dunkles Design aktivieren' : 'Helles Design aktivieren')
          : (light ? 'Switch to dark theme' : 'Switch to light theme');
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
      });
    };
    buttons.forEach(button => button.addEventListener('click', () => {
      const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      if (theme === 'light') root.dataset.theme = 'light';
      else root.removeAttribute('data-theme');
      try { localStorage.setItem('theme', theme); } catch {}
      sync();
    }));
    sync();
  });
})();
```

### 4.1 Mechanism

| Question | Answer |
| --- | --- |
| Flash prevention | Synchronous external script in `<head>` (line 31), **before** the stylesheet at line 150. It sets `data-theme` before first paint. |
| Storage key | `theme` (unprefixed, global to the origin — shared by all sub-sites on the apex, not by `blog.`/`travel.` subdomains). |
| Stored values | `"light"` or `"dark"`. Only `"light"` is read back; anything else means dark. |
| Default state | **Dark.** No `data-theme` attribute, and `:root` carries the dark tokens (`--bg: #0a0a10`, `--text: #f4f4f8`). Light is the override (`[data-theme="light"]`, `styles.css:117`). |
| OS preference | **Not consulted.** No `prefers-color-scheme` in JS or CSS. First visit is always dark. |
| Storage failure | `try/catch` around both get and set; private mode or blocked storage leaves the page usable, just not persistent. |
| Button discovery | `.theme-toggle`, one per page. |
| Accessibility sync | `aria-label` and `title` updated on load and on toggle; German labels chosen from `root.lang === 'de'`. |
| `has-js` | Added to `<html>` before paint, allowing CSS to gate JS-dependent UI. |
| No-JS result | Dark theme, toggle inert, no error. Content remains readable. |

### 4.2 Pre-paint ordering

`<script src="/theme.js">` → JSON-LD → two font preloads → `styles.css`.

Because the script is parser-blocking and same-origin, it is fetched and executed
before the stylesheet is applied. That is the flash fix. The cost is one extra
round trip in the critical path; an inline script would remove it but conflicts
with a strict `script-src` policy that forbids `'unsafe-inline'`.

### 4.3 Problems worth not inheriting

- **Extra blocking request.** For a 30-line script, inline is faster. If CSP is a
  priority, use a hash (`script-src 'sha256-…'`) rather than a separate file.
- **No system-preference default.** A user with `prefers-color-scheme: light`
  still gets dark on first visit. The reference chose brand-first over
  user-first; the new site should choose user-first.
- **Uppercase storage key collision risk.** `theme` is generic; any other app on
  the same origin can collide. Namespace it (`np-theme`).
- **Handle-removal idiom.** Dark is represented by the *absence* of an attribute.
  That works but makes “explicit dark” and “no preference” indistinguishable.
  Prefer `data-theme="dark"` / `"light"` explicitly, with a stored tri-state
  (`light` / `dark` / absent = system).
- **No cross-tab sync.** A `storage` event listener is absent, so two open tabs
  can disagree until reload.

### 4.4 `theme-color` inconsistency

The `<meta name="theme-color">` pair keys off the **OS** preference
(`prefers-color-scheme`), while the page keys off **localStorage** only. A
light-OS user therefore gets a light browser chrome around a dark page until
they toggle. The new site must drive both from the same resolved theme, and also
set `color-scheme: dark` / `light` so native controls match.

---

## 5. i18n: how the German page is built

### 5.1 Build method

There is no i18n framework and no generation step visible in the snapshot. The
German page is a **complete hand-maintained copy** of the English page at
`site/de/index.html`. `styles.css`, `script.js`, and `theme.js` are shared.

Measured facts:

| Metric | English | German |
| --- | ---: | ---: |
| Bytes | 24,753 | 25,156 |
| Lines | 519 | 521 |
| `<section>` | 7 | 7 |
| `<h1>` / `<h2>` / `<h3>` | 1 / 6 / 9 | 1 / 6 / 9 |
| `<a>` | 45 | 45 |
| Structural tag sequence | 75 elements | 75 elements, same order |
| Positionally identical lines (same line number) | — | 150 of ~520 |
| Line-level similarity | — | 0.760 |

So: the *skeleton* is identical; the *prose* is fully duplicated and manually
translated.

### 5.2 What is duplicated

- Every section: hero, work, publications, record, writing, about, contact,
  footer.
- Navigation, icons, SVGs, skip link, scroll-progress element.
- All asset references (`/theme.js`, `styles.css`, `script.js`, favicons,
  manifest, RSS link, résumé PDF, portrait `<picture>`).
- The full JSON-LD graph, including all four article nodes.
- Meta boilerplate: OG dimensions, Twitter card, theme-color pair.

### 5.3 What is translated

- Visible prose, headings, button labels, nav labels.
- `<title>`, `description`, `keywords`, `og:title`, `og:description`.
- `aria-label` / `title` on the theme toggle (via `root.lang` in `theme.js`).
- `Person.url` and four `knowsAbout` terms in JSON-LD.
- Language-toggle labels: EN page links `de/` labelled “Deutsche Version”;
  DE page links `../` labelled “English version”.

### 5.4 What is intentionally **not** translated

- Publication titles and venue strings (published language).
- DOI strings.
- `og:site_name` (“Bhavesh Jain”).
- `og:image:alt` and `twitter:image:alt` remain English on the German page.
- Quoted English content has no `lang="en"` annotation, so screen readers may
  pronounce it with German phonetics.

### 5.5 Link reciprocity

Fully reciprocal:

| Surface | English | German |
| --- | --- | --- |
| Canonical | `/` | `/de/` |
| hreflang `en` | `/` | `/` |
| hreflang `de` | `/de/` | `/de/` |
| hreflang `x-default` | `/` | `/` |
| Header toggle | `href="de/"` | `href="../"` |
| Footer link | `href="de/"` (“Deutsch”) | `href="../"` (“English”) |
| Sitemap | both URLs, each with all three alternates | same |

`x-default` resolves to English. Both language versions are in `sitemap.xml`
with `xhtml:link` alternates, which is the correct pattern.

### 5.6 Drift risk

The two files already differ by two lines, and the workflow does **not** check
translation parity (it only runs `update-blog.py --check`, which covers the blog).
Any English edit must be manually mirrored. There is no placeholder check, no
missing-key report, no build failure on divergence.

For a single-language new site this entire class of bug disappears. If German is
ever added, generate both trees from one content source and fail CI on parity.

---

## 6. Discovery and policy files

### 6.1 `manifest.json`

```json
{
  "name": "Bhavesh Jain — Data Scientist",
  "short_name": "Bhavesh Jain",
  "description": "Machine learning systems for forecasting, LLM evaluation, and strategic foresight.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#0a0a10",
  "theme_color": "#0a0a10",
  "lang": "en",
  "icons": [
    { "src": "/assets/favicon.svg", "type": "image/svg+xml", "sizes": "any", "purpose": "any" },
    { "src": "/assets/apple-touch-icon.png", "type": "image/png", "sizes": "180x180" }
  ]
}
```

Purpose: installability and Android splash/theme. Notes: colours are dark-only
(no light variant), there is no `id`, no `maskable` icon, no screenshots, and
`lang` is `en` only — the German page still points at this same manifest.

### 6.2 `robots.txt`

```text
User-agent: *
Allow: /

Sitemap: https://bhaveshjain.com/sitemap.xml
Sitemap: https://blog.bhaveshjain.com/sitemap.xml
Sitemap: https://travel.bhaveshjain.com/sitemap.xml
```

Purpose: allow all crawling; advertise the three per-host sitemaps. No
`Disallow`, no `Crawl-delay`, no `Host`. Because the sites are on separate
hostnames, each host needs its own `robots.txt`; this snapshot only proves the
apex one.

### 6.3 `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://bhaveshjain.com/</loc>
    <lastmod>2026-09-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://bhaveshjain.com/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://bhaveshjain.com/de/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://bhaveshjain.com/"/>
  </url>
  <url>
    <loc>https://bhaveshjain.com/de/</loc>
    <lastmod>2026-09-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://bhaveshjain.com/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://bhaveshjain.com/de/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://bhaveshjain.com/"/>
  </url>
</urlset>
```

Purpose: two language URLs, reciprocal alternates. It is manually written;
`lastmod` is a single hand-set date, `changefreq`/`priority` are ignored by
Google. Blog and travel have their own sitemaps, referenced from `robots.txt`.
No `<url>` for the résumé PDF or section anchors (correct).

### 6.4 `llms.txt`

34 lines. Structure:

```text
# Bhavesh Jain
> Data scientist in Heilbronn, Germany. … (summary blockquote, 4 lines)
(Note: static HTML; Cloudflare may apply security checks; content free to cite with attribution.)
## Site
- [Home](https://bhaveshjain.com/): work, publications, writing, about
- [German version](https://bhaveshjain.com/de/): same content, in German
- [Résumé (PDF)](https://bhaveshjain.com/assets/resume.pdf)
## Writing
- [Blog](https://blog.bhaveshjain.com/) …
- [Product development](https://blog.bhaveshjain.com/#product) …
- [RSS feed](https://blog.bhaveshjain.com/feed.xml)
- [How to actually evaluate an LLM application](…) … flagship piece
## Work
- Vorschau … / JIH Trend Radar … / Air cargo demand forecasting …
## Elsewhere
- GitHub / LinkedIn / Travel notes
```

Purpose: AEO/LLM discovery — a curated map of canonical pages with one-line
descriptions. Notes: it is **not linked from the HTML or from `robots.txt`**, so
discovery relies on convention (`/llms.txt`) and crawler support. It duplicates
facts that can drift from the page (publication count, flagship article). The
Cloudflare sentence is a transparency note, not a licence.

### 6.5 `security.txt`

**Not present in the snapshot.** There is no `site/.well-known/` directory.
The live site does serve one at `https://bhaveshjain.com/.well-known/security.txt`
(checked 2026-11-21), contents:

```text
Contact: mailto:hello@bhaveshjain.com
Expires: 2027-08-22T00:00:00.000Z
Preferred-Languages: en, de
Canonical: https://bhaveshjain.com/.well-known/security.txt
```

Purpose (RFC 9116): tell security researchers where to report vulnerabilities,
with an expiry so stale contacts do not linger. The live file is valid and
future-dated. The snapshot's omission means it is easy to forget when the site is
rebuilt — the new site must commit it as a real file under `public/.well-known/`,
not rely on a host-level artifact, and add a calendar reminder before `Expires`.

---

## 7. GitHub Pages workflow (`.github/workflows/publish-sites.yml`)

### 7.1 Repo layout it assumes

```text
mysite/                      private source of truth
├── site/                    → bhav1212/mysite-main   → bhaveshjain.com
├── site-blog/               → bhav1212/mysite-blog   → blog.bhaveshjain.com
├── site-travel/             → bhav1212/mysite-travel → travel.bhaveshjain.com
├── scripts/build-site.py    shared builder
├── scripts/update-blog.py   blog metadata/sitemap generator
├── docs/github-pages-migration.md
└── .github/workflows/publish-sites.yml
```

Each site is built **separately** and published to its **own public repository**.
The source repo stays private. `bhav1212.github.io` keeps its existing config and
is not touched.

### 7.2 Triggers

| Event | Filter |
| --- | --- |
| `push` to `main` | paths: `site/**`, `site-blog/**`, `site-travel/**`, `scripts/build-site.py`, `scripts/update-blog.py`, `.github/workflows/publish-sites.yml` |
| `pull_request` | same paths |
| `workflow_dispatch` | none |

`permissions: contents: read`. Concurrency group
`publish-sites-${{ github.ref }}`, `cancel-in-progress: false` — a second push
queues rather than canceling, avoiding a half-published artifact.

### 7.3 `build` job

1. `actions/checkout@v7` with `persist-credentials: false`.
2. `python3 scripts/update-blog.py --check` — fails on stale generated blog
   metadata.
3. For each of `main`, `blog`, `travel`:
   `python3 scripts/build-site.py --site "$site" --output "$RUNNER_TEMP/sites/$site"`,
   then `touch "$RUNNER_TEMP/sites/$site/.nojekyll"`.
4. `actions/upload-artifact@v7`, name `websites`, path `${{ runner.temp }}/sites`,
   `include-hidden-files: true` (needed for `.nojekyll`), `retention-days: 3`.

No dependency installation: the builder uses only the Python standard library.

### 7.4 `publish` job

Gate: `if: github.ref == 'refs/heads/main' && github.event_name != 'pull_request'`.
`needs: build`, `fail-fast: false` so one failed site does not block the others.

| matrix `site` | publishing repo | secret |
| --- | --- | --- |
| `main` | `mysite-main` | `PAGES_MAIN_DEPLOY_KEY` |
| `blog` | `mysite-blog` | `PAGES_BLOG_DEPLOY_KEY` |
| `travel` | `mysite-travel` | `PAGES_TRAVEL_DEPLOY_KEY` |

Steps per matrix leg:

1. `actions/download-artifact@v8` (name `websites`).
2. Fail loudly if `DEPLOY_KEY` is empty.
3. Write the key to `$RUNNER_TEMP/pages-deploy-key` under `umask 077`; `trap` removes it.
4. Write a pinned `known_hosts` line for `github.com` (Ed25519
   `AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl`).
5. `GIT_SSH_COMMAND` with `IdentitiesOnly=yes`, `StrictHostKeyChecking=yes`,
   `UserKnownHostsFile` set to the pinned file.
6. `git clone --depth 1 git@github.com:${GITHUB_REPOSITORY_OWNER}/${TARGET_REPOSITORY}.git`.
7. `rsync -a --delete --exclude='.git/' --exclude='CNAME'` the built site into
   the clone. `--delete` makes the public repo mirror the artifact; excluding
   `CNAME` preserves each Pages repo's custom-domain file.
8. Commit only if `git diff --cached` is non-empty, as
   `github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>`,
   message `Publish $SITE from $GITHUB_SHA`.
9. `git push origin HEAD:main`.

### 7.5 What is published where

| Artifact | Public repo | Branch/folder | Domain |
| --- | --- | --- | --- |
| `sites/main` | `mysite-main` | `main` / root | `bhaveshjain.com` (apex) |
| `sites/blog` | `mysite-blog` | `main` / root | `blog.bhaveshjain.com` |
| `sites/travel` | `mysite-travel` | `main` / root | `travel.bhaveshjain.com` |

Only build output enters the public repos. Each has `.nojekyll` (so files and
directories beginning with `_` are served) and its own `CNAME`. Each has a
write-enabled deploy key; only the private key lives in the source repo's Actions
secrets.

### 7.6 Why this shape, and its cost

The three-site split exists because each sub-site has its own custom domain and
Pages certificate. A single Pages site cannot serve three hostnames. The cost is
three repos, three deploy keys, three CNAME files, and a cross-repo push that
needs `contents: read` at the workflow level but SSH write access at the repo
level.

For a **single-site** portfolio this is over-engineered. The new site should
build once and deploy with `actions/upload-pages-artifact` +
`actions/deploy-pages` in the same repo, using the built-in `GITHUB_TOKEN` and a
`pages` environment — no deploy keys, no second repo, no rsync.

---

## 8. Migration document: decisions and warnings

Source: `docs/github-pages-migration.md` (157 lines).

### 8.1 Decisions

| Decision | Value |
| --- | --- |
| Domain | `bhaveshjain.com`, plus `www`, `blog`, `travel` |
| Host | GitHub Pages, live since **2026-10-04** |
| Source | Private `bhav1212/mysite` remains the source of truth |
| Publishing | Three public repos, one per hostname |
| Pages source | `main` branch, repository root, `.nojekyll` |
| TLS | GitHub-issued certificates; **Enforce HTTPS** on all three |
| Proxy/CDN | Cloudflare, **Full (strict)**, all four hostnames proxied |
| Redirects | 32 legacy URLs as Cloudflare Bulk Redirects, 301, query strings preserved |
| Headers | Six response headers via a Cloudflare Response Header Transform Rule |
| Caching | HTML `public, max-age=0, must-revalidate`; `cf-cache-status: DYNAMIC` |
| Rollback | Old server webroots + nginx configs retained |

### 8.2 DNS cutover (the part worth copying)

Initial records, **DNS only** (grey cloud) so GitHub can verify and issue certs:

| Type | Name | Content |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `bhav1212.github.io` |
| CNAME | `blog` | `bhav1212.github.io` |
| CNAME | `travel` | `bhav1212.github.io` |

IPv6, if apex AAAA exists, must be replaced with
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
`2606:50c0:8003::153`. After certificates issue, flip to **Proxied** (orange).
CAA, if present, must permit `letsencrypt.org`.

### 8.3 Six response headers

| Header | Value |
| --- | --- |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` |
| `Content-Security-Policy` | `base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'` |
| `Cache-Control` | `public, max-age=0, must-revalidate` |

The CSP is intentionally **not** a strict script policy; it is described as a
baseline that does not break Cloudflare's injected security scripts.

### 8.4 Warnings worth inheriting

1. **Export DNS before touching it.** Public lookup cannot reveal a proxied
   record's origin.
2. **Verify the domain in GitHub first**, via a TXT record that must be kept.
3. **Publish and enable Pages before pointing DNS** at GitHub.
4. **CNAME target has no protocol, path, or repo name.** `bhav1212.github.io`,
   nothing else.
5. **Do not leave old AAAA records.** They silently override IPv4 for some
   clients.
6. **CAA must allow Let's Encrypt**, or certificate issuance fails quietly.
7. **DNS-only records bypass Cloudflare rules.** Redirects and headers only work
   after proxying.
8. **Certificate issuance can take 24 hours.** Plan the cutover accordingly.
9. **Cloudflare expression-editor gotcha:** paste into “Edit expression”, not a
   hostname or URL-pattern field. If the preview contains
   `http.request.full_uri wildcard`, it was entered as a URL pattern.
10. **Do not cache HTML for a long fixed duration.** Revalidate; the builder
    hashes assets.
11. **Purge the hostnames after cutover**, or old pages and redirects persist.
12. **GitHub returns 404 where nginx returned 410** for retired URLs. Both signal
    removal, but the status code changes.
13. **Never point a public webroot at the repository.** Only built output is
    deployable.
14. **Preview travel with extensionless HTML routing**, or canonical URLs cannot
    be exercised.
15. **Shared scripts/fonts require deploying all three sites.** A partial deploy
    leaves versions skewed.
16. **The old deploy's final rsync was not atomic.** Schedule around it; this
    does not apply to Pages.
17. **The old server has `/etc/hosts` overrides** for `bhaveshjain.com` and
    `www` to `88.198.12.150`; an administrator must remove them.
18. **Cloudflare redirects and headers live only in the dashboard.** They are not
    in git and will drift. The new site should keep them in a reviewed config
    file or IaC, not in a runbook.

---

## 9. GDPR-relevant surface

### 9.1 Inventory

| Vector | Present? | Detail |
| --- | --- | --- |
| Analytics / tag manager | **No** | No `gtag`, GTM, Plausible, Umami, Matomo, Fathom, or any beacon in HTML/JS |
| Third-party JavaScript | **No** | Only `/theme.js` and `script.js`, both same-origin |
| Third-party CSS/fonts | **No** | Fonts self-hosted; no Google Fonts, no CDN |
| Iframes / embeds | **No** | No YouTube, Vimeo, Maps, Calendly, Spotify |
| Forms | **No** | Contact is `mailto:hello@bhaveshjain.com?subject=…`; no server-side POST |
| Cookies set by the site | **No** | Theme persistence uses `localStorage`, not cookies |
| Local storage | Yes | Key `theme`, values `light`/`dark`; functional preference only |
| External links | Yes | LinkedIn, GitHub, Fraunhofer, VORSCHAU, Trend Radar, blog, travel; `target="_blank" rel="noopener"`; no data sent until clicked |
| Reverse proxy | Yes | Cloudflare proxied, Full (strict); may process IP/UA and set bot-management cookies (`__cf_bm`); may inject challenge scripts |
| Host | Yes | GitHub Pages processes request logs (IP, UA) |
| Privacy policy | **No** | No `/privacy` page found |
| Impressum | **No** | No `/impressum` page; German-language site |
| Cookie banner | **No** | Consistent with no analytics/cookies, but see Cloudflare |

### 9.2 Assessment

- The site itself is close to a data-minimisation ideal: no analytics, no
  third-party requests, self-hosted fonts, no form backend. There is nothing to
  consent to at the application layer.
- `localStorage` for a theme is a **functional** preference. Under the German
  TDDDG §25(2) it is exempt from consent (strictly necessary to provide the
  requested service). Do not add a banner just for this.
- Cloudflare is a **processor** (Art. 28 GDPR). Bot management can set
  `__cf_bm` and process IP/UA for security, which is a legitimate-interest
  processing activity, not an analytics one. A DPA with Cloudflare and a privacy
  notice naming it are still required. The site's own `llms.txt` admits
  “Cloudflare may apply security checks.”
- GitHub (Pages) is a second processor/host; its logs also contain IPs.
- The `mailto:` link means the user's own mail client sends the message. The site
  never receives form data, so there is no Art. 6 basis to document for a form.
  The published `hello@` address in `security.txt` and JSON-LD is intentional
  personal data.
- **The gap is legal, not technical:** a German-language commercial-ish personal
  site without an Impressum (§5 DDG) and without a privacy notice (Art. 13) is
  exposed, even with zero tracking. The English-only new site reduces but does
  not remove this if it targets German clients.

### 9.3 What the new site should do

- Keep the no-analytics default. If metrics are wanted, use a cookieless,
  EU-hosted option and document the legal basis; do not add GA4.
- Keep fonts self-hosted. This is the single biggest GDPR win in the reference.
- Add `/privacy` naming GitHub Pages and Cloudflare as processors, the
  `localStorage` key, and the contact email.
- Add an Impressum if the site is operated from Germany or targets German
  clients, regardless of UI language.
- If Cloudflare is kept, sign the DPA and disclose it; if not, prefer the host's
  own headers and skip the proxy.
- Do not add a cookie banner unless a non-essential cookie actually appears.

---

## 10. Checklist: what the new site must do differently

The task names four hard requirements. Each is expanded into testable acceptance
criteria, followed by the reference defects that must not be inherited.

### 10.1 Custom domain

- [ ] Register the domain before build; record registrar, renewal date, and
      registrant contact in the repo docs. (Reference domain: `bhaveshjain.com`;
      the new site needs its own.)
- [ ] Decide apex vs `www`; 301 the other one. No duplicate content.
- [ ] HTTPS enforced; certificate issued and auto-renewing.
- [ ] If Cloudflare is used: Full (strict), DNS export taken first, grey cloud
      during issuance, orange after, DPA signed.
- [ ] Canonical, `og:url`, sitemap, and JSON-LD URLs all use the final host, with
      one trailing-slash policy applied consistently.
- [ ] Add `/.well-known/security.txt` as a committed file with a future `Expires`.
- [ ] Test `http://`, `https://`, `www`, and a deep path; all must land on the
      canonical origin with one hop.

### 10.2 Single language

- [ ] Ship English only. `<html lang="en">` on every page.
- [ ] No `/de/` tree, no `hreflang`, no `x-default`, no language toggle.
- [ ] No duplicated page skeletons: one source per page.
- [ ] If German is added later, generate both trees from one content source and
      fail CI when a key or page is missing in either.
- [ ] Keep translated `aria-label`s out of shared JS; label from page data.
- [ ] Sitemap contains one `<url>` per page, no `xhtml:link` alternates.

### 10.3 Astro build

- [ ] One `BaseLayout.astro` owns `<head>`; no page hand-writes meta tags.
- [ ] SEO props (`title`, `description`, `ogImage`, `canonical`, `noindex`) are
      typed and required, so a page cannot ship without a description.
- [ ] `@astrojs/sitemap` generates `sitemap.xml`; `robots.txt` is generated or
      static but references the real sitemap URL.
- [ ] Content collections for any writing/projects; no hand-maintained JSON-LD
      duplicated across pages.
- [ ] One JSON-LD helper emits `Person` + `WebSite` (+ `ProfilePage` for the home
      page) with a stable `@id`; validate with Rich Results Test.
- [ ] Build output is static; no server runtime.
- [ ] Asset hashing is automatic; do not hand-version CSS/JS as the reference's
      builder does.
- [ ] `npm run build` fails on broken internal links and missing images.

### 10.4 No nginx

- [ ] No server, no `deploy.sh`, no `systemd`, no `rsync` to a webroot.
- [ ] Deploy = build artifact → host. On GitHub Pages: `upload-pages-artifact` +
      `deploy-pages` with `GITHUB_TOKEN` and a `pages` environment; no deploy
      keys, no second repository.
- [ ] Headers come from the host config (Cloudflare rules, `_headers` on
      Netlify/Cloudflare Pages, or `vercel.json`), and are **checked into git**.
- [ ] Redirects are checked into git (`_redirects` / `netlify.toml`), not only in
      a dashboard.
- [ ] Preview deploys exist for pull requests; production only from `main`.
- [ ] Cache policy: HTML revalidates, hashed assets immutable.
- [ ] 404 page exists (the reference has no custom 404 in the snapshot).
- [ ] Post-deploy smoke test: home, a deep link, a missing path, `robots.txt`,
      `sitemap.xml`, `security.txt`, OG image, and a no-JS load.

### 10.5 Reference defects not to inherit

| Defect | Fix |
| --- | --- |
| Hand-duplicated EN/DE pages, already drifted | Single language now; generated i18n later |
| `theme-color` follows OS, page theme does not | Resolve one theme; drive `theme-color`, `color-scheme`, and CSS from it |
| Theme defaults to dark for everyone | Default to `prefers-color-scheme`; store explicit `light`/`dark` |
| Generic `theme` localStorage key | Namespace it (`np-theme`) |
| Unsized font claim | Measure every WOFF2; record sizes; enforce a budget |
| No italic Fraunces face but italic used | Ship a real italic or drop italic styling |
| JetBrains Mono not preloaded above the fold | Preload only what the first viewport uses |
| JSON-LD before font preloads; blocking external theme script | Inline the pre-paint script; put preloads early |
| `meta keywords`, missing `twitter:title/description`, no `og:locale` on EN | Emit the complete, modern tag set per page |
| Manifest dark-only, no `id`/maskable | Provide both theme colours and a maskable icon |
| `llms.txt` not linked and manually drifting | Generate it from the same content data, or omit it |
| `security.txt` absent from the repo | Commit it, with expiry monitoring |
| No privacy policy / Impressum | Add both (Impressum if German-facing) |
| Cloudflare headers/redirects only in the dashboard | Version them in the repo |
| Three repos + deploy keys for a one-site portfolio | Single repo, single Pages deploy |
| No translation/parity check in CI | If i18n returns, make parity a build failure |
