import { GetterTree } from 'vuex';

const getters: GetterTree<any, any> = {
  syncData(state) {
    const { activePage, headerInfo, card, habitList, today, setting } = state;
    return {
      activePage,
      headerInfo,
      card,
      habitList,
      today,
      setting,
    };
  },
};

export default getters;
