const heading = node => node.nodeType === 1 && /^(H[1-6]|SUMMARY)$/.test(node.tagName);
const significant = node => node.nodeType === 1 || Boolean(node.textContent.trim());
const shallow = node => { const copy = node.cloneNode(false); copy.removeAttribute?.('id'); return copy; };

// Split at a DOM text boundary, retaining inline links/emphasis and every character.
function splitText(element) {
  const text = element.textContent;
  if (text.length < 2) return null;
  let cut = Math.ceil(text.length / 2);
  const nextSpace = text.indexOf(' ', cut);
  if (nextSpace >= 0 && nextSpace < text.length - 1) cut = nextSpace + 1;
  if (/^[\uDC00-\uDFFF]$/.test(text[cut]) && /^[\uD800-\uDBFF]$/.test(text[cut - 1])) cut++;
  const walker = element.ownerDocument.createTreeWalker(element, 4);
  let node, offset = cut;
  while ((node = walker.nextNode())) { if (offset <= node.length) break; offset -= node.length; }
  if (!node) return null;
  const left = shallow(element), right = shallow(element), range = element.ownerDocument.createRange();
  range.selectNodeContents(element); range.setEnd(node, offset); left.append(range.cloneContents());
  range.selectNodeContents(element); range.setStart(node, offset); right.append(range.cloneContents());
  return left.textContent && right.textContent ? [left, right] : null;
}

function splitTable(table) {
  const rows = [...table.tBodies].flatMap(body => [...body.rows]);
  if (rows.length < 2 || rows.some(row => [...row.cells].some(cell => cell.rowSpan > 1))) return null;
  const middle = Math.ceil(rows.length / 2);
  return [rows.slice(0, middle), rows.slice(middle)].map((part, index) => {
    const copy = shallow(table);
    for (const child of table.children) if (['CAPTION', 'COLGROUP', 'THEAD'].includes(child.tagName)) copy.append(child.cloneNode(true));
    const body = table.ownerDocument.createElement('tbody'); body.append(...part.map(row => row.cloneNode(true))); copy.append(body);
    if (index && table.tFoot) copy.append(table.tFoot.cloneNode(true));
    return copy;
  });
}

function splitDefinitions(list, children) {
  const groups = [[]];
  for (const child of children) {
    if (child.tagName === 'DT' && groups.at(-1).some(node => node.tagName === 'DD')) groups.push([]);
    groups.at(-1).push(child);
  }
  let parts;
  if (groups.length > 1) {
    const middle = Math.ceil(groups.length / 2); parts = [groups.slice(0, middle).flat(), groups.slice(middle).flat()];
  } else {
    const terms = children.filter(node => node.tagName === 'DT'), definitions = children.filter(node => node.tagName === 'DD');
    const divided = definitions.length > 1
      ? [definitions.slice(0, Math.ceil(definitions.length / 2)), definitions.slice(Math.ceil(definitions.length / 2))]
      : definitions.length === 1 ? splitBlock(definitions[0])?.map(node => [node]) : null;
    if (divided) parts = divided.map(nodes => [...terms, ...nodes]);
  }
  return parts?.map(nodes => { const copy = shallow(list); copy.append(...nodes.map(node => node.cloneNode(true))); return copy; }) || null;
}

function splitBlock(element) {
  if (element.nodeType === 3) {
    const span = element.ownerDocument.createElement('span'); span.textContent = element.textContent; return splitText(span);
  }
  if (element.nodeType !== 1 || element.matches('svg, img, canvas, video, button, input, select, textarea, [data-deck-keep]')) return null;
  if (element.tagName === 'TABLE') return splitTable(element);
  const children = [...element.childNodes].filter(significant);
  if (element.tagName === 'DL' && children.every(node => ['DT', 'DD'].includes(node.tagName))) return splitDefinitions(element, children);
  if (children.every(child => child.nodeType === 3 || child.matches?.('a, span, strong, em, code, b, i, small, br'))) return splitText(element);
  const titles = [];
  while (children.length > 1 && heading(children[0])) titles.push(children.shift());
  let parts;
  if (children.length > 1) {
    const middle = Math.ceil(children.length / 2); parts = [children.slice(0, middle), children.slice(middle)];
  } else if (children.length === 1) {
    const split = splitBlock(children[0]); if (split) parts = split.map(node => [node]);
  }
  if (!parts) return null;
  return parts.map((nodes, index) => {
    const copy = shallow(element); copy.append(...titles.map(node => node.cloneNode(true)), ...nodes.map(node => node.cloneNode(true)));
    if (index && element.tagName === 'OL') copy.start = (element.start || 1) + parts[0].filter(node => node.nodeType === 1).length;
    return copy;
  });
}

function fits(page) {
  return [page, ...page.querySelectorAll('*')].every(element => {
    if (!(element instanceof page.ownerDocument.defaultView.HTMLElement) || !element.clientHeight || !element.getClientRects().length) return true;
    // Descendant overflow matters too: fixed-height grid cards can clip while the page itself fits.
    return element.scrollHeight <= element.clientHeight + 2;
  });
}

