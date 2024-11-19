<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { app } from '@/stores/localstorage'
import { useRouter } from 'vue-router'
import { CREATE_USER } from '@/api/mcenter/usercenter/user'
import { CHECK_PERMISSION } from '@/api/mcenter/policy/policy'
import { Notification } from '@arco-design/web-vue'
// import '@/assets/common/layout.css'; /* 根据你的项目结构调整路径 */

const currentBackgroundClass = computed(() => {
  return app.value.isBackground
    ? (document.body.removeAttribute('arco-theme'), 'light-background')
    : (document.body.setAttribute('arco-theme', 'dark'), 'dark-background')
})

// 选项数据准备
var groupLabels = ref([
  {
    value: 'Dev',
    label: 'Dev',
    children: [
      { value: 'Dev1', label: 'Subgroup 1' },
      { value: 'Dev2', label: 'Subgroup 2' }
    ]
  },
  {
    value: 'Prod',
    label: 'Prod'
  }
])
const CHECK_PERMISSION_METHOD = async () => {
  try {
    // const resp = 
    await CHECK_PERMISSION({ role: '', permission: 'user.list' })
    // console.log('ssss', resp)
    // groupLabels.value = resp
  } catch (error) {
    router.push({ name: 'PermissionDeny' })
    // Notification.error(`查询用户组失败: ${error}`)
  }
}

// 表单
const router = useRouter()
const form = ref({
  username: '',
  password: '',
  shared: false,
  description: '',
  labels: { UserGroup: '' },
  profile: {
    real_name: '',
    nick_name: '',
    phone: '',
    email: '',
    address: '',
    gender: 'UNKNOWN',
    avatar: ''
  },
  locked: undefined,
  locked_reason: ''
})

// 判断更新模式
let pageHeader = '创建用户'
const uid = router.currentRoute.value.query.id
const isCreate = uid === undefined
const GetUser = async () => {
  if (!isCreate) {
    pageHeader = '编辑用户'
    let resp = await GET_SUB_USER(uid)
    resp.password = ''
    form.value = resp
  }
}
onBeforeMount(async () => {
  // GetUser()
  CHECK_PERMISSION_METHOD()
})

// 提交处理
const submitLoading = ref(false)
const handleSubmit = async (data) => {
  // 1. 先显示一个警告通知，表示正在处理
  Notification.warning({
    id: '1',
    title: 'Processing',
    content: 'Create user ...',
    duration: 0 // 该通知不会自动消失
  })
  if (!data.errors) {
    if (isCreate) {
      try {
        submitLoading.value = true
        await CREATE_USER(data.values)
        // 3. 请求成功后，更新通知为成功消息
        Notification.success({
          id: '1',
          title: 'Success',
          content: 'Create user success!',
          duration: 6000 // 成功通知将在 3 秒后自动消失
        })
        router.push({ name: 'UserInfo' })
      } catch (error) {
        Notification.error({
          id: '1',
          title: 'Error',
          content: `Update failed: ${error.message}`,
          duration: 6000 // 错误通知将在 5 秒后自动消失
        })
        // Notification.error(`保存失败: ${error}`)
      } finally {
        submitLoading.value = false
      }
    } else {
      try {
        submitLoading.value = true
        await UPDATE_SUB_USER(uid, data.values)
        router.push({ name: 'SubUserList' })
      } catch (error) {
        Notification.error(`更新失败: ${error}`)
      } finally {
        submitLoading.value = false
      }
    }
  }
}

//重新加载
const reload = () => {
  location.reload()
}
</script>

