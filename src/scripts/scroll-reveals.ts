const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach(group => {
    Array.from(group.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      child.classList.add('reveal');
      child.style.setProperty('--reveal-delay', `${(index % 3) * 85}ms`);
    });
  });
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  elements.forEach(element => {
    element.classList.add('will-reveal');
    observer.observe(element);
    element.addEventListener('focusin', () => {
      element.classList.add('is-visible');
      observer.unobserve(element);
    }, { once: true });
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      elements.forEach(element => element.classList.add('is-visible'));
      observer.disconnect();
    }
  });
}
