import { t, language, siteBase } from '../site/i18n.js?v=283ef5ffed52';
import { relevantQuestions, stageName } from './case.js?v=283ef5ffed52';
import { architectureLayouts, architectureOverview, architectureNodeLabel, architectureNodePurpose, connectorPath, connectionLabel, serviceLayer, segments, wrapArchitectureText } from './architecture.js?v=283ef5ffed52';

export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const money = (value, currency, unitPrice=false) => value === null || value === undefined ? t('Pendiente') : new Intl.NumberFormat(language, { style: 'currency', currency, ...(unitPrice?{maximumFractionDigits:8}:{}) }).format(Number(value));
const button = (action, label, attrs = '') => `<button type="button" class="button button-secondary" data-action="${action}" ${attrs}>${esc(t(label))}</button>`;
const status = value => t(({ pending: 'Pendiente', answered: 'Respondida', confirmed: 'Confirmada', reviewed: 'Revisada', 'needs-review': 'Revisar de nuevo' })[value] || value);
const list = values => `<ul>${values.map(value => `<li>${esc(t(typeof value === 'string' ? value : value.text || value.title || value.label || value.description || value.id))}${typeof value==='object'&&value.status?` <span class="search-status">${esc(status(value.status))}</span>`:''}${value?.reason?`<p>${esc(value.reason)}</p>`:''}</li>`).join('')}</ul>`;
const empty = message => `<p class="search-empty">${esc(t(message))}</p>`;
const placeholderCopy = (title,message) => `<strong>${esc(t(title))}</strong><span class="search-placeholder-tag">${esc(t(message))}</span>`;
const previewPlaceholder = (title,message,attrs='',extraClass='') => `<div class="search-placeholder${extraClass?' '+extraClass:''}" data-deck-keep ${attrs}>${placeholderCopy(title,message)}</div>`;
// Presentation structure from OCI Architecture Diagram 0.4.10, render_case_deck_html.
// Keep the application shell and conversation state outside this presentation surface.
const deck = (title, subtitle, content, kind, overview=false) => `<div class="search-deck-host"><article class="search-deck deck" data-deck-view="${kind}"${overview?' data-deck-overview':''}><header class="deck-header"><h2${overview?' lang="en" translate="no"':''}>${esc(overview?({case:'Use Case',architecture:'Architecture',estimate:'Sizing',stages:'Proposal Stages'}[kind]||title):t(title))}</h2><p class="case-summary">${esc(t(subtitle))}</p></header><div class="deck-body"><section class="deck-page" data-deck-page>${content}</section></div></article></div>`;
const serviceIcons={aidp:'oci-ai-data-platform-workbench',lakehouse:'data-lakehouse',oac:'analytics',oke:'container-engine-for-kubernetes','api-gateway':'api-gateway','generative-ai':'oci-generative-ai'};

export function oracleChangesView(diff) {
  const fields={sku:'SKU',quantity:'Cantidad',hoursPerMonth:'Horas del mes',instances:'Instancias',multiplier:'Multiplicador',scenario:'Escenario',months:'Meses de coexistencia'};
  const display=value=>esc(t(({target:'Operación objetivo',transition:'Transición / coexistencia'})[value]||String(value??'—')));
  const rows=(before,after)=>Object.keys(fields).filter(key=>before?.[key]!==after?.[key]).map(key=>`<tr><th scope="row">${esc(t(fields[key]))}</th><td>${display(before?.[key])}</td><td>${display(after?.[key])}</td></tr>`).join('');
  const changes=[...(diff.added||[]).map(item=>({after:item})),...(diff.removed||[]).map(item=>({before:item})),...(diff.changed||[])];
  return `<p>${esc(t('Moneda'))}: ${display(diff.currency?.before)} → ${display(diff.currency?.after)}</p>${changes.map(({before,after})=>`<div class="search-card"><h3>${esc(after?.sku||before?.sku)}</h3><table class="search-table"><thead><tr><th>${esc(t('Parámetro'))}</th><th>${esc(t('Anterior'))}</th><th>${esc(t('Propuesto'))}</th></tr></thead><tbody>${rows(before,after)}</tbody></table></div>`).join('')}`;
}

