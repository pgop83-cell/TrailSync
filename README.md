# TrailSync v15.0.0 — Biker Striker

Aplicación web progresiva (PWA) para navegación trail en grupo.

## Archivos incluidos (sin iconos, listos para añadir `icon-128.png` e `icon-512.png` en la raíz)
- `index.html`: Aplicación completa con lobby seguro, GPS físico prioritario, avisos condicionados al inicio de marcha, comprobación legal OSM y caché offline automática.
- `manifest.json`: Configuración PWA apuntando a `./icon-128.png` y `./icon-512.png`.
- `sw.js`: Service Worker v15.0.0 con separación de caché de aplicación y teselas de mapa offline.
