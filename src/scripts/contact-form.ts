interface Turnstile {
  render: (container: HTMLElement, options: {
    sitekey: string; action: string; theme: string; size: string;
    callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void;
  }) => string;
  reset: (id: string) => void;
}
declare global { interface Window { turnstile?: Turnstile; onFloresTurnstileLoad?: () => void; } }

const form = document.querySelector<HTMLFormElement>('#estimate-form');
const submit = document.querySelector<HTMLButtonElement>('#estimate-submit');
const status = document.querySelector<HTMLElement>('#estimate-status');
const widget = document.querySelector<HTMLElement>('#estimate-verification');

if (form && submit && status && widget) {
  const buttonLabel = submit.querySelector('span')!;
  let ready = false;
  let sending = false;
  let token = '';
  let widgetId: string | undefined;
  let requestId = crypto.randomUUID();
  const announce = (message: string, state = '') => { status.textContent = message; status.dataset.state = state; };
  const updateButton = () => { submit.disabled = !ready || !token || sending; };
  const resetChallenge = () => {
    token = '';
    if (widgetId !== undefined) window.turnstile?.reset(widgetId);
    updateButton();
  };
  const service = form.querySelector<HTMLSelectElement>('#service');
  const selection = new URLSearchParams(location.search).get('service');
  if (service && selection && [...service.options].some(option => option.value === selection)) service.value = selection;

  // The static Astro preview intentionally stays unavailable until a Worker is configured.
  // Run `npm run preview:worker` to exercise the production endpoint locally.
  async function prepare() {
    try {
      const response = await fetch('/api/contact', { signal: AbortSignal.timeout(8000), cache: 'no-store' });
      if (!response.ok || !response.headers.get('Content-Type')?.includes('application/json')) return;
      const config = await response.json() as { available?: boolean; siteKey?: string };
      if (!config.available || !config.siteKey) return;
      const siteKey = config.siteKey;
      announce('Complete the security check below to send your request.');
      let loaded = false;
      const timer = window.setTimeout(() => {
        if (!loaded) announce('The security check couldn’t load. Please refresh this page or call our team.', 'error');
      }, 15000);
      window.onFloresTurnstileLoad = () => {
        loaded = true;
        clearTimeout(timer);
        if (!window.turnstile || !widget) return;
        ready = true;
        widgetId = window.turnstile.render(widget, {
          // Compact also fits the form's narrowest 320px phone layout.
          sitekey: siteKey, action: 'estimate', theme: 'light', size: 'compact',
          callback: value => {
            token = value;
            if (status?.dataset.state !== 'success' && status?.dataset.state !== 'error') announce('');
            updateButton();
          },
          'expired-callback': () => { token = ''; updateButton(); if (!sending) announce('Please complete the security check again.'); },
          'error-callback': () => { token = ''; updateButton(); announce('The security check couldn’t complete. Please refresh the page or call us.', 'error'); },
        });
      };
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onFloresTurnstileLoad';
      script.async = true;
      script.onerror = () => { clearTimeout(timer); announce('The security check couldn’t load. Please refresh the page or call us.', 'error'); };
      document.head.append(script);
    } catch { /* Direct phone, text, and email options stay available. */ }
  }
  void prepare();

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!ready || !token || sending || !form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    sending = true;
    updateButton();
    form.setAttribute('aria-busy', 'true');
    const fields = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')];
    fields.forEach(field => { field.disabled = true; });
    buttonLabel.textContent = 'SENDING YOUR REQUEST…';
    announce('Sending your request…');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(25000),
        body: JSON.stringify({ ...values, token, requestId }),
      });
      const result = await response.json() as { sent?: boolean; message?: string };
      if (!response.ok || result.sent !== true) throw new Error(result.message || 'We couldn’t send your request. Please try again or call us.');
      form.reset();
      requestId = crypto.randomUUID();
      announce(result.message || 'Thank you! Your request has been sent.', 'success');
    } catch (error) {
      announce(error instanceof Error && error.name === 'Error' ? error.message : 'We couldn’t confirm your request. Your details are still here—please try again or call us.', 'error');
    } finally {
      sending = false;
      fields.forEach(field => { field.disabled = false; });
      form.removeAttribute('aria-busy');
      buttonLabel.textContent = 'SEND MY REQUEST';
      resetChallenge();
    }
  });
}

export {};
