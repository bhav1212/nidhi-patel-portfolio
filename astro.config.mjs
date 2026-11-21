import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The custom domain, served by GitHub Pages from this repository. Canonical,
// hreflang, OG and sitemap URLs all derive from `site`; SITE_ORIGIN can
// override it for a preview build without touching this file.
const SITE = process.env.SITE_ORIGIN ?? 'https://nidhipatel.de';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  // English is the default and stays unprefixed; German lives under /de/.
  // The routes are authored explicitly in src/pages, so this config is what
  // tells Astro (and the sitemap) which trees belong to which locale.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', de: 'de' },
      },
    }),
  ],
});