export function proposalReview(proposal,current,catalog,profiles) {
  const headings={requirements:'Necesidades y requisitos',assumptions:'Supuestos y pendientes',decisions:'Requisitos y decisiones',alternatives:'Alternativas y decisiones',architecture:'Arquitectura de la solución',sizing:'Consumo OCI',stages:'Etapas',title:'Nombre del caso',mode:'Tipo de iniciativa',region:'Región OCI',currency:'Moneda',hoursPerMonth:'Horas del mes',answers:'Necesidades identificadas',imagePrompt:'Imagen del caso'};
  return `<p>${esc(proposal.reason)}</p><p>${esc(t('Se sustituirán las secciones indicadas. Revisa los elementos que se conservarán y los que se retirarán.'))}</p>${proposal.changes.map(change=>{
    const previous=change.section==='architecture'?[...current.architecture.nodes,...current.architecture.edges]:current[change.section];
    const next=change.section==='architecture'?[...change.value.nodes,...change.value.edges]:change.value;
    if(!Array.isArray(next))return `<section class="search-card"><h3>${esc(t(headings[change.section]))}</h3>${change.section==='answers'?list(Object.values(next).map(answer=>{let question;try{question=JSON.parse(answer.questionSnapshot).text;}catch{question=answer.questionSnapshot;}return `${question}: ${Array.isArray(answer.value)?answer.value.join(', '):answer.value}`;})):`<p>${esc(previous)} → ${esc(next)}</p>`}</section>`;
    const removed=previous.filter(item=>!next.some(value=>value.id===item.id));
    let content=list(next);
    if(change.section==='architecture')content=architectureSVG({...current,architecture:change.value},true,catalog.components)+architectureDescriptions(catalog,{...current,architecture:change.value});
    if(change.section==='sizing')content=next.map(line=>{const profile=profiles.find(item=>item.id===line.profileId);return `<h4>${esc(t(profile?.name||line.profileId))}</h4><p>${esc(t(line.scenario==='transition'?'Transición / coexistencia':'Operación objetivo'))}${line.months?` · ${esc(line.months)} ${esc(t('Meses de coexistencia'))}`:''}</p><dl>${Object.entries(line.parameters||{}).map(([key,value])=>`<dt>${esc(t(profile?.parameters.find(parameter=>parameter.key===key)?.label||key))}</dt><dd>${esc(value??t('Pendiente'))}${line.evidence?.[key]?.text?` · ${esc(line.evidence[key].text)}`:''}</dd>`).join('')}</dl>`;}).join('');
    if(change.section==='stages')content=next.map(stage=>`<h4>${esc(stageName(stage,catalog))}</h4>${stageDetails(stage)}`).join('');
    return `<section class="search-card"><h3>${esc(t(headings[change.section]))}</h3>${content}${removed.length?`<h4>${esc(t('Elementos que se retirarán'))}</h4>${list(removed)}`:''}</section>`;
  }).join('')}`;
}

function caseImage(current, illustration) {
  const source=illustration?.id===current.imageId && /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+=*$/.test(illustration?.dataUrl||'') ? illustration.dataUrl : null;
  return source?`<img class="case-image" src="${esc(source)}" alt="${esc(t('Imagen del caso'))}">`:`<span class="case-image-placeholder">${placeholderCopy('Imagen del Caso','Activa Anotar y pide al agente crear o editar la imagen del caso.')}</span>`;
}

function caseParagraphs(current) {
  // Prefer the confirmed narrative over incidental ordering of client/context requirements.
  // Legacy cases keep their first facts; the narrative scrolls without cutting its text.
  const narrative=current.requirements.filter(item=>item?.kind==='description');
  const selected=narrative.length?narrative:current.requirements.slice(0,3);
  const paragraphs=selected.flatMap(item=>String(typeof item==='string'?item:item.text||item.description||item.title||'').split(/\n\s*\n/u)).filter(text=>text.trim());
  return paragraphs.length?paragraphs:[t('El caso se construye durante la conversación. Comparte el objetivo y el asesor irá organizando la propuesta.')];
}

export function caseView(catalog, current, illustration) {
  const description=caseParagraphs(current).map(text=>`<p class="case-description">${esc(text)}</p>`).join('');
  return deck('Caso de uso','Resumen del propósito y del contexto funcional del caso de uso analizado.',`<div class="case-layout"><button type="button" class="case-visual" data-select="image" data-id="case-image" aria-label="${esc(t('Imagen del caso'))}">${caseImage(current,illustration)}</button><article class="case-content" data-select="section" data-id="use-case" role="button" tabindex="0" aria-label="${esc(t('Caso de uso'))}"><h3>${esc(current.title||t('De la necesidad a una solución clara'))}</h3><div class="case-narrative" tabindex="0" role="region" aria-label="${esc(t('Descripción del caso'))}">${description}</div></article></div>`,'case',true);
}

let diagramSequence=0;

/** Reading bands describe the declared resources, never inferred network/security boundaries. */
function overviewZones(layout,components) {
  const zones=[],labels=['Acceso y preparación','Datos y ejecución','Analítica e IA'],roles=[['aidp','api-gateway'],['lakehouse','oke'],['oac','generative-ai']];
  const columns=[...new Set(layout.boxes.map(box=>box.x))].sort((a,b)=>a-b),width=((layout.width||1280)-48)/layout.columns;
  for(let i=0;i<layout.columns;i++){
    const x=24+i*width,column=layout.boxes.filter(box=>box.x===columns[i]);
    const layers=[...new Set(column.map(box=>components.find(item=>item.id===box.node.componentId)?.layer||serviceLayer(box.node.serviceId)))];
    const label=layout.physical?(layers.length===1?layers[0]:'Servicios OCI'):column.every(box=>(roles[i]||[]).includes(box.node.serviceId))?labels[i]:'Servicios OCI';
    zones.push(`<g class="architecture-phase"><path d="M${x} 36 H${x+width-20} L${x+width} 66 L${x+width-20} 96 H${x} L${x+20} 66 Z"/><text x="${x+width/2}" y="74" text-anchor="middle">${esc(t(label==='Sistemas externos'?'Fuentes':label))}</text></g>`);
  }
  for(const zone of layout.zones)zones.push(`<g class="architecture-layer"><rect x="${zone.x}" y="${zone.y}" width="${zone.width}" height="${zone.height}" rx="12"/>${zone.label==='Arquitectura de la solución'?'':`<text x="${zone.x+24}" y="${zone.y+48}">${esc(t(zone.label))}</text>`}</g>`);
  return zones;
}

