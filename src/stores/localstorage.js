//  安装:  npm i @vueuse/core， 使用响应式localStorage对象
//  使用 app.isLogin 来
import { useStorage } from '@vueuse/core'

// 帮助把LocalStroage封装成一个响应式的Ref对象
export var app = useStorage(
  'app',
  {
    isLogin: false,
    token: {},
    system: 'ServiceDashboard',
    menu: {
      admin: 'SubUserList',
      console: 'ServiceConsole',
      develop: 'ServiceList',
      resource: 'ResourceSearch',
      setting: 'NamespacePolicyList'
    },
    size: 'medium',
    pagination: {
      size: 'large',
      total: 0,
      // current: 5,
      // pageSize: 20,
      showTotal: true,
      showMore: true,
      showJumper: true,
      showPageSize: true,
      pageSizeOptions: [1, 5, 10, 15, 20]
    },
    xterm: {
      theme: 'Solarized_Darcula'
    },
    serviceTree: {
      selected: ''
    },
    isLanguage: true,
    isBackground: true,
    defaultOpenKeys: '',
    defaultSelectedKeys: '',
    siderDefaultOpenKeys: '',
    siderDefaultSelectedKeys: ''
  },
  localStorage,
  { mergeDefaults: true }
)

export var showMemberManagement = () => {
  if (app.value.token.user_type === 'SUB' && !app.value.token.is_namespace_manager) {
    return false
  }

  return true
}
