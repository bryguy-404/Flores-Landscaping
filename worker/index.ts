import { handleContact, type ContactEnv } from './contact.ts';

interface Env extends ContactEnv { ASSETS: { fetch: (request: Request) => Promise<Response> }; }

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = new URL(request.url).pathname.replace(/\/$/, '');
    if (pathname === '/api/contact') return handleContact(request, env);
    if (pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
