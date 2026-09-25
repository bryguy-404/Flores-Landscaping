# Website verification

Homepage checked locally on September 24, 2026; About Us, Our Work, Contact, Services overview, individual service pages, and navigation checked September 25, 2026.

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: successful static build with 13 pages: homepage, About Us, Our Work, Contact, Services overview, seven individual service pages, and custom 404 page. Sitemap and 31 optimized images generated.
- `npx wrangler deploy --dry-run --outdir /tmp/flores-worker-dry-run`: successful static-asset bundle validation; no publication.
- Browser layout checks at 320, 390, 768, and 1440 pixels: no page-level horizontal overflow.
- All homepage anchor targets exist. All loaded image sources resolved successfully.
- Mobile menu: expanded state, section navigation, closing after navigation, Escape, and focus return checked.
- Hero controls: active photo and pressed-state updates checked.
- Service carousel: next button advances the scroll position on desktop and phone; previous button enables after advancing.
- Before-and-after section: three cards (one authentic front-yard collage and two explicitly labeled placeholders). Desktop range updates the visible split and accessible value with arrow keys and real pointer dragging. The original collage opens in a dialog; Escape closes it, restores focus, and releases the page scroll lock.
- Tablet and phone: Before/After buttons update the image and pressed state. Project navigation moves through all three cards, updates the count, and disables previous/next at the ends. Layouts checked at 320, 390, 768, and 1440px without page overflow; placeholder artwork and captions fit on the smallest screen.
- Scroll reveals and layout below the fold visually reviewed.
- Latest visual updates checked at desktop and phone sizes: the supplied hedge-trimming photo is first in the four-photo hero, and the header uses the transparent logo adaptation. The latest production build includes both changes.
- Motion update: real five-second hero advance, explicit pause/resume, and off-screen timer suspension verified in the browser. Services advance by one card, reverse at the end, and pause on focus; phone steps use the responsive 18px gap correctly.
- Browser-emulated reduced motion: hero and services remain stationary for longer than an autoplay interval, manual service navigation works, automatic-play controls are hidden, hero zoom is disabled, and reveal content remains visible.
- Hover pause and restart on pointer exit verified with real browser pointer events. Updated controls fit at 320px and 390px without horizontal page overflow; the next service card remains visible at the edge during scrolling.
- Comparison reduced-motion check: Before/After switching remains functional with the transition reduced to 0.01ms; the selected photo and project position stay unchanged after more than five seconds. Browser error log was empty.
- Contact links point to the business’s phone, SMS, and email destinations; no calls, messages, or emails were sent during verification.

## Services overview — September 25

- `npm run check`: 15 files, 0 errors, 0 warnings, 0 hints. Static build includes `/services/index.html`; the sitemap includes `/services/`.
- Browser views at 320, 390, 768, and 1440px: no horizontal page overflow. Hero badge and placeholder text fit; tablet previews and phone disclosure content visually checked.
- Services page main content contains no `img` or `video` elements. Shared header/footer retain the approved logo. All project photography uses explicitly labeled placeholders.
- Desktop pointer selection and phone keyboard selection open the chosen native disclosure and update the desktop preview. Direct links to Landscaping, Seasonal Cleanup, and Snow Plowing open the matching service below the sticky header.
- Reduced motion: disclosure animation is disabled, reveals remain visible, and service links still open the matching entry.
- All local fragment links on the Services page resolve. One H1, Services navigation current-page state, and page-specific title/description/canonical are present.
- Integration check: mobile Services → Home → homepage Lawn Care link → Services → About anchor all resolve correctly and close the mobile menu. Homepage hero still advances from slide 0 to slide 1 after five seconds; all seven service cards remain present.
- No browser errors or Vite error overlay detected. No external calls, texts, or emails were sent.

## Individual service pages — September 25

