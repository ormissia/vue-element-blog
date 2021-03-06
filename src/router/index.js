import Vue from 'vue'
import VueRouter from 'vue-router'

// 封面
import BlogCover from '@/components/BlogCover.vue'

// 前台页面
import Index from '@/components/index/Index.vue'
import Article from '@/components/index/Article.vue'
import Tag from '@/components/index/Tag.vue'
import TimeLine from '@/components/index/TimeLine.vue'
// 文章内容页面,也作为前台页面的一个子路由
import ArticleDetail from '@/components/index/ArticleDetail.vue'

// 后台管理页面
import Home from '@/components/background/Home.vue'
import ArticleManagement from '@/components/background/ArticleManagement'
import TypeManagement from '@/components/background/TypeManagement'
import TagManagement from '@/components/background/TagManagement'
// 博客编写组件
import ArticleEditor from '@/components/background/ArticleEditor'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BlogCover
  },
  {
    path: '/index',
    component: Index,
    redirect: '/article',
    children: [
      {
        path: '/article',
        component: Article
      },
      {
        path: '/tag',
        component: Tag
      },
      {
        path: '/timeline',
        component: TimeLine
      },
      {
        // path后面添加 :articleId 为动态路由匹配，使用articleId作为参数，跳转到对应博客的页面
        path: '/articleDetail/:articleId',
        component: ArticleDetail
      }
    ]
  },
  // 后台管理页面
  {
    path: '/background/home',
    component: Home,
    redirect: '/background/articleManagement',
    children: [
      {
        path: '/background/articleManagement',
        component: ArticleManagement
      },
      {
        path: '/background/typeManagement',
        component: TypeManagement
      },
      {
        path: '/background/tagManagement',
        component: TagManagement
      },
      {
        path: '/background/articleEditor/:articleId',
        component: ArticleEditor
      }
    ]
  }
]

const router = new VueRouter({
  // (缩写)相当于 routes: routes
  routes,
  mode: 'hash'
})

// 挂在路由导航守卫
// to将要访问的路径
// from代表从哪个路径跳转而来
// next是一个函数表示放行
//    next()放行    next('/index')强制跳转
router.beforeEach((to, from, next) => {
  // 访问的不是background页面，放行
  if (to.path.indexOf('/background') === -1) return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，跳转到首页
  if (!tokenStr) return next('/index')
  next()
})

export default router
