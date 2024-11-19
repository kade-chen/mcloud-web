<script setup>
import { app } from '@/stores/localstorage'
import { LIST_USERS } from '@/api/mcenter/usercenter/user'
// import { Message } from '@arco-design/web-vue'
import { onMounted, reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CHECK_PERMISSION } from '@/api/mcenter/policy/policy'
import { watch } from 'vue'
import { DELETE_USER } from '@/api/mcenter/usercenter/user'

// import ResetPassword from './components/ResetPassword.vue'
// import mapping from '@/stores/mapping'

const currentBackgroundClass = computed(() => {
  return app.value.isBackground
    ? (document.body.removeAttribute('arco-theme'), 'light-background')
    : (document.body.setAttribute('arco-theme', 'dark'), 'dark-background')
})
const router = useRouter()

// 分页参数
const pagination = reactive(app.value.pagination)
const queryParams = reactive({
  page_number: 1,
  page_size: pagination.pageSize
})

const pageChange = (v) => {
  queryParams.page_number = v
  ListUsers()
}
const pageSizeChange = (v) => {
  queryParams.page_size = v
  // console.log('111', v)
  queryParams.page_number = 1
  ListUsers()
}

const queryLoading = ref(false)
const data = reactive({ items: [] })
const ListUsers = async () => {
  try {
    queryLoading.value = true
    var resp = await LIST_USERS(queryParams)
    data.items = resp.data.items
    // console.log(resp.data.items)
    pagination.total = resp.data.total
  } catch (error) {
    // Message.error(`查询用户失败: ${error}`)
  } finally {
    queryLoading.value = false
  }
}

// 更多操作
const currentAction = reactive({
  title: '',
  record: {}
})

const closeDrawer = () => {
  currentAction.title = ''
}

const showDeleteUser = ref(false)
const CHECK_PERMISSION_METHOD = async () => {
  try {
    // onst resp =
    await CHECK_PERMISSION({ role: '', permission: 'user.list' })
    // console.log('ssss', resp)
    // groupLabels.value = resp
  } catch (error) {
    // Notification.error(`查询用户组失败: ${error}`)
    router.push({ name: 'PermissionDeny' })
  }
}

const CHECK_DELETE_PERMISSION_METHOD = async () => {
  try {
    // onst resp =
    const resp = await CHECK_PERMISSION({ role: '', permission: 'user.delete' })
    console.log('check delete user permission', resp)
    showDeleteUser.value = true
    // console.log('ssss', resp)
    // groupLabels.value = resp
  } catch (error) {
    // Notification.error(`查询用户组失败: ${error}`)
    // router.push({ name: 'PermissionDeny' })
  }
}

onMounted(() => {
  // GetUser()
  CHECK_PERMISSION_METHOD()
  ListUsers()
  // check delete permission
  CHECK_DELETE_PERMISSION_METHOD()
})

const record = reactive({
  loading: false
})

const DeleteUsersMethod = async (record) => {
  record.loading = true // 当前行进入加载状态
  try {
    await mockAsyncTask(record) // 执行异步任务
    // const result = await DeleteUserMethod(record.meta.id)
    // await mockAsyncTask() // 执行异步任务
    // console.log(result)
  } catch (error) {
    console.error('操作失败:', error)
  } finally {
    record.loading = false // 恢复当前行的加载状态
  }
}

const mockAsyncTask = (record) => {
  return new Promise((resolve, reject) => {
    DeleteUserMethod(record.meta.id)
      .then((result) => {
        resolve(result) // 成功时调用 resolve
        ListUsers() //reload user list
      })
      .catch((error) => {
        reject('操作失败: ' + error.message) // 捕获并处理错误
      })
  })
}

import { Message } from '@arco-design/web-vue'
const DeleteUserMethod = async (userIds) => {
  try {
    // onst resp =
    // console.log('ssssaq', userIds)
    // 要删除的用户 ID 数组
    const userIdsSlice = [userIds]
    // const userIdsSlice = [userIds, 'kade@kade-domain']
    const resp = await DELETE_USER(userIdsSlice)
    console.log('check delete user permission', resp)
  } catch (error) {
    // Notification.error(`失败: ${error}`)
    Message.error(`${error}`)
    // router.push({ name: 'PermissionDeny' })
  }
}

// 实时监控 record.loading 的变化
watch(
  () => record.loading,
  (loading) => {
    console.log('Loading status changed:', loading)
    if (loading) {
      // 处理加载中的逻辑
    } else {
      // 处理加载完成后的逻辑
    }
  }
)
</script>

<template>
  <a-layout style="padding: 0 24px">
    <a-breadcrumb :style="{ margin: '16px 0' }">
      <a-breadcrumb-item>{{ $t('userCenter.list.home') }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('userCenter.list.users') }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('userCenter.list.list') }}</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 内容操作区 -->
    <a-layout-content :class="['header21', currentBackgroundClass]">
      <div class="page">
        <!-- <BreadcrumbMenu /> -->
        <!-- <div class="table-op">
      <a-button type="primary" :size="app.size" @click="router.push({ name: 'CreateSubUser' })">
        创建用户
      </a-button>
    </div> -->
        <a-table
          :data="data.items"
          :loading="queryLoading"
          :pagination="pagination"
          @page-change="pageChange"
          @page-size-change="pageSizeChange"
          :total="200"
        >
          <template #columns>
            <a-table-column
              :title="$t('userCenter.list.username')"
              data-index="spec.username"
            ></a-table-column>
            <a-table-column
              :title="$t('userCenter.list.password')"
              data-index="password.password"
            ></a-table-column>
            <a-table-column
              :title="$t('userCenter.list.type')"
              data-index="spec.type"
            ></a-table-column>
            <a-table-column
              :title="$t('userCenter.list.domain')"
              data-index="spec.domain"
            ></a-table-column>
            <a-table-column
              :title="$t('userCenter.list.create_at')"
              data-index="meta.create_at"
            ></a-table-column>
            <a-table-column
              :title="$t('userCenter.list.create_from')"
              data-index="spec.create_from"
            ></a-table-column>

            <a-table-column v-if="showDeleteUser" align="center" title="操作1">
              <template #cell="{ record }">
                <a-spin v-if="record.loading"></a-spin>
                <a-button @click="DeleteUsersMethod(record)" v-else> 删除用户 </a-button>
              </template>
            </a-table-column>
          </template>
        </a-table>

        <a-drawer
          :width="340"
          :visible="currentAction.title !== ''"
          unmountOnClose
          :footer="false"
          @cancel="closeDrawer"
        >
          <template #title>
            {{ currentAction.title }}
          </template>
          <component
            :is="actionMap[currentAction.title]"
            v-bind="{ record: currentAction.record }"
            v-on="{ changed: closeDrawer }"
          />
        </a-drawer>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.page {
  height: 750px; /* 页面高度 */
  padding: 10px; /* 内边距，内容与边框之间的距离 */
  overflow: scroll; /* 内容超出时显示滚动条 */
  width: 100%; /* 页面宽度设置为80% */
  max-width: 1200px; /* 最大宽度为1200px，防止页面在大屏幕上太宽 */
  margin: 0 auto; /* 自动水平居中 */
  box-sizing: border-box; /* 包括内边距和边框在内的宽度计算方式 */
}
</style>
