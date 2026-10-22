import { t, language, siteBase } from '../site/i18n.js?v=b3b939609c94';
import { relevantQuestions } from './case.js?v=b3b939609c94';
import { architectureLayouts, architectureOverview, connectorPath, connectionLabel, serviceLayer, segments } from './architecture.js?v=b3b939609c94';

export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const money = (value, currency, unitPrice=false) => value === null || value === undefined ? t('Pendiente') : new Intl.NumberFormat(language, { style: 'currency', currency, ...(unitPrice?{maximumFractionDigits:8}:{}) }).format(Number(value));
const button = (action, label, attrs = '') => `<button type="button" class="button button-secondary" data-action="${action}" ${attrs}>${esc(t(label))}</button>`;
const status = value => t(({ pending: 'Pendiente', answered: 'Respondida', confirmed: 'Confirmada', reviewed: 'Revisada', 'needs-review': 'Revisar de nuevo' })[value] || value);
const list = values => `<ul>${values.map(value => `<li>${esc(t(typeof value === 'string' ? value : value.text || value.title || value.label || value.description || value.id))}${typeof value==='object'&&value.status?` <span class="search-status">${esc(status(value.status))}</span>`:''}${value?.reason?`<p>${esc(value.reason)}</p>`:''}</li>`).join('')}</ul>`;
const empty = message => `<p class="search-empty">${esc(t(message))}</p>`;
// Presentation structure from OCI Architecture Diagram 0.4.10, render_case_deck_html.
// Keep the application shell and conversation state outside this presentation surface.
const deck = (title, subtitle, content, kind, overview=false) => `<div class="search-deck-host"><article class="search-deck deck" data-deck-view="${kind}"${overview?' data-deck-overview':''}><header class="deck-header"><h2${overview?' lang="en" translate="no"':''}>${esc(overview?({case:'Use Case',architecture:'Architecture',estimate:'Sizing',stages:'Proposal Stages'}[kind]||title):t(title))}</h2><div class="oracle-badge deck-provider" lang="en" translate="no"><svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M21.272 22.141h-10.538c-3.338-0.070-6.017-2.793-6.017-6.141s2.679-6.071 6.011-6.141l0.007-0h10.538c0.003 0 0.007 0 0.011 0 3.391 0 6.141 2.749 6.141 6.141s-2.749 6.141-6.141 6.141c-0.004 0-0.008 0-0.012 0h0.001zM21.513 6.518h-11.022c-5.234 0.004-9.474 4.248-9.474 9.482 0 5.231 4.235 9.472 9.463 9.482h11.033c5.231-0.008 9.469-4.25 9.469-9.482s-4.238-9.474-9.468-9.482h-0.001z"/></svg><span>Oracle Cloud Infrastructure</span></div><p class="case-summary">${esc(t(subtitle))}</p></header><div class="deck-body">${(Array.isArray(content)?content:[content]).map((page,index)=>`<section class="deck-page" data-deck-page ${index?'hidden':''}>${page}</section>`).join('')}</div></article></div>`;
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
    if(change.section==='architecture')content=architectureSVG({...current,architecture:change.value});
    if(change.section==='sizing')content=next.map(line=>{const profile=profiles.find(item=>item.id===line.profileId);return `<h4>${esc(t(profile?.name||line.profileId))}</h4><p>${esc(t(line.scenario==='transition'?'Transición / coexistencia':'Operación objetivo'))}${line.months?` · ${esc(line.months)} ${esc(t('Meses de coexistencia'))}`:''}</p><dl>${Object.entries(line.parameters||{}).map(([key,value])=>`<dt>${esc(t(profile?.parameters.find(parameter=>parameter.key===key)?.label||key))}</dt><dd>${esc(value)}${line.evidence?.[key]?.text?` · ${esc(line.evidence[key].text)}`:''}</dd>`).join('')}</dl>`;}).join('');
    if(change.section==='stages')content=next.map(stage=>`<h4>${esc(catalog.stages.find(item=>item.id===stage.id)?.name||stage.id)}</h4>${list(stage.deliverables||[])}${list(stage.waves||[])}`).join('');
    return `<section class="search-card"><h3>${esc(t(headings[change.section]))}</h3>${content}${removed.length?`<h4>${esc(t('Elementos que se retirarán'))}</h4>${list(removed)}`:''}</section>`;
  }).join('')}`;
}

function caseImage(current, illustration) {
  const source=illustration?.id===current.imageId && /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+=*$/.test(illustration?.dataUrl||'') ? illustration.dataUrl : null;
  return source?`<img class="case-image" src="${esc(source)}" alt="${esc(t('Imagen del caso'))}">`:`<span class="case-image-placeholder"><strong>${esc(t('Imagen del caso'))}</strong><span>${esc(t('Activa Anotar y pide al agente crear o editar la imagen del caso.'))}</span></span>`;
}

export function caseView(catalog, current, illustration) {
  const requirements=current.requirements.map(item=>typeof item==='string'?item:item.text||item.description||item.title).filter(Boolean);
  const description=requirements.slice(0,3).join(' · '),summary=description.length>520?`${description.slice(0,517).replace(/\s+\S*$/,'')}…`:description;
  return deck('Caso de uso','Resumen del propósito y del contexto funcional del caso de uso analizado.',`<div class="case-layout"><button type="button" class="case-visual" data-select="image" data-id="case-image" aria-label="${esc(t('Imagen del caso'))}">${caseImage(current,illustration)}</button><article class="case-content"><h3>${esc(current.title||t('De la necesidad a una solución clara'))}</h3><p class="case-description">${esc(summary||t('El caso se construye durante la conversación. Comparte el objetivo y el asesor irá organizando la propuesta.'))}</p></article></div>`,'case',true);
}

let diagramSequence=0;

function architectureFigure(layout,current) {
  const sequence=++diagramSequence,markerId=`search-arrow-${sequence}`,masks=[];
  const zones=[],canvasHeight=layout.height||720;
  // Center the painted overview, including phases and any routes outside its lanes.
  const verticalBounds=layout.overview?[36,...layout.zones.flatMap(zone=>[zone.y,zone.y+zone.height]),...layout.edges.flatMap(edge=>edge.points.map(point=>point.y))]:[];
  const viewTop=layout.overview?(Math.min(...verticalBounds)+Math.max(...verticalBounds)-canvasHeight)/2:0;
  if(layout.overview){
    const labels=['Acceso y preparación','Datos y ejecución','Analítica e IA'],roles=[['aidp','api-gateway'],['lakehouse','oke'],['oac','generative-ai']],columns=[...new Set(layout.boxes.map(box=>box.x))].sort((a,b)=>a-b),width=1232/layout.columns;
    for(let i=0;i<layout.columns;i++){const x=24+i*width,label=layout.boxes.filter(box=>box.x===columns[i]).every(box=>roles[i].includes(box.node.serviceId))?labels[i]:'Servicios OCI';zones.push(`<g class="architecture-phase"><path d="M${x} 36 H${x+width-20} L${x+width} 66 L${x+width-20} 96 H${x} L${x+20} 66 Z"/><text x="${x+width/2}" y="74" text-anchor="middle">${esc(t(label))}</text></g>`);}
    for(const zone of layout.zones)zones.push(`<g class="architecture-layer"><rect x="${zone.x}" y="${zone.y}" width="${zone.width}" height="${zone.height}" rx="12"/><text x="${zone.x+24}" y="${zone.y+48}">${esc(t(zone.label))}</text></g>`);
  }else for(const x of new Set(layout.boxes.map(box=>box.x))){const column=layout.boxes.filter(box=>box.x===x),layer=serviceLayer(column[0].node.serviceId),same=column.length>1&&column.every(box=>serviceLayer(box.node.serviceId)===layer);
    if(same){const first=column[0],last=column.at(-1);zones.push(`<g class="architecture-layer"><rect x="${x-16}" y="${first.y-48}" width="${first.width+32}" height="${last.y+last.height-first.y+64}" rx="8"/><text x="${x}" y="${first.y-20}">${esc(t(layer))}</text></g>`);}
    else for(const box of column)zones.push(`<text class="architecture-layer-label" x="${box.x}" y="${box.y-20}">${esc(t(serviceLayer(box.node.serviceId)))}</text>`);
  }
  const edges=layout.edges.map(connection=>{
    const edge=connection.edge,index=current.architecture.edges.findIndex(item=>item.id===edge.id)+1,d=connectorPath(connection.points,connection.hops),label=layout.overview?null:connectionLabel(connection,layout.boxes,masks,layout.edges.flatMap(item=>segments(item.points)),canvasHeight);if(label)masks.push(label);
    return `<g class="architecture-connection" data-id="${esc(edge.id)}" data-source="${esc(edge.source)}" data-target="${esc(edge.target)}" aria-label="${esc(edge.label||edge.id)}"><title>${index}. ${esc(edge.label||edge.id)}</title><path class="search-edge" d="${d}" marker-end="url(#${markerId})"/>${label?`<rect class="connection-label-mask" x="${label.x}" y="${label.y}" width="${label.width}" height="${label.height}" rx="4"/><text class="search-edge-number" x="${label.x+label.width/2}" y="${label.y+23}" text-anchor="middle">${index}</text>`:''}</g>`;
  }).join('');
  const boxes=layout.boxes.map(({node,x,y,width,height,caption,lines,fontSize=26,iconSize=60})=>{
    const label=node.label||node.serviceId||node.id,icon=serviceIcons[node.serviceId],order=current.architecture.nodes.findIndex(item=>item.id===node.id)+1;
    const contentHeight=iconSize+12+fontSize+(lines.length-1)*fontSize*1.15;
    const iconTop=layout.overview?y+(height-contentHeight)/2:y+Math.min(22,height*.1),textTop=layout.overview?iconTop+iconSize+fontSize+12:y+112;
    return `<g class="node" data-service="${esc(node.serviceId||'')}" role="button" tabindex="0" data-select="node" data-id="${esc(node.id)}" aria-label="${esc(label)}"><title>${esc(label)}</title><rect class="node-card" data-node-id="${esc(node.id)}" x="${x}" y="${y}" width="${width}" height="${height}" rx="8"/>${node.serviceId==='lakehouse'&&layout.overview?`<path class="node-store-cap" d="M${x} ${y+24} Q${x+width/2} ${y+60} ${x+width} ${y+24}"/>`:''}${icon?`<rect class="node-icon-paper" x="${x+width/2-iconSize/2-6}" y="${iconTop-6}" width="${iconSize+12}" height="${iconSize+12}" rx="6"/><image href="${siteBase}assets/oci/${icon}.svg" x="${x+width/2-iconSize/2}" y="${iconTop}" width="${iconSize}" height="${iconSize}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"/>`:`<text class="search-node-order" x="${x+width/2}" y="${iconTop+iconSize}" text-anchor="middle">${String(order).padStart(2,'0')}</text>`}<text class="node-service-name" data-caption="${esc(caption)}" style="font-size:${fontSize}px" x="${x+width/2}" y="${textTop}" text-anchor="middle">${lines.map((line,index)=>`<tspan x="${x+width/2}" dy="${index?fontSize*1.15:0}">${esc(line)}</tspan>`).join('')}</text></g>`;
  }).join('');
  return `<figure class="search-architecture-figure" data-deck-keep><div class="search-diagram-scroll"><svg class="search-svg" viewBox="0 ${viewTop} 1280 ${canvasHeight}" preserveAspectRatio="xMidYMid meet" role="group" aria-labelledby="architecture-title-${sequence}" aria-describedby="architecture-description-${sequence}"><title id="architecture-title-${sequence}">${esc(t('Arquitectura de la solución'))}</title><desc id="architecture-description-${sequence}">${esc(t('Flujo entre los componentes del caso. Las flechas representan las relaciones declaradas; no implican una topología de red.'))}</desc><defs><marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs><g class="architecture-artwork">${zones.join('')}${edges}${boxes}</g></svg></div></figure>`;
}

export function architectureSVG(current, includeRelations=true) {
  if(!current.architecture.nodes.length)return empty('La arquitectura aparecerá a medida que el asesor identifique las necesidades y proponga componentes.');
  return architectureLayouts(current.architecture.nodes,current.architecture.edges).map(layout=>architectureFigure(layout,current)).join('')+(includeRelations?architectureRelations(current):'');
}

function architectureRelations(current) {
  const nodes=current.architecture.nodes;
  const relations=current.architecture.edges.map((edge,index)=>{const label=id=>nodes.find(node=>node.id===id)?.label||id;return `<li><button type="button" data-select="edge" data-id="${esc(edge.id)}" title="${esc(edge.label||edge.id)}"><span class="search-flow-number" aria-hidden="true">${index+1}</span><span>${esc(label(edge.source))} → ${esc(label(edge.target))}<small>${esc(edge.label||edge.id)}</small></span></button></li>`;}).join('');
  return relations?`<section class="architecture-relations"><h3>${esc(t('Relaciones entre componentes'))}</h3><ol class="search-flows">${relations}</ol></section>`:'';
}

export function architectureView(catalog,current) {
  const layout=architectureOverview(current.architecture.nodes,current.architecture.edges);
  const content=current.architecture.nodes.length?`<div class="architecture-layout" data-deck-keep><section class="service-band" tabindex="0" aria-label="${esc(t('Servicios y roles'))}"><h3 class="service-heading" lang="en" translate="no">Components</h3><div class="service-grid">${architectureDescriptions(catalog,current,true,layout.boxes.map(box=>box.node))}</div></section><div class="architecture-canvas">${architectureFigure(layout,current)}</div></div>`:empty('La arquitectura aparecerá a medida que el asesor identifique las necesidades y proponga componentes.');
  return deck('Arquitectura','Vista de los servicios OCI, sus relaciones y el flujo de interacción de la solución.',content,'architecture',true);
}

const concise = (text,length=120) => text.length<=length?text:text.slice(0,length).replace(/\s+\S*$/,'')+'…';
const serviceBriefs={aidp:'Entorno de ingeniería de datos y aplicaciones de IA',lakehouse:'Plataforma de datos con acceso SQL y fuentes externas',oac:'Analítica visual y consumo de información','api-gateway':'Publicación y protección de endpoints API',oke:'Ejecución de aplicaciones en contenedores','generative-ai':'Consumo de modelos y alojamiento administrado'};
function serviceBrief(node) {
  const purpose=node.purpose?.trim().split(/[.!?](?:\s|$)/u)[0];
  return purpose&&purpose.length<=60?purpose:t(serviceBriefs[node.serviceId]||'Consulta el detalle del componente en el informe.');
}
function architectureDescriptions(catalog,current,summary=false,nodes=current.architecture.nodes) {
  return nodes.map(node=>{
    const service=catalog.services?.find(item=>item.id===node.serviceId),label=node.label||service?.name||node.id;
    const description=node.purpose||t(service?.description||'Propósito pendiente de definición.');
    if(!summary)return `<section class="service-card"><h4>${esc(label)}</h4><p>${esc(description)}</p></section>`;
    const brief=serviceBrief(node);
    return `<button type="button" class="service-card" data-select="node" data-id="${esc(node.id)}" aria-description="${esc(description)}"><strong>${esc(concise(label,75))}</strong><p>${esc(brief.replace(/[.\u2026]+$/u,''))}</p></button>`;
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
  return `${estimate.stale?`<p class="search-notice">${esc(t('Los costos están pendientes de actualización.'))}</p>`:''}<p><span class="search-status">${esc(t(estimate.status==='complete'?'Estimación completa':'Estimación parcial'))}</span></p>
