import { navigateSite } from "../site/navigation.js?v=b3b939609c94";
import { t, locale, language, localizedURL, siteBase } from "../site/i18n.js?v=b3b939609c94";
import { readStored, writeStored } from "../site/storage.js?v=b3b939609c94";
import { normalizeTrace, publishTrace, restoreHistoryTrace, safeSourceURL, sourcePath } from "./trace.js?v=b3b939609c94";
import { installVoiceChatControls } from "./voz/chat.js?v=b3b939609c94";
import { performVoiceAction, voiceContext, voicePageURL } from "./voz/actions.js?v=b3b939609c94";
import { activityTrail, validActivityTrail } from "./activity.js?v=b3b939609c94";
import { getSearchAdvisor, isSearchPage, registerChatTransport } from "../certisearch/api-client.js?v=b3b939609c94";
import { readChatStream } from "./stream.js?v=b3b939609c94";
import { watchChatPresentation } from './presentation.js?v=b3b939609c94';
import { createChatAnnotation, chatAnnotationStyles } from './annotation.js?v=b3b939609c94';
export { safeSourceURL } from "./trace.js?v=b3b939609c94";

const escapeChat = text => String(text).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const responseIdPattern = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

export function chatNavigationAction(text) {
  if (typeof text !== "string") return null;
  const command = text.normalize("NFD").replace(/\p{M}/gu, "").trim().replace(/\s+/g, " ").toLowerCase();
  // ponytail: only complete navigation imperatives; questions and compound requests stay with the tutor.
  const match = /^(?:abre|abrir|abra|open|apri|aprire|navega(?:r)?(?: a| hasta| para)?|navegue(?: a| ate| para)?|navigate to|ir (?:a|para)|ve a|llevame a|go(?: to)?|va para|vai (?:a|al|alla)|naviga (?:a|al|alla)) (?:(?:el|la|o|a|il|the) )?(certitips|certiquiz|certitube|certichat|inicio|home(?: page)?|pagina principal(?: de inicio)?|pagina inicial|pagina iniziale)[.!]?$/.exec(command);
  if (!match) return null;
  return { name: ({ certitips: "catalog", certiquiz: "quiz", certitube: "videos", certichat: "chat" })[match[1]] || "home" };
}

export function configureChatMarkdown(markdown, siteRoot) {
  markdown.set({ html: false, breaks: true });
  const render = markdown.render.bind(markdown);
  // Deep Chat replaces the validator after plugins; enforce it at the render boundary.
  markdown.render = (text, environment) => {
    markdown.inline.validateLink = value => Boolean(safeSourceURL(value, siteRoot));
    return render(text, environment);
  };
  markdown.renderer.rules.image = (tokens, index) => escapeChat(tokens[index].alt || "");
  markdown.renderer.rules.text = (tokens, index) => ["Para profundizar:", "Recursos Relacionados:", t("Para profundizar:"), t("Recursos Relacionados:")].includes(tokens[index].content)
    ? `<span class="chat-resource-heading">${escapeChat(t('Recursos Relacionados:'))}</span>` : escapeChat(tokens[index].content);
  markdown.renderer.rules.link_open = (tokens, index) => {
    const url = safeSourceURL(tokens[index].href, siteRoot);
    const kind = new URL(url).pathname.startsWith(new URL("certitube/", siteRoot).pathname) ? "certitube" : "certitips";
    const end = tokens.findIndex((token, position) => position > index && token.type === "link_close");
    const title = tokens.slice(index + 1, end).map(token => token.content || "").join("");
    return `<a href="${escapeChat(localizedURL(sourcePath(url, siteRoot)))}" data-source-url="${escapeChat(url)}" data-link-kind="${kind}" title="${escapeChat(title)}">`;
  };
  return markdown;
}

