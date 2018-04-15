import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue';
import Habit from './views/Habit/Habit.vue';
import New from './views/New/New.vue';

const Library = (r: any) =>
(require as any).ensure([], () => r(require('@/views/New/Library/Library'), 'Library'))   // 菜单

const NewHabit = (r: any) =>
(require as any).ensure([], () => r(require('@/views/New/Habit/Habit'), 'Habit'))   // 菜单


Vue.use(Router);

export default new Router(
  {
  mode: 'history',
  routes: [
    {
      path: '/today',
      name: 'today',
      component: Home,
      meta: {main: true},
    },
    {
      path: '/habit',
      name: 'habit',
      component: Habit,
      meta: {main: true},
      children: [
        // {
        //   path: 'new',
        //   name: 'new',
        //   component: NewHabit,
        // },
      ],
    },
    {
      path: '/new',
      name: '新建习惯',
      component: New,
      children: [
        {
          path: 'library',
          name: '习惯库',
          component: Library,
        },
        {
          path: 'habit',
          name: '习惯',
          component: NewHabit,
        },
      ],
    },
  ],
});
