const galleryFilters = document.querySelector<HTMLElement>('.work-gallery-filters');
const galleryButtons = document.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]');
const galleryCards = document.querySelectorAll<HTMLElement>('[data-gallery-category]');
const galleryStatus = document.querySelector<HTMLElement>('#work-gallery-status');

if (galleryFilters && galleryStatus) {
  galleryFilters.hidden = false;
  galleryButtons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.galleryFilter;
    let visible = 0;
    galleryCards.forEach(card => {
      const matches = category === 'all' || card.dataset.galleryCategory === category;
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    galleryButtons.forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    galleryStatus.textContent = `${visible} photo placeholder${visible === 1 ? '' : 's'}${category === 'all' ? '' : ` · ${button.textContent?.trim()}`}`;
  }));
}
