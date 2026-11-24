/* PodGB — podcast player PWA. Nessuna dipendenza esterna. */
'use strict';

/* ---------- Icone ---------- */
const ICONS = {
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  list: '<path d="M3 6h13M3 12h13M3 18h9"/><path d="m17 15 4 3-4 3z" fill="currentColor"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  downloaded: '<path d="M20 6 9 17l-5-5"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  play: '<path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/>',
  pause: '<rect x="6" y="4" width="4.5" height="16" rx="1.2"/><rect x="13.5" y="4" width="4.5" height="16" rx="1.2"/>',
  rew: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/>',
  fwd: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  queueAdd: '<path d="M3 6h12M3 12h12M3 18h7"/><path d="M18 14v7M14.5 17.5h7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>',
  up: '<path d="m18 15-6-6-6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  more: '<circle cx="12" cy="5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="19" r="1.3" fill="currentColor"/>',
  rss: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5" fill="currentColor"/>',
  upload: '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  install: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M12 7v7M9 11l3 3 3-3"/>',
  headphones: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/>',
  next: '<path d="m5 4 10 8-10 8z" fill="currentColor"/><path d="M19 5v14"/>',
  video: '<rect x="2" y="5" width="15" height="14" rx="2.5"/><path d="m17 10 5-3v10l-5-3z"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>'
};
const icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

/* ---------- Utility ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fmtTime(sec) {
  sec = Math.max(0, Math.floor(sec || 0));
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
}
function fmtDur(sec) {
  if (!sec) return '';
  const h = Math.floor(sec / 3600), m = Math.round((sec % 3600) / 60);
  return h ? `${h} h ${m} min` : `${Math.max(1, m)} min`;
}
const dateFmt = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short' });
const dateFmtY = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
function fmtDate(ms) {
  if (!ms) return '';
  const d = new Date(ms), now = new Date();
  const diff = (now - d) / 86400000;
  if (diff < 1 && d.getDate() === now.getDate()) return 'Oggi';
  if (diff < 2 && new Date(now - 86400000).getDate() === d.getDate()) return 'Ieri';
  return d.getFullYear() === now.getFullYear() ? dateFmt.format(d) : dateFmtY.format(d);
}
function fmtBytes(b) {
  if (!b) return '0 MB';
  return b > 1e9 ? (b / 1e9).toFixed(2).replace('.', ',') + ' GB' : Math.round(b / 1e6) + ' MB';
}
function parseDuration(v) {
  if (!v) return 0;
  v = String(v).trim();
  if (/^\d+$/.test(v)) return +v;
  const p = v.split(':').map(Number);
  if (p.some(isNaN)) return 0;
  return p.reduce((a, n) => a * 60 + n, 0);
}
function hashHue(s) { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h) % 360; }

function artImg(src, title, cls) {
  if (!src) return phArt(title, cls);
  return `<img class="art ${cls}" src="${esc(src)}" alt="" loading="lazy" data-title="${esc(title)}" referrerpolicy="no-referrer">`;
}
function phArt(title, cls) {
  const initials = String(title || '?').replace(/[^\p{L}\p{N} ]/gu, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?';
  return `<span class="art ph ${cls}" style="background:hsl(${hashHue(title)} 45% 38%)" aria-hidden="true">${esc(initials)}</span>`;
}
document.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName === 'IMG' && img.classList.contains('art') && !img.dataset.failed) {
    img.dataset.failed = '1';
    const cls = [...img.classList].filter((c) => c !== 'art').join(' ');
    const tpl = document.createElement('template');
    tpl.innerHTML = phArt(img.dataset.title || '', cls);
    if (img.id) { img.removeAttribute('src'); img.style.visibility = 'hidden'; } else img.replaceWith(tpl.content);
  }
}, true);

function cleanHTML(html) {
  html = String(html || '');
  if (!/<[a-z][\s\S]*>/i.test(html)) return esc(html).replace(/\n/g, '<br>');
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const ok = new Set(['P', 'BR', 'A', 'B', 'I', 'STRONG', 'EM', 'UL', 'OL', 'LI', 'H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'SPAN', 'DIV', 'IMG']);
  const drop = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'FORM', 'INPUT', 'BUTTON', 'svg', 'SVG', 'NOSCRIPT']);
  const walk = (el) => {
    for (const c of [...el.children]) {
      if (drop.has(c.tagName)) { c.remove(); continue; }
      walk(c);
      if (!ok.has(c.tagName)) { c.replaceWith(...c.childNodes); continue; }
      for (const a of [...c.attributes]) {
        const keep = (c.tagName === 'A' && a.name === 'href') || (c.tagName === 'IMG' && a.name === 'src');
        if (!keep || !/^https?:/i.test(a.value)) c.removeAttribute(a.name);
      }
      if (c.tagName === 'A') { c.target = '_blank'; c.rel = 'noopener noreferrer'; }
      if (c.tagName === 'IMG') { if (!c.getAttribute('src')) c.remove(); else c.loading = 'lazy'; }
    }
  };
  walk(doc.body);
  return doc.body.innerHTML;
}
function plainText(html) {
  const d = new DOMParser().parseFromString(String(html || ''), 'text/html');
  return (d.body.textContent || '').replace(/\s+/g, ' ').trim();
}

let toastTimer;
function toast(msg, ms = 2800) {
  const t = $('#toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, ms);
}

/* ---------- Rete (con proxy CORS di riserva) ---------- */
const IS_APP = !!window.PodGBAndroid; // dentro l'APK Android
const NATIVE = (u) => '/__proxy?url=' + encodeURIComponent(u);
const PROXIES = [
  (u) => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u),
  (u) => 'https://corsproxy.io/?url=' + encodeURIComponent(u),
  (u) => 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u)
];
async function fetchTimeout(url, ms = 15000, opts = {}) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try { return await fetch(url, { ...opts, signal: ctl.signal }); } finally { clearTimeout(t); }
}
async function fetchText(url) {
  const tries = IS_APP ? [NATIVE(url), ...PROXIES.map((p) => p(url))] : [url, ...PROXIES.map((p) => p(url))];
  let lastErr;
  for (const u of tries) {
    try {
      const r = await fetchTimeout(u);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const txt = await r.text();
      if (txt && txt.length > 20) return txt;
      throw new Error('Risposta vuota');
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('Rete non disponibile');
}
async function fetchJSON(url) {
  try {
    const r = await fetchTimeout(url);
    if (r.ok) return await r.json();
  } catch (e) { /* prova il proxy */ }
  return JSON.parse(await fetchText(url));
}
function jsonp(url) {
  return new Promise((res, rej) => {
    const cb = '__pgb' + Math.random().toString(36).slice(2);
    const s = document.createElement('script');
    const done = () => { delete window[cb]; s.remove(); };
    window[cb] = (d) => { done(); res(d); };
    s.onerror = () => { done(); rej(new Error('Ricerca non disponibile')); };
    s.src = url + '&callback=' + cb;
    document.head.appendChild(s);
    setTimeout(() => { if (window[cb]) { done(); rej(new Error('Timeout')); } }, 15000);
  });
}
async function itunes(path) {
  const url = 'https://itunes.apple.com/' + path;
  try { return await fetchJSON(url); } catch (e) { return jsonp(url); }
}

/* ---------- Archivio (IndexedDB) ---------- */
const DB = (() => {
  let p;
  const open = () => p || (p = new Promise((res, rej) => {
    const r = indexedDB.open('podgb', 1);
    r.onupgradeneeded = () => { r.result.createObjectStore('kv'); r.result.createObjectStore('blobs'); };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  }));
  const tx = async (store, mode, fn) => {
    const d = await open();
    return new Promise((res, rej) => {
      const t = d.transaction(store, mode);
      const req = fn(t.objectStore(store));
      t.oncomplete = () => res(req && req.result);
      t.onerror = t.onabort = () => rej(t.error);
    });
  };
  return {
    get: (k, s = 'kv') => tx(s, 'readonly', (o) => o.get(k)).catch(() => undefined),
    set: (k, v, s = 'kv') => tx(s, 'readwrite', (o) => o.put(v, k)),
    del: (k, s = 'kv') => tx(s, 'readwrite', (o) => o.delete(k))
  };
})();

const S = {
  subs: [],          // {feedUrl,title,author,artwork,desc,lastFetched,seen}
  eps: {},           // feedUrl -> [episode]
  prog: {},          // episodeId -> {pos,dur,done}
  queue: [],         // [episode]
  dl: {},            // episodeId -> {size,at,ep}
  cur: null,         // episode
  settings: { speed: 1, back: 15, fwd: 30 },
  removed: {},       // feedUrl -> quando è stata annullata l'iscrizione (per la sincronizzazione)
  queueT: 0,         // ultima modifica della coda
  sync: { token: '', gistId: '', last: 0, error: '' }
};
const KEYS = ['subs', 'eps', 'prog', 'queue', 'dl', 'cur', 'settings', 'removed', 'queueT', 'sync'];
let applyingRemote = false, syncDirty = false;
const dirty = new Set();
let saveTimer;
function persist(...keys) {
  keys.forEach((k) => dirty.add(k));
  if (!applyingRemote) {
    if (keys.includes('queue')) { S.queueT = Date.now(); dirty.add('queueT'); }
    if (keys.some((k) => ['subs', 'prog', 'queue', 'removed'].includes(k))) { syncDirty = true; scheduleSync(20000); }
  }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 400);
}
async function flush() {
  const ks = [...dirty]; dirty.clear();
  if (IS_APP && ks.some((k) => k !== 'settings')) syncNative();
  for (const k of ks) { try { await DB.set(k, S[k]); } catch (e) { console.warn('save', k, e); } }
}
async function load() {
  for (const k of KEYS) {
    try { const v = await DB.get(k); if (v !== undefined && v !== null) S[k] = k === 'settings' ? { ...S.settings, ...v } : v; } catch (e) { /* primo avvio */ }
  }
}

/* ---------- Feed RSS ---------- */
const NS_IT = 'http://www.itunes.com/dtds/podcast-1.0.dtd';
function kid(el, name, ns) {
  for (const c of el.children) if (c.localName === name && (ns ? c.namespaceURI === ns : !c.namespaceURI || c.namespaceURI === el.namespaceURI)) return c;
  return null;
}
const txt = (el) => (el ? el.textContent.trim() : '');

/* Feed Atom dei canali YouTube (youtube.com/feeds/videos.xml?channel_id=…) */
const NS_YT = 'http://www.youtube.com/xml/schemas/2015';
const NS_MEDIA = 'http://search.yahoo.com/mrss/';
function parseAtom(doc, feedUrl) {
  const root = doc.documentElement;
  const info = {
    feedUrl,
    title: txt(kid(root, 'title')) || 'Canale YouTube',
    author: txt(kid(kid(root, 'author') || root, 'name')),
    artwork: '',
    desc: 'Canale YouTube',
    link: kid(root, 'link')?.getAttribute('href') || '',
    yt: true
  };
  const eps = [];
  for (const en of root.getElementsByTagName('entry')) {
    const vid = txt(en.getElementsByTagNameNS(NS_YT, 'videoId')[0]);
    if (!vid) continue;
    const thumb = en.getElementsByTagNameNS(NS_MEDIA, 'thumbnail')[0]?.getAttribute('url') || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;
    eps.push({
      id: feedUrl + '#yt:' + vid,
      feed: feedUrl,
      podTitle: info.title,
      title: txt(kid(en, 'title')) || 'Video',
      date: Date.parse(txt(kid(en, 'published'))) || 0,
      dur: 0,
      url: 'https://www.youtube.com/watch?v=' + vid,
      type: 'video/youtube',
      yt: vid,
      size: 0,
      image: thumb,
      desc: txt(en.getElementsByTagNameNS(NS_MEDIA, 'description')[0]),
      link: 'https://www.youtube.com/watch?v=' + vid
    });
  }
  eps.sort((a, b) => b.date - a.date);
  return { info, eps };
}
const isYt = (ep) => !!ep.yt;
const isVideo = (ep) => isYt(ep) || /^video\//i.test(ep.type || '') || /\.(mp4|m4v|mov|webm)(\?|$)/i.test(ep.url || '');

function parseFeed(xml, feedUrl) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.documentElement && doc.documentElement.localName === 'feed' && !doc.getElementsByTagName('parsererror').length) return parseAtom(doc, feedUrl);
  const ch = doc.getElementsByTagName('channel')[0];
  if (!ch || doc.getElementsByTagName('parsererror').length) throw new Error('Questo indirizzo non è un feed podcast valido');
  const chImg = kid(ch, 'image', NS_IT)?.getAttribute('href') || txt(kid(kid(ch, 'image') || ch, 'url'));
  const info = {
    feedUrl,
    title: txt(kid(ch, 'title')) || feedUrl,
    author: txt(kid(ch, 'author', NS_IT)) || txt(kid(ch, 'managingEditor')),
    artwork: chImg,
    desc: txt(kid(ch, 'summary', NS_IT)) || txt(kid(ch, 'description')),
    link: txt(kid(ch, 'link'))
  };
  const eps = [];
  for (const it of ch.getElementsByTagName('item')) {
    const enc = kid(it, 'enclosure');
    const url = enc?.getAttribute('url');
    if (!url) continue;
    const guid = txt(kid(it, 'guid')) || url;
    const content = it.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0];
    eps.push({
      id: feedUrl + '#' + guid,
      feed: feedUrl,
      podTitle: info.title,
      title: txt(kid(it, 'title')) || txt(kid(it, 'title', NS_IT)) || 'Episodio',
      date: Date.parse(txt(kid(it, 'pubDate'))) || 0,
      dur: parseDuration(txt(kid(it, 'duration', NS_IT))),
      url,
      type: enc.getAttribute('type') || 'audio/mpeg',
      size: +enc.getAttribute('length') || 0,
      image: kid(it, 'image', NS_IT)?.getAttribute('href') || '',
      desc: (content ? content.textContent : '') || txt(kid(it, 'description')) || txt(kid(it, 'summary', NS_IT)),
      link: txt(kid(it, 'link'))
    });
  }
  eps.sort((a, b) => b.date - a.date);
  return { info, eps };
}
async function loadFeed(feedUrl) {
  const xml = await fetchText(feedUrl);
  return parseFeed(xml, feedUrl);
}
const subOf = (feedUrl) => S.subs.find((s) => s.feedUrl === feedUrl);
const artFor = (ep) => ep.image || subOf(ep.feed)?.artwork || ep.podArt || '';

