export default {
  path: '/user_center',
  name: 'user_center',
  redirect: { name: 'UserInfo' },
  component: () => import('@/views/user_center/LayoutPage.vue'),
  children: [
    {
      name: 'UserInfo',
      path: '/user_center/user_info',
      component: () => import('@/views/user_center/List/user_list.vue'),
      meta:{ label: '用户列表' }
    },
    {
      name: 'CreteSubUser',
      path: '/user_center/create_sub_user',
      component: () => import('@/views/user_center/Create/create_sub_user.vue'),
      meta:{ label: '创建sub用户' }
    }
  ]
}
