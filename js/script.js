let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add('color');
    }else{
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('color');
    }
};

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

Window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
};

const sr = ScrollReveal ({
    distance: '70px',
    duration: 2700,
    reset: true
});

sr.reveal('.hero-text',{delay:200, origin: 'bottom'});
sr.reveal('.hero-img',{delay:350, origin: 'top'});
sr.reveal('.down-arrow',{delay:450, origin: 'right'});

const CACHE_NAME = 'amazfit-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/boxicons.min.css',
    '/js/script.js',
    '/img/active.png',
    '/img/a1.png',
    '/img/gtr3.png',
    '/img/a7.png',
    '/fonts/MuseoModerno-Regular.woff2',
    '/fonts/MuseoModerno-Regular.woff',
    '/fonts/MuseoModerno-Regular.ttf'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
