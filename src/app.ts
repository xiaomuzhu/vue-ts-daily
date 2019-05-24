import { Vue, Component } from 'vue-property-decorator'
import Api from '@/data/api'
const debug = require('debug')('log:App')

declare module "vue/types/vue" {
  interface Vue {
    $mp: any;
  }
}

// 必须使用装饰器的方式来指定components
@Component({
  mpType: 'app', // mpvue特定
} as any)
class App extends Vue {
  // app hook
  onLaunch() {
    let opt = this.$root.$mp.appOptions
    debug('onLaunch', opt)
    Api.login().then(res => {
      debug('login', res)
    })
  }

  onShow() {
    debug('onShow')
  }

  onHide() {
    debug('onHide')
  }

  mounted() { // vue hook
    debug('mounted')
  }
}

export default App
