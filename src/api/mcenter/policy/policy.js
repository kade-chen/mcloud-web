import instance from '@/api/client'

// 检查权限
export var CHECK_PERMISSION = (params) => {
  return instance.get('/mcenter/api/v1/policy', { params: params })
}