- `npm run check`: 18 files, 0 errors, 0 warnings, 0 hints. Static build generates all seven service routes.
- Each service page checked in a browser at 320, 390, 768, 1024, and 1440px: no page-level horizontal overflow or overflowing H1. Desktop, tablet, and phone screenshots visually reviewed.
- All seven pages have one H1, unique title/description, a matching canonical URL, three FAQs, and two labeled photo placeholders. No photos or videos were added to their main content; shared logos remain.
- Internal route and fragment links across the homepage, overview, and seven service pages resolve correctly.
- Desktop service dropdown: pointer opening, navigation to Landscaping, ArrowDown focus, Escape closure/focus return, and current-page marking checked. Our Services remains a direct link to the overview.
- Hover enhancement: real pointer movement opens the desktop dropdown, keeps it open over its links, and closes it after leaving. Escape dismisses it; keyboard focus keeps the panel open when the pointer leaves. Phone disclosure click-to-open/click-to-close behavior remains functional. Check and build pass with the enhancement.
- Phone menu: expandable service list, two-stage Escape behavior/focus return, scrolling within a 320×568 viewport, and closure after navigation checked. Navigation to Snow Plowing, Trimming, and the Services overview verified.
- Overview Lawn Care link opens its standalone page. The homepage's seven service cards and footer links point to the individual pages.
- FAQ pointer and Enter-key toggles checked. Opening a second FAQ closes the first.
- Reduced-motion emulation: all reveal content remains visible. Normal-motion scroll reveals, placeholder layouts, and estimate sections visually reviewed.
- Homepage regression: hero advances from slide 0 to slide 1 after five seconds; all seven service links remain present. No browser errors detected.
- No calls, texts, emails, or Cloudflare publication performed during verification.

## About Us — September 25

