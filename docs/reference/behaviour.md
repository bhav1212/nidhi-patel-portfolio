# Reference site — JavaScript behaviour audit

Source: `/tmp/ref-site/site/` (snapshot of `bhaveshjain.com`, static HTML/CSS/JS).
Files audited: `script.js` (282 lines), `theme.js` (30 lines), cross-checked against
`index.html` (519 lines), `de/index.html`, and `styles.css` (69 KB).

Purpose: document every runtime behaviour so it can be **ported deliberately, not pasted**.
Each entry gives name, location, trigger, DOM hooks, effect, timing/easing,
reduced-motion behaviour, no-JS behaviour, failure mode, and a port decision.

---

## 0. File map and load order

| File | Loaded | Line | Notes |
|---|---|---|---|
| `theme.js` | `<head>`, **synchronous, before the stylesheet** | `index.html:31` | Render-blocking by design: applies theme and `has-js` pre-paint |
| `styles.css` | `<head>` | `index.html:151` | Contains the CSS half of most "JS" behaviours |
| `script.js` | end of `<body>` | `index.html:517` | Two separate `DOMContentLoaded` listeners (`:7` and `:203`) |
| `de/index.html` | German mirror | `de/index.html:519` | Loads `../script.js`; same behaviour, localized labels in `theme.js` |

There is **no analytics of any kind** in the snapshot: no GA/gtag, Plausible, Umami,
Fathom, Matomo, PostHog, Cloudflare/Vercel beacon, or `sendBeacon`. Verified by
case-insensitive grep across all HTML/JS. See §15.

No `<noscript>` element exists anywhere. The no-JS contract is enforced entirely in CSS
via the `has-js` / `nav-ready` classes (see §1 and §4).

---

## 1. Pre-paint theme boot + `has-js` flag

- **File / lines:** `theme.js:1-6`
- **Trigger:** parser reaches the blocking `<script src="/theme.js">` in `<head>` (`index.html:31`), before the stylesheet link at `:151`
- **DOM hooks:** `documentElement` → `data-theme="light"`, class `has-js`; `localStorage["theme"]`
- **What it does:** adds `.has-js` to `<html>`; if `localStorage.theme === "light"`, sets `data-theme="light"`. There is **no `prefers-color-scheme` read** — the default is always dark, and light is opt-in only.
- **Timing / easing:** none (synchronous, pre-paint)
- **Reduced motion:** N/A
- **No-JS:** `has-js` never appears → theme toggle stays `display:none` (`styles.css:2344-2345`), page renders in the default dark palette. Clean degradation.
- **Failure mode:** `try/catch` swallows blocked-storage / sandboxed-iframe `SecurityError` correctly. The cost is a **render-blocking extra request** before CSS: hurts FCP vs. an inline snippet. No cross-tab sync (no `storage` listener), so a toggle in one tab does not update another.
- **Verdict:** **PORT WITH CHANGES** — inline this exact logic into `<head>` (removes a round-trip), add `prefers-color-scheme` as the default and a `storage` listener for cross-tab sync. Keep it pre-paint and keep `try/catch`.

---

## 2. Theme toggle button

- **File / lines:** `theme.js:8-29`; visuals `styles.css:355-366` (icon cross-fade/rotate), `:2344-2345` (visibility gate)
- **Trigger:** `click` on `.theme-toggle`
- **DOM hooks:** `.theme-toggle` (button), `html[data-theme]`, `html[lang]`
- **What it does:** toggles `data-theme="light"` on/off (dark = attribute absent); writes `localStorage.theme`; then `sync()` rewrites `aria-label` and `title` in EN or DE depending on `documentElement.lang`. Labels are action-oriented ("Switch to dark theme"), not state-oriented.
- **Timing / easing:** none in JS; CSS cross-fades the moon/sun icons `0.32s ease` opacity and `0.42s cubic-bezier(0.2,0.8,0.2,1)` rotate/scale (`styles.css:355-366`).
- **Reduced motion:** icon transition disabled under `prefers-reduced-motion` (`styles.css:367-369`).
- **No-JS:** button hidden; default theme only. Acceptable, but a no-JS user cannot choose light.
- **Failure mode:** `localStorage` write wrapped in `try/catch`. `meta[name=theme-color]` is **not** updated on toggle (the two tags at `index.html:8-9` only cover `prefers-color-scheme`), so mobile browser chrome can mismatch. No `color-scheme` property is flipped, so native form controls/scrollbars may not follow.
- **A11y:** it is a `<button>` with an updating accessible name — good. No `aria-pressed` (correct for an action-labelled toggle, but pick one convention and document it). No live announcement; acceptable for a visual theme change. Keyboard works natively.
- **Verdict:** **PORT WITH CHANGES** — keep the pattern; add `color-scheme`, update `theme-color`, and optionally a three-state (system/light/dark) control.

