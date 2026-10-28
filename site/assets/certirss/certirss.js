import { mountPush } from './push.js?v=ebf266315b85';
import { highlightSearch } from '../site/content-search.js?v=ebf266315b85';
import { t, locale } from '../site/i18n.js?v=ebf266315b85';

const snapshots = new WeakMap();
const mobileList = root => matchMedia('(max-width: 800px)').matches && root.dataset.rssMobile === 'list';

const normalize = value => String(value).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
const timestamp = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}(?:T.*(?:Z|[+-]\d{2}:\d{2}))?$/.test(value) && Number.isFinite(Date.parse(value));

function sourceRecord(row) {
  if (!row || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(row.id)) throw new Error('Invalid source ID');
  if (typeof row.name !== 'string' || row.name.length > 120 || typeof row.error !== 'boolean') throw new Error('Invalid source metadata');
  if (row.lastSuccessAt !== null && !timestamp(row.lastSuccessAt)) throw new Error('Invalid source date');
  return { id: row.id, name: row.name, error: row.error, lastSuccessAt: row.lastSuccessAt };
}

function expandedArticle(row) {
  if (row.content !== undefined && (typeof row.content !== 'string' || row.content.length > 5000)) throw new Error('Invalid article excerpt');
  if (row.relatedLinks !== undefined && (!Array.isArray(row.relatedLinks) || row.relatedLinks.length > 6)) throw new Error('Invalid related links');
  const relatedLinks = (row.relatedLinks || []).map(link => {
    const related = new URL(link.url);
    if (related.protocol !== 'https:' || related.username || related.password || typeof link.label !== 'string' || link.label.length > 180) throw new Error('Invalid related link');
    return { url: related.href, label: link.label };
  });
  return { content: row.content || '', relatedLinks };
}

function translatedArticle(row, language) {
  const variants = { es: row.editorial, ...row.translations };
  for (const [key, value] of Object.entries(variants)) {
    if (value === undefined) continue;
    if (!['es', 'en', 'pt', 'it'].includes(key) || !value || typeof value.title !== 'string' || value.title.length > 1000 || typeof value.content !== 'string' || value.content.length > 5000) throw new Error('Invalid article translation');
  }
  const value = variants[language];
  return value ? { title: value.title, summary: value.content.slice(0, 1000), content: value.content } : {};
}

function articleRecord(row, ids, urls, language) {
  const url = new URL(row.url);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Invalid article URL');
  if (!ids.has(row.sourceId) || urls.has(url.href)) throw new Error('Invalid article identity');
  if (![row.title, row.summary, row.sourceName].every(value => typeof value === 'string' && value.length <= 1000)) throw new Error('Invalid article text');
  if (!timestamp(row.firstSeenAt) || row.publishedAt !== null && !timestamp(row.publishedAt)) throw new Error('Invalid article date');
  urls.add(url.href);
  if (typeof row.id !== 'string' || !/^[a-f0-9]{24}$/.test(row.id)) throw new Error('Invalid article ID');
  return { id: row.id, title: row.title, summary: row.summary, ...expandedArticle(row), ...translatedArticle(row, language), ...articleCover(row), ...articleAuthor(row.author), url: url.href, sourceId: row.sourceId, sourceName: row.sourceName, publishedAt: row.publishedAt, firstSeenAt: row.firstSeenAt };
}

function articleAuthor(author) {
  if (author === undefined) return {};
  if (typeof author !== 'string' || !author.trim() || author.length > 180 || /[<>\r\n]/.test(author)) throw new Error('Invalid article author');
  return { author };
}

function articleCover(row) {
  if (!row.cover) return {};
  const prefix = `/certitips/assets/certirss/articles/${row.id}/img/cover-`;
  const vector = `/certitips/assets/certirss/articles/${row.id}/img/cover.svg`;
  const validPair = [[prefix + 'wide.webp', prefix + 'thumb.webp'], [vector, vector]].some(([wide, thumb]) => row.cover.wide === wide && row.cover.thumbnail === thumb);
  if (!validPair || typeof row.cover.alt !== 'string' || row.cover.alt.length > 240) throw new Error('Invalid article cover');
  return { cover: { wide: row.cover.wide, thumbnail: row.cover.thumbnail, alt: row.cover.alt } };
}

