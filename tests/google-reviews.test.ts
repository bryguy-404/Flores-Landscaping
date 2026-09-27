import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleGoogleReviews } from '../worker/google-reviews.ts';
import worker from '../worker/index.ts';
import { onRequest } from '../functions/api/google-reviews.ts';

const env = { GOOGLE_PLACES_API_KEY: 'test-secret-never-publish', GOOGLE_PLACE_ID: 'test-place-id' };
const request = () => new Request('https://flores.example/api/google-reviews');
const noNetwork: typeof fetch = async () => { assert.fail('Must not call Google'); };
function review(name: string, rating = 5, date = '2026-09-20T12:00:00Z') {
  return { rating, publishTime: date, text: { text: 'Synthetic test review' }, authorAttribution: { displayName: name, uri: 'https://www.google.com/maps/contrib/test', photoUri: 'https://example.com/avatar.png' }, googleMapsUri: 'https://www.google.com/maps/reviews/test' };
}

test('requests fixed business using a server key and does not cache Google content', async () => {
  const response = await handleGoogleReviews(new Request('https://flores.example/api/google-reviews?place_id=attacker&key=wrong'), env, async (url, init) => {
    assert.equal(url, 'https://places.googleapis.com/v1/places/test-place-id?languageCode=en');
    const headers = new Headers(init?.headers);
    assert.equal(headers.get('X-Goog-Api-Key'), env.GOOGLE_PLACES_API_KEY);
    assert.equal(headers.get('X-Goog-FieldMask'), 'reviews,attributions');
    assert.equal(headers.get('Cache-Control'), 'no-store');
    assert.equal(init?.redirect, 'manual');
    assert.ok(init?.signal);
    return Response.json({ reviews: [review('Test Author')] });
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('CDN-Cache-Control'), 'no-store');
  assert.ok(!(await response.text()).includes(env.GOOGLE_PLACES_API_KEY));
});

test('keeps five-star written reviews, newest publication first, undated last', async () => {
  const response = await handleGoogleReviews(request(), env, async () => Response.json({ reviews: [
    review('Older', 5, '2026-01-01T00:00:00Z'), review('Four-star', 4),
    review('No date', 5, 'invalid'), review('Newest', 5, '2026-09-26T00:00:00Z'),
    { ...review('No text'), text: {} },
  ] }));
  const body = await response.json();
  assert.deepEqual(body.reviews.map((item: { name: string }) => item.name), ['Newest', 'Older', 'No date']);
  assert.equal(body.reviews[2].date, null);
});

test('preserves original text and author/provider attribution and strips unsafe URLs', async () => {
  const response = await handleGoogleReviews(request(), env, async () => Response.json({
    reviews: [{ ...review('Original Author'), originalText: { text: 'Texto original', languageCode: 'es' }, authorAttribution: { displayName: 'Original Author', uri: 'javascript:alert(1)', photoUri: 'http://example.com/avatar' } }, { ...review('Bad source'), googleMapsUri: 'javascript:alert(1)' }],
    attributions: [{ provider: 'Test Provider', providerUri: 'https://example.com' }, { provider: 'Text only', providerUri: 'javascript:alert(1)' }],
  }));
  const body = await response.json();
  assert.equal(body.reviews.length, 1);
  assert.equal(body.reviews[0].text, 'Texto original');
  assert.equal(body.reviews[0].languageCode, 'es');
  assert.equal(body.reviews[0].authorUrl, null);
  assert.equal(body.reviews[0].avatarUrl, null);
  assert.deepEqual(body.attributions, [{ name: 'Test Provider', uri: 'https://example.com/' }, { name: 'Text only', uri: null }]);
});

test('missing configuration and unsupported requests never spend Google quota', async () => {
  assert.equal((await handleGoogleReviews(request(), {}, noNetwork)).status, 503);
  assert.equal((await handleGoogleReviews(request(), { ...env, GOOGLE_PLACE_ID: '../another-place' }, noNetwork)).status, 503);
  const post = await handleGoogleReviews(new Request(request(), { method: 'POST' }), env, noNetwork);
  assert.equal(post.status, 405);
  assert.equal(post.headers.get('Allow'), 'GET');
  assert.equal((await handleGoogleReviews(new Request(request(), { headers: { 'Sec-Fetch-Site': 'cross-site' } }), env, noNetwork)).status, 403);
});

test('upstream errors expose diagnostic codes, never secrets or Google response messages', async () => {
  const response = await handleGoogleReviews(request(), env, async () => Response.json({ error: { message: env.GOOGLE_PLACES_API_KEY, details: [{ reason: 'BILLING_DISABLED', metadata: { secret: env.GOOGLE_PLACES_API_KEY } }] } }, { status: 403 }));
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.reason, 'BILLING_DISABLED');
  assert.equal(body.upstreamStatus, 403);
  assert.ok(!JSON.stringify(body).includes(env.GOOGLE_PLACES_API_KEY));
  for (const fetcher of [async () => { throw new Error(env.GOOGLE_PLACES_API_KEY); }, async () => new Response('bad json'), async () => new Response('', { status: 302 })]) {
    const failed = await handleGoogleReviews(request(), env, fetcher);
    assert.equal(failed.status, 503);
    assert.ok(!(await failed.text()).includes(env.GOOGLE_PLACES_API_KEY));
  }
});

test('no reviews or no qualifying reviews returns an empty selection, not invented content', async () => {
  for (const data of [{}, { reviews: [review('Four-star', 4)] }, { reviews: [] }]) {
    const response = await handleGoogleReviews(request(), env, async () => Response.json(data));
    assert.deepEqual(await response.json(), { reviews: [], attributions: [] });
  }
});

test('Pages and Worker routes reach the review handler, leaving other routes intact', async () => {
  const pages = await onRequest({ request: request(), env: {} });
  assert.equal((await pages.json()).code, 'CONFIGURATION_MISSING');
  const workerEnv = { ASSETS: { fetch: async () => new Response('static asset') } };
  for (const path of ['/api/google-reviews', '/api/google-reviews/']) {
    const result = await worker.fetch(new Request(`https://flores.example${path}`), workerEnv);
    assert.equal((await result.json()).code, 'CONFIGURATION_MISSING');
  }
  assert.equal(await (await worker.fetch(new Request('https://flores.example/'), workerEnv)).text(), 'static asset');
});