---

## 3. Year stamp

- **File / lines:** `script.js:9-12`
- **Trigger:** `DOMContentLoaded`
- **DOM hooks:** `#year` (footer `<span>` at `index.html:502`)
- **What it does:** writes `new Date().getFullYear()` into every `#year`.
- **Timing / easing:** none
- **Reduced motion:** N/A
- **No-JS:** renders `©  Bhavesh Jain` — **a visible blank year**. This is a genuine no-JS defect.
- **Failure mode:** `querySelectorAll` tolerates accidental duplicate IDs; harmless. The date is client-clock based, so a wrong system clock shows a wrong year.
- **Verdict:** **REPLACE WITH CSS/build step** — hard-code the year at build time (or render `2026` in HTML and let JS update it), so no-JS and crawlers see a complete footer. If kept, ship a fallback year in the markup.

---

## 4. Mobile nav toggle (disclosure)

- **File / lines:** `script.js:14-50`; CSS `styles.css:1227-1252` (panel), `:2348-2358` (no-JS fallback)
- **Trigger:** `click` on `.menu-toggle, .nav-toggle`; `click` inside `.nav-links`; `Escape`; click outside; `matchMedia('(min-width: 641px)')` change
- **DOM hooks:** `.nav-toggle` / `.menu-toggle`; `.nav-links` / `.masthead-nav`; class `.open`; `aria-expanded`; `aria-controls="nav-links"` (`index.html:174`); `html.nav-ready`
- **What it does:**
  - `setMenu(open)` toggles `.open` and writes `aria-expanded="true|false"`.
  - Opening moves focus to the first link (`:25`).
  - Clicking any link inside closes the menu; if the href starts with `#`, it sets `tabindex="-1"` on the target section and focuses it with `{preventScroll:true}` (`:27-39`).
  - `Escape` closes **and restores focus to the toggle** (`:40-44`) — a real a11y strength.
  - Outside click closes (`:45-47`); crossing the 641px breakpoint closes (`:48`).
  - `nav-ready` is added last (`:50`) so the mobile CSS only activates once wiring exists.
- **Timing / easing:** none in JS; panel styling/transition in CSS.
- **Reduced motion:** N/A (no motion in the JS path)
- **No-JS:** `html:not(.nav-ready) .nav-links` is forced visible and wrapped to a full-width row under 640px (`styles.css:2348-2358`); the toggle is only displayed by `.nav-ready` rules. Navigation remains fully usable — good progressive enhancement.
- **Failure mode / gaps:**
  - **No focus trap.** The panel is rendered as a disclosure, not a modal, so focus can tab straight into the page behind it. Defensible for a disclosure, but if you style it as an overlay you need `inert` on the rest of the page or a trap.
  - Outside-click close does **not** restore focus.
  - No arrow-key roving focus inside the menu.
  - `tabindex="-1"` is written permanently onto every anchor target; harmless but pollutes the DOM.
  - `querySelector` picks only the first matching toggle/nav — fine for this markup, fragile if duplicated.
- **Verdict:** **PORT WITH CHANGES** — keep `aria-expanded`, Escape-restores-focus, outside-click, breakpoint auto-close, and the `nav-ready` pre-wiring. Add focus containment (or `inert`) if the panel overlays content, and close on `hashchange`/route change.

---

## 5. Scroll progress bar

- **File / lines:** `script.js:70-88`; CSS `styles.css:1911-1926`
- **Trigger:** `scroll` (passive), `resize` (passive), initial call
- **DOM hooks:** `#scroll-progress` (`index.html:154`, `aria-hidden="true"`)
- **What it does:** computes `scrollY / (scrollHeight - clientHeight) * 100`, clamped 0–100, writes `style.width`.
- **Timing / easing:** rAF-coalesced (`ticking` flag); CSS `transition: width 0.08s linear` (`styles.css:1921`) smooths between frames.
- **Reduced motion:** the 0.08s width transition is disabled (`styles.css:1924-1926`); the bar itself still tracks scroll, which is informational, not decorative.
- **No-JS:** bar exists with `width:0` → invisible; no layout impact.
- **Failure mode:** reads `scrollHeight` every frame — fine at this scale, but on pages with lazy-loaded images below the fold the denominator grows late, so the percentage can jump backwards. No `ResizeObserver` on `documentElement`.
- **INP/CLS:** passive listener + rAF is the correct pattern. Fixed 2px element with `position:fixed` → no CLS.
- **Verdict:** **PORT AS-IS** (optionally add a `ResizeObserver` to keep the ratio correct as content loads).

