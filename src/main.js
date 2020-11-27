import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入自定义的控件
import '@/plugins/mycontrols'

// 导入全局样式
import './assets/css/global.css'
// 导入axios
import axios from 'axios'
// 导入qs，用于序列化发送参数
import qs from 'qs'

// InfiniteScroll无限滚动
import infiniteScroll from 'vue-infinite-scroll'

// 引入MD5
import md5 from 'js-md5'

// 配置请求根路径
axios.defaults.baseURL = 'http://ormissia.com:13880/api/'
// Session id一致
// axios.defaults.withCredentials = true
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
