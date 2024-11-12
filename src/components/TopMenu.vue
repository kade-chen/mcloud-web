<template>
  <!-- <a-layout-header> -->
  <a-layout-header :class="['header2', currentBackgroundClass, currentLangageClass]">
    <div class="navbar">
      <div class="navbar-left">
        <a @click="navigateTo({ name: 'ServiceConsole' })" target="_blank">
          <img class="logo" src="@/assets/logo.svg" alt="Logo" />
        </a>
        <div class="logo-typeface">
          {{ $t('Research And Development platform') }}
        </div>
      </div>
      <div class="navbar-right">
        <div class="user-menu">
          <a-trigger :show-arrow="true" :popup-offset="11">
            <a-button @click="toggleLanguage" shape="circle">
              <component :is="currentLangage ? 'icon-chinese-fill' : 'icon-english-fill'" size="19"
                >主题</component
              >
            </a-button>
            <template #content>
              <div class="trigger-demo-language">
                {{ currentLangage ? '英文模式' : '中文模式' }}
              </div>
            </template>
          </a-trigger>
        </div>

        <div class="user-menu">
          <a-trigger :show-arrow="true" :popup-offset="11">
            <a-button @click="toggleBackgroundColor" shape="circle">
              <component :is="currentBackground ? 'icon-moon-fill' : 'icon-sun-fill'" size="19"
                >主题</component
              >
            </a-button>
            <template #content>
              <div class="trigger-demo-light">
                {{ currentBackground ? '点击切换为暗黑模式' : '点击切换为亮色模式' }}
              </div>
            </template>
          </a-trigger>
        </div>

        <div class="user-menu" @click="toggleMenu">
          <img
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
            alt=""
            class="avatar"
          />
          <div :class="['username']">
            {{ user }}
          </div>
          <div v-if="showMenu" class="menu-dropdown">
            <div class="menu-item">切换角色</div>
            <div class="menu-item" @click="navigateTo({ name: 'user_center' })">用户中心</div>
            <div class="menu-item">用户设置</div>
            <div class="menu-item" @click="LoginOut">登出登录</div>
          </div>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { app } from '@/stores/localstorage'
import { DELETE_TOKEN } from '@/api/mcenter/token'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    // showArrow: {
    //   // type: Boolean,
    //   // required: false, // 或者根据需要设置为 true
    //   // default: false // 可选，设置默认值
    // }
  },
  computed: {
    // 计算属性，根据 isDarkBackground 的值返回相应的 class 名称
    currentBackgroundClass() {
      // 如果 isDarkBackground 为 true 返回 'dark-background'，否则返回 'light-background'
      //  this.isDarkBackground ? 'dark-background' : 'light-background'
      // console.log("cccccc",app.value.isBackground)
      return app.value.isBackground
        ? document.body.removeAttribute('arco-theme') || 'light-background'
        : document.body.setAttribute('arco-theme', 'dark') || 'dark-header-background'
    },
    currentLangageClass() {
      // 如果 isDarkBackground 为 true 返回 'dark-background'，否则返回 'light-background'
      //  this.isDarkBackground ? 'dark-background' : 'light-background'
      // console.log("111",this.$i18n.locale,app.value.isLanguage)
      // this.$i18n.locale = this.$i18n.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
      //禁用 ESLint 规则（在整个文件中禁用）
      /* eslint-disable vue/no-side-effects-in-computed-properties */
      return app.value.isLanguage ? (this.$i18n.locale = 'zh-CN') : (this.$i18n.locale = 'en-US')
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

    const router = useRouter()
    const LoginOut = async (data) => {
      // console.log('ssss')
      try {
        await DELETE_TOKEN({ data })
        app.value.isLogin = false
        router.push({ name: 'LoginPage' })
      } catch (error) {
        console.error('Error:', error)
      }
    }

    return {
      collapsed,
      onCollapse,
      onClickMenuItem(key) {
        Message.info({ content: `You select ${key}`, showIcon: true })
      },
      LoginOut
    }
  },
  methods: {
    // 定义 toggleBackgroundColor 方法，用于切换 isDarkBackground 的值
    toggleBackgroundColor() {
      this.currentBackground = !this.currentBackground // 切换 user3 的值
      app.value.isBackground = !app.value.isBackground
    },
    toggleLanguage() {
      // this.$i18n.locale = this.$i18n.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
      // 取反当前的 isLanguage 值
      this.currentLangage = !this.currentLangage
      app.value.isLanguage = !app.value.isLanguage
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    navigateTo(path) {
      this.$router.push(path)
    }
  },
  watch: {},
  data() {
    return {
      // 定义 isDarkBackground 状态变量，初始值为 true
      // 定义 isLanguage 状态变量，初始值为 true
      showMenu: false,
      user: app.value.token.username,
      currentLangage: app.value.isLanguage,
      currentBackground: app.value.isBackground
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
.header2 {
  height: 930px;
  /* color: white; */
  /* background: var(--color-fill-1); */
  /* border: 1px solid var(--color-border);   */
  /* background: red; */
}
.header2 :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  /* background: rgba(255, 255, 255, 0.2); */
}
.header2 :deep(.arco-layout-sider-light) .logo {
  /* background: var(--color-fill-2); */
}
.header2 :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  /* background: var(--color-bg-3); */
}
.header2 :deep(.arco-layout-footer) {
  height: 48px;
  /* color: var(--color-text-2); */
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
  /* background-color: brown; */
}
.header2 :deep(.arco-layout-content) {
  /* color: var(--color-text-2); */
  font-weight: 400;
  font-size: 14px;
  /* background: var(--color-bg-1); */
}
.header2 :deep(.arco-layout-footer),
.header2 :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* color: var(--color-white); */
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

/* 定义基础的 header 样式 */
.header2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 45px; /* 增加高度 */
  transition: background; /* 添加过渡效果 */
  /* transition: background 0.3s ease; */
}

/* 定义深色背景的样式 */
.dark-header-background {
  color: white;
  border: 1px solid #3a3a3d;
  background: #242323;
}

/* 定义浅色背景的样式 */
.light-background {
  /* color: #000000; */
  /* background-color: white;   */
  border: 0.01px solid #c5c5d2;
  background: #fff;
}

/* 定义导航栏的样式 */
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 定义左侧导航栏的样式 */
.navbar-left {
  display: flex;
  align-items: center;
}

/* 定义 logo 图片的样式 */
.logo {
  height: 5%;
  cursor: pointer; /* 鼠标悬停时显示手形光标 */
}

/* 定义 logo 文字的样式 */
.logo-typeface {
  height: 5%;
}

/* 定义右侧导航栏的样式 */
.navbar-right {
  display: flex;
  align-items: center;
}
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 15px; /* 添加左侧空白 */
  margin-right: 10px; /* 添加右侧空白 */
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.username {
  margin-left: 10px;
  font-size: 14px;
  transition: background; /* 添加过渡效果 */
}

.menu-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  color: white;
  display: flex;
  flex-direction: column;
  width: 110px; /* 设置固定宽度 */
}

.menu-item {
  padding: 10px 0;
  cursor: pointer;
  text-align: center;
  line-height: 20px; /* 匹配头像的高度 */
}

.menu-item:hover {
  background-color: #575757;
}

/* light切换 */
.trigger-demo-light {
  padding: 10px;
  width: 130px;
  border-radius: 40px;
  /* box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15); */
  background-color: #5c5b5b;
  color: white;
}

/* language切换 */
.trigger-demo-language {
  padding: 10px;
  width: 56px;
  border-radius: 40px;
  /* box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15); */
  background-color: #5c5b5b;
  color: white;
}
</style>
