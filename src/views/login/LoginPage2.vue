<template>
  <div>
    <h1>Login Page 1</h1>
    <p>{{ resdata }}</p>
  </div>
</template>

<script>
import { app } from '@/stores/localstorage'


export default {
  data() {
    return {
      resdata: ''
    }
  },
  mounted() {
    // 在组件加载后调用接口
    this.callApi()
  },
  methods: {
    callApi() {
      // 替换为你的后端接口 URL
      const apiUrl = 'mcenter/api/v1/token/1'

      // 使用 fetch API 发起请求
      fetch(apiUrl)
        .then((response) => {
          console.log('接收到的数据:', response)
          // console.log('接收到的数据1:', response.url)
          if (response.url.includes('error')) {
            // 删除特定的 Cookie
            console.log('接收到的数据:', response)
            app.value.isLogin = false;
            this.$router.push('/login')
            return
          }
          return response.json()
        })
        .then((data) => {
          // 更新 responseData 数据
          console.log('接收到的数据:', data)
          this.resdata = data
        })
        .catch((error) => {
          if (app.value.isLogin != true) {
            this.$router.push('/login')
          }
          console.error('Error:', error)
        })
    }
  }
}
</script>

<style scoped>
/* 可选：添加组件的样式 */
</style>
