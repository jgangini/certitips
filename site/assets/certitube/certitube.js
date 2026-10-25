import { mountChapterScroll } from '../site/chapter-scroll.js?v=bbc7627528f5';
import { t, language } from '../site/i18n.js?v=bbc7627528f5';
let youtubeReady;
let pausedReference;

/** An explicit assistant opening selects a verified chapter paused, including a native page load. */
export function rememberPausedReference(value) {
  try {
    const url = new URL(value, location.href);
    if (url.origin !== location.origin || !/\/certitube\/[\w-]{11}\/$/.test(url.pathname) || !/^#t-(0|[1-9]\d*)$/.test(url.hash)) return;
    pausedReference = { url: url.href, at: Date.now() };
    sessionStorage.setItem('certitube:paused-reference', JSON.stringify(pausedReference));
  } catch { /* Chapter navigation remains available without optional storage. */ }
}

function consumePausedReference() {
  const local = pausedReference; pausedReference = undefined;
  try {
    const saved = local || JSON.parse(sessionStorage.getItem('certitube:paused-reference'));
    sessionStorage.removeItem('certitube:paused-reference');
    return saved?.url === location.href && Number.isFinite(saved.at) && Date.now() >= saved.at && Date.now() - saved.at < 30000;
  } catch { return true; } // Without storage, an initial fragment stays paused until a real play request.
}

function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeReady) return youtubeReady;
  youtubeReady = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const fail = () => { clearTimeout(timer); script.remove(); reject(new Error("YouTube unavailable")); };
    const timer = setTimeout(fail, 15000);
    window.onYouTubeIframeAPIReady = () => { clearTimeout(timer); resolve(window.YT); };
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = fail;
    document.head.append(script);
  }).catch(error => { youtubeReady = undefined; throw error; });
  return youtubeReady;
}

export function selectedMoment(hash, moments) {
  return /^#t-(0|[1-9]\d*)$/.test(hash) ? moments.get(Number(hash.slice(3))) : undefined;
}

export function playbackMoment(time, moments, duration) {
  if (!Number.isFinite(time) || time < 0 || time > duration) return undefined;
  return [...moments.values()].findLast(moment => moment.seconds <= time);
}

function onMomentLink(event, moments, fromHash) {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = event.composedPath().find(node => node.tagName === "A");
  if (!link || link.target === "_blank") return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.search) return;
  if (!selectedMoment(url.hash, moments)) return;
  event.preventDefault();
  if (location.hash !== url.hash) history.pushState(null, "", url.hash);
  fromHash();
}

function showChapter(root, seconds, reveal) {
  const previous = root.dataset.activeMoment;
  const smooth = previous && previous !== String(seconds) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const description = root.querySelector(".tube-description");
  const height = smooth ? description.getBoundingClientRect().height : 0;
  if (smooth) for (const animation of description.getAnimations({ subtree: true })) animation.cancel();
  root.dataset.activeMoment = String(seconds);
  for (const link of root.querySelectorAll("[data-tube-time]")) {
    if (Number(link.dataset.tubeTime) === seconds) {
      link.setAttribute("aria-current", "true");
      if (reveal) {
        const box = link.getBoundingClientRect(), strip = link.parentElement.getBoundingClientRect();
        if (box.left < strip.left || box.right > strip.right) link.parentElement.scrollBy({ left: box.left - strip.left, behavior: "instant" });
      }
    } else link.removeAttribute("aria-current");
  }
  for (const panel of root.querySelectorAll("[data-tube-description]")) panel.hidden = Number(panel.dataset.tubeDescription) !== seconds;
  if (smooth) {
    description.animate([{ height: `${height}px` }, { height: `${description.getBoundingClientRect().height}px` }], { duration: 240, easing: "cubic-bezier(.22, 1, .36, 1)" });
    description.querySelector("[data-tube-description]:not([hidden])").animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 240, easing: "ease-out" });
  }
}

function trackPlayback(root, player, moments, duration, external, signal) {
  let timer, stopped = false;
  function sync() {
    const moment = playbackMoment(player.getCurrentTime(), moments, duration);
    if (!moment || root.dataset.activeMoment === String(moment.seconds)) return;
    showChapter(root, moment.seconds, true);
    external.href = `https://www.youtube.com/watch?v=${root.dataset.videoId}&t=${moment.seconds}s`;
  }
  function state(value) {
    window.clearInterval(timer);
    if (stopped || document.hidden) return;
    if ([0, 1, 2].includes(value)) sync();
    if (value === 1) timer = window.setInterval(sync, 500);
  }
  document.addEventListener("visibilitychange", () => state(player.getPlayerState()), { signal });
  window.addEventListener("pagehide", () => window.clearInterval(timer), { signal });
  return { state, stop() { stopped = true; window.clearInterval(timer); } };
}

