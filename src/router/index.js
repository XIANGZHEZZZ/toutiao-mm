import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    // name: 'layout', 如果父路由有默认的子路由 那它的 name 没有意义
    component: () => import('@/views/layout/index.vue'),
    children:[
      {
        path: '', // 默认子路由，只能有一个 为空就是默认路由
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/wenda',
        name: 'wenda',
        component: () => import('@/views/wenda/index.vue')
      },
      {
        path: '/shipin',
        name: 'shipin',
        component: () => import('@/views/shipin/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    props: true // 开启 Props 传参，说白了就是把路由参数映射到组件的
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('@/views/user-profile/index.vue')
  }
  
]

const router = new VueRouter({
  routes
})

export default router
