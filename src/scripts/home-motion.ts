import { initReveals } from './scroll-reveals';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const AUTOPLAY_DELAY = 5_000;

/** Only spend a rotation timer while the carousel is visible and unattended. */
function autoplay(root: HTMLElement, viewport: HTMLElement, button: HTMLButtonElement, advance: () => void) {
  let timer: number | undefined;
  let visible = false;
  let hovered = false;
  let touching = false;
  let paused = false;

  function clearTimer() {
    window.clearTimeout(timer);
    timer = undefined;
  }

  function sync() {
    clearTimer();
    const running = visible && !document.hidden && !reducedMotion.matches && !paused && !hovered && !touching;
    root.dataset.autoplay = running ? 'playing' : 'paused';
    button.hidden = reducedMotion.matches;
    button.dataset.paused = String(paused);
    button.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} ${button.dataset.carouselLabel}`);
    button.title = `${paused ? 'Play' : 'Pause'} slideshow`;
    if (running) {
      timer = window.setTimeout(() => {
        advance();
        sync();
      }, AUTOPLAY_DELAY);
    }
  }

  button.addEventListener('click', () => { paused = !paused; sync(); });
  root.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') { hovered = true; sync(); }
  });
  root.addEventListener('pointerleave', () => { hovered = false; sync(); });
  root.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') { touching = true; sync(); }
  }, { passive: true });
  const releaseTouch = () => { if (touching) { touching = false; sync(); } };
  window.addEventListener('pointerup', releaseTouch, { passive: true });
  window.addEventListener('pointercancel', releaseTouch, { passive: true });
  // Keyboard/manual navigation stops rotation until the visitor presses Play.
  root.addEventListener('focusin', event => {
    if (event.target !== button) { paused = true; sync(); }
  });
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  window.addEventListener('pagehide', clearTimer);
  window.addEventListener('pageshow', sync);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.2;
      sync();
    }, { threshold: 0.2 }).observe(viewport);
  }
  sync();
}


function initHero() {
  const hero = document.querySelector<HTMLElement>('.hero');
  const images = document.querySelectorAll<HTMLImageElement>('.hero-image');
  const dots = document.querySelectorAll<HTMLButtonElement>('[data-slide]');
  const toggle = document.querySelector<HTMLButtonElement>('#hero-autoplay');
  if (!hero || !images.length || !toggle) return;
  let current = 0;
  let request = 0;

  async function showSlide(index: number, automatic = false) {
    const next = (index + images.length) % images.length;
    const requested = ++request;
    // Keep the current photo visible until its replacement has decoded.
    try { await images[next].decode(); } catch { return; }
    if (requested !== request) return;
    if (automatic && hero?.dataset.autoplay !== 'playing') return;
    current = next;
    images.forEach((image, i) => {
      // Hold the outgoing zoom frame while its opacity fades away.
      if (image.classList.contains('is-active') && i !== current) image.style.transform = getComputedStyle(image).transform;
      if (i === current) image.style.removeProperty('transform');
      image.classList.toggle('is-active', i === current);
      image.setAttribute('aria-hidden', String(i !== current));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-pressed', String(i === current));
    });
  }
  dots.forEach(dot => dot.addEventListener('click', () => { void showSlide(Number(dot.dataset.slide)); }));
  hero.querySelector('.hero-prev')?.addEventListener('click', () => { void showSlide(current - 1); });
  hero.querySelector('.hero-next')?.addEventListener('click', () => { void showSlide(current + 1); });
  autoplay(hero, hero, toggle, () => { void showSlide(current + 1, true); });
}

function initServices() {
  const root = document.querySelector<HTMLElement>('#services');
  const track = document.querySelector<HTMLElement>('#service-track');
  const previous = document.querySelector<HTMLButtonElement>('#service-prev');
  const next = document.querySelector<HTMLButtonElement>('#service-next');
  const toggle = document.querySelector<HTMLButtonElement>('#services-autoplay');
  if (!root || !track || !previous || !next || !toggle) return;
  let direction = 1;

  function updateButtons() {
    if (!track || !previous || !next) return;
    previous.disabled = track.scrollLeft < 5;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
  }
  function move(step: number) {
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.service-card');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: step * ((card?.offsetWidth ?? 350) + gap),
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateButtons, { passive: true });
  new ResizeObserver(updateButtons).observe(track);
  updateButtons();

  autoplay(root, track, toggle, () => {
    const end = track.scrollWidth - track.clientWidth;
    if (end < 5) return;
    // Reverse at either end rather than making a long jump across the cards.
    if (track.scrollLeft >= end - 5) direction = -1;
    if (track.scrollLeft < 5) direction = 1;
    move(direction);
  });
}

initReveals();
initHero();
initServices();
