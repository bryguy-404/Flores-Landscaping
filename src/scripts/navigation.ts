const header = document.querySelector<HTMLElement>('.site-header');
const toggle = document.querySelector<HTMLButtonElement>('#menu-toggle');
const nav = document.querySelector<HTMLElement>('#mobile-nav');
const desktopHover = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');

const disclosures = [...document.querySelectorAll<HTMLElement>('[data-nav-disclosure]')].flatMap(group => {
  const button = group.querySelector<HTMLButtonElement>('.services-nav-toggle');
  const panel = document.getElementById(button?.getAttribute('aria-controls') ?? '');
  if (!button || !panel) return [];
  let closeTimer: number | undefined;

  const setOpen = (open: boolean) => {
    window.clearTimeout(closeTimer);
    closeTimer = undefined;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Hide service pages' : 'Show service pages');
    panel.hidden = !open;
  };
  if (group.classList.contains('services-nav-group')) {
    group.addEventListener('pointerenter', event => {
      if (desktopHover.matches && event.pointerType !== 'touch') setOpen(true);
    });
    group.addEventListener('pointerleave', event => {
      if (!desktopHover.matches || event.pointerType === 'touch') return;
      // A short grace period keeps diagonal movement into the dropdown forgiving.
      closeTimer = window.setTimeout(() => {
        closeTimer = undefined;
        if (!group.contains(document.activeElement)) setOpen(false);
      }, 180);
    });
  }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  button.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    setOpen(true);
    panel.querySelector<HTMLAnchorElement>('a')?.focus();
  });
  group.addEventListener('focusout', event => {
    if (event.relatedTarget instanceof Node && !group.contains(event.relatedTarget)) setOpen(false);
  });
  panel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  return [{ group, button, panel, setOpen }];
});

function closeMenu() {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation menu');
  nav.hidden = true;
  disclosures.forEach(disclosure => disclosure.setOpen(false));
}

toggle?.addEventListener('click', () => {
  if (!nav) return;
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  if (!opening) return closeMenu();
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close navigation menu');
  nav.hidden = false;
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openDisclosure = disclosures.find(disclosure => !disclosure.panel.hidden);
  if (openDisclosure) {
    event.preventDefault();
    openDisclosure.setOpen(false);
    openDisclosure.button.focus();
  } else if (toggle?.getAttribute('aria-expanded') === 'true') {
    event.preventDefault();
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  disclosures.forEach(disclosure => {
    if (!disclosure.group.contains(target)) disclosure.setOpen(false);
  });
  if (!header?.contains(target)) closeMenu();
});
header?.addEventListener('focusout', event => {
  if (event.relatedTarget instanceof Node && !header.contains(event.relatedTarget)) closeMenu();
});
matchMedia('(min-width: 1024px)').addEventListener('change', closeMenu);
