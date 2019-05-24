import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { VueConstructor } from "vue";

let isApp = false; //尝试mpvue-entry
let MyApp;
/* app-only-begin */
isApp = true;
interface IMpVue extends VueConstructor {
  mpType: string
}

// 添加小程序hooks http://mpvue.com/mpvue/#_4
Component.registerHooks([
  // app
  'onLaunch', // 初始化
  'onShow', // 当小程序启动，或从后台进入前台显示
  'onHide', // 当小程序从前台进入后台
  // pages
  'onLoad', // 监听页面加载
  'onShow', // 监听页面显示
  'onReady', // 监听页面初次渲染完成
  'onHide', // 监听页面隐藏
  'onUnload', // 监听页面卸载
  'onPullDownRefresh', // 监听用户下拉动作
  'onReachBottom', // 页面上拉触底事件的处理函数
  'onShareAppMessage', // 用户点击右上角分享
  'onPageScroll', // 页面滚动
  'onTabItemTap', //当前是 tab 页时， 点击 tab 时触发 （mpvue 0.0.16 支持）
])

Vue.config.productionTip = false
// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}
/* app-only-end */

if (isApp) {
  // 在这个地方引入是为了registerHooks先执行
  MyApp = require('./App.vue').default as IMpVue
}else {
  // MyApp = require('./index.vue')
}


const app = new Vue(MyApp)
app.$mount()
