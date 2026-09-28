import { handleContact, type ContactEnv } from '../../worker/contact.ts';

// Pages passes the project's runtime secrets and variables through context.env.
export function onRequest({ request, env }: { request: Request; env: ContactEnv }) {
  return handleContact(request, env);
}
