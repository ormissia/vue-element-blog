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

// InfiniteScroll无限滚动
import infiniteScroll from 'vue-infinite-scroll'

// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8085/api/private/'
// 远程后台地址
// axios.defaults.baseURL = ''
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$http = axios
// 挂在qs
Vue.prototype.$qs = qs

// 添加InfiniteScroll无限滚动
Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
