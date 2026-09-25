import { initReveals } from './scroll-reveals';

initReveals();

const services = Array.from(document.querySelectorAll<HTMLDetailsElement>('.service-detail'));
const previews = document.querySelectorAll<HTMLElement>('[data-service-preview]');

function showPreview(id: string) {
  previews.forEach(preview => { preview.hidden = preview.dataset.servicePreview !== id; });
}

services.forEach(service => service.addEventListener('toggle', () => {
  if (service.open) showPreview(service.id);
}));

// Links from the homepage/footer open the matching service and keep its heading
// below the sticky masthead, including when the browser restores a deep link.
function openLinkedService() {
  const service = services.find(item => `#${item.id}` === window.location.hash);
  if (!service) return;
  services.forEach(item => { item.open = item === service; });
  showPreview(service.id);
  requestAnimationFrame(() => service.scrollIntoView({ block: 'start', behavior: 'instant' }));
}
window.addEventListener('hashchange', openLinkedService);
window.addEventListener('pageshow', openLinkedService);
openLinkedService();