async function refreshSub(sub) {
  const { info, eps } = await loadFeed(sub.feedUrl);
  const old = new Set((S.eps[sub.feedUrl] || []).map((e) => e.id));
  const fresh = eps.filter((e) => !old.has(e.id)).length;
  Object.assign(sub, { title: info.title, author: info.author || sub.author, artwork: info.artwork || sub.artwork, desc: info.desc, lastFetched: Date.now() });
  S.eps[sub.feedUrl] = eps.slice(0, 400);
  return old.size ? fresh : 0;
}
let refreshing = false;
async function refreshAll(silent) {
  if (refreshing || !S.subs.length) return;
  refreshing = true; render();
  let fresh = 0, failed = 0;
  const list = [...S.subs];
  const worker = async () => { while (list.length) { const s = list.shift(); try { fresh += await refreshSub(s); } catch (e) { failed++; } } };
  await Promise.all([worker(), worker(), worker()]);
  refreshing = false;
  persist('subs', 'eps');
  render();
  if (!silent || fresh) toast(fresh ? `${fresh} ${fresh === 1 ? 'nuovo episodio' : 'nuovi episodi'}` : failed ? `Aggiornato, ${failed} feed non raggiungibili` : 'Tutto aggiornato');
}

async function subscribe(info, eps) {
  if (subOf(info.feedUrl)) return;
  S.subs.push({ feedUrl: info.feedUrl, title: info.title, author: info.author, artwork: info.artwork, desc: info.desc, lastFetched: Date.now(), added: Date.now() });
  S.subs.sort((a, b) => a.title.localeCompare(b.title, 'it'));
  if (eps) S.eps[info.feedUrl] = eps.slice(0, 400);
  persist('subs', 'eps');
  toast(`Iscritto a ${info.title}`);
}
function unsubscribe(feedUrl) {
  S.removed[feedUrl] = Date.now(); persist('removed');
  const s = subOf(feedUrl);
  S.subs = S.subs.filter((x) => x.feedUrl !== feedUrl);
  delete S.eps[feedUrl];
  persist('subs', 'eps');
  if (s) toast(`Iscrizione a ${s.title} annullata`);
}

/* ---------- Player ---------- */
/* Nell'APK l'audio lo suona Android (serve per Android Auto e per l'ascolto a schermo spento):
   questo oggetto imita <audio> e passa i comandi al player nativo. */
function nativeAudio() {
  const A = window.PodGBAndroid;
  const bus = new EventTarget();
  const st = { paused: true, pos: 0, at: Date.now(), dur: NaN, rate: 1 };
  return {
    preload: 'metadata', src: '',
    get paused() { return st.paused; },
    get currentTime() { return st.paused ? st.pos : st.pos + ((Date.now() - st.at) / 1000) * st.rate; },
    set currentTime(v) { st.pos = v; st.at = Date.now(); A.seek(v); },
    get duration() { return st.dur; },
    get playbackRate() { return st.rate; },
    set playbackRate(v) { st.rate = v; A.rate(v); },
    get defaultPlaybackRate() { return st.rate; },
    set defaultPlaybackRate(v) { /* uguale a playbackRate */ },
    loadEp(ep, start, rate) {
      Object.assign(st, { paused: true, pos: start, at: Date.now(), dur: ep.dur || NaN, rate });
      this.src = ep.url;
      A.load(JSON.stringify(slimEp(ep)), start, rate);
    },
    play() { A.play(); return Promise.resolve(); },
    pause() { A.pause(); },
    addEventListener: bus.addEventListener.bind(bus),
    removeEventListener: bus.removeEventListener.bind(bus),
    restore(d) { Object.assign(st, { paused: d.paused !== false, pos: d.pos || 0, at: Date.now() }); if (d.dur > 0) st.dur = d.dur; },
    _event(type, d) {
      if (d && typeof d.pos === 'number') { st.pos = d.pos; st.at = Date.now(); }
      if (d && d.dur > 0) st.dur = d.dur;
      if (type === 'play') st.paused = false;
      if (type === 'pause' || type === 'ended' || type === 'error') st.paused = true;
      if (d && typeof d.paused === 'boolean' && type === 'timeupdate') st.paused = d.paused;
      bus.dispatchEvent(new Event(type));
    }
  };
}
function slimEp(e) {
  return { id: e.id, title: e.title, url: e.url, podTitle: e.podTitle, feed: e.feed, art: artFor(e), dur: e.dur || 0, date: e.date || 0, when: fmtDate(e.date), type: e.type };
}
const audio = IS_APP ? nativeAudio() : new Audio();
audio.preload = 'metadata';
let curBlobUrl = null;
let loadedId = null;
let sleepAt = 0;        // timestamp ms, 0 = off, -1 = fine episodio
let sleepTimer = null;

