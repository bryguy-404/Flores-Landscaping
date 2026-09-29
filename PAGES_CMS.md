# Flores Landscaping — Pages CMS

The root `.pages.yml` is already written and the website reads its content from `src/content/*.json` and `src/content/services/*.json`. Nothing needs to be pasted into Pages CMS. The configuration uses the current Pages CMS 2.x format.

Repository: [bryguy-404/Flores-Landscaping](https://github.com/bryguy-404/Flores-Landscaping). Review branch: `codex/pages-cms-setup`. Production branch: `main`.

This branch starts from the latest successful production commit, `5cf695d`. The original project's uncommitted About page, stylesheet, and documentation changes were left untouched. The production About page therefore still has its existing team-photo placeholder; the unrelated local design changes are not included here. No existing CMS starter was present.

## Start here — one step at a time

**Step 1:** Open [Pages CMS](https://app.pagescms.org/), select `bryguy-404/Flores-Landscaping`, and change the branch selector from `main` to **`codex/pages-cms-setup`**. Wait for the content menu to load. Tell your developer when you see **Shared website details**, **Home**, **About Us**, **Services**, **Our Work**, and **Contact**.

Stop here during the guided walkthrough. The following steps are a reference for when you reach them:

2. Open **Home → Page sections → Hero**. Confirm the current headline and photos are shown. The configuration is branch-specific: `main` will continue to say “Configuration not found” until this setup is reviewed and merged.
3. Make one small text edit on the review branch and save. A save creates a GitHub commit and triggers the existing Cloudflare Pages preview build. Wait for that commit's **Cloudflare Pages** check to succeed, then open its Preview URL and confirm the edit. Restore the text and save again after testing.
4. In one existing photo field, choose/upload a replacement, update the alternative text, and save the containing content file. Check desktop and phone previews. Restore the selected image after the test. Do not delete old media: another section may still use it.
5. Once the content and preview are approved, the developer can separately review and merge this branch. **This task does not merge, push to `main`, or change production hosting.** Do not switch Cloudflare's production branch to the review branch.
6. After an approved merge and successful production deployment, select `main` in Pages CMS. Editing `main` will then trigger production deployments. If changes need approval first, keep editors on a review branch and merge approved edits separately; Pages CMS Save itself is not an approval queue.
7. For clients, use Pages CMS's **email collaborator invitations**, not GitHub repository write access. Collaborators cannot edit `.pages.yml` or administer collaborators. The owner can manage invitations from Pages CMS's repository collaborator controls. No invitation is sent by this setup.

## What clients can edit

| Editor | Existing editable content |
| --- | --- |
| Shared website details → Business details | Business name, primary and secondary phone, email, base city/state, four existing service-area communities, experience, optional hours. Phone/text/email links and structured data use these values. Hours appear in the footer when supplied; no hours were invented. |
| Header and navigation | Logo and alt text, location bar, navigation labels/destinations, estimate link and labels. |
| Footer | Logo, introductory lines, existing navigation destinations/labels, contact heading, copyright wording and website credit. Shared phone/email/location details come from Business details. |
| Home → Page sections | Search/social title and description, four hero photos, headlines and buttons, residential/commercial cards, About introduction/photos, services introduction, project introduction, business highlights, four existing FAQs, contact section/photo, service-area label. |
| Home → Google Reviews introduction | Section eyebrow, headline, description and link label. The external business-profile URL, Google attribution, fetched reviews and API settings remain in code. |
| About Us | Search/social copy, introduction, business highlights, story and story photo, three approach cards, service-area copy and estimate section. |
| Services → Services overview | Search/social copy, introduction/photo, explorer introduction, residential/commercial copy, three process steps and estimate section. |
| Each of the seven services | Service title, navigation/card destination, summary, description, existing highlights, page headline/introduction, three focus items, planning copy, three FAQs, estimate headline/link, homepage card photo; overview, hero and detail photos where already present. Snow Plowing keeps its production layout and homepage photo. |
| Services → Shared service page labels | Common sidebar, section headings, trust labels and button labels used by all seven service pages. Page paths, service IDs, related-service relationships and icons stay fixed. |
| Our Work → Page sections | Search/social copy, page introduction, comparison/gallery/video section introductions, links, calls to action and labels. |
| Before-and-after projects | Nine existing projects: titles, categories, before/after images, alt text and crop focus. The three Home projects share the same records with Our Work. |
| Photo gallery · 1–84 | All 84 existing photos, each with its caption/title, replacement image and alt text. Split into seven groups of 12 for easier navigation. Fixed order, filter assignments and before/in-progress classifications remain in code. |
| Video titles, links and cover photos | Eight existing video titles, categories, descriptions, video destinations and cover photos/alt text. The video slots, duration labels and player behavior remain fixed. |
| Contact | Search/social copy, introduction, contact labels, estimate-form headings/field labels/placeholders, property-choice labels, service-area copy/photo and four FAQs. Service option titles follow the service records; submitted values and validation remain fixed. |
| Page not found | Existing 404 title, message and return link. |

## Editing rules

All content entries are single, existing files with `operations.create`, `operations.rename` and `operations.delete` set to `false`. Repeated items use fixed object fields instead of add/remove/reorder lists. The settings editor is hidden. There are no raw code or rich-text HTML editors.

These are Pages CMS content controls, not GitHub repository permissions. A GitHub user with repository write access can still modify source through GitHub. Email collaborator access is the appropriate client role. Media uploads are supported separately from content creation; Pages CMS does not document a corresponding media `operations` lock, so retain existing media and replace selections through their photo fields.

Keep text inside `{{double braces}}` when editing nearby prose. For example, `{{phone}}`, `{{city}}`, `{{communities}}` and `{{experienceYears}}` are filled from Business details. Do not paste HTML: text is escaped safely. Separate heading fields correspond to the existing styled lines/emphasis and preserve the design.

Links accept local paths (`/contact/#estimate`), anchors (`#gallery`), and full `https://`, `http://`, `mailto:`, `tel:` or `sms:` URLs. Changing a link destination does not rename a page. Keep service estimate links' `?service=...#estimate` suffix to retain preselection. Phone/text/email links are generated from Business details.

## Photo uploads and responsive cropping

- The media library stores images under `src/assets` and writes `/src/assets/...` references into content. Use the image picker; do not type a production `/_astro/` URL.
- Existing photos remain available in their current folders. New uploads use randomized filenames so a replacement does not silently overwrite an image used by other pages. JPG, JPEG, PNG, WebP and AVIF are supported.
- Saving a photo selection triggers the normal build. `resolvePhoto()` loads the source, and `CmsImage.astro` generates optimized WebP variants and `srcset`. Original source paths are not exposed as browser image URLs.
- Give meaningful photos descriptive alternative text. Describe what is shown rather than repeating “image of.” A decorative video cover may have blank alt text.
- **Desktop crop focus** and **Mobile crop focus** use horizontal and vertical percentages, such as `50% 50%`. `0%` is left/top; `100%` is right/bottom. Mobile applies at widths up to 767px. Use `30% 50%` to favor a subject on the left, or `50% 75%` to favor the lower part of a photo.
- The frame, proportions, section order, and responsive layout remain controlled by the site. Gallery photos and full-photo viewers preserve their original aspect ratio; focus settings are most visible in cropped heroes, cards and comparison frames. Comparison full-photo views remain uncropped.
- Upload appropriately sized photographs, preferably about 1600–2400 pixels wide. Compress unusually large files first. Video uploads/transcoding are outside this photo library; existing video links and poster images are editable.
- Do not remove an old photo while it is referenced. The build validates image references, and a missing image prevents deployment rather than publishing a broken photo.

## What stays outside the editor

Astro templates, CSS, JavaScript behavior, URLs/routes/canonical configuration, layouts, section counts/order, icons, service IDs, gallery classifications, form submission endpoint, field names/validation, honeypot, Turnstile, rate limiting, Resend settings, Cloudflare bindings, environment variables and API secrets. Google review text, authors, ratings, dates, provider links, selection logic, attribution and review privacy/terms remain outside the content schema.

Only the public contact email on the review-terms page follows Business details. Public business email edits do **not** change the private email delivery recipient or sender in the contact backend. Those remain deployment settings.

## Developer maintenance and validation

- `.pages.yml`: explicit editor schema and media configuration.
- `src/content/`: editable JSON; no credentials or backend settings.
- `src/lib/cms.ts`: plain-text shared-detail expansion, safe link handling and local image resolution.
- `src/components/CmsImage.astro`: responsive image optimization and crop focus.
- `src/data/`: fixed route/order/classification metadata plus adapters for editable content.
- `scripts/validate-cms.mjs`: validates schema/content agreement, protected operations, required fields, links, token names and image existence. Runs automatically before every production build.
- `scripts/test-cms-render.mjs`: temporarily modifies every editable text/link/alt field and all photo slots, builds, checks the rendered output, tests shared details, then restores original content and rebuilds in `finally`. Run on a clean, isolated checkout without concurrent edits. It makes no remote commits or form submissions.

```sh
npm ci
npm run check
npm test
npm run build
npm run test:cms
```

The configuration was also accepted by the upstream Pages CMS `ConfigSchema` from commit `6f4e860a35d934406580287e7042e5e111e207a1`. The setup's browser comparison covered all 14 routes at 1440px and 390px: matching section sizes and contact-form fields, no page overflow, broken visible images or JavaScript errors. Test content is restored before committing.

The existing GitHub → Cloudflare Pages integration builds preview branches. Build command remains `npm run build`; output remains `dist`. No separate CMS hosting, token, build hook, database, Vercel migration or Cloudflare configuration is required. Preview environment bindings can differ from production; missing preview review/form credentials should be checked in the existing Cloudflare project, outside the CMS.

## Official references

- [Configuration and branch-specific `.pages.yml`](https://pagescms.org/docs/configuration/)
- [Content files and sidebar groups](https://pagescms.org/docs/configuration/content/)
- [Disable create, rename and delete](https://pagescms.org/docs/configuration/content/operations/)
- [Media storage](https://pagescms.org/docs/configuration/media/) and [image fields](https://pagescms.org/docs/configuration/fields/image/)
- [Settings and merge behavior](https://pagescms.org/docs/configuration/settings/)
- [Email collaborators and permissions](https://pagescms.org/docs/configuration/collaborators/)
- [Astro image API](https://docs.astro.build/en/reference/modules/astro-assets/)
