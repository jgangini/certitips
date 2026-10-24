export const MEETING_DURATION = 60 * 60 * 1000;
export const MEETING_REVIEW_INTERVAL = 60 * 1000;

/** Validate immutable entry content independently of its position in a journal. */
function validateJournalContent(entry) {
  if (typeof entry.id !== 'string' || !/^[\w-]{1,96}$/.test(entry.id)
    || typeof entry.createdAt !== 'string' || !Number.isFinite(Date.parse(entry.createdAt))
    || typeof entry.text !== 'string' || entry.text.length > 12000
    || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(entry.text)) throw new Error('El diario de reunión no es válido.');
}

/** Meeting segments have a sequence identity; ordinary dialogue requires an explicit role. */
function journalSequence(entry) {
  if (!entry || Object.keys(entry).some(key => !['id', 'meetingId', 'sequence', 'createdAt', 'text', 'role'].includes(key))) throw new Error('El diario de reunión no es válido.');
  validateJournalContent(entry);
  const meeting = entry.meetingId !== undefined || entry.sequence !== undefined;
  if (entry.role !== undefined && !['user', 'ai'].includes(entry.role)
    || !meeting && !['user', 'ai'].includes(entry.role)) throw new Error('El diario de reunión no es válido.');
  if (!meeting) return null;
  if (typeof entry.meetingId !== 'string' || !/^[\w-]{1,96}$/.test(entry.meetingId)
    || !Number.isSafeInteger(entry.sequence) || entry.sequence < 0) throw new Error('El diario de reunión no es válido.');
  return `${entry.meetingId}:${entry.sequence}`;
}

/** Separate immutable final transcripts from the bounded case prompt. No raw audio or provisional ASR is accepted. */
export function validateMeetingJournal(value) {
  if (!Array.isArray(value) || value.length > 10000) throw new Error('El diario de reunión no es válido.');
  const ids = new Set(), sequences = new Set();
  for (const entry of value) {
    const sequence = journalSequence(entry);
    if (ids.has(entry.id) || sequence !== null && sequences.has(sequence)) throw new Error('El diario de reunión no es válido.');
    ids.add(entry.id); if (sequence !== null) sequences.add(sequence);
  }
  if (new TextEncoder().encode(JSON.stringify(value)).length > 7 * 1024 * 1024) throw new Error('El diario de reunión supera el límite admitido.');
  return value;
}

/** Upgrade legacy dialogue once; display derives a bounded projection while exports keep the full journal. */
export function journalFromHistory(current,journal=[]) {
  const next=[...journal],known=new Set(journal.map(entry=>entry.id));
  for(const [index,turn]of current.history.entries()){
    const entry={id:`${current.id.slice(0,75)}-legacy-${index}`,createdAt:turn.createdAt||current.updatedAt,role:turn.role,text:turn.text};
    if(!known.has(entry.id)){next.push(entry);known.add(entry.id);}
  }
  return validateMeetingJournal(next);
}
export const caseDialogue = journal => journal.filter(entry=>!entry.meetingId&&entry.role).slice(-80).map(({id,role,text,createdAt})=>({id,role,text,createdAt}));

export function appendMeetingSegment(journal, segment) {
  const prior = journal.find(entry => entry.id === segment.id || segment.meetingId&&entry.meetingId === segment.meetingId && entry.sequence === segment.sequence);
  if (prior) {
    if (prior.id!==segment.id||prior.meetingId!==segment.meetingId||prior.sequence!==segment.sequence||Date.parse(prior.createdAt)!==Date.parse(segment.createdAt)||prior.text!==segment.text||(prior.role||'user')!==(segment.role||'user')) throw new Error('El fragmento de reunión ya tiene otro contenido.');
    return journal;
  }
  return validateMeetingJournal([...journal, segment]);
}
export function mergeMeetingJournal(previous,incoming){
  validateMeetingJournal(previous);validateMeetingJournal(incoming);
  return [...incoming.reduce(appendMeetingSegment,previous)].sort((left,right)=>Date.parse(left.createdAt)-Date.parse(right.createdAt));
}

export function appendMeetingText(history, text, label) {
  const next=structuredClone(history), prefix=`${label}\n`;
  for(const fragment of text.match(/[\s\S]{1,10000}/gu)||[]) {
    const last=next.at(-1);
    if(last?.role==='user'&&last.text.startsWith(prefix)&&last.text.length+fragment.length+1<=12000)last.text+=` ${fragment}`;
    else next.push({role:'user',text:prefix+fragment});
  }
  return next;
}

// One in-flight WAV plus sixty seconds waiting and a bounded two-second worklet drain.
export class MeetingAudioBuffer {
  constructor(sampleRate) {
    if (!Number.isInteger(sampleRate) || sampleRate < 8000 || sampleRate > 192000) throw new Error('Invalid recording');
    this.sampleRate=sampleRate;this.chunks=[];this.samples=0;
  }
  push(chunk) {
    if (!(chunk instanceof Float32Array) || chunk.length > 2048) throw new Error('Invalid recording');
    if (this.samples+chunk.length > this.sampleRate*62) throw new Error('Meeting audio buffer is full');
    this.chunks.push(chunk);this.samples+=chunk.length;
  }
  get full() { return this.samples >= this.sampleRate*60; }
  get ready() { return this.samples >= this.sampleRate*30; }
  restore(chunks) {
    this.chunks.unshift(...chunks);
    this.samples+=chunks.reduce((total,chunk)=>total+chunk.length,0);
  }
  take(flush=false) {
    if (!this.ready&&!flush || !this.samples) return null;
    let remaining=Math.min(this.samples,this.sampleRate*30);
    const result=[];
    while(remaining) {
      const chunk=this.chunks[0], length=Math.min(chunk.length,remaining);
      result.push(chunk.subarray(0,length));remaining-=length;this.samples-=length;
      if(length===chunk.length)this.chunks.shift();else this.chunks[0]=chunk.subarray(length);
    }
    return result;
  }
}
