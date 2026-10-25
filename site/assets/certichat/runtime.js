/** One admission/event transport for every agent capability. Audio and prompts are never persisted here. */
const clients = new WeakMap();
const capabilities = { chat: 'chat', 'certisearch/chat': 'case', voice: 'voice', speech: 'speech', 'certisearch/estimate': 'estimate', 'certisearch/image': 'image', 'certisearch/report': 'report' };
const id = value => typeof value === 'string' && /^[\w-]{1,100}$/.test(value);
const conversation = value => typeof value === 'string' && /^[\w.:-]{1,96}$/.test(value);
const expired = at => !Number.isFinite(at) || at > Date.now() || Date.now() - at >= 86400000;
export const runtimeCapability = (route, payload) => route === 'voice' && payload?.mode === 'lecture' ? 'lecture' : capabilities[route];
// Case IDs are already validated by the case contract and URI-encoded by callers.
export const runtimeOperation = route => /^runtime\/cases\/[^/]+\/apply$/.test(route);

function failure(status, data = {}, retryAfter = 0) {
  const error = new Error(typeof data.detail === 'string' ? data.detail : typeof data.message === 'string' ? data.message : 'No se pudo completar la solicitud del agente.');
  Object.assign(error, { status, code: data.code || 'runtime_transport', retryAfter: Math.max(0, Number(retryAfter||data.retryAfter) || 0) });
  return error;
}

const terminalEvent = type => ['complete', 'error', 'cancelled', 'canceled'].includes(type);

/** Validate one complete SSE frame; comments and keepalives carry no event. */
function runtimeFrame(frame) {
  const lines = frame.split('\n');
  const data = lines.filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
  if (!data) return;
  const item = JSON.parse(data), rawId = lines.find(line => line.startsWith('id:'))?.slice(3).trim();
  const seq = Number(rawId ?? item.seq), type = item.type || item.event || lines.find(line => line.startsWith('event:'))?.slice(6).trim();
  if (!Number.isSafeInteger(seq) || seq < 1 || typeof type !== 'string') throw failure(502, { code: 'runtime_contract' });
  return { ...item, type, seq };
}

/** Parse resumable SSE without interpreting partial tokens as an accepted answer. */
export async function readRuntimeEvents(response, after, receive, {terminalEvents=true}={}) {
  if (!response.headers.get('Content-Type')?.includes('text/event-stream') || !response.body?.getReader) throw failure(502, { code: 'runtime_contract' });
  const reader = response.body.getReader(), decoder = new TextDecoder();
  let buffer = '', sequence = after, terminal;
  try {
    while (!terminal) {
      const { value, done } = await reader.read();
      buffer = (buffer + decoder.decode(value || new Uint8Array(), { stream: !done })).replace(/\r\n/g, '\n');
      // A valid full report may combine an 8 MiB PDF (base64) with the 7 MiB literal journal.
      if (buffer.length > 20 * 1024 * 1024) throw failure(502, { code: 'runtime_contract' });
      let boundary;
      while ((boundary = buffer.indexOf('\n\n')) >= 0) {
        const event = runtimeFrame(buffer.slice(0, boundary)); buffer = buffer.slice(boundary + 2);
        if (!event || event.seq <= sequence) continue;
        sequence = event.seq;
        await receive(event);
        if (terminalEvents && terminalEvent(event.type)) { terminal = event; break; }
      }
      if (done) break;
    }
  } finally { try { await reader.cancel(); } catch { /* A closed event stream needs no cleanup retry. */ } reader.releaseLock(); }
  return { sequence, terminal };
}

function completedResult(event) {
  if (event.type !== 'complete') throw failure(event.status || 409, { ...event, code: event.code || (event.type === 'error' ? 'runtime_failed' : 'runtime_cancelled') });
  if (!event.result || typeof event.result !== 'object') throw failure(502, { code: 'runtime_contract' });
  return event.result;
}

/** Backoff never posts work; abort releases its timer and rejects only the current connection. */
function reconnectDelay(duration, signal) {
  signal?.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(signal.reason); };
    const timer = setTimeout(() => { signal?.removeEventListener('abort', abort); resolve(); }, duration);
    signal?.addEventListener('abort', abort, { once: true });
  });
}

/** Connection state contains only identifiers and cursors, never prompts, audio or results. */
class RuntimeConnection {
  constructor({ origin, headers = () => ({}), fetcher = globalThis.fetch, storage, onEvent = () => {} }) {
    Object.assign(this, { origin, headers, fetcher, storage, onEvent });
    this.key = `certichat:${origin}:runtime`;
    this.runs = new Map(); this.admissions = new Map(); this.cancelOnAdmission = new Set();
    this.conversationCursor = 0; this.conversationCursorAt = Date.now();
    this.restore();
  }

