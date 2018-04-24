/* tslint:disable:no-console */
// declare var self: ServiceWorkerGlobalScope;

const cacheName = 'daily-v1';

import { register } from 'register-service-worker';

if (process.env.NODE_ENV !== 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      self.addEventListener('install', (event: any) => {
        event.waitUntil(
          caches.open(cacheName)
          .then((cache) => cache.addAll([
            './js/main.js',
            './js/article.js',
            './images/newspaper.svg',
            './css/site.css',
            './data/latest.json',
            './data/data-1.json',
            './article.html',
            './index.html',
          ])),
        );
      });
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