function architectureFigure(layout,current,components=[]) {
  const sequence=++diagramSequence,markerId=`search-arrow-${sequence}`,masks=[];
  const layerFor=node=>components.find(item=>item.id===(node.componentId||node.serviceId))?.layer||serviceLayer(node.serviceId);
  const zones=[],canvasHeight=layout.height||720,canvasWidth=layout.width||1280,viewWidth=layout.physical?canvasWidth-44:canvasWidth;
  // Center the painted overview, including phases and any routes outside its lanes.
  const verticalBounds=layout.overview?[36,...(layout.columns>1?[canvasHeight-32]:[]),...layout.zones.flatMap(zone=>[zone.y,zone.y+zone.height]),...layout.edges.flatMap(edge=>edge.points.map(point=>point.y))]:[];
  const viewTop=layout.overview?(Math.min(...verticalBounds)+Math.max(...verticalBounds)-canvasHeight)/2:0;
  if(layout.overview){
    zones.push(...overviewZones(layout,components));
  }else for(const x of new Set(layout.boxes.map(box=>box.x))){const column=layout.boxes.filter(box=>box.x===x),layer=layerFor(column[0].node),same=column.length>1&&column.every(box=>layerFor(box.node)===layer);
    if(same){const first=column[0],last=column.at(-1);zones.push(`<g class="architecture-layer"><rect x="${x-16}" y="${first.y-48}" width="${first.width+32}" height="${last.y+last.height-first.y+64}" rx="8"/><text x="${x}" y="${first.y-20}">${esc(t(layer))}</text></g>`);}
    else for(const box of column)zones.push(`<text class="architecture-layer-label" x="${box.x}" y="${box.y-20}">${esc(t(layerFor(box.node)))}</text>`);
  }
  const edges=layout.edges.map(connection=>{
    const edge=connection.edge,index=current.architecture.edges.findIndex(item=>item.id===edge.id)+1,d=connectorPath(connection.points,connection.hops),label=layout.overview?null:connectionLabel(connection,layout.boxes,masks,layout.edges.flatMap(item=>segments(item.points)),canvasHeight);if(label)masks.push(label);
    return `<g class="architecture-connection" data-kind="${esc(edge.kind||'')}" data-id="${esc(edge.id)}" data-source="${esc(edge.source)}" data-target="${esc(edge.target)}" aria-label="${esc(edge.label||edge.id)}"><title>${index}. ${esc(edge.label||edge.id)}</title><path class="search-edge" d="${d}" marker-end="url(#${markerId})"/>${label?`<rect class="connection-label-mask" x="${label.x}" y="${label.y}" width="${label.width}" height="${label.height}" rx="4"/><text class="search-edge-number" x="${label.x+label.width/2}" y="${label.y+23}" text-anchor="middle">${index}</text>`:''}</g>`;
  }).join('');
  const boxes=layout.boxes.map(({node,x,y,width,height,caption,lines,fontSize=26,iconSize=60})=>{
    const label=architectureNodeLabel(node),component=components.find(item=>item.id===(node.componentId||node.serviceId));
    const icon=component?.icon||(serviceIcons[node.serviceId]?`assets/oci/${serviceIcons[node.serviceId]}.svg`:null),order=current.architecture.nodes.findIndex(item=>item.id===node.id)+1;
    const gap=layout.physical?8:12,contentHeight=iconSize+gap+fontSize+(lines.length-1)*fontSize*1.15;
    const iconTop=layout.overview?y+(height-contentHeight)/2:y+Math.min(22,height*.1),textTop=layout.overview?iconTop+iconSize+fontSize+gap:y+112;
    return `<g class="node" data-service="${esc(node.serviceId||'')}" role="button" tabindex="0" data-select="node" data-id="${esc(node.id)}" aria-label="${esc(label)}"><title>${esc(label)}</title><rect class="node-card" data-node-id="${esc(node.id)}" x="${x}" y="${y}" width="${width}" height="${height}" rx="8"/>${icon?`<rect class="node-icon-paper" x="${x+width/2-iconSize/2-6}" y="${iconTop-6}" width="${iconSize+12}" height="${iconSize+12}" rx="6"/><image href="${siteBase}${icon}" x="${x+width/2-iconSize/2}" y="${iconTop}" width="${iconSize}" height="${iconSize}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"/>`:`<text class="search-node-order" x="${x+width/2}" y="${iconTop+iconSize}" text-anchor="middle">${String(order).padStart(2,'0')}</text>`}<text class="node-service-name" data-caption="${esc(caption)}" style="font-size:${fontSize}px" x="${x+width/2}" y="${textTop}" text-anchor="middle">${lines.map((line,index)=>`<tspan x="${x+width/2}" dy="${index?fontSize*1.15:0}">${esc(line)}</tspan>`).join('')}</text></g>`;
  }).join('');
  const guides=layout.overview?Array.from({length:layout.columns-1},(_,i)=>{const x=24+(i+1)*(canvasWidth-48)/layout.columns;return `<path class="architecture-column-guide" d="M${x} 108 V${canvasHeight-32}" aria-hidden="true"/>`;}).join(''):'';
  return `<figure class="search-architecture-figure" data-physical="${Boolean(layout.physical)}" data-deck-keep style="--architecture-width-scale:${canvasWidth/1280};--architecture-ratio:${viewWidth}/${canvasHeight}"><div class="search-diagram-scroll" tabindex="0" role="region" aria-label="${esc(t('Arquitectura de la solución'))}"><div class="architecture-svg-surface"><svg class="search-svg" viewBox="${layout.physical?22:0} ${viewTop} ${viewWidth} ${canvasHeight}" preserveAspectRatio="xMidYMid meet" role="group" aria-labelledby="architecture-title-${sequence}" aria-describedby="architecture-description-${sequence}"><title id="architecture-title-${sequence}">${esc(t('Arquitectura de la solución'))}</title><desc id="architecture-description-${sequence}">${esc(t('Flujo entre los componentes del caso. Las flechas representan las relaciones declaradas; no implican una topología de red.'))}</desc><defs><marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs><g class="architecture-artwork">${zones.join('')}${guides}${edges}${boxes}</g></svg></div></div></figure>`;
}

