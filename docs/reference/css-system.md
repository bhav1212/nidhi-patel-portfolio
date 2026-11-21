# Reference CSS System — bhaveshjain.com

Audit of the reference portfolio's CSS so it can be faithfully reimplemented.
Line references are `styles.css` unless prefixed `HTML:` (`index.html`), `JS:` (`script.js`), or `theme.js:`. Every claim below cites the actual declaration.

Source files:
- `/tmp/ref-site/site/styles.css` — 2,365 lines, 69,253 bytes (primary)
- `/tmp/ref-site/site/theme.js` — 30 lines
- `/tmp/ref-site/site/script.js` — 282 lines (needed for reveal/marquee/scroll mechanics referenced by CSS)
- `/tmp/ref-site/site/index.html` — 519 lines (class usage)

Cascade note: the stylesheet is append-only in four layers — base (~L1–1268), legacy blog (~L1270–1904), "Motion v3" (~L1906–2017), "Motion v4" (~L2019–2148), then later feature blocks (~L2150–2365). Several properties are declared twice and the *last* declaration wins. Where that matters it is called out explicitly.

---

## 1. Design tokens

### 1.1 Fonts

Six `@font-face` rules, all `font-display: swap`, latin + latin-ext split with explicit `unicode-range` (L1–53).

| Family | Declared weight | Files | Lines |
|---|---|---|---|
| `Fraunces` (serif) | `400` only, normal style | `fraunces-400-latin-ext.woff2`, `fraunces-400-latin.woff2` | L1–17 |
| `Geist` (sans) | `100 900` (variable range) | `geist-400-latin-ext.woff2`, `geist-400-latin.woff2` | L19–35 |
| `JetBrains Mono` (mono) | `400 800` (variable range) | `jetbrains-mono-400-latin-ext.woff2`, `jetbrains-mono-400-latin.woff2` | L37–53 |

Quirk: Geist and JetBrains Mono declare variable weight ranges but point at files named `-400-`; either the files are variable and misnamed, or the weight axes resolve to a single 400 face and the CSS asks for 600/700 it does not have. A port must verify the actual axes.

Stacks (L68–70):
```css
--sans:  'Geist', 'Inter', system-ui, -apple-system, sans-serif;
--serif: 'Fraunces', 'Cormorant Garamond', Georgia, serif;
--mono:  'JetBrains Mono', ui-monospace, monospace;
```
`Inter` is in the fallback chain but never loaded (L68). HTML preloads only `geist-400-latin.woff2` and `fraunces-400-latin.woff2` (`HTML:148–149`).

### 1.2 Colour tokens

Dark is the default: plain `:root` (L67–115). Light is an override on `html[data-theme="light"]` (L117–143). There is no `prefers-color-scheme` branch in CSS at all.

| Token | Dark `:root` | Light `[data-theme="light"]` | Line (dark / light) |
|---|---|---|---|
| `--bg` | `#0a0a10` | `#fafaf7` | L72 / L118 |
| `--bg-2` | `#0e0e16` | `#f3f3ee` | L73 / L119 |
| `--surface` | `rgba(255,255,255,0.03)` | `rgba(0,0,0,0.025)` | L74 / L120 |
| `--surface-2` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.04)` | L75 / L121 |
| `--surface-hi` | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.06)` | L76 / L122 |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.09)` | L77 / L123 |
| `--border-hi` | `rgba(255,255,255,0.16)` | `rgba(0,0,0,0.18)` | L78 / L124 |
| `--text` | `#f4f4f8` | `#14141c` | L80 / L125 |
| `--text-dim` | `rgba(244,244,248,0.66)` | `rgba(20,20,28,0.66)` | L81 / L126 |
| `--text-faint` | `rgba(244,244,248,0.62)` | `rgba(20,20,28,0.70)` | L82 / L127 |
| `--accent` | `#ff6b35` | `#a82a00` | L84 / L135 |
| `--accent-2` | `#f72585` | `#b00654` | L85 / L136 |
| `--accent-3` | `#7209b7` | *(not overridden)* | L86 |
| `--accent-cyan` | `#00d9f5` | `#006574` | L87 / L137 |
| `--accent-lime` | `#c9f86b` | `#3d6100` | L88 / L138 |

Legacy blog aliases (L90–94; light overrides L139–142): `--c-orange #ff6b35 / #a82a00`, `--c-pink #f72585 / #b00654`, `--c-purple #b66cff / #7209b7`, `--c-teal #00d9f5 / #006574`. None of the four is referenced by any rule — dead tokens.

Note the rank inversion: dark `--text-faint` (0.62) is *less* opaque than `--text-dim` (0.66), but light `--text-faint` (0.70) is *more* opaque than `--text-dim` (0.66). The "faint" rank is therefore brighter than "dim" in light mode (L81–82 vs L126–127).

Explicit accessibility comments in the source:
- L96–97: `--grad-warm` hues are darkened vs. raw brand so white button text and gradient-filled text clear 4.5:1 (`raw #ff6b35/#f72585 only hit ~2.8:1 / 3.8:1`).
- L131–134: light-mode `--accent`/`--accent-2` darkened because the raw oranges/pinks only hit ~2.8:1 on `#fafaf7`; "dark mode keeps the vibrant originals since those already pass against the near-black background."

### 1.3 Gradients

| Token | Value | Line |
|---|---|---|
| `--grad-warm` | `linear-gradient(135deg, #d93a00 0%, #e4086d 50%, #7209b7 100%)` | L98 |
| `--grad-cool` | `linear-gradient(135deg, #00d9f5 0%, #7209b7 100%)` | L99 |
| `--grad-border` | `linear-gradient(135deg, rgba(255,107,53,0.4) 0%, rgba(247,37,133,0.4) 50%, rgba(114,9,183,0.4) 100%)` | L100 |

`--grad-cool` is never used. `--grad-border` is used only for masked 1px border rings (see §4). Both gradient tokens hardcode RGB, so they do **not** retheme in light mode — only `--accent` does.

Background atmosphere is not tokenised and is hardcoded twice:
- `body::before`: three fixed radial gradients, orange/pink/purple at 0.10/0.08/0.10 alpha (L158–168); light variant 0.10/0.06/0.06 (L180–185).
- `body::after`: fixed 56px graph-paper grid, `rgba(255,255,255,0.012)` (L169–179); light `rgba(20,20,28,0.025)` (L186–190).

### 1.4 Shadows

