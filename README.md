# Flores Landscaping

An Astro website for Flores Landscaping LLC, styled with Tailwind CSS and built as static files for Cloudflare Workers.

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

The homepage includes responsive navigation, an automatically rotating photo hero, a horizontally scrolling service carousel, a before-and-after project section with a keyboard-accessible original-photo dialog, native FAQ accordions, reduced-motion support, and call/text/email links. The Services overview is available at `/services/`, with seven individual service pages linked through the header dropdown, overview, homepage cards, and footer; links to About, Our Work, and Contact still lead to the approved homepage sections until those pages are built. A custom 404 page is also included.

The hero and services advance every five seconds while visible. Services reverse direction at the ends to avoid a long reset jump. Both have pause/play controls, pause during pointer interaction and while the tab is hidden, and stop on keyboard/manual focus until Play is pressed. Reduced-motion preferences disable automatic rotation and reveal motion while keeping manual navigation available. The page uses staggered, eased scroll reveals and gentle hero crossfades/zoom without an animation dependency.

The design follows the supplied Lawnella reference’s two-level header, Nunito headings, Poppins text, full-width photo hero, overlapping property cards, service cards, dark feature band, and split contact section. Flores’s red, black, and white palette replaces the reference’s green. Reference-site awards, reviews, blog posts, counters, and contact details have not been copied.

The estimate form and email delivery are intentionally deferred. The contact section currently opens real phone, SMS, and email links; it does not pretend to submit a form.

The projects section previews three transformations: one real front-yard before/after collage from the current site, plus two explicitly labeled photo placeholders. Desktop uses a keyboard-accessible comparison slider. Tablet and phone show swipeable cards with Before/After buttons for the real project and previous/next navigation. This section never auto-advances. Replace the placeholders with approved matching pairs before the production content review.

The Services overview carries through the homepage typography, palette, and motion with a split introduction, interactive service list, residential/commercial band, three-step introduction to working together, and estimate contact section. All photography slots on this new page are descriptive placeholders; only the shared branding uses existing images. Native service disclosures work without JavaScript. With JavaScript, the desktop placeholder follows the selected service and links such as `/services/#snow-plowing` open the correct entry. Phone layouts show a compact placeholder within the open service. No additional package is required.

The seven service pages live at `/services/lawn-care/`, `/services/landscaping/`, `/services/mulch-planting/`, `/services/sod-installation/`, `/services/seasonal-cleanup/`, `/services/trimming/`, and `/services/snow-plowing/`. A shared Astro template gives each page its own introduction, service details, planning guidance, three FAQs, related services, and estimate links. Each page has two labeled photo placeholders. On desktop devices with a mouse or trackpad, hovering over Our Services opens the dropdown, with a short grace period when the pointer leaves. A separate disclosure button also supports click and keyboard controls, while the Our Services link continues to open the overview. The phone menu expands to show the same seven links and scrolls on short screens. Keyboard navigation, Escape, current-page states, and reduced motion are supported.

## Packages

- `astro`: static HTML and build-time image optimization.
- `tailwindcss` and `@tailwindcss/vite`: Tailwind 4 integration and shared styling tokens.
- `@lucide/astro`: icons rendered as SVG without a client framework.
- `@fontsource-variable/nunito` and `@fontsource/poppins`: locally served fonts matching the reference’s typography.
- `@astrojs/sitemap`: sitemap generation.
- `@astrojs/check` and `typescript`: development checks.
- `wrangler`: Cloudflare local checks and deployment.

No React, database, animation library, or component framework is needed for these pages. The animations use CSS, IntersectionObserver, and native scrolling.

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

1. Review the individual service pages, then build About, Gallery, and Contact. Continue using image placeholders until the client photos are selected.
2. Add a Resend estimate form. Install `@astrojs/cloudflare`, `resend`, and `zod`; retain prerendered marketing pages and add a server endpoint for validated requests. Add Cloudflare Turnstile with server verification and keep email credentials in Worker secrets. The form should handle loading, errors, success, duplicate submissions, and rate limiting.
3. Select the client photos, confirm before/after pairs, and replace the remaining placeholders. Add video to the Gallery after the photography.
4. Complete production content checks, domain setup, email verification, and launch validation.

Resend will need a verified sending domain, a chosen recipient address, and a `RESEND_API_KEY` stored as a Cloudflare secret. Never put an API key in a public frontend variable. No credentials are needed for the current design phase.

## Assets and content

The supplied original logo is preserved in `src/assets/flores-logo.png` and remains in the dark footer. The white header uses an AI-assisted transparent preview adaptation in `src/assets/flores-logo-transparent.png`; the exact editing prompt is recorded in `docs/logo-edit.md`. An original vector master from the designer can replace this raster adaptation if one becomes available.

Photos were selected from the existing Flores website with the user’s permission. Original URLs are recorded in `docs/image-sources.json`. The site generates optimized WebP files at build time. Confirm the rights to any third-party-looking images, particularly the trimming photograph, before launch.

Service areas, experience, licensing/insurance, free estimates, email, and both phone numbers come from the existing business website. The logo’s phone number is used as primary. New prose is based on those facts and should be reviewed by the business before launch.

## Editing guide

- `src/pages/index.astro`: homepage sections, service data, the real comparison, and two project placeholders.
- `src/components/ProjectComparison.astro`: reusable before/after card. Supply separate `before` and `after` image imports, descriptive alt text, a unique `id`, title, and category for each new project; omit `collage` for separate photos. Replace a placeholder article with this component.
- `src/scripts/project-comparisons.ts`: accessible comparison controls, compact project navigation, and the original-collage dialog.
- `src/scripts/home-motion.ts`: homepage autoplay and pause behavior.
- `src/scripts/scroll-reveals.ts`: shared staggered, reduced-motion-aware scroll reveals.
- `src/pages/services.astro` / `src/styles/services.css`: Services overview content and page styling.
- `src/data/services.ts`: shared service titles, summaries, descriptions, and photo guidance; reused across service pages and navigation.
- `src/data/service-pages.ts`: tailored copy, FAQs, related services, and detail photo guidance for all seven service pages.
- `src/pages/services/[service].astro` / `src/styles/service-page.css`: static service page template and responsive design.
- `src/scripts/navigation.ts` / `src/styles/navigation.css`: desktop dropdown and expandable phone navigation.
- `src/components/ImagePlaceholder.astro`: reusable labeled photo slots.
- `src/scripts/services-page.ts`: service selection and direct-link handling.
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