---

## 6. IntersectionObserver reveal with `data-delay` stagger

- **File / lines:** `script.js:52-68`; CSS `styles.css:1633-1639` (base + delays), `:1793-1798` (reduced motion), `:2359-2367` (entry animation)
- **Trigger:** `DOMContentLoaded`; element enters viewport
- **DOM hooks:** `.reveal`, class `.is-in`, `data-delay="0..5"` (e.g. `index.html:265,276,295,302,369-385`)
- **What it does:** creates one `IntersectionObserver` at `{threshold: 0.12, rootMargin: '0px 0px -8% 0px'}`, adds `.is-in` on entry, then `unobserve`s — one-shot.
- **Timing / easing:** CSS `@keyframes reveal-entry` 0.6s `ease-out`, `translateY(16px) → 0` (`styles.css:2361-2365`). Intended stagger: `data-delay` 1–5 → `transition-delay` 0.07s steps up to 0.35s (`styles.css:1635-1639`).
- **Reduced motion:** all elements get `.is-in` immediately and the observer is never created (`script.js:56-57`); the `reveal-entry` animation is wrapped in `prefers-reduced-motion: no-preference` (`styles.css:2359`), and a global `*{animation-duration:.01ms!important}` kill switch exists at `styles.css:1262-1266`.
- **No-JS:** base rule is `.reveal { opacity: 1; transform: none; }` (`styles.css:1633`) — **content is visible without JS**. This is the single best decision in the file: reveal is additive, never a content gate.
- **Failure mode / bug:** **the stagger does not work.** `data-delay` sets `transition-delay`, but the reveal is implemented as an **animation**, and `transition-delay` has no effect on CSS animations. Every `.reveal.is-in` animates simultaneously for 0.6s. Lines 1635-1639 are dead code in this build.
- **INP/CLS:** animates only `opacity` and `transform` — compositor-friendly, no CLS because the element is never hidden in layout.
- **Verdict:** **PORT WITH CHANGES** — keep the visible-by-default base and one-shot observer; fix the stagger by moving delays to `animation-delay` (or switch to a `transition`-based reveal). Do not reproduce the dead `transition-delay` rules.

---

## 7. Count-up animation (`data-target`, `data-suffix`)

- **File / lines:** `script.js:139-174`; CSS `styles.css:1792-1798` (reduced-motion kill)
- **Trigger:** `DOMContentLoaded`; `#record` entering viewport
- **DOM hooks:** `.record-num[data-target]`, `data-suffix`; `#record`; `.record-card`; class `.is-in` (`index.html:369-386`)
- **What it does:** observes the `#record` section at `{threshold: 0.08, rootMargin: '0px 0px 18% 0px'}`. On entry: marks every card `.is-in` and animates each `.record-num` from 0 to `data-target`, appending `data-suffix` (`+`).
- **Timing / easing:** 1100 ms, `easeOutCubic` (`1 - (1-t)^3`), driven by `requestAnimationFrame`, rounded each frame.
- **Reduced motion:** the whole observer branch short-circuits — cards are marked `.is-in` and the function returns **before** `animate()` is ever called (`:164-167`), so the static HTML value (`6+`, `4`, `12+`, `7`) simply stays. (The `if (reduce)` guard inside `animate` at `:149` is therefore dead code in practice.)
- **No-JS:** the final values are already in the HTML (`index.html:370,375,380,385`) — correct numbers, no animation. Excellent.
- **Failure mode:** if `#record` is absent or IO unsupported, it returns after marking cards visible. If JS fails mid-run, numbers freeze at an intermediate value (rare, 1.1s window).
- **A11y:** no `aria-live`, so the churn is not announced (good). But because the text is mutated, a screen reader that queries mid-animation could read a partial number. Safer: keep the final value in the accessible name (`aria-label="6 or more projects"`) and mark the visual counter `aria-hidden="true"`.
- **INP:** one short rAF loop, negligible.
- **Verdict:** **PORT WITH CHANGES** — keep timing/easing and the "static HTML holds the truth" fallback; add the accessible-name guard and localize numbers (`Intl.NumberFormat`).