/** Proyecta datos remotos no confiables a campos conocidos; rechaza toda instantánea incompatible. */
export function validateSnapshot(data, language = locale) {
  if (data?.version !== 1 || !Array.isArray(data.sources) || data.sources.length > 50 || !Array.isArray(data.items) || data.items.length > 1000) throw new Error('Invalid RSS snapshot');
  if (data.checkedAt !== null && !timestamp(data.checkedAt)) throw new Error('Invalid snapshot date');
  const sources = data.sources.map(sourceRecord);
  const ids = new Set(sources.map(row => row.id)), urls = new Set();
  if (ids.size !== sources.length) throw new Error('Duplicate sources');
  return { checkedAt: data.checkedAt, sources, items: data.items.map(row => articleRecord(row, ids, urls, language)) };
}

function compareArticles(a, b, sort) {
  if (sort === 'source') return a.sourceName.localeCompare(b.sourceName) || a.title.localeCompare(b.title);
  if (sort === 'title') return a.title.localeCompare(b.title);
  const publicationOrder = (a.publishedAt || a.firstSeenAt).localeCompare(b.publishedAt || b.firstSeenAt)
    || a.firstSeenAt.localeCompare(b.firstSeenAt) || a.id.localeCompare(b.id);
  return (sort === 'oldest' ? 1 : -1) * publicationOrder;
}

/** Filtra sin mutar la instantánea y ordena usando publicación o detección explícita. */
export function selectItems(items, { query = '', source = '', sort = 'newest' } = {}) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const matching = items.filter(item => (!source || item.sourceId === source) && terms.every(term => normalize(`${item.title} ${item.summary} ${item.content || ''} ${item.sourceName}`).includes(term)));
  return matching.sort((a, b) => compareArticles(a, b, sort));
}

