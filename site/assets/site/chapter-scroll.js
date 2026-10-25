/** Wire the shared chapter/tab strip; release its observer when the owning page aborts. */
export function mountChapterScroll(root, signal) {
  const list = root.querySelector(".tube-chapter-list"), buttons = [...root.querySelectorAll("[data-tube-scroll]")];
  function update() {
    const { scrollLeft, scrollWidth, clientWidth } = list;
    buttons[0].disabled = scrollLeft <= 4;
    buttons[1].disabled = scrollLeft >= scrollWidth - clientWidth - 4;
  }
  for (const button of buttons) button.addEventListener("click", () => list.scrollBy({ left: Number(button.dataset.tubeScroll) * list.clientWidth * .8, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }), { signal });
  list.addEventListener("scroll", update, { ...({ passive: true }), signal });
  // Translate a vertical wheel only while the strip can move; preserve zoom and native horizontal input.
  list.addEventListener('wheel', event => {
    if (event.defaultPrevented || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? list.clientWidth : 1;
    const delta = event.deltaY * scale;
    const next = Math.max(0, Math.min(list.scrollWidth - list.clientWidth, list.scrollLeft + delta));
    if (next === list.scrollLeft) return;
    event.preventDefault();
    list.scrollBy({ left: delta, behavior: 'instant' });
  }, { passive: false, signal });
  const observer = new ResizeObserver(update); observer.observe(list);
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
  update();
}