export function architectureSVG(current, includeRelations=true, components=[]) {
  if(!current.architecture.nodes.length)return empty('La arquitectura aparecerá a medida que el asesor identifique las necesidades y proponga componentes.');
  return architectureLayouts(current.architecture.nodes,current.architecture.edges).map(layout=>architectureFigure(layout,current,components)).join('')+(includeRelations?architectureRelations(current):'');
}

function architectureRelations(current) {
  const nodes=current.architecture.nodes;
  const relations=current.architecture.edges.map((edge,index)=>{const label=id=>{const node=nodes.find(node=>node.id===id);return node?architectureNodeLabel(node):id;};return `<li><button type="button" data-select="edge" data-id="${esc(edge.id)}" title="${esc(edge.label||edge.id)}"><span class="search-flow-number" aria-hidden="true">${index+1}</span><span>${esc(label(edge.source))} → ${esc(label(edge.target))}<small>${esc(edge.label||edge.id)}</small></span></button></li>`;}).join('');
  return relations?`<section class="architecture-relations"><h3>${esc(t('Relaciones entre componentes'))}</h3><ol class="search-flows">${relations}</ol></section>`:'';
}

export function architectureView(catalog,current) {
  const layout=architectureOverview(current.architecture.nodes,current.architecture.edges);
  const content=current.architecture.nodes.length?`<div class="architecture-layout" data-deck-keep><div class="architecture-canvas"><details class="service-band"><summary class="service-heading" lang="en" translate="no">Components</summary><div class="service-grid" tabindex="0">${architectureDescriptions(catalog,current,true,layout.boxes.map(box=>box.node))}</div></details>${architectureFigure(layout,current,catalog.components)}</div></div>`:previewPlaceholder('Arquitectura de la solución','Aquí aparecerán los componentes y sus conexiones a partir de la conversación.');
  return deck('Arquitectura','Vista de los servicios OCI, sus relaciones y el flujo de interacción de la solución.',content,'architecture',true);
}

function architectureDescriptions(catalog,current,summary=false,nodes=current.architecture.nodes) {
  return nodes.map(node=>{
    const service=catalog.services?.find(item=>item.id===node.serviceId),label=architectureNodeLabel(node)||service?.name;
    const description=architectureNodePurpose(node)||t(service?.description||'Propósito pendiente de definición.');
    if(!summary)return `<section class="service-card"><h4>${esc(label)}</h4><p>${esc(description)}</p></section>`;
    return `<button type="button" class="service-card" data-select="node" data-id="${esc(node.id)}" aria-description="${esc(description)}"><strong title="${esc(label)}">${esc(label)}</strong><p>${esc(description)}</p></button>`;
  }).join('');
}

function sizingView(current,profiles) {
  return current.sizing.filter(line=>line.profileId!=='oracle-import').map(line=>{const profile=profiles.find(item=>item.id===line.profileId);return `<section class="search-card"><h3><button class="search-link" type="button" data-select="sizing" data-id="${esc(line.id)}">${esc(t(profile?.name||line.profileId))}</button></h3><p>${esc(t(line.scenario==='transition'?'Transición / coexistencia':'Operación objetivo'))}</p><dl class="search-facts">${(profile?.parameters||Object.keys(line.parameters||{}).map(key=>({key,label:key}))).map(parameter=>`<div><dt>${esc(t(parameter.label||parameter.key))}</dt><dd>${esc(line.parameters[parameter.key]??t('Pendiente'))} ${esc(t(parameter.unit||''))}</dd></div>`).join('')}</dl></section>`;}).join('');
}

function sizingEvidence(current) {
  return current.sizing.filter(line=>Object.keys(line.evidence||{}).length).map(line=>`<details class="search-card"><summary>${esc(t('Origen de las cantidades'))}: ${esc(current.estimates.at(-1)?.lines.find(item=>item.sizingId===line.id)?.label||line.profileId)}</summary><dl>${Object.entries(line.evidence||{}).map(([key,evidence])=>`<dt>${esc(key)}: ${esc(line.parameters?.[key])}</dt><dd>${esc(t(({answer:'Respuesta',assumption:'Supuesto',user:'Valor introducido por el usuario'})[evidence.kind]||evidence.kind))} · ${esc(evidence.sourceId||'')} ${esc(evidence.text||'')}</dd>`).join('')}</dl></details>`).join('');
}

