import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Habit from './views/Habit.vue';

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
      component: Habit,
    },
  ],
});