export function mountPlayer(root, signal = new AbortController().signal) {
  const external = root.querySelector("[data-tube-external]"), status = root.querySelector("[data-tube-status]"), message = root.querySelector("[data-tube-message]");
  const spinner = root.querySelector("[data-tube-loading]");
  const duration = Number(root.dataset.duration), videoId = root.dataset.videoId;
  let pausedHash = consumePausedReference() ? location.hash : undefined;
  const moments = new Map([...document.querySelectorAll("[data-tube-time]")].map(link => [Number(link.dataset.tubeTime), { seconds: Number(link.dataset.tubeTime), label: link.querySelector("span").textContent }]));
  let player, playback, ready = false, pending, wanted = false, failed = false, autoplay = true, voiceFullscreen = false;
  const announcePlayback = playing => {
    if (signal.aborted) return;
    if (!playing && voiceFullscreen) {
      voiceFullscreen = false;
      if (document.fullscreenElement && root.contains(document.fullscreenElement)) document.exitFullscreen?.().catch(() => {});
    }
    window.dispatchEvent(new CustomEvent("certitube:playback", { detail: { playing, videoId } }));
  };
  const inform = (text, link = false) => { message.textContent = text; status.hidden = !text; external.hidden = !link; };
  const fallback = text => { clearTimeout(loading); spinner.hidden = true; playback?.stop(); failed = true; announcePlayback(false); inform(text, true); };
  const loading = setTimeout(() => fallback(t("YouTube está tardando en responder. Puedes abrir el video con el enlace.")), 20000);

  function playMoment() {
    if (!ready || failed || !wanted) return;
    const seconds = pending?.seconds ?? 0;
    const actualDuration = player.getDuration();
    if (actualDuration > 0 && seconds >= actualDuration) {
      wanted = false; player.pauseVideo(); inform(t("Este momento ya no está disponible en el video.")); return;
    }
    if (autoplay) {
      player.seekTo(seconds, true);
      player.playVideo();
    } else {
      // Cueing selects the moment without requesting playback from an unstarted player.
      player.cueVideoById({ videoId, startSeconds: seconds });
    }
  }

  function select(moment, play = true) {
    pending = moment; wanted = Boolean(moment); autoplay = play;
    external.href = `https://www.youtube.com/watch?v=${videoId}${moment ? `&t=${moment.seconds}s` : ""}`;
    const displayed = moment ?? moments.values().next().value;
    showChapter(root, displayed.seconds, Boolean(moment));
    if (!moment) { if (ready) player.pauseVideo(); return; }
    const focusTarget = window.matchMedia("(max-width: 1000px)").matches ? root.querySelector(".tube-watch") || root : root;
    if (!window.matchMedia("(min-width: 801px) and (max-width: 1000px)").matches) focusTarget.scrollIntoView({ block: "start", behavior: "instant" });
    focusTarget.focus({ preventScroll: true });
    playMoment();
  }

  function fromHash(play = false) {
    if (play === true) pausedHash = undefined;
    const moment = selectedMoment(location.hash, moments);
    select(moment && moment.seconds < duration ? moment : undefined, pausedHash !== location.hash);
  }

  const events = {
    onReady(event) {
      if (signal.aborted) { event.target.destroy?.(); return; }
      clearTimeout(loading); spinner.hidden = true; failed = false;
      player = event.target; ready = true;
      playback = trackPlayback(root, player, moments, duration, external, signal);
      player.getIframe().title = t("Video del caso en YouTube");
      inform("");
      playMoment();
    },
    onStateChange(event) { if (event.data === 1) inform(""); playback?.state(event.data); if ([0, 1, 2].includes(event.data)) announcePlayback(event.data === 1); },
    onAutoplayBlocked() { inform(t("Pulsa reproducir en el video para ver el momento seleccionado.")); },
    onError() { fallback(t("No se puede reproducir aquí. Puedes abrir este momento en YouTube.")); },
  };
  root.addEventListener("certitube:command", event => {
    const request = event.detail;
    if (!request || failed) return;
    if (request.name === "chapter") {
      const moment = moments.get(request.seconds);
      if (!moment || moment.seconds >= duration) return;
      history.replaceState(history.state, "", `#t-${moment.seconds}`);
      select(moment, false); announcePlayback(false); request.accepted = true;
    } else if (["pause", "close"].includes(request.name)) {
      wanted = false; autoplay = false;
      if (ready) player.pauseVideo();
      if (request.name === "close" && document.fullscreenElement && root.contains(document.fullscreenElement)) document.exitFullscreen?.().catch(() => {});
      announcePlayback(false); request.accepted = true;
    } else if (request.name === "play" && ready) {
      request.accepted = true;
      // ponytail: fullscreen needs a real gesture in some browsers; a denied promise keeps playback paused for the existing confirmation button.
      request.completion = (async () => {
        const screen = root.querySelector(".tube-watch") || root;
        try {
          if (document.fullscreenElement !== screen) {
            if (!screen.requestFullscreen) return false;
            await screen.requestFullscreen();
          }
          voiceFullscreen = true; autoplay = true; wanted = true; announcePlayback(true); playMoment(); return true;
        } catch { player.pauseVideo(); announcePlayback(false); return false; }
      })();
    }
  }, { signal });
  document.addEventListener("click", event => onMomentLink(event, moments, () => fromHash(true)), { signal });
  window.addEventListener("hashchange", fromHash, { signal });
  // Native initial-fragment/history scrolling happens after module initialization.
  window.addEventListener("pageshow", event => {
    if (event.persisted || selectedMoment(location.hash, moments)) window.requestAnimationFrame(fromHash);
  }, { signal });
  window.addEventListener("pagehide", () => { if (ready) player.pauseVideo(); }, { signal });
  signal.addEventListener("abort", () => { clearTimeout(loading); playback?.stop(); player?.destroy?.(); }, { once: true });
  fromHash();
  loadYouTube().then(YT => {
    if (signal.aborted) return;
    player = new YT.Player("tube-youtube", {
      videoId, width: "100%", height: "100%",
      playerVars: { origin: location.origin, playsinline: 1, autoplay: 0, hl: language }, events,
    });
  }).catch(() => { if (!signal.aborted) fallback(t("No se pudo conectar con YouTube. Usa el enlace para abrir el video.")); });
}

