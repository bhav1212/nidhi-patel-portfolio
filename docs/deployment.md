# Nidhi Patel — portfolio

Static portfolio for Nidhi Patel, AI Engineer and Data Scientist in Frankfurt am
Main. Built with Astro 7, bilingual (English at `/`, German at `/de/`), and
deployed to GitHub Pages at **https://nidhipatel.de**.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

`SITE_ORIGIN` overrides the canonical origin for a preview build. The default
and the CI value are both `https://nidhipatel.de`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: it builds the site and
publishes `dist/` through GitHub Pages. The custom domain comes from
`public/CNAME`, which Astro copies to `dist/` on every build.

Repository: <https://github.com/bhav1212/nidhi-patel-portfolio>

### Namecheap DNS

The domain uses Namecheap's BasicDNS. Set these records in
**Domain List → Manage → Advanced DNS**, and delete Namecheap's default
parking-page records first:

| Type  | Host | Value                  | TTL       |
| ----- | ---- | ---------------------- | --------- |
| A     | `@`  | `185.199.108.153`      | Automatic |
| A     | `@`  | `185.199.109.153`      | Automatic |
| A     | `@`  | `185.199.110.153`      | Automatic |
| A     | `@`  | `185.199.111.153`      | Automatic |
| CNAME | `www` | `bhav1212.github.io.` | Automatic |

Optional IPv6, also on `@`:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Do not add a wildcard record. GitHub recommends the four A records above and
the `www` CNAME; it redirects between the apex and `www` automatically.

### HTTPS

GitHub Pages issues and renews the TLS certificate for `nidhipatel.de` itself
(Let's Encrypt) once the DNS records resolve to GitHub. There is no certificate
file to upload and no separate renewal to manage. After the DNS check passes in
**Settings → Pages**, tick **Enforce HTTPS** so plain HTTP redirects to HTTPS.
Certificate issuance can take up to an hour after DNS propagation.

## Privacy

The phone number is private and must never be published. It is not stored in
this repository: `data/nidhi-patel.json` has `contact.phonePublic: false` and no
phone value. The downloadable CV at `public/Nidhi_Patel_CV.pdf` is the redacted
copy; `scripts/redact-cv.py` rebuilds it from a full CV and reads the number
from the `PRIVATE_PHONE` environment variable at run time.

The unredacted source resume, the untouched profile photo and any
`data/private-*.json` file are excluded by `.gitignore`. Never force-add them.

## Content

- Copy and UI strings: `src/i18n/en.ts` and `src/i18n/de.ts` (key parity is a
  type error at build time).
- CV-derived data: `data/nidhi-patel.json`, with German overrides in
  `src/data/profile.de.ts` and case studies in `src/data/case-studies*.ts`.
- Pages: `src/pages/` (English) and `src/pages/de/` (German).
