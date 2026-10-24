// Session conversation metadata is private browser state, never product evidence.
export const conversationLifetime = 86400000;

function retainedAt(at, now, clearedAt) {
  return Number.isFinite(at) && at <= now && now - at < conversationLifetime && at > clearedAt;
}

/** Page-owned presentation of the server-selected expert; labels never grant actions. */
export function chatRoom(pageURL, siteRoot) {
  const base = new URL(siteRoot).pathname;
  const parts = new URL(pageURL, siteRoot).pathname.slice(base.length).split('/').filter(Boolean);
  if (['es', 'en', 'pt', 'it'].includes(parts[0])) parts.shift();
  const section = parts[0];
  if (!section || section === 'certichat') return { profile: 'site-librarian', label: 'Bibliotecario del sitio', module: 'CertiChat' };
  if (section === 'certitube') return { profile: 'video-reference', label: 'Especialista en casos', module: 'CertiTube' };
  if (section === 'certisearch') return { profile: 'solution-advisor', label: 'Analista de soluciones', module: 'CertiSearch' };
  return { profile: 'instructor', label: 'Instructor de aprendizaje', module: 'CertiTips' };
}

/** Journal identity survives rendered references and the bounded dialogue projection. */
export function mergeCaseHistory(messages, advisor, now = Date.now(), clearedAt = 0) {
  if (!advisor?.id) return messages;
  const result = messages.map(item => ({ ...item }));
  advisor.history.forEach((item, caseIndex) => {
    const timestamp = Date.parse(item.createdAt || advisor.updatedAt);
    const at = Number.isFinite(timestamp) ? timestamp : now;
    if (!retainedAt(at, now, clearedAt)) return;
    const message = { role: item.role, text: item.text, caseId: advisor.id, caseIndex, ...(item.id ? { caseEntryId: item.id } : {}), at };
    const existing = result.find(previous => sameCasePosition(previous, message));
    if (existing) Object.assign(existing, { caseIndex, ...(item.id ? { caseEntryId: item.id } : {}), at: Math.min(existing.at || at, at) });
    else result.push(message);
  });
  return result;
}

/** Freeze context for a new turn; only an exact transport retry may reuse its UUID. */
export function sameTurnContext(pending, message, context) {
  return pending?.message === message && pending.pageUrl === context.pageUrl && pending.locale === context.locale
    && JSON.stringify(pending.contextIds || []) === JSON.stringify(context.contextIds || []);
}

/** Keep metadata only when the visible message still represents the same retained turn. */
export function retainMessageMetadata(message, previous, now = Date.now()) {
  const metadata = previous?.role === message.role && previous.text === message.text ? previous : { at: now };
  return { ...metadata, ...message, at: metadata.at || now };
}

/** Scope a newly sent case message; older shared messages keep their own identity. */
export function latestCaseScope(message, advisor, context = {}) {
  if (!advisor) return {};
  if (context.caseId && context.caseId !== advisor.id) return {};
  const caseEntryId = context.caseId === advisor.id && context.journalEntryIds?.[message.role];
  const at = Date.parse(context.journalCreatedAt);
  if (caseEntryId) return { caseId: advisor.id, caseEntryId,
    ...(Number.isFinite(at) ? { at: Math.min(Number.isFinite(message.at) ? message.at : at, at) } : {}) };
  if (context.journalEntryIds) return {};
  const caseIndex = advisor.history.findLastIndex(item => item.role === message.role && item.text === message.text);
  const item = advisor.history[caseIndex];
  return caseIndex < 0 ? {} : { caseId: advisor.id, caseIndex, ...(item.id ? { caseEntryId: item.id } : {}) };
}

function sameCasePosition(left, right) {
  if (!right.caseId || left.caseId !== right.caseId || left.role !== right.role) return false;
  if (left.caseEntryId && right.caseEntryId) return left.caseEntryId === right.caseEntryId;
  return Number.isInteger(right.caseIndex) && left.caseIndex === right.caseIndex && left.text === right.text;
}

function serverMessages(turn, renderAnswer, at) {
  const scope = turn.context || {}, roles = scope.resume ? ['ai'] : ['user', 'ai'];
  return roles.map(role => ({ role, at, requestId: turn.request_id,
    text: role === 'user' ? turn.question : scope.profile === 'solution-advisor' && !scope.publicKnowledge ? turn.answer : renderAnswer(turn.answer, turn.sources),
    ...(scope.caseId ? { caseId: scope.caseId,
      ...(scope.journalEntryIds?.[role] ? { caseEntryId: scope.journalEntryIds[role] } : {}),
      ...(Number.isInteger(scope.historyOffset) ? { caseIndex: scope.historyOffset + (role === 'ai' && !scope.resume ? 1 : 0) } : {}) } : {}) }));
}

/** Reconcile private server turns with the visible copy without renewing or resurrecting messages. */
export function mergeServerHistory(messages, turns, renderAnswer, now = Date.now(), clearedAt = 0) {
  const merged = messages.map(item => ({ ...item }));
  for (const turn of turns) {
    const original = Date.parse(turn.context?.journalCreatedAt);
    const at = Math.min(Date.parse(turn.created_at), Number.isFinite(original) ? original : Infinity);
    if (!retainedAt(at, now, clearedAt)) continue;
    for (const message of serverMessages(turn, renderAnswer, at)) {
      const existing = merged.find(item => item.role === message.role && (item.requestId === message.requestId || sameCasePosition(item, message)));
      if (existing) {
        existing.requestId = message.requestId;
        if (message.caseId) Object.assign(existing, { caseId: message.caseId, ...(message.caseEntryId ? { caseEntryId: message.caseEntryId } : {}) });
        if (turn.context?.publicKnowledge) existing.text = message.text;
        existing.at = Math.min(existing.at || at, at);
      } else merged.push(message);
    }
  }
  return merged.sort((a, b) => a.at - b.at);
}
