/* Mi Ganado - service worker
   Para publicar una actualización: cambia VER aquí y APP_VERSION en index.html. */
var VER = '1.0.0';
var CACHE = 'mi-ganado-' + VER;
var FONTS = 'mi-ganado-fuentes';
var SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-180.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(SHELL.map(function (u) {
      return fetch(new Request(u, { cache: 'reload' })).then(function (r) {
        if (!r.ok) throw new Error('No se pudo descargar ' + u);
        return c.put(u, r);
      });
    }));
  }));
});

self.addEventListener('message', function (e) {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== CACHE && k !== FONTS; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin === location.origin) {
    e.respondWith(
      caches.match(r, { ignoreSearch: true }).then(function (m) {
        return m || fetch(r).catch(function () {
          return r.mode === 'navigate' ? caches.match('index.html') : Response.error();
        });
      })
    );
    return;
  }
  if (u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONTS).then(function (c) {
        return c.match(r).then(function (m) {
          var f = fetch(r).then(function (x) {
            if (x && (x.ok || x.type === 'opaque')) c.put(r, x.clone());
            return x;
          }).catch(function () { return m; });
          return m || f;
        });
      })
    );
  }
});
