import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router(
  {
  mode: 'history',
  routes: [
    {
      path: '/today',
      name: 'today',
      component: Home,
    },
    {
      path: '/habit',
      name: 'habit',
      component: About,
    },
  ],
});
