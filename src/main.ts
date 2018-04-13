import Vue from 'vue';

import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import VueIconFont from 'vue-icon-font';

import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@/assets/iconfont.js';

// 兼容毒瘤ios的300ms延迟问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
      (FastClick as any).attach(document.body);
  }, false);
}

Vue.use(VueIconFont);
Vue.use(VueLazyload, { preLoad: 1 });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
