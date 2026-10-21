export const MEETING_DURATION = 60 * 60 * 1000;
export const MEETING_REVIEW_INTERVAL = 4 * 60 * 1000;

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
