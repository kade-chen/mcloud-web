export default {
  path: '/vertex',
  name: 'vertex',
  component: () => import('@/views/vertex/LayoutPage.vue'),
  children: [
    {
      name: 'VertexInfo',
      path: '/vertex/info',
      component: () => import('@/views/vertex/create/create_sub_user.vue'),
      meta:{ label: '用户列表' }
    },
    {
      name: 'CreteSubUser',
      path: '/vertex/create_sub_user',
      component: () => import('@/views/user_center/Create/create_sub_user.vue'),
      meta:{ label: '创建sub用户' }
    }
  ]
}