export function quotaText(quota, now = Date.now()) {
  const reset = typeof quota?.resetAt === "string" ? Date.parse(quota.resetAt) : NaN;
  if (!Number.isFinite(quota?.remaining) || quota.remaining > 0 || !Number.isFinite(reset)) return "";
  const seconds = Math.max(0, Math.ceil((reset - now) / 1000));
  return t("Tus consultas se renovarán en {time}", {time: [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(value => String(value).padStart(2, "0")).join(":")});
}

export function answerWithReferences(answer, sources, siteRoot) {
  const links = new Map();
  for (const source of Array.isArray(sources) ? sources : []) {
    const url = safeSourceURL(source?.url, siteRoot);
    if (url && typeof source?.title === "string" && source.title.trim() && !links.has(url)) links.set(url, `[${t(source.title).replace(/[\[\]\r\n]/g, " ").slice(0, 200)}](${url})`);
  }
  return links.size ? `${answer}\n\n${t("Recursos Relacionados:")}\n${[...links.values()].slice(0, 8).join("\n")}` : answer;
}

export function answerTextFromBubble(bubble) {
  const visible = bubble.innerText;
  const heading = bubble.querySelector(".chat-resource-heading")?.innerText;
  const boundary = heading ? visible.lastIndexOf(heading) : -1;
  return (boundary >= 0 ? visible.slice(0, boundary) : visible).trim();
}

export function isChatPreview(pageURL, apiURL) {
  const loopback = ["localhost", "127.0.0.1", "[::1]"];
  return loopback.includes(new URL(pageURL).hostname) && !loopback.includes(new URL(apiURL).hostname);
}

export function restoreChat(value, siteRoot, now = Date.now()) {
  const empty = { messages: [], pendingRequest: undefined };
  if (!value || !Number.isFinite(value.updatedAt) || value.updatedAt > now || now - value.updatedAt >= 86400000) return empty;
  // Remove the operational notice stored by the earlier voice preview; retain user text and educational replies.
  const voiceNotice = "El modo voz todavía no está habilitado. Puedes seguir usando el chat.";
  let traceBytes = 0;
  const messages = (Array.isArray(value.messages) ? value.messages : []).filter(item => item && ["user", "ai"].includes(item.role) && typeof item.text === "string" && item.text.trim() && item.text.length <= (item.role === "user" ? 1500 : 12000) && !(item.role === "ai" && [voiceNotice, t(voiceNotice)].includes(item.text))).slice(-100).reverse().map(({ role, text, graphTrace, requestId, rating }) => {
    const trace = role === "ai" && normalizeTrace(graphTrace, siteRoot);
    // ponytail: retain newest graph evidence up to 500 KiB; older answer text remains available.
    return { role, text,
      ...(trace && (traceBytes += JSON.stringify(trace).length * 2) <= 512000 ? { graphTrace: trace } : {}),
      ...(role === "ai" && responseIdPattern.test(requestId) ? { requestId } : {}),
      ...(role === "ai" && [1, -1].includes(rating) ? { rating } : {}) };
  }).reverse();
  const pending = value.pendingRequest;
  const contextIds = pending?.contextIds;
  const validContext = contextIds === undefined || Array.isArray(contextIds) && contextIds.length <= 2 && contextIds.every(id => typeof id === "string" && id.length <= 200 && /^[\w.-]+\/[\w.-]+#[\w./-]+$/.test(id));
  const validTrail = pending?.activityTrail === undefined || validActivityTrail(pending.activityTrail, siteRoot);
  const pendingRequest = validContext && validTrail && pending && typeof pending.requestId === "string" && /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(pending.requestId) && typeof pending.message === "string" && pending.message.trim() && pending.message.length <= 1500 && safeSourceURL(pending.pageUrl, siteRoot) ? { requestId: pending.requestId, message: pending.message, pageUrl: pending.pageUrl, ...(contextIds === undefined ? {} : { contextIds }), ...(pending.activityTrail === undefined ? {} : { activityTrail: pending.activityTrail }), ...(pending.locale === undefined ? {} : { locale: ['es', 'en', 'pt', 'it'].includes(pending.locale) ? pending.locale : 'es' }) } : undefined;
  return { messages, pendingRequest };
}

const root = typeof document === "undefined" ? null : document.querySelector("[data-certichat]");
if (root) {
  const panel = root.querySelector("#certichat-panel"), launcher = root.querySelector("[data-chat-open]");
  let dock = document.querySelector("[data-explorer-chat-slot]");
  if (dock) {
    dock.append(root);
    panel.setAttribute("role", "region");
    root.querySelector("[data-chat-close]").hidden = false;
    root.querySelector('.certichat-actions a').hidden = true;
  }
  const viewer = document.querySelector("#diagram-viewer"), homeParent = document.body;
  let presenting = false, launcherVoiceState = {};
  const mobileChat = matchMedia("(max-width: 800px)");
  let launcherContent = document.querySelector(".tube-detail, [data-group-carousel]") || document.querySelector(".course-page .course-main");
  // Move the same instance between its dock and local icon control, preserving chat/case state.
  function positionDockLauncher() {
    launcher.setAttribute('aria-label', 'CertiChat'); launcher.title = 'CertiChat';
    const controls = document.querySelector(isSearchPage() ? '.search-toolbar' : '.graph-pilot-viewport .chat-graph-toolbar');
    const compact = panel.hidden || !isSearchPage() && panel.dataset.voiceMode === "true";
    const parent = compact && controls ? controls : dock;
    if (root.parentNode !== parent) parent.insertBefore(root, parent === controls ? controls.querySelector('[data-pilot-active-fit]') : null);
  }
  function positionLauncher() {
    if (dock) return positionDockLauncher();
    if (presenting || !launcherContent || !panel.hidden) return;
    const content = launcherContent.querySelector(".path-section.is-active, .tube-player") || launcherContent;
    const box = launcherContent.getBoundingClientRect(), gap = parseFloat(getComputedStyle(root).getPropertyValue("--layout-gap"));
    const beside = !mobileChat.matches && box.right + launcher.offsetWidth + 20 + gap <= document.documentElement.clientWidth;
    root.classList.toggle("is-beside-content", beside);
    const navigation = content.querySelector(".page-navigation a:last-of-type")?.getBoundingClientRect();
    const last = navigation || content.getBoundingClientRect();
    const headerBottom = document.querySelector(".site-header").getBoundingClientRect().bottom;
    if (beside && (navigation || content.matches(".tube-player")) && last.bottom > headerBottom && last.top < innerHeight) {
      const origin = root.getBoundingClientRect();
      const target = last.bottom - launcher.offsetHeight / 2;
      const center = Math.max(headerBottom + 20 + launcher.offsetHeight / 2, target);
      launcher.style.top = `${Math.min(0, center - (origin.top + origin.bottom) / 2)}px`;
    } else launcher.style.removeProperty("top");
  }
  let launcherFrame;
  const scheduleLauncher = () => { if (!launcherFrame) launcherFrame = requestAnimationFrame(() => { launcherFrame = 0; positionLauncher(); }); };
  addEventListener("scroll", scheduleLauncher, { passive: true }); addEventListener("resize", scheduleLauncher);
  mobileChat.addEventListener("change", scheduleLauncher);
  const launcherSize = new ResizeObserver(scheduleLauncher);
  function observeLauncher() {
    launcherSize.disconnect();
    launcherContent = document.querySelector(".tube-detail, [data-group-carousel]") || document.querySelector(".course-page .course-main");
    if (launcherContent) launcherSize.observe(launcherContent);
    const footer = document.querySelector(".site-footer"); if (footer) launcherSize.observe(footer);
    root.classList.remove("is-beside-content"); launcher.style.removeProperty("top"); scheduleLauncher();
  }
  observeLauncher();
  function fitMobileViewport() {
    const viewport = window.visualViewport;
    // ponytail: track the keyboard viewport, while preserving deliberate pinch zoom.
    if (presenting || dock || panel.hidden || !mobileChat.matches || !viewport || viewport.scale !== 1) return;
    for (const [name, value] of Object.entries({ top: viewport.offsetTop, left: viewport.offsetLeft, width: viewport.width, height: viewport.height })) panel.style.setProperty(`--chat-${name}`, `${value}px`);
  }
  window.visualViewport?.addEventListener("resize", fitMobileViewport);
  window.visualViewport?.addEventListener("scroll", fitMobileViewport);
  mobileChat.addEventListener("change", fitMobileViewport);
  const verification = root.querySelector("[data-chat-verification]");
  const messages = root.querySelector("[data-chat-messages]"), connecting = document.createElement("div");
  connecting.className = "certichat-connecting";
  connecting.hidden = true;
  connecting.setAttribute("role", "status");
  connecting.setAttribute("aria-label", t("Conectando con el asistente"));
  connecting.innerHTML = '<span class="certichat-spinner" aria-hidden="true"></span>';
  panel.append(connecting);
  const clear = root.querySelector("[data-chat-clear]"), retry = root.querySelector("[data-chat-retry]");
  const confirmation = root.querySelector("[data-chat-confirm]"), confirmClear = confirmation.querySelector("[data-chat-confirm-yes]"), cancelClear = confirmation.querySelector("[data-chat-confirm-no]");
  const clearError = root.querySelector("[data-chat-clear-error]"), closeClearError = root.querySelector("[data-chat-clear-error-close]");
  const storageKey = `certichat:${root.dataset.siteRoot}`;
  let openPreference = null;
  try { openPreference = sessionStorage.getItem(`${storageKey}:open`); } catch { /* Keep the current document preference without storage. */ }
  /** Preserve an explicit close across navigation; automatic layout closes remain temporary. */
  function rememberOpen(value) {
    openPreference = value;
    try {
      if (value === null) sessionStorage.removeItem(`${storageKey}:open`);
      else sessionStorage.setItem(`${storageKey}:open`, value);
    } catch { /* The live instance still retains the choice. */ }
  }
  const quizLockKey = "certitips:certiquiz:active-player";
  const quizApi = root.dataset.quizApi;
  function readQuizLock() {
    try {
      const value = localStorage.getItem(quizLockKey);
      if (!value) return null;
      const match = /^(\d{6}):(\d{13})$/.exec(value);
      const now = Date.now();
      if (match && Number(match[2]) > now && Number(match[2]) <= now + 8 * 60 * 60 * 1000) return match[1];
      localStorage.removeItem(quizLockKey);
    } catch { /* The chat remains usable when browser storage is unavailable. */ }
    return null;
  }
  let quizCode = readQuizLock();
  if (quizCode) root.hidden = true;
  const saved = restoreChat(readStored(storageKey, null), root.dataset.siteRoot);
  restoreHistoryTrace(root.dataset.siteRoot, saved.messages);
  const preview = isChatPreview(location.href, root.dataset.api);
  let chat, presentation, opening, verifying = false, verified = false, available = false, busy = false, voiceBusy = false, turnstileId, turnstileLoad, refreshVoice = () => {};
  addEventListener("pagehide", () => {
    presentation?.cancel(); presentation = undefined;
    if (dock && !textNavigating && !referenceNavigation) {
      if (openPreference !== "false") rememberOpen(null);
      try { sessionStorage.removeItem(`${storageKey}:reference`); } catch { /* Navigation also works without session storage. */ }
    }
    const scroller = chat?.shadowRoot?.querySelector("#messages");
    if (scroller && !panel.hidden) {
      try { sessionStorage.setItem(`${storageKey}:scroll`, String(scroller.scrollTop)); } catch { /* Reading position is optional. */ }
    }
  });
  let pendingRequest = saved.pendingRequest, accessError = "", completedRequest, completedTrace, quota, textNavigation, textNavigating = false, referenceNavigation;
  const responseTraces = saved.messages.filter(message => message.role === "ai").map(message => message.graphTrace);
  const responseRequests = saved.messages.filter(message => message.role === "ai").map(message => message.requestId);
  const responseRatings = saved.messages.filter(message => message.role === "ai").map(message => message.rating || 0);
  let displayedAdvisor = null, displayedSearch = isSearchPage(), profileRefreshPending = false;
  const annotation = createChatAnnotation(() => getSearchAdvisor()?.clearSelection(), () => chat?.focusInput(), () => getSearchAdvisor()?.editAnnotation());
  function syncAnnotation() {
    annotation.sync(isSearchPage() ? getSearchAdvisor()?.annotation : null, chat?.shadowRoot?.querySelector('#text-input-container'));
  }
  window.addEventListener('certisearch:selection', syncAnnotation);
  function syncAdvisor(force = false) {
    syncAnnotation();
    if (!chat) return;
    const advisor = getSearchAdvisor();
    if (!force && advisor === displayedAdvisor && displayedSearch === isSearchPage()) return;
    if (busy) { profileRefreshPending = true; return; }
    const study = restoreChat(readStored(storageKey, null), root.dataset.siteRoot);
    const history = advisor?.history || (isSearchPage() ? [] : study.messages);
    // Deep Chat defers history rendering; clear the previous profile synchronously.
    if (advisor !== displayedAdvisor || displayedSearch !== isSearchPage()) chat.clearMessages(false);
    displayedAdvisor = advisor;
    displayedSearch = isSearchPage();
    responseTraces.splice(0, responseTraces.length, ...history.filter(item => item.role === "ai").map(item => item.graphTrace));
    responseRequests.splice(0, responseRequests.length, ...history.filter(item => item.role === "ai").map(item => item.requestId));
    responseRatings.splice(0, responseRatings.length, ...history.filter(item => item.role === "ai").map(item => item.rating || 0));
    chat.introMessage = isSearchPage() ? undefined : { text: t("Hola. Resuelve tus dudas sobre las guías y prácticas del sitio.") };
    chat.history = history.map(({ role, text }) => ({ role, text }));
    restoreHistoryTrace(root.dataset.siteRoot, history);
    profileRefreshPending = false;
  }
  window.addEventListener("certisearch:profile", () => syncAdvisor(true));
  registerChatTransport(async (route, body) => {
    if (opening) await opening;
    if (preview) throw new Error(t("Esta vista previa no admite consultas."));
    if (!verified || !available) throw new Error(accessError || t("Verifica tu acceso para continuar."));
    const result = await api(route, body);
    if (result.quota) updateQuota(result.quota);
    return result;
  });
  const responseSelector = ".outer-message-container:not(.deep-chat-intro) .ai-message:not(.deep-chat-loading-message-bubble)";
  const quotaNotice = document.createElement("div");
  quotaNotice.id = "certichat-quota"; quotaNotice.setAttribute("role", "status");
  quotaNotice.hidden = true;
  let quotaRefresh, quotaRefreshAfter = 0;
  function updateQuota(value = quota) {
    const changed = value !== quota;
    quota = value;
    if (changed) window.dispatchEvent(new CustomEvent("certichat:quota", { detail: { quota } }));
    quotaNotice.textContent = quotaText(quota);
    quotaNotice.hidden = !quotaNotice.textContent;
    if (!preview && !quotaNotice.hidden && Date.parse(quota.resetAt) <= Date.now() && !quotaRefresh && Date.now() >= quotaRefreshAfter) {
      const requestedQuota = quota;
      // ponytail: one session check at expiry; keep the last quota until the server confirms renewal.
      quotaRefresh = api("session", undefined, "GET").then(session => {
        if (!Number.isFinite(session.quota?.remaining) || session.quota.remaining <= 0 && !Number.isFinite(Date.parse(session.quota.resetAt))) throw new Error("Quota unavailable");
        quotaRefreshAfter = Date.now() + 30000;
        if (quota === requestedQuota) updateAccess(session);
      }).catch(() => { quotaRefreshAfter = Date.now() + 5000; }).finally(() => { quotaRefresh = undefined; });
    }
    const input = chat?.shadowRoot.querySelector('[role="textbox"]');
    if (!input) return;
    const exhausted = !quotaNotice.hidden;
    // ponytail: update the native textbox; changing textInput would recreate the ongoing conversation.
    input.contentEditable = String(!exhausted);
    input.setAttribute("aria-disabled", String(exhausted));
    input.classList.toggle("text-input-disabled", exhausted);
    chat.disableSubmitButton(exhausted || voiceBusy);
    refreshVoice(busy);
  }
  setInterval(() => updateQuota(), 1000);

  function persist() {
    if (getSearchAdvisor() || isSearchPage() || displayedAdvisor || displayedSearch) return;
    // Deep Chat's simulated stream drops custom metadata; keep evidence aligned by response position.
    let index = 0;
    const messages = chat.getMessages().map(message => message.role === "ai" ? { ...message, graphTrace: responseTraces[index], requestId: responseRequests[index], rating: responseRatings[index++] || undefined } : message);
    writeStored(storageKey, { updatedAt: Date.now(), ...restoreChat({ updatedAt: Date.now(), messages, pendingRequest }, root.dataset.siteRoot) });
  }

  // Las fuentes validadas del chat y del grafo conservan la conversación al abrir una guía.
  // Cualquier otro enlace restablece la intención: salir por el encabezado sigue cerrando el dock.
  document.addEventListener("click", event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const nodes = event.composedPath(), link = nodes.find(node => node.tagName === "A");
    if (!link) return;
    const source = nodes.some(node => node === chat || node.matches?.("[data-graph-pilot]")) && safeSourceURL(link.dataset.sourceUrl, root.dataset.siteRoot);
    referenceNavigation = source && openPreference !== "false" ? link.href : undefined;
    if (!referenceNavigation) return;
    rememberOpen("true");
    try { sessionStorage.setItem(`${storageKey}:reference`, referenceNavigation); } catch { /* La navegación sigue disponible sin almacenamiento. */ }
  });

  async function finishTextNavigation() {
    const pending = textNavigation;
    if (!pending?.ready || !pending.approved || busy) return;
    textNavigation = undefined;
    const result = pending.navigation ? pending : await performVoiceAction(pending.action);
    if (!result.navigation) return;
    persist();
    if (openPreference !== "false") {
      rememberOpen("true");
      try { sessionStorage.setItem(`${storageKey}:reference`, result.navigation); } catch { /* Navigation also works without storage. */ }
    }
    textNavigating = true;
    try { if (!await navigateSite(result.navigation, { source: "text" })) location.assign(result.navigation); }
    catch { setStatus(t("Sin conexión. Vuelve a intentarlo."), true); }
    finally { textNavigating = false; }
  }
  window.addEventListener("certivoice:state", event => { if (event.detail?.active) textNavigation = undefined; });
  window.addEventListener("certivoice:practice-followup", event => {
    if (!textNavigation || textNavigation.action.name !== event.detail?.action?.name) return;
    textNavigation.approved = true;
    finishTextNavigation();
  });

  function focusResponse(event) {
    const hovering = event.type.startsWith("pointer");
    if (!dock || isSearchPage() || busy || (!hovering && event.target.closest?.("a"))) return;
    if (hovering && event.pointerType === "touch") return;
    if (event.type === "keydown" && (!["Enter", " "].includes(event.key) || event.repeat)) return;
    const bubble = hovering ? event.target : event.target.closest?.(responseSelector);
    if (!bubble?.matches?.(responseSelector) || bubble.classList.contains("streamed-message")) return;
    if (event.type === "keydown") event.preventDefault();
    const index = [...chat.shadowRoot.querySelectorAll(responseSelector)].indexOf(bubble);
    const trace = event.type === "pointerleave" ? null : responseTraces[index];
    window.dispatchEvent(new CustomEvent(hovering ? "certichat:hover" : "certichat:focus", { detail: trace || null }));
  }

  async function copyResponse(button, bubble) {
    const answer = answerTextFromBubble(bubble);
    if (!answer) return;
    try {
      await navigator.clipboard.writeText(answer);
      button.dataset.copied = "true"; button.setAttribute("aria-label", t("Respuesta copiada"));
      setTimeout(() => { button.dataset.copied = "false"; button.setAttribute("aria-label", t("Copiar respuesta")); }, 1800);
    } catch { button.setAttribute("aria-label", t("No se pudo copiar la respuesta")); }
  }

  async function rateResponse(button, toolbar, index) {
    const requestId = responseRequests[index];
    if (!requestId || button.disabled) return;
    const value = button.dataset.action === "up" ? 1 : -1;
    const next = responseRatings[index] === value ? 0 : value;
    const buttons = toolbar.querySelectorAll("button[data-action]:not([data-action=copy])");
    buttons.forEach(item => { item.disabled = true; });
    try {
      await api("feedback", { requestId, rating: next });
      responseRatings[index] = next;
      toolbar.dataset.rating = String(next);
      buttons.forEach(item => item.setAttribute("aria-pressed", String(next === (item.dataset.action === "up" ? 1 : -1))));
      persist();
    } catch { button.setAttribute("title", t("No se pudo guardar tu valoración.")); }
    finally { buttons.forEach(item => { item.disabled = false; }); }
  }

  function responseToolbar(index) {
    const toolbar = document.createElement("div");
    toolbar.className = "certichat-feedback";
    toolbar.dataset.rating = String(responseRatings[index]);
    for (const [action, label] of [["copy", t("Copiar respuesta")], ["up", t("Respuesta útil")], ["down", t("Respuesta no útil")]]) {
      if (action !== "copy" && !responseRequests[index]) continue;
      const button = document.createElement("button"), icon = document.createElement("span");
      button.type = "button"; button.dataset.action = action; button.setAttribute("aria-label", label);
      if (action !== "copy") button.setAttribute("aria-pressed", String(responseRatings[index] === (action === "up" ? 1 : -1)));
      icon.className = `certichat-feedback-icon certichat-feedback-${action}`; icon.setAttribute("aria-hidden", "true");
      button.append(icon); toolbar.append(button);
    }
    return toolbar;
  }

  function bindResponse(bubble) {
    // Non-bubbling pointer events need a listener on the real bubble inside Deep Chat's shadow root.
    bubble.tabIndex = dock && !isSearchPage() ? 0 : -1; bubble.onpointerenter = focusResponse; bubble.onpointerleave = focusResponse;
    if (bubble.classList.contains("streamed-message") || bubble.dataset.feedbackBound) return;
    const index = [...chat.shadowRoot.querySelectorAll(responseSelector)].indexOf(bubble);
    const toolbar = responseToolbar(index);
    toolbar.addEventListener("click", event => {
      const button = event.target.closest?.("button[data-action]");
      if (!button) return;
      event.stopPropagation();
      if (button.dataset.action === "copy") void copyResponse(button, bubble);
      else void rateResponse(button, toolbar, index);
    });
    toolbar.addEventListener("keydown", event => event.stopPropagation());
    // Deep Chat lays siblings out in a row; the targeted column style keeps actions below the bubble.
    bubble.after(toolbar);
    bubble.dataset.feedbackBound = "true";
  }

  function setStatus(message, error = false) {
    accessError = error ? message : "";
    retry.hidden = preview || !error;
  }

  function apiError(status, code, seconds = 0, detail, search = false) {
    const error = new Error(status === 429 ? seconds ? t("Se alcanzó un límite de uso. Vuelve a intentarlo en {seconds} segundos.", {seconds: Math.ceil(seconds)}) : t("Se alcanzó un límite de uso. Inténtalo más tarde.") : status === 401 || status === 403 ? t("Verifica tu acceso para continuar.") : t("El servicio no está disponible en este momento. Vuelve a intentarlo más tarde."));
    if (search && typeof detail === "string") error.message = t(detail);
    error.status = status; error.code = code;
    if (status === 409) error.message = ["request_failed", "request_expired"].includes(code) ? t("La consulta anterior no tiene un resultado disponible. Puedes enviarla nuevamente.") : t("Esta consulta ya fue recibida. Espera unos segundos antes de intentar recuperar su resultado.");
    return error;
  }

  async function api(route, body, method = "POST") {
    const pilot = route === "chat" && document.querySelector('[data-graph-pilot]');
    const canceled = new AbortController();
    const leave = () => { if (!pilot?.isConnected) canceled.abort(); };
    const hide = () => canceled.abort();
    if (pilot) { window.addEventListener('site:page', leave); window.addEventListener('pagehide', hide); }
    let response, data, progressSeq = -1;
    try {
      response = await fetch(`${root.dataset.api}/api/${route}`, {
        method, credentials: "include", headers: { "X-CertiChat": "1", ...(body === undefined ? {} : { "Content-Type": "application/json" }), ...(pilot ? { Accept: 'text/event-stream' } : {}) },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }), signal: AbortSignal.any([canceled.signal, AbortSignal.timeout(route === "certisearch/image" ? 200000 : route.startsWith("certisearch/") ? 140000 : 55000)]),
      });
      data = response.status === 204 ? {} : response.ok && pilot ? await readChatStream(response, body.requestId, detail => {
        progressSeq = detail.seq;
        window.dispatchEvent(new CustomEvent('certichat:progress', { detail }));
      }) : await response.json();
    } catch (error) {
      if (pilot) window.dispatchEvent(new CustomEvent('certichat:progress', { detail: { type: 'error', requestId: body.requestId, seq: progressSeq + 1, transport: true } }));
      if (error.status) throw apiError(error.status, error.code, error.retryAfter);
      throw error;
    } finally {
      window.removeEventListener('site:page', leave); window.removeEventListener('pagehide', hide);
    }
    if (!response.ok) {
      const seconds = Number(response.headers.get("Retry-After")) || 0;
      throw apiError(response.status, data.code, seconds, data.detail, route.startsWith("certisearch/"));
    }
    return data;
  }

  function updateAccess(session, publish = true) {
    verified = Boolean(session.authenticated && !session.verificationRequired);
    available = session.available !== false;
    updateQuota(session.quota);
    setStatus(session.available === false ? t("El servicio está actualizando su contenido o alcanzó su límite de uso. Inténtalo más tarde.") : "", session.available === false);
    clear.disabled = busy || voiceBusy;
    if (publish) window.dispatchEvent(new CustomEvent("certichat:session", { detail: session }));
  }

  async function verify() {
    verified = false;
    if (!root.dataset.siteKey) {
      setStatus(t("La verificación de acceso no está disponible. Inténtalo más tarde."), true);
      return;
    }
    setStatus("");
    if (!turnstileLoad) turnstileLoad = new Promise((resolve, reject) => {
      if (window.turnstile) return resolve();
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = resolve;
      script.onerror = () => { script.remove(); turnstileLoad = undefined; reject(new Error(t("No se pudo cargar la verificación. Revisa tu conexión y vuelve a intentarlo."))); };
      document.head.append(script);
    });
    await turnstileLoad;
    if (turnstileId !== undefined) window.turnstile.remove(turnstileId);
    turnstileId = window.turnstile.render(verification, {
      sitekey: root.dataset.siteKey, action: "certichat_session", theme: "auto", size: "flexible",
      callback: async token => {
        if (verifying) return;
        verifying = true;
        try {
          await api("session", { turnstileToken: token });
          const session = await api("session", undefined, "GET");
          if (!session.authenticated) throw new Error("Tu navegador bloquea la cookie de acceso. Permite las cookies del asistente para continuar.");
          updateAccess(session);
          window.turnstile.remove(turnstileId); turnstileId = undefined;
          if (!panel.hidden) chat.focusInput();
        } catch (error) { setStatus(error.message, true); }
        finally { verifying = false; }
      },
      "expired-callback": () => { verified = false; setStatus(t("La verificación caducó. Pulsa Reintentar conexión."), true); },
      "error-callback": () => { setStatus(t("No se pudo verificar el acceso. Pulsa Reintentar conexión."), true); },
    });
  }

  async function initialize() {
    if (!chat) {
      await import("../deep-chat.js?v=b3b939609c94");
      window.remarkable_plugins = [{ plugin: markdown => configureChatMarkdown(markdown, root.dataset.siteRoot) }];
      chat = document.createElement("deep-chat");
      chat.chatStyle = { border: "none", width: "100%", height: "100%", backgroundColor: "var(--paper)", color: "var(--ink)", fontFamily: "inherit" };
      // Match the voice controls reservation: Deep Chat reapplies this style on every keystroke.
      chat.textInput = {
        characterLimit: 1500, placeholder: { text: t("Escribe tu consulta"), style: { color: "var(--muted)" } },
        styles: {
          container: { width: "100%", boxSizing: "border-box", margin: "0", backgroundColor: "var(--paper)", border: "unset", borderTop: "1px solid var(--line)", borderRadius: "0", boxShadow: "unset" },
          text: { color: "var(--ink)", fontSize: "16px", paddingTop: "11px", paddingBottom: "13px", paddingLeft: "12px", paddingRight: "56px" },
        },
      };
      chat.submitButtonStyles = { submit: { container: { default: { display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", boxSizing: "border-box", margin: "0", insetInlineEnd: "8px", insetBlockEnd: "4px", borderRadius: "0", backgroundColor: "transparent" } } } };
      chat.messageStyles = { default: { shared: { bubble: { maxWidth: "92%", fontSize: "14px", lineHeight: "1.45" } }, ai: { bubble: { backgroundColor: "var(--hover)", color: "var(--ink)" } }, user: { bubble: { backgroundColor: "var(--accent)", color: "var(--on-red)" } } } };
      chat.messageStyles.loading = { message: { styles: { bubble: { backgroundColor: "var(--hover)", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", width: "56px", height: "36px", padding: "0", boxSizing: "border-box" } } } };
      chat.remarkable = { html: false, applyHTML: false };
      chat.auxiliaryStyle = "* { overflow-wrap: anywhere; } #messages, #text-input { scrollbar-color: var(--scrollbar) transparent; scrollbar-width: thin; } #chat-view { grid-template-rows: minmax(0, 1fr) auto auto; } #certichat-quota { justify-self: center; max-width: calc(100% - 24px); box-sizing: border-box; margin: 8px 12px; padding: 4px 8px; border: 1px solid var(--line); border-radius: 4px; background: var(--chrome-bg); color: var(--muted); text-align: center; font-size: .68rem; font-variant-numeric: tabular-nums; line-height: 1.4; } #certichat-quota[hidden] { display: none; } a { color: var(--blue); text-decoration: underline; } a:focus-visible { outline: 2px solid var(--red); outline-offset: 2px; } @media(prefers-reduced-motion:reduce) { *,*::before,*::after { animation:none!important; transition:none!important; scroll-behavior:auto!important; } }";
      // ponytail: the native completion class also covers restored history; no extra render pass or observers.
      // ponytail: override the native disabled filter on hover; the submission guard stays unchanged.
      chat.auxiliaryStyle += `.outer-message-container:last-child { margin-bottom: 10px; }
        ${chatAnnotationStyles}
        #input .input-button.inside-end:not(.custom-button) { display: flex; background: transparent !important; }
        #submit-icon { width: 24px; height: 24px; }
        #stop-icon { position: static; }
        #input .input-button:is(:hover, :focus-visible) #submit-icon { color: var(--red) !important; filter: none !important; }
        .ai-message :is(p, ol, ul) { margin-block: .5em; }
        .ai-message > :first-child { margin-top: 0; }
        .ai-message > :last-child { margin-bottom: 0; }
        .ai-message :is(ol, ul) { padding-inline-start: 1.6em; }
        .chat-resource-heading { color: var(--red); font-size: .75em; font-weight: 750; letter-spacing: 1px; text-transform: uppercase; }
        .ai-message:not(.streamed-message) a { display: inline-block; max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; vertical-align: bottom; color: var(--ink); }
        .ai-message:not(.streamed-message) a:hover { color: var(--red); }
        .ai-message:not(.streamed-message) a::before { content: ""; display: inline-block; width: 16px; height: 16px; margin-right: 6px; vertical-align: -3px; background-color: currentColor; mask: url("${new URL("../icons/resource-link.svg", import.meta.url).href}") center / contain no-repeat; }
        .ai-message:not(.streamed-message) a[data-link-kind="certitips"]::before { mask-image: url("${new URL("../icons/certitips-course.svg", import.meta.url).href}"); }
        .ai-message:not(.streamed-message) a[data-link-kind="certitube"]::before { mask-image: url("${new URL("../icons/certitube.svg", import.meta.url).href}"); }`;
      chat.auxiliaryStyle += `.inner-message-container:has(> .certichat-feedback) { flex-direction: column; align-items: flex-start; }
        .outer-message-container:has(.certichat-feedback) { margin-bottom: 0; }
        .outer-message-container:has(.certichat-feedback) + .outer-message-container { margin-top: 0; }
        .outer-message-container:has(.certichat-feedback) + .outer-message-container .message-bubble { margin-top: 6px; }
        .certichat-feedback { display: flex; gap: 2px; margin: 4px 0 0; transition: opacity 160ms ease; }
        @media (hover: hover) and (pointer: fine) {
          .certichat-feedback { opacity: 0; }
          .certichat-feedback:is(:hover, :focus-within) { opacity: 1; }
        }
        .certichat-feedback button { display: inline-grid; place-items: center; width: 24px; height: 24px; padding: 5px; border: 0; border-radius: 5px; background: transparent; color: var(--muted); cursor: pointer; }
        .certichat-feedback button:hover, .certichat-feedback button:focus-visible,
        .certichat-feedback button[aria-pressed="true"], .certichat-feedback button[data-copied="true"] { color: var(--ink); }
        .certichat-feedback button:focus-visible { outline: 2px solid var(--muted); outline-offset: 1px; }
        .certichat-feedback[data-rating="1"] [data-action="down"],
        .certichat-feedback[data-rating="-1"] [data-action="up"] { display: none; }
        .certichat-feedback button:disabled { cursor: wait; opacity: .65; }
        .certichat-feedback-icon { display: block; width: 14px; height: 14px; background-color: currentColor; mask: center / contain no-repeat; }
        .certichat-feedback-copy { mask-image: url("${new URL("../icons/lucide-copy.svg", import.meta.url).href}"); }
        .certichat-feedback-up { mask-image: url("${new URL("../icons/lucide-thumbs-up.svg", import.meta.url).href}"); }
        .certichat-feedback-down { mask-image: url("${new URL("../icons/lucide-thumbs-down.svg", import.meta.url).href}"); }`;
      chat.auxiliaryStyle += `:host([data-graph-dock="true"]) ${responseSelector}:not(.streamed-message) { border: 1px solid transparent; cursor: pointer; } :host([data-graph-dock="true"]) ${responseSelector}:not(.streamed-message):hover { border-color: var(--red); } :host([data-graph-dock="true"]) ${responseSelector}:focus-visible { outline: 2px solid var(--red); outline-offset: 2px; }`;
      chat.dataset.graphDock = String(Boolean(dock) && !isSearchPage());
      refreshVoice = installVoiceChatControls(chat);
      chat.onInput = () => refreshVoice(busy);
      displayedAdvisor = getSearchAdvisor();
      displayedSearch = isSearchPage();
      chat.introMessage = isSearchPage() ? undefined : { text: t("Hola. Resuelve tus dudas sobre las guías y prácticas del sitio.") };
      chat.history = (displayedAdvisor?.history || (isSearchPage() ? [] : saved.messages)).map(({ role, text }) => ({ role, text }));
      chat.onMessage = ({ isHistory, message }) => {
        if (isHistory) return;
        if (message.role === "ai") {
          presentation?.finish(); presentation = undefined;
          responseTraces.push(completedTrace); completedTrace = undefined;
          responseRequests.push(completedRequest); responseRatings.push(0);
          chat.shadowRoot.querySelectorAll(responseSelector).forEach(bindResponse);
          if (pendingRequest?.requestId === completedRequest) pendingRequest = undefined;
          completedRequest = undefined;
          busy = false; clear.disabled = false;
          chat.shadowRoot.querySelector('.input-button.inside-end:not(.custom-button)')?.setAttribute("aria-label", t("Enviar consulta"));
          refreshVoice(busy);
          if (profileRefreshPending) queueMicrotask(() => syncAdvisor(true));
        }
        persist();
        finishTextNavigation();
      };
      chat.errorMessages = { displayServiceErrorMessages: true };
      chat.requestBodyLimits = { maxMessages: 1 };
      chat.validateInput = text => !busy && !voiceBusy && (!isSearchPage() || Boolean(getSearchAdvisor())) && !quotaText(quota) && Boolean(text?.trim()) && text.length <= 1500;
      const composerSize = viewer && new ResizeObserver(entries => {
        for (const entry of entries) {
          const element = entry.target === chat ? chat.shadowRoot.querySelector("#text-input-container") : entry.target;
          const height = element?.getBoundingClientRect().height;
          if (height) viewer.style.setProperty(element.classList.contains("certichat-heading") ? "--presentation-heading-height" : "--presentation-composer-height", `${height}px`);
        }
      });
      chat.onComponentRender = () => {
        syncAnnotation();
        const composer = chat.shadowRoot.querySelector("#text-input-container");
        if (composerSize) { composerSize.disconnect(); composerSize.observe(chat); if (composer) composerSize.observe(composer); composerSize.observe(root.querySelector(".certichat-heading")); }
        chat.shadowRoot.querySelector("#input")?.before(quotaNotice);
        const input = chat.shadowRoot.querySelector('[role="textbox"]');
        input?.setAttribute("aria-label", t("Escribe tu consulta"));
        input?.setAttribute("enterkeyhint", "send");
        chat.shadowRoot.querySelector('.input-button.inside-end:not(.custom-button)')?.setAttribute("aria-label", t("Enviar consulta"));
        {
          chat.shadowRoot.addEventListener("click", focusResponse);
          chat.shadowRoot.addEventListener("keydown", focusResponse);
          chat.shadowRoot.querySelectorAll(responseSelector).forEach(bindResponse);
        }
        updateQuota();
        clear.disabled = busy;
      };
      chat.addEventListener("keydown", event => {
        const input = event.composedPath()[0];
        if (input.getAttribute?.("role") !== "textbox" || event.key !== "Enter" || event.shiftKey || event.ctrlKey || event.altKey || event.metaKey || event.isComposing) return;
        event.preventDefault(); event.stopImmediatePropagation();
        if (chat.validateInput(input.innerText)) chat.submitUserMessage({ text: input.innerText });
      }, { capture: true });
      chat.addEventListener("input", event => {
        if (event.composedPath()[0]?.getAttribute?.("role") === "textbox") window.dispatchEvent(new CustomEvent("certichat:activity"));
      });
      chat.addEventListener("click", event => {
        if (event.composedPath().some(node => node.id === 'stop-icon' || node.classList?.contains('input-button') && node.querySelector('#stop-icon'))) window.dispatchEvent(new CustomEvent('certichat:stop'));
      }, { capture: true });
      // ponytail: reveal the validated answer progressively; raw model tokens cannot bypass source validation.
      chat.connect = { stream: matchMedia("(prefers-reduced-motion: reduce)").matches ? undefined : { simulation: 6 }, handler: async (body, signals) => {
        presentation?.cancel(); presentation = undefined;
        window.dispatchEvent(new CustomEvent("certichat:activity"));
        busy = true; clear.disabled = true;
        refreshVoice(busy);
        completedTrace = undefined;
        completedRequest = undefined;
        publishTrace(root.dataset.siteRoot, "loading");
        let answer, localNavigation;
        const requestedAdvisor = getSearchAdvisor(), requestedSearch = isSearchPage();
        textNavigation = undefined;
        try {
          const message = body.messages?.at(-1)?.text?.trim() || "";
          const action = chatNavigationAction(message);
          if (requestedSearch) {
            if (!requestedAdvisor) throw new Error(t("Cargando el banco de preguntas…"));
            const result = await requestedAdvisor.send(message);
            answer = result.answer; completedRequest = result.requestId; updateQuota(result.quota); setStatus("");
          } else if (action) {
            const previous = document.querySelector('#quiz dialog.confirmation[open]');
            const result = await performVoiceAction(action);
            answer = result.error || result.confirmation || t("Abriendo la página…");
            const dialog = document.querySelector('#quiz dialog.confirmation[open][data-finish-confirm]');
            if (result.navigation || (dialog && dialog !== previous)) {
              textNavigation = localNavigation = { action, navigation: result.navigation, approved: Boolean(result.navigation), ready: false };
              dialog?.addEventListener("close", () => { if (dialog.returnValue !== "finish" && textNavigation === localNavigation) textNavigation = undefined; }, { once: true });
            }
            publishTrace(root.dataset.siteRoot, "idle");
          } else if (!verified || !available) {
            answer = accessError || (available ? t("Completa la verificación de acceso para enviar tu consulta.") : t("El servicio no está disponible. Pulsa Reintentar conexión."));
            setStatus(answer, true);
            publishTrace(root.dataset.siteRoot, "error");
          } else {
            setStatus("");
            // A transport retry reuses the UUID; the server deduplicates any paid generation.
            if (pendingRequest?.message !== message) {
              const context = voiceContext(document);
              pendingRequest = { requestId: crypto.randomUUID(), message, pageUrl: voicePageURL(document), locale, contextIds: [context.diagramId, context.sectionId].filter(Boolean), activityTrail: activityTrail() };
            }
            persist();
            const result = await api("chat", pendingRequest);
            completedRequest = pendingRequest.requestId;
            completedTrace = normalizeTrace(result.graphTrace, root.dataset.siteRoot);
            answer = answerWithReferences(String(result.answer || t("No encontré una respuesta en las guías disponibles.")), result.sources, root.dataset.siteRoot);
            updateQuota(result.quota); setStatus("");
            publishTrace(root.dataset.siteRoot, "ready", result.graphTrace);
          }
        } catch (error) {
          publishTrace(root.dataset.siteRoot, "error");
          if (error.status && (error.status !== 409 || ["request_failed", "request_expired"].includes(error.code))) pendingRequest = undefined;
          answer = requestedSearch ? t(error.message) : error.name === "TimeoutError" ? t("La consulta tardó demasiado. Puedes repetirla para recuperar su resultado.") : error.status ? error.message : t("Sin conexión. Vuelve a intentarlo.");
          setStatus(answer, true);
          if ([401, 403].includes(error.status)) verified = false;
          if (error.status === 429) {
            try { updateQuota((await api("session", undefined, "GET")).quota); } catch { /* Keep the last known renewal time. */ }
          }
        }
        if (requestedAdvisor !== getSearchAdvisor() || requestedSearch !== isSearchPage()) {
          signals.onClose?.(); busy = false; clear.disabled = false; syncAdvisor(); return;
        }
        chat.shadowRoot.querySelector('.input-button.inside-end:not(.custom-button)')?.setAttribute("aria-label", t("Detener respuesta"));
        if (completedRequest && document.querySelector('[data-graph-pilot]')) presentation = watchChatPresentation(chat, completedRequest, answer.length, detail => window.dispatchEvent(new CustomEvent('certichat:presentation', { detail })));
        await signals.onResponse({ text: answer });
        persist();
        if (localNavigation) { localNavigation.ready = true; finishTextNavigation(); }
      } };
      messages.append(chat);
    }
    // ponytail: real queries use the published origin; a loopback API remains available for local tests.
    if (preview) {
      setStatus("Esta vista previa no admite consultas.", true);
      return;
    }
    let session = await api("session", undefined, "GET");
    if (session.mode === "LOCAL" && (!session.authenticated || session.verificationRequired)) {
      await api("session", {});
      session = await api("session", undefined, "GET");
    }
    updateAccess(session);
    if (!verified && available) await verify();
  }

  async function connect() {
    verified = false; available = false; clear.disabled = true;
    retry.disabled = true;
    setStatus("");
    connecting.hidden = false; messages.hidden = true;
    try { await initialize(); }
    catch { setStatus(t("Sin conexión. Vuelve a intentarlo."), true); }
    finally {
      connecting.hidden = true; messages.hidden = false; retry.disabled = false; clear.disabled = !chat || busy;
      requestAnimationFrame(() => {
        try {
          const key = `${storageKey}:scroll`, value = sessionStorage.getItem(key), scroller = chat?.shadowRoot?.querySelector("#messages");
          if (value !== null && Number.isFinite(Number(value)) && Number(value) >= 0 && scroller) {
            scroller.scrollTop = Number(value);
            sessionStorage.removeItem(key);
          }
        } catch { /* Reading position is optional. */ }
      });
    }
  }
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let panelAnimation, closing = false, layoutTransition, launcherAnimation, dockMotion;
  /** Invalidate a dock operation before cancelling animations that may settle its promises. */
  function cancelDockMotion() {
    if (!dockMotion) return;
    dockMotion = undefined; closing = false;
    launcherAnimation?.cancel(); launcherAnimation = undefined;
    panelAnimation?.cancel(); panelAnimation = undefined; layoutTransition?.skipTransition();
    launcher.style.removeProperty('opacity'); launcher.style.removeProperty('visibility');
  }
  function beginDockMotion(direction) {
    cancelDockMotion();
    return dockMotion = { direction };
  }
  /** Fade the real local button only outside the dock layout snapshots. */
  async function fadeDockLauncher(show, animate, from = 0) {
    launcher.style.removeProperty('visibility'); launcher.style.opacity = show ? '1' : '0';
    if (!animate || reducedMotion.matches || !launcher.animate) return;
    const animation = launcher.animate([{ opacity: from }, { opacity: show ? 1 : 0 }], { duration: 200, easing: 'ease' });
    launcherAnimation = animation;
    await animation.finished.catch(() => {});
    if (launcherAnimation === animation) launcherAnimation = undefined;
  }
  addEventListener('pagehide', cancelDockMotion);
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches || !dockMotion) return;
    launcherAnimation?.finish(); panelAnimation?.finish(); layoutTransition?.skipTransition();
  });
  async function changeCourseLayout(change, animate) {
    const workspaceDock = Boolean(dock);
    const main = presenting ? viewer.querySelector('.dialog-content') : workspaceDock ? document.querySelector(isSearchPage() ? '.search-workspace' : '[data-graph-pilot]') : document.querySelector('.course-page:not([data-page^="certitube"]) .course-main');
    if (!animate || reducedMotion.matches || mobileChat.matches || !main || !document.startViewTransition) return change();
    while (layoutTransition) { layoutTransition.skipTransition(); await layoutTransition.finished.catch(() => {}); }
    const figure = [...main.querySelectorAll(presenting ? 'img' : '.diagram')].map(element => {
      const box = element.getBoundingClientRect();
      return { element, area: box.width * Math.max(0, Math.min(innerHeight, box.bottom) - Math.max(0, box.top)) };
    }).sort((a, b) => b.area - a.area)[0];
    const image = figure?.area > 0 ? figure.element : null;
    const html = document.documentElement;
    html.classList.add('is-chat-layout-transition');
    main.style.viewTransitionName = 'course-reading';
    if (!workspaceDock) launcher.style.viewTransitionName = 'course-chat-launcher';
    if (image) image.style.viewTransitionName = 'course-diagram';
    let transition;
    const cleanup = () => {
      if (layoutTransition !== transition) return;
      main.style.removeProperty('view-transition-name'); image?.style.removeProperty('view-transition-name');
      launcher.style.removeProperty('view-transition-name');
      html.classList.remove('is-chat-layout-transition'); layoutTransition = undefined;
    };
    let changed = false;
    try {
      // Native snapshots interpolate the visible figure while text reflows once at its final width.
      transition = document.startViewTransition(() => {
        changed = true; change();
        if (!presenting && !dock && !panel.hidden && !document.body.classList.contains('is-compact-nav') && main.getBoundingClientRect().width < panel.offsetWidth) document.querySelector('.menu-toggle')?.click();
      });
      layoutTransition = transition;
      transition.finished.catch(() => {}).finally(cleanup);
      await (workspaceDock ? transition.finished : transition.updateCallbackDone);
    } catch { if (!changed) change(); cleanup(); }
  }
  /** Locate the minimized control within its workspace before moving the live chat out of the dock. */
  function dockLauncherBounds(button) {
    if (isSearchPage()) {
      const footer = document.querySelector('.search-toolbar'), style = getComputedStyle(footer);
      const bounds = footer.getBoundingClientRect(), visible = bounds.width ? bounds : dock.getBoundingClientRect();
      const size = parseFloat(getComputedStyle(footer.closest('[data-certisearch]')).getPropertyValue('--workspace-control-size'));
      const bottom = bounds.width ? bounds.top + (bounds.height + size) / 2 : visible.bottom - (parseFloat(style.height) - size) / 2;
      return { width: size, height: size, right: visible.right - parseFloat(style.paddingRight), bottom };
    }
    const graph = document.querySelector('[data-graph-pilot]'), viewport = graph.querySelector('.graph-pilot-viewport').getBoundingClientRect();
    const last = graph.querySelector('[data-pilot-active-fit]').getBoundingClientRect(), inset = parseFloat(getComputedStyle(graph).getPropertyValue('--pilot-inset'));
    return { ...button, width: launcher.offsetWidth, height: launcher.offsetHeight,
      right: last.width ? last.left - inset : viewport.right - inset, bottom: last.height ? last.bottom : viewport.bottom - inset };
  }
  function animatePanel(button, fold) {
    if (presenting && (!fold || document.startViewTransition) || reducedMotion.matches || !panel.animate) return;
    const box = panel.getBoundingClientRect();
    if (!box.width || !box.height) return;
    if (fold && dock) button = dockLauncherBounds(button);
    // Fold the existing panel toward its local control without creating another composer.
    const small = presenting ? { transform: "translateX(100%)", opacity: 0 } : { transform: `translate(${button.right - box.right}px, ${button.bottom - box.bottom}px) scale(${button.width / box.width}, ${button.height / box.height})`, opacity: 0, borderRadius: getComputedStyle(launcher).borderRadius };
    const full = { transform: "none", opacity: 1, borderRadius: getComputedStyle(panel).borderRadius };
    return panel.animate(fold ? [full, small] : [small, full], { duration: 320, easing: "cubic-bezier(.22, 1, .36, 1)", fill: fold ? "forwards" : "none" });
  }
  /** Commit the closed layout, then expose and focus its launcher after the actual resize. */
  async function finishClosingPanel(animate, focus, operation) {
    if (operation && operation !== dockMotion) return;
    if (!operation) launcher.style.removeProperty('visibility');
    await changeCourseLayout(() => {
      if (operation && operation !== dockMotion) return;
      panel.hidden = true; launcher.hidden = false;
      const search = document.querySelector("[data-certisearch]"); if (search) delete search.dataset.mobile;
      launcher.style.visibility = operation ? 'hidden' : '';
      launcher.setAttribute('aria-expanded', 'false');
      panelAnimation?.cancel(); panelAnimation = undefined;
      positionLauncher();
      if (!operation) { closing = false; if (focus) launcher.focus({ preventScroll: true }); }
    }, animate);
    if (!operation || operation !== dockMotion) return;
    await fadeDockLauncher(true, animate);
    if (operation !== dockMotion) return;
    dockMotion = undefined; closing = false; launcher.style.removeProperty('opacity');
    if (focus) launcher.focus({ preventScroll: true });
  }
  function closePanel(animate = true, focus = true, explicit = true) {
    if (explicit) rememberOpen("false");
    else if (openPreference !== "false") rememberOpen(null);
    if (panel.hidden) { cancelDockMotion(); positionLauncher(); return; }
    if (closing) return;
    const operation = dock ? beginDockMotion('closing') : null;
    closing = true;
    // Hide the voice dock before restoring the composer, so Exit never flashes the text chat.
    if (panel.hasAttribute("data-voice-mode")) { animate = false; panel.hidden = true; }
    window.dispatchEvent(new CustomEvent("certivoice:command", { detail: "exit" }));
    try { sessionStorage.removeItem(`${storageKey}:reference`); } catch { /* Storage is optional. */ }
    panelAnimation?.cancel();
    const finish = () => finishClosingPanel(animate, focus, operation);
    if (!animate || reducedMotion.matches || !panel.animate) return finish();
    launcher.hidden = false; launcher.style.visibility = "hidden";
    panelAnimation = animatePanel(launcher.getBoundingClientRect(), true);
    if (!panelAnimation) return finish();
    panelAnimation.finished.then(finish, finish);
  }
  let syncPresentation = () => {};
  if (viewer) {
    syncPresentation = () => {
      if (dock) { presenting = false; positionLauncher(); return; }
      const active = viewer.open && (viewer.classList.contains("is-presenting") || root.dataset.voiceMode === "true" || root.parentNode === viewer);
      const voiceLauncher = active && mobileChat.matches;
      launcher.setAttribute("aria-label", voiceLauncher ? t("Activar voz") : "CertiChat");
      launcher.disabled = voiceLauncher && (!launcherVoiceState.enabled || launcherVoiceState.quotaBlocked && !launcherVoiceState.retry);
      if (active === presenting) return;
      panelAnimation?.cancel(); panelAnimation = undefined; closing = false;
      presenting = active;
      if (root.dataset.voiceMode !== "true") closePanel(false, false, false);
      root.classList.remove("is-beside-content"); launcher.style.removeProperty("top");
      for (const name of ["top", "left", "width", "height"]) panel.style.removeProperty(`--chat-${name}`);
      // ponytail: move the live instance; rebuilding Deep Chat would lose an in-flight response.
      if (active) viewer.append(root);
      else (dock || homeParent).append(root);
      panel.setAttribute("role", active ? "region" : "dialog");
      if (!active && viewer.open) viewer.querySelector("[data-diagram-present]").focus({ preventScroll: true });
      positionLauncher();
    };
    new MutationObserver(syncPresentation).observe(viewer, { attributes: true, attributeFilter: ["class", "open"] });
    new MutationObserver(syncPresentation).observe(panel, { attributes: true, attributeFilter: ["data-voice-mode"] });
    mobileChat.addEventListener("change", syncPresentation);
    window.addEventListener("certivoice:state", event => {
      const wasVoice = launcherVoiceState.active || launcherVoiceState.resume;
      launcherVoiceState = event.detail || {};
      if (wasVoice && !launcherVoiceState.active && !launcherVoiceState.resume && mobileChat.matches && viewer.matches("[open].is-presenting")) closePanel(false, true, false);
      syncPresentation();
    });
    window.dispatchEvent(new CustomEvent("certivoice:state-request"));
    syncPresentation();
  }
  window.addEventListener("site:page", () => {
    cancelDockMotion();
    const previousDock = dock;
    dock = document.querySelector("[data-explorer-chat-slot]");
    presenting = false;
    (dock || homeParent).append(root);
    panel.setAttribute("role", dock ? "region" : "dialog");
    root.querySelector("[data-chat-close]").hidden = false;
    root.querySelector('.certichat-actions a').hidden = Boolean(dock);
    for (const name of ["top", "left", "width", "height"]) panel.style.removeProperty(`--chat-${name}`);
    if (chat) {
      chat.dataset.graphDock = String(Boolean(dock) && !isSearchPage());
      chat.shadowRoot?.querySelectorAll(responseSelector).forEach(bindResponse);
      const input = chat.shadowRoot?.querySelector('[role="textbox"]');
      input?.setAttribute("aria-label", t("Escribe tu consulta"));
      input?.setAttribute("deep-chat-placeholder-text", t("Escribe tu consulta"));
      const intro = chat.shadowRoot?.querySelector('.deep-chat-intro .ai-message');
      if (intro) intro.textContent = t("Hola. Resuelve tus dudas sobre las guías y prácticas del sitio.");
      chat.shadowRoot?.querySelector('.input-button.inside-end:not(.custom-button)')?.setAttribute("aria-label", t(busy ? "Detener respuesta" : "Enviar consulta"));
      refreshVoice(busy);
    }
    syncAdvisor();
    if (dock && panel.hidden && openPreference !== "false") launcher.click();
    if (openPreference === "false" && root.dataset.voiceMode !== "true") closePanel(false, false, false);
    if (previousDock && !dock && root.dataset.voiceMode !== "true" && !referenceNavigation) closePanel(false, false, false);
    referenceNavigation = undefined;
    try { sessionStorage.removeItem(`${storageKey}:reference`); } catch { /* La referencia ya se consumió en la navegación continua. */ }
    observeLauncher(); syncPresentation(); fitMobileViewport();
  });
  function syncQuizLock() {
    quizCode = readQuizLock();
    if (quizCode) {
      cancelDockMotion();
      const hadFocus = root.contains(document.activeElement);
      if (confirmation.open) confirmation.close();
      panelAnimation?.cancel(); panelAnimation = undefined; closing = false;
      panel.hidden = true; launcher.hidden = false;
      const search = document.querySelector("[data-certisearch]"); if (search) delete search.dataset.mobile; launcher.setAttribute("aria-expanded", "false");
      root.hidden = true;
      try { sessionStorage.removeItem(`${storageKey}:reference`); } catch { /* Storage is optional. */ }
      if (hadFocus) document.querySelector("#main")?.focus({ preventScroll: true });
    } else if (root.hidden) {
      root.hidden = false;
      if (dock && openPreference !== "false") launcher.click();
      positionLauncher();
    }
  }
  let checkingQuiz = false;
  async function refreshQuizLock() {
    const code = readQuizLock();
    if (!code || !quizApi || checkingQuiz) { syncQuizLock(); return; }
    checkingQuiz = true;
    try {
      const options = { credentials: "include", cache: "no-store", signal: AbortSignal.timeout(5000) };
      const sessionResponse = await fetch(`${quizApi}/api/session`, options);
      if (!sessionResponse.ok) return;
      const session = await sessionResponse.json();
      let finished = session.roomCode !== code;
      if (!finished) {
        const roomResponse = await fetch(`${quizApi}/api/rooms/${code}`, options);
        if ([401, 403, 404, 410].includes(roomResponse.status)) finished = true;
        else if (roomResponse.ok) {
          const room = await roomResponse.json();
          finished = room.status === "finished" || room.role !== "player";
        }
      }
      if (finished && readQuizLock() === code) { localStorage.removeItem(quizLockKey); syncQuizLock(); }
    } catch { /* Keep the lock while the room status cannot be verified. */ }
    finally { checkingQuiz = false; }
  }
  syncQuizLock();
  if (quizCode) refreshQuizLock();
  setInterval(() => { if (quizCode) refreshQuizLock(); }, 15000);
  addEventListener("storage", event => { if (event.key === quizLockKey) { syncQuizLock(); if (quizCode) refreshQuizLock(); } });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && quizCode) refreshQuizLock(); });
  launcher.addEventListener("click", async event => {
    if (dockMotion?.direction === "opening") return;
    if (readQuizLock()) { syncQuizLock(); return; }
    if (!panel.hidden) return closePanel(event.isTrusted);
    if (presenting && mobileChat.matches && event.isTrusted) {
      if (busy || voiceBusy) return;
      // Keep the original tap for Safari audio; mounting the shared composer may await the connection.
      window.dispatchEvent(new CustomEvent("certivoice:command", { detail: "start" }));
      if (root.dataset.voiceMode !== "true") return;
      panel.dataset.voiceMode = "true";
    }
    rememberOpen("true");
    const button = launcher.getBoundingClientRect(), opacity = Number(getComputedStyle(launcher).opacity);
    const operation = dock ? beginDockMotion('opening') : null;
    if (operation) {
      await fadeDockLauncher(false, event.isTrusted, opacity);
      if (operation !== dockMotion) return;
    }
    await changeCourseLayout(() => {
      if (operation && operation !== dockMotion) return;
      launcher.style.removeProperty('opacity');
      panel.hidden = false; launcher.hidden = true; launcher.setAttribute("aria-expanded", "true");
      if (isSearchPage() && mobileChat.matches && event.isTrusted) document.querySelector("[data-certisearch]").dataset.mobile = "chat";
      positionLauncher();
      rememberOpen("true");
      fitMobileViewport();
      if (event.isTrusted) panelAnimation = animatePanel(button, false);
      if (event.isTrusted) root.querySelector("[data-chat-close]").focus({ preventScroll: true });
    }, event.isTrusted);
    if (operation) { if (operation !== dockMotion) return; dockMotion = undefined; }
    if (!opening && !busy) { opening = connect(); await opening; opening = undefined; }
  });
  let wasOpen = false;
  try {
    wasOpen = sessionStorage.getItem(`${storageKey}:open`) === "true" || sessionStorage.getItem(`${storageKey}:reference`) === location.href;
    sessionStorage.removeItem(`${storageKey}:reference`);
  } catch { /* Browsers may disable session storage. */ }
  if (!quizCode && openPreference !== "false" && (dock || location.hash === "#certichat" || wasOpen)) launcher.click();
  else positionLauncher();
  document.documentElement.classList.remove("chat-restoring");
  window.addEventListener("pageshow", event => {
    if (event.persisted) { try { openPreference = sessionStorage.getItem(`${storageKey}:open`); } catch { /* Retain the in-memory preference. */ } }
    syncQuizLock();
    if (quizCode) refreshQuizLock();
    if (!event.persisted) return;
    const open = openPreference === "true" || dock && openPreference !== "false";
    if (open && panel.hidden && !quizCode) launcher.click();
    if (!open && !panel.hidden) closePanel(false, false, false);
  });
  root.querySelector("[data-chat-close]").addEventListener("click", () => closePanel());
  panel.addEventListener("keydown", event => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); closePanel(); } });
  retry.addEventListener("click", connect);
  clear.addEventListener("click", () => {
    if (isSearchPage() && !getSearchAdvisor()) return;
    clearError.hidden = true;
    confirmation.showModal();
  });
  closeClearError.addEventListener("click", () => { clearError.hidden = true; clear.focus({ preventScroll: true }); });
  cancelClear.addEventListener("click", () => { if (!busy) confirmation.close(); });
  confirmation.addEventListener("cancel", event => { if (busy) event.preventDefault(); });
  confirmation.addEventListener("click", event => {
    if (event.target !== confirmation || busy) return;
    const bounds = confirmation.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) confirmation.close();
  });
  confirmation.addEventListener("close", () => (quizCode ? document.querySelector("#main") : clear)?.focus({ preventScroll: true }));
  confirmClear.addEventListener("click", async () => {
    const clearingAdvisor = getSearchAdvisor(), clearingSearch = isSearchPage();
    busy = true; clear.disabled = true; confirmClear.disabled = true; cancelClear.disabled = true;
    confirmation.setAttribute("aria-busy", "true");
    try {
      const result = clearingAdvisor ? (await clearingAdvisor.clear(), { quota }) : preview ? { quota } : await api("conversation", {}, "DELETE");
      if (clearingAdvisor !== getSearchAdvisor() || clearingSearch !== isSearchPage()) {
        if (!clearingAdvisor) writeStored(storageKey, { updatedAt: Date.now(), messages: [] });
        profileRefreshPending = true; confirmation.close(); return;
      }
      chat.clearMessages(); responseTraces.length = 0; responseRequests.length = 0; responseRatings.length = 0; completedTrace = undefined; completedRequest = undefined; pendingRequest = undefined; textNavigation = undefined; persist();
      window.dispatchEvent(new CustomEvent("certichat:cleared"));
      publishTrace(root.dataset.siteRoot, "idle");
      updateQuota(result.quota); if (!preview) setStatus(""); confirmation.close();
    } catch {
      clearError.querySelector("[data-chat-clear-error-message]").textContent = t("No se pudo borrar la conversación. Vuelve a intentarlo.");
      clearError.hidden = false;
      confirmation.close();
    } finally {
      busy = false; clear.disabled = false; confirmClear.disabled = false; cancelClear.disabled = false;
      confirmation.setAttribute("aria-busy", "false");
      if (profileRefreshPending) syncAdvisor(true);
    }
  });
  const voiceResponses = new Set();
  window.addEventListener("certivoice:busy", event => { voiceBusy = event.detail === true; clear.disabled = busy || voiceBusy || !chat; updateQuota(); });
  window.addEventListener("certichat:session", event => { if (event.detail) updateAccess(event.detail, false); });
  window.addEventListener("certichat:voice-result", event => {
    const result = event.detail;
    if (!result || voiceResponses.has(result.requestId) || typeof result.transcript !== "string" || typeof result.answer !== "string" || result.transcript.length > 1500 || result.answer.length > 12000) return;
    if (result.profile === "certisearch" && !getSearchAdvisor() || result.profile !== "certisearch" && (getSearchAdvisor() || isSearchPage())) return;
    voiceResponses.add(result.requestId);
    const pair = [...(result.transcript.trim() ? [{ role: "user", text: result.transcript }] : []), ...(result.answer.trim() ? [{ role: "ai", text: result.profile === "certisearch" ? result.answer : answerWithReferences(result.answer, result.sources, root.dataset.siteRoot) }] : [])];
    if (chat) { completedTrace = normalizeTrace(result.graphTrace, root.dataset.siteRoot); pair.forEach(message => chat.addMessage(message, true)); }
    else if (result.profile !== "certisearch") {
      saved.messages = restoreChat({ updatedAt: Date.now(), messages: [...saved.messages, ...pair] }, root.dataset.siteRoot).messages;
      responseTraces.splice(0, responseTraces.length, ...saved.messages.filter(message => message.role === "ai").map(message => message.graphTrace));
      responseRequests.splice(0, responseRequests.length, ...saved.messages.filter(message => message.role === "ai").map(message => message.requestId));
      responseRatings.splice(0, responseRatings.length, ...saved.messages.filter(message => message.role === "ai").map(message => message.rating || 0));
      writeStored(storageKey, { updatedAt: Date.now(), messages: saved.messages, pendingRequest });
    }
    updateQuota(result.quota);
  });
}
