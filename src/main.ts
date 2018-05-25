import Vue from 'vue';

import FastClick from 'fastclick';
import VueIconFont from 'vue-icon-font-pro';
import vueEventCalendar from 'vue-event-calendar-pro';
import VueLazyComponent from '@xunlei/vue-lazy-component';
import VueSkeletonLoading from 'vue-skeleton-loading';

import 'normalize.css';
import 'vue2-animate/dist/vue2-animate.min.css';
import 'vue-event-calendar-pro/dist/style.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@/assets/iconfont.js';

// 兼容毒瘤ios的300ms延迟问题
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      (FastClick as any).attach(document.body);
    },
    false,
  );
}

Vue.use(VueLazyComponent);
Vue.use(VueSkeletonLoading);
Vue.use(vueEventCalendar, { locale: 'zh', weekStartOn: 1 });
Vue.use(VueIconFont);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
