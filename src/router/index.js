import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/login/LoginPage.vue'
import LoginPage1 from '../views/login/LoginPage1.vue'
import LoginPage2 from '../views/login/LoginPage2.vue'
import LoginPage3 from '../views/login/LoginPage3.vue'
import { beforeEachHanler } from './permission'

import console from '@/router/cosole'
import user_center from '@/router/user_center'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      // redirect: { path: '/mcenter/api/v1/token/1' },
      component: LoginPage
    },
    {
      path: '/',
      name: 'home',
      // redirect: { path: '/mcenter/api/v1/token/1' },
      component: LoginPage
    },
    {
      // 示例：将特定路径重定向到后端
      path: '/test',
      name: 'home1',
      // redirect: { path: '/mcenter/api/v1/token/1' }
      component: LoginPage1
    },
    {
      // 示例：将特定路径重定向到后端
      path: '/home1',
      name: 'home1',
      // redirect: { path: '/mcenter/api/v1/token/1' }
      component: LoginPage2
    },
    {
      // 示例：将特定路径重定向到后端
      path: '/home2',
      name: 'home2',
      // redirect: { path: '/mcenter/api/v1/token/1' }
      component: LoginPage3
    },
    //console home
    console,
    user_center,
    // 其他通用页面
    {
      path: '/errors/403',
      name: 'PermissionDeny',
      component: () => import('@/views/common/PermissionDeny.vue')
    },
    // 匹配前面所有没有被名字的路由, 都指向404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/common/NotFound.vue')
    }
  ]
})

// 对Router进行导航守卫的设置
// 全局前置守卫
router.beforeEach(beforeEachHanler)

export default router