---

## 8. Hero "rotating word" — **not implemented**

- **Expected by the brief; absent from this snapshot.**
- **File / lines:** markup `index.html:187` (`<span class="swap-wrap"><span id="hero-swap">production AI</span></span>`), `de/index.html:187`; CSS `styles.css:428-440` and `:1655-1660`
- **What actually happens:** `#hero-swap` is **static text**. The only motion is a `gradient-shift` animation on the wrapper (200% background position, 6s `ease-in-out` infinite) — the italic serif word's gradient slides; the word never changes. There is no JS anywhere that touches `#hero-swap`, no word array, no interval.
- **Reduced motion:** the gradient animation is disabled (`styles.css:1795`).
- **No-JS:** identical (it is static).
- **Failure mode:** N/A — nothing runs.
- **Verdict:** **REPLACE WITH CSS** if the effect is wanted. Do not invent a JS rotator. If a rotating word is desired: pre-render the words in the DOM, animate with CSS `steps()`/cross-fade under `prefers-reduced-motion: no-preference`, or a ≤20-line JS rotator that pauses on `visibilitychange` and reduced motion. Reserve the widest word's width to avoid CLS.

---

## 9. Tech-strip marquee (duplicate + pause on hover/focus)

- **File / lines:** `script.js:191-198`; CSS `styles.css:573-618` (layout/mask), `:1753-1764` (animation + pause), `:1792-1798` (reduced motion)
- **Trigger:** `DOMContentLoaded`; CSS animation runs continuously
- **DOM hooks:** `.tech-strip-items` (duplicated), `.tech-strip` (`tabindex="0"`, `aria-label` "…auto-scrolling — focus to pause", `index.html:235`)
- **What it does:** `wrap.innerHTML += wrap.innerHTML` clones the whole list once so a `translateX(0 → -50%)` loop is seamless; CSS pauses the animation on `:hover` and `:focus-within`.
- **Timing / easing:** 40s `linear` infinite (`styles.css:1758-1760`); pause via `animation-play-state: paused`.
- **Reduced motion:** JS returns before duplicating (`:193-194`) **and** CSS sets `animation: none` (`styles.css:1797`) — correct on both layers.
- **No-JS:** no duplication, but the **CSS animation still runs** (it is not gated on `has-js`), so the single list scrolls and then snaps/leaves a gap each cycle. A cosmetic no-JS defect, not a content loss.
- **Failure mode / gaps:**
  - `innerHTML +=` **destroys and recreates every node**; any listeners/IDs on the items would be lost. Use `cloneNode(true)` into a `DocumentFragment` instead.
  - The cloned spans are **not `aria-hidden`**, so assistive tech reads the entire stack twice.
  - The `tabindex="0"` wrapper is focusable with an instructional label but has no role and no interactive function — keyboard users tab to a non-control just to pause it. Prefer a real pause `<button>` or drop focusability and rely on `:hover` + RM.
  - Fixed 40s duration regardless of content width → speed varies with list length.
- **Verdict:** **PORT WITH CHANGES** — clone via `cloneNode`, mark the duplicate `aria-hidden="true"`, gate the animation on `.has-js` (or make it CSS-only with a duplicated list in the HTML), and derive duration from measured width.

---

## 10. Nav scroll state

- **File / lines:** `script.js:90-104`; CSS `styles.css:1928-1939`
- **Trigger:** `scroll` (passive), initial call
- **DOM hooks:** `.nav`, class `.is-scrolled`
- **What it does:** toggles `.is-scrolled` when `scrollY > 32`; caches `lastState` so it only writes on change.
- **Timing / easing:** no rAF, but the state guard makes it a single class toggle at the threshold — effectively free. CSS transitions background/shadow `0.25s ease`.
- **Reduced motion:** transitions neutralized by the global RM block.
- **No-JS:** nav renders in its base state permanently; fully usable.
- **Failure mode:** `.nav` is a single `querySelector`; if a page had two headers only the first updates. Despite listing `padding` in the transition property, `.is-scrolled` changes no padding, so there is **no layout shift**.
- **Verdict:** **PORT AS-IS**.

---

## 11. Active nav-link indicator