export function economicView(current) {
  const estimate=current.estimates.at(-1);
  if (!estimate) return `<p class="search-empty">${esc(t('El asesor preparará los recursos y sus cantidades a partir de la conversación.'))}</p>`;
  const currency=estimate.currency||current.currency;
  const lines=estimate.lines||[],max=Math.max(1,...lines.map(line=>Number(line.monthlyCost)||0));
  const subtotal=estimate.pending?.length&&lines.length&&estimate.knownSubtotal?`<aside class="search-card"><h4>${esc(t('Subtotal conocido; no incluye los recursos pendientes.'))}</h4><p>${esc(t('Objetivo mensual'))}: ${esc(money(estimate.knownSubtotal.targetMonthly,currency))} · ${esc(t('Primer año'))}: ${esc(money(estimate.knownSubtotal.firstYear,currency))}</p></aside>`:'';
  return `${estimate.stale?`<p class="search-notice">${esc(t('Los costos están pendientes de actualización.'))}</p>`:''}<p><span class="search-status">${esc(t(estimate.status==='complete'?'Estimación completa':'Estimación parcial'))}</span></p>
<div class="bom-head"><div class="search-total bom-metrics"><div class="metric"><span>${esc(t('Primer año'))}</span><strong>${esc(money(estimate.totals?.firstYear,currency))}</strong></div><div class="metric"><span>${esc(t('Objetivo mensual'))}</span><strong>${esc(money(estimate.totals?.targetMonthly,currency))}</strong></div><div class="metric"><span>${esc(t('Transición mensual'))}</span><strong>${esc(money(estimate.totals?.transitionMonthly,currency))}</strong></div></div></div>

${subtotal}<div class="search-table-scroll"><table class="search-table bom-table"><caption class="visually-hidden">${esc(t('Detalle del consumo OCI'))}</caption><thead><tr>${['Recurso','SKU','Unidad','Cantidad','Utilización','Precio unitario','Subtotal mensual'].map(label=>`<th scope="col">${esc(t(label))}</th>`).join('')}</tr></thead><tbody>${lines.map(line=>`<tr><td><button type="button" class="search-link" data-select="estimate" data-id="${esc(line.id)}">${esc(line.label)}</button><br>${esc(t(line.scenario==='transition'?'Transición / coexistencia':'Operación objetivo'))}</td><td>${esc(line.sku)}</td><td>${esc(line.unit)}</td><td>${esc(line.quantity)}</td><td>${/hour|hora/i.test(line.unit)?`${esc(line.instances||1)} × ${esc(line.hoursPerMonth??current.hoursPerMonth)} h`:'—'}</td><td>${esc(money(line.unitPrice,currency,true))}</td><td>${esc(money(line.monthlyCost,currency))}</td></tr>`).join('')}</tbody></table></div>
<div class="search-bars">${lines.map(line=>`<div class="search-bar"><button type="button" data-select="estimate" data-id="${esc(line.id)}"><span>${esc(line.label||line.sku)}</span>${line.monthlyCost===null||line.monthlyCost===undefined?'<span class="search-bar-pending" aria-hidden="true">—</span>':`<meter min="0" max="${max}" value="${Number(line.monthlyCost)}" aria-label="${esc(line.label)}"></meter>`}<span>${esc(money(line.monthlyCost,currency))}</span></button></div>`).join('')}</div>
${sizingEvidence(current)}${estimate.pending?.length?`<h3>${esc(t('Pendientes del cálculo'))}</h3>${list(estimate.pending.map(item=>item.reason))}`:''}<p class="search-muted">${esc(t(estimate.pricingPolicy||''))}</p><p class="search-muted">${esc(t(estimate.availability||''))}</p><p class="search-muted">${esc(t('Catálogo consultado'))}: ${esc(estimate.source?.fetchedAt?.slice(0,10)||t('Pendiente'))} · ${esc(t('Versión'))}: ${esc(estimate.source?.catalogBuild?.buildNumber||t('Pendiente'))}</p>${sourceLinks(estimate.source?.url?[{url:estimate.source.url,title:t('Catálogo público de precios Oracle')}]:[])}`;
}

function slideNotes(notes) {
  return `<div class="search-slide-notes">${notes.map((note,index)=>`<p class="sizing-report-note">${'*'.repeat(index+1)} ${esc(note)}</p>`).join('')}</div>`;
}

export function estimateView(current,profiles,catalog) {
  const estimate=current.estimates.at(-1),currency=estimate?.currency||current.currency,rows=sizingSummary(current,catalog);
  const rounding=rows.length&&['target','annual'].some(key=>{const total=priceCents(estimate?.totals?.[key==='target'?'targetMonthly':'firstYear']);return total!==null&&rows.every(row=>row[key]!==null)&&rows.reduce((sum,row)=>sum+priceCents(row[key]),0n)!==total;});
  const table=`<table class="search-table sizing-summary-table" data-select="section" data-id="sizing" tabindex="0" aria-label="${esc(t('Resumen por servicio'))}"><caption class="visually-hidden">${esc(t('Resumen por servicio'))}</caption><thead><tr>${['Servicio','Región','Partidas','Costo mensual','Costo anual'].map(label=>`<th scope="col">${esc(t(label))}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr data-service-id="${esc(row.id)}"><th scope="row">${esc(row.name)}</th><td translate="no">${esc(row.region||'—')}</td><td>${row.resources||'—'}</td><td>${esc(money(row.target,currency))}</td><td>${esc(money(row.annual,currency))}</td></tr>`).join('')}</tbody><tfoot><tr><th scope="row">${esc(t('Total'))}</th><td>—</td><td>${estimate?.lines?.length||'—'}</td><td>${esc(money(estimate?.totals?.targetMonthly,currency))}</td><td>${esc(money(estimate?.totals?.firstYear,currency))}</td></tr></tfoot></table>`;
  const notes=[t('El costo mensual es recurrente; el anual incluye los meses de transición.'),t('El informe PDF incluye recursos, cantidades, precios y evidencias.')+(rounding?' '+t('El total del expediente puede diferir por redondeo.'):'')];
  if(catalog)notes.push(t('El catálogo de precios no confirma disponibilidad regional. Revisa también modelos, capacidades y restricciones del servicio.'));
  const content=rows.length?`<div class="sizing-overview" data-deck-keep>${estimate?.stale?`<p class="search-notice">${esc(t('Los costos están pendientes de actualización.'))}</p>`:''}${table}${slideNotes(notes)}</div>`:previewPlaceholder('Resumen por servicio','Aquí aparecerán los recursos, sus cantidades y los costos estimados.','data-select="section" data-id="sizing" role="group" tabindex="0"');
  return deck('Sizing','Resumen por servicio',content,'estimate',true);
}

