// Every request runs here first (run_worker_first in wrangler.jsonc), then the static site is served from site/.
//   /trials/<slug>/  always sent with X-Robots-Tag noindex (F-51). If a secret named TRIAL_<SLUG> exists
//                    (slug upper-cased, dashes to underscores), the page asks for that shared password (F-54).
//   everything       if the secret DRAFT_PASSWORD exists, the whole site asks for it. Use this while Amy reviews
//                    the draft; delete the secret to open the site.
// Set secrets in the Cloudflare dashboard or with `npx wrangler secret put <NAME>`. Any username works.

async function sha256(text) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
}

// Compares hashes so the check takes the same time whatever the guess.
async function passwordMatches(request, expected) {
  const header = request.headers.get('Authorization') || '';
  if (!header.startsWith('Basic ')) return false;
  let decoded;
  try { decoded = atob(header.slice(6)); } catch { return false; }
  const given = decoded.slice(decoded.indexOf(':') + 1);
  const [a, b] = await Promise.all([sha256(given), sha256(expected)]);
  return crypto.subtle.timingSafeEqual(a, b);
}

const noIndex = { 'X-Robots-Tag': 'noindex, nofollow' };
const askFor = (realm, message) => new Response(message, {
  status: 401,
  headers: { ...noIndex, 'Cache-Control': 'private, no-store', 'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"` }
});

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (env.DRAFT_PASSWORD && !(await passwordMatches(request, env.DRAFT_PASSWORD))) {
      return askFor('Hog Dog draft', 'This is a draft site for review. Ask for the password.');
    }

    const trial = pathname.match(/^\/trials\/([a-z0-9-]+)(\/|$)/);
    if (!trial) return env.ASSETS.fetch(request);

    const secret = env[`TRIAL_${trial[1].toUpperCase().replace(/-/g, '_')}`];
    if (secret && !(await passwordMatches(request, secret))) {
      return askFor('Hog Dog trial', 'This trial page needs the password shared with exhibitors.');
    }
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    Object.entries(noIndex).forEach(([k, v]) => out.headers.set(k, v));
    if (secret) out.headers.set('Cache-Control', 'private, no-store');
    return out;
  }
};