<div class="bom-head"><div class="search-total bom-metrics"><div class="metric"><span>${esc(t('Primer año'))}</span><strong>${esc(money(estimate.totals?.firstYear,currency))}</strong></div><div class="metric"><span>${esc(t('Objetivo mensual'))}</span><strong>${esc(money(estimate.totals?.targetMonthly,currency))}</strong></div><div class="metric"><span>${esc(t('Transición mensual'))}</span><strong>${esc(money(estimate.totals?.transitionMonthly,currency))}</strong></div></div></div>

<div class="search-table-scroll"><table class="search-table bom-table"><caption class="visually-hidden">${esc(t('Detalle del consumo OCI'))}</caption><thead><tr>${['Recurso','SKU','Unidad','Cantidad','Utilización','Precio unitario','Subtotal mensual'].map(label=>`<th scope="col">${esc(t(label))}</th>`).join('')}</tr></thead><tbody>${lines.map(line=>`<tr><td><button type="button" class="search-link" data-select="estimate" data-id="${esc(line.id)}">${esc(line.label)}</button><br>${esc(t(line.scenario==='transition'?'Transición / coexistencia':'Operación objetivo'))}</td><td>${esc(line.sku)}</td><td>${esc(line.unit)}</td><td>${esc(line.quantity)}</td><td>${/hour|hora/i.test(line.unit)?`${esc(line.instances||1)} × ${esc(line.hoursPerMonth??current.hoursPerMonth)} h`:'—'}</td><td>${esc(money(line.unitPrice,currency,true))}</td><td>${esc(money(line.monthlyCost,currency))}</td></tr>`).join('')}</tbody></table></div>
<div class="search-bars">${lines.map(line=>`<div class="search-bar"><button type="button" data-select="estimate" data-id="${esc(line.id)}"><span>${esc(line.label||line.sku)}</span>${line.monthlyCost===null||line.monthlyCost===undefined?'<span class="search-bar-pending" aria-hidden="true">—</span>':`<meter min="0" max="${max}" value="${Number(line.monthlyCost)}" aria-label="${esc(line.label)}"></meter>`}<span>${esc(money(line.monthlyCost,currency))}</span></button></div>`).join('')}</div>
${sizingEvidence(current)}${estimate.pending?.length?`<h3>${esc(t('Pendientes del cálculo'))}</h3>${list(estimate.pending.map(item=>item.reason))}`:''}<p class="search-muted">${esc(t(estimate.pricingPolicy||''))}</p><p class="search-muted">${esc(t(estimate.availability||''))}</p><p class="search-muted">${esc(t('Catálogo consultado'))}: ${esc(estimate.source?.fetchedAt?.slice(0,10)||t('Pendiente'))} · ${esc(t('Versión'))}: ${esc(estimate.source?.catalogBuild?.buildNumber||t('Pendiente'))}</p>${sourceLinks(estimate.source?.url?[{url:estimate.source.url,title:t('Catálogo público de precios Oracle')}]:[])}`;
}

function slideNotes(notes) {
  return `<div class="search-slide-notes">${notes.map((note,index)=>`<p class="sizing-report-note">${'*'.repeat(index+1)} ${esc(note)}</p>`).join('')}</div>`;
}

export function estimateView(current,profiles,catalog) {
  const estimate=current.estimates.at(-1),currency=estimate?.currency||current.currency,rows=sizingSummary(current,catalog);
  const rounding=rows.length&&['target','annual'].some(key=>{const total=priceCents(estimate?.totals?.[key==='target'?'targetMonthly':'firstYear']);return total!==null&&rows.every(row=>row[key]!==null)&&rows.reduce((sum,row)=>sum+priceCents(row[key]),0n)!==total;});
  const table=`<table class="search-table sizing-summary-table"><caption class="visually-hidden">${esc(t('Resumen por servicio'))}</caption><thead><tr>${['Servicio','Región','Partidas','Costo mensual','Costo anual'].map(label=>`<th scope="col">${esc(t(label))}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr data-service-id="${esc(row.id)}"><th scope="row">${esc(row.name)}</th><td translate="no">${esc(row.region||'—')}</td><td>${row.resources||'—'}</td><td>${esc(money(row.target,currency))}</td><td>${esc(money(row.annual,currency))}</td></tr>`).join('')}</tbody><tfoot><tr><th scope="row">${esc(t('Total'))}</th><td>—</td><td>${estimate?.lines?.length||'—'}</td><td>${esc(money(estimate?.totals?.targetMonthly,currency))}</td><td>${esc(money(estimate?.totals?.firstYear,currency))}</td></tr></tfoot></table>`;
  const notes=[t('El costo mensual es recurrente; el anual incluye los meses de transición.'),t('El informe PDF incluye recursos, cantidades, precios y evidencias.')+(rounding?' '+t('El total del expediente puede diferir por redondeo.'):'')];
  if(catalog)notes.push(t('El catálogo de precios no confirma disponibilidad regional. Revisa también modelos, capacidades y restricciones del servicio.'));
  const content=`<div class="sizing-overview" data-deck-keep>${estimate?.stale?`<p class="search-notice">${esc(t('Los costos están pendientes de actualización.'))}</p>`:''}${rows.length?table:empty('El asesor preparará los recursos y sus cantidades a partir de la conversación.')}${slideNotes(notes)}</div>`;
  return deck('Sizing','Resumen por servicio',content,'estimate',true);
}

function priceCents(value) {
  const price=String(value??'');if(!/^\d+(?:\.\d{1,2})?$/.test(price))return null;
  const [whole,fraction='']=price.split('.');return BigInt(whole)*100n+BigInt(fraction.padEnd(2,'0'));
}

export function sizingSummary(current,catalog) {
  const estimate=current.estimates.at(-1),groups=new Map();
  const group=id=>{if(!groups.has(id))groups.set(id,{id,name:t(catalog?.services?.find(service=>service.id===id)?.name||id),region:estimate?.region||current.region,resources:0,target:0n,transition:0n,annual:0n,pending:!estimate,unknown:new Set()});return groups.get(id);};
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

export function stagesDiagram(catalog,current) {
  const active=catalog.stages.find(stage=>current.stages.find(item=>item.id===stage.id)?.status!=='reviewed')?.id;
  return `<section class="search-stage-diagram search-gantt" aria-label="${esc(t('Etapas de la propuesta'))}" data-deck-keep style="--stage-count:${Math.max(1,catalog.stages.length)}"><div class="gantt-axis"><span>${esc(t('Secuencia de referencia'))}</span><div>${catalog.stages.map((_,index)=>`<span>${String(index+1).padStart(2,'0')}</span>`).join('')}</div></div><ol>${catalog.stages.map((stage,index)=>{
    const state=current.stages.find(item=>item.id===stage.id);
    return `<li class="stage-gantt-row" data-state="${esc(state?.status||'pending')}"${stage.id===active?' data-current="true"':''}><div class="gantt-label"><button type="button" class="stage-heading" data-select="stage" data-id="${esc(stage.id)}"><strong>${esc(t(stage.name||stage.id))}</strong></button><small aria-description="${esc(t(stage.description||stage.name||stage.id))}">${esc(t(stageBriefs[stage.id]||stage.description||stage.name||stage.id))}</small></div><div class="gantt-track"><button type="button" class="gantt-bar" style="grid-column:${index+1}" data-select="stage" data-id="${esc(stage.id)}" aria-label="${esc(t(stage.name||stage.id)+': '+status(state?.status||'pending'))}">${esc(status(state?.status||'pending'))}</button></div></li>`;
  }).join('')}</ol><div class="gantt-legend"><span><i data-legend="current" aria-hidden="true"></i>${esc(t('Etapa actual'))}</span><span><i aria-hidden="true"></i>${esc(t('Pendiente'))}</span><span><i data-legend="reviewed" aria-hidden="true"></i>${esc(t('Revisada'))}</span></div>${slideNotes([t('Las fechas y duraciones se definirán durante la conversación.')])}</section>`;
}

export function stagesView(catalog,current,embedded=false) {
  const details=`<div class="search-stage-grid">${catalog.stages.map((stage,index)=>{const state=current.stages.find(item=>item.id===stage.id);return `<section class="search-stage" data-state="${esc(state?.status||'pending')}"><header><span class="search-service-order" aria-hidden="true">${String(index+1).padStart(2,'0')}</span><span class="search-status">${esc(status(state?.status||'pending'))}</span></header><h3><button class="search-link" type="button" data-select="stage" data-id="${esc(stage.id)}">${esc(t(stage.name||stage.id))}</button></h3><p>${esc(t(stage.description||''))}</p>${state?.deliverables?.length?list(state.deliverables):''}${state?.waves?.length?`<h4>${esc(t('Oleadas de migración'))}</h4>${list(state.waves)}`:''}${state?.dependencies?.length?`<p>${esc(t('Dependencias'))}: ${esc(state.dependencies.map(id=>catalog.stages.find(item=>item.id===id)?.name||id).join(', '))}</p>`:''}${state?.clientAcceptedAt?`<p>${esc(t('Aceptación del cliente registrada'))}: ${esc(state.clientAcceptedAt)}</p>`:''}<details><summary>${esc(t('Criterios de revisión'))}</summary>${list(stage.sufficiency||[])}</details><div class="search-inline-actions">${button('review-stage','Confirmar revisión',`data-id="${esc(stage.id)}"`)}${button('accept-stage','Registrar aceptación del cliente',`data-id="${esc(stage.id)}"`)}</div></section>`;}).join('')}</div>`;
  const diagram=stagesDiagram(catalog,current);
  return embedded?diagram+details:deck('Etapas de la propuesta','Avance de la propuesta y próximos pasos por etapa.',diagram,'stages',true);
}

export function reportView(catalog,current,illustration) {
  return deck('Propuesta de solución','De la necesidad a una solución clara',`<article class="search-report"><h2>${esc(current.title||t('Propuesta de solución'))}</h2><p>${esc(current.region)} · ${esc(current.currency)} · ${esc(current.updatedAt.slice(0,10))}</p>