| Token | Value | Line | Used? |
|---|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.3)` | L102 | no |
| `--shadow` | `0 12px 32px -8px rgba(0,0,0,0.5)` | L103 | yes (L1019) |
| `--shadow-lg` | `0 24px 60px -12px rgba(0,0,0,0.6)` | L104 | yes (L518) |
| `--shadow-glow` | `0 0 60px -20px rgba(255,107,53,0.5)` | L105 | yes |

Light overrides only `--shadow` (`rgba(20,20,28,0.12)`) and `--shadow-lg` (`rgba(20,20,28,0.18)`) at L128–129. `--shadow-glow` stays orange in light mode. Many component shadows bypass the tokens entirely: `0 0 24px -8px rgba(255,107,53,0.5)` (L311), `0 6px 20px -6px rgba(255,107,53,0.6)` (L314), `0 12px 32px -8px rgba(255,107,53,0.6)` (L471, L483), `0 0 12px -2px rgba(255,107,53,0.6)` (L1922), `0 6px 24px -10px rgba(0,0,0,0.45)` (L2102), `0 0 16px -4px rgba(255,107,53,0.5)` (L1293), `0 2px 12px rgba(255,107,53,0.3)` (L1246).

### 1.5 Radii

`--r-sm: 8px`, `--r-md: 14px`, `--r-lg: 20px`, `--r-xl: 28px` (L107–110).
Hardcoded radii: `999px` pills (L237, L306, L459, L560, L1077, L1010, L1284, L1550, L1745, L1781, L2315), `10px` icon buttons (L327, L370, L395), `8px` logo mark/nav links (L279, L298), `5px` inline code (L1500), `4px` focus outline (L64), `1px` bar radii (L407), `50%` dots/avatars (L245, L568, L807, L963, L969, L1041).

### 1.6 Layout / rhythm tokens

```css
--gutter:    clamp(1.2rem, 4vw, 2rem);   /* L112 */
--container: 1200px;                     /* L113 */
--section-y: clamp(4rem, 10vh, 7rem);    /* L114 */
```
`--section-y` is a mix of `vh` and `rem`, so rhythm changes with viewport **height**, not just width.

### 1.7 What is *not* tokenised

- No easing tokens. The house curve `cubic-bezier(0.2, 0.8, 0.2, 1)` is repeated literally at L345, L520, L1082, L1746, L1957, L1972, L2003, L2047, L2073, L2103, L2146, and inside `page-fade` L1990.
- No duration tokens; durations are literals `0.08s`–`0.9s` plus `1.6s`, `2.6s`, `3.4s`, `5.5s`, `6s`, `8s`, `22s`, `40s`.
- No type-scale tokens; every size is an inline `clamp()`/`rem` (§2).
- No spacing scale; paddings/gaps are raw `rem`.
- No `text-wrap`, `text-balance`, `hyphens`, `font-feature-settings`, or `font-variant-numeric` anywhere (verified: zero matches in the file).
- No `@supports`, `@layer`, `@container`, `@media print`, `forced-colors`, or `prefers-contrast` (verified: zero matches).

---

## 2. Typography

### 2.1 Global

- Reset removes heading/paragraph/list/figure/blockquote margins (L58) and list markers (L59); `img,svg` block + max-width 100% (L60); links inherit colour and lose underline (L61); buttons are fully reset (L62).
- `body`: `font-family: var(--sans)`, 400, `1rem`, `line-height: 1.6`, antialiased, `overflow-x: hidden`, `position: relative` (L146–156).
- `p { color: var(--text-dim) }` (L205) — overridden to `--text` inside articles (L1455) and posts (L1347).

### 2.2 Heading scale

| Selector | Size | Weight | Line-height | Letter-spacing | Line |
|---|---|---|---|---|---|
| `h1,h2,h3,h4` (shared) | — | 600 | 1.05 | −0.025em | L195–200 |
| `h1` | `clamp(2.8rem, 7vw, 5.4rem)` | 700 | 1.05 | −0.035em | L201 |
| `h2` | `clamp(2rem, 4.5vw, 3.4rem)` | 600 | 1.05 | −0.03em | L202 |
| `h3` | `clamp(1.3rem, 2.2vw, 1.6rem)` | 600 | 1.05 | −0.025em | L203 |
| `h4` | `1.1rem` | 600 | 1.05 | −0.025em | L204 |

Late overrides that win over the base scale:
- `.hero h1` → `clamp(2.4rem, 5.2vw, 4.4rem)`, margin-bottom `1.1rem` (L2197); its first declaration at L424 only sets margin.
- `.section-head h1` → `clamp(2rem, 4vw, 3.2rem)`, weight 600 (L2348).
- `.section-head :is(h1,h2)` margin-bottom `1rem` (L250).
- `.section-title` → `clamp(2rem, 4.5vw, 3rem)`, 700, −0.03em (L1586–1591).
- `.post > h1` → `clamp(2rem, 4.5vw, 3rem)`, −0.025em, lh 1.1, 700 (L1405–1411); mobile `clamp(1.7rem, 6vw, 2.2rem)` (L1564).
- `.post h2` 1.5rem (L1440–1445) → 1.3rem ≤640 (L1565); `.post h3` 1.2rem (L1446–1451) → 1.1rem (L1566).
- `.post-article h2` 1.6rem (L1345), `.post-article h3` 1.25rem (L1346).

### 2.3 Body and supporting type

| Selector | Size | Weight | Line-height | Other | Line |
|---|---|---|---|---|---|
| `.hero-lead` | `clamp(1.05rem, 1.8vw, 1.2rem)` | 400 | 1.55 | dim, max-width 52ch, margin-bottom 2.2rem (1.6rem at L2198) | L441–447 |
| `.section-head p` | `1.1rem` | 400 | 1.6 inherited | dim, max 56ch | L251 |
| `.section-lede` | `1.1rem` | 400 | — | dim, max 56ch, mb 2.5rem | L1593–1598 |
| `.section-eyebrow` | `0.72rem` | 400 | — | mono, tracking 0.18em, uppercase, faint | L226–240 |
| `.section-label` | `0.72rem` | 400 | — | mono, 0.18em, uppercase, **accent** | L1576–1585 |
| `.section-num` | `0.7rem` | 400 | — | mono, 0.2em, uppercase, faint; `.n` accent 600 | L1641–1653 |
| `.bento-card p` | `0.93rem` | 400 | 1.55 | dim, `flex: 1` | L656 |
| `.bento-card h3` | `1.35rem` | 600 | 1.05 | −0.02em | L651–655 |
| `.b-outcome` | `0.95rem` | 400 | 1.4 | serif italic, `--text` | L657–666 |
| `.about-prose p` | `1rem` | 400 | 1.7 | dim; sibling margin-top 1rem | L731–736 |
| `.about-fact .label` | `0.7rem` | 400 | — | mono, 0.12em, uppercase, faint | L751–757 |
| `.about-fact .value` | `0.92rem` | 400 | 1.5 | text | L758–762 |
| `.pub-title` | `1.05rem` | 600 (h3 inherited) | 1.4 | −0.01em | L2270–2275 |
| `.pub-authors` | `0.88rem` | 400 | — | dim | L2278 |
| `.pub-venue` | `0.85rem` | 400 | — | faint, italic | L2279 |
| `.pub-doi` | `0.75rem` | 400 | — | mono, faint, `word-break: break-all` | L2280–2286 |
| `.pub-year` | `0.8rem` | 400 | — | mono, 0.1em, accent | L2262–2268 |
| `.record-num` | `clamp(2.4rem, 4vw, 3.2rem)` | 400 | 1 | serif, −0.03em, gradient text | L836–846 |
| `.record-label` | `0.92rem` | 500 | — | text | L847 |
| `.record-sub` | `0.8rem` | 400 | — | faint | L848 |
| `.thinking-feature h3` | `clamp(1.5rem, 2.6vw, 2rem)` | 600 | 1.15 | −0.02em | L2173 |
| `.thinking-feature p` | `1rem` | 400 | 1.6 | dim | L2174 |
| `.t-eyebrow` | `0.7rem` | 400 | — | mono, 0.12em, uppercase, accent | L2168–2172 |
| `.thinking-link` | inherited 1rem | 400 | 1.6 | text; `.tl-meta` 0.68rem mono uppercase faint | L2178–2187 |
| `.contact p` | `1.05rem` | 400 | 1.6 | dim, max 50ch, centered | L1176 |
| `.contact-meta` | `0.78rem` | 400 | — | mono, faint | L1183–1192 |
| `.footer` | `0.85rem` | 400 | 1.6 | faint | L1196–1207 |
| `.nav-logo` | `1rem` | 600 | — | −0.01em | L269–276 |
| `.nav-links a` | `0.92rem` | 400 | 1.6 | dim | L294–300 |
| `.nav-cta` | `0.9rem` | 500 | 1.6 | white | L302–308 |
| `.btn` | `0.95rem` | 500 | 1.6 | — | L454–465 |
| `.hero-meta-item` | `0.85rem` | 400 | 1.6 | `.label` 0.7rem mono 0.12em uppercase faint; `.value` 500 text | L493–505 |

### 2.4 Family assignment

- **Serif (`--serif`, Fraunces italic 400)** is used only for display/editorial accents: `.serif` (L207, italic by default), the hero word-swap (L435–437), `.b-outcome` (L658–659), `.q-mark` and quote body (L784–797), `.record-num` (L837), `.atlas-stat .n` (L885–891), `.quote-card::after` giant quote mark (L2064–2066).
- **Mono (`--mono`)** is used for every meta/label layer: eyebrows, section numbers, bento tags, stat numbers, pub year/DOI, thinking metadata, about labels, contact meta, footer (inherits sans actually), nav lang chip, tag chips, post meta, table headers, code.
- **Sans (Geist)** is everything structural: body, headings, buttons, nav, values, prose.

### 2.5 `clamp()` inventory (all 29 sites)

Tokens: L112, L114.
Type: L201, L202, L203, L442, L838, L876, L1406, L1564, L1587, L2173, L2197, L2348.
Spacing: L411, L417, L574, L728, L856, L1097, L1153, L1360, L2156, L2164, L2196 (×2).
No `min()`/`max()` except `width: min(640px, 70%)` on the section divider (L2037) and `min(100%, 280px)` in `.blog-grid` (L1820).

### 2.6 Gradient text

Mechanism (L210–216, and repeated inline at L428–440, L842–846, L887–891, L1684):
```css
background: var(--grad-warm);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
color: transparent;
```
There is no fallback colour if `background-clip: text` is unsupported — the text becomes transparent. Any port must add a solid-colour fallback.

`.mono` is `font-size: 0.8em` (L208), i.e. it scales relative to its parent, unlike every other size which is absolute.

---

## 3. Layout system

### 3.1 Container, section, rhythm

```css
.container { width:100%; max-width:1200px; margin:0 auto; padding:0 var(--gutter); }  /* L219–224 */
.section   { padding: var(--section-y) 0; }                                               /* L225 */
```
Later, `.section` is *redeclared* as a self-contained container:
```css
.section { max-width: var(--container); margin-left:auto; margin-right:auto;
           padding-left: var(--gutter); padding-right: var(--gutter); }                   /* L1868 */
