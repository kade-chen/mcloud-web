import instance from '../client'

// 登录
export var ISSUE_TOKEN = (data) => {
  return instance.post('/mcenter/api/v1/token', data)
}

export var DELETE_TOKEN = (data) => {
  return instance.delete('/mcenter/api/v1/token', data)
}

export var VERITY_TOKEN = (data) => {
  return instance.get('/mcenter/api/v1/token/verity', data)
}



// // 切换命名空间
// export var CHANGE_NAMESPACE = (data) => {
//   return instance.patch('/mcenter/api/v1/token', data)
// }

// // 令牌颁发记录
// export var LIST_TOKEN = (params) => {
//   return instance.get('/mcenter/api/v1/token', { params })
// }
