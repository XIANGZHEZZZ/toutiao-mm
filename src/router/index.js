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
  }
]

const router = new VueRouter({
  routes
})

export default router