- **File / lines:** `script.js:106-137`; CSS `styles.css:1943-1962`
- **Trigger:** `scroll` (passive, rAF-coalesced), `resize`, initial call
- **DOM hooks:** `.nav-links a[href^="#"]`, the matching section id, class `.is-active`
- **What it does:** for each mapped link, measures the section's absolute top; picks the nearest section above a `scrollY + 110` line; when at the page bottom (`innerHeight + scrollY >= scrollHeight - 2`) picks the bottom-most section so the last items light up reliably. Deliberately **not** a middle-band IntersectionObserver (comment at `:106-108` explains why).
- **Timing / easing:** rAF-coalesced scroll; CSS underline `transform: scaleX()` 0.32s cubic-bezier.
- **Reduced motion:** CSS underline transition neutralized globally; the active state itself is not motion-dependent.
- **No-JS:** no indicator; links still navigate.
- **Failure mode / gaps:**
  - Visual state only — **no `aria-current="true"`** on the active link, so the indicator is invisible to assistive tech and has no semantic weight.
  - Recomputes `getBoundingClientRect()` for every mapped section on every rAF tick — O(n) layout reads, fine for ~5 links, wasteful on long pages.
  - The hard-coded 110px offset must stay in sync with `scroll-padding-top: 72px` and nav height by hand.
- **Verdict:** **PORT WITH CHANGES** — keep the scroll-position algorithm (it handles the footer case better than a naive IO), add `aria-current`, and derive the offset from a CSS custom property.

---

## 12. Card mouse-glow (`--mx` / `--my`)

- **File / lines:** `script.js:176-189`; CSS `styles.css:1665-1675` (bento/quote/record radial), `:1835-1840` (post cards), `:2070-2079` (quote-mark parallax, reduced-motion guard)
- **Trigger:** `mousemove` on `.bento-card, .quote-card, .record-card, .post-card` (passive)
- **DOM hooks:** CSS custom properties `--mx`, `--my` on the card; consumed by a `radial-gradient(600px circle at var(--mx) var(--my))`
- **What it does:** converts cursor position to percent within the card's box and writes both custom properties; the radial highlight and the quote-mark parallax follow the pointer.
- **Timing / easing:** none in JS; CSS `opacity 0.3s` / `transform 0.5s cubic-bezier`.
- **Reduced motion:** early `return` — no listeners attached at all (`:180-181`).
- **No-JS:** gradients sit at their `50% 50%` fallback; cards look fine.
- **Failure mode / INP:** writes style **on every mousemove with no rAF coalescing** and calls `getBoundingClientRect()` per event. On low-end machines or during scroll this can cause jank; it is also pointless on touch (`mousemove` may fire on tap-emulation). No `(hover: hover)` / `(pointer: fine)` gate.
- **Verdict:** **PORT WITH CHANGES** — wrap in rAF, cache the rect on `mouseenter` (re-measure on resize), and gate on `matchMedia('(hover:hover) and (pointer:fine)')`. Or **REPLACE WITH CSS** (static gradient + `:hover` opacity) if the site does not need pointer tracking.

---

## 13. Scroll-to-top button (injected)

- **File / lines:** `script.js:203-237`; CSS `styles.css:2078-2130`
- **Trigger:** `DOMContentLoaded` (injection); `scroll` (passive, rAF); `click`
- **DOM hooks:** creates `button#to-top`, `aria-label`, `title`, inline SVG; class `.is-visible`; watches `.footer, .footer-compact`
- **What it does:** injects a fixed 44px circular button, reveals it when `scrollY > 600` **and** the footer is not yet on screen (so it does not cover footer links), hides it over the footer. Click scrolls to top with `behavior: reduce ? 'auto' : 'smooth'`.
- **Timing / easing:** rAF-coalesced scroll; CSS opacity/transform `0.32s`.
- **Reduced motion:** checks `prefers-reduced-motion` **at load only** for the scroll behaviour; CSS removes the transform/transition. Scroll behaviour will not update if the OS setting changes mid-session.
- **No-JS:** the button simply does not exist; users scroll manually. No loss of function.
- **Failure mode:** works, but injection after `DOMContentLoaded` means the button is created late and can briefly flash unstyled if CSS is still loading. The `#to-top` existence check (`:207`) makes it idempotent.
- **Verdict:** **PORT WITH CHANGES** — ship it as real HTML with the `hidden` attribute (faster, available before JS, no injection cost), and use `matchMedia(...).addEventListener('change')` for the scroll behaviour.

