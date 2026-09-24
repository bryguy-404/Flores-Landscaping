const compact = window.matchMedia('(max-width: 1023px)');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-comparison]').forEach(card => {
  const range = card.querySelector<HTMLInputElement>('.comparison-range');
  const toolbar = card.querySelector<HTMLElement>('.comparison-toolbar');
  const buttons = card.querySelectorAll<HTMLButtonElement>('[data-comparison-view]');
  if (!range || !toolbar) return;

  function update(value: number) {
    if (!range) return;
    range.value = String(value);
    card.style.setProperty('--comparison', `${value}%`);
    card.dataset.view = value === 100 ? 'before' : value === 0 ? 'after' : 'split';
    range.setAttribute('aria-valuetext', `Before ${value}%, after ${100 - value}%`);
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.comparisonView === card.dataset.view)));
  }

  function setLayout() {
    range!.hidden = compact.matches;
    update(compact.matches ? 0 : 50);
  }
  toolbar.hidden = false;
  range.addEventListener('input', () => update(Number(range.value)));
  buttons.forEach(button => button.addEventListener('click', () => update(button.dataset.comparisonView === 'before' ? 100 : 0)));
  compact.addEventListener('change', setLayout);
  setLayout();
});

const track = document.querySelector<HTMLElement>('#project-track');
const previous = document.querySelector<HTMLButtonElement>('#project-prev');
const next = document.querySelector<HTMLButtonElement>('#project-next');
const count = document.querySelector<HTMLElement>('#project-count');
const controls = document.querySelector<HTMLElement>('.project-navigation');
if (track && previous && next && count && controls) {
  const cards = Array.from(track.querySelectorAll<HTMLElement>('.project-card'));
  const step = () => (cards[0]?.offsetWidth ?? 0) + (parseFloat(getComputedStyle(track).columnGap) || 0);
  const sync = () => {
    const index = Math.min(cards.length - 1, Math.round(track.scrollLeft / (step() || 1)));
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    previous.disabled = track.scrollLeft < 5;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
  };
  const move = (direction: number) => track.scrollBy({ left: direction * step(), behavior: reduced.matches ? 'instant' : 'smooth' });
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', sync, { passive: true });
  new ResizeObserver(sync).observe(track);
  controls.hidden = false;
  sync();
}

const dialog = document.querySelector<HTMLDialogElement>('#project-dialog');
document.querySelectorAll<HTMLButtonElement>('[data-project-image]').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('[data-comparison]');
    const source = card?.querySelector<HTMLImageElement>('img');
    const target = dialog?.querySelector<HTMLImageElement>('#project-dialog-image');
    if (!dialog || !card || !source || !target) return;
    target.src = source.currentSrc || source.src;
    target.alt = 'Original before-and-after collage: overgrown front garden above, refreshed stone beds and shrubs below.';
    dialog.querySelector('#project-dialog-title')!.textContent = card.querySelector('h3')!.textContent;
    dialog.querySelector('#project-dialog-category')!.textContent = 'BEFORE (TOP) / AFTER (BOTTOM)';
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
dialog?.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
