// Pages serves the root 404 for every missing path; keep that URL and its language.
const base = document.body.dataset.siteBase;
const locale = location.pathname.slice(base.length).match(/^\/*(es|en|pt|it)\//)?.[1] || document.body.dataset.locale;
// Recover only destinations emitted by this build; arbitrary missing paths remain 404.
if (await redirectLegacy()) {
  // replace() preserves the query and fragment without retaining the failed history entry.
} else if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
  location.replace(`${base}${locale}/`);
} else {
  if (locale !== document.body.dataset.locale) {
    try {
      const response = await fetch(`${base}${locale}/404.html`, { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('Missing localized error page');
      const translated = new DOMParser().parseFromString(await response.text(), 'text/html');
      if (translated.body.dataset.page !== '404' || translated.body.dataset.locale !== locale) throw new Error('Invalid localized error page');
      document.documentElement.lang = translated.documentElement.lang;
      document.head.replaceChildren(...translated.head.childNodes);
      document.body.replaceWith(translated.body);
    } catch { /* The original error remains readable if the localized file is unavailable. */ }
  }
  await import('./site.js?v=283ef5ffed52');
}

/** Pages cannot send per-path redirects. Only top-level document navigation can
 * recover legacy URLs; external image embeds must use the localized SVG URL. */
async function redirectLegacy() {
  if (!location.pathname.startsWith(base)) return false;
  const relative = location.pathname.slice(base.length);
  if (/^(?:es|en|pt|it|assets)\//.test(relative)) return false;
  try {
    let route = decodeURIComponent(relative).replace(/index\.html$/, '');
    if (!/\.[^/]+$/.test(route) && !route.endsWith('/')) route += '/';
    const response = await fetch(`${base}assets/legacy-routes.json`, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return false;
    const routes = await response.json();
    if (!Array.isArray(routes) || !routes.includes(route)) return false;
    let preferred = 'es';
    try { const saved = localStorage.getItem('certitips:locale'); if (['es', 'en', 'pt', 'it'].includes(saved)) preferred = saved; } catch { /* Storage is optional. */ }
    location.replace(`${base}${preferred}/${route}${location.search}${location.hash}`);
    return true;
  } catch { return false; }
}