function mountMobileLayout(root, signal) {
  const mobile = matchMedia("(max-width: 1000px)");
  const videos = root.parentElement.querySelector(".tube-videos");
  const content = [...root.children].filter(node => !node.matches(".tube-watch"));
  const browse = document.createElement("div");
  browse.className = "tube-browse";
  const watch = root.querySelector(".tube-watch");
  const observer = new ResizeObserver(() => root.style.setProperty("--tube-watch-height", `${watch.getBoundingClientRect().height}px`)); observer.observe(watch);
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
  function sync() {
    if (mobile.matches) {
      root.append(browse);
      browse.append(...content, videos);
    } else {
      root.append(...content);
      if (root.nextElementSibling !== videos) root.after(videos);
      browse.remove();
    }
  }
  mobile.addEventListener("change", sync, { signal });
  sync();
}

export function mountTube(signal) {
  const root = document.querySelector("[data-tube-player]");
  if (root) {
    mountMobileLayout(root, signal); mountChapterScroll(root, signal); mountPlayer(root, signal);
    const list = root.parentElement.querySelector('.tube-videos ol');
    window.addEventListener('site:will-navigate', () => list.scrollTo({ top: list.scrollTop, behavior: 'instant' }), { signal });
  }
}

/** Swap the player and changed playlist rows, preserving a visible recommendation as the scroll anchor.
 * Returns a callback for the mounted layout: smooth in the desktop list, immediate for reduced motion or page scrolling.
 */
export function replaceTube(fresh) {
  const player = document.querySelector('[data-tube-player]'), next = fresh.querySelector('[data-tube-player]');
  const videos = document.querySelector('.tube-videos'), list = videos.querySelector('ol');
  const rows = [...list.children], incoming = [...fresh.querySelector('.tube-videos ol').children];
  const changed = rows.filter((row, index) => row.matches('.tube-video-current') || incoming[index].matches('.tube-video-current'));
  const scroller = matchMedia('(min-width: 1001px)').matches ? list : matchMedia('(min-width: 801px)').matches ? document.scrollingElement : matchMedia('(max-height: 540px)').matches ? document.querySelector('#main') : player.querySelector('.tube-browse');
  const edge = scroller === document.scrollingElement ? 0 : scroller.getBoundingClientRect().top;
  const anchor = rows.find(row => !changed.includes(row) && row.getBoundingClientRect().bottom > edge);
  const top = anchor?.getBoundingClientRect().top;
  const scroll = scroller.scrollTop;
  // On small screens the playlist is nested inside the outgoing player.
  if (player.contains(videos)) player.after(videos);
  changed.forEach(row => row.replaceWith(incoming[rows.indexOf(row)]));
  player.replaceWith(next);
  return () => {
    const target = scroller.classList?.contains('tube-browse') ? next.querySelector('.tube-browse') : scroller;
    const position = anchor ? target.scrollTop + anchor.getBoundingClientRect().top - top : scroll;
    target.scrollTo({ top: position, behavior: target === list && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' });
  };
}
