import { ActionTree } from 'vuex';
import axios from 'axios';

import config from '@/config';
import { login } from '@/api/user';

const actions: ActionTree<any, any> = {
    // ajax 初始化
    async initAjax({ dispatch }) {
      dispatch('getModules')
      dispatch('getHeadline')
      setTimeout(() => dispatch('getActivity'), 2000)
      dispatch('getSuperSale')
      dispatch('getShops')
    },

    // 点评头条
    async login({ state, commit }, data) {
      const res: Ajax.AjaxResponse = await login(data).then((res) => res.data).catch((e: string) => console.error(e))
      if (res && res.code === 200) { commit('loginSuccess', res.result) }
    },

  }

export default actions

