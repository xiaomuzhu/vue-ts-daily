import { ActionTree } from 'vuex';
import axios from 'axios';

import config from '@/config';
import { login } from '@/api/user';
import { sync } from '@/api/sync';

const actions: ActionTree<any, any> = {
  // 发起登录
  async login({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await login(data)
      .then(res => res.data)
      .catch((e: string) => console.error(e));
    if (res) {
      commit('loginSuccess', res);
    }
  },

  // 数据同步
  async sync({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await sync(data)
      .then(res => res.data)
      .catch((e: string) => console.error(e));
    if (res) {
      commit('sync', 1);
    }
  },
};

export default actions;