function progOf(ep) { return S.prog[ep.id] || { pos: 0, dur: ep.dur || 0, done: false }; }
function savePos() {
  if (!S.cur || loadedId !== S.cur.id || !audio.duration) return;
  const p = S.prog[S.cur.id] || (S.prog[S.cur.id] = {});
  p.pos = audio.currentTime; p.dur = audio.duration; p.t = Date.now();
  if (audio.duration - audio.currentTime < 30 && audio.currentTime > 60) p.done = true;
  persist('prog');
}
async function srcFor(ep) {
  if (S.dl[ep.id]) {
    try {
      const blob = await DB.get(ep.id, 'blobs');
      if (blob) { if (curBlobUrl) URL.revokeObjectURL(curBlobUrl); curBlobUrl = URL.createObjectURL(blob); return curBlobUrl; }
    } catch (e) { /* usa lo streaming */ }
  }
  return ep.url;
}
async function loadIntoAudio(ep) {
  savePos();
  if (IS_APP) {
    const p = S.prog[ep.id];
    loadedId = ep.id;
    audio.loadEp(ep, p && !p.done ? p.pos || 0 : 0, S.settings.speed);
    return;
  }
  const src = await srcFor(ep);
  loadedId = ep.id;
  audio.src = src;
  audio.defaultPlaybackRate = audio.playbackRate = S.settings.speed;
  const p = S.prog[ep.id];
  const start = p && !p.done ? p.pos || 0 : 0;
  await new Promise((res) => {
    const ok = () => { cleanup(); res(); };
    const cleanup = () => { audio.removeEventListener('loadedmetadata', ok); audio.removeEventListener('error', ok); };
    audio.addEventListener('loadedmetadata', ok); audio.addEventListener('error', ok);
    setTimeout(ok, 8000);
  });
  if (start > 3 && (!audio.duration || start < audio.duration - 3)) audio.currentTime = start;
  audio.playbackRate = S.settings.speed;
}
async function playEp(ep) {
  if (S.cur && S.cur.id === ep.id && loadedId === ep.id) { togglePlay(); return; }
  if (S.cur && S.cur.id !== ep.id) savePos();
  S.cur = { ...ep, podArt: artFor(ep) };
  S.queue = S.queue.filter((e) => e.id !== ep.id);
  if (S.prog[ep.id]?.done) S.prog[ep.id].done = false;
  persist('cur', 'queue', 'prog');
  updateMini(); render();
  const myId = ep.id;
  audio.pause();
  await loadIntoAudio(ep);
  if (!S.cur || S.cur.id !== myId) return;
  try { await audio.play(); } catch (e) { if (e.name !== 'AbortError') toast('Non riesco a riprodurre questo episodio'); }
  setMediaSession();
}
async function togglePlay() {
  if (!S.cur) return;
  if (loadedId !== S.cur.id) { await loadIntoAudio(S.cur); }
  if (audio.paused) { try { await audio.play(); } catch (e) { toast('Riproduzione non riuscita'); } setMediaSession(); }
  else audio.pause();
}
function skip(sec) {
  if (!S.cur || loadedId !== S.cur.id) return;
  audio.currentTime = Math.max(0, Math.min((audio.duration || 1e9) - 1, audio.currentTime + sec));
  savePos();
}
function setSpeed(v) {
  S.settings.speed = v; audio.playbackRate = v; audio.defaultPlaybackRate = v;
  persist('settings'); renderSheet(); updateMini();
}
function setSleep(mins) {
  clearTimeout(sleepTimer); sleepAt = 0;
  if (IS_APP) window.PodGBAndroid.stopAfter(mins === -1);
  if (mins === -1) { sleepAt = -1; toast('Si ferma alla fine dell\'episodio'); }
  else if (mins > 0) {
    sleepAt = Date.now() + mins * 60000;
    sleepTimer = setTimeout(() => { audio.pause(); sleepAt = 0; toast('Timer scaduto: riproduzione in pausa'); renderSheet(); }, mins * 60000);
    toast(`Si ferma tra ${mins} minuti`);
  } else toast('Timer disattivato');
  renderSheet();
}
function playNext() {
  const next = S.queue[0];
  if (next) playEp(next);
  else { S.cur && persist('cur'); updateMini(); render(); }
}
audio.addEventListener('ended', () => {
  if (S.cur) { const p = S.prog[S.cur.id] || (S.prog[S.cur.id] = {}); p.done = true; p.pos = 0; p.t = Date.now(); persist('prog'); }
  if (IS_APP) { if (sleepAt === -1) { sleepAt = 0; render(); } return; } // il player nativo passa da solo al prossimo in coda
  if (sleepAt === -1) { sleepAt = 0; toast('Fine episodio: riproduzione in pausa'); render(); updateMini(); return; }
  playNext();
});
let lastSave = 0, lastUi = 0;
audio.addEventListener('timeupdate', () => {
  const now = Date.now();
  if (now - lastSave > 5000) { lastSave = now; savePos(); }
  if (now - lastUi > 400) { lastUi = now; updateProgressUi(); }
});
['play', 'pause'].forEach((ev) => audio.addEventListener(ev, () => { savePos(); updateMini(); updatePlayIcons();
  if (!IS_APP && 'mediaSession' in navigator) navigator.mediaSession.playbackState = audio.paused ? 'paused' : 'playing'; }));
audio.addEventListener('loadedmetadata', updateProgressUi);
audio.addEventListener('error', () => { if (audio.src) toast('Audio non disponibile: controlla la connessione'); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { savePos(); flush(); } });
window.addEventListener('pagehide', () => { savePos(); flush(); });

function setMediaSession() {
  if (IS_APP || !('mediaSession' in navigator) || !S.cur) return;
  const art = artFor(S.cur);
  try {
    navigator.mediaSession.metadata = new MediaMetadata({ title: S.cur.title, artist: S.cur.podTitle, album: 'PodGB', artwork: art ? [{ src: art, sizes: '512x512' }] : [] });
    const ms = navigator.mediaSession;
    ms.setActionHandler('play', () => togglePlay());
    ms.setActionHandler('pause', () => audio.pause());
    ms.setActionHandler('seekbackward', () => skip(-S.settings.back));
    ms.setActionHandler('seekforward', () => skip(S.settings.fwd));
    ms.setActionHandler('previoustrack', () => skip(-S.settings.back));
    ms.setActionHandler('nexttrack', S.queue.length ? () => playNext() : () => skip(S.settings.fwd));
    ms.setActionHandler('seekto', (d) => { audio.currentTime = d.seekTime; });
  } catch (e) { /* supporto parziale */ }
}

/* ---------- Download per l'ascolto offline ---------- */
const dlActive = {}; // id -> percentuale
async function downloadEp(ep) {
  if (S.dl[ep.id] || ep.id in dlActive) return;
  dlActive[ep.id] = 0; render();
  if (IS_APP) { dlEp[ep.id] = ep; window.PodGBAndroid.download(ep.id, ep.url); return; }
  try { navigator.storage?.persist?.(); } catch (e) { /* opzionale */ }
  const tries = IS_APP ? [NATIVE(ep.url)] : [ep.url, ...PROXIES.slice(0, 2).map((p) => p(ep.url))];
  for (const u of tries) {
    try {
      const r = await fetchTimeout(u, 600000);
      if (!r.ok || !r.body) throw new Error('HTTP ' + r.status);
      const ctype = r.headers.get('content-type') || '';
      if (/text\/html|json/.test(ctype)) throw new Error('Non è audio');
      const total = +r.headers.get('content-length') || ep.size || 0;
      const reader = r.body.getReader();
      const chunks = []; let got = 0, lastPaint = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value); got += value.length;
        if (total && Date.now() - lastPaint > 500) { lastPaint = Date.now(); dlActive[ep.id] = Math.min(99, Math.round((got / total) * 100)); paintDl(ep.id); }
      }
      if (got < 50000) throw new Error('File troppo piccolo');
      const blob = new Blob(chunks, { type: ep.type || 'audio/mpeg' });
      await DB.set(ep.id, blob, 'blobs');
      S.dl[ep.id] = { size: blob.size, at: Date.now(), ep: { ...ep, podArt: artFor(ep) } };
      delete dlActive[ep.id];
      persist('dl'); render();
      toast('Scaricato: disponibile offline');
      return;
    } catch (e) { /* prova la via successiva */ }
  }
  delete dlActive[ep.id]; render();
  toast('Download non riuscito: questo podcast non permette il download dal browser. Puoi comunque ascoltarlo in streaming.', 5000);
}
async function deleteDl(id) {
  delete S.dl[id];
  if (IS_APP) window.PodGBAndroid.deleteDownload(id);
  try { await DB.del(id, 'blobs'); } catch (e) { /* già rimosso */ }
  persist('dl'); render(); toast('Download eliminato');
}
function paintDl(id) {
  document.querySelectorAll(`[data-dl-for="${CSS.escape(id)}"]`).forEach((el) => { el.textContent = `Scarico ${dlActive[id]}%`; });
}

/* ---------- Coda ---------- */
function enqueue(ep, next) {
  if (S.cur && S.cur.id === ep.id) { toast('È già in riproduzione'); return; }
  S.queue = S.queue.filter((e) => e.id !== ep.id);
  const item = { ...ep, podArt: artFor(ep) };
  if (next) S.queue.unshift(item); else S.queue.push(item);
  persist('queue'); setMediaSession();
  toast(next ? 'Riprodotto subito dopo' : 'Aggiunto in coda');
  render();
}
function moveQ(i, d) {
  const j = i + d;
  if (j < 0 || j >= S.queue.length) return;
  [S.queue[i], S.queue[j]] = [S.queue[j], S.queue[i]];
  persist('queue'); render();
}

/* ---------- Navigazione ---------- */
const nav = { tab: 'new', stack: [] }; // stack: [{view:'pod', feedUrl, preview}]
const view = $('#view');
const epIndex = new Map(); // id -> episode, per i pulsanti

function go(tab) {
  nav.tab = tab; nav.stack = [];
  render(); window.scrollTo(0, 0);
}
function push(v) { nav.stack.push(v); render(); window.scrollTo(0, 0); }
function back() { nav.stack.pop(); render(); }

function setTop(title, actions = '') {
  $('#title').textContent = title;
  $('#topActions').innerHTML = actions;
  $('#backBtn').hidden = !nav.stack.length;
}

function render() {
  epIndex.clear();
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('on', t.dataset.tab === nav.tab));
  const top = nav.stack[nav.stack.length - 1];
  if (top?.view === 'pod') return renderPod(top);
  ({ new: renderNew, subs: renderSubs, search: renderSearch, queue: renderQueue, dl: renderDl })[nav.tab]();
}

/* Riga episodio */
function epRow(ep, { showPod = false } = {}) {
  epIndex.set(ep.id, ep);
  const p = progOf(ep);
  const isCur = S.cur && S.cur.id === ep.id;
  const playing = isCur && !audio.paused;
  const dur = p.dur || ep.dur;
  const left = p.pos && !p.done && dur ? `Mancano ${fmtDur(dur - p.pos)}` : fmtDur(dur);
  const pct = p.pos && dur && !p.done ? Math.round((p.pos / dur) * 100) : 0;
  const dl = S.dl[ep.id] ? `<span class="tag">${icon('downloaded')}Offline</span>` : ep.id in dlActive ? `<span class="tag" data-dl-for="${esc(ep.id)}">Scarico ${dlActive[ep.id]}%</span>` : '';
  const inQ = S.queue.some((q) => q.id === ep.id) ? `<span class="tag">${icon('list')}In coda</span>` : '';
  const vid = isVideo(ep) ? `<span class="tag">${icon('video')}${isYt(ep) ? 'YouTube' : 'Video'}</span>` : '';
  return `<li class="ep ${p.done ? 'done' : ''} ${isCur ? 'now' : ''}">
    ${showPod ? artImg(artFor(ep), ep.podTitle, 's48') : ''}
    <button class="body" data-action="ep-sheet" data-id="${esc(ep.id)}" ${showPod ? '' : 'style="grid-column:1 / 3"'}>
      ${showPod ? `<span class="pod">${esc(ep.podTitle)}</span>` : ''}
      <span class="t">${esc(ep.title)}</span>
      <span class="info"><span>${fmtDate(ep.date)}</span>${left ? `<span>${left}</span>` : ''}${p.done ? '<span>Ascoltato</span>' : ''}${vid}${dl}${inQ}</span>
      ${pct ? `<span class="bar"><span style="width:${pct}%"></span></span>` : ''}
    </button>
    <button class="ep-play ${playing ? 'playing' : ''}" data-action="${isYt(ep) ? 'watch' : 'play'}" data-id="${esc(ep.id)}" aria-label="${playing ? 'Pausa' : 'Riproduci'} ${esc(ep.title)}">${icon(playing ? 'pause' : 'play')}</button>
  </li>`;
}

