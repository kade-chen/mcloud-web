<template>
  <div class="login-container">
    <a-form
      :form="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="form.username" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input v-model:value="form.password" type="password" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" htmlType="submit"> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { Button as aButton, Input as aInput, Form as aForm, FormItem as aFormItem } from 'ant-design-vue';

const form = ref({
  username: "",
  password: "",
});

// 设置为暗黑主题
// document.body.removeAttribute('arco-theme');
document.body.setAttribute("arco-theme", "dark");

// 设置全局样式变量
// document.documentElement.style.setProperty('--primary-color', '#1890ff'); // 调整主色调
// document.documentElement.style.setProperty('--text-color', '#23C343'); // 设置文本颜色
document.documentElement.style.setProperty("--background-color", "#141414"); // 设置背景颜色
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background-color);
}

.arco-theme-dark .arco-button {
  /* 针对暗黑主题的按钮样式 */
  /* background-color: var(--primary-color); */
  /* color: var(--text-color); */
}
</style>
