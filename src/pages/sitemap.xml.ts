import type { APIRoute } from 'astro';

/**
 * `/sitemap.xml` is the path crawlers, auditors and templates try first, but
 * @astrojs/sitemap only emits `sitemap-index.xml` and its numbered parts. This
 * route makes that path work without keeping a second copy of the URL list:
 * the index points at the generated part, so the plugin stays the only source
 * of truth for what is in the sitemap.
 *
 * Sitemap indexes must not nest, so this points at the first part directly.
 * The plugin starts a new part at 45,000 URLs; a site larger than that would
 * need the remaining parts listed here too.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://nidhipatel.de');
  const part = new URL('sitemap-0.xml', origin).href;
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap><loc>${part}</loc></sitemap>`,
    '</sitemapindex>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
