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
