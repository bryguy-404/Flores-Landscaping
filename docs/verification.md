# Website verification

Homepage checked locally on September 24, 2026; Services overview and navigation update checked September 25, 2026.

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: successful static build, homepage, Services overview, and custom 404 page, sitemap, 31 optimized images in the latest build.
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

Resend delivery, Turnstile, production domain configuration, and live Cloudflare deployment are outside this design phase and have not been tested.