<template>
  <a-layout style="padding: 0 24px">
    <a-breadcrumb :style="{ margin: '9px 0' }">
      <a-breadcrumb-item>{{ $t('userCenter.create.home') }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('userCenter.create.users') }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('userCenter.create.create') }}</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content :class="['header21', currentBackgroundClass]">
      <div class="page">
        <!-- 页头 -->
        <a-page-header :title="$t('userCenter.create')" @back="router.go(-1)"> </a-page-header>

        <a-card>
          <a-form :model="form" @submit="handleSubmit" auto-label-width>
            <a-divider orientation="center" type="dotted">{{
              $t('userCenter.create.account.information')
            }}</a-divider>
            <a-form-item
              field="username"
              :label="$t('userCenter.create.username')"
              v-if="isCreate"
              :help="$t('userCenter.create.username.help')"
              required
            >
              <a-input v-model="form.username" />
            </a-form-item>
            <a-form-item
              field="password"
              :label="$t('userCenter.create.password')"
              v-if="isCreate"
              :help="$t('userCenter.create.password.help')"
              required
            >
              <a-input-password v-model="form.password" />
            </a-form-item>
            <a-form-item
              field="labels.UserGroup"
              :label="$t('userCenter.create.userGroup')"
              :help="$t('userCenter.create.userGroup.help')"
              required
            >
              <a-cascader :options="groupLabels" allow-search v-model="form.labels.UserGroup" />
            </a-form-item>
            <a-form-item
              field="description"
              :label="$t('userCenter.create.description')"
              :help="$t('userCenter.create.description.help')"
            >
              <a-input v-model="form.description" />
            </a-form-item>
            <a-form-item
              field="shared"
              :label="$t('userCenter.create.shared')"
              :help="$t('userCenter.create.shared.help')"
            >
              <a-switch type="round" v-model="form.shared">
                <template #checked> {{ $t('userCenter.create.shared.on') }} </template>
                <template #unchecked> {{ $t('userCenter.create.shared.off') }} </template>
              </a-switch>
            </a-form-item>

            <a-divider orientation="center" type="dotted">{{
              $t('userCenter.create.user.information')
            }}</a-divider>
            <a-form-item field="profile.real_name" :label="$t('userCenter.create.name')">
              <a-input v-model="form.profile.real_name" />
            </a-form-item>
            <a-form-item field="profile.nick_name" :label="$t('userCenter.create.nickname')">
              <a-input v-model="form.profile.nick_name" />
            </a-form-item>
            <a-form-item field="profile.phone" :label="$t('userCenter.create.phone')">
              <a-input v-model="form.profile.phone" />
            </a-form-item>
            <a-form-item field="profile.email" :label="$t('userCenter.create.email')" required>
              <a-input v-model="form.profile.email" />
            </a-form-item>
            <a-form-item field="profile.address" :label="$t('userCenter.create.address')">
              <a-input v-model="form.profile.address" />
            </a-form-item>
            <a-form-item field="profile.gender" :label="$t('userCenter.create.gender')">
              <a-radio-group type="button" v-model="form.profile.gender">
                <a-radio value="UNKNOWN">{{ $t('userCenter.create.gender.unknown') }}</a-radio>
                <a-radio value="MALE">{{ $t('userCenter.create.gender.male') }}</a-radio>
                <a-radio value="FEMALE">{{ $t('userCenter.create.gender.female') }}</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item field="profile.avatar" :label="$t('userCenter.create.avatar')">
              <a-input v-model="form.profile.avatar" />
            </a-form-item>

            <a-divider orientation="center" type="dotted" v-if="!isCreate">账号状态</a-divider>

            <a-form-item field="locked" label="冻结账号" v-if="!isCreate">
              <a-switch type="round" v-model="form.locked" />
            </a-form-item>

            <a-form-item v-show="form.locked" field="locked_reason" label="冻结原因">
              <a-input v-model="form.locked_reason" />
            </a-form-item>

            <div class="form-submit">
              <a-space>
                <a-button @click="reload">{{ $t('userCenter.create.cancel') }} </a-button>
                <a-button type="primary" html-type="submit" :loading="submitLoading"
                  >{{ $t('userCenter.create.save') }}
                </a-button>
              </a-space>
            </div>
          </a-form>
        </a-card>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.page {
  padding: 0px;
  margin: 0 auto; /* 自动水平居中 */
  /* overflow: scroll; 内容超出时显示滚动条 */
  height: 120%; /* 页面高度 */
  width: 80%; /* 页面宽度设置为80% */
}
</style>
