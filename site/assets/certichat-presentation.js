// Follow Deep Chat's visible simulated stream, never the provider's unvalidated tokens.
export function watchChatPresentation(chat, requestId, total, publish) {
  let progress = 0, frame = 0, closed = false;
  const count = chat.getMessages().length;
  const observer = new MutationObserver(() => {
    if (frame || closed) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!chat.shadowRoot.querySelector('.ai-message.streamed-message')) return;
      const messages = chat.getMessages(), message = messages.at(-1);
      if (messages.length <= count || message?.role !== 'ai' || typeof message.text !== 'string') return;
      const next = Math.min(.999999, message.text.length / Math.max(1, total));
      if (next > progress) { progress = next; publish({ requestId, progress }); }
    });
  });
  observer.observe(chat.shadowRoot, { childList: true, characterData: true, subtree: true });
  function cancel() { closed = true; observer.disconnect(); cancelAnimationFrame(frame); frame = 0; }
  return { cancel, finish() { if (closed) return; cancel(); publish({ requestId, progress: 1 }); } };
}
