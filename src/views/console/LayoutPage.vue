<template>
  <div >
    <TopMenu />
    <!-- 顶测导航栏 -->
    <!-- 使用动态 class 绑定，绑定到变量 currentBackgroundClass -->
    <a-layout class="layout-demo" :class="[currentBackgroundClass]">
      <AppSider />

      <a-layout class="custom-breadcrumb">
        <AppHeader />
        <a-layout style="padding: 0 24px">
          <a-breadcrumb :style="{ margin: '16px 0' }" >
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App1</a-breadcrumb-item>
          </a-breadcrumb>

          <a-layout-content :class="['header21', currentBackgroundClass]"
            >Content
            <h1>user_center1111</h1>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
// import { IconHome, IconCalendar } from '@arco-design/web-vue/es/icon'
import { app } from '@/stores/localstorage'

export default defineComponent({
  components: {
    // IconHome,
    // IconCalendar
  },
  computed: {
    // 计算属性，根据 isDarkBackground 的值返回相应的 class 名称
    currentBackgroundClass() {
      // 如果 isDarkBackground 为 true 返回 'dark-background'，否则返回 'light-background'
      //  this.isDarkBackground ? 'dark-background' : 'light-background'
      return app.value.isBackground
        ? document.body.removeAttribute('arco-theme') || 'light-background'
        : document.body.setAttribute('arco-theme', 'dark') || 'dark-background'
    }
  },
  setup() {
    const collapsed = ref(false)
    const onCollapse = (val, type) => {
      const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩'
      Message.info({
        content,
        duration: 2000
      })
      collapsed.value = val
    }
    return {
      collapsed,
      onCollapse,
      onClickMenuItem(key) {
        Message.info({ content: `You select ${key}`, showIcon: true })
      }
    }
  },
  created() {
    // 在组件创建时，立即调用 cc 方法
    this.CC();
  },
  // mounted() {
  //   // 在组件加载后调用接口
  //   this.CC()
  // },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    CC() {
      app.value.defaultOpenKeys = ['3']
      app.value.defaultSelectedKeys = ['2_1']
      app.value.siderDefaultOpenKeys = ['0_2']
      app.value.siderDefaultSelectedKeys = ['0_2']
    }
  },
  data() {
    return {
      // cc: app.value.defaultOpenKeys
      // 定义 isDarkBackground 状态变量，初始值为 true
      // isDarkBackground: true
    }
  }
})
</script>

<style scoped>
@import '@/assets/common/layout.css'; /* 根据你的项目结构调整路径 */
</style>