<template>
  <a-layout class="layout-demo">
    <AppSider />

    <a-layout>
      <AppHeader />

      <a-layout style="padding: 0 24px">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>

        <a-layout-content :class="['header21', currentBackgroundClass]"
          >Content
          <h1>user_center111</h1>
        </a-layout-content>

        <!-- <a-layout-footer :class="['header2', currentBackgroundClass]"
            >Footer
            <h1>sjjsjjsjsjsj</h1>
          </a-layout-footer> -->
      </a-layout>
    </a-layout>
  </a-layout>
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
  methods: {
    // 定义 toggleBackgroundColor 方法，用于切换 isDarkBackground 的值
    // toggleBackgroundColor() {
    //   // 取反当前的 isDarkBackground 值
    //   this.isDarkBackground = !this.isDarkBackground
    // }
  },
  data() {
    return {
      // 定义 isDarkBackground 状态变量，初始值为 true
      // isDarkBackground: true
    }
  }
})

// document.body.removeAttribute('arco-theme')
// document.body.setAttribute('arco-theme', 'dark')

// 设置全局样式变量
// document.documentElement.style.setProperty('--primary-color', '#1890ff') // 调整主色调
// document.documentElement.style.setProperty('--text-color', '#004D1C'); // 设置文本颜色
// document.documentElement.style.setProperty('--background-color', '#141414') // 设置背景颜色
</script>
<style scoped>
.layout-demo {
  height: 926px;
  /* color: white; */
  background: var(--color-fill-1);
  /* border: 1px solid var(--color-border);   */
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  /* background: rgba(255, 255, 255, 0.2); */
}
.layout-demo :deep(.arco-layout-sider-light) .logo {
  /* background: var(--color-fill-2); */
}
.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-fill-1);
  /* background: var(--color-bg-3); */
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  /* color: var(--color-text-2); */
  /* color: red; */
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
  background: var(--color-fill-1);
  /* background-color: brown; */
}
.layout-demo :deep(.arco-layout-content) {
  /* color: red; */
  font-weight: 400;
  font-size: 14px;
  background: var(--color-fill-1);
  /* background: var(--color-bg-1);  */
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* color: var(--color-white); */
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
  background: var(--color-fill-1);
  /* transition: background; */
}

/* 定义基础的 header 样式 */
.header21 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 45px; /* 增加高度 */
  transition: background; /* 添加过渡效果 */
  /* transition: background 0.3s ease; */
}

/* 定义深色背景的样式 */
.dark-background {
  color: white;
  background-color: #000000;
}

/* 定义浅色背景的样式 */
.light-background {
  color: #000000;
  /* background-color: white;   */
}
</style>