```
Because the later rule only adds horizontal padding, the vertical `--section-y` from L225 survives.

Consequence to replicate or fix deliberately: home sections use `.section > .container`, so gutters are applied **twice**. At a ≥1232px viewport the content box is `1200 − 4×32px = 1072px`, while the hero (which is `<section class="hero">`, not `.section`) uses a single `.container`, giving `1136px`. Hero copy is therefore 64px wider than every section below it (L219–225 + L1868; `HTML:182–254` vs `HTML:256–501`).

Vertical rhythm: `--section-y` = `4rem → 7rem` by `10vh` (L114). Hero padding is overridden to `clamp(2.25rem,5vh,3.75rem)` top / `clamp(2.5rem,5vh,4rem)` bottom (L2196), from the original `clamp(4rem,10vh,7rem) 0 clamp(3rem,7vh,5rem)` (L411).

Section divider: every `.section` gets a centered 1px gradient line at its top, `width: min(640px,70%)`, transparent → `--border-hi` 40–60% → transparent, opacity 0.6 (L2030–2042). `.section.no-divider::before, .section:first-of-type::before { display:none }` (L2043) — but in the home page the hero is the first `<section>` and has no `.section` class, so `#work` (the first `.section`) still shows a divider. The intended "first section has no divider" does not happen.

Anchor offset: `scroll-padding-top: 72px` (L2024), matching the ~70px sticky nav; blog sections get `scroll-margin-top: 90px` (L2330).

### 3.2 Grid definitions

| Component | Definition | Line |
|---|---|---|
| `.hero-grid` | `1.7fr 1fr`, `gap: clamp(2rem,5vw,4rem)`, align center | L414–419 |
| `.bento` | `repeat(6,1fr)`, `grid-auto-rows: minmax(220px,auto)`, gap `1rem` | L621–626 |
| `.bento-card.b-feature` | `grid-column: span 4` | L669–672 |
| `.bento-card.b-tall` | `span 2 / span 2` | L685–688 |
| `.bento-card.b-third` | `span 2` | L689 |
| `.about-grid` | `1.6fr 1fr`, `gap: clamp(1.5rem,4vw,3rem)`, align start | L725–730 |
| `.quotes` | `repeat(3,1fr)`, gap 1.1rem | L766–770 |
| `.record` | `repeat(4,1fr)`, gap 1rem | L822–826 |
| `.atlas-teaser` | `1fr 1fr`, gap 2.5rem, align center | L851–862 |
| `.thinking-wrap` | `1.4fr 1fr`, `gap: clamp(1.2rem,3vw,2rem)`, align stretch | L2153–2158 |
| `.pub` | `5.5rem 1fr`, gap 1.2rem | L2254–2260 |
| `.post-nav` | `1fr 1fr`, gap 1rem | L2203–2210 |
| `.blog-grid` | `repeat(auto-fill, minmax(min(100%,280px),1fr))` | L1818–1822 |

All multi-column grids collapse to a single column at their breakpoint except `.record`, which goes to 2 columns (L1219, L1252).

### 3.3 Breakpoints — every width query and what changes

