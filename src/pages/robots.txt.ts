import type { APIRoute } from 'astro';

/**
 * Generated rather than static, so the sitemap URL follows `site` in
 * astro.config.mjs (or SITE_ORIGIN). A hand-written robots.txt silently
 * points at the old domain after a move.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://nidhipatel.de');
  const sitemap = new URL('sitemap-index.xml', origin).href;
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
