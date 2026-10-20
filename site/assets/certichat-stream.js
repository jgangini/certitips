// Bounded SSE reader for the existing idempotent chat request. No automatic resend.
export async function readChatStream(response, requestId, onEvent = () => {}) {
  if (!response.headers.get('Content-Type')?.includes('text/event-stream')) return response.json();
  if (!response.body) throw new Error('Chat stream unavailable');
  const reader = response.body.getReader(), decoder = new TextDecoder();
  let buffer = '', bytes = 0, sequence = -1, result;
  function dispatch(frame) {
    const lines = frame.split('\n');
    const type = lines.find(line => line.startsWith('event:'))?.slice(6).trim();
    const json = lines.filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
    if (!json) return;
    const event = JSON.parse(json);
    if (!event || typeof event !== 'object' || event.requestId !== requestId || !Number.isSafeInteger(event.seq) || event.seq <= sequence) throw new Error('Invalid chat stream sequence');
    sequence = event.seq;
    if (type === 'error') {
      const error = new Error('Chat stream failed');
      error.status = event.status || 503; error.code = event.code;
      error.retryAfter = Number(event.retryAfter) || 0;
      throw error;
    }
    if (!['accepted', 'search.started', 'search.completed', 'search.failed', 'candidates', 'context.selected', 'answer.started', 'complete'].includes(type)) return;
    onEvent({ ...event, type });
    if (type === 'complete') {
      if (!event.result || event.result.requestId !== requestId) throw new Error('Invalid chat stream result');
      result = event.result;
    }
  }
  try {
    while (result === undefined) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16 * 1024 * 1024) throw new Error('Chat stream too large');
      buffer = (buffer + decoder.decode(value, { stream: true })).replace(/\r\n/g, '\n');
      let boundary;
      while ((boundary = buffer.indexOf('\n\n')) !== -1) {
        if (boundary > 2 * 1024 * 1024) throw new Error('Chat event too large');
        dispatch(buffer.slice(0, boundary)); buffer = buffer.slice(boundary + 2);
        if (result !== undefined) break;
      }
      if (buffer.length > 2 * 1024 * 1024) throw new Error('Chat event too large');
    }
    if (result === undefined) throw new Error('Chat stream interrupted');
    return result;
  } finally {
    await reader.cancel().catch(() => {}); reader.releaseLock();
  }
}