function priceCents(value) {
  const price=String(value??'');if(!/^\d+(?:\.\d{1,2})?$/.test(price))return null;
  const [whole,fraction='']=price.split('.');return BigInt(whole)*100n+BigInt(fraction.padEnd(2,'0'));
}

export function sizingSummary(current,catalog) {
  const estimate=current.estimates.at(-1),groups=new Map();
  const group=id=>{if(!groups.has(id))groups.set(id,{id,name:t(catalog?.services?.find(service=>service.id===id)?.name||catalog?.components?.find(component=>component.id===id)?.name||id),region:estimate?.region||current.region,resources:0,target:0n,transition:0n,annual:0n,pending:!estimate,unknown:new Set()});return groups.get(id);};
  for(const item of [...current.architecture.nodes,...current.sizing])if(item.serviceId)group(item.serviceId);
  for(const line of estimate?.lines||[]){const source=current.sizing.find(item=>item.id===line.sizingId),id=line.serviceId||source?.serviceId||'oracle',row=group(id),scenario=line.scenario==='transition'?'transition':'target';row.resources++;
    const price=priceCents(line.monthlyCost);
    if(price===null){row.pending=true;row.unknown.add(scenario);continue;}
    row[scenario]+=price;
    const months=scenario==='transition'?Number(line.months??source?.months??12):12;
    if(Number.isInteger(months)&&months>=1&&months<=12)row.annual+=price*BigInt(months);
    else{row.pending=true;row.unknown.add('annual');}
  }
  for(const pending of estimate?.pending||[]){const source=current.sizing.find(item=>item.id===pending.sizingId),id=source?.serviceId||pending.serviceId;
    for(const row of id?[group(id)]:groups.values()){row.pending=true;row.unknown.add(source?.scenario==='transition'?'transition':'target');}
  }
  const amount=value=>`${value/100n}.${String(value%100n).padStart(2,'0')}`;
  return [...groups.values()].map(row=>({...row,pending:row.pending||!row.resources,target:row.unknown.has('target')||!row.resources?null:amount(row.target),transition:row.unknown.has('transition')||!row.resources?null:amount(row.transition),annual:row.unknown.size||!row.resources?null:amount(row.annual),unknown:undefined}));
}

export function regionReview(current,catalog) {
  const serviceIds=[...new Set([...current.architecture.nodes,...current.sizing].map(item=>item.serviceId))];
  const decision=current.decisions.find(item=>item.kind==='regional-availability'&&item.region===current.region);
  return `<details class="search-card"><summary>${esc(t('Revisión de disponibilidad regional'))}</summary><p>${esc(t('El catálogo de precios no confirma disponibilidad regional. Revisa también modelos, capacidades y restricciones del servicio.'))}</p><p>${esc(current.region||t('Región pendiente'))}: ${esc(serviceIds.map(id=>catalog.services.find(service=>service.id===id)?.name||id).join(', '))}</p>${sourceLinks([{url:'https://www.oracle.com/cloud/public-cloud-regions/data-regions/',title:t('Disponibilidad de servicios OCI por región')}])}${decision?`<p>${esc(decision.text||'')} · ${esc(status(decision.status))}</p>${sourceLinks([{url:decision.sourceUrl}])}${button('region-review','Confirmar revisión regional',`data-id="${esc(decision.id)}"`)}`:''}</details>`;
}

const stageBriefs={discover:'Objetivo y restricciones',compare:'Capacidades y alternativas',design:'Componentes y flujos',estimate:'Recursos y costos',present:'Alcance y siguiente decisión'};

function stageBrief(stage,reference) {
  if(stage.description)return stage.description;
  const delivery=stage.deliverables?.[0],text=typeof delivery==='string'?delivery:delivery?.text||delivery?.title;
  return text||t(stageBriefs[stage.id]||reference?.description||'');
}

/** Render only the recorded plan, in its proposed order; never append missing catalog stages. */
function stagePlan(catalog,current) {
  return current.stages.map(stage=>{
    const reference=catalog.stages.find(item=>item.id===stage.id);
    return {...stage,name:stageName(stage,catalog),description:stage.description||t(reference?.description||''),brief:stageBrief(stage,reference)};
  });
}

