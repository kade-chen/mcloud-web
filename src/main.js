import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locale/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// 加载UI组件
import ArcoVue from '@arco-design/web-vue'
// 引入UI组件的样式库
import '@arco-design/web-vue/dist/arco.css'
// 配置Vue实例使用 ArcoVue UI组件库
// 设置为暗黑主题
// document.body.setAttribute('arco-theme', 'dark')

app.use(ArcoVue)

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
app.use(ArcoVueIcon)

// 注册全集组件
import TopMenu from './components/TopMenu.vue'
import TopMenu1 from './components/Banner-template.vue'
import AppHeader from './components/layout-header-context.vue'
import AppSider from './components/sider-template.vue'
import User_List from './views/user_center/List/user_list.vue' //layout 不需要用这个了

app.component('TopMenu', TopMenu)
app.component('TopMenu1', TopMenu1)
app.component('AppHeader', AppHeader)
app.component('AppSider', AppSider)
app.component('User_List', User_List)
// app.component('BreadcrumbMenu', BreadcrumbMenu)
// app.component('ShowTime', ShowTime)
// app.component('SvgIcon', SvgIcon)
// app.component('PodLog', PodLog)
// app.component('PodConsole', PodConsole)

// 重写arco 样式
import './assets/main.css'

// 使用 language hook

app.mount('#app')

// const { currentLocale, changeLocale } = useLocale();
