export const CASE_LIMIT = 128 * 1024;
const sectionLimits = { requirements: 100, assumptions: 100, decisions: 100, alternatives: 30, sizing: 100, estimates: 30, stages: 30, sources: 200, history: 300 };

/** Old archives inherit their saved timestamp once; editing must not renew old dialogue. */
export function migrateDialogue(value) {
  return { ...value, history: value.history.map(item => item.createdAt ? item : { ...item, createdAt: value.updatedAt }) };
}
const sections = Object.keys(sectionLimits);
const editable = new Set(['title', 'mode', 'region', 'currency', 'hoursPerMonth', 'answers', 'requirements', 'assumptions', 'decisions', 'alternatives', 'architecture', 'sizing', 'stages', 'imagePrompt']);
const idPattern = /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,95}$/;
const fail = () => { throw new Error('El expediente no es válido o utiliza una versión no compatible.'); };
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
const text = (value, maximum, minimum = 0) => typeof value === 'string' && [...value].length >= minimum && [...value].length <= maximum;
const fields = (value, allowed) => { if (!record(value) || Object.keys(value).some(key => !allowed.includes(key))) fail(); };
const services = ['aidp', 'lakehouse', 'oac', 'oke', 'api-gateway', 'generative-ai'];

export function createCase(catalog, locale = 'es') {
  return { schemaVersion: 1, id: crypto.randomUUID(), revision: 0, title: '', locale, mode: 'new', region: '', currency: 'USD', hoursPerMonth: 744,
    bankVersion: catalog.version, methodologyVersion: catalog.methodologyVersion, answers: {}, requirements: [], assumptions: [], decisions: [], alternatives: [],
    architecture: { nodes: [], edges: [] }, sizing: [], estimates: [], stages: catalog.stages.map(stage => ({ id: stage.id, status: 'pending' })),
    sources: [], history: [], oracleDocument: null, oraclePrevious: null, updatedAt: new Date().toISOString() };
}

/** Prefer the proposed case-specific label; catalog names remain a legacy fallback. */
export function stageName(stage,catalog) {
  return stage?.title||stage?.label||stage?.name||catalog.stages.find(item=>item.id===stage?.id)?.name||stage?.id||'';
}

function validateTree(value, depth = 0) {
  if (depth > 16 || (Array.isArray(value) && value.length > 1000)) fail();
  if (typeof value === 'number' && !Number.isFinite(value)) fail();
  if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return;
  if (!Array.isArray(value) && !record(value)) fail();
  for (const [key, child] of Object.entries(value)) {
    if ([...key].length > 200 || ['__proto__', 'prototype', 'constructor'].includes(key)) fail();
    validateTree(child, depth + 1);
  }
}

function uniqueIDs(items) {
  if (!Array.isArray(items) || items.some(item => !item || !text(item.id, 96, 1))) fail();
  if (new Set(items.map(item => item.id)).size !== items.length) fail();
}

function displayFields(value, names) {
  if (names.some(key => Object.hasOwn(value, key) && typeof value[key] !== 'string')) fail();
}

function recordList(value, maximum = 300) {
  if (!Array.isArray(value) || value.length > maximum || value.some(item => !record(item))) fail();
  return value;
}