/* Novità */
function renderNew() {
  setTop('Novità', S.subs.length ? `<button class="icon-btn" data-action="refresh" aria-label="Aggiorna" ${refreshing ? 'disabled' : ''}>${icon('refresh')}</button>` : '');
  if (!S.subs.length) {
    view.innerHTML = `<div class="empty">${icon('headphones')}<h2>Qui arrivano i nuovi episodi</h2><p>Iscriviti a qualche podcast e troverai qui le ultime puntate, in ordine di uscita.</p><button class="btn" data-action="tab" data-tab="search">${icon('search')}Cerca podcast</button></div>`;
    return;
  }
  const all = Object.values(S.eps).flat().sort((a, b) => b.date - a.date);
  const fresh = all.filter((e) => !progOf(e).done).slice(0, 80);
  const inProgress = all.filter((e) => { const p = S.prog[e.id]; return p && p.pos > 10 && !p.done; }).slice(0, 5);
  let html = refreshing ? '<div class="spinner" aria-label="Aggiornamento"></div>' : '';
  if (inProgress.length) html += `<div class="section-label">Da finire</div><ul class="list">${inProgress.map((e) => epRow(e, { showPod: true })).join('')}</ul>`;
  html += `<div class="section-label">Ultime uscite</div>`;
  html += fresh.length ? `<ul class="list">${fresh.map((e) => epRow(e, { showPod: true })).join('')}</ul>` : `<div class="empty"><h2>Sei in pari</h2><p>Hai ascoltato tutto. Tira giù per aggiornare o tocca il pulsante in alto.</p></div>`;
  view.innerHTML = html;
}

/* Abbonamenti */
function renderSubs() {
  setTop('Abbonamenti', `<button class="icon-btn" data-action="subs-menu" aria-label="Altre opzioni">${icon('more')}</button>`);
  if (!S.subs.length) {
    view.innerHTML = `<div class="empty">${icon('grid')}<h2>Nessun abbonamento</h2><p>Cerca un podcast per nome, incolla un feed RSS o importa un file OPML da un'altra app.</p><div class="row-actions" style="justify-content:center"><button class="btn" data-action="tab" data-tab="search">${icon('search')}Cerca</button><button class="btn ghost" data-action="add-rss">${icon('rss')}Feed RSS</button></div></div>`;
    return;
  }
  const unplayed = (s) => (S.eps[s.feedUrl] || []).filter((e) => e.date > (s.seen || 0) && !progOf(e).done).length;
  view.innerHTML = `<div class="stat"><span>${S.subs.length} podcast</span></div><div class="grid">${S.subs.map((s) => {
    const n = unplayed(s);
    return `<button class="tile" data-action="open-pod" data-feed="${esc(s.feedUrl)}">${artImg(s.artwork, s.title, '')}${n ? `<span class="badge">${n > 99 ? '99+' : n}</span>` : ''}<span class="t">${esc(s.title)}</span></button>`;
  }).join('')}</div>`;
}