function stageDetails(stage) {
  const asList=value=>Array.isArray(value)?value:typeof value==='string'?[value]:[];
  const responsibilities=asList(stage?.responsibles||stage?.responsible);
  const criteria=asList(stage?.advanceCriteria||stage?.sufficiency);
  const owners=responsibilities.map(item=>typeof item==='string'?item:[item.role,item.text||item.description||item.title].filter(value=>typeof value==='string'&&value).join(': '));
  return `${list(stage?.deliverables||[])}${owners.length?`<h4>${esc(t('Responsables'))}</h4>${list(owners)}`:''}${criteria.length?`<h4>${esc(t('Criterios de avance propuestos'))}</h4>${list(criteria)}`:''}${stage?.waves?.length?`<h4>${esc(t('Oleadas de migración'))}</h4>${list(stage.waves)}`:''}`;
}

export function stagesDiagram(catalog,current) {
  const plan=stagePlan(catalog,current),active=plan.find(stage=>stage.status!=='reviewed')?.id;
  return `<section class="search-stage-diagram search-gantt" data-select="section" data-id="stages" role="group" tabindex="0" aria-label="${esc(t('Etapas de la propuesta'))}" data-deck-keep style="--stage-count:${Math.max(1,plan.length)}"><div class="gantt-scroll" tabindex="0" role="region" aria-label="${esc(t('Cronograma de etapas'))}"><div class="gantt-grid"><div class="gantt-axis"><span>${esc(t('Secuencia de referencia'))}</span><div>${plan.map((_,index)=>`<span>${String(index+1).padStart(2,'0')}</span>`).join('')}</div></div><ol>${plan.map((stage,index)=>{
    return `<li class="stage-gantt-row" data-state="${esc(stage.status||'pending')}"${stage.id===active?' data-current="true"':''}><div class="gantt-label"><button type="button" class="stage-heading" data-select="stage" data-id="${esc(stage.id)}"><strong>${esc(t(stage.name))}</strong></button><small aria-description="${esc(stage.description)}">${esc(stage.brief)}</small></div><div class="gantt-track"><button type="button" class="gantt-bar" style="grid-column:${index+1}" data-select="stage" data-id="${esc(stage.id)}" aria-label="${esc(t(stage.name)+': '+status(stage.status||'pending'))}">${esc(status(stage.status||'pending'))}</button></div></li>`;
  }).join('')}</ol></div></div><div class="gantt-legend"><span><i data-legend="current" aria-hidden="true"></i>${esc(t('Etapa actual'))}</span><span><i aria-hidden="true"></i>${esc(t('Pendiente'))}</span><span><i data-legend="reviewed" aria-hidden="true"></i>${esc(t('Revisada'))}</span></div>${slideNotes([t('Las fechas y duraciones se definirán durante la conversación.')])}</section>`;
}

export function stagesView(catalog,current,embedded=false) {
  const plan=stagePlan(catalog,current);
  const details=`<div class="search-stage-grid">${plan.map((stage,index)=>`<section class="search-stage" data-state="${esc(stage.status||'pending')}"><header><span class="search-service-order" aria-hidden="true">${String(index+1).padStart(2,'0')}</span><span class="search-status">${esc(status(stage.status||'pending'))}</span></header><h3><button class="search-link" type="button" data-select="stage" data-id="${esc(stage.id)}">${esc(t(stage.name))}</button></h3><p>${esc(stage.description)}</p>${stageDetails(stage)}${stage.dependencies?.length?`<p>${esc(t('Dependencias'))}: ${esc(stage.dependencies.map(id=>stageName(current.stages.find(item=>item.id===id)||{id},catalog)).join(', '))}</p>`:''}${stage.clientAcceptedAt?`<p>${esc(t('Aceptación del cliente registrada'))}: ${esc(stage.clientAcceptedAt)}</p>`:''}<div class="search-inline-actions">${button('review-stage','Confirmar revisión',`data-id="${esc(stage.id)}"`)}${button('accept-stage','Registrar aceptación del cliente',`data-id="${esc(stage.id)}"`)}</div></section>`).join('')}</div>`;
  // The catalog supplies reference stages before a case has an actual proposed plan.
  const hasPlan=current.stages.some(({id,status,...content})=>status&&status!=='pending'||Object.values(content).some(value=>Array.isArray(value)?value.length:Boolean(value)));
  const diagram=hasPlan?stagesDiagram(catalog,current):previewPlaceholder('Etapas de la propuesta','Aquí aparecerán las etapas, los entregables y el avance de la propuesta.','data-select="section" data-id="stages" role="group" tabindex="0"','search-stage-diagram');
  return embedded?stagesSVG(catalog,current)+details:deck('Etapas de la propuesta','Avance de la propuesta y próximos pasos por etapa.',diagram,'stages',true);
}

function stageSVGRow({stage,lines,y,height},index,count) {
  const barY=y+(height-36)/2,x=350+index*514/Math.max(1,count-1),textY=y+(height-lines.length*20)/2+16;
  return `<g><text x="24" y="${textY}" fill="#17223b" font-size="16" font-family="sans-serif">${lines.map((line,i)=>`<tspan x="24" dy="${i?20:0}">${esc(line)}</tspan>`).join('')}</text><line x1="340" x2="976" y1="${y+height-6}" y2="${y+height-6}" stroke="#cbd5e1"/><rect x="${x}" y="${barY}" width="112" height="36" rx="5" fill="${stage.status==='reviewed'?'#236c70':'#353e50'}"/><text x="${x+56}" y="${barY+23}" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">${esc(status(stage.status||'pending'))}</text></g>`;
}

