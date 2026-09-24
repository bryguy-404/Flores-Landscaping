import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.flores-landscaping-llc.com',
  output: 'static',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
