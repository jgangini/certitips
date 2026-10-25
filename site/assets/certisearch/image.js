import { validateCase, assertCurrentResponse } from './case.js?v=849f77efdc35';
import { validateMeetingJournal, journalFromHistory } from './meeting.js?v=849f77efdc35';

export const IMAGE_LIMIT = 384 * 1024;
export const ARCHIVE_LIMIT = 8 * 1024 * 1024;
const invalid = () => { throw new Error('La imagen no es válida o supera el límite admitido.'); };
function bytes(dataUrl, limit = IMAGE_LIMIT) {
  if (typeof dataUrl !== 'string' || dataUrl.length > limit * 4 / 3 + 100) invalid();
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  if (!match) invalid();
  let raw; try { raw = Uint8Array.from(atob(match[2]), char => char.charCodeAt(0)); } catch { invalid(); }
  const signature = [...raw.slice(0, 12)].map(x => String.fromCharCode(x)).join('');
  if (!raw.length || raw.length > limit || !(match[1] === 'image/png' && signature.startsWith('\x89PNG\r\n\x1a\n') || match[1] === 'image/jpeg' && signature.startsWith('\xff\xd8\xff') || match[1] === 'image/webp' && signature.startsWith('RIFF') && signature.slice(8) === 'WEBP')) invalid();
  return raw;
}
const digest = async raw => [...new Uint8Array(await crypto.subtle.digest('SHA-256', raw))].map(x => x.toString(16).padStart(2, '0')).join('');
/** Validate bounded raster bytes and their SHA-256 identity before storage or reuse; remote URLs and SVG are rejected. */
export async function validateIllustration(asset, imageId) {
  if (!asset || Object.keys(asset).some(key => !['id', 'dataUrl', 'prompt', 'generatedAt'].includes(key)) || asset.id !== imageId || !/^[a-f0-9]{64}$/.test(asset.id) || typeof asset.prompt !== 'string' || asset.prompt.length > 1500 || !Number.isFinite(Date.parse(asset.generatedAt))) invalid();
  if (await digest(bytes(asset.dataUrl)) !== asset.id) invalid();
  return asset;
}
/** Decode the provider raster, bound its dimensions and encode a portable WebP; always release the bitmap. */
export async function normalizeIllustration(image) {
  const raw = bytes(image?.dataUrl, 4 * 1024 * 1024);
  const bitmap = await createImageBitmap(new Blob([raw]));
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 16777216) invalid();
    const scale = Math.min(1, 1024 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas'); canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    let dataUrl;
    for (const quality of [.86, .72, .55]) { dataUrl = canvas.toDataURL('image/webp', quality); if (dataUrl.length <= IMAGE_LIMIT * 4 / 3) break; }
    const asset = { id: await digest(bytes(dataUrl)), dataUrl, prompt: image.prompt, generatedAt: new Date().toISOString() };
    return validateIllustration(asset, asset.id);
  } finally { bitmap.close(); }
}
/** Export image bytes beside the validated case so API case context remains bounded and excludes binary data. */
export async function caseArchive(current, illustration, journal = []) {
  validateCase(current);
  journal=journalFromHistory(current,journal);
  if (current.imageId) await validateIllustration(illustration, current.imageId);
  const archive = { format: 'certisearch-case', version: 2, case: {...current,history:[]}, illustration: current.imageId ? illustration : null, journal };
  if (new TextEncoder().encode(JSON.stringify(archive,null,2)).length > ARCHIVE_LIMIT) invalid();
  return archive;
}
/** Import the versioned image envelope or a legacy image-free case, validating size and image integrity. */
export async function parseCaseArchive(text) {
  if (typeof text !== 'string' || new TextEncoder().encode(text).length > ARCHIVE_LIMIT) invalid();
  const value = JSON.parse(text);
  if (value?.format !== 'certisearch-case') {
    const current = validateCase(value); if (current.imageId) invalid();
    return { current, illustration: null, journal: [] };
  }
  if (![1, 2].includes(value.version) || Object.keys(value).some(key => !['format', 'version', 'case', 'illustration', ...(value.version === 2 ? ['journal'] : [])].includes(key))) invalid();
  const current = validateCase(value.case), illustration = current.imageId ? await validateIllustration(value.illustration, current.imageId) : null;
  if (!current.imageId && value.illustration != null) invalid();
  const journal = value.version === 2 ? validateMeetingJournal(value.journal) : [];
  return { current, illustration, journal };
}
/** A stored image prompt alone never authorizes a new generation; require a current, explicit image instruction. */
export function requestsIllustration(message){
  const text=String(message||'').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
  const sentences=text.split(/[.!?;\n]/);
  return sentences.some(sentence=>!/(?:\bno\b|\bnao\b|\bnon\b|\bnot\b|don't|do not)[^,]{0,45}\b(?:cre|cri|gener|edit|modif|draw|redraw|make)/.test(sentence)
    && /\b(?:crea|crear|cree|cria|criar|crie|create|creare|genera|generar|gere|generate|generare|edita|editar|edite|edit|modifica|modificar|modifique|modify|modificare|draw|redraw|make)\b[^.!?;\n]{0,100}\b(?:imagen|image|imagem|immagine|ilustracion|illustration|ilustracao|illustrazione|portada|cover|capa|copertina)\b/.test(sentence));
}

/** Reuse the pending request identity and prior image; accept only a response matching the current case revision and prompt. */
export async function requestIllustration(current, prompt, illustration, pending, request, normalize = normalizeIllustration) {
  if (current.imageId) await validateIllustration(illustration, current.imageId);
  const context = { requestId: pending.requestId, case: current, prompt, reference: illustration?.dataUrl || null };
  const response = await request(context);
  assertCurrentResponse(current, response, context);
  if (response.image?.prompt !== prompt) invalid();
  return normalize(response.image);
}
