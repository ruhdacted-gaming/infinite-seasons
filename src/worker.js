// Serves dist/ as static assets. Redirects http to https and www to the apex domain.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:" || url.hostname === "www.infiniteseasons.com") {
      url.protocol = "https:";
      url.hostname = "infiniteseasons.com";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
