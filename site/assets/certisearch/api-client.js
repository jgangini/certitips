// CertiSearch supplies case context to the existing CertiChat component and session.
let advisor = null, transport, runtime;
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
export function registerChatTransport(request, connection) { transport = request; runtime = connection; }
/** Accepted work survives a connection failure; inspect/release identifiers without posting another turn. */
export const pendingSearchRun = requestId => runtime?.pending().find(run => run.requestId === requestId);
export const releaseSearchRun = requestId => runtime?.release(requestId);
export function searchRequest(route, body) {
  return sharedChatRequest(`certisearch/${route}`, body);
}
export function sharedChatRequest(route, body, method = 'POST') {
  if (!transport) throw new Error('Conecta el asesor antes de continuar.');
  return transport(route, body, method);
}
export function caseRequest(caseId, body, method = 'PUT') {
  return sharedChatRequest(`runtime/cases/${encodeURIComponent(caseId)}`, body, method);
}