---

## 14. Page-transition fade (internal navigation)

- **File / lines:** `script.js:239-280`; CSS `styles.css:2133-2139` (`is-leaving`), `:2142-2147` (`::view-transition-*`), `:1984-1991` (page-load fade)
- **Trigger:** delegated `click` on any `<a>`; `pageshow` (bfcache restore)
- **DOM hooks:** `body.is-leaving`; every internal anchor
- **What it does:** filters out `_blank`, `download`, `#hash`, `mailto:`, `tel:`, cross-origin, same-path-hash-only, modified clicks (`meta/ctrl/shift/alt`), and non-left buttons. If the browser has `startViewTransition`, it **returns without intercepting**. Otherwise it `preventDefault()`s, adds `body.is-leaving`, and navigates after 220 ms. `pageshow` clears the class for back/forward cache.
- **Timing / easing:** 220 ms `setTimeout`; CSS fade `0.22s ease`.
- **Reduced motion:** the entire IIFE returns when reduced motion is set — normal navigation, no fade.
- **No-JS:** normal browser navigation.
- **Failure mode / gaps:**
  - Adds **220 ms of artificial latency to every internal navigation** — a direct hit to perceived performance, and it can strand the user if the timer is throttled (background tab) or the click is on a link that later 404s.
  - The View Transitions branch is effectively a **no-op**: nothing calls `startViewTransition`, and there is no `@view-transition { navigation: auto }` rule, so Chrome (which has the API) gets **no fade**, while Safari/Firefox get the JS fade. Inconsistent.
  - No focus management or announcement after navigation.
  - Two separate fade systems (page-load `page-fade` + `is-leaving`) can briefly double up.
- **Verdict:** **DROP** for a single-page portfolio. If you later go multi-page, **PORT WITH CHANGES** by deleting the JS and using `@view-transition { navigation: auto; }` plus the existing `::view-transition-*` timing — native, zero latency, no interception.

---

## 15. Analytics

- **Found:** none.
- **Searched:** `gtag|googletagmanager|plausible|umami|fathom|matomo|posthog|analytics|vercel/insights|cloudflareinsights|beacon|sendBeacon` across `*.html`, `*.js` — zero hits.
- **No-JS fallback:** N/A.
- **Verdict:** **DROP** (nothing to port). For Nidhi's site, if analytics is wanted, add a privacy-first script (Plausible/Umami) with `defer` and no cookies — do not resurrect a heavyweight tag manager.

---

## 16. CSS-only behaviours that look like JS (do not reimplement in JS)

These live entirely in `styles.css` and are worth porting as CSS:

| Behaviour | Lines | Notes |
|---|---|---|
| Page-load fade | `1984-1991` | `body { animation: page-fade 0.42s ... both }`, gated on `no-preference` |
| Theme icon rotate/cross-fade | `355-369` | moon/sun transforms, disabled under RM |
| Nav-link underline sweep | `1943-1962` | `scaleX(0→1)` 0.32s, `:focus-visible` included |
| Hero portrait hover zoom | `2020-2024` | `rotate(1.2deg) scale(1.035)`, `animation-play-state: paused` |
| Quote-mark parallax | `2049-2078` | consumes `--mx/--my` from §12; `transform:none` under RM |
| Bento tag pulse | `1777-1790` | one-shot `tag-pulse` 1.6s after `.is-in` |
| Section gradient divider | `2070` region / `.section::before` | purely decorative |
| Skip link | `2330-2343` | `translateY(-200%) → 0` on focus |
| Global RM kill switch | `1262-1266` | `*{animation-duration:.01ms!important; transition-duration:.01ms!important}` — blunt but effective |
| Smooth anchor scroll + offset | `2025-2026`, `:2028` | `scroll-behavior:smooth` under `no-preference`; `scroll-padding-top:72px` |

---

## 17. Cross-cutting findings

### 17.1 Breaks or degrades without JS

| Behaviour | Impact | Severity |
|---|---|---|
| Year stamp (§3) | Footer shows `© ` with no year | Medium — visible defect |
| Tech marquee (§9) | CSS animation runs on an un-duplicated list → visible jump per 40s cycle | Low — cosmetic |
| Active nav indicator (§11) | No `is-active` highlight | Low |
| Theme toggle (§2) | Hidden; dark only (by design via `has-js`) | Low — intentional |
| Counters (§7), reveal (§6) | **Fine** — static HTML holds final values and `.reveal` is visible by default | — (good) |
| Mobile nav (§4) | **Fine** — `nav-ready` absent forces links visible | — (good) |