/* Cerca */
let searchState = { q: '', results: null, loading: false, error: '', top: null };
function renderSearch() {
  setTop('Cerca');
  const s = searchState;
  let html = `<form class="searchbox" id="searchForm" role="search"><input id="q" type="search" placeholder="Nome del podcast o argomento" value="${esc(s.q)}" autocomplete="off" enterkeyhint="search" aria-label="Cerca podcast"><button class="btn" type="submit" aria-label="Cerca">${icon('search')}</button></form>
  <p class="hint">Oppure <button class="link-btn" data-action="add-rss">aggiungi un feed RSS o un canale YouTube</button> incollando il link.</p>`;
  if (s.loading) html += '<div class="spinner" aria-label="Ricerca in corso"></div>';
  else if (s.error) html += `<p class="err">${esc(s.error)}</p>`;
  else if (s.results) {
    html += `<div class="section-label">${s.results.length} risultati per "${esc(s.q)}"</div>`;
    html += s.results.length ? `<ul class="list">${s.results.map((r) => podRow(r)).join('')}</ul>` : '<p class="hint">Nessun podcast trovato. Prova con altre parole.</p>';
  } else if (s.top) {
    html += `<div class="section-label">I più ascoltati in Italia</div><ul class="list">${s.top.map((r, i) => podRow(r, i + 1)).join('')}</ul>`;
  } else html += '<div class="spinner" aria-label="Caricamento"></div>';
  view.innerHTML = html;
  if (!s.top && !s.results && !s.loading) loadTop();
}
function podRow(r, rank) {
  const sub = subOf(r.feedUrl);
  return `<li><button class="pod-row" data-action="${r.feedUrl ? 'open-pod' : 'open-itunes'}" data-feed="${esc(r.feedUrl || '')}" data-itid="${esc(r.id || '')}" data-title="${esc(r.title)}" data-art="${esc(r.artwork)}" data-author="${esc(r.author)}">
    ${rank ? `<span class="rank">${rank}</span>` : ''}${artImg(r.artwork, r.title, 's56')}
    <span class="meta"><span class="t">${esc(r.title)}</span><span class="s">${esc(r.author)}${r.genre ? ' · ' + esc(r.genre) : ''}${sub ? ' · Iscritto' : ''}</span></span>
  </button></li>`;
}
let topLoading = false;
async function loadTop() {
  if (topLoading) return; topLoading = true;
  try {
    const d = await fetchJSON('https://rss.marketingtools.apple.com/api/v2/it/podcasts/top/25/podcasts.json');
    searchState.top = (d.feed?.results || []).map((r) => ({ id: r.id, title: r.name, author: r.artistName, artwork: (r.artworkUrl100 || '').replace('100x100', '300x300'), genre: r.genres?.[0]?.name }));
  } catch (e) {
    try {
      const d = await itunes('search?media=podcast&entity=podcast&country=IT&limit=25&term=podcast');
      searchState.top = mapItunes(d);
    } catch (e2) { searchState.top = []; }
  }
  topLoading = false;
  if (nav.tab === 'search' && !nav.stack.length) render();
}
function mapItunes(d) {
  return (d.results || []).filter((r) => r.feedUrl).map((r) => ({ id: r.collectionId, feedUrl: r.feedUrl, title: r.collectionName, author: r.artistName, artwork: r.artworkUrl600 || r.artworkUrl100, genre: r.primaryGenreName }));
}
async function doSearch(q) {
  q = q.trim();
  if (!q) return;
  if (/^https?:\/\//i.test(q) || /^@[\w.-]+$/.test(q)) { addByUrl(q); return; }
  searchState = { ...searchState, q, loading: true, error: '', results: null };
  render();
  try {
    const d = await itunes(`search?media=podcast&entity=podcast&country=IT&limit=40&term=${encodeURIComponent(q)}`);
    searchState.results = mapItunes(d);
  } catch (e) { searchState.error = 'La ricerca non risponde. Controlla la connessione e riprova.'; }
  searchState.loading = false;
  if (nav.tab === 'search') render();
}

/* Pagina podcast */
const preview = {}; // feedUrl -> {info, eps, error}
async function openPod(feedUrl, hint) {
  push({ view: 'pod', feedUrl, hint, filter: 'all' });
  const sub = subOf(feedUrl);
  if (sub) { sub.seen = Date.now(); persist('subs'); if (!S.eps[feedUrl]?.length) { try { await refreshSub(sub); persist('eps', 'subs'); } catch (e) { /* offline */ } render(); } return; }
  if (preview[feedUrl]?.eps) return;
  try {
    preview[feedUrl] = await loadFeed(feedUrl);
    if (hint?.artwork && !preview[feedUrl].info.artwork) preview[feedUrl].info.artwork = hint.artwork;
  }
  catch (e) { preview[feedUrl] = { error: e.message || 'Feed non raggiungibile' }; }
  render();
}
async function openItunes(btn) {
  toast('Apro il podcast…', 1500);
  try {
    const d = await itunes('lookup?id=' + encodeURIComponent(btn.dataset.itid));
    const r = mapItunes(d)[0];
    if (!r) throw new Error();
    openPod(r.feedUrl, { title: r.title, artwork: btn.dataset.art || r.artwork, author: r.author });
  } catch (e) { toast('Non riesco ad aprire questo podcast'); }
}
function renderPod(v) {
  const sub = subOf(v.feedUrl);
  const pv = preview[v.feedUrl];
  const info = sub || pv?.info || v.hint || { title: 'Podcast' };
  const eps = sub ? S.eps[v.feedUrl] : pv?.eps;
  setTop('', sub ? `<button class="icon-btn" data-action="pod-menu" data-feed="${esc(v.feedUrl)}" aria-label="Opzioni podcast">${icon('more')}</button>` : '');
  let html = `<div class="pod-head">${artImg(info.artwork, info.title, '')}<div><h2>${esc(info.title)}</h2><div class="by">${esc(info.author || '')}</div>
    ${sub ? `<button class="btn ghost" data-action="unsub" data-feed="${esc(v.feedUrl)}">${icon('check')}Iscritto</button>` : `<button class="btn" data-action="sub" data-feed="${esc(v.feedUrl)}" ${eps ? '' : 'disabled'}>${icon('plus')}Iscriviti</button>`}</div></div>`;
  if (info.desc) html += `<p class="pod-desc" id="podDesc">${esc(plainText(info.desc))}</p><button class="link-btn" data-action="more-desc">Mostra tutto</button>`;
  if (pv?.error && !eps) { html += `<p class="err">${esc(pv.error)}</p>`; view.innerHTML = html; return; }
  if (!eps) { view.innerHTML = html + '<div class="spinner" aria-label="Caricamento episodi"></div>'; return; }
  const unplayed = eps.filter((e) => !progOf(e).done);
  const shown = (v.filter === 'new' ? unplayed : eps).slice(0, v.limit || 60);
  html += `<div class="filters">
    <button class="chip ${v.filter === 'all' ? 'on' : ''}" data-action="filter" data-f="all">Tutti · ${eps.length}</button>
    <button class="chip ${v.filter === 'new' ? 'on' : ''}" data-action="filter" data-f="new">Da ascoltare · ${unplayed.length}</button>
  </div>`;
  html += `<ul class="list">${shown.map((e) => epRow(e)).join('')}</ul>`;
  const total = v.filter === 'new' ? unplayed.length : eps.length;
  if (shown.length < total) html += `<div style="text-align:center;margin:16px 0"><button class="btn ghost" data-action="more-eps">Mostra altri episodi</button></div>`;
  view.innerHTML = html;
}

/* Coda */
function renderQueue() {
  setTop('Coda', S.queue.length ? `<button class="icon-btn" data-action="clear-queue" aria-label="Svuota la coda">${icon('trash')}</button>` : '');
  let html = '';
  if (S.cur) html += `<div class="section-label">In riproduzione</div><ul class="list">${epRow(S.cur, { showPod: true })}</ul>`;
  html += `<div class="section-label">A seguire</div>`;
  if (!S.queue.length) html += `<div class="empty">${icon('list')}<h2>La coda è vuota</h2><p>Dal menu di un episodio scegli "Aggiungi in coda": partirà da solo quando finisce quello in ascolto.</p></div>`;
  else {
    const tot = S.queue.reduce((a, e) => a + Math.max(0, (progOf(e).dur || e.dur || 0) - (progOf(e).pos || 0)), 0);
    html += `<div class="stat"><span>${S.queue.length} episodi</span><span>${tot ? 'Circa ' + fmtDur(tot) : ''}</span></div><ul class="list">` + S.queue.map((e, i) => {
      epIndex.set(e.id, e);
      return `<li class="q-item">${artImg(artFor(e), e.podTitle, 's48')}<button class="body" style="text-align:left" data-action="ep-sheet" data-id="${esc(e.id)}"><span class="t">${esc(e.title)}</span><span class="s">${esc(e.podTitle)} · ${fmtDur(e.dur)}</span></button>
      <span class="q-tools"><button class="icon-btn" data-action="q-up" data-i="${i}" ${i ? '' : 'disabled'} aria-label="Sposta su">${icon('up')}</button><button class="icon-btn" data-action="q-down" data-i="${i}" ${i < S.queue.length - 1 ? '' : 'disabled'} aria-label="Sposta giù">${icon('down')}</button><button class="icon-btn" data-action="q-del" data-i="${i}" aria-label="Togli dalla coda">${icon('close')}</button></span></li>`;
    }).join('') + '</ul>';
  }
  view.innerHTML = html;
}

/* Scaricati */
function renderDl() {
  setTop('Scaricati');
  const items = Object.entries(S.dl).sort((a, b) => b[1].at - a[1].at);
  const active = Object.keys(dlActive);
  if (!items.length && !active.length) {
    view.innerHTML = `<div class="empty">${icon('download')}<h2>Niente di scaricato</h2><p>Scarica un episodio dal suo menu per ascoltarlo senza connessione, per esempio in metro o in aereo.</p></div>`;
    return;
  }
  const used = items.reduce((a, [, d]) => a + d.size, 0);
  let html = `<div class="stat"><span>${items.length} episodi</span><span>${fmtBytes(used)} usati</span></div>`;
  html += `<ul class="list">${items.map(([, d]) => epRow(d.ep, { showPod: true })).join('')}</ul>`;
  if (active.length) html += `<div class="section-label">In corso</div><p class="hint">${active.length} download in corso…</p>`;
  view.innerHTML = html;
}

/* ---------- Fogli (bottom sheet) ---------- */
let sheet = null; // {type, id}
function openSheet(s) { sheet = s; renderSheet(); $('#sheetWrap').hidden = false; document.body.style.overflow = 'hidden'; }
function closeSheet() {
  if (sheet?.type === 'video') { sheet.saveVideo?.(); $('#sheet').innerHTML = ''; render(); }
  sheet = null; $('#sheetWrap').hidden = true; document.body.style.overflow = ''; }
function renderSheet() {
  if (!sheet) return;
  const el = $('#sheet');
  if (sheet.type === 'player') { el.innerHTML = playerHtml(); updateProgressUi(); return; }
  if (sheet.type === 'ep') {
    const ep = sheet.ep;
    const p = progOf(ep);
    const inQ = S.queue.some((q) => q.id === ep.id);
    const head = `<div class="grabber"></div><h3>${esc(ep.title)}</h3><div class="sub">${esc(ep.podTitle)} · ${fmtDate(ep.date)}${ep.dur ? ' · ' + fmtDur(ep.dur) : ''}</div>`;
    if (isYt(ep)) {
      el.innerHTML = `${head}
      <div class="row-actions"><button class="btn" data-action="watch" data-id="${esc(ep.id)}">${icon('play')}Guarda</button><a class="btn ghost" href="${esc(ep.url)}" target="_blank" rel="noopener">${icon('external')}Apri in YouTube</a>${IS_APP ? `<button class="btn ghost" data-action="newpipe" data-url="${esc(ep.url)}">${icon('headphones')}Apri in NewPipe</button>` : ''}</div>
      <div class="menu"><button data-action="toggle-done" data-close="1">${icon('check')}${p.done ? 'Segna come da vedere' : 'Segna come visto'}</button>
      ${!subOf(ep.feed) ? '' : `<button data-action="open-pod" data-feed="${esc(ep.feed)}" data-close="1">${icon('grid')}Vai al canale</button>`}</div>
      ${ep.desc ? `<div class="notes">${cleanHTML(ep.desc)}</div>` : ''}`;
      return;
    }
    el.innerHTML = `${head}
      <div class="row-actions">${isVideo(ep) ? `<button class="btn" data-action="watch" data-id="${esc(ep.id)}">${icon('video')}Guarda il video</button>` : ''}<button class="btn ${isVideo(ep) ? 'ghost' : ''}" data-action="play" data-id="${esc(ep.id)}" data-close="1">${icon('play')}${p.pos && !p.done ? 'Riprendi da ' + fmtTime(p.pos) : isVideo(ep) ? 'Solo audio' : 'Ascolta'}</button></div>
      <div class="menu">
        <button data-action="q-next" data-close="1">${icon('next')}Riproduci dopo questo</button>
        <button data-action="q-add" data-close="1" ${inQ ? 'disabled' : ''}>${icon('queueAdd')}${inQ ? 'Già in coda' : 'Aggiungi in coda'}</button>
        ${S.dl[ep.id] ? `<button data-action="dl-del" data-close="1" class="danger">${icon('trash')}Elimina download (${fmtBytes(S.dl[ep.id].size)})</button>` : ep.id in dlActive ? `<button disabled>${icon('download')}Download in corso</button>` : `<button data-action="dl" data-close="1">${icon('download')}Scarica per l'ascolto offline${ep.size ? ` (${fmtBytes(ep.size)})` : ''}</button>`}
        <button data-action="toggle-done" data-close="1">${icon('check')}${p.done ? 'Segna come da ascoltare' : 'Segna come ascoltato'}</button>
        ${!subOf(ep.feed) ? '' : `<button data-action="open-pod" data-feed="${esc(ep.feed)}" data-close="1">${icon('grid')}Vai al podcast</button>`}
      </div>
      ${ep.desc ? `<div class="notes">${cleanHTML(ep.desc)}</div>` : ''}`;
    return;
  }
  if (sheet.type === 'video') {
    const ep = sheet.ep;
    const p = progOf(ep);
    const start = p.pos && !p.done ? Math.floor(p.pos) : 0;
    const player = isYt(ep)
      ? `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(ep.yt)}?autoplay=1&playsinline=1&rel=0&modestbranding=1${start ? '&start=' + start : ''}&origin=${encodeURIComponent(location.origin)}" title="${esc(ep.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`
      : `<video id="vplayer" src="${esc(ep.url)}" ${ep.image || artFor(ep) ? `poster="${esc(ep.image || artFor(ep))}"` : ''} controls playsinline autoplay preload="metadata"></video>`;
    el.innerHTML = `<div class="grabber"></div><div class="video-box">${player}</div>
      <h3>${esc(ep.title)}</h3><div class="sub">${esc(ep.podTitle)} · ${fmtDate(ep.date)}</div>
      <div class="row-actions">${isYt(ep) ? `<a class="btn ghost" href="${esc(ep.url)}" target="_blank" rel="noopener">${icon('external')}Apri in YouTube</a>${IS_APP ? `<button class="btn ghost" data-action="newpipe" data-url="${esc(ep.url)}">${icon('headphones')}Apri in NewPipe</button>` : ''}` : `<button class="btn ghost" data-action="play" data-id="${esc(ep.id)}" data-close="1">${icon('headphones')}Continua solo audio</button>`}</div>
      ${isYt(ep) ? '<p class="hint">Il video si ferma se chiudi questa schermata o spegni lo schermo.</p>' : ''}`;
    const v = $('#vplayer');
    if (v) {
      v.addEventListener('loadedmetadata', () => { if (start > 3 && start < v.duration - 3) v.currentTime = start; v.playbackRate = S.settings.speed; }, { once: true });
      const save = () => { if (!v.duration) return; const q = S.prog[ep.id] || (S.prog[ep.id] = {}); q.pos = v.currentTime; q.dur = v.duration; q.t = Date.now(); if (v.duration - v.currentTime < 30 && v.currentTime > 60) q.done = true; persist('prog'); };
      v.addEventListener('pause', save); v.addEventListener('timeupdate', () => { if (Date.now() - (v._s || 0) > 5000) { v._s = Date.now(); save(); } });
      v.addEventListener('ended', () => { const q = S.prog[ep.id] || (S.prog[ep.id] = {}); q.done = true; q.pos = 0; q.t = Date.now(); persist('prog'); });
      sheet.saveVideo = save;
    } else {
      const q = S.prog[ep.id] || (S.prog[ep.id] = { pos: 0 });
      q.done = true; q.t = Date.now(); persist('prog');
    }
    return;
  }
  if (sheet.type === 'rss') {
    el.innerHTML = `<div class="grabber"></div><h3>Aggiungi un feed o un canale</h3><div class="sub">Incolla l'indirizzo del feed del podcast, oppure il link di un canale YouTube (per esempio youtube.com/@nome).</div>
      <form id="rssForm"><div class="field"><input id="rssUrl" type="text" placeholder="https://esempio.it/feed.xml oppure @canale" required inputmode="url" autocapitalize="off" autocomplete="off" aria-label="Indirizzo del feed o del canale"></div><button class="btn" type="submit">${icon('plus')}Apri</button></form>`;
    setTimeout(() => $('#rssUrl')?.focus(), 50);
    return;
  }
  if (sheet.type === 'sync') {
    const sy = S.sync;
    el.innerHTML = sy.token ? `<div class="grabber"></div><h3>Sincronizzazione attiva</h3>
      <div class="sub">Abbonamenti, posizioni di ascolto, episodi ascoltati e coda restano uguali su tutti i dispositivi collegati allo stesso account GitHub.</div>
      <p class="hint" id="syncStatus">${syncing ? 'Sincronizzo…' : sy.error ? esc(sy.error) : sy.last ? 'Ultima sincronizzazione: ' + new Date(sy.last).toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' }) : 'Mai sincronizzato'}</p>
      <div class="menu"><button data-action="sync-now">${icon('refresh')}Sincronizza ora</button>
      <button data-action="sync-off" class="danger">${icon('close')}Scollega questo dispositivo</button></div>`
      : `<div class="grabber"></div><h3>Sincronizza telefono e browser</h3>
      <div class="sub">I tuoi dati vengono salvati in un file privato sul tuo account GitHub gratuito. Fai questi passaggi una volta per ogni dispositivo.</div>
      <ol class="steps">
        <li>Crea un account su <a href="https://github.com/signup" target="_blank" rel="noopener">github.com</a> (se non lo hai già).</li>
        <li>Apri <a href="https://github.com/settings/tokens/new?scopes=gist&description=PodGB" target="_blank" rel="noopener">questa pagina</a>, scegli come scadenza "No expiration", lascia spuntato solo <b>gist</b> e tocca "Generate token".</li>
        <li>Copia la chiave che inizia con <code>ghp_</code> e incollala qui sotto. Usa la stessa chiave sul telefono e nel browser.</li>
      </ol>
      <form id="syncForm"><div class="field"><input id="syncToken" type="password" placeholder="ghp_…" required autocomplete="off" autocapitalize="off" aria-label="Chiave GitHub"></div><button class="btn" type="submit">${icon('check')}Collega</button></form>
      ${sy.error ? `<p class="err">${esc(sy.error)}</p>` : ''}`;
    return;
  }
  if (sheet.type === 'subs-menu') {
    el.innerHTML = `<div class="grabber"></div><h3>Abbonamenti</h3><div class="menu">
      <button data-action="add-rss">${icon('rss')}Aggiungi feed RSS o canale YouTube</button>
      <button data-action="sync-sheet">${icon('refresh')}Sincronizzazione${S.sync.token ? ' · attiva' : ''}</button>
      <label for="opmlFile">${icon('upload')}Importa da file OPML</label><input type="file" id="opmlFile" accept=".opml,.xml,text/xml,text/x-opml" hidden>
      <button data-action="export-opml" data-close="1" ${S.subs.length ? '' : 'disabled'}>${icon('file')}Esporta in OPML</button>
      <button data-action="refresh" data-close="1">${icon('refresh')}Aggiorna tutti i feed</button>
      ${deferredInstall ? `<button data-action="install" data-close="1">${icon('install')}Installa l'app</button>` : ''}
    </div><p class="hint">PodGB ${IS_APP ? esc(window.PodGBAndroid.version ? window.PodGBAndroid.version() : '') : 'web'}</p>`;
    return;
  }
  if (sheet.type === 'pod-menu') {
    el.innerHTML = `<div class="grabber"></div><h3>${esc(subOf(sheet.feed)?.title || '')}</h3><div class="menu">
      <button data-action="refresh-one" data-feed="${esc(sheet.feed)}" data-close="1">${icon('refresh')}Aggiorna episodi</button>
      <button data-action="all-done" data-feed="${esc(sheet.feed)}" data-close="1">${icon('check')}Segna tutto come ascoltato</button>
      <button data-action="copy-feed" data-feed="${esc(sheet.feed)}" data-close="1">${icon('rss')}Copia indirizzo del feed</button>
      <button data-action="unsub" data-feed="${esc(sheet.feed)}" data-close="1" class="danger">${icon('trash')}Annulla iscrizione</button>
    </div>`;
  }
}
const SPEEDS = [0.8, 1, 1.2, 1.5, 1.75, 2, 2.5, 3];
function playerHtml() {
  const ep = S.cur;
  if (!ep) return '';
  const playing = !audio.paused && loadedId === ep.id;
  const sleepLabel = sleepAt === -1 ? 'Fine episodio' : sleepAt > 0 ? `${Math.ceil((sleepAt - Date.now()) / 60000)} min` : 'Spento';
  return `<div class="grabber"></div><div class="player">
    ${artFor(ep) ? `<img class="big-art art" src="${esc(artFor(ep))}" alt="" data-title="${esc(ep.podTitle)}">` : phArt(ep.podTitle, 'big-art')}
    <h3 class="pt">${esc(ep.title)}</h3><div class="pp">${esc(ep.podTitle)}</div>
    <div class="seek"><input type="range" id="seek" min="0" max="1000" value="0" aria-label="Posizione"><div class="times"><span id="tCur">0:00</span><span id="tLeft">-0:00</span></div></div>
    <div class="controls">
      <button class="icon-btn" data-action="skip" data-s="-${S.settings.back}" aria-label="Indietro di ${S.settings.back} secondi">${icon('rew')}<span class="skip-n">${S.settings.back}</span></button>
      <button class="icon-btn play-btn big" data-action="toggle" aria-label="${playing ? 'Pausa' : 'Riproduci'}" id="bigPlay">${icon(playing ? 'pause' : 'play')}</button>
      <button class="icon-btn" data-action="skip" data-s="${S.settings.fwd}" aria-label="Avanti di ${S.settings.fwd} secondi">${icon('fwd')}<span class="skip-n">${S.settings.fwd}</span></button>
    </div>
    <div class="opt-row"><span class="lbl">Velocità · ${String(S.settings.speed).replace('.', ',')}×</span><div class="chips">${SPEEDS.map((s) => `<button class="chip ${s === S.settings.speed ? 'on' : ''}" data-action="speed" data-v="${s}">${String(s).replace('.', ',')}×</button>`).join('')}</div></div>
    <div class="opt-row"><span class="lbl">Timer di spegnimento · ${sleepLabel}</span><div class="chips">${[[0, 'Spento'], [15, '15 min'], [30, '30 min'], [45, '45 min'], [60, '1 ora'], [-1, 'Fine episodio']].map(([m, l]) => `<button class="chip ${(m === 0 && !sleepAt) || (m === -1 && sleepAt === -1) ? 'on' : ''}" data-action="sleep" data-m="${m}">${l}</button>`).join('')}</div></div>
    ${S.queue.length ? `<div class="opt-row"><span class="lbl">A seguire</span><button class="pod-row" data-action="q-skip">${artImg(artFor(S.queue[0]), S.queue[0].podTitle, 's48')}<span class="meta"><span class="t">${esc(S.queue[0].title)}</span><span class="s">${esc(S.queue[0].podTitle)}${S.queue.length > 1 ? ` · e altri ${S.queue.length - 1}` : ''}</span></span>${icon('next')}</button></div>` : ''}
  </div>`;
}

/* ---------- Mini player ---------- */
function updateMini() {
  const m = $('#mini');
  if (!S.cur) { m.hidden = true; return; }
  m.hidden = false;
  const art = artFor(S.cur);
  const img = $('#miniArt');
  if (art) { if (img.getAttribute('src') !== art) { img.dataset.failed = ''; img.style.visibility = ''; img.src = art; } } else img.style.visibility = 'hidden';
  $('#miniTitle').textContent = S.cur.title;
  updatePlayIcons();
  updateProgressUi();
}
function updatePlayIcons() {
  const playing = S.cur && loadedId === S.cur.id && !audio.paused;
  $('#miniPlay').innerHTML = icon(playing ? 'pause' : 'play');
  $('#miniPlay').setAttribute('aria-label', playing ? 'Pausa' : 'Riproduci');
  const bp = $('#bigPlay'); if (bp) { bp.innerHTML = icon(playing ? 'pause' : 'play'); bp.setAttribute('aria-label', playing ? 'Pausa' : 'Riproduci'); }
  document.querySelectorAll('.ep-play').forEach((b) => {
    const on = playing && b.dataset.id === S.cur.id;
    b.classList.toggle('playing', on); b.innerHTML = icon(on ? 'pause' : 'play');
  });
}
let seeking = false;
function updateProgressUi() {
  if (!S.cur) return;
  const live = loadedId === S.cur.id;
  const p = progOf(S.cur);
  const pos = live ? audio.currentTime : p.pos || 0;
  const dur = (live && audio.duration && isFinite(audio.duration)) ? audio.duration : p.dur || S.cur.dur || 0;
  $('#miniBar').style.width = dur ? (pos / dur) * 100 + '%' : '0';
  $('#miniSub').textContent = `${S.cur.podTitle}${dur ? ' · ' + fmtTime(pos) + ' / ' + fmtTime(dur) : ''}${S.settings.speed !== 1 ? ' · ' + String(S.settings.speed).replace('.', ',') + '×' : ''}`;
  const sk = $('#seek');
  if (sk && !seeking) {
    sk.value = dur ? Math.round((pos / dur) * 1000) : 0;
    $('#tCur').textContent = fmtTime(pos);
    $('#tLeft').textContent = '-' + fmtTime(Math.max(0, dur - pos) / (S.settings.speed || 1));
  }
  if ('mediaSession' in navigator && live && dur && navigator.mediaSession.setPositionState) {
    try { navigator.mediaSession.setPositionState({ duration: dur, position: Math.min(pos, dur), playbackRate: S.settings.speed }); } catch (e) { /* ignora */ }
  }
}

/* ---------- OPML ---------- */
async function importOpml(file) {
  const xml = await file.text();
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  const outs = [...doc.getElementsByTagName('outline')].filter((o) => o.getAttribute('xmlUrl'));
  if (!outs.length) { toast('Nessun podcast trovato nel file'); return; }
  let added = 0;
  for (const o of outs) {
    const url = o.getAttribute('xmlUrl');
    if (subOf(url)) continue;
    S.subs.push({ feedUrl: url, title: o.getAttribute('title') || o.getAttribute('text') || url, author: '', artwork: '', lastFetched: 0, added: Date.now() });
    added++;
  }
  S.subs.sort((a, b) => a.title.localeCompare(b.title, 'it'));
  persist('subs');
  toast(`Importati ${added} podcast, scarico gli episodi…`);
  go('subs');
  refreshAll(true);
}
function exportOpml() {
  const body = S.subs.map((s) => `    <outline type="rss" text="${esc(s.title)}" title="${esc(s.title)}" xmlUrl="${esc(s.feedUrl)}"/>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n  <head><title>Abbonamenti PodGB</title></head>\n  <body>\n${body}\n  </body>\n</opml>\n`;
  if (IS_APP) { window.PodGBAndroid.share(xml, 'Abbonamenti PodGB (OPML)'); return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([xml], { type: 'text/x-opml' }));
  a.download = 'podgb-abbonamenti.opml';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

const YT_FEED = (id) => 'https://www.youtube.com/feeds/videos.xml?channel_id=' + id;
async function resolveYouTube(url) {
  let m = url.match(/channel_id=(UC[\w-]{22})/) || url.match(/\/channel\/(UC[\w-]{22})/);
  if (m) return { feedUrl: YT_FEED(m[1]) };
  const html = await fetchText(url);
  m = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/) ||
      html.match(/"externalId":"(UC[\w-]{22})"/) || html.match(/channel_id=(UC[\w-]{22})/) || html.match(/"channelId":"(UC[\w-]{22})"/);
  if (!m) throw new Error('Non trovo il canale. Incolla il link della pagina del canale, per esempio youtube.com/@nome.');
  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  const ot = html.match(/<meta property="og:title" content="([^"]+)"/);
  const dec = (s) => { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; };
  return { feedUrl: YT_FEED(m[1]), artwork: og ? dec(og[1]) : '', title: ot ? dec(ot[1]) : '' };
}
async function addByUrl(url) {
  url = url.trim();
  if (/^@[\w.-]+$/.test(url)) url = 'https://www.youtube.com/' + url;
  if (!/^https?:\/\//i.test(url)) { toast('Serve un indirizzo che inizi con http:// o https://'); return; }
  closeSheet();
  nav.tab = 'search';
  if (/(^|\.)youtube\.com\//i.test(url.replace(/^https?:\/\//, '')) && !/\/feeds\//.test(url)) {
    toast('Cerco il canale…', 1500);
    try {
      const r = await resolveYouTube(url);
      openPod(r.feedUrl, { title: r.title || 'Canale YouTube', artwork: r.artwork, author: 'YouTube' });
    } catch (e) { toast(e.message || 'Canale non trovato', 4500); }
    return;
  }
  openPod(url, { title: 'Caricamento feed…' });
}

function openVideo(ep) {
  if (!audio.paused) audio.pause();
  if (sheet?.type === 'video') closeSheet();
  openSheet({ type: 'video', ep });
}

/* ---------- Eventi ---------- */
const findEp = (id) => epIndex.get(id) || (S.cur?.id === id ? S.cur : null) || S.queue.find((e) => e.id === id) || S.dl[id]?.ep || Object.values(S.eps).flat().find((e) => e.id === id) || Object.values(preview).flatMap((p) => p.eps || []).find((e) => e.id === id);

document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-action]');
  if (!b || b.disabled) return;
  const a = b.dataset.action;
  const sheetEp = sheet?.ep;
  if (b.dataset.close) closeSheet();
  switch (a) {
    case 'tab': go(b.dataset.tab); break;
    case 'play': { const ep = findEp(b.dataset.id); if (ep && isYt(ep)) openVideo(ep); else if (ep) playEp(ep); break; }
    case 'newpipe': if (!window.PodGBAndroid.openIn(b.dataset.url, 'org.schabi.newpipe')) toast('NewPipe non è installata su questo telefono. Puoi scaricarla da F-Droid o dal sito newpipe.net.', 5000); break;
    case 'watch': { const ep = findEp(b.dataset.id) || sheetEp; if (ep) openVideo(ep); break; }
    case 'ep-sheet': { const ep = findEp(b.dataset.id); if (ep) openSheet({ type: 'ep', ep }); break; }
    case 'q-add': enqueue(sheetEp, false); break;
    case 'q-next': enqueue(sheetEp, true); break;
    case 'q-up': moveQ(+b.dataset.i, -1); break;
    case 'q-down': moveQ(+b.dataset.i, 1); break;
    case 'q-del': S.queue.splice(+b.dataset.i, 1); persist('queue'); render(); break;
    case 'q-skip': closeSheet(); playNext(); break;
    case 'clear-queue': if (b.dataset.confirm) { S.queue = []; persist('queue'); render(); toast('Coda svuotata'); } else { b.dataset.confirm = '1'; b.classList.add('on'); toast('Tocca di nuovo per svuotare la coda'); setTimeout(() => { delete b.dataset.confirm; b.classList.remove('on'); }, 3000); } break;
    case 'dl': downloadEp(sheetEp); break;
    case 'dl-del': deleteDl(sheetEp.id); break;
    case 'toggle-done': { const p = S.prog[sheetEp.id] || (S.prog[sheetEp.id] = { pos: 0 }); p.done = !p.done; p.t = Date.now(); if (p.done) p.pos = 0; persist('prog'); render(); break; }
    case 'open-pod': if (b.dataset.feed) { if (b.dataset.close) nav.tab = nav.tab; openPod(b.dataset.feed, { title: b.dataset.title, artwork: b.dataset.art, author: b.dataset.author }); } break;
    case 'open-itunes': openItunes(b); break;
    case 'sub': { const pv = preview[b.dataset.feed]; if (pv?.info) { subscribe(pv.info, pv.eps); render(); } break; }
    case 'unsub': if (b.dataset.close || b.dataset.confirm) { unsubscribe(b.dataset.feed); delete preview[b.dataset.feed]; if (nav.stack.length) back(); else render(); } else { b.dataset.confirm = '1'; b.innerHTML = icon('close') + 'Tocca per annullare'; setTimeout(() => { if (b.isConnected) { delete b.dataset.confirm; b.innerHTML = icon('check') + 'Iscritto'; } }, 3000); } break;
    case 'refresh': refreshAll(false); break;
    case 'refresh-one': { const s = subOf(b.dataset.feed); if (s) { toast('Aggiorno…', 1200); try { const n = await refreshSub(s); persist('eps', 'subs'); render(); toast(n ? `${n} nuovi episodi` : 'Nessun nuovo episodio'); } catch (err) { toast('Feed non raggiungibile'); } } break; }
    case 'all-done': (S.eps[b.dataset.feed] || []).forEach((ep) => { S.prog[ep.id] = { ...(S.prog[ep.id] || {}), done: true, pos: 0, t: Date.now() }; }); persist('prog'); render(); toast('Tutti segnati come ascoltati'); break;
    case 'copy-feed': try { await navigator.clipboard.writeText(b.dataset.feed); toast('Indirizzo copiato'); } catch (err) { toast(b.dataset.feed, 6000); } break;
    case 'filter': { const v = nav.stack[nav.stack.length - 1]; v.filter = b.dataset.f; v.limit = 60; render(); break; }
    case 'more-eps': { const v = nav.stack[nav.stack.length - 1]; v.limit = (v.limit || 60) + 60; render(); break; }
    case 'more-desc': $('#podDesc')?.classList.toggle('open'); b.textContent = $('#podDesc')?.classList.contains('open') ? 'Mostra meno' : 'Mostra tutto'; break;
    case 'subs-menu': openSheet({ type: 'subs-menu' }); break;
    case 'pod-menu': openSheet({ type: 'pod-menu', feed: b.dataset.feed }); break;
    case 'add-rss': openSheet({ type: 'rss' }); break;
    case 'export-opml': exportOpml(); break;
    case 'sync-sheet': openSheet({ type: 'sync' }); break;
    case 'sync-now': syncNow(true); break;
    case 'sync-off': S.sync = { token: '', gistId: '', last: 0, error: '' }; persist('sync'); renderSheet(); toast('Dispositivo scollegato: i dati restano qui e su GitHub'); break;
    case 'install': if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; } break;
    case 'close-sheet': closeSheet(); break;
    case 'toggle': togglePlay(); break;
    case 'skip': skip(+b.dataset.s); updateProgressUi(); break;
    case 'speed': setSpeed(+b.dataset.v); break;
    case 'sleep': setSleep(+b.dataset.m); break;
  }
});
document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => go(t.dataset.tab)));
$('#backBtn').innerHTML = icon('back');
$('#backBtn').addEventListener('click', back);
$('#miniPlay').addEventListener('click', togglePlay);
$('#miniBack').innerHTML = icon('rew');
$('#miniBack').addEventListener('click', () => { skip(-S.settings.back); updateProgressUi(); });
$('#miniOpen').addEventListener('click', () => openSheet({ type: 'player' }));
document.querySelectorAll('[data-icon]').forEach((el) => { el.outerHTML = icon(el.dataset.icon); });

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id === 'searchForm') doSearch($('#q').value);
  if (e.target.id === 'rssForm') addByUrl($('#rssUrl').value);
  if (e.target.id === 'syncForm') { S.sync = { token: $('#syncToken').value.trim(), gistId: '', last: 0, error: '' }; persist('sync'); syncNow(true); }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'q') searchState.q = e.target.value;
  if (e.target.id === 'seek') {
    seeking = true;
    const dur = audio.duration || progOf(S.cur).dur || 0;
    const pos = (e.target.value / 1000) * dur;
    $('#tCur').textContent = fmtTime(pos);
    $('#tLeft').textContent = '-' + fmtTime(Math.max(0, dur - pos));
  }
});
document.addEventListener('change', async (e) => {
  if (e.target.id === 'seek') {
    seeking = false;
    if (loadedId !== S.cur?.id) await loadIntoAudio(S.cur);
    if (audio.duration) { audio.currentTime = (e.target.value / 1000) * audio.duration; savePos(); }
  }
  if (e.target.id === 'opmlFile' && e.target.files[0]) { closeSheet(); importOpml(e.target.files[0]); }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sheet) closeSheet();
  if (e.key === ' ' && !/INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName) && S.cur) { e.preventDefault(); togglePlay(); }
});
setInterval(() => { if (sheet?.type === 'player' && sleepAt > 0) { const l = document.querySelector('.opt-row:nth-of-type(2) .lbl'); if (l) l.textContent = `Timer di spegnimento · ${Math.ceil((sleepAt - Date.now()) / 60000)} min`; } }, 20000);

/* ---------- Installazione ---------- */
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredInstall = e; });
window.__podgbToggle = () => { togglePlay(); return true; };
window.__podgbBack = () => {
  if (sheet) { closeSheet(); return true; }
  if (nav.stack.length) { back(); return true; }
  if (nav.tab !== 'new' && S.subs.length) { go('new'); return true; }
  return false;
};
if (!IS_APP && 'serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* offline non disponibile */ });
}

/* ---------- Avvio ---------- */
/* ---------- Collegamento con il player nativo (APK) ---------- */
let syncTimer;
function syncNative() {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    try {
      const prog = {};
      for (const [id, p] of Object.entries(S.prog)) if (p.t) prog[id] = { pos: p.pos || 0, dur: p.dur || 0, done: !!p.done, t: p.t };
      const lib = {
        subs: S.subs.filter((s) => !(S.eps[s.feedUrl] || []).some(isYt)).map((s) => ({ feedUrl: s.feedUrl, title: s.title, author: s.author || '', artwork: s.artwork || '', eps: (S.eps[s.feedUrl] || []).slice(0, 40).map(slimEp) })),
        queue: S.queue.map(slimEp),
        dl: Object.values(S.dl).map((d) => slimEp(d.ep)),
        prog
      };
      window.PodGBAndroid.sync(JSON.stringify(lib));
    } catch (e) { console.warn('sync', e); }
  }, 300);
}
window.__podgbNative = (type, d) => {
  if (type === 'nowplaying' && d.ep) {
    const known = findEp(d.ep.id);
    S.cur = { ...(known || d.ep), podArt: d.ep.art };
    S.queue = S.queue.filter((e) => e.id !== d.ep.id);
    loadedId = d.ep.id;
    audio.src = d.ep.url;
    persist('cur', 'queue'); updateMini(); render(); renderSheet();
    return;
  }
  if (type === 'dlprogress') { dlActive[d.id] = d.pct; paintDl(d.id); return; }
  if (type === 'dldone') {
    const ep = findEp(d.id) || dlEp[d.id];
    delete dlActive[d.id];
    if (ep) { S.dl[d.id] = { size: d.size, at: Date.now(), ep: { ...ep, podArt: artFor(ep) } }; persist('dl'); }
    render(); toast('Scaricato: disponibile offline');
    return;
  }
  if (type === 'dlfail') { delete dlActive[d.id]; render(); toast('Download non riuscito: riprova più tardi.', 4000); return; }
  audio._event(type, d || {});
};
const dlEp = {};
function restoreNative() {
  let st = {};
  try { st = JSON.parse(window.PodGBAndroid.state() || '{}'); } catch (e) { return; }
  for (const [id, p] of Object.entries(st.prog || {})) {
    const mine = S.prog[id];
    if (!mine || (p.t || 0) > (mine.t || 0)) S.prog[id] = { pos: p.pos, dur: p.dur, done: p.done, t: p.t };
  }
  if (st.cur && st.cur.id) {
    const known = findEp(st.cur.id);
    S.cur = { ...(known || st.cur), podArt: st.cur.art };
    if (st.loaded) { loadedId = st.cur.id; audio.src = st.cur.url; audio.restore(st); }
  }
  if (Array.isArray(st.queueIds)) S.queue = S.queue.filter((e) => st.queueIds.includes(e.id));
  persist('prog', 'cur', 'queue');
}

/* ---------- Sincronizzazione tramite un Gist privato su GitHub ---------- */
const SYNC_DESC = 'PodGB – sincronizzazione (non modificare)';
const SYNC_FILE = 'podgb-sync.json';
let syncing = false, syncTimer2;
function scheduleSync(ms) {
  if (!S.sync.token) return;
  clearTimeout(syncTimer2);
  syncTimer2 = setTimeout(() => syncNow(false), ms);
}
async function gh(path, opts = {}) {
  const headers = { Authorization: 'Bearer ' + S.sync.token, Accept: 'application/vnd.github+json' };
  if (opts.body) headers['Content-Type'] = 'application/json';
  const r = await fetchTimeout('https://api.github.com' + path, 20000, { ...opts, headers, cache: 'no-store' });
  if (r.status === 401) throw new Error('La chiave GitHub non è valida o è scaduta. Scollega e incollane una nuova.');
  if (r.status === 404 && path.startsWith('/gists/')) { const e = new Error('gist mancante'); e.missing = true; throw e; }
  if (!r.ok) throw new Error('GitHub non risponde (' + r.status + '). Riprovo più tardi.');
  return r.json();
}
function syncPayload() {
  const prog = {};
  for (const [id, p] of Object.entries(S.prog)) prog[id] = { pos: Math.round(p.pos || 0), dur: Math.round(p.dur || 0), done: !!p.done, t: p.t || 0 };
  return {
    v: 1, at: Date.now(),
    subs: S.subs.map((s) => ({ feedUrl: s.feedUrl, title: s.title, author: s.author || '', artwork: s.artwork || '', added: s.added || 0 })),
    removed: S.removed,
    prog,
    queue: { t: S.queueT || 0, items: S.queue.map((e) => ({ ...slimEp(e), image: e.image || '', yt: e.yt || undefined })) },
    speed: S.settings.speed
  };
}
function mergeRemote(r) {
  if (!r || r.v !== 1) return [];
  applyingRemote = true;
  const before = JSON.stringify(syncPayload());
  for (const [f, t] of Object.entries(r.removed || {})) if (!S.removed[f] || t > S.removed[f]) S.removed[f] = t;
  const fresh = [];
  for (const rs of r.subs || []) {
    const mine = subOf(rs.feedUrl);
    if (mine) { mine.added = Math.max(mine.added || 0, rs.added || 0); continue; }
    if ((rs.added || 0) > (S.removed[rs.feedUrl] || 0)) { const ns = { ...rs, lastFetched: 0 }; S.subs.push(ns); fresh.push(ns); }
  }
  for (const s of [...S.subs]) if ((S.removed[s.feedUrl] || 0) > (s.added || 0)) { S.subs = S.subs.filter((x) => x !== s); delete S.eps[s.feedUrl]; }
  S.subs.sort((a, b) => a.title.localeCompare(b.title, 'it'));
  for (const [id, p] of Object.entries(r.prog || {})) {
    const mine = S.prog[id];
    if (!mine || (p.t || 0) > (mine.t || 0)) S.prog[id] = { ...p };
  }
  if (r.queue && (r.queue.t || 0) > (S.queueT || 0)) {
    S.queue = (r.queue.items || []).filter((e) => !S.cur || e.id !== S.cur.id).map((e) => ({ ...e, podArt: e.art }));
    S.queueT = r.queue.t;
  }
  const changed = before !== JSON.stringify(syncPayload());
  if (changed) persist('subs', 'eps', 'prog', 'queue', 'removed', 'queueT');
  applyingRemote = false;
  return { fresh, changed };
}
async function syncNow(manual) {
  if (!S.sync.token || syncing) return;
  syncing = true; if (sheet?.type === 'sync') renderSheet();
  try {
    let remote = null;
    if (S.sync.gistId) {
      try {
        const g = await gh('/gists/' + S.sync.gistId);
        const f = g.files?.[SYNC_FILE];
        remote = f ? JSON.parse(f.truncated ? await (await fetchTimeout(f.raw_url, 20000)).text() : f.content) : null;
      } catch (e) { if (e.missing) S.sync.gistId = ''; else throw e; }
    }
    if (!S.sync.gistId) {
      const list = await gh('/gists?per_page=100');
      const found = list.find((g) => g.description === SYNC_DESC && g.files?.[SYNC_FILE]);
      if (found) {
        S.sync.gistId = found.id;
        const g = await gh('/gists/' + found.id);
        const f = g.files[SYNC_FILE];
        remote = JSON.parse(f.truncated ? await (await fetchTimeout(f.raw_url, 20000)).text() : f.content);
      }
    }
    const res = remote ? mergeRemote(remote) : { fresh: [], changed: false };
    const out = JSON.stringify(syncPayload());
    if (!S.sync.gistId) {
      const g = await gh('/gists', { method: 'POST', body: JSON.stringify({ description: SYNC_DESC, public: false, files: { [SYNC_FILE]: { content: out } } }) });
      S.sync.gistId = g.id;
    } else if (syncDirty || !remote || res.changed) {
      await gh('/gists/' + S.sync.gistId, { method: 'PATCH', body: JSON.stringify({ files: { [SYNC_FILE]: { content: out } } }) });
    }
    syncDirty = false;
    S.sync.last = Date.now(); S.sync.error = '';
    persist('sync');
    if (res.changed) { render(); updateMini(); }
    if (res.fresh.length) refreshAll(true);
    if (manual) toast(res.changed ? 'Sincronizzato: dati aggiornati dagli altri dispositivi' : 'Sincronizzato');
  } catch (e) {
    S.sync.error = e.message || 'Sincronizzazione non riuscita';
    persist('sync');
    if (manual) toast(S.sync.error, 4500);
  }
  syncing = false;
  if (sheet?.type === 'sync') renderSheet();
}
document.addEventListener('visibilitychange', () => {
  if (!S.sync.token) return;
  if (document.hidden) { if (syncDirty) syncNow(false); } else scheduleSync(500);
});
setInterval(() => { if (!document.hidden) syncNow(false); }, 180000);

(async function start() {
  await load();
  if (IS_APP) restoreNative();
  scheduleSync(1500);
  go(S.subs.length ? 'new' : 'search');
  updateMini();
  const stale = S.subs.some((s) => Date.now() - (s.lastFetched || 0) > 3600000);
  if (stale && navigator.onLine !== false) refreshAll(true);
})();