function formatDate(value) {
  return new Intl.DateTimeFormat(locale, value.length === 10 ? { dateStyle: 'medium', timeZone: 'UTC' } : { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Lima' }).format(new Date(value));
}

function statusMessage(root, message = '') {
  const status = root.querySelector('[data-rss-status]');
  status.textContent = message; status.hidden = !message;
}

function markCurrent(row, selected, collapse = true) {
  row.querySelector('a')?.removeAttribute('aria-current');
  row.classList.toggle('rss-current', selected && collapse);
  if (selected) { row.setAttribute('aria-current', 'true'); row.setAttribute('aria-label', row.querySelector('h2').textContent); }
  else { row.removeAttribute('aria-current'); row.removeAttribute('aria-label'); }
}

function drawLibrary(root, cards, query) {
  const terms = normalize(query.value).split(/\s+/).filter(Boolean);
  let count = 0;
  for (const card of cards) {
    card.hidden = !terms.every(term => normalize(`${card.querySelector('h2').textContent} ${card.querySelector('[data-rss-description]').textContent} ${card.dataset.source} ${card.dataset.category}`).includes(term));
    const title = card.querySelector('h2'); highlightSearch(title, title.textContent, query.value);
    markCurrent(card, !mobileList(root) && card.dataset.rssId === root.dataset.rssSelected, !query.value.trim());
    if (!card.hidden) count++;
  }
  statusMessage(root, !cards.length ? t('Biblioteca pendiente.') : count ? '' : t('No hay recursos para estos filtros.'));
}

function drawSourceStatuses(container, sources) {
  const warnings = sources.filter(row => row.error || !row.lastSuccessAt || Date.now() - Date.parse(row.lastSuccessAt) > 36 * 3600000);
  container.textContent = warnings.length ? '⚠' : '';
  container.hidden = warnings.length === 0;
  container.classList.toggle('rss-warning', warnings.length > 0);
  container.title = sources.map(row => `${row.name}: ${row.error ? t('No se pudo actualizar; se conserva la última lectura válida.') : t('Comprobación correcta')}${!row.lastSuccessAt || Date.now() - Date.parse(row.lastSuccessAt) > 36 * 3600000 ? ` · ${t('Información pendiente o con más de 36 horas sin comprobarse.')}` : ''}`).join('\n');
  container.setAttribute('aria-label', container.title);
}

function newsDetail(root, item, ordinal) {
  root.dataset.rssNewsId = item?.id || '';
  const heading = root.querySelector('[data-rss-article-heading]'), content = root.querySelector('[data-rss-article-content]');
  const title = document.createElement('h1'), origin = document.createElement('small');
  origin.className = 'rss-origin'; origin.textContent = `CERTIRSS${item ? ` · ${item.sourceName}` : ''}`;
  title.textContent = item ? item.title : t('No hay novedades para estos filtros.'); title.translate = !item;
  const number = document.createElement('span'), copy = document.createElement('div');
  number.className = 'tube-video-number tube-player-number'; number.dataset.rssNumber = ''; number.setAttribute('aria-hidden', 'true'); number.textContent = ordinal || '';
  number.hidden = !item;
  copy.append(title, origin); heading.replaceChildren(number, copy);
  content.replaceChildren();
  if (!item) {
    const empty = document.createElement('section'); empty.className = 'rss-detail-body rss-empty';
    empty.append(title); content.append(empty); return;
  }
  const cover = document.createElement('span'), image = document.createElement('img');
  cover.className = 'rss-cover rss-artwork'; image.src = item.cover?.wide || root.dataset.rssCover;
  image.alt = item.cover?.alt || ''; image.width = 1600; image.height = 400; cover.append(image);
  const body = document.createElement('section'), published = document.createElement('time'), link = document.createElement('a');
  body.className = 'tube-summary rss-summary rss-detail-body';
  const summaryHeading = document.createElement('h2'), summaryHeader = document.createElement('div');
  summaryHeading.textContent = t('Resumen'); summaryHeader.className = 'rss-summary-header';
  const label = item.publishedAt ? t('Publicado') : t('Detectado; publicación sin fecha');
  published.textContent = `${label} · ${formatDate(item.publishedAt || item.firstSeenAt)}`;
  published.dateTime = item.publishedAt || item.firstSeenAt;
  published.dataset.rssPublished = ''; summaryHeader.append(summaryHeading, published); body.append(summaryHeader);
  for (const text of (item.content || item.summary).split(/\n\s*\n/)) body.append(articleParagraph(text));
  link.href = item.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = t('Abrir la fuente original');
  const related = document.createElement('section'), resourceHeading = document.createElement('h2'), links = document.createElement('ul'), row = document.createElement('li');
  related.className = 'tube-resources'; related.dataset.rssOriginal = ''; resourceHeading.textContent = t('Recursos'); links.className = 'resource-list';
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  icon.setAttribute('viewBox', '0 0 16 16'); icon.setAttribute('aria-hidden', 'true'); use.setAttribute('href', new URL('../icons/resource-link.svg', import.meta.url).href + '#resource-link'); icon.append(use);
  row.append(icon, link); links.append(row); related.append(resourceHeading, links);
  const metadata = document.createElement('div'); metadata.className = 'rss-article-meta'; metadata.append(related);
  metadata.append(articleReference(item));
  content.replaceChildren(cover, body, metadata);
}

/** Presenta la fuente registrada como referencia, sin interpretar HTML ni inferir autoría. */
function articleReference(item) {
  const section = document.createElement('section'), heading = document.createElement('h2');
  const line = document.createElement('p'), sourceName = document.createElement('span');
  section.className = 'tube-resources rss-reference'; section.dataset.rssReference = '';
  heading.textContent = t('Referencia');
  sourceName.dataset.rssCurrentSource = ''; sourceName.translate = false; sourceName.textContent = item.sourceName;
  line.append(document.createTextNode(t('Fuente') + ': '), sourceName);
  section.append(heading, line);
  return section;
}

/** Sólo interpreta código en línea; todo contenido externo restante sigue siendo texto inerte. */
function articleParagraph(text) {
  const paragraph = document.createElement('p'); paragraph.translate = false;
  let offset = 0;
  for (const match of text.matchAll(/`([^`\r\n]+)`/g)) {
    const code = document.createElement('code'); code.textContent = match[1];
    paragraph.append(document.createTextNode(text.slice(offset, match.index)), code);
    offset = match.index + match[0].length;
  }
  paragraph.append(document.createTextNode(text.slice(offset)));
  return paragraph;
}

function newsCard(item, coverURL, selected, ordinal, query) {
  const row = document.createElement('li'), link = document.createElement('a'), image = document.createElement('img'), cover = document.createElement('span'), copy = document.createElement('span'), title = document.createElement('h2'), date = document.createElement('time');
  link.href = `#novedades/${item.id}`; link.dataset.rssArticle = item.id;
  row.dataset.rssId = item.id;
  cover.className = 'rss-cover rss-artwork'; image.src = item.cover?.thumbnail || coverURL; image.alt = item.cover?.alt || ''; image.width = 480; image.height = 270; cover.append(image);
  highlightSearch(title, item.title, query); title.translate = false;
  date.className = 'tube-video-date'; date.dateTime = (item.publishedAt || item.firstSeenAt).slice(0, 10); date.textContent = date.dateTime;
  const number = document.createElement('span'); number.className = 'tube-video-number'; number.setAttribute('aria-hidden', 'true'); number.textContent = ordinal;
  copy.append(title, date); link.append(cover, number, copy); row.append(link); markCurrent(row, item.id === selected, !query.trim()); return row;
}

/** Preserve the first visible recommendation while its selected row becomes the same divider as CertiTube. */
function keepListPosition(list, selected, update) {
  const bounds = list.getBoundingClientRect(), previous = list.scrollTop;
  const anchor = [...list.children].find(row => !row.hidden && !row.classList.contains('rss-current') && row.dataset.rssId !== selected && row.getBoundingClientRect().bottom > bounds.top);
  const top = anchor?.getBoundingClientRect().top, id = anchor?.dataset.rssId;
  update();
  const replacement = [...list.children].find(row => row.dataset.rssId === id);
  list.scrollTop = replacement ? list.scrollTop + replacement.getBoundingClientRect().top - top : previous;
}

/** Keep unchanged reading DOM; an edited article retains its scroll position. */
function updateNewsDetail(root, item, ordinal, previous) {
  if (previous && JSON.stringify(item) === JSON.stringify(previous)) {
    root.querySelector('[data-rss-number]').textContent = ordinal;
  } else {
    const readingScroll = previous?.id === item?.id ? root.querySelector('.rss-detail-body')?.scrollTop : undefined;
    newsDetail(root, item, ordinal);
    if (readingScroll !== undefined) root.querySelector('.rss-detail-body').scrollTop = readingScroll;
  }
}

function drawNews(root, snapshot, query, previousArticle) {
  if (!snapshot) return;
  const find = name => root.querySelector(`[data-rss-${name}]`);
  // Rank the full chronology before filtering: oldest is 1, newest has the highest number.
  const ordinals = new Map(selectItems(snapshot.items, { sort: 'oldest' }).map((item, index) => [item.id, index + 1]));
  const items = selectItems(snapshot.items, { query: query.value });
  const requested = location.hash.split('/')[1] || previousArticle?.id, selected = items.find(item => item.id === requested) || items[0];
  if (selected && requested && selected.id !== requested) history.replaceState(history.state, '', `#novedades/${selected.id}`);
  const list = find('items');
  keepListPosition(list, selected?.id, () => list.replaceChildren(...items.map(item => newsCard(item, root.dataset.rssCover, mobileList(root) ? null : selected?.id, ordinals.get(item.id), query.value))));
  updateNewsDetail(root, selected, ordinals.get(selected?.id), previousArticle);
  statusMessage(root, !snapshot.sources.length ? t('Todavía no hay fuentes disponibles.') : !items.length ? t('No hay novedades para estos filtros.') : '');
  drawSourceStatuses(find('health'), snapshot.sources);
}

/** Lee una instantánea pública acotada sin credenciales y la valida antes de exponerla a la vista. */
export async function readSnapshot(url, signal) {
  const response = await fetch(url, { signal, cache: 'no-cache', credentials: 'omit' });
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('RSS unavailable');
  const text = await response.text();
  if (text.length > 8 * 1024 * 1024) throw new Error('RSS too large');
  const data = JSON.parse(text);
  // La proyección editorial sólo corresponde al mismo extracto original; un cambio invalida la traducción estática.
  try {
    const base = document.body.dataset.base;
    const response = await fetch(`${base}assets/certirss/editorial.json`, { signal, credentials: 'omit' });
    if (!response.ok) throw new Error('Editorial unavailable');
    const raw = await response.text();
    if (raw.length > 8 * 1024 * 1024) throw new Error('Editorial too large');
    const editorial = JSON.parse(raw);
    if (editorial.version !== 1 || !Array.isArray(editorial.items) || editorial.items.length > 1000) throw new Error('Editorial incompatible');
    const records = new Map(editorial.items.map(row => [row.id, row]));
    data.items = await Promise.all(data.items.map(async item => {
      const row = records.get(item.id);
      if (!row) return item;
      const bytes = new TextEncoder().encode(JSON.stringify([item.url, item.title, item.content || item.summary]));
      const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(byte => byte.toString(16).padStart(2, '0')).join('');
      if (hash !== row.sourceHash && hash !== row.displayHash) return item;
      return { ...item, ...articleCover(row), translations: { ...item.translations, [locale]: { title: row.title, content: row.content } } };
    }));
  } catch { /* Conservar la lectura remota cuando la ficha publicada no está disponible. */ }
  return validateSnapshot(data);
}

function mountTabs(tabs, setView, signal) {
  for (const tab of tabs) {
    tab.addEventListener('click', () => { history.replaceState(history.state, '', `#${tab.dataset.rssTab}`); setView(tab.dataset.rssTab); }, { signal });
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[(tabs.indexOf(tab) + 1) % tabs.length];
      next.focus(); next.click();
    }, { signal });
  }
}


