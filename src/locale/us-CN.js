import Zh_Index from './zh-CN/settings'

import Dashboard from '@/views/console/dashboard/locale/zh-CN'
import ListUser from '@/views/user_center/List/locale/us-CN'
import CreateUser from '@/views/user_center/Create/locale/us-CN'

export default {
  ...Zh_Index,
  ...Dashboard,
  ...ListUser, //list user us-cn
  ...CreateUser //create user us-cn
}
