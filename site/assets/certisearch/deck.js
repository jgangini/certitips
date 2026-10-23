// Measure the rendered font, including long words; character counts cannot predict SVG widths.
function measuredLabelLines(span, text, width) {
  const measure = value => { span.textContent = value; return span.getComputedTextLength(); };
  const lines = []; let line = '';
  for (const word of text.trim().split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (measure(next) <= width) { line = next; continue; }
    if (line) { lines.push(line); line = ''; }
    for (const character of word) {
      if (line && measure(line + character) > width) { lines.push(line); line = ''; }
      line += character;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Keep the icon and measured label centered together, using available card space without shrinking text.
function centerArchitectureLabel(node, label, card) {
  const bounds = label.getBBox(), center = card.x + card.width / 2;
  const image = node.querySelector('image'), marker = node.querySelector('.search-node-order');
  const gap = node.closest('[data-physical=true]') ? 8 : 12;
  const available = Math.max(0, card.height - bounds.height - gap - 12);
  const size = image ? Math.min(Number(image.getAttribute('height')), available) : marker.getBBox().height;
  const top = card.y + (card.height - size - gap - bounds.height) / 2;
  if (image) {
    for (const [element, padding] of [[image, 0], [node.querySelector('.node-icon-paper'), 6]]) {
      element.setAttribute('x', center - size / 2 - padding); element.setAttribute('y', top - padding);
      element.setAttribute('width', size + padding * 2); element.setAttribute('height', size + padding * 2);
    }
  } else {
    marker.setAttribute('y', '0'); marker.setAttribute('y', String(top - marker.getBBox().y));
  }
  label.setAttribute('y', String(top + size + gap - bounds.y));
}

// Reflow only overflowing labels after layout/font loading; source pages stay pristine for rebuilds.
function fitArchitectureLabel(node) {
  const label = node.querySelector('.node-service-name'), card = node.querySelector('.node-card').getBBox();
  const bounds = label.getBBox();
  if (bounds.x >= card.x && bounds.x + bounds.width <= card.x + card.width && bounds.y >= card.y && bounds.y + bounds.height <= card.y + card.height) return;
  const text = label.dataset.caption, span = label.firstElementChild.cloneNode(false);
  const lineHeight = parseFloat(label.ownerDocument.defaultView.getComputedStyle(label).fontSize) * 1.15;
  label.replaceChildren(span);
  const lines = measuredLabelLines(span, text, card.width - 16);
  label.setAttribute('y', '0');
  label.replaceChildren(...lines.map((text, index) => {
    const line = span.cloneNode(false); line.textContent = text; line.setAttribute('dy', String(index ? lineHeight : 0)); return line;
  }));
  centerArchitectureLabel(node, label, card);
}

function highlight(host, selected) {
  const nodes = [...host.querySelectorAll('[data-select="node"]')], edges = [...host.querySelectorAll('[data-select="edge"][data-source][data-target]')];
  const current = host.querySelector('.service-card[aria-current=true]');
  const focused = (selected || current)?.dataset, activeEdges = focused?.select === 'edge' ? edges.filter(edge => edge.dataset.id === focused.id) : [];
  const connected = new Set(activeEdges.flatMap(edge => [edge.dataset.source, edge.dataset.target]));
  for (const node of nodes) {
    const active = focused?.select === 'node' && node.dataset.id === focused.id;
    node.classList.toggle('is-active', active); node.classList.toggle('is-highlighted', active);
    node.classList.toggle('is-flow-target', Boolean(focused) && !active && connected.has(node.dataset.id));
    node.classList.toggle('is-muted', focused?.select === 'edge' && !connected.has(node.dataset.id));
  }
  for (const edge of edges) { edge.classList.toggle('is-highlighted', activeEdges.includes(edge)); edge.classList.toggle('is-muted', focused?.select === 'edge' && !activeEdges.includes(edge)); }
}

/** Fit one live view without splitting its content or adding navigation tabs. */
function mountDeck(host, view, signal) {
  const doc=host.ownerDocument,win=doc.defaultView;
  let frame=0;
  host.dataset.deckPageCount='1';host.dataset.deckPageIndex='0';
  function inspectComponent(target) {
    if(view.closest('[data-certisearch]')?.dataset.annotating==='true')return;
    const selected=target?.closest('[data-select="node"]');
    if(!selected||selected.getAttribute('aria-disabled')==='true')return;
    const details=host.querySelector('.service-band');if(!details)return;
    for(const card of details.querySelectorAll('.service-card')){
      if(card.dataset.id===selected.dataset.id)card.setAttribute('aria-current','true');else card.removeAttribute('aria-current');
    }
    details.open=true;highlight(host,selected);
    details.querySelector('.service-card[aria-current=true]')?.scrollIntoView({block:'nearest',inline:'nearest'});
  }
  host.addEventListener('click',event=>inspectComponent(event.target),{signal});
  doc.addEventListener('click',event=>{
    if(event.target.closest('.service-band,[data-select="node"]'))return;
    const details=host.querySelector('.service-band[open]');if(details)details.open=false;
  },{signal});
  host.addEventListener('keydown',event=>{
    if(['Enter',' '].includes(event.key)&&event.target.matches('.node[data-select="node"]')){event.preventDefault();inspectComponent(event.target);}
  },{signal});
  function fit() {
    frame=0;if(signal.aborted||!host.isConnected)return;
    const width=view.clientWidth,height=view.clientHeight;if(!width||!height)return;
    const scale=Math.min(width/1280,height/720);
    host.style.width=String(1280*scale)+'px';host.style.height=String(720*scale)+'px';
    host.style.setProperty('--search-deck-scale',String(scale));
    host.querySelectorAll('.search-svg .node').forEach(fitArchitectureLabel);
  }
  const schedule=()=>{if(!frame)frame=win.requestAnimationFrame(fit);};
  const observer=new ResizeObserver(schedule);observer.observe(view);
  for(const name of ['pointerover','mouseover','focusin'])host.addEventListener(name,event=>highlight(host,event.target.closest('[data-select="node"],[data-select="edge"]')),{signal});
  for(const name of ['pointerleave','focusout'])host.addEventListener(name,event=>{if(!host.contains(event.relatedTarget))highlight(host,null);},{signal});
  doc.fonts?.ready.then(()=>{if(!signal.aborted)fit();});fit();
  return ()=>{observer.disconnect();if(frame)win.cancelAnimationFrame(frame);};
}

export function mountDecks(view, signal) {
  if (!view || signal?.aborted) return () => {};
  const controller = new AbortController(), cleanups = [];
  const dispose = () => { controller.abort(); cleanups.forEach(cleanup => cleanup()); signal?.removeEventListener('abort', dispose); };
  signal?.addEventListener('abort', dispose, { once: true });
  for (const host of view.querySelectorAll('.search-deck-host')) cleanups.push(mountDeck(host, view, controller.signal));
  return dispose;
}
