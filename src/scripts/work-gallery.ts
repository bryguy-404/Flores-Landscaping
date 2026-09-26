const galleryGrid = document.querySelector<HTMLElement>('#work-gallery-grid');
const galleryFilters = document.querySelector<HTMLElement>('.work-gallery-filters');
const galleryButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]'));
const galleryCards = Array.from(document.querySelectorAll<HTMLElement>('[data-gallery-category]'));
const galleryStatus = document.querySelector<HTMLElement>('#work-gallery-status');
const galleryMore = document.querySelector<HTMLButtonElement>('#work-gallery-more');

if (galleryGrid && galleryFilters && galleryStatus && galleryMore) {
  const previewCount = 12;
  let category = 'all';
  let expanded = false;
  let frame = 0;
  const matchingCards = () => galleryCards.filter(card => category === 'all' ||
    (category === 'progress' ? ['before', 'progress'].includes(card.dataset.galleryStage || '') : card.dataset.galleryCategory === category));

  // Place complete photos in the shortest column. Intrinsic ratios reserve the
  // space before lazy-loaded images arrive, keeping the layout stable.
  function layout() {
    if (!galleryGrid) return;
    const css = getComputedStyle(galleryGrid);
    const columns = Number(css.getPropertyValue('--gallery-columns')) || 3;
    const gap = parseFloat(css.getPropertyValue('--gallery-gap')) || 16;
    const width = (galleryGrid.clientWidth - gap * (columns - 1)) / columns;
    if (width <= 0) return;
    const heights = Array<number>(columns).fill(0);
    galleryGrid.classList.add('is-masonry');
    galleryCards.filter(card => !card.hidden).forEach(card => {
      const column = heights.indexOf(Math.min(...heights));
      const height = width / Number(card.dataset.galleryRatio);
      card.style.width = `${width}px`;
      card.style.left = `${column * (width + gap)}px`;
      card.style.top = `${heights[column]}px`;
      heights[column] += height + gap;
    });
    galleryGrid.style.height = `${Math.max(0, ...heights) - gap}px`;
  }
  const scheduleLayout = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  };
  function render() {
    const matching = matchingCards();
    const shown = expanded ? matching : matching.slice(0, previewCount);
    const visible = new Set(shown);
    const matches = new Set(matching);
    galleryCards.forEach(card => { card.hidden = !visible.has(card); card.dataset.galleryMatches = String(matches.has(card)); });
    galleryButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.galleryFilter === category)));
    const label = galleryButtons.find(button => button.dataset.galleryFilter === category)?.textContent?.trim();
    galleryStatus!.textContent = `${shown.length} of ${matching.length} photos${category === 'all' ? '' : ` · ${label}`}`;
    galleryMore!.hidden = matching.length <= previewCount;
    galleryMore!.setAttribute('aria-expanded', String(expanded));
    galleryMore!.textContent = expanded ? 'Show fewer photos' : `View all ${matching.length} photos`;
    layout();
    return matching;
  }
  galleryButtons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.galleryFilter || 'all';
    expanded = false;
    render();
  }));
  galleryMore.addEventListener('click', () => {
    expanded = !expanded;
    const matching = render();
    if (expanded) {
      matching[previewCount]?.querySelector<HTMLAnchorElement>('a')?.focus();
    } else {
      galleryFilters.scrollIntoView({ behavior: 'instant', block: 'start' });
      galleryButtons.find(button => button.dataset.galleryFilter === category)?.focus({ preventScroll: true });
    }
  });
  galleryFilters.hidden = false;
  render();
  new ResizeObserver(scheduleLayout).observe(galleryGrid);
}
