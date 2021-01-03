import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式
import './assets/css/global.css'

// 导入axios
import axios from 'axios'
// 导入qs，用于序列化发送参数
import qs from 'qs'

// 引入MD5
import md5 from 'js-md5'

// InfiniteScroll无限滚动
import infiniteScroll from 'vue-infinite-scroll'

// 配置请求根路径
axios.defaults.baseURL = 'http://ormissia.com:13880/api/'
// 请求头添加token
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$http = axios
// 挂载qs
Vue.prototype.$qs = qs
// 挂载MD5
Vue.prototype.$md5 = md5

// 添加InfiniteScroll无限滚动
Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
