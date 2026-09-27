# Homepage Google reviews

The homepage requests `/api/google-reviews` once when the reviews section approaches the viewport. The handler fetches Places API (New), keeps five-star written reviews from Google's selection of up to five, and sorts those by publication date, newest first. This does not guarantee the newest five-star reviews across the complete history. Dates and attribution come from Google. Empty results and failures leave a link to the real Google business profile; no sample reviews appear in production.

## Cloudflare configuration

The owner's screenshots show a **Pages** project. Use that same project's production runtime **Settings → Variables and secrets**, not build variables:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `GOOGLE_PLACES_API_KEY` | Key saved privately in Cloudflare |
| Text | `GOOGLE_PLACE_ID` | ID copied from Google's finder for Flores Landscaping LLC, 57131 Ponderosa Ct, South Bend |

Redeploy after setting bindings. For Pages, the build command is `npm run build`, output directory `dist`, and root `functions/api/google-reviews.ts` is compiled automatically by Git-integrated Pages builds. Drag-and-drop static uploads do not deploy Functions. The existing `wrangler.jsonc` is for a separate Workers deployment and is not a Pages configuration; do not change the existing site's hosting to enable reviews. Pages builds may warn that this file lacks `pages_build_output_dir` and ignore it. For CLI Pages deployment use `wrangler pages deploy dist --project-name <actual-pages-project-name>` from the repository root. Do not assume the Workers name is the Pages project name.

The existing Worker entry point also routes `/api/google-reviews` to the shared handler. No contact integration or contact credentials are changed by the Pages reviews adapter.

Enable Places API (New) and billing in the Flores Website Reviews Google Cloud project. Restrict the key's **API restrictions** to **Places API (New)**. The calls are server-side: HTTP referrer restrictions do not work here, and IP restrictions need a fixed outbound IP (not configured on this Cloudflare deployment). Never include the key in source, a `PUBLIC_` variable, a screenshot, or chat. Configure a suitable Google request quota; a billing budget alert alone does not cap charges.

Review responses use `no-store` and are not persisted in the repository, browser storage, a database, or Cloudflare cache. The server accepts only the configured Place ID and key. One visitor reaching the section causes one Google request, including the billable reviews field; the endpoint is public, so Google quotas remain important. It rejects cross-site browser requests but that is not authentication or complete abuse prevention.

The review footer displays the unmodified official full-color Google wordmark (`https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png`) with a separate 12 px Google Maps text credit. Reviews include author/profile links, avatars when available, dates, individual source links, and the selection notice. `/google-reviews/` contains the feature's terms and privacy information.

## Verification

- `npm test`
- `npm run check`
- `npm run build`
- `npx wrangler pages functions build --outdir /tmp/flores-reviews-pages-build`
- `npx wrangler deploy --dry-run --outdir /tmp/flores-reviews-worker-build`

Astro's dev server forwards review requests to the fixed Flores Pages endpoint, allowing the local homepage to display real reviews using the secret already saved in Cloudflare. That endpoint must be deployed first. No key is copied into local source. Each local preview request reaching this section also makes a live Google request. Alternatively, use `.dev.vars` (based on `.dev.vars.example`) and the Cloudflare runtime to test credentials locally; do not commit them. Automated test fixtures use clearly synthetic data and never require live Google credentials.

After deployment, `/api/google-reviews` must return JSON, not a static HTML page. `CONFIGURATION_MISSING` means runtime variables are missing/misnamed; `GOOGLE_REQUEST_FAILED` includes only Google's HTTP status and a safe reason such as `BILLING_DISABLED`. No keys or raw error messages are returned or logged. Confirm `#reviews` changes from `data-review-state="fallback"` to `live`, dates descend, only five-star written reviews appear, and controls work at desktop/mobile widths.

Sources: [Places policies](https://developers.google.com/maps/documentation/places/web-service/policies), [Place Details](https://developers.google.com/maps/documentation/places/web-service/place-details), [Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/).

### Local verification — September 27, 2026

All 29 tests pass; Astro check reports no errors, warnings, or hints, and the production build generates 14 pages. Both the Pages Functions bundle and Worker dry run compile. Browser verification against a temporary local fixture server confirms four qualifying reviews in descending date order, expand/collapse behavior, horizontal navigation, and no mobile page overflow at a 390 px viewport. Desktop and mobile screenshots were inspected; no browser errors were reported. Fixtures are synthetic, outside the repository, and never published.

The existing `https://flores-landscaping.pages.dev/api/google-reviews` currently returns HTML rather than the new JSON endpoint. The live Google request has not been verified. Wrangler has no authenticated Cloudflare session on this computer, and no changes were deployed during these checks.
