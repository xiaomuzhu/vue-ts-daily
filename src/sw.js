importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.skipWaiting();
workbox.clientsClaim();


workbox.routing.registerRoute('/', workbox.strategies.cacheFirst());


// self.addEventListener('push', (event) => {
//     const title = 'Get Started With Workbox';
//     const options = {
//         body: event.data.text()
//     };
//     event.waitUntil(self.registration.showNotification(title, options));
// });


workbox.precaching.precacheAndRoute([]);