/** Portable vector of the actual recorded stages; columns indicate order, never invented dates. */
export function stagesSVG(catalog,current) {
  const plan=stagePlan(catalog,current);let nextY=58;
  const rows=plan.map(stage=>{const lines=wrapArchitectureText(t(stage.name||stage.id),32),height=Math.max(76,lines.length*20+24),row={stage,lines,y:nextY,height};nextY+=height;return row;});
  const height=nextY+36;
  return `<svg class="search-stage-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 ${height}" role="img" aria-label="${esc(t('Etapas de la propuesta'))}"><rect width="1000" height="${height}" fill="#f4f6f8"/><text x="24" y="30" fill="#17223b" font-size="18" font-family="sans-serif">${esc(t('Secuencia de referencia'))}</text>${rows.map((row,index)=>stageSVGRow(row,index,plan.length)).join('')}<text x="24" y="${height-14}" fill="#4b5563" font-size="13" font-family="sans-serif">${esc(t('Las fechas y duraciones se definirán durante la conversación.'))}</text></svg>`;
}

/** Optional editorial kinds enrich new cases; untyped legacy requirements remain fully visible. */
export function managerialSections(current) {
  const groups=[['client','Información del cliente'],['context','Contexto'],['background','Antecedentes'],['description','Descripción del caso'],['objective','Objetivos'],['acceptance','Criterios de evaluación y aceptación'],['capability','Capacidades a validar']];
  const known=new Set(groups.map(([kind])=>kind));
  return groups.map(([kind,title])=>({id:kind,title,items:current.requirements.filter(item=>item.kind===kind||kind==='description'&&!known.has(item.kind))}));
}

function reportTranscript(current) {
  return current.history.map((turn,index)=>`<article class="report-turn" data-turn="${index+1}"><h4>${String(index+1).padStart(2,'0')} · ${esc(t(turn.role==='user'?'Cliente':'Asesor'))}${turn.createdAt?` · <time datetime="${esc(turn.createdAt)}">${esc(turn.createdAt)}</time>`:''}</h4><p>${esc(turn.text)}</p></article>`).join('')||empty('Pendiente de descubrimiento.');
}

export function reportView(catalog,current,illustration,profiles=[]) {
  const section=(id,title,content)=>`<section class="report-section" id="report-${id}" data-report-section="${id}"><h3>${esc(t(title))}</h3>${content}</section>`;
  const pending=relevantQuestions(catalog,current).filter(question=>current.answers[question.id]?.status==='pending');
  const narrative=managerialSections(current).map(group=>section(group.id,group.title,group.items.length?list(group.items):empty('Pendiente de descubrimiento.'))).join('');
  return `<article class="search-report" data-case-id="${esc(current.id)}" data-case-revision="${current.revision}"><header class="report-cover"><p class="report-eyebrow">CertiSearch · ${esc(t('Propuesta de solución'))}</p><h2>${esc(current.title||t('Propuesta de solución'))}</h2><p>${esc(t('Acta y propuesta de solución'))}</p>${illustration?`<div class="case-report-image">${caseImage(current,illustration)}</div>`:''}<dl class="report-metadata"><dt>${esc(t('Región OCI'))}</dt><dd>${esc(current.region||t('Pendiente'))}</dd><dt>${esc(t('Moneda'))}</dt><dd>${esc(current.currency)}</dd><dt>${esc(t('Revisión'))}</dt><dd>${current.revision}</dd><dt>${esc(t('Última actualización'))}</dt><dd>${esc(current.updatedAt)}</dd></dl><p class="report-disclaimer">${esc(t('Documento de trabajo. Las revisiones y aceptaciones constan únicamente cuando han sido registradas expresamente.'))}</p></header>
${narrative}${section('decisions','Alternativas y decisiones',list([...current.alternatives,...current.decisions]))}
${section('architecture','Arquitectura de la solución',architectureSVG(current,true,catalog.components)+architectureDescriptions(catalog,current))}
${section('sizing','Sizing detallado',economicView(current)+sizingView(current,profiles)+regionReview(current,catalog))}
${section('assumptions','Asunciones y consideraciones',list(current.assumptions)+`<h4>${esc(t('Preguntas pendientes'))}</h4>${list(pending.map(question=>question.text))}`)}
${section('stages','Etapas de la propuesta',stagesView(catalog,current,true))}
${section('minutes','Acta de reunión',`<p>${esc(t('Síntesis basada en los requisitos, decisiones y pendientes del expediente. El anexo conserva las preguntas y respuestas registradas, en su orden original.'))}</p><h4>${esc(t('Necesidades y requisitos'))}</h4>${list(current.requirements)}<h4>${esc(t('Requisitos y decisiones'))}</h4>${list(current.decisions)}<h4>${esc(t('Supuestos y pendientes'))}</h4>${list(current.assumptions)}`)}
${section('sources','Fuentes',sourceLinks(current.sources))}${section('transcript','Anexo: conversación del expediente',reportTranscript(current))}</article>`;
}

export function sourceLinks(sources) {
  const links=sources.filter(source=>{try{return ['https:'].includes(new URL(source.url).protocol);}catch{return false;}});
  return `<ul class="search-sources">${links.map(source=>`<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title||source.url)}</a></li>`).join('')}</ul>`;
}
