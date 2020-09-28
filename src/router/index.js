import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// 挂在路由导航守卫
// to将要访问的路径
// from代表从哪个路径跳转而来
// next是一个函数表示放行
//    next()放行    next('/login')强制跳转
router.beforeEach((to, from, next) => {
  // 访问登录页和Index页面，放行
  if (to.path === '/login') return next()
  if (to.path === '/index') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
