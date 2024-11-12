import Us_Index from './en-US/settings'

import Dashboard from '@/views/console/dashboard/locale/en-US'
import ListUser from '@/views/user_center/List/locale/cn-Us'
import CreateUser from '@/views/user_center/Create/locale/cn-Us'

export default {
  ...Us_Index,
  ...Dashboard,
  ...ListUser, //list user cn-us
  ...CreateUser //create user cn-us
}