function paginate(body, sources) {
  const doc = body.ownerDocument, pages = [];
  body.replaceChildren();
  const addPage = continuation => {
    const page = doc.createElement('section'); page.className = 'deck-page'; page.dataset.deckPage = '';
    if (continuation) page.dataset.deckContinuation = 'true';
    body.append(page); pages.push(page); return page;
  };
  for (const source of sources) {
    let page = addPage(false);
    const queue = [...source.childNodes].filter(significant).map(node => ({ node: node.cloneNode(true), depth: 0 }));
    while (queue.length) {
      const { node, depth } = queue.shift(); page.append(node);
      if (fits(page)) continue;
      node.remove();
      if (page.childNodes.length) { page = addPage(true); queue.unshift({ node, depth }); continue; }
      const pieces = depth < 24 ? splitBlock(node) : null;
      if (pieces) { queue.unshift(...pieces.map(part => ({ node: part, depth: depth + 1 }))); continue; }
      // An indivisible image, SVG, rowspan table or control remains whole. Scale its layout
      // instead of cropping it; ordinary prose and table rows have already been paginated.
      page.append(node);
      const wrapper = doc.createElement('div'); wrapper.dataset.deckFit = 'scaled';
      node.replaceWith(wrapper); wrapper.append(node);
      // Freeze the unscaled width: an auto-width block would grow as zoom falls,
      // making width:100% SVGs taller again and cancelling the intended fit.
      wrapper.style.width = `${page.clientWidth}px`; wrapper.style.display = 'flow-root'; wrapper.style.marginInline = 'auto';
      const natural = Math.max(wrapper.scrollHeight, ...[...wrapper.querySelectorAll('*')].map(element => element.scrollHeight || 0));
      wrapper.style.zoom = String(Math.min(1, page.clientHeight / Math.max(1, natural), page.clientWidth / Math.max(1, wrapper.scrollWidth)));
    }
  }
  return pages;
}

function highlight(host, selected) {
  const nodes = [...host.querySelectorAll('[data-select="node"]')], edges = [...host.querySelectorAll('[data-select="edge"][data-source][data-target]')];
  const focused = selected?.dataset, activeEdges = !focused ? [] : edges.filter(edge => focused.select === 'edge' ? edge.dataset.id === focused.id : edge.dataset.source === focused.id);
  const connected = new Set(activeEdges.flatMap(edge => [edge.dataset.source, edge.dataset.target]));
  if (focused?.select === 'node') connected.add(focused.id);
  for (const node of nodes) {
    const active = focused?.select === 'node' && node.dataset.id === focused.id;
    node.classList.toggle('is-active', active); node.classList.toggle('is-highlighted', active);
    node.classList.toggle('is-flow-target', Boolean(focused) && !active && connected.has(node.dataset.id));
    node.classList.toggle('is-muted', Boolean(focused) && !connected.has(node.dataset.id));
  }
  for (const edge of edges) { edge.classList.toggle('is-highlighted', activeEdges.includes(edge)); edge.classList.toggle('is-muted', Boolean(focused) && !activeEdges.includes(edge)); }
}

