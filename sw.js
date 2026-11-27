const APP_CACHE = 'trailsync-app-shell-v15-2-14';
const APP_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icono_motorista.glb'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(APP_CACHE).then(cache => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== APP_CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  if (url.includes('manifest.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).catch(() => caches.match('./manifest.json'))
    );
    return;
  }

  // No interceptar ni guardar teselas de mapas en caché del navegador
  if (
    url.includes('tile.openstreetmap.org') ||
    url.includes('tile-cyclosm.openstreetmap.fr') ||
    url.includes('opentopomap.org') ||
    url.includes('arcgisonline.com') ||
    url.includes('ign.es') ||
    url.includes('basemaps.cartocdn.com') ||
    url.includes('google.com/vt')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(resp => {
        if (resp && resp.ok && (url.includes('leaflet') || url.includes('mqtt'))) {
          const clone = resp.clone();
          caches.open(APP_CACHE).then(c => c.put(event.request, clone));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
