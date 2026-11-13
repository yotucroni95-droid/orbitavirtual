/* App da Órbita Virtual: guarda o site no celular para abrir rápido e funcionar com internet fraca.
   Ao mudar arquivos do site, aumente a versão abaixo para o app baixar a novidade. */
const VERSION = 'orbitavirtual-20261113-icons2';
const CORE = [
  './',
  'index.html',
  'styles.css?v=20261113-orbita7',
  'content.js?v=20261113-orbita7',
  'script.js?v=20261113-orbita7',
  'assets/logo.svg',
  'assets/app/icon-192.png',
  'assets/app/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => (k.startsWith('orbitavirtual-') || /^orbita-v\d+$/.test(k)) && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Página: tenta a internet primeiro (sempre a versão mais nova), cai para a cópia guardada.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('./', copy));
      return res;
    }).catch(() => caches.match('./')));
    return;
  }

  // Arquivos do site e fontes: usa a cópia guardada e atualiza em segundo plano.
  const sameSite = url.origin === location.origin && url.pathname.startsWith('/orbitavirtual/');
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameSite && !fonts) return;
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req);
    const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
