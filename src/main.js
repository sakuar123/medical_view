import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import request from '@/utils/request'

import '@/icons' // icon
import '@/permission'
import axios from "axios"; // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, {locale})
axios.defaults.baseURL = '/api'
Vue.prototype.req = request

Vue.config.productionTip = false
// 这个方法需要放在new Vue之前，不然按F5刷新页面不会调用这个方法
// router.beforeEach(function (to, from, next) {
//   console.log('是否需要登录才能访问')
//   if (to.meta.needLogin) {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       console.log(token)
//       console.log('有cookie信息')
//       next();
//     } else {
//       console.log('无cookie信息')
//       next({
//         path: '/login'
//       });
//     }
//   } else {
//     next();
//   }
// })
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