- `npm run check`: 19 files, 0 errors, 0 warnings, 0 hints. Static build generates `/about/index.html`; sitemap includes `/about/`.
- Browser checks at 320, 390, 768, 1024, and 1440px: no horizontal page or heading overflow. Both placeholder captions fit within their photo slots. Desktop, tablet, and phone screenshots visually reviewed.
- Main content contains two descriptive photo placeholders and no images or videos. Shared header/footer logos remain.
- Header and footer About links, plus the homepage introduction CTA, point to `/about/`. All internal routes and fragment links across the 10 public content pages resolve correctly. The original homepage `#about` section remains intact.
- One H1, page-specific title/description/canonical, and About Us current-page navigation state verified.
- Get to Know Us scrolls to the story section below the sticky header. Mobile Home → About navigation resolves, closes the menu, and marks About Us current.
- Normal-motion scroll reveals visually reviewed. With reduced motion enabled, all content remains visible and the layout stays within the viewport.
- Company facts were checked against the [current Flores site](https://www.flores-landscaping-llc.com/): family ownership, 20+ years of experience, licensing/insurance, residential/commercial work, and the four listed service areas. No founder names, founding year, awards, or timeline were invented.
- Contact links retain the existing phone, SMS, and email destinations. No calls, texts, or emails were sent. Browser error log was empty.

## Our Work — September 25

- `npm run check`: 23 files, 0 errors, 0 warnings, 0 hints. Static build generates `/our-work/index.html`; sitemap includes `/our-work/`.
- Browser checks at 320, 360, 390, 768, 1024, and 1440px: no page-level horizontal overflow or overflowing headings. Estimate phone number fits. Desktop, tablet, and phone screenshots visually reviewed.
- Three interactive comparison placeholders and six labeled gallery photo slots; no images or videos in the page's main content. Shared logos remain.
- Desktop range responds to ArrowRight and real pointer dragging, updating both the visible split and accessible percentage. Phone Before/After controls update the view and pressed state. Previous/next controls advance through all three previews, update the count, and disable at the ends.
- Gallery service filters show matching cards and update the live result count and pressed states. Garden Beds shows two slots, Lawn Care and Trimming show one each, and All Work restores six. Keyboard Enter activates the focused filter.
- All internal routes and fragment links across the 11 public content pages resolve. One H1, page-specific canonical, and Our Work current-page navigation state verified. The homepage retains its original comparison section.
- Mobile Home → Our Work navigation resolves, closes the menu, and marks Our Work current. Browser error log was empty.
- Reduced-motion emulation keeps every reveal visible. Comparisons do not auto-advance. No calls, texts, emails, or deployment were performed during verification.

## Contact — September 25

- `npm run check`: 29 files, 0 errors, 0 warnings, 0 hints. Static build generates `/contact/index.html` and includes the route in the sitemap.
- `npm test`: all 22 tests pass. The contact endpoint is tested with simulated providers for validation, request origin, unsupported methods/content types, payload limits, throttling, expired/mismatched challenges, provider rejection/timeouts, missing send confirmation, retry idempotency, and success. No external email is sent by the tests.
- Browser checks at 320, 360, 390, 768, 1024, and 1440px show no page, field, or heading overflow. Desktop, tablet, and phone layouts visually inspected. Main content has one labeled photo placeholder and no images or videos.
- Browser-only provider mocks verify invalid-form constraints, actual submit-button activation, locked fields/button during sending, duplicate-submit suppression, failure messages, preservation of entered details, stable request ID on retry, and clearing only after confirmed success. All mocks are removed on navigation; no test behavior is included in production code.
- Cloudflare dry-run succeeds with the static assets binding and contact rate limiter. The real local Wrangler runtime serves Contact/About successfully, preserves the custom 404, returns JSON for `/api/contact`, and returns 503 for unconfigured submissions. No publication performed.
- All internal routes/fragments across the 12 public pages resolve. Header/footer/estimate links reach Contact; service links preselect the matching service. The form anchor lands below the sticky header. Mobile Our Work → Contact navigation closes the menu and marks Contact current.
- FAQ pointer and Enter-key controls work; opening a second answer closes the first. Reduced motion keeps all reveal content visible. Browser error log is empty after the checks.
- Sender, recipient, Resend key, and Turnstile keys remain unset. The form shows an honest availability notice and disables sending while retaining direct contact links. Setup is documented in `docs/contact-setup.md`.

Real Resend inbox delivery, a production Turnstile challenge, production domain configuration, and live Cloudflare deployment still require configured accounts and launch verification. They have not been performed.

## Client photo review and placement — September 25

- All 83 photos in six client batches were visually reviewed, with enlarged paired sheets for likely transformations. The catalog accounts for every source file, project grouping, duplicate, reserved alternative, uncertainty, and selected placement in `docs/photo-review/`.
- Selected 37 unique source photos: 12 comparison images, nine gallery photos, and 16 other page placements. The two original front-yard images replace their existing collage; resized existing images were not re-imported. Distinct responsive variants use one source file.
- SHA-256 verification confirms all 83 Desktop originals are unchanged. All 37 web copies are uniquely sourced, correctly oriented, limited to a 2,200-pixel edge, and free of embedded EXIF/XMP/IPTC metadata. The public build contains no review catalog or original Desktop files.
- `npm run check`: 32 files, 0 errors, warnings, or hints. `npm run build`: 13 static pages; responsive WebP images and full-view images generated successfully. Full-view images are capped at a 1,600-pixel longest edge; gallery cards do not upscale the smaller brick-building photo.
- Visually inspected desktop and phone homepage comparisons, desktop/phone Our Work, desktop Services, and desktop/tablet/phone Lawn Care. All ten interior routes were checked at 320px: no page overflow and no broken images after decoding. Our Work was also checked at 390, 768 and 1440px; Lawn Care at 390, 768 and 1440px.
- Desktop comparison ArrowRight changes 50 to 51 and announces “Before 51%, after 49%.” Phone Before/After buttons change the visible photo and pressed state; homepage Next advances the count to 02 / 03. Tablet keeps the compact buttons and hides the slider.
- Gallery Lawn Care filter shows three matching photos; All Work restores all nine. Desktop comparison viewer loads both complete images. Phone gallery viewer loads one complete image without horizontal overflow. Escape dismisses the dialog, unlocks page scrolling, and returns focus to the opener. Browser error log is empty.
- Client photo selection leaves the approved hero and other existing homepage sections intact. No videos added. Family/team portrait, snow images and unmatched detail slots remain explicit placeholders. Uncertain and preparation-to-finish sequences are documented rather than labeled as confirmed untouched before/after pairs.
- Contact integrations, secrets, deployment configuration and backend behavior are unchanged. No emails, account activation, or Cloudflare publication performed.
- Final reduced-motion check: homepage project content remains visible, with no overflow. Local `/api/contact` still returns `available: false` and a null Turnstile site key. Test browser closed after verification.