| Query | Line | Changes |
|---|---|---|
| `max-width: 920px` | L1212–1224 | `.hero-grid` → 1 col; `.hero-portrait` max 380px, centered; `.bento` → 2 cols, `grid-auto-rows:auto`, all variants `span 2 / row auto`; `.about-grid` → 1; `.quotes` → 1; `.record` → 2; `.atlas-teaser` → 1 (gap 1.6rem); `.icon-btn` 38→44px ("touch is the primary input — meet the 44px target here", L1221–1222) |
| `max-width: 820px` | L2189–2191 | `.thinking-wrap` → 1 col |
| `min-width: 720px` | L1395–1403 | `.post-cover` stops full-bleed: margins 0, radius `--r-lg`, 1px border; illustrated variant loses top/bottom borders |
| `max-width: 640px` | L1226–1260 | nav: `.nav-ready .nav-links` hidden (L1227), `.open` dropdown (L1228–1246), toggle shown (L1247–1248); `.bento` → 1 col, all spans → `1 / auto` (L1249–1250); `.process` → 1 col (L1251, class doesn't exist); `.record` → `repeat(2,minmax(0,1fr))` (L1252); `.hero-meta` column, gap 1rem (L1253); `.btn` width 100%, centered, `min-height:44px` (L1254); hero-row buttons 48px (L1255); `.contact-row` column (L1256); `.footer` column, left-aligned (L1257); `.nav-tools` gap 0.3rem (L1258); `.nav` padding 0.85rem gutter (L1259) |
| `max-width: 640px` | L1051–1056 | `.constellation` pins resize (11px, home 14px), legend 0.62rem, tighter insets |
| `max-width: 640px` | L1144–1148 | atlas flags/cloud padding and pill sizes shrink |
| `max-width: 640px` | L1562–1568 | post padding-top 1.6rem; post h1/h2/h3 and body sizes shrink |
| `max-width: 640px` | L1897–1904 | blog section/post-card/travel-map sizes shrink |
| `max-width: 640px` | L1966–1968 | nav link underline pseudo hidden |
| `max-width: 640px` | L2124–2126 | `#to-top` insets 1rem |
| `max-width: 640px` | L2240–2244 | `.post-nav` → 1 col; `.next` left-aligned; `.empty` hidden |
| `max-width: 640px` | L2288–2291 | `.pub` → 1 col, gap 0.4rem, year padding-top 0 |
| `max-width: 640px` | L2296–2298 | footer/footer-compact padding-bottom 4.5rem to clear `#to-top` |
| `max-width: 640px` | L2349–2358 | no-JS fallback: `html:not(.nav-ready) .nav` wraps, links wrap full-width at order 3 |

Motion queries (not layout): `prefers-reduced-motion: reduce` at L352, L1058, L1263–1268, L1792–1799, L1924, L2012–2017, L2054, L2077, L2127, L2137; `prefers-reduced-motion: no-preference` at L1757, L1988, L2025, L2142, L2359. `min-width: 641px` is also used in JS to auto-close the menu (`JS:48`).

### 3.4 Full-bleed vs contained

- `.tech-strip` sits inside `.hero` but **outside** `.container` (HTML:235–253): it spans the viewport with `padding: 1.4rem var(--gutter)` and top/bottom borders (L573–583).
- `.section` is capped at 1200px (L1868); `.container` inside it re-caps.
- `.nav` and `.footer` are full-width flex rows with `var(--gutter)` padding (L258, L1198).
- `.contact` is a rounded card inside the container, not full-bleed (L1151–1162).

### 3.5 Stacking order

`body::before` and `body::after` are `position:fixed; inset:0; z-index:0` (L158–179); `main, header, footer { position:relative; z-index:1 }` (L192); nav `z-index:100` (L257); `#to-top` 90 (L2096); `#scroll-progress` 200 (L1919); `.skip-link` 10000 (L2336); constellation pins 2–6 (L966, L1000, L1005). Because the background pseudos are fixed and the content sits at z1, the atmosphere is continuous across the page.

---

## 4. Component-by-component catalogue

### 4.1 Nav (`.nav`)

- `position: sticky; top: 0; z-index: 100; padding: 1rem var(--gutter); display:flex; align-items:center; justify-content:space-between; gap:1rem` (L254–262).
- `backdrop-filter: blur(20px)` + `-webkit-` prefix; background `rgba(10,10,16,0.6)`; bottom 1px `--border` (L263–267). Light override `rgba(250,250,247,0.7)` (L268).
- Transition added later: `background .25s, box-shadow .25s, padding .25s, border-color .25s` (L1929–1931).
- Scrolled state: `.nav.is-scrolled` background `rgba(10,10,16,0.82)`, `box-shadow: 0 1px 0 var(--border), 0 8px 24px -16px rgba(0,0,0,.4)`, border-bottom transparent (L1932–1936); light `rgba(250,250,247,0.9)` + lighter shadow (L1937–1940). JS toggles it past 32px (`JS:90–104`).
- Logo: inline-flex, gap .55rem, 600, 1rem, −0.01em (L269–276). `.logo-mark` 28×28, radius 8px, `--grad-warm`, white 700 0.85rem, `--shadow-glow` (L277–288). Hover: mark rotates −4deg / scale 1.06 + halo, label letter-spacing grows to 0.005em (L1971–1981).
- Links: flex, gap .4rem; anchors padding .5rem .85rem, .92rem, dim, radius 8px, `transition: color .18s, background .18s`; hover/focus-visible → `--text` on `--surface` (L289–301). Motion v3 adds an animated 1px accent underline (`::before`, left/right .85rem, bottom .32rem, `scaleX(0)→1` on hover/focus/active, .32s house curve), and forces `background: transparent !important` so the earlier hover background is suppressed (L1943–1963). `.nav-cta::before { display:none }` (L1964). Underline hidden ≤640 (L1966–1968).
- Active state: `.is-active` colour text + underline (L1962–1963), driven by scroll position in JS (`JS:106–137`).
- `.nav-tools`: flex gap .4rem (L324).

### 4.2 Icon button / theme / language

- `.icon-btn`: 38×38, radius 10px, 1px `--border`, `--surface`, inline-flex centered, dim, transitions background/color/border .18s; hover → `--surface-hi`, text, `--border-hi` (L325–336). SVG 16×16, `stroke: currentColor; fill:none; stroke-width:2` (L337). At ≤920 becomes 44×44 (L1223).
- Theme toggle: both icons absolutely centered; moon `opacity 1 rotate(0) scale(1)`, sun `opacity 0 rotate(90deg) scale(.55)`; transition `opacity .32s`, `transform .42s cubic-bezier(.2,.8,.2,1)`; light flips them (L338–351); reduced motion kills the transition (L352–354).
- Legacy fallback `.theme-toggle:not(.icon-btn)` restyles bare buttons as 38px icon buttons (L368–385); `.nav-toggle:not(.icon-btn)` is a three-`<span>` hamburger, hidden by default (L388–407).
- Language chip `.lang-toggle`: mono .72rem, 600, 0.06em, no underline (L358–364), rendered as an `.icon-btn` anchor (HTML:169).
- Progressive enhancement: `.theme-toggle { display:none }` then `.has-js .theme-toggle { display:inline-flex }` (L2345–2346); `theme.js` adds `.has-js` synchronously in `<head>` (theme.js:3) and applies stored theme before paint (theme.js:4–6). No `prefers-color-scheme` detection — dark is the default for everyone.

### 4.3 Mobile menu

Requires JS to add `.nav-ready` (`JS:50`).
- ≤640: `.nav-ready .nav-links { display:none }` (L1227).
- `.nav-links.open`: `display:flex`, `position:absolute; top:100%; right:0`, column, align-end, background `rgba(10,10,16,0.95)`, blur 20, 1px border, `--r-md`, padding .5rem, `min-width:220px`, margin .5rem, gap .2rem (L1228–1243); light background `rgba(250,250,247,0.97)` (L1244).
- Open links: full width, right-aligned, padding .75rem 1rem, `min-height:44px`, inline-flex centered end (L1245). `.nav-cta` keeps gradient pill + shadow (L1246).
- `.nav-ready .nav-toggle` shown (L1247–1248).
- JS: Escape closes and restores focus, outside click closes, `matchMedia('(min-width:641px)')` closes on resize, first link focused on open, `aria-expanded` synced (`JS:14–50`).
- No-JS fallback ≤640: nav wraps, links flow below the bar, left-aligned, full width (L2349–2358).

### 4.4 Skip link

`position:fixed; top:.5rem; left:.5rem; z-index:10000; padding:.8rem 1.1rem; background:var(--bg); color:var(--text); border:2px solid var(--accent); border-radius:var(--r-sm); transform:translateY(-200%)`; `.skip-link:focus { transform:translateY(0) }` (L2332–2344). No transition — appears instantly. Target `#top` is `<main tabindex="-1">` (HTML:180). Uses `:focus`, not `:focus-visible`, so it fires for any focus including pointer (harmless since off-screen until focused).

### 4.5 Scroll progress

Declared hidden then shown later: `#scroll-progress { display:none }` (L1619) is overridden by `display:block` (L1911–1923):
`position:fixed; top:0; left:0; height:2px; width:0; background:var(--grad-warm); z-index:200; pointer-events:none; transition:width .08s linear; box-shadow:0 0 12px -2px rgba(255,107,53,.6)`. Reduced motion removes the transition (L1924–1926). JS writes `width: pct%` on rAF-throttled scroll (`JS:71–88`); with no JS it stays 0-width (invisible).

### 4.6 Hero

- `.hero`: `position:relative`; padding overridden to `clamp(2.25rem,5vh,3.75rem) 0 clamp(2.5rem,5vh,4rem)` (L2196).
- `.hero-grid` 1.7fr/1fr (L414–419).
- `.hero h1` margins (L424–427), size override (L2197), `overflow-anchor:none` (L426).
- Word swap: `.swap-wrap` inline-block, gradient text, serif italic 400, −0.02em, `padding-right:.05em` (L428–440), plus `background-size:200% 200%` and `gradient-shift 6s ease-in-out infinite` (L1655). The inner `#hero-swap` (HTML:187) has **no CSS rule and no JS** in these files — the "swap" is static.
- `.hero-lead` (L441–447), `.hero-cta-row` flex wrap gap .8rem (L448–453), margin overrides (L2198–2199).
- `.hero-meta`: flex wrap gap 2rem, `padding-top:1.6rem` (1.3rem at L2200), `border-top:1px solid var(--border)` (L486–492); label/value pairs (L493–507). Value links get a bottom border and accent hover (L506–507).
- `.hero-portrait`: relative, `aspect-ratio:1/1.2`, `max-width:400px`, `margin-left:auto`, radius `--r-xl`, overflow hidden, surface + border, `--shadow-lg`, base `rotate(1.2deg)` with .4s transform transition (L509–521). Two pseudo-elements:
  - `::after` bottom scrim `linear-gradient(180deg, transparent 60%, rgba(10,10,16,.5))`, z1 (L523–530).
  - `::before` masked 1px gradient border ring (L531–543).
  - `img` object-fit cover, `filter: contrast(1.02) saturate(.95)` (L544–548).
  - `.portrait-tag` absolute bottom-left pill, `rgba(10,10,16,.7)`, blur 12, mono .72, 0.08em, white; `.pulse` 6px lime dot with glow (L549–571). The lime colour is **not** animated by `@keyframes pulse`; it is a static glowing dot.
- Motion: `float-bob 5.5s ease-in-out infinite` (L1727–1732); hover pauses at L1732 (`animation:none`) and at L2050 sets `animation-play-state:paused; transform:rotate(1.2deg) scale(1.035)`; the earlier hover rule `rotate(0) scale(1.015)` (L522) is overridden by source order. Reduced motion disables animation and hover transform (L1796, L2054–2056).

### 4.7 Tech strip (marquee)

- `.tech-strip`: margin-top `clamp(3rem,6vh,4rem)`, padding `1.4rem var(--gutter)`, top+bottom borders, flex center gap 1.25rem, `overflow:hidden`, relative (L573–583).
- `.tech-strip-label`: mono .72rem, 0.12em uppercase faint, nowrap, `flex-shrink:0`, z2, right padding 1.5rem, and a left-to-right `linear-gradient(90deg, var(--bg) 0%, var(--bg) 65%, transparent)` mask-out so the scrolling items fade behind it (L585–599).
- `.tech-strip-track`: `flex:1; min-width:0; overflow:hidden`, and edge fade via `mask-image: linear-gradient(90deg, transparent 0, black 4%, black 96%, transparent 100%)` with `-webkit-` prefix (L600–607). This is a mask/fade trick, not an overlay.
- `.tech-strip-items`: flex gap 2.2rem, items nowrap .9rem 500 dim (L608–618); item hover → accent (L1712–1713).
- Motion: keyframes `tech-scroll` `translateX(0) → translateX(-50%)` (L1753–1756); applied only under `prefers-reduced-motion: no-preference`, `40s linear infinite`, `width:max-content`; paused on `:hover` and `:focus-within` (L1757–1764). The strip has `tabindex="0"` and an aria-label telling users to focus to pause (HTML:235).
- Seamless loop depends on JS duplicating the inner HTML (`JS:191–198`), and JS skips duplication under reduced motion. Because the CSS animation is independent of JS, **no-JS + no reduced-motion produces a half-empty, jumping strip**.

### 4.8 Section head / section number / eyebrow

- `.section-head`: `max-width:720px; margin-bottom:3rem` (L249); `:is(h1,h2)` margin-bottom 1rem (L250); `p` 1.1rem max 56ch (L251).
- `.section-eyebrow`: inline-flex pill, gap .5rem, mono .72rem, 0.18em uppercase faint, padding .35rem .7rem, 1px border, 999px radius, surface (L226–240); `::before` is a 5px accent dot with `box-shadow: 0 0 8px var(--accent)` (L241–248).
- `.section-num`: inline-flex, gap .5rem, mono .7rem, 0.2em uppercase faint (L1641–1651); `.n` accent 600 (L1652); `.line` 32×1px `--border-hi` (L1653). Display forced to flex inside `.section-head` (L1749).
- Animated underline: `.section-head :is(h1,h2)::after` absolute, `left:0; bottom:-.6rem; height:3px; width:0; background:var(--grad-warm); border-radius:999px; transition:width .9s cubic-bezier(.2,.8,.2,1) .25s`; `.section-head.is-in …::after { width:64px }` (L1734–1748). This is a transition, so it is delayed and it *does* respond to reduced motion's global 0.01ms rule.

### 4.9 Bento work grid

- `.bento-card`: relative, radius `--r-lg`, surface, 1px border, padding 1.6rem, overflow hidden, flex column gap .7rem, `transition: transform .25s ease, border-color .25s ease, background .25s ease` (L627–638). Hover: `translateY(-3px)`, `--border-hi`, `--surface-2` (L639–643).
- `.b-tag`: mono .7rem, 0.12em uppercase accent (L644–650) — a text label, not a chip.
- `h3` 1.35rem −0.02em (L651–655); `p` .93rem/1.55 dim with `flex:1` (L656); `.b-outcome` serif italic .95rem text, top border, `margin-top:auto`, lh 1.4 (L657–666); `::before { content:'→ '; color:var(--accent); font-style:normal }` (L667), nudges 4px right on card hover (L1767–1771); `.b-outcome strong` accent, non-italic (L1710).
- Feature card: span 4, `linear-gradient(135deg, surface-2, surface)` (L669–672) and a masked 1px `--grad-border` ring via `::after` (L673–684).
- Tall: span 2×2 (L685–688). Third: span 2 (L689).
- `.bento-stats`: column, gap .4rem, top border, `margin-top:auto` (L691–698); `.stat` baseline space-between (L699–704); `.stat-num` mono 1rem accent (L705–709); `.stat-label` .78rem dim (L710–713).
- `.bento-illus`: absolute `inset: auto -10% -10% auto; width:60%; opacity:.18; pointer-events:none` (L715–721); inline SVG inherits `currentColor` (HTML:281–292).
- Cursor glow: `::before` radial `600px circle at var(--mx,50%) var(--my,50%)`, orange 0.10 → transparent 40%, opacity 0 → 1 on hover, .3s (L1668–1682). `--mx/--my` are percentages written by JS mousemove (`JS:176–189`), skipped under reduced motion.
- Tag pulse on first reveal: `.bento-card.is-in .b-tag::after` is an accent-filled rounded box animating opacity .3→0, scale .85→1.4 over 1.6s once, delay .3s (L1774–1790); disabled under reduced motion (L1798).

### 4.10 Publications (`.pubs`, `.pub`)

- `.pubs`: `list-style:none`, column, `gap:0`, `counter-reset:none` (L2246–2253). Rows, not cards.
- `.pub`: grid `5.5rem 1fr`, gap 1.2rem, padding 1.4rem 0, `border-top:1px solid var(--border)`; last child gets bottom border (L2254–2261).
- `.pub-year` mono .8rem 0.1em accent (L2262–2268); `.pub-body` column gap .3rem (L2269); `.pub-title` 1.05rem/1.4 −0.01em, link text colour → accent on hover (L2270–2277); authors/venue/doi as §2.3; DOI `word-break:break-all`, accent hover (L2280–2287).
- ≤640: single column, gap .4rem (L2288–2291).

### 4.11 Track record (`.record`)

- Grid 4 → 2 (≤920) → 2 with `minmax(0,1fr)` (≤640) (L822–826, L1219, L1252).
- `.record-card`: radius lg, surface, border, padding 1.5rem 1.4rem, flex column gap .4rem; no hover transform, only the cursor glow `::before` (L827–835, L1668–1682). Late rule: `min-width:0; overflow-wrap:anywhere` to stop long labels blowing out the grid (L2347).
- `.record-num`: serif 400, `clamp(2.4rem,4vw,3.2rem)`, lh 1, −0.03em, gradient text (L836–846); late `display:inline-block` + `background-size:200% 200%` + `gradient-shift 8s` (L1684).
- Numbers are animated from `data-target`/`data-suffix` by JS (count-up 1100ms ease-out-cubic, `JS:139–174`); under reduced motion they are set instantly (`JS:149`).

### 4.12 Writing (`.thinking-*`)

- `.thinking-wrap`: `1.4fr 1fr`, gap clamp, stretch; 1 col ≤820 (L2153–2158, L2189–2191).
- `.thinking-feature`: block link, `--border-hi`, radius lg, surface, padding clamp 1.6–2.2rem, transitions border/background/transform .25s; hover → accent border, surface-2, `translateY(-3px)` (L2159–2167).
- `.t-eyebrow` mono .7 0.12em uppercase accent (L2168–2172); h3 clamp 1.5–2rem/1.15 (L2173); p 1rem/1.6 dim (L2174); `.t-read` inline-flex gap .4rem accent .92 500 with `margin-top:1.2rem`; gap widens to .6rem on card hover (L2175–2176).
- `.thinking-list`: column (L2177). `.thinking-link`: block, padding 1rem 0, top border, text, transitions colour + padding-left .18s; first child no border; hover → accent and `padding-left:.3rem` (L2178–2183). `.tl-meta` mono .68 0.08em uppercase faint (L2184–2187).
- `.thinking-more` inline-flex gap .4rem accent .9 500, margin-top 1.2rem (L2188).

### 4.13 About

- `.about-grid` 1.6fr/1fr (L725–730); prose 1rem/1.7 dim with 1rem paragraph gaps (L731–736).
- `.about-facts` aside: column gap 1.1rem, padding 1.5rem, 1px border, radius lg, surface (L737–745).
- `.about-fact` column gap .3rem (L746–750); label mono .7 0.12em uppercase faint (L751–757); value .92/1.5 text (L758–762); links accent (L763).

### 4.14 Contact

- `.contact`: centered, padding `clamp(3rem,6vh,5rem) var(--gutter)`, radius xl, three-layer background — two radial glows (orange .22 top, purple .18 bottom) over a 135deg warm→pink→purple linear at .1/.06/.1 — 1px `--border-hi`, relative, overflow hidden (L1151–1162).
- Masked gradient border ring via `::before` (L1163–1174).
- h2 mb 1rem; p max 50ch, centered, 1.05rem, mb 1.8rem (L1175–1176); `.contact-row` inline-flex wrap center gap .7rem (L1177–1182); `.contact-meta` flex center wrap gap 1.6rem, mono .78 faint, spans inline-flex gap .4rem (L1183–1193).
- Emoji icons are inline spans with `aria-hidden="true"` (HTML:494–498).

### 4.15 Footer

- `.footer`: margin-top `--section-y`, padding `2.5rem var(--gutter) 2rem`, top border, flex space-between center wrap gap 1rem, faint, .85rem (L1196–1207); links flex gap 1.2rem, hover text (L1208–1209). ≤640 → column, align-start; padding-bottom 4.5rem to clear the fixed to-top button (L1257, L2296–2298).
- `.footer-compact` is a legacy equivalent (L1603–1616).

### 4.16 Buttons

- `.btn`: inline-flex center gap .55rem, padding .85rem 1.4rem, radius 999px, .95rem 500, `border:1px solid transparent`, `white-space:nowrap`, transitions transform/box-shadow/background .18–.2s (L454–465).
- `.btn-primary` and `.btn-gradient` are **identical**: `--grad-warm`, white, `--shadow-glow`; hover `translateY(-2px)` + `0 12px 32px -8px rgba(255,107,53,.6)` (L466–471, L478–483).
- `.btn-ghost`: surface, text, `--border`; hover surface-hi + border-hi (L472–477).
- SVG 16×16, stroke currentColor, fill none, stroke-width 2 (L484).
- Shimmer: `.btn-gradient::after` (and `.nav-cta::after`) is a white 25% 120deg band translated ±100% over .6s on hover (L315–323, L1715–1724).
- ≤640: all `.btn` width 100%, centered, min-height 44 (L1254); hero CTAs 48 (L1255); contact row stacks (L1256).

### 4.17 Tags / chips

- `.b-tag` — bare mono accent label (L644–650) + reveal pulse (L1777–1790).
- `.tag-chip` — pill: inline-flex gap .45rem, mono .78 0.04em, padding .4rem .8rem, 999px, border, surface, dim, transitions .2s; hover accent border, text, surface-2 (L2307–2325); `.tag-count` .7rem accent (L2326–2329); `.tag-cloud` flex wrap gap .6rem mb 2.5rem (L2301–2306).
- `.post-meta .tag`, `.post-card-meta .tag` — accent inline text (L1425–1427, L1852); category tints `.cat-ai` cyan, `.cat-foresight` lime, `.cat-travel` orange (L1863–1865). There is no generic `.tag` component.
- `.flag-pill` — atlas only: inline-flex gap .5rem, padding .55rem .95rem, surface, border, 999px, .88rem 500, hover lift 2px (L1070–1092); used by the legacy country cloud (L1063–1148).

### 4.18 Cards (generic pattern)

The shared card recipe is: `position:relative; background:var(--surface); border:1px solid var(--border); border-radius:var(--r-lg); overflow:hidden; transition transform/border/background .25s`, plus hover `translateY(-3px)` to `--border-hi`/`--surface-2`. Implemented separately for `.bento-card` (L627–643), `.quote-card` (L771–782), `.post-card` (L1823–1844), `.post-nav-link` (L2211–2225), `.thinking-feature` (L2159–2167). There is no shared `.card` class.

### 4.19 Supporting components present but not used on the home page

- **Quotes** (`.quotes`, `.quote-card`, `.q-mark`, `.q-author`, `.q-avatar`, `.q-meta`): 3-col → 1; serif italic quotes; giant `::after` quote mark (11rem, accent, opacity .05 → .12 on hover) that parallaxes with `--mx/--my` via `transform: translate(calc((var(--mx,50%) - 50%) * -0.05), …)` (L766–819, L2059–2079).
- **Atlas teaser / constellation / flag cloud** (L850–1148): masked gradient border, 2-col map card, absolute `.cpin` pins with `cpin-pulse`/`cpin-ring`, mono legend, legacy pill cloud. Pins disabled under reduced motion (L1058–1060).
- **Blog index/cards/map** (L1270–1305, L1801–1904): `.blog-switch` segmented control, `.blog-grid` auto-fill, `.post-card`, `.travel-map` + tooltip + legend.
- **Article/post** (L1339–1574): 720px measure, full-bleed cover → contained ≥720, prose scale, blockquote, code/pre, tables, `.post-back`.
- **Post nav** (L2202–2244): 2-up prev/next cards.
- **To-top button** (L2082–2130): 44px circle, injected by JS, `opacity/transform` transition, blur backdrop, hides over footer.
- **View-transition fade** (L2132–2148).

---

## 5. Animation

### 5.1 Keyframes inventory

| Name | Definition | Applied | Duration / easing | Reduced-motion handling |
|---|---|---|---|---|
| `pulse` | L420–423, opacity 1→.4 + scale 1→.7 | **never** (dead) | — | n/a |
| `cpin-pulse` | L991–995, expanding box-shadow ring | L967 `.cpin`, infinite | 2.6s ease-out | `animation:none` L1059 |
| `cpin-ring` | L996–999, scale .6→1.6, opacity .8→0 | L989 `.cpin.is-home::after`, infinite | 3.4s ease-out | `animation:none` L1059 |
| `gradient-shift` | L1656–1659, background-position 0/50 → 100/50 → 0/50 | L1655 hero swap (6s), L1684 record-num (8s), infinite | ease-in-out | `animation:none` L1795 |
| `orb-drift` | L1662–1666, translate ±2% + scale 1.04/.98 | L1661 `body::before`, infinite alternate | 22s ease-in-out | `animation:none` L1794 |
| `float-bob` | L1727–1730, rotate 1.2deg translateY 0→−6px | L1731 `.hero-portrait`, infinite | 5.5s ease-in-out | `animation:none` L1796; hover transform removed L2054–2056 |
| `tech-scroll` | L1753–1756, translateX 0→−50% | L1759 `.tech-strip-items`, only inside `no-preference` | 40s linear infinite | animation **absent** (not just slower) |
| `tag-pulse` | L1787–1790, opacity .3→0, scale .85→1.4 | L1784 on `.bento-card.is-in .b-tag::after`, 1 iteration delay .3s | 1.6s ease-out | `animation:none` L1798 |
| `page-fade` | L1984–1987, opacity 0→1, translateY 4px→0 | L1990 `body`, only inside `no-preference` | .42s house curve `both` | animation absent |
| `reveal-entry` | L2361–2364, opacity 0→1, translateY 16px→0 | L2360 `.reveal.is-in`, only inside `no-preference` | .6s ease-out | animation absent |

### 5.2 Transitions

57 declaration lines use `transition`. Recurring durations: `.18s` (colour/micro), `.2s`, `.22s`, `.25s` (cards), `.28s` (logo), `.32s` (underline sweep, theme icons), `.42s` (theme icon transform), `.5s` (portrait), `.6s` (shimmer), `.9s` (section underline). The house easing `cubic-bezier(.2,.8,.2,1)` is used for transforms and underlines; simple colour fades use bare `ease` or `linear`.

Multi-property examples worth copying verbatim:
- `transition: color .18s, background .18s` (L299).
- `transition: transform .25s ease, border-color .25s ease, background .25s ease` (L637).
- `transition: opacity .32s ease, transform .42s cubic-bezier(.2,.8,.2,1)` (L345).
- `transition: background .25s ease, box-shadow .25s ease, padding .25s ease, border-color .25s ease` (L1930).
- `transition: opacity .32s ease, transform .32s cubic-bezier(.2,.8,.2,1), background .2s ease, color .2s ease, border-color .2s ease` (L2103).

### 5.3 Reveal mechanism (and its stagger bug)

- `.reveal` is **visible by default**: `opacity:1; transform:none` (L1633). `.reveal.is-in` repeats the same (L1634). This is deliberate no-JS protection.
- Entrance animation only exists inside `prefers-reduced-motion: no-preference`: `.reveal.is-in { animation: reveal-entry .6s ease-out }` (L2359–2365).
- JS adds `.is-in` once at 12% visibility with `rootMargin: 0 0 -8%`, then unobserves (`JS:52–68`); under reduce it adds `.is-in` to everything immediately (`JS:56–57`), and without IntersectionObserver it reveals everything (`JS:58`).
- Stagger rules `[data-delay="1"…"5"]` set **`transition-delay`** (L1635–1639), but the entrance is an **animation**, so those delays do not affect it. `data-delay="0"` has no rule. The visible stagger on the bento/record grids is therefore inert in the current build. Do not port this as-is.

### 5.4 Marquee

See §4.7. Key constraints for a reimplementation: duplicated content + `translateX(-50%)`, `width:max-content`, 40s linear, pause on hover/focus-within, mask fade at 4%/96%, and the animation must live inside `no-preference` so reduced motion removes it entirely.

### 5.5 Hero word swap

Styling exists for `.swap-wrap` only (gradient text, serif italic, animated gradient position). The inner `#hero-swap` (HTML:187) has no CSS and no JS; there is no text-rotation/typing mechanic in the shipped files.

### 5.6 Scroll chrome

- Progress bar: 2px gradient line, width driven by scroll %, `.08s linear` smoothing (L1911–1926, `JS:71–88`).
- Nav scrolled state past 32px (L1928–1940, `JS:90–104`).
- Active nav link computed from section offsets + a 110px line, with a bottom-of-page special case (`JS:106–137`).
- Floating to-top appears past 600px and hides when the footer enters; click scrolls smooth unless reduced motion (`L2082–2130`, `JS:205–237`).
- Page transition: `body.is-leaving { opacity:0; transition:opacity .22s }` (L2132–2136) + View Transitions duration .22s house curve under no-preference (L2142–2147); JS only uses the opacity fallback when `startViewTransition` is absent (`JS:239–280`).

### 5.7 Reduced-motion strategy

Two layers:
1. A **global kill switch**: `*, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important }` (L1263–1268).
2. **Component opt-outs**: explicit `animation:none` for CPins (L1059), orb drift / hero gradient / record gradient / portrait / marquee / tag pulse (L1792–1799); transition removal for theme icons (L352), progress (L1924), inline links (L2012), portrait hover (L2054), quote parallax (L2077), to-top (L2127), page fade (L2137).

The "absent, not faster" contract is only fully honoured for `tech-scroll`, `page-fade`, and `reveal-entry` (each defined solely inside `no-preference`). Everything else is shortened to 0.01ms instead of removed, and infinite animations are disabled by name.

Gap: `html { scroll-behavior: smooth }` is declared unconditionally at L57, and the later guarded declaration at L2025–2027 does not reset it under `reduce`. Smooth anchor scrolling therefore still runs for reduced-motion users. A port should move smooth scrolling entirely inside `no-preference`.

---

## 6. Accessibility mechanics in CSS

### 6.1 Focus

```css
:focus:not(:focus-visible) { outline: none; }                    /* L63 */
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }  /* L64 */
```
This is global and survives every component. No component removes it. Note the outline colour is `--accent`, which rethemes (dark `#ff6b35`, light `#a82a00`).

### 6.2 Skip link

§4.4. Off-screen via `translateY(-200%)`, reveal on `:focus`, z-index 10000, 2px accent border, background `--bg`, so it is legible in both themes.

### 6.3 Target sizes

| Control | Desktop | ≤920 | ≤640 | Line |
|---|---|---|---|---|
| `.icon-btn` | 38×38 | 44×44 | 44×44 | L326, L1223 |
| Nav link | ~34px tall (padding .5rem) | same | 44 min-height in open menu | L295, L1245 |
| `.nav-cta` | ~41px tall | same | 44 via menu-link rule | L302–308, L1245 |
| `.btn` | ~51px tall | same | width 100%, min 44 (hero 48) | L454–465, L1254–1255 |
| `#to-top` | 44×44 | 44×44 | 44×44 | L2086–2087 |
| Skip link | padding .8/1.1rem | — | — | L2337 |

The 38px desktop icon button and sub-44px nav links are below WCAG 2.5.8 AAA (44px) but meet 2.5.8 AA (24px). The comment at L1221–1222 explicitly says 44px is applied from 920px down because touch becomes primary.

### 6.4 Contrast

- The two source comments (L96–97, L131–134) document the method: raw brand oranges/pinks fail 4.5:1, so `--grad-warm` and the light-mode accents are darkened; dark mode keeps vibrant values.
- Gradients used as **button backgrounds** use `--grad-warm` (darkened) + white text. Gradients used as **text fill** also use `--grad-warm`. `--grad-border` is decorative only.
- Raw accent RGB survives in decorative glows/pins/shadows (L163–165, L925–926, L964, L974, L981, L988, L1004, L1044, L1048, L1156–1158, L1675, L1838, L1922). These are non-text, so contrast is not at stake, but they do not retheme.
- `--text-faint` light (0.70) is more opaque than `--text-dim` light (0.66), inverting the intended rank (§1.2).
- `--accent-lime` light `#3d6100` and `--accent-cyan` light `#006574` are darkened for text use on light surfaces (L137–138).

### 6.5 Other mechanics

- `aria-hidden="true"` on the progress bar (HTML:154) and decorative SVGs (HTML:213, HTML:495–497).
- `.tech-strip` is focusable with an explanatory label (HTML:235); hover **and** focus-within pause the marquee (L1762–1763), so keyboard users get the same control.
- `main#top` has `tabindex="-1"` so the skip link moves focus into content (HTML:180); nav hash links also set `tabindex=-1` and focus the target (`JS:31–38`).
- Mobile menu syncs `aria-expanded`, supports Escape, returns focus to the toggle, closes on outside click and on resize (`JS:14–50`).
- No-JS: theme toggle hidden (L2345–2346), mobile nav falls back to a wrapped inline list (L2349–2358), reveal content is visible (L1633). The one broken case is the tech-strip marquee (§4.7).
- **Print styles: none exist.** There is no `@media print` anywhere, so printing yields the dark background gradient, fixed nav chrome, and scroll-progress bar. If print matters, it must be added.
- No `forced-colors`/`prefers-contrast` support; under Windows High Contrast the masked gradient borders and gradient-clipped text will likely disappear because forced colours replace backgrounds.

---

## 7. What would not survive a clean port to Tailwind / Astro

1. **Masked 1px gradient borders.** The `inset:-1px; padding:1px; -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude` pattern appears six times (L531–543, L673–684, L863–875, L1105–1117, L1163–1174, L1882–1894). Tailwind has no `mask-composite` utilities; this needs a small component class or an `@utility`.
2. **Cascade-by-append.** `.section` is defined at L225 and redefined at L1868; `.hero h1` at L424 and L2197; `.hero-portrait:hover` at L522 and L2050; `.theme-toggle` display at L2345 after `.icon-btn`. A Tailwind/Astro rewrite flattens this, so the *effective* values (documented above) must be the target, not the earlier declarations.
3. **Default-dark theming.** Dark lives on `:root`, light on `[data-theme="light"]` (L67–143). Tailwind's `dark:` convention assumes light default; you must either invert the strategy or map tokens to CSS variables and keep a `[data-theme]` attribute. The 30-line `theme.js` (no `prefers-color-scheme`) is the whole runtime.
4. **Runtime CSS variables for pointer effects.** `--mx`/`--my` are written inline by JS (`JS:176–189`) and consumed in `radial-gradient(... at var(--mx,50%) var(--my,50%))` and in a `calc()`-based parallax `transform` (L1675, L2072). Tailwind arbitrary values cannot express runtime variables cleanly; keep these as component CSS.
5. **Very specific contextual selectors.** `main p a:not(.btn):not(.nav-cta):not(.nav-logo)` with a `background-size` underline animation (L1995–2017), `:is(h1,h2)::after` tied to a `.is-in` ancestor (L1734–1748), `.nav-logo span:not(.logo-mark)` (L1978). These are not utility-shaped.
6. **Element-level background chrome.** `body::before` (three radial gradients + 22s drift) and `body::after` (fixed 56px grid) plus the `z-index:0 / 1` stacking contract (L158–192). In Astro this must live in a global layout stylesheet, not scoped component styles.
7. **Max-width media queries.** The system is desktop-first: 920 / 820 / 720(min) / 640. Tailwind is min-width first; either add `max-*` screens or rewrite the four grids mobile-first and verify the same visual states.
8. **Double-gutter layout.** `.section` self-constrains while `.container` also constrains (L219–225, L1868). Astro layout components would normally own one wrapper; reproduce the 1072px content width deliberately or drop the nested padding.
9. **Marquee correctness depends on JS.** CSS `translateX(-50%)` requires the JS `innerHTML += innerHTML` duplication (`JS:191–198`). Astro islands can do this at build time (duplicate in markup) — better than runtime JS, but then the reduced-motion CSS must still hide the second half or the animation must be absent.
10. **Reveal uses animations, not transitions, and the delay hooks are transitions.** A naive Tailwind port copying `transition-delay` classes would reproduce the inert stagger (L1633–1639, L2359–2365). Decide: either animate with `animation-delay` or restore a transition-based reveal.
11. **Gradient-clipped text with no fallback.** Five sites set `color: transparent` + `-webkit-text-fill-color: transparent` (L210–216, 428–440, 842–846, 887–891, 1684). Astro/Tailwind won't warn; add `@supports` fallback.
12. **`backdrop-filter` with per-theme hardcoded rgba backgrounds.** Nav L263–268, mobile menu L1235/1244, to-top L2100. These are not tokenised; the light overrides are separate rules.
13. **`clamp()` everywhere.** 29 sites; Tailwind arbitrary values (`text-[clamp(...)]`) work but destroy the scale's readability. Prefer CSS variables for the display sizes.
14. **`unicode-range` font subsets + preload.** Six `@font-face` blocks (L1–53) with latin/latin-ext splits and two preloads (HTML:148–149). Astro's `experimental.fonts` or a manual `@font-face` file is needed; Tailwind alone does nothing here.
15. **No motion tokens.** Easing and durations are literals; if the port wants to keep the exact feel, introduce `--ease`/`--dur-*` tokens during the port and map every literal (L345 et seq.) to them — otherwise the "identical" claim is unverifiable.
16. **Guarded animation sets.** `tech-scroll`, `page-fade`, `reveal-entry` only exist under `no-preference` (L1757, L1988, L2359), which is a stronger contract than `animation-duration:.01ms`. Tailwind's `motion-reduce:` variant only removes/alters per-utility; you must ensure these are *absent*, not shortened.
17. **`::view-transition-*` rules** (L2142–2147) have no Tailwind equivalent and must be global CSS.

---

## 8. Home-page usage matrix (what a portfolio clone actually needs)

| Section (HTML) | Components | Primary CSS |
|---|---|---|
| Skip + progress (`HTML:153–154`) | `.skip-link`, `#scroll-progress` | L2332–2344, L1911–1926 |
| Header (`HTML:156–178`) | `.nav`, `.nav-logo`, `.logo-mark`, `.nav-links`, `.nav-cta`, `.nav-tools`, `.icon-btn`, `.lang-toggle`, `.theme-toggle`, `.nav-toggle` | L254–407, L1928–1981, L1226–1248, L2345–2346 |
| Hero (`HTML:182–233`) | `.hero`, `.hero-grid`, `.swap-wrap`, `.hero-lead`, `.hero-cta-row`, `.btn.btn-gradient/.btn-ghost`, `.hero-meta`, `.hero-portrait`, `.portrait-tag`, `.pulse` | L410–571, L1727–1732, L2046–2056, L2196–2200 |
| Tech strip (`HTML:235–253`) | `.tech-strip`, `-label`, `-track`, `-items` | L573–618, L1752–1764 |
| 01 Work (`HTML:256–310`) | `.section`, `.section-head`, `.section-num`, `.bento`, `.bento-card.b-feature/.b-tall/.b-third`, `.b-tag`, `.bento-stats`, `.bento-illus`, `.b-outcome` | L219–251, L621–722, L1641–1653, L1668–1682, L1734–1748, L1767–1790 |
| 02 Publications (`HTML:312–359`) | `.pubs`, `.pub`, `.pub-year`, `.pub-body`, `.pub-title/.authors/.venue/.doi` | L2246–2291 |
| 03 Record (`HTML:361–391`) | `.record`, `.record-card`, `.record-num`, `.record-label`, `.record-sub` | L822–848, L1684, L2347 |
| 04 Writing (`HTML:393–425`) | `.thinking-wrap`, `.thinking-feature`, `.t-eyebrow`, `.t-read`, `.thinking-list`, `.thinking-link`, `.tl-meta`, `.thinking-more` | L2153–2191 |
| 05 About (`HTML:427–478`) | `.about-grid`, `.about-prose`, `.about-facts`, `.about-fact` | L725–763 |
| Contact (`HTML:480–501`) | `.contact`, `.section-eyebrow`, `.contact-row`, `.contact-meta` | L1151–1193, L226–248 |
| Footer (`HTML:505–515`) | `.footer`, `.footer-links` | L1196–1209, L2296–2298 |

Not needed for the home page: quotes, atlas/constellation/flags, blog index/cards/map, article/post, post-nav, `.footer-compact`, `.section-label/.section-title/.section-lede`, `.tag-cloud/.tag-chip`, `.blog-switch`, `.post-back`, `.map-*`.

---

## 9. Defects and traps to not copy blindly

1. `html { scroll-behavior: smooth }` is unconditional (L57); the later guarded copy (L2025–2027) never resets it under `prefers-reduced-motion: reduce`.
2. Reveal stagger uses `transition-delay` (L1635–1639) while the effect is an animation (L2360) — stagger does nothing.
3. `.section:first-of-type::before { display:none }` (L2043) cannot match the first `.section` on the home page because the hero is the first `<section>` (HTML:182).
4. Double horizontal gutter from `.section` + nested `.container` (L219–225, L1868) — home content is 1072px wide vs. the hero's 1136px at max size.
5. `--text-faint` is less opaque than `--text-dim` in dark but more opaque in light (L81–82, L126–127).
6. Tech strip marquee is CSS-driven but its seamless loop depends on JS duplication (L1753–1764, `JS:191–198`); no-JS yields a jumping, half-empty strip.
7. `.process { grid-template-columns:1fr }` (L1251) targets a class that does not exist anywhere.
8. `#hero-swap` has styles for its wrapper but no swap logic in CSS or JS (HTML:187, L428–440, L1655).
9. `@keyframes pulse` (L420–423) is defined and never referenced; the `.pulse` element (L566–571) is static.
10. `.hero-portrait:hover` is declared twice with different transforms (L522 vs L2050); only the later wins.
11. `.btn-primary` and `.btn-gradient` are duplicate rule sets (L466–471, L478–483).
12. `.nav-cta` is about 41px tall on desktop, under the 44px target that the rest of the system applies below 920px (L302–308, L1245).
13. Decorative accent glows keep raw `rgba(255,107,53,…)` in light mode, so they are warmer/stronger than the light-mode accent text tokens (L311, L471, L1922, etc.).
14. `@keyframes` plus global `animation-duration:.01ms !important` means the remaining infinite animations are not guaranteed to be *absent* in every engine (L1263–1268, L1792–1799).
15. Gradient-clipped text has no non-support fallback (L210–216 and repeats).
