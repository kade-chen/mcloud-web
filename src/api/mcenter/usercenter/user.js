import instance from '../../client'

// 查询空间列表
export var LIST_USERS = (params) => {
  return instance.get('/mcenter/api/v1/users', { params })
}

//创建用户
export var CREATE_USER = (data) => {
  return instance.post('/mcenter/api/v1/users', data)
}

//删除用户
// 删除用户方法：接收用户 ID 数组，并将它们转换为逗号分隔的字符串
export var DELETE_USER = (userIds) => {
  // 如果 userIds 是数组，转换为逗号分隔的字符串
  const userIdsString = Array.isArray(userIds) ? userIds.join(',') : userIds

  // 使用 DELETE 请求，params 中传递用户 ID
  return instance.delete(`/mcenter/api/v1/users`, {
    params: {
      user_ids: userIdsString // 将 userIds 作为字符串传递给 API
    }
  })
}
// export var DELETE_USER = (id) => {
//   return instance.delete(`/mcenter/api/v1/users`, { params: { user_ids: id }
//     // params: {
//     //   user_ids: userIds.join(',') // 将数组转换为逗号分隔的字符串
//     // }
//   })
// }