function numericFields(value, names) {
  for (const key of names) {
    const item = value[key];
    if (item === null || item === undefined) continue;
    if (!['string', 'number'].includes(typeof item) || typeof item === 'string' && !/^[+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(item) || !Number.isFinite(Number(item)) || Number(item) < 0) fail();
  }
}

function validRegionReview(value) {
  displayFields(value, ['region', 'sourceUrl', 'reviewedAt']);
  if (!['confirmed', 'needs-review'].includes(value.status) || !Array.isArray(value.serviceIds) || !value.serviceIds.length || value.serviceIds.some(id => !services.includes(id)) || new Set(value.serviceIds).size !== value.serviceIds.length) fail();
  let url; try { url = new URL(value.sourceUrl); } catch { fail(); }
  if (url.protocol !== 'https:' || !(url.hostname === 'oracle.com' || url.hostname.endsWith('.oracle.com')) || url.username || url.password || !value.region || !Number.isFinite(Date.parse(value.reviewedAt)) || !/(?:Z|[+-]\d{2}:\d{2})$/.test(value.reviewedAt)) fail();
}

function validEstimate(value) {
  if (Object.hasOwn(value, 'requiresSizingReview') && typeof value.requiresSizingReview !== 'boolean') fail();
  displayFields(value, ['status', 'currency', 'region', 'pricingPolicy', 'availability', 'availabilityStatus', 'oracleStatus']);
  if (Object.hasOwn(value, 'currency') && !/^[A-Z]{3}$/.test(value.currency)) fail();
  for (const name of ['totals', 'knownSubtotal', 'forecast', 'source']) if (Object.hasOwn(value, name) && !record(value[name])) fail();
  for (const line of recordList(Object.hasOwn(value, 'lines') ? value.lines : [])) {
    displayFields(line, ['id', 'label', 'sku', 'unit', 'serviceId', 'profileId', 'scenario']);
    if (!text(line.id, 200, 1)) fail();
    numericFields(line, ['quantity', 'unitPrice', 'monthlyCost', 'instances', 'hoursPerMonth', 'months', 'instanceMultiplier']);
  }
  for (const key of ['totals', 'knownSubtotal']) numericFields(value[key] ?? {}, ['targetMonthly', 'transitionMonthly', 'firstYear']);
  numericFields(value.forecast ?? {}, ['months', 'target', 'transition', 'total']);
  for (const item of recordList(Object.hasOwn(value, 'pending') ? value.pending : [])) displayFields(item, ['reason']);
}

function validSections(value) {
  const names = ['text', 'title', 'label', 'purpose', 'description', 'serviceId', 'profileId', 'status', 'kind'];
  for (const section of ['requirements', 'assumptions', 'decisions', 'alternatives', 'sizing', 'stages', 'sources']) for (const item of value[section]) displayFields(item, names);
  for (const item of [...value.architecture.nodes, ...value.architecture.edges]) displayFields(item, names);
  for (const item of value.sizing) {
    if ((Object.hasOwn(item, 'parameters') || item.profileId) && !record(item.parameters)) fail();
    if (Object.hasOwn(item,'evidence')) {
      if (!record(item.evidence)) fail();
      for (const [key,source] of Object.entries(item.evidence)) {
        if (!Object.hasOwn(item.parameters||{},key)) fail();
        fields(source,['kind','sourceId','text']);
        if (!['answer','assumption','user'].includes(source.kind) || !(source.sourceId||source.text)) fail();
        if (Object.hasOwn(source,'sourceId') && (!text(source.sourceId,96,1)||!source.sourceId.trim())) fail();
        if (Object.hasOwn(source,'text') && (!text(source.text,2000,1)||!source.text.trim())) fail();
      }
    }
  }
  for (const item of value.stages) {
    if (Object.hasOwn(item, 'dependencies') && (!Array.isArray(item.dependencies) || item.dependencies.some(entry => typeof entry !== 'string'))) fail();
    if (Object.hasOwn(item, 'deliverables') && (!Array.isArray(item.deliverables) || item.deliverables.some(entry => typeof entry !== 'string' && !record(entry)))) fail();
    if (Object.hasOwn(item, 'waves') && (!Array.isArray(item.waves) || item.waves.some(entry => typeof entry !== 'string' && !record(entry)))) fail();
  }
  for (const item of value.decisions) if (item.kind === 'regional-availability') validRegionReview(item);
  for (const item of value.estimates) validEstimate(item);
}

export function validateCase(value) {
  validateTree(value);
  if (new TextEncoder().encode(JSON.stringify(value)).length > CASE_LIMIT) throw new Error('El expediente supera el límite de 128 KiB. Conserva el archivo original.');
  fields(value, ['schemaVersion', 'id', 'revision', 'title', 'locale', 'mode', 'region', 'currency', 'hoursPerMonth', 'bankVersion', 'methodologyVersion', 'answers', 'architecture', ...sections, 'oracleDocument', 'oraclePrevious', 'updatedAt', 'imagePrompt', 'imageId']);
  if (Object.hasOwn(value, 'imagePrompt') && !text(value.imagePrompt, 1500) || value.imageId != null && !/^[a-f0-9]{64}$/.test(value.imageId)) fail();
  if (value.schemaVersion !== 1 || !text(value.id, 96, 1) || !idPattern.test(value.id) || !Number.isSafeInteger(value.revision) || value.revision < 0 || value.revision > 2147483647) fail();
  if (!['es', 'en', 'pt', 'it'].includes(value.locale) || !['new', 'migration', 'modernization'].includes(value.mode)) fail();
  if (!text(value.title, 300) || !text(value.region, 100) || typeof value.currency !== 'string' || !/^[A-Z]{3}$/.test(value.currency)) fail();
  if (typeof value.hoursPerMonth !== 'number' || !(value.hoursPerMonth > 0 && value.hoursPerMonth <= 744) || !text(value.updatedAt, 40)) fail();
  if (!text(value.bankVersion, 100) || !text(value.methodologyVersion, 100)) fail();
  if (!record(value.answers) || Object.keys(value.answers).length > 500) fail();
  for (const [id, answer] of Object.entries(value.answers)) {
    fields(answer, ['value', 'status', 'questionSnapshot']);
    if (!idPattern.test(id) || !['pending', 'answered', 'confirmed'].includes(answer.status) || !text(answer.questionSnapshot, 3000) || !Object.hasOwn(answer, 'value')) fail();
  }
  for (const section of sections) if (!Array.isArray(value[section]) || value[section].length > sectionLimits[section] || value[section].some(item => !record(item))) fail();
  for (const section of sections.filter(name => !['history', 'sources'].includes(name))) uniqueIDs(value[section]);
  for (const item of value.history) {
    fields(item, ['role', 'text', 'createdAt']);
    if (!['user', 'ai'].includes(item.role) || !text(item.text, 12000)) fail();
    if (item.createdAt !== undefined && (!text(item.createdAt, 40, 1) || !Number.isFinite(Date.parse(item.createdAt)) || !/(?:Z|[+-]\d{2}:\d{2})$/.test(item.createdAt))) fail();
  }
  fields(value.architecture, ['nodes', 'edges']);
  uniqueIDs(value.architecture.nodes); uniqueIDs(value.architecture.edges);
  if (value.architecture.nodes.length > 100 || value.architecture.edges.length > 200 || [...value.architecture.nodes, ...value.architecture.edges].some(item => !record(item))) fail();
  const nodes = new Set(value.architecture.nodes.map(node => node.id));
  if (value.architecture.edges.some(edge => !nodes.has(edge.source) || !nodes.has(edge.target))) fail();
  if (![value.oracleDocument, value.oraclePrevious].every(item => item === null || record(item))) fail();
  validSections(value);
  return value;
}

export function snapshotQuestion(question, previous) {
  if (previous) {
    try { const saved = JSON.parse(previous); if (record(saved) && typeof saved.text === 'string') question = saved; else return previous; }
    catch { return previous; }
  }
  // ponytail: preserve the wording and matching dimensions, not repeated product guidance and source URLs.
  return JSON.stringify(Object.fromEntries(['id', 'text', 'version', 'services', 'capabilities', 'sizingKeys', 'answerType', 'options'].filter(key => question[key] !== undefined).map(key => [key, question[key]])));
}

export function savedQuestion(question, current) {
  const snapshot = current.answers[question.id]?.questionSnapshot;
  if (!snapshot) return question;
  let saved;
  try { saved = JSON.parse(snapshot); } catch { return { ...question, text: snapshot }; }
  if (!record(saved) || typeof saved.text !== 'string') return { ...question, text: snapshot };
  const result = { ...question, text: saved.text };
  const choices = ['choice', 'multi'].includes(saved.answerType);
  const validOptions = Array.isArray(saved.options) && saved.options.length >= 2 && saved.options.every(option => record(option) && typeof option.value === 'string' && typeof option.label === 'string');
  if (['text', 'number', 'boolean', 'choice', 'multi'].includes(saved.answerType) && (!choices || validOptions)) {
    result.answerType = saved.answerType;
    if (choices) result.options = saved.options;
  }
  return result;
}

export function canRetryRequest(pending, current, message, action, selection, locale, context) {
  return Boolean(pending?.requestId && pending.case?.id === current.id && pending.case?.revision === current.revision && pending.message === message && pending.action === action && pending.locale === locale && (pending.selection?.kind ?? null) === (selection?.kind ?? null) && (pending.selection?.id ?? null) === (selection?.id ?? null)
    && (!context || pending.pageUrl === context.pageUrl && pending.activeView === context.activeView));
}

export function assertCurrentResponse(current, response, request) {
  if (current.id !== response?.caseId || current.revision !== response?.baseRevision || request && (response.requestId !== request.requestId || response.caseId !== request.case.id || response.baseRevision !== request.case.revision)) throw new Error('El caso cambió. Solicita una propuesta actualizada.');
}

export function parseCase(text) {
  let value;
  try {value=JSON.parse(text);} catch {fail();}
  return validateCase(value);
}

export function reviseCase(current, changes, { invalidate = true } = {}) {
  const next = structuredClone(current);
  for (const [section, value] of Object.entries(changes)) {
    if (!editable.has(section)) fail();
    next[section] = structuredClone(value);
  }
  if (invalidate) {
    next.estimates = next.estimates.map(item => ({ ...item, stale: true }));
    next.stages = next.stages.map(({ clientAcceptedAt, ...item }) => ({ ...item, status: item.status === 'reviewed' ? 'needs-review' : item.status }));
    if (Object.keys(changes).some(key => !['decisions', 'stages'].includes(key))) next.decisions = next.decisions.map(item => item.kind === 'regional-availability' ? { ...item, status: 'needs-review' } : item);
  }
  return stamp(next);
}

export function stamp(value) {
  return validateCase({ ...value, revision: value.revision + 1, updatedAt: new Date().toISOString() });
}

export function restoreOracleEstimate(current) {
  const previous=current.oraclePrevious;
  if (!previous) fail();
  // The case may have changed after importing: recovered amounts need recalculation against its current assumptions.
  return stamp({...current,currency:previous.currency||current.currency,oracleDocument:previous.document,estimates:previous.estimates.map(item=>({...item,stale:true})),sizing:previous.sizing,oraclePrevious:null,decisions:current.decisions.map(item=>item.kind==='regional-availability'?{...item,status:'needs-review'}:item),stages:current.stages.map(({clientAcceptedAt,...stage})=>({...stage,status:stage.status==='reviewed'?'needs-review':stage.status}))});
}

export function applyProposal(current, response, proposal) {
  assertCurrentResponse(current, response);
  if (!proposal?.changes?.length) fail();
  const allowed = [...editable];
  if (proposal.changes.length > allowed.length || new Set(proposal.changes.map(change => change.section)).size !== proposal.changes.length || proposal.changes.some(change => !allowed.includes(change.section))) fail();
  for (const change of proposal.changes) {
    fields(change, ['section', 'value']);
    if (change.section === 'stages' && (!Array.isArray(change.value) || change.value.some(stage => {
      const previous = current.stages.find(item => item.id === stage?.id);
      return stage?.status === 'reviewed' && previous?.status !== 'reviewed' || stage?.clientAcceptedAt && stage.clientAcceptedAt !== previous?.clientAcceptedAt;
    }))) throw new Error('La revisión y aceptación de etapas requieren confirmación del usuario.');
    if (change.section === 'decisions' && Array.isArray(change.value) && change.value.some(item => item?.kind === 'regional-availability' && item.status === 'confirmed' && JSON.stringify(item) !== JSON.stringify(current.decisions.find(previous => previous.id === item.id)))) throw new Error('La revisión regional requiere confirmación del usuario y una fuente oficial.');
  }
  const changes = Object.fromEntries(proposal.changes.map(change => [change.section, change.value]));
  return reviseCase(current, changes);
}

const withoutOracle = ({ oracleDocument, oraclePrevious, reconciledSizing, ...estimate }) => estimate;

export function applyEstimate(current, response, action = 'estimate') {
  assertCurrentResponse(current, response);
  const economic = response.estimate;
  if (!record(economic) || !['estimate', 'import'].includes(action)) fail();
  const imported = action === 'import';
  if (imported && (!record(economic.oracleDocument) || !Array.isArray(economic.reconciledSizing))) fail();
  const next = { ...current, estimates: [{ ...withoutOracle(economic), id: crypto.randomUUID(), stale: false }],
    oracleDocument: economic.oracleDocument ?? null,
    oraclePrevious: imported ? { document: current.oracleDocument, estimates: current.estimates.map(withoutOracle), sizing: current.sizing, currency: current.currency } : current.oraclePrevious };
  if (imported) {
    next.currency = economic.oracleDocument.currency;
    next.sizing = economic.reconciledSizing;
    next.decisions = next.decisions.map(item => item.kind === 'regional-availability' ? { ...item, status: 'needs-review' } : item);
    next.stages = next.stages.map(({ clientAcceptedAt, ...stage }) => ({ ...stage, status: stage.status === 'reviewed' ? 'needs-review' : stage.status }));
  } else next.stages = next.stages.map(stage => {
    if (['discover', 'compare', 'design'].includes(stage.id)) return stage;
    const { clientAcceptedAt, ...state } = stage;
    return { ...state, status: state.status === 'reviewed' ? 'needs-review' : state.status };
  });
  return stamp(next);
}

export function stageIssues(current, id) {
  const selected=current.stages.find(stage=>stage.id===id);
  if (!selected) fail();
  const meaningful = item => ['text', 'title', 'label', 'purpose', 'description'].some(key => typeof item?.[key] === 'string' && item[key].trim());
  const answered = id => { const answer = current.answers[id]; return answer && ['answered', 'confirmed'].includes(answer.status) && answer.value !== null && (typeof answer.value !== 'string' || answer.value.trim()) && (!Array.isArray(answer.value) || answer.value.length); };
  const estimate = current.estimates.at(-1);
  const serviceIds = [...new Set([...current.architecture.nodes, ...current.sizing].map(item => item.serviceId))];
  const regionReviewed = serviceIds.length && serviceIds.every(id => services.includes(id)) && current.decisions.some(item => item.kind === 'regional-availability' && item.status === 'confirmed' && item.region === current.region && serviceIds.every(id => item.serviceIds.includes(id)));
  const checks = {
    discover: [[current.title.trim(), 'Escribe el nombre y objetivo del caso antes de revisar etapas.'],
      [answered('common-result') || answered('data-a1') || current.requirements.some(meaningful), 'Registra el resultado esperado o un requisito concreto antes de cerrar el descubrimiento.']],
    compare: [[current.requirements.some(meaningful) && current.alternatives.filter(meaningful).length >= 2 && current.decisions.some(meaningful), 'Registra requisitos, al menos dos alternativas y una decisión justificada antes de cerrar la comparación.']],
    design: [[current.region.trim() && current.architecture.nodes.length && current.architecture.nodes.every(node => text(node.serviceId, 96, 1) && typeof node.purpose === 'string' && node.purpose.trim()), 'Define región, componentes y la necesidad que cubre cada uno antes de cerrar el diseño.'],
      [current.architecture.nodes.length < 2 || current.architecture.edges.length && current.architecture.edges.every(meaningful), 'Describe el flujo entre los componentes antes de cerrar el diseño.'],
      [answered('common-security') || answered('data-q18'), 'Registra los controles de seguridad del caso antes de cerrar el diseño.']],
    estimate: [[current.region.trim() && current.sizing.length && current.sizing.every(line => record(line.parameters) && Object.keys(line.parameters).length && Object.values(line.parameters).every(value => value !== null && value !== '')), 'Completa región y cantidades de dimensionamiento antes de revisar la estimación.'],
      [regionReviewed, 'Revisa la disponibilidad regional de todos los servicios y registra una fuente oficial antes de cerrar la estimación.'],
      [estimate?.status === 'complete' && !estimate.stale && estimate.lines?.length && ['targetMonthly', 'transitionMonthly', 'firstYear'].every(key => estimate.totals?.[key] !== null && estimate.totals?.[key] !== '' && Number.isFinite(Number(estimate.totals?.[key])) && Number(estimate.totals[key]) >= 0), 'Completa y actualiza la estimación antes de revisar esta etapa.']],
  };
  const items=value=>Array.isArray(value)?value:typeof value==='string'?[value]:[];
  const described=value=>items(value).some(item=>typeof item==='string'?item.trim():meaningful(item));
  const required = id === 'present' ? Object.values(checks).flat() : checks[id]||[
    [described(selected.deliverables),'Registra los entregables de la etapa antes de revisarla.'],
    [described(selected.responsibles||selected.responsible),'Registra los responsables de la etapa antes de revisarla.'],
    [described(selected.advanceCriteria||selected.sufficiency),'Registra los criterios de avance de la etapa antes de revisarla.'],
  ];
  const issues = required.filter(([valid]) => !valid).map(([, message]) => message);
  const prerequisites=new Set([...current.stages.slice(0,current.stages.indexOf(selected)).map(stage=>stage.id),...(selected.dependencies||[])]);
  if ([...prerequisites].some(previous=>current.stages.find(stage=>stage.id===previous)?.status!=='reviewed')) issues.unshift('Revisa las etapas anteriores antes de cerrar esta etapa.');
  return issues;
}

export function recordStageReview(current, id, acceptance = false) {
  if (!current.stages.some(stage => stage.id === id)) fail();
  const issues = stageIssues(current, id);
  if (issues.length) throw new Error(issues.join(' '));
  if (acceptance && current.stages.find(stage => stage.id === id)?.status !== 'reviewed') throw new Error('Revisa la etapa antes de registrar la aceptación del cliente.');
  return reviseCase(current, { stages: current.stages.map(stage => stage.id === id ? { ...stage, ...(acceptance ? { clientAcceptedAt: new Date().toISOString() } : { status: 'reviewed' }) } : stage) }, { invalidate: false });
}

export function relevantQuestions(catalog, current, serviceId = '') {
  return catalog.questions.filter(question => (!serviceId || question.services.includes(serviceId)) && (!question.when?.modes?.length || question.when.modes.includes(current.mode)));
}

export function questionText(question, current) {
  return savedQuestion(question, current).text;
}

/** A verified server snapshot can catch up another tab, but cannot resurrect or roll back its case. */
export function assertCanonicalMirror(stored, next, expected) {
  if (!stored && !expected) return;
  const equalRevision = stored?.revision === next.revision;
  const core = value => JSON.stringify({...value,history:[]},(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.keys(item).sort().map(key=>[key,item[key]])):item);
  if (!stored || stored.id !== next.id || expected && expected.id !== next.id || stored.revision > next.revision
    || equalRevision && core(stored) !== core(next)) throw new Error('El caso cambió. Solicita una propuesta actualizada.');
}

/** Isolate optional named workspaces; explicit edits use CAS, verified server snapshots use monotonic mirror. */
export async function caseStorage(operation, value, key = 'case', expected, workspace = '') {
  if (workspace && !/^[a-zA-Z0-9_-]{1,64}$/.test(workspace)) throw new Error('El expediente no es válido o utiliza una versión no compatible.');
  const storageKey = workspace ? `workspace:${workspace}:${key}` : key;
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open('certisearch', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('cases');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('cases', operation === 'get' ? 'readonly' : 'readwrite');
      const store = tx.objectStore('cases');
      const request = operation === 'get' || operation === 'mirror' || expected ? store.get(storageKey) : operation === 'delete' ? store.delete(storageKey) : store.put(structuredClone(value), storageKey);
      let result;
      request.onsuccess = () => {
        result = request.result;
        if(operation==='mirror'){
          try { assertCanonicalMirror(result,value,expected); }
          catch(error){reject(error);tx.abort();return;}
          store.put(structuredClone(value),storageKey);result=key;return;
        }
        if(expected){
          if(key==='pending'||key==='pending-image'){
            if(result?.requestId!==expected.requestId){result=false;return;}
            if(operation==='delete'){store.delete(storageKey);result=true;return;}
          }
          if(result && ['id','revision','updatedAt'].some(field=>result[field]!==expected[field])){reject(new Error('El caso cambió. Solicita una propuesta actualizada.'));tx.abort();return;}
          store.put(structuredClone(value),storageKey);result=key;
        }
      };
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error('No se pudo guardar el caso.'));
    });
  } finally { db.close(); }
}

export function downloadJSON(value, filename) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
