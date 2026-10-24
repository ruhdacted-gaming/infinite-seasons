// Serves dist/ as static assets and redirects http and www to https://infiniteseasons.com.
// `npm run dev` turns the redirects off, because wrangler dev reports the production hostname.
const APEX = "infiniteseasons.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (env.CANONICAL_REDIRECTS === "true" && (url.protocol === "http:" || url.hostname !== APEX)) {
      url.protocol = "https:";
      url.hostname = APEX;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
