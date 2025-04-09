import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/login/LoginPage.vue'
import LoginPage1 from '../views/login/LoginPage1.vue'
import LoginPage2 from '../views/login/LoginPage2.vue'
import LoginPage3 from '../views/login/LoginPage3.vue'
// import LoginPage4 from '../views/login/LoginPage4.vue'
import { beforeEachHanler } from './permission'

import console from '@/router/cosole'
import user_center from '@/router/user_center'
import vertex from '@/router/vertex'
import SttV2WebSocketUpload from '@/views/login/WebSocketUpload.vue'
import WebSocketSteamStt from '@/views/login/WebSocketSteamStt.vue'

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
      path: '/SpeechToTextV1',
      name: 'home3',
      // redirect: { path: 'SpeechToTextV1' }
      component: LoginPage3
    },
    {
      // 示例：将特定路径重定向到后端
      path: '/SttV2WebSocketUpload',
      name: 'SttV2WebSocketUpload',
      // redirect: { path: '/mcenter/api/v1/token/1' }
      component: SttV2WebSocketUpload
    },
    {
      // 示例：将特定路径重定向到后端
      path: '/stream',
      name: 'stream',
      // redirect: { path: '/mcenter/api/v1/token/1' }
      component: WebSocketSteamStt
    },
    //console home
    console,
    user_center,
    vertex, // vertex page
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
