import { t, locale, siteBase } from '../site/i18n.js?v=bba027f873e5';
const mounted = new WeakMap();
const capabilityKey = 'certirss-push-token';
const validToken = value => /^[A-Za-z0-9_-]{43}$/.test(value || '');

function deviceToken() {
  let value = localStorage.getItem(capabilityKey);
  if (!validToken(value)) {
    value = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
    localStorage.setItem(capabilityKey, value);
  }
  return value;
}

class PushControl {
  constructor(root, button, signal) {
    this.button = button; this.signal = signal; this.active = false;
    const api = document.querySelector('[data-certichat]')?.dataset.api;
    this.endpoint = api ? new URL('/api/rss/push', api).href : null;
    this.supported = isSecureContext && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    const installed = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
    this.needsInstall = /iPad|iPhone|iPod/.test(navigator.userAgent) && !installed;
    button.addEventListener('click', () => this.toggle(), { signal });
  }
  message(text) { this.button.setAttribute('aria-description', t(text)); }
  render() {
    const label = t(this.active ? 'Desactivar notificaciones' : 'Activar notificaciones');
    this.button.setAttribute('aria-pressed', String(this.active)); this.button.title = label; this.button.setAttribute('aria-label', label);
  }
  async request(method, body) {
    const response = await fetch(this.endpoint, { method, credentials: 'omit', signal: this.signal, headers: { 'X-CertiChat': '1', ...(body ? { 'Content-Type': 'application/json' } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
    if (!response.ok) throw new Error('Push unavailable');
    return response.json();
  }
  async restore() {
    const existing = await this.registration.pushManager.getSubscription();
    if (!existing) return;
    const token = localStorage.getItem(capabilityKey);
    if (!validToken(token)) { await existing.unsubscribe(); return; }
    await this.request('POST', { token, subscription: existing.toJSON(), locale }); this.active = true;
  }
  async initialize() {
    this.button.disabled = true; this.render();
    if (!this.supported || this.needsInstall) { this.button.disabled = false; return; }
    if (!this.endpoint) return;
    try {
      const [config, registration] = await Promise.all([this.request('GET'), navigator.serviceWorker.register(`${siteBase}sw.js`, { scope: siteBase })]);
      if (this.signal?.aborted) return;
      this.config = config; this.registration = registration;
      if (config.enabled) await this.restore();
      if (!this.signal?.aborted) { this.render(); this.button.disabled = !config.enabled; }
    } catch { if (!this.signal?.aborted) this.button.disabled = false; }
  }
  async enable(permission) {
    if (await permission !== 'granted') { this.message('Permite las notificaciones en los ajustes del navegador para continuar.'); return; }
    await navigator.serviceWorker.ready;
    const key = Uint8Array.from(atob(this.config.publicKey.replaceAll('-', '+').replaceAll('_', '/') + '='), char => char.charCodeAt(0));
    const token = deviceToken(), existing = await this.registration.pushManager.getSubscription();
    const subscription = existing || await this.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key });
    try { await this.request('POST', { token, subscription: subscription.toJSON(), locale }); }
    catch (error) { if (!existing) await subscription.unsubscribe(); throw error; }
    this.active = true; this.message('Las notificaciones de CertiRSS están activadas.');
  }
  async disable() {
    const subscription = await this.registration.pushManager.getSubscription();
    if (subscription) {
      await this.request('DELETE', { token: deviceToken(), endpoint: subscription.endpoint });
      await subscription.unsubscribe();
    }
    this.active = false; this.message('Las notificaciones de CertiRSS están desactivadas.');
  }
  async toggle() {
    if (this.needsInstall) return this.message('Añade CertiTips a la pantalla de inicio y ábrelo desde allí para activar los avisos.');
    if (!this.supported) return this.message('Tu navegador no permite notificaciones push.');
    if (!this.config?.enabled || !this.registration) return this.message('No se pudieron configurar las notificaciones. Vuelve a intentarlo.');
    // Safari requires this before any await, within transient user activation.
    const permission = this.active ? null : Notification.requestPermission();
    this.button.disabled = true;
    try { if (this.active) await this.disable(); else await this.enable(permission); }
    catch { if (!this.signal?.aborted) this.message('No se pudieron configurar las notificaciones. Vuelve a intentarlo.'); }
    finally { this.button.disabled = false; this.render(); }
  }
}

/** Explicit per-device opt-in, remounted with the reader's abortable navigation lifecycle. */
export function mountPush(root, signal) {
  const button = root.querySelector('[data-rss-push]');
  if (!button || mounted.get(button) === signal) return;
  mounted.set(button, signal);
  void new PushControl(root, button, signal).initialize();
}