function mountDeck(host, view, signal) {
  const doc = host.ownerDocument, win = doc.defaultView, deck = host.querySelector('.search-deck'), body = deck.querySelector('.deck-body');
  const tabList = view.closest('.search-workspace')?.querySelector('#search-tab-list') || doc.getElementById('search-tab-list');
  const primary = tabList?.querySelector(`[data-tab="${deck.dataset.deckView}"]`);
  const originalTabs = [...(tabList?.querySelectorAll('[role="tab"]') || [])].map(tab => ({ tab, selected: tab.getAttribute('aria-selected'), tabIndex: tab.getAttribute('tabindex') }));
  const originalLabel = view.getAttribute('aria-labelledby');
  const sources = [...body.children].map(page => page.cloneNode(true));
  let pages = [], current = 0, frame = 0, rebuilding = false, measured = false, pageTabs = [];
  sources.flatMap(source => [...source.querySelectorAll('details')]).forEach((details, index) => { details.dataset.deckToggle = String(index); });
  function updateTabs() {
    if (!primary) return;
    const hadFocus = pageTabs.includes(doc.activeElement);
    pageTabs.filter(tab => tab !== primary).forEach(tab => tab.remove());
    primary.dataset.deckPageTarget = '0'; pageTabs = [primary];
    for (let index = 1; index < pages.length; index++) {
      const tab = doc.createElement('button'), label = doc.createElement('span');
      tab.type = 'button'; tab.id = `${primary.id}-page-${index + 1}`;
      tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', view.id);
      tab.dataset.deckPageTarget = String(index); tab.dataset.deckGenerated = '';
      label.className = 'tube-chapter-title'; label.textContent = `${primary.textContent.trim()} · ${index + 1}`;
      tab.append(label); pageTabs.at(-1).after(tab); pageTabs.push(tab);
    }
    if (hadFocus) pageTabs[Math.min(current, pageTabs.length - 1)]?.focus({ preventScroll: true });
    tabList.dispatchEvent(new win.Event('scroll'));
  }
  function show(index) {
    current = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page, i) => { page.hidden = i !== current; });
    const selected = pageTabs[current];
    if (selected) {
      for (const tab of tabList.querySelectorAll('[role="tab"]')) { tab.setAttribute('aria-selected', String(tab === selected)); tab.tabIndex = tab === selected ? 0 : -1; }
      view.setAttribute('aria-labelledby', selected.id);
      const bounds = tabList.getBoundingClientRect(), target = selected.getBoundingClientRect();
      if (target.left < bounds.left) tabList.scrollLeft -= bounds.left - target.left;
      else if (target.right > bounds.right) tabList.scrollLeft += target.right - bounds.right;
    }
    host.dataset.deckPageCount = String(pages.length); host.dataset.deckPageIndex = String(current);
    highlight(host, null);
  }
  function rebuild() {
    if (signal.aborted || !host.isConnected || !host.getClientRects().length) return;
    rebuilding = true; pages = paginate(body, sources); updateTabs(); show(current); rebuilding = false; measured = true;
  }
  function fit() {
    frame = 0; if (signal.aborted) return;
    const width = view.clientWidth, height = view.clientHeight;
    if (!width || !height) return;
    const scale = Math.min(width / 1280, height / 720);
    host.style.width = `${1280 * scale}px`; host.style.height = `${720 * scale}px`;
    host.style.setProperty('--search-deck-scale', String(scale));
    if (!measured) rebuild();
  }
  const schedule = () => { if (!frame) frame = win.requestAnimationFrame(fit); };
  const observer = new ResizeObserver(schedule); observer.observe(view);
  tabList?.addEventListener('click', event => {
    const tab = event.target.closest('[data-deck-page-target]');
    if (!pageTabs.includes(tab)) return;
    event.preventDefault(); event.stopPropagation(); show(Number(tab.dataset.deckPageTarget));
  }, { capture: true, signal });
  tabList?.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tab = event.target.closest('[role="tab"]'), tabs = [...tabList.querySelectorAll('[role="tab"]')], at = tabs.indexOf(tab);
    if (at < 0) return;
    event.preventDefault(); event.stopPropagation();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (at + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    tabs[next].click(); tabs[next].focus({ preventScroll: true });
  }, { capture: true, signal });
  for (const name of ['pointerover', 'mouseover', 'focusin']) host.addEventListener(name, event => highlight(host, event.target.closest('[data-select="node"], [data-select="edge"]')), { signal });
  for (const name of ['pointerleave', 'focusout']) host.addEventListener(name, event => { if (!host.contains(event.relatedTarget)) highlight(host, null); }, { signal });
  host.addEventListener('toggle', event => {
    if (rebuilding || !event.target.matches('details[data-deck-toggle]')) return;
    const original = sources.flatMap(source => [...source.querySelectorAll('details')]).find(details => details.dataset.deckToggle === event.target.dataset.deckToggle);
    if (original && original.open !== event.target.open) {
      original.open = event.target.open; rebuild();
      pages[current]?.querySelector(`[data-deck-toggle="${original.dataset.deckToggle}"] > summary`)?.focus({ preventScroll: true });
    }
  }, { capture: true, signal });
  doc.fonts?.ready.then(() => { if (!signal.aborted) rebuild(); });
  fit();
  return () => {
    observer.disconnect(); if (frame) win.cancelAnimationFrame(frame);
    pageTabs.filter(tab => tab !== primary).forEach(tab => tab.remove());
    if (primary) delete primary.dataset.deckPageTarget;
    for (const { tab, selected, tabIndex } of originalTabs) {
      if (selected === null) tab.removeAttribute('aria-selected'); else tab.setAttribute('aria-selected', selected);
      if (tabIndex === null) tab.removeAttribute('tabindex'); else tab.setAttribute('tabindex', tabIndex);
    }
    if (originalLabel === null) view.removeAttribute('aria-labelledby'); else view.setAttribute('aria-labelledby', originalLabel);
    tabList?.dispatchEvent(new win.Event('scroll'));
  };
}

export function mountDecks(view, signal) {
  if (!view || signal?.aborted) return () => {};
  const controller = new AbortController(), cleanups = [];
  const dispose = () => { controller.abort(); cleanups.forEach(cleanup => cleanup()); signal?.removeEventListener('abort', dispose); };
  signal?.addEventListener('abort', dispose, { once: true });
  for (const host of view.querySelectorAll('.search-deck-host')) cleanups.push(mountDeck(host, view, controller.signal));
  return dispose;
}
