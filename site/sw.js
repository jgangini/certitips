/* CertiRSS Web Push only. No fetch interception or offline cache. */
self.addEventListener('push', event => {
  event.waitUntil((async () => {
    let data;
    try { data = event.data.json(); } catch { return; }
    if (!data || data.title !== 'CertiRSS' || typeof data.body !== 'string' || data.body.length > 500 || typeof data.tag !== 'string' || data.tag.length > 100) return;
    let url;
    try { url = new URL(data.url); } catch { return; }
    const base = new URL(self.registration.scope);
    if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname) || !/^\/(?:certitips\/)?(?:es|en|pt|it)\/certirss\/$/.test(url.pathname)) return;
    await self.registration.showNotification(data.title, { body: data.body, tag: data.tag, icon: new URL('assets/icons/share-logo-square.png', base).href, data: { url: url.href } });
  })());
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const target = new URL(event.notification.data?.url || self.registration.scope), base = new URL(self.registration.scope);
    if (target.origin !== base.origin || !target.pathname.startsWith(base.pathname)) return;
    for (const client of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) {
      if (new URL(client.url).origin === target.origin && new URL(client.url).pathname.startsWith(base.pathname)) {
        await client.navigate(target.href); return client.focus();
      }
    }
    return self.clients.openWindow(target.href);
  })());
});
