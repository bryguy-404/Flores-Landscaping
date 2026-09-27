import type { GoogleReviewsResponse } from '../lib/google-reviews';

const section = document.querySelector<HTMLElement>('#reviews');
if (section) {
  const track = section.querySelector<HTMLElement>('#reviews-track')!;
  const content = section.querySelector<HTMLElement>('[data-review-content]')!;
  const fallback = section.querySelector<HTMLElement>('[data-review-fallback]')!;
  const template = section.querySelector<HTMLTemplateElement>('[data-review-template]')!;
  const controls = section.querySelector<HTMLElement>('[data-review-controls]')!;
  const previous = section.querySelector<HTMLButtonElement>('[data-review-prev]')!;
  const next = section.querySelector<HTMLButtonElement>('[data-review-next]')!;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  let loaded = false;

  function updateControls() {
    const max = track.scrollWidth - track.clientWidth;
    controls.hidden = max <= 2;
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
  }
  function scrollReviews(direction: number) {
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => scrollReviews(-1));
  next.addEventListener('click', () => scrollReviews(1));
  track.addEventListener('scroll', updateControls, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    scrollReviews(event.key === 'ArrowRight' ? 1 : -1);
  });

  async function loadReviews() {
    if (loaded) return;
    loaded = true;
    const abort = new AbortController();
    const timeout = window.setTimeout(() => abort.abort(), 8000);
    try {
      const response = await fetch('/api/google-reviews', { cache: 'no-store', signal: abort.signal });
      if (!response.ok) return;
      const data: GoogleReviewsResponse = await response.json();
      if (!Array.isArray(data.reviews) || !data.reviews.length) return;
      const cards = document.createDocumentFragment();
      data.reviews.forEach((review, index) => {
        const fragment = template.content.cloneNode(true) as DocumentFragment;
        const text = fragment.querySelector<HTMLElement>('[data-review-text]')!;
        text.id = `google-review-${index}`;
        text.textContent = review.text;
        if (review.languageCode) text.lang = review.languageCode;
        const expand = fragment.querySelector<HTMLButtonElement>('[data-review-expand]')!;
        expand.setAttribute('aria-controls', text.id);
        if (review.text.length > 240 || review.text.split('\n').length > 4) {
          text.classList.add('is-collapsed');
          expand.hidden = false;
          expand.addEventListener('click', () => {
            const expanded = expand.getAttribute('aria-expanded') !== 'true';
            text.classList.toggle('is-collapsed', !expanded);
            expand.setAttribute('aria-expanded', String(expanded));
            expand.textContent = expanded ? 'Read less' : 'Read more';
          });
        }
        const author = fragment.querySelector<HTMLAnchorElement>('[data-review-author]')!;
        author.textContent = review.name;
        author.href = review.authorUrl || review.sourceUrl;
        const avatar = fragment.querySelector<HTMLImageElement>('[data-review-avatar]')!;
        if (review.avatarUrl) {
          avatar.src = review.avatarUrl;
          avatar.hidden = false;
          avatar.addEventListener('error', () => { avatar.hidden = true; }, { once: true });
        }
        if (review.date) {
          const date = fragment.querySelector<HTMLTimeElement>('[data-review-date]')!;
          date.dateTime = review.date;
          date.textContent = dateFormatter.format(new Date(review.date));
          date.hidden = false;
        }
        fragment.querySelector<HTMLAnchorElement>('[data-review-source]')!.href = review.sourceUrl;
        cards.append(fragment);
      });
      const providers = section!.querySelector<HTMLElement>('[data-review-providers]')!;
      for (const attribution of data.attributions || []) {
        const item = document.createElement(attribution.uri ? 'a' : 'span');
        item.textContent = attribution.name;
        if (item instanceof HTMLAnchorElement && attribution.uri) {
          item.href = attribution.uri;
          item.target = '_blank';
          item.rel = 'noopener noreferrer';
        }
        providers.append(item);
      }
      track.replaceChildren(cards);
      content.hidden = false;
      fallback.hidden = true;
      section!.dataset.reviewState = 'live';
      new ResizeObserver(updateControls).observe(track);
      updateControls();
    } catch {
      // Keep the real Google profile link available on failure; never invent reviews.
    } finally {
      window.clearTimeout(timeout);
    }
  }
  // One request only when visitors approach this section; no polling or retries.
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    void loadReviews();
  }, { rootMargin: '200px' });
  observer.observe(section);
}