### 17.2 Ignores `prefers-reduced-motion`

Mostly handled well: reveal, counters, marquee (both JS and CSS), mouse-glow, page transition, and the to-top scroll all check it, plus a global `!important` kill switch. Remaining gaps:

- **Scroll-to-top** reads the media query once at load; a mid-session OS change is ignored (`script.js:216`).
- **Scroll progress** keeps updating (acceptable — it is information, not decoration).
- The global kill switch at `styles.css:1262` sets `animation-duration:.01ms` rather than disabling animations; on some engines that can still fire `animationend` and leave a 0.01ms flash. Prefer explicit `animation: none` per component (the file already does this for the important ones).

### 17.3 INP / CLS risks

- **Mouse-glow (§12)** — unthrottled `style` writes on `mousemove`; the clearest INP risk.
- **Page transition (§14)** — 220 ms delay on every navigation; perceived-latency risk, not INP per se.
- **Theme script** — render-blocking `<head>` request before CSS; FCP cost.
- **Scroll handlers** are passive + rAF-throttled throughout — good.
- **CLS** is well controlled: images carry `width`/`height` + `fetchpriority` (`index.html:225`), the reveal never hides content in layout, the progress bar is fixed, and `.is-scrolled` changes no geometry.

### 17.4 Accessibility gaps

1. **No focus trap** in the mobile nav (§4); outside-click close does not restore focus.
2. **No `aria-current`** on the active nav link (§11).
3. **Marquee duplicate not `aria-hidden`** (§9) → content read twice.
4. **Focusable non-control**: `.tech-strip` `tabindex="0"` with no role (§9).
5. **Counters mutate text** without a stable accessible name (§7).
6. **Theme toggle** does not update `meta[theme-color]` or `color-scheme` (§2).
7. **`data-delay` stagger is inert** — not an a11y bug, but motion intent is silently unmet (§6).

---

## 18. Porting matrix (Nidhi's portfolio)

Assumes a **single-page, motion-light, GitHub Pages** build. Order = recommended implementation order.

| # | Behaviour | Decision | Port note |
|---|---|---|---|
| 1 | Theme boot + `has-js` (§1) | **PORT WITH CHANGES** | Inline in `<head>`; add `prefers-color-scheme` default + `storage` sync |
| 2 | Theme toggle (§2) | **PORT WITH CHANGES** | Add `color-scheme`, update `theme-color` |
| 3 | Reveal observer (§6) | **PORT WITH CHANGES** | Keep visible-by-default; fix stagger via `animation-delay` |
| 4 | Mobile nav (§4) | **PORT WITH CHANGES** | Keep `aria-expanded`/Escape/outside-click; add containment if overlaying |
| 5 | Scroll progress (§5) | **PORT AS-IS** | Optional |
| 6 | Nav scroll state (§10) | **PORT AS-IS** | — |
| 7 | Count-up (§7) | **PORT WITH CHANGES** | Add accessible name; static HTML as truth |
| 8 | Active nav (§11) | **PORT WITH CHANGES** | Add `aria-current`; CSS-var offset |
| 9 | Scroll-to-top (§13) | **PORT WITH CHANGES** | Real HTML button, not injected |
| 10 | Tech marquee (§9) | **PORT WITH CHANGES** | `cloneNode`, `aria-hidden` duplicate, gate on `.has-js` |
| 11 | Mouse-glow (§12) | **PORT WITH CHANGES** or **REPLACE WITH CSS** | rAF + pointer gate, or drop for CSS hover |
| 12 | Year stamp (§3) | **REPLACE WITH CSS/build** | Hard-code or fallback text |
| 13 | Hero rotating word (§8) | **REPLACE WITH CSS** | Not present in reference; build fresh, reserve width |
| 14 | Page transition (§14) | **DROP** | Single page; if multi-page use `@view-transition` only |
| 15 | Analytics (§15) | **DROP** | None present; add privacy-first only if requested |

**Net:** 11 behaviours worth porting (2 as-is, 9 with changes), 2 replaced, 2 dropped.
The reference's strongest transferable idea is the **progressive-enhancement contract**:
`has-js` / `nav-ready` gate only optional chrome, and every animated value already exists
in the HTML. Preserve that contract even where you rewrite the code.
