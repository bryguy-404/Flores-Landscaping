# Contact form setup

The Contact page is at `/contact/`. It remains static Astro HTML. A small Cloudflare Worker handles `/api/contact` and forwards all other requests to the existing static assets. No Astro server adapter, React runtime, database, or email SDK is needed for this endpoint.

## Current state

The page, validation, Turnstile integration, rate limiter, and Resend API handling are implemented. No credentials have been added, no live email has been sent, and nothing has been deployed by this change. Without complete configuration, the form displays an availability notice and disables sending; phone, text, and email links remain available.

The Astro development server at the usual preview URL deliberately returns an unavailable configuration. This lets the client review and fill in the form without sending messages. It does not simulate a successful submission.

## Settings to connect before launch

| Setting | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key with permission to send from the verified domain. Keep this secret. |
| `CONTACT_FROM_EMAIL` | Plain email address on the verified sending domain. The Worker adds the display name. |
| `CONTACT_TO_EMAIL` | The business inbox that should receive estimate requests. Confirm this with the client; the current public address is `floreslandscaping098@gmail.com`. |
| `TURNSTILE_SITE_KEY` | Public key for a Cloudflare Turnstile widget allowing the website hostname. |
| `TURNSTILE_SECRET_KEY` | Private Turnstile verification key. Keep this secret. |

Configure these on the Cloudflare Worker when preparing the approved deployment. The site key is intentionally returned to the browser; the API key, private verification key, and recipient settings stay on the server. Do not put secrets in a `PUBLIC_` variable or commit them.

Verify the sending domain in Resend, including its required DNS records. Add every hostname on which the form should work to the Turnstile widget. The server checks the returned hostname against the request hostname and checks the `estimate` action. A preview domain will also need to be allowed if you want to test a deployed preview.

The rate-limit binding in `wrangler.jsonc` permits five attempts per minute per IP at each Cloudflare location. Its namespace ID must be unique within the deployment account if other Workers should not share counters. It complements Turnstile; it is not an account-wide strict quota.

## Local checks

```sh
npm run check
npm test
npm run build
npm run preview:worker
```

Wrangler prints the local Worker URL, normally `http://127.0.0.1:8787`. This serves the built site and the actual endpoint. Rebuild after changing page content. Copy `.dev.vars.example` to `.dev.vars` only when configuring local credentials; `.dev.vars` is ignored by Git. Using real credentials can send real email, so use an explicitly approved test recipient for any delivery test.

The automated tests inject simulated Turnstile and Resend responses and never contact the providers. They cover invalid input, origin checks, oversized requests, throttling, challenge validation, provider failure, stable retry keys, and successful acceptance. Browser checks exercise form validation, loading, failure, retry, and success with temporary browser-only mocks.

Validate packaging without publishing:

```sh
npx wrangler deploy --dry-run --outdir /tmp/flores-worker-dry-run
```

## Submission behavior

- Request fields: name, email, optional phone, city/town, service, property type, and project description. Full street addresses, attachments, and videos are not collected.
- Service-page estimate links preselect the service using `?service=…#estimate`; unknown values are ignored.
- The server restricts methods and request origin, caps the body at 16 KiB, validates lengths and choices, checks a honeypot, rate limits attempts, and verifies Turnstile before contacting Resend.
- Resend receives a plain-text message addressed to the configured business inbox, with the visitor's email as `reply_to`. No automatic reply is sent to the visitor.
- The form locks while sending. Failures preserve entered details. A confirmed Resend acceptance clears the form and shows success; inbox arrival still requires a real delivery check before launch.
- Retries with unchanged details retain the Resend idempotency key even after renewing the challenge token. Edited details or a new request produce a new key. Resend's deduplication window is 24 hours.
- The Worker does not log form contents or secrets. Network/provider failures return a visitor-friendly error, not raw provider details.

## Launch verification still needed

With the client's approved sender and recipient configured, verify a real delivery, reply-to behavior, and production Turnstile challenge. Review the page's contact details and service areas with the client. Confirm the deployed form works from the final domain before announcing it live.

References: [Cloudflare static assets with a Worker](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/), [Workers rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/), [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [Resend email API](https://resend.com/docs/api-reference/emails/send-email), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).
