import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.flores-landscaping-llc.com',
  output: 'static',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss(), {
    name: 'contact-preview-availability',
    configureServer(server) {
      // Astro's static dev server has no Worker secrets or email delivery.
      server.middlewares.use('/api/google-reviews', async (request, response) => {
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-store');
        if (request.method !== 'GET') {
          response.statusCode = 405;
          response.end(JSON.stringify({ error: 'Method not allowed.' }));
          return;
        }
        try {
          // Use the deployed server's secret without copying it into local code.
          const upstream = await fetch('https://flores-landscaping.pages.dev/api/google-reviews', {
            signal: AbortSignal.timeout(8000), redirect: 'error', cache: 'no-store',
          });
          if (!upstream.headers.get('Content-Type')?.includes('application/json')) throw new Error('Endpoint not deployed');
          response.statusCode = upstream.status;
          response.end(JSON.stringify(await upstream.json()));
        } catch {
          response.statusCode = 503;
          response.end(JSON.stringify({ error: 'Reviews are temporarily unavailable.', code: 'PREVIEW_UPSTREAM_UNAVAILABLE' }));
        }
      });
      server.middlewares.use('/api/contact', (request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'POST') return next();
        response.statusCode = request.method === 'GET' ? 200 : 503;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-store');
        response.end(JSON.stringify({ available: false, siteKey: null, message: 'Online requests are coming soon. Please call, text, or email our team.' }));
      });
    },
  }] },
  devToolbar: { enabled: false },
});
