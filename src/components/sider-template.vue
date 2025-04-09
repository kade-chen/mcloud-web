<template>
  <!-- :openKeys="siderDefaultOpenKeys"
      :selectedKeys="siderDefaultSelectedKeys" -->
  <a-layout-sider
    breakpoint="lg"
    :width="220"
    collapsible
    :collapsed="collapsed"
    @collapse="onCollapse"
    :class="[currentBackgroundClass]"
  >
    <a-menu
      :defaultOpenKeys="siderDefaultOpenKeys"
      :defaultSelectedKeys="siderDefaultSelectedKeys"
      @menuItemClick="onClickMenuItem"
    >
      <a-menu-item key="0_1" disabled>
        <IconHome />
        Menu 1
      </a-menu-item>
      <a-menu-item key="0_2">
        <IconCalendar />
        Menu 2
      </a-menu-item>
      <a-sub-menu key="4">
        <template #title>
          <span><IconCalendar />{{ $t('user_center') }}</span>
        </template>
        <a-menu-item v-if="showListUser" key="4_1" @click="navigateTo({ name: 'user_center' })">{{
          $t('user_List')
        }}</a-menu-item>
        <a-menu-item v-if="showCreateUser" key="4_2" @click="navigateTo({ name: 'CreteSubUser' })">
          {{ $t('user_Create') }}
        </a-menu-item>
        <!-- <a-menu-item key="4_3">Menu 3</a-menu-item> -->
      </a-sub-menu>

      <a-sub-menu key="1">
        <template #title>
          <span><IconCalendar />{{ $t("Vertex_AI") }}</span>
        </template>
        <a-menu-item v-if="showCreateVertex" key="1_1" @click="navigateTo({ name: 'VertexInfo' })"
          >Gemini</a-menu-item
        >
        <a-menu-item key="1_2">Menu 2</a-menu-item>
        <a-sub-menu key="2" title="Navigation 2">
          <a-menu-item key="2_1">Menu 1</a-menu-item>
          <a-menu-item key="2_2">Menu 2</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="3" title="Navigation 3">
          <a-menu-item key="3_1">Menu 1</a-menu-item>
          <a-menu-item key="3_2">Menu 2</a-menu-item>
          <a-menu-item key="3_3">Menu 3</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { Message } from '@arco-design/web-vue'
import { IconHome, IconCalendar } from '@arco-design/web-vue/es/icon'
import { app } from '@/stores/localstorage'
import { CHECK_PERMISSION } from '@/api/mcenter/policy/policy'

export default defineComponent({
  setup() {
    const collapsed = ref(false)
    const menuProps = reactive({
      openKeys: app.value.siderDefaultOpenKeys,
      selectedKeys: app.value.siderDefaultSelectedKeys
    })
    const onCollapse = (val, type) => {
      const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩'
      Message.info({
        content,
        duration: 2000
      })
      collapsed.value = val
    }

    // ... 其他内容
    return {
      collapsed,
      onCollapse,
      onClickMenuItem(key) {
        Message.info({ content: `You select ${key}`, showIcon: true })
      },
      menuProps
    }
  },
  components: {
    IconHome,
    IconCalendar
  },
  computed: {
    siderDefaultOpenKeys() {
      return app.value.siderDefaultOpenKeys
    },
    siderDefaultSelectedKeys() {
      return app.value.siderDefaultSelectedKeys
    },
    currentBackgroundClass() {
      // 如果 isDarkBackground 为 true 返回 'dark-background'，否则返回 'light-background'
      //  this.isDarkBackground ? 'dark-background' : 'light-background'
      // console.log("cccccc",app.value.isBackground)
      return app.value.isBackground
        ? document.body.removeAttribute('arco-theme') || 'light-background'
        : document.body.setAttribute('arco-theme', 'dark') || 'darks-header-background'
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    async CHECK_LISTUSER_PERMISSION() {
      try {
        const resp = await CHECK_PERMISSION({ role: '', permission: 'user.list' })
        console.log('check list user permission', resp)
        // groupLabels.value = resp
      } catch (error) {
        // console.error('Error:', error);
        this.showListUser = false
        // Notification.error(`查询用户组失败: ${error}`)
        // Message.error(`查询用户失败1: ${error}`)
        // router.push({ name: 'PermissionDeny' })
      }
    },
    async CHECK_CREATEUSER_PERMISSION() {
      try {
        const resp = await CHECK_PERMISSION({ role: '', permission: 'user.create' })
        console.log('check create user permission', resp)
        // groupLabels.value = resp
      } catch (error) {
        // console.error('Error:', error);
        this.showCreateUser = false
        // Notification.error(`查询用户组失败: ${error}`)
        // Message.error(`查询用户失败1: ${error}`)
        // router.push({ name: 'PermissionDeny' })
      }
    },
    async CHECK_VERTEX_PERMISSION() {
      try {
        const resp = await CHECK_PERMISSION({ role: '', permission: 'vertex.create' })
        console.log('check create user permission', resp)
        // groupLabels.value = resp
      } catch (error) {
        // console.error('Error:', error);
        this.showCreateVertex = false
        // Notification.error(`查询用户组失败: ${error}`)
        // Message.error(`查询用户失败1: ${error}`)
        // router.push({ name: 'PermissionDeny' })
      }
    }
  },
  data() {
    return {
      showListUser: true,
      showCreateUser: true,
      showCreateVertex: true
    }
  },
  mounted() {
    this.CHECK_LISTUSER_PERMISSION() // 使用 this 调用 methods 中返回的方法
    this.CHECK_CREATEUSER_PERMISSION() // 使用 this 调用 methods 中返回的方法
    this.CHECK_VERTEX_PERMISSION() // 使用 this 调用 methods 中返回的方法
  },
  watch: {
    showListUser(showListUser) {
      // 当 showListUser 发生变化时，这个函数会被调用
      // console.log('showListUser changed:', showListUser)
      if (showListUser) {
        // 这里可以执行相关操作
        this.CHECK_LISTUSER_PERMISSION()
      }
    },
    showCreateUser(showCreateUser) {
      // 当 showListUser 发生变化时，这个函数会被调用
      // console.log('showListUser changed:', showListUser)
      if (showCreateUser) {
        // 这里可以执行相关操作
        this.CHECK_CREATEUSER_PERMISSION()
      }
    },
    showCreateVertex(showCreateVertex) {
      // 当 showListUser 发生变化时，这个函数会被调用
      // console.log('showListUser changed:', showListUser)
      if (showCreateVertex) {
        // 这里可以执行相关操作
        this.CHECK_VERTEX_PERMISSION()
      }
    }
  }
})

// 设置全局样式变量
// document.documentElement.style.setProperty('--primary-color', '#1890ff') // 调整主色调
// document.documentElement.style.setProperty('--text-color', '#004D1C'); // 设置文本颜色
// document.documentElement.style.setProperty('--background-color', '#141414') // 设置背景颜色
</script>
<style scoped>
/* 定义深色背景的样式 */
.darks-header-background {
  border: 0.01px solid #3a3a3d; /* 设置边框颜色为蓝色 */
  background: #242323;
}

/* 定义浅色背景的样式 */
.light-background {
  /* color: #000000; */
  /* background-color: white;   */
  border: 0.01px solid #c5c5d2;
  background: #fff;
}
.light-background :deep(.arco-layout-sider-trigger-light) {
  border-style: solid;
  border-color: #e5e4ea;
  height: 67px;
}

.darks-header-background :deep(.arco-layout-sider-trigger-light) {
  border-style: solid;
  border-color: #333335;
  height: 67px;
}
</style>
