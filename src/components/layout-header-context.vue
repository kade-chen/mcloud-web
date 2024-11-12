<template>
  <a-layout-header>
    <!-- <a-menu :openKeys="['4']" :selectedKeys="['4_2']" mode="horizontal"> -->
    <a-menu :openKeys="defaultOpenKeys" :selectedKeys="defaultSelectedKeys" mode="horizontal">
      <a-menu-item key="0_1" disabled>
        <IconHome />
        Menu 3
      </a-menu-item>
      <a-menu-item key="0_2">
        <IconCalendar />
        Menu 2
      </a-menu-item>
      <a-sub-menu key="1">
        <template #title>
          <span><IconCalendar />Navigation 1</span>
        </template>
        <a-menu-item key="1_1">Menu 1</a-menu-item>
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
      <a-sub-menu key="4">
        <template #title>
          <span><IconCalendar />{{ $t('user_center') }}</span>
        </template>
        <a-menu-item key="4_1" @click="navigateTo({ name: 'user_center' })">{{
          $t('user_List')
        }}</a-menu-item>
        <a-menu-item key="4_2" @click="navigateTo({ name: 'CreteSubUser' })">
          {{ $t('user_Create') }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-header>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { IconHome, IconCalendar } from '@arco-design/web-vue/es/icon'
import { app } from '@/stores/localstorage'

export default defineComponent({
  components: {
    IconHome,
    IconCalendar
  },
  computed: {
    defaultOpenKeys() {
      return app.value.defaultOpenKeys
    },
    defaultSelectedKeys() {
      return app.value.defaultSelectedKeys
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
    navigateTo(path) {
      this.$router.push(path)
    }
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
</script>
<style scoped></style>
