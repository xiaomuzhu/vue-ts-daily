/* tslint:disable:no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV !== 'production') {
  register(`${process.env.BASE_URL}sw.js`, {
    ready() {
      // navigator.serviceWorker.ready.then(function(reg) {
      //   reg.pushManager.getSubscription().then((res) => {
      //     if (!res) {
      //       subscribe(reg);
      //     } else {
      //       console.log('remain endpoint:', res.endpoint);
      //     }
      //   })
      // });
      // function subscribe(reg) {
      //   reg.pushManager.subscribe({userVisibleOnly: true}).then(function(pushSubscription) {
      //     sub = pushSubscription;
      //     console.log('Subscribed! Endpoint:', sub.endpoint);
      //   });
      // }
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
