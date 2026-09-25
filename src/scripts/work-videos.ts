const videoCards = Array.from(document.querySelectorAll<HTMLElement>('[data-video-card]'));
const moreVideos = document.querySelector<HTMLButtonElement>('#work-videos-more');
const videoStatus = document.querySelector<HTMLElement>('#work-video-status');
const previewCount = 4;

if (moreVideos && videoStatus && videoCards.length > previewCount) {
  videoCards.slice(previewCount).forEach(card => { card.hidden = true; });
  moreVideos.hidden = false;
  videoStatus.textContent = `${previewCount} of ${videoCards.length} videos`;
  moreVideos.addEventListener('click', () => {
    const expanded = moreVideos.getAttribute('aria-expanded') !== 'true';
    videoCards.slice(previewCount).forEach(card => { card.hidden = !expanded; });
    moreVideos.setAttribute('aria-expanded', String(expanded));
    moreVideos.textContent = expanded ? 'Show fewer videos' : 'View more videos';
    videoStatus.textContent = `${expanded ? videoCards.length : previewCount} of ${videoCards.length} videos`;
    if (expanded) videoCards[previewCount].querySelector<HTMLAnchorElement>('a')?.focus();
  });
}
