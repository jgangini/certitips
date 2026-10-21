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
  const observer = new ResizeObserver(update); observer.observe(list);
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
  update();
}