${illustration?`<section class="case-report-image">${caseImage(current,illustration)}</section>`:''}<section><h3>${esc(t('Necesidades y requisitos'))}</h3>${list(current.requirements)}${!current.requirements.length?`<p>${esc(t('Pendiente de descubrimiento.'))}</p>`:''}</section>
<section><h3>${esc(t('Alternativas y decisiones'))}</h3>${list([...current.alternatives,...current.decisions])}</section><section><h3>${esc(t('Arquitectura de la solución'))}</h3>${architectureSVG(current)}${architectureDescriptions(catalog,current)}</section>
<section><h3>${esc(t('Estimación del consumo'))}</h3>${economicView(current)}${regionReview(current,catalog)}</section><section><h3>${esc(t('Supuestos y pendientes'))}</h3>${list(current.assumptions)}<p>${esc(t('Preguntas pendientes'))}: ${relevantQuestions(catalog,current).filter(question=>!current.answers[question.id]||current.answers[question.id].status==='pending').length}</p></section>
<section>${sizingView(current,[])}${stagesView(catalog,current,true)}</section><section><h3>${esc(t('Fuentes'))}</h3>${sourceLinks(current.sources)}</section></article>`,'report');
}

export function sourceLinks(sources) {
  const links=sources.filter(source=>{try{return ['https:'].includes(new URL(source.url).protocol);}catch{return false;}});
  return `<ul class="search-sources">${links.map(source=>`<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title||source.url)}</a></li>`).join('')}</ul>`;
}
