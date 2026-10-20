// CertiSearch supplies case context to the existing CertiChat component and session.
let advisor = null, transport;
export const getSearchAdvisor = () => advisor;
export const isSearchPage = (url = globalThis.location?.href) => Boolean(url && /\/certisearch\/$/.test(new URL(url).pathname));
export function setSearchAdvisor(profile, signal) {
  advisor = profile;
  refreshSearchChat();
  signal?.addEventListener('abort', () => {
    if (advisor === profile) { advisor = null; refreshSearchChat(); }
  }, { once: true });
}
export function refreshSearchChat() {
  globalThis.dispatchEvent?.(new Event('certisearch:profile'));
}
export function registerChatTransport(request) { transport = request; }
export function searchRequest(route, body) {
  if (!transport) throw new Error('Conecta el asesor antes de continuar.');
  return transport(`certisearch/${route}`, body);
}