function activateView(root, tabs, view) {
  for (const tab of tabs) {
    const selected = tab.dataset.rssTab === view;
    tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
  }
  root.querySelector('#rss-library').hidden = view !== 'biblioteca';
  root.querySelector('#rss-news').hidden = view !== 'novedades';
}

/** La sincronización pertenece al lote completo, también al abrir directamente Biblioteca. */
function drawSync(root, snapshot) {
  const stamp = root.querySelector('[data-rss-updated]');
  stamp.textContent = snapshot.checkedAt ? new Intl.DateTimeFormat(locale, { timeZone: 'America/Lima', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(new Date(snapshot.checkedAt)).replaceAll('/', '-').replace(',', '') : t('Pendiente de la primera actualización.');
  if (snapshot.checkedAt) stamp.dateTime = snapshot.checkedAt;
  else stamp.removeAttribute('datetime');
}

async function loadNews(root, signal) {
  const refresh = root.querySelector('[data-rss-refresh]'), items = root.querySelector('[data-rss-items]');
  refresh.disabled = true; items.setAttribute('aria-busy', 'true');
  return await readSnapshot(root.dataset.rssUrl, AbortSignal.any([signal, AbortSignal.timeout(15000)]));
}

/** Switches the mobile reader shell without replacing its list, query or native history. */
function syncMobileView(root, tabs, view) {
  const previous = root.dataset.rssMobile;
  root.dataset.rssMobile = location.hash.includes('/') || !location.pathname.endsWith('/certirss/') ? 'article' : 'list';
  root.querySelector('[data-rss-list]').hash = view;
  if (matchMedia('(max-width: 800px)').matches && previous !== root.dataset.rssMobile) {
    const target = root.dataset.rssMobile === 'article' ? root.querySelector('[data-rss-detail]') : tabs.find(tab => tab.dataset.rssTab === view);
    target?.focus({ preventScroll: true });
  }
}
const mobileReturnControls = 'a, button, input, textarea, select, summary, [contenteditable], pre, code';
/** Ignore selections, controls, multiple fingers and the browser's native edge gesture. */
function swipeStart(event) {
  if (event.touches.length !== 1 || !event.target.closest('[data-rss-detail]') || event.target.closest(mobileReturnControls) || !window.getSelection()?.isCollapsed) return;
  const touch = event.touches[0];
  if (touch.clientX < 20) return;
  return { id: touch.identifier, x: touch.clientX, y: touch.clientY, time: event.timeStamp };
}
function isRightSwipe(event, start) {
  if (!start || event.touches.length || !window.getSelection()?.isCollapsed) return false;
  const touch = [...event.changedTouches].find(touch => touch.identifier === start.id);
  if (!touch) return false;
  const dx = touch.clientX - start.x, dy = touch.clientY - start.y;
  return dx >= 60 && dx > Math.abs(dy) * 1.5 && event.timeStamp - start.time < 800;
}
/** Return through the existing link, preserving direct-entry navigation and list state. */
function mountMobileReturn(root, signal) {
  const active = () => matchMedia('(max-width: 800px)').matches && root.dataset.rssMobile === 'article';
  const back = () => root.querySelector('[data-rss-list]').click();
  let start;
  root.addEventListener('touchstart', event => { start = active() ? swipeStart(event) : undefined; }, { passive: true, signal });
  root.addEventListener('touchmove', event => {
    if (!start) return;
    const touch = [...event.touches].find(touch => touch.identifier === start.id);
    if (event.touches.length !== 1 || !touch || Math.abs(touch.clientY - start.y) > Math.max(12, Math.abs(touch.clientX - start.x))) start = undefined;
  }, { passive: true, signal });
  root.addEventListener('touchcancel', () => { start = undefined; }, { passive: true, signal });
  root.addEventListener('touchend', event => {
    const initial = start;
    start = undefined;
    if (active() && isRightSwipe(event, initial)) { event.preventDefault(); back(); }
  }, { passive: false, signal });
  root.addEventListener('keydown', event => {
    if (active() && event.key === 'Escape' && !event.defaultPrevented && !event.target.closest(mobileReturnControls)) {
      event.preventDefault(); back();
    }
  }, { signal });
}
/** Check a due public feed only while visible; the module owns the timer's lifetime. */
function mountNewsRefresh(signal, button, checkedAt, load) {
  const interval = 5 * 60000;
  const refresh = () => {
    if (!signal.aborted && document.visibilityState === 'visible' && !button.disabled) void load({ background: true });
  };
  const refreshWhenDue = () => { if (Date.now() - checkedAt() >= interval) refresh(); };
  // The periodic tick must not skip a cycle because the previous request took time.
  const timer = setInterval(refresh, interval);
  document.addEventListener('visibilitychange', refreshWhenDue, { signal });
  signal.addEventListener('abort', () => clearInterval(timer), { once: true });
}

/** Apply a validated snapshot without replacing unchanged reading or library surfaces. */
function applyNewsSnapshot(root, data, previous, { background, view }, render) {
  const previousArticle = background ? previous?.items.find(item => item.id === root.dataset.rssNewsId) : undefined;
  const changed = JSON.stringify(previous?.items) !== JSON.stringify(data.items);
  drawSync(root, data); drawSourceStatuses(root.querySelector('[data-rss-health]'), data.sources);
  if (!background || changed && view === 'novedades') render(previousArticle);
}

function renderLibrary(root, editorial, cards, query) {
  for (const node of editorial) root.querySelector(node.hasAttribute('data-rss-article-heading') ? '[data-rss-article-heading]' : '[data-rss-article-content]').replaceChildren(...[...node.childNodes].map(child => child.cloneNode(true)));
  drawLibrary(root, cards, query);
}

/** Own cancellable feed requests and their refresh lifecycle for one mounted reader. */
function createNewsLoader(root, signal, currentView, receive) {
  const refresh = root.querySelector('[data-rss-refresh]'), items = root.querySelector('[data-rss-items]');
  let request, checkedAt = 0;
  const finish = () => { refresh.disabled = false; items.removeAttribute('aria-busy'); };
  const load = async ({ background = false } = {}) => {
    request?.abort(); request = new AbortController();
    const combined = AbortSignal.any([signal, request.signal]);
    if (!background && currentView() === 'novedades') statusMessage(root, t('Cargando novedades…'));
    try {
      const data = await loadNews(root, combined);
      if (!combined.aborted) receive(data, background);
    } catch (error) {
      if (!background && !signal.aborted && error.name !== 'AbortError' && currentView() === 'novedades') statusMessage(root, t('No se pudieron cargar las novedades. Reintenta con Actualizar lista.'));
    } finally {
      if (!combined.aborted) { checkedAt = Date.now(); finish(); }
    }
  };
  refresh.addEventListener('click', load, { signal });
  mountNewsRefresh(signal, refresh, () => checkedAt, load);
  signal.addEventListener('abort', () => { request?.abort(); finish(); }, { once: true });
  return { load, hasRequest: () => Boolean(request) };
}

/** Monta pestañas accesibles y lecturas cancelables; los enlaces externos se muestran como texto inerte. */
export function mountRss(signal) {
  const pushRoot = document.querySelector("[data-certirss]");
  if (pushRoot) mountPush(pushRoot, signal);
  const root = document.querySelector('[data-certirss]');
  if (!root || root.dataset.mounted) return;
  root.dataset.mounted = 'true';
  const find = name => root.querySelector(`[data-rss-${name}]`);
  const query = find('query');
  const cards = [...root.querySelectorAll('[data-rss-resource]')], tabs = [...root.querySelectorAll('[data-rss-tab]')];
  let view, snapshot = snapshots.get(root);
  const editorial = ['article-heading', 'article-content'].map(name => find(name).cloneNode(true));
  const renderNews = previousArticle => drawNews(root, snapshot, query, previousArticle);
  const render = previousArticle => {
    find('clear').hidden = !query.value.trim();
    if (view === 'biblioteca') renderLibrary(root, editorial, cards, query); else renderNews(previousArticle);
  };
  const loader = createNewsLoader(root, signal, () => view, (data, background) => {
    const previous = snapshot; snapshot = data; snapshots.set(root, data);
    applyNewsSnapshot(root, data, previous, { background, view }, render);
  });
  const setView = value => {
    const requested = value.split('/')[0];
    view = ['biblioteca', 'novedades'].includes(requested) ? requested : root.dataset.rssInitial;
    syncMobileView(root, tabs, view);
    activateView(root, tabs, view);
    render();
    if (snapshot) drawSync(root, snapshot);
    else if (!loader.hasRequest()) void loader.load();
  };
  root.querySelector('form').addEventListener('submit', event => event.preventDefault(), { signal });
  query.addEventListener('input', () => render(), { signal });
  find('clear').addEventListener('click', () => { query.value = ''; query.focus(); render(); }, { signal });
  mountTabs(tabs, setView, signal);
  mountMobileReturn(root, signal);
  window.addEventListener('hashchange', () => setView(location.hash.slice(1)), { signal });
  matchMedia('(max-width: 800px)').addEventListener('change', () => setView(location.hash.slice(1)), { signal });
  setView(location.hash.slice(1));
}

/** Swap only the editorial article, retaining the reader list, query, snapshot and chat instance. */
export function replaceRss(fresh) {
  const root = document.querySelector('[data-certirss]'), next = fresh.querySelector('[data-certirss]');
  const list = root.querySelector('[data-rss-library]'), position = list.scrollTop;
  root.querySelector('[data-rss-detail]').replaceWith(next.querySelector('[data-rss-detail]'));
  root.dataset.rssSelected = next.dataset.rssSelected;
  root.dataset.rssSource = next.dataset.rssSource;
  root.dataset.rssInitial = next.dataset.rssInitial;
  delete root.dataset.mounted;
  return () => list.scrollTo({ top: position, behavior: 'instant' });
}
