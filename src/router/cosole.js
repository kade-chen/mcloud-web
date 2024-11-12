export default {
  path: '/service_console',
  name: 'ServiceConsole',
  component: () => import('@/views/console/LayoutPage.vue'),
  redirect: { name: 'ServiceDashboard' },
  children: [
    {
      path: 'dashboard',
      name: 'ServiceDashboard',
      // component: () => import("@/views/console/dashboard/BoardPage.vue"),
      // meta: { label: "终端看板" },
      component: () => import('@/views/console/LayoutPage.vue')
    }
  ]
}