  restore() {
    try {
      const saved = JSON.parse(this.storage?.getItem(this.key) || 'null');
      if (conversation(saved?.conversationId)) this.conversationId = saved.conversationId;
      if (!expired(saved?.cursorAt) && Number.isSafeInteger(saved.cursor) && saved.cursor >= 0) {
        this.conversationCursor = saved.cursor; this.conversationCursorAt = saved.cursorAt;
      }
      for (const run of saved?.runs || []) if (id(run.runId) && id(run.requestId) && !expired(run.at)) this.runs.set(run.requestId, run);
    } catch { /* Optional reconnect metadata cannot block normal admission. */ }
  }

  save() {
    try {
      this.storage?.setItem(this.key, JSON.stringify({ conversationId: this.conversationId,
        cursor: this.conversationCursor, cursorAt: this.conversationCursorAt,
        runs: [...this.runs.values()].filter(run => !expired(run.at)).slice(-32) }));
    } catch { /* The live connection still works. */ }
  }

  async json(path, body, method = 'POST', signal, expectedStatus) {
    const { fetcher, headers } = this;
    const response = await fetcher(`${this.origin}/api/${path}`, { method, credentials: 'include', headers: { 'X-CertiChat': '1', ...headers(body?.requestId), ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }), signal });
    const data = response.status === 204 ? {} : await response.json();
    if (!response.ok) throw failure(response.status, data, response.headers.get('Retry-After'));
    if (expectedStatus && response.status !== expectedStatus) throw failure(502, { code: 'runtime_contract' });
    return data;
  }

  async events(path, requestId, signal) {
    const { fetcher, headers } = this;
    const response = await fetcher(`${this.origin}/api/runtime/${path}`, { credentials: 'include', headers: { 'X-CertiChat': '1', ...headers(requestId), Accept: 'text/event-stream' }, signal });
    if (!response.ok) throw failure(response.status, await response.json(), response.headers.get('Retry-After'));
    return response;
  }

  receiveRun(run, event) {
    // Keep the preceding cursor until terminal processing is committed, so a reload can replay completion.
    if (!terminalEvent(event.type)) { run.seq = event.seq; this.save(); }
    const { onEvent } = this;
    onEvent({ ...event, requestId: run.requestId, runId: run.runId, kind: run.kind });
  }

  async follow(run, signal) {
    let reconnects = 0;
    while (reconnects < 8 && !expired(run.at)) {
      signal?.throwIfAborted();
      let result;
      try {
        const response = await this.events(`runs/${encodeURIComponent(run.runId)}/events?after=${run.seq}`, run.requestId, signal);
        result = await readRuntimeEvents(response, run.seq, event => this.receiveRun(run, event));
      } catch (error) { if (signal?.aborted || error.status && error.status < 500 || error.code === 'runtime_contract') throw error; }
      if (result?.terminal) {
        // An image is not durable until its consumer has validated and mirrored the asset.
        if (run.kind !== 'image' || result.terminal.type !== 'complete') this.release(run.requestId);
        return completedResult(result.terminal);
      }
      reconnects++;
      await reconnectDelay(Math.min(5000, 250 * 2 ** reconnects), signal);
    }
    const { onEvent } = this;
    onEvent({ type:'disconnected', requestId:run.requestId, runId:run.runId, kind:run.kind });
    throw failure(503, { code: 'runtime_reconnect', detail: 'La solicitud sigue guardada. Reintenta la conexión para recuperar su resultado.' });
  }
  async accept(path, body, kind, signal) {
    const previous = this.runs.get(body.requestId) || this.admissions.get(body.requestId);
    if (previous) return previous;
    // Reserve a reconnect slot before POST, including simultaneous admissions.
    if (this.runs.size + this.admissions.size >= 32) throw failure(429, { code: 'queue_full', detail: 'La cola de voz está llena. Espera a que termine una consulta.' });
    const accepted = this.storeAdmission(path, body, kind, signal);
    this.admissions.set(body.requestId, accepted);
    try { return await accepted; }
    finally { this.admissions.delete(body.requestId); }
  }
  async storeAdmission(path, body, kind, signal) {
    let run = this.runs.get(body.requestId);
    if (!run) {
      const admitted = await this.json(path, body, 'POST', signal, 202);
      if (!id(admitted.runId) || admitted.requestId !== body.requestId || !conversation(admitted.conversationId)) throw failure(502, { code: 'runtime_contract' });
      this.conversationId = admitted.conversationId;
      run = { requestId: body.requestId, runId: admitted.runId, kind, seq: 0, at: Date.now(), ...(id(body.payload?.case?.id) ? {caseId:body.payload.case.id} : {}) };
      this.runs.set(run.requestId, run); this.save();
      const { onEvent } = this;
      onEvent({ type: 'queued', seq: 0, ...run });
      if (this.cancelOnAdmission.delete(run.requestId)) await this.json(`runtime/runs/${encodeURIComponent(run.runId)}/cancel`, { requestId: run.requestId });
    }
    return run;
  }
  async admit(path, body, kind, signal) {
    return this.follow(await this.accept(path, body, kind, signal), signal);
  }
  /** Follow derived work without admitting it. A new session has no conversation until
   * its first admission; wait on that explicit 404 while preserving real access/transport errors.
   * Only the metadata cursor persists and snapshots remain server owned.
   */
  async watchConversation(signal,receive){
    let failures=0;
    while(!signal.aborted){
      const before=this.conversationCursor;let idle=false;
      try{
        const response=await this.events(`conversations/${encodeURIComponent(this.conversationId||'shared')}/events?after=${this.conversationCursor}`, undefined, signal);
        await readRuntimeEvents(response,this.conversationCursor,async event=>{
          await receive(event);this.conversationCursor=event.seq;this.conversationCursorAt=Date.now();this.save();
        },{terminalEvents:false});
        failures=0;
      }catch(error){
        if(signal.aborted)return;
        if(error.status===404&&error.code==='conversation_expired'){idle=true;failures=0;}
        else if(error.status&&error.status<500||++failures>=8)throw error;
      }
      if(signal.aborted)return;
      try { await reconnectDelay(idle?5000:this.conversationCursor>before?250:Math.min(5000,500*2**failures), signal); }
      catch(error) { if (!signal.aborted) throw error; }
    }
  }
  request(route, payload, signal) {
      if (runtimeOperation(route)) return this.operation(route, payload, signal);
      const kind = runtimeCapability(route, payload);
      if (!kind) return this.json(route, payload, payload === undefined ? 'GET' : 'POST', signal);
      return this.admit('runtime/turns', { requestId: payload.requestId, kind, payload, ...this.conversationContext() }, kind, signal);
  }
  conversationContext() { return this.conversationId ? { conversationId: this.conversationId } : {}; }
  acknowledge(requestId,action,executed) { return this.json(`runtime/runs/${encodeURIComponent(requestId)}/actions`,{action:action.name,executed,...(action.targetId?{targetId:action.targetId}:{})}); }
  operation(path,body,signal) { return this.admit(path, body, 'case-apply', signal); }
  startMeeting(body) { return this.json('runtime/meetings/start', { ...body, ...this.conversationContext() }); }
  /** Confirm durable admission separately from the potentially long transcription/analysis result. */
  async admitSegment(meetingId,body,signal) { return { ...await this.accept(`runtime/meetings/${encodeURIComponent(meetingId)}/segments`, body, 'meeting-segment', signal) }; }
  segment(meetingId,body,signal) { return this.admit(`runtime/meetings/${encodeURIComponent(meetingId)}/segments`, body, 'meeting-segment', signal); }
  finishMeeting(meetingId,body,signal) { return this.admit(`runtime/meetings/${encodeURIComponent(meetingId)}/finish`, body, 'meeting-finish', signal); }
  cancel(requestId) {
    const run = this.runs.get(requestId);
    if (!run) this.cancelOnAdmission.add(requestId);
    return run ? this.json(`runtime/runs/${encodeURIComponent(run.runId)}/cancel`, { requestId }) : Promise.resolve();
  }
  pending() { return [...this.runs.values()].map(run => ({ ...run })); }
  /** Release replay metadata only after a client-owned asset has been committed or deliberately discarded. */
  release(requestId) { this.runs.delete(requestId); this.save(); }
  resume(requestId,signal) {
    const run = this.runs.get(requestId);
    if (!run) throw failure(404, { code: 'runtime_missing' });
    return this.follow(run, signal);
  }
}

/** Shared client; POST admits once, only a terminal event completes a turn, reconnects resume its cursor. */
export function createRuntimeClient(options) { return new RuntimeConnection(options); }

export function runtimeClient(config, diagnostics) {
  let storage;try{storage=globalThis.sessionStorage;}catch{/* Storage can be disabled; live transport still works. */}
  if (!clients.has(config)) clients.set(config, createRuntimeClient({ origin: config.dataset.api, headers: requestId => diagnostics.headers(requestId), storage,
    onEvent: detail => globalThis.dispatchEvent(new CustomEvent('certichat:runtime', { detail })) }));
  return clients.get(config);
}
