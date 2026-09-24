# Flores Landscaping

An Astro homepage for Flores Landscaping LLC, styled with Tailwind CSS and built as static files for Cloudflare Workers.

## Local development

Use Node 22.12 or newer.

```sh
npm ci
npm run dev
```

Astro prints the actual preview URL. Its development server may select another port when the default is already occupied. On Astro 7, use `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop` to manage the background server.

```sh
npm run check
npm run build
npm run preview
```

## Current phase

The homepage includes responsive navigation, a manually controlled photo hero, a horizontally scrolling service list, a keyboard-accessible project photo dialog, native FAQ accordions, reduced-motion support, and call/text/email links. All navigation stays on the homepage. The only other route is the 404 page.

The design follows the supplied Lawnella reference’s two-level header, Nunito headings, Poppins text, full-width photo hero, overlapping property cards, service cards, dark feature band, and split contact section. Flores’s red, black, and white palette replaces the reference’s green. Reference-site awards, reviews, blog posts, counters, and contact details have not been copied.

The estimate form and email delivery are intentionally deferred. The contact section currently opens real phone, SMS, and email links; it does not pretend to submit a form.

## Packages

- `astro`: static HTML and build-time image optimization.
- `tailwindcss` and `@tailwindcss/vite`: Tailwind 4 integration and shared styling tokens.
- `@lucide/astro`: icons rendered as SVG without a client framework.
- `@fontsource-variable/nunito` and `@fontsource/poppins`: locally served fonts matching the reference’s typography.
- `@astrojs/sitemap`: sitemap generation.
- `@astrojs/check` and `typescript`: development checks.
- `wrangler`: Cloudflare local checks and deployment.

No React, database, animation library, or component framework is needed for this homepage. The animations use CSS, IntersectionObserver, and native scrolling.

## Cloudflare

`wrangler.jsonc` configures a static-asset Worker serving `dist/`, with the custom 404 page. The build performs image optimization in Node; no Sharp or Node-only image runtime is needed on Cloudflare. Fonts and photographs are hosted with the site.

Validate the deployment bundle without publishing:

```sh
npm run build
npx wrangler deploy --dry-run --outdir /tmp/flores-worker-dry-run
```

When the design is approved and you are ready to publish from an authenticated Cloudflare account:

```sh
npm run deploy
```

For Cloudflare Workers Builds, use `npm run build` for the build command and `npx wrangler deploy` for the deploy command. Attach the domain after checking the preview. The `site` setting and `robots.txt` currently use the existing production domain; update both if the final domain changes. Nothing has been published or attached to that domain by creating this project.

## Next phases

1. Review the homepage layout and branding; tune the sections, photography, and copy.
2. Add a Resend estimate form. Install `@astrojs/cloudflare`, `resend`, and `zod`; retain prerendered marketing pages and add a server endpoint for validated requests. Add Cloudflare Turnstile with server verification and keep email credentials in Worker secrets. The form should handle loading, errors, success, duplicate submissions, and rate limiting.
3. Build About, Services, individual service pages, Projects, and Contact one at a time, as selected by the owner.
4. Complete production content checks, domain setup, email verification, and launch validation.

Resend will need a verified sending domain, a chosen recipient address, and a `RESEND_API_KEY` stored as a Cloudflare secret. Never put an API key in a public frontend variable. No credentials are needed for the current design phase.

## Assets and content

The supplied original logo is preserved in `src/assets/flores-logo.png` and remains in the dark footer. The white header uses an AI-assisted transparent preview adaptation in `src/assets/flores-logo-transparent.png`; the exact editing prompt is recorded in `docs/logo-edit.md`. An original vector master from the designer can replace this raster adaptation if one becomes available.

Photos were selected from the existing Flores website with the user’s permission. Original URLs are recorded in `docs/image-sources.json`. The site generates optimized WebP files at build time. Confirm the rights to any third-party-looking images, particularly the trimming photograph, before launch.

Service areas, experience, licensing/insurance, free estimates, email, and both phone numbers come from the existing business website. The logo’s phone number is used as primary. New prose is based on those facts and should be reviewed by the business before launch.

## Editing guide

- `src/pages/index.astro`: homepage sections, service/project data, and small interactions.
- `src/styles/global.css`: visual tokens, layouts, motion, and responsive breakpoints.
- `src/components/Header.astro` / `Footer.astro`: shared navigation and contact details.
- `src/layouts/BaseLayout.astro`: fonts, metadata, and local-business structured data.
- `src/assets/`: local image originals.

## Sources

- [Design reference](https://themepanthers.com/wp/lawnella/elementor-new/landscape-home-page-01/)
- [Current Flores site](https://www.flores-landscaping-llc.com/)
- [Astro deployment on Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Astro Tailwind integration](https://docs.astro.build/en/guides/styling/#tailwind)
- [Resend with Cloudflare Workers](https://resend.com/docs/send-with-cloudflare-workers)
