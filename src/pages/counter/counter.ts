import { Component, Emit, Vue } from 'vue-property-decorator'
import { AppUrls } from '@/utils/consts.ts'
// Use Vuex
import store from './store'
const debug = require('debug')('log:Page/Counter')

@Component
export default class Counter extends Vue {
  AppUrls = AppUrls

  // computed
  get count () {
    return store.state.count
  }

  increment() {
    debug('hello4')
    store.commit('increment')
  }

  decrement() {
    store.commit('decrement')
  }
}
