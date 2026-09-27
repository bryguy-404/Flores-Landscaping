import { handleGoogleReviews, type ReviewsEnv } from '../../worker/google-reviews.ts';

// Cloudflare Pages entry point; the Worker deployment uses the same handler.
export function onRequest({ request, env }: { request: Request; env: ReviewsEnv }) {
  return handleGoogleReviews(request, env);
}
