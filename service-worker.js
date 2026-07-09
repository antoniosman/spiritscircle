const CACHE_NAME = "circle-rush-v7";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/audio/round_theme.mp3",
  "./assets/audio/victory_theme.mp3",
  "./assets/characters/char_alex.webp",
  "./assets/characters/char_billy.webp",
  "./assets/characters/char_catherine.png",
  "./assets/characters/char_demarin.webp",
  "./assets/characters/char_elisa.webp",
  "./assets/characters/char_eva.png",
  "./assets/characters/char_evaggelia.png",
  "./assets/characters/char_evelyn.webp",
  "./assets/characters/char_hope.webp",
  "./assets/characters/char_irene.png",
  "./assets/characters/char_jasmine.png",
  "./assets/characters/char_luna.webp",
  "./assets/characters/char_pauline.webp",
  "./assets/characters/char_phillip.webp",
  "./assets/characters/char_rino.webp",
  "./assets/characters/char_sargenie.jpeg",
  "./assets/characters/char_smaragda.jpeg",
  "./assets/characters/char_sorina.png",
  "./assets/characters/char_tony.webp",
  "./assets/characters/char_vicky.jpg",
  "./assets/characters/char_violet.png",
  "./assets/characters/char_zoe.jpeg",
  "./assets/characters/char_ester.png",
  "./assets/characters/char_vincent.jpg",
  "./assets/characters/char_ian.png",
  "./assets/characters/char_paul.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
