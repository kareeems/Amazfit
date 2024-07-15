const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    'index.html',
    'css/style.css',
    'https://unpkg.com/boxicons@latest/css/boxicons.min.css',
    'https://fonts.googleapis.com/css2?family=MuseoModerno:ital,wght@0,100..900;1,100..900&display=swap',
    'img/active.png',
    'img/a1.png',
    'img/gtr3.png',
    'img/a7.png',
    'js/script.js'
];

// Install event
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', e => {
    console.log('Service Worker Activated');
    // Remove old caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', e => {
    console.log('Fetching:', e.request.url);
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
