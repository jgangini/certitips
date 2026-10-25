/* CertiRSS Web Push only. No fetch interception or offline cache. */
/** Accept only the published RSS reader within this installation's scope. */
function readerURL(value) {
  let url;
  try { url = new URL(value); } catch { return null; }
  const base = new URL(self.registration.scope);
  return url.origin === base.origin && !url.username && !url.password && url.pathname.startsWith(base.pathname)
    && /^\/(?:certitips\/)?(?:es|en|pt|it)\/certirss\/$/.test(url.pathname) ? url : null;
}

/** Wake a suspended app before navigating; recover if the browser restores its start URL. */
async function openReader(target) {
  const base = new URL(self.registration.scope);
  for (const client of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) {
    const current = new URL(client.url);
    if (current.origin !== target.origin || !current.pathname.startsWith(base.pathname)) continue;
    try {
      await client.focus();
      const navigated = await client.navigate(target.href);
      if (navigated) return navigated.focus();
    } catch { /* A stale/suspended window must not swallow the article link. */ }
  }
  const opened = await self.clients.openWindow(target.href);
  if (!opened) return;
  await opened.focus();
  if (opened.url !== target.href) {
    const navigated = await opened.navigate(target.href);
    if (navigated) return navigated.focus();
  }
}
self.addEventListener('push', event => {
  event.waitUntil((async () => {
    let data;
    try { data = event.data.json(); } catch { return; }
    if (!data || !['CertiTips', 'CertiRSS'].includes(data.title) || typeof data.body !== 'string' || data.body.length > 500 || typeof data.tag !== 'string' || data.tag.length > 100) return;
    const url = readerURL(data.url), base = new URL(self.registration.scope);
    if (!url) return;
    await self.registration.showNotification('Activities', { body: data.body, tag: data.tag, icon: new URL('assets/icons/share-logo-square.png', base).href, data: { url: url.href } });
  })());
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = readerURL(event.notification.data?.url);
  if (target) event.waitUntil(openReader(target));
});
