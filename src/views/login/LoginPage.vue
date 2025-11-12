<template>
  <div class="login-page-container">
    <!-- Starfield Background -->
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
    <!-- End Starfield -->

    <div class="login-box">
      <!-- Left Panel (Unchanged) -->
      <div class="left-panel">
        <div class="social-container">
          <a href="#" class="social-icon" aria-label="Login with Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" class="social-icon" aria-label="Login with Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
              />
            </svg>
          </a>
          <a href="#" class="social-icon" aria-label="Login with Google">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              <path d="M12 22a10 10 0 0 0 10-10h-5" />
            </svg>
          </a>
        </div>
        <div class="signup-prompt">
          <p>Don't have an account?</p>
          <a href="#">Signup</a>
        </div>
      </div>

      <!-- Right Panel with Full Login Form -->
      <div class="right-panel">
        <a-form ref="formRef" :model="form" @submit="handleSubmit" class="login-form">
          <div class="logo-container">
            <img src="https://www.wondercloud.com/static/home/images/logo3.png" alt="Logo" width="180" height="49" />
            <h1 class="logo-text">WonderCloud Platform</h1>
          </div>

          <!-- Username (Always Visible) -->
          <a-form-item
            field="username"
            :rules="[{ required: true, message: 'Please enter User Name' }]"
            :validate-trigger="['change', 'input']"
            hide-label
            hide-asterisk
          >
            <a-input size="large" v-model="form.username" placeholder="User Name / Phone" />
          </a-form-item>

          <!-- === START: Password Login Section === -->
          <template v-if="loginType === 'password'">
            <!-- Password -->
            <a-form-item
              field="password"
              :rules="[{ required: true, message: 'Please enter Password' }]"
              :validate-trigger="['change', 'input']"
              hide-label
              hide-asterisk
            >
              <a-input-password
                size="large"
                v-model="form.password"
                placeholder="Password"
                allow-clear
              />
            </a-form-item>
            <!-- Graphical Captcha -->
            <a-form-item
              field="captchaCode"
              :rules="[
                { required: true, message: 'Please enter Captcha' },
                { validator: validateCaptcha }
              ]"
              :validate-trigger="['change', 'input']"
              hide-label
              hide-asterisk
            >
              <a-input-group>
                <a-input size="large" v-model="form.captchaCode" placeholder="Captcha" />
                <div class="captcha-image" @click="handleCaptchaRefresh" title="Click to refresh">
                  {{ captchaText }}
                </div>
              </a-input-group>
            </a-form-item>
          </template>
          <!-- === END: Password Login Section === -->

          <!-- === START: Verification Code Login Section === -->
          <template v-else>
            <a-form-item
              field="code"
              :rules="[{ required: true, message: 'Please enter Verification Code' }]"
              :validate-trigger="['change', 'input']"
              hide-label
              hide-asterisk
            >
              <a-input-group>
                <a-input size="large" v-model="form.code" placeholder="Verification Code" />
                <a-button
                  size="large"
                  class="get-code-btn"
                  @click="handleGetCode"
                  :disabled="countdown > 0"
                >
                  {{ getCodeButtonText }}
                </a-button>
              </a-input-group>
            </a-form-item>
          </template>
          <!-- === END: Verification Code Login Section === -->

          <!-- Options: Remember Me & Switcher -->
          <a-form-item class="form-options-item">
            <a href="#" @click.prevent="switchLoginType" class="switcher-link">
              {{ loginType === 'password' ? 'Login with Code' : 'Login with Password' }}
            </a>
          </a-form-item>

          <!-- Login Button -->
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-button" long> LOGIN </a-button>
          </a-form-item>

          <!-- Forgot Password -->
  
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Script section is unchanged. All logic is preserved.
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { app } from '@/stores/localstorage'
import { ISSUE_TOKEN } from '@/api/mcenter/token'
import { GET_VERIFICATION_CODE } from '@/api/mcenter/login/captcha'
import { useCaptcha } from '@/api/mcenter/login/useCaptcha'

document.body.removeAttribute('arco-theme')

const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const loginType = ref('password')
const countdown = ref(0)
const form = reactive({
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  captchaCode: ''
})

const { captchaText, generateCaptcha, validateCaptcha } = useCaptcha()

const getCodeButtonText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s`
  }
  return 'Get Code'
})

const handleCaptchaRefresh = () => {
  generateCaptcha()
  if (form.captchaCode) {
    form.captchaCode = ''
    formRef.value?.validateField('captchaCode')
  }
}

onMounted(() => {
  if (loginType.value === 'password') {
    handleCaptchaRefresh()
  }
})

const switchLoginType = () => {
  loginType.value = loginType.value === 'password' ? 'code' : 'password'
  formRef.value?.clearValidate()
  form.password = ''
  form.code = ''
  form.captchaCode = ''
  if (loginType.value === 'password') {
    handleCaptchaRefresh()
  }
}

const handleGetCode = async () => {
  if (countdown.value > 0) return
  const error = await formRef.value?.validateField('username')
  if (error) return

  try {
    await GET_VERIFICATION_CODE({ username: form.username })
    Message.success('Verification code sent!')
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (e) {
    // Error is already handled by API interceptors
  }
}

const handleSubmit = async ({ values, errors }) => {
  if (errors) return

  try {
    let payload = {}
    if (loginType.value === 'password') {
      payload = {
        username: values.username,
        password: values.password,
        grant_type: 'password'
      }
    } else {
      payload = {
        username: values.username,
        code: values.code,
        grant_type: 'verification_code'
      }
    }

    const resp = await ISSUE_TOKEN(payload)
    app.value.isLogin = true
    app.value.token = resp

    let redirect = { name: app.value.system, params: {}, query: {} }
    if (route.query.name) redirect.name = route.query.name
    if (route.query.params) redirect.params = JSON.parse(route.query.params)
    if (route.query.query) redirect.query = JSON.parse(route.query.query)
    router.push(redirect)
  } catch (error) {
    if (loginType.value === 'password') {
      handleCaptchaRefresh()
    }
    console.error('Login failed:', error)
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

// --- Main Container with NEW BACKGROUND ---
.login-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  position: relative;
  // New gradient background based on the provided image
  background: linear-gradient(110deg, #3b314b 0%, #8d8482 100%);
}

// --- Starfield Background ---
@keyframes move-stars {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
.stars,
.stars2,
.stars3 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.stars {
  background: transparent
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><circle cx="206" cy="143" r="1.5" fill="rgba(255,255,255,0.7)"/><circle cx="1066" cy="343" r="1.5" fill="rgba(255,255,255,0.7)"/><circle cx="1777" cy="363" r="1" fill="rgba(255,255,255,0.7)"/><circle cx="1226" cy="843" r="1" fill="rgba(255,255,255,0.7)"/><circle cx="1046" cy="1153" r="1.5" fill="rgba(255,255,255,0.7)"/><circle cx="1888" cy="1223" r="1.5" fill="rgba(255,255,255,0.7)"/><circle cx="333" cy="1803" r="1" fill="rgba(255,255,255,0.7)"/><circle cx="888" cy="1703" r="1.5" fill="rgba(255,255,255,0.7)"/></svg>')
    repeat;
  background-size: 2000px 2000px;
  z-index: 1;
  animation: move-stars 200s linear infinite;
  opacity: 0.3;
}
.stars2 {
  background: transparent
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><circle cx="406" cy="443" r="1" fill="rgba(255,255,255,0.5)"/><circle cx="966" cy="643" r="1" fill="rgba(255,255,255,0.5)"/><circle cx="1577" cy="863" r="0.5" fill="rgba(255,255,255,0.5)"/><circle cx="1126" cy="1243" r="1" fill="rgba(255,255,255,0.5)"/></svg>')
    repeat;
  background-size: 2000px 2000px;
  z-index: 2;
  animation: move-stars 150s linear infinite;
  opacity: 0.2;
}
.stars3 {
  background: transparent
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><circle cx="606" cy="843" r="0.5" fill="rgba(255,255,255,0.3)"/><circle cx="1166" cy="1243" r="0.5" fill="rgba(255,255,255,0.3)"/></svg>')
    repeat;
  background-size: 2000px 2000px;
  z-index: 3;
  animation: move-stars 100s linear infinite;
  opacity: 0.1;
}

// --- Login Box ---
.login-box {
  display: flex;
  width: 900px;
  max-width: 90vw;
  height: 600px;
  //Login Box
  background-color: #fdfcfc;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 10;
  animation: fade-in 0.7s ease-in-out;
}

.left-panel {
  flex: 1;
  background-color: #535266;
  background-image: url('https://images.unsplash.com/photo-1553440569-b50675b3558d?q=80&w=1887&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #3c445a;
    opacity: 0.8;
  }
}

.social-container,
.signup-prompt {
  position: relative;
  z-index: 1;
}

.social-container {
  display: flex;
  gap: 16px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #3a5795;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    background-color: white;
  }
  svg {
    width: 20px;
    height: 20px;
    stroke: #3a5795;
  }
}

.signup-prompt {
  text-align: left;
  p {
    margin: 0 0 4px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
  a {
    color: white;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    border-bottom: 2px solid white;
    padding-bottom: 2px;
    &:hover {
      opacity: 0.8;
    }
  }
}

// --- Right Panel with ALIGNMENT FIX ---
.right-panel {
  flex: 1.2;
  // This combination ensures perfect centering of the form
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
}

.login-form {
  width: 100%;
  max-width: 350px;
}

// --- Animations ---
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes item-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// --- Animated Elements ---
.logo-container,
:deep(.arco-form-item) {
  opacity: 0;
  animation: item-enter 0.5s ease-out forwards;
}

// Staggered animation delays
.logo-container {
  animation-delay: 0.2s;
}
:deep(.login-form .arco-form-item:nth-of-type(1)) {
  animation-delay: 0.3s;
}
:deep(.login-form .arco-form-item:nth-of-type(2)) {
  animation-delay: 0.4s;
}
:deep(.login-form .arco-form-item:nth-of-type(3)) {
  animation-delay: 0.5s;
}
:deep(.login-form .arco-form-item:nth-of-type(4)) {
  animation-delay: 0.6s;
}
:deep(.login-form .arco-form-item:nth-of-type(5)) {
  animation-delay: 0.7s;
}
:deep(.login-form .arco-form-item:nth-of-type(6)) {
  animation-delay: 0.8s;
}

// --- Logo, Form Elements, etc. (Styles are the same) ---
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  color: #3c65c4;
  gap: 20px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
}

:deep(.arco-form-item) {
  margin-bottom: 20px;
}

:deep(.arco-input-wrapper),
:deep(.arco-input-group-wrapper) {
  height: 48px;
  background-color: #f0f2f5 !important;
  border: 1px solid transparent !important;
  border-radius: 8px !important;
  transition: all 0.2s ease;
  &:hover {
    border-color: #c9d6f0 !important;
  }
  &.arco-input-focus {
    border-color: #4a70dc !important;
    background-color: #fff !important;
    box-shadow: 0 0 0 2px rgba(74, 112, 220, 0.2);
  }
}

:deep(.arco-input) {
  font-size: 16px;
  color: #333 !important;
  &::placeholder {
    color: #a0a0a0;
  }
}

.captcha-image {
  width: 120px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-left: 1px solid #e5e7eb;
  background-color: #f0f2f5;
  border-radius: 0 8px 8px 0;
  color: #3c65c4;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 4px;
  user-select: none;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e8ebf1;
  }
}

.get-code-btn {
  border-left: 1px solid #f9f9f9 !important;
  background: transparent !important;
  color: #4a70dc;
  border-radius: 0 8px 8px 0 !important;
  font-weight: 500;
  transition: all 0.2s ease;
  &:hover:not(:disabled) {
    color: #3c65c4;
    background: rgba(74, 112, 220, 0.05) !important;
  }
  &.arco-btn-disabled {
    color: #9ca3af;
    cursor: not-allowed;
    background: transparent !important;
  }
}

.form-options-item {
  :deep(.arco-form-item-content) {
    // display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

:deep(.arco-checkbox-label) {
  font-size: 14px;
  color: #555;
}


.switcher-link {
  font-size: 14px;
  //Login with Code
  color: #4a70dc;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
}

.login-button {
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background-color: #3e63c9 !important;
  box-shadow: 0 4px 14px rgba(74, 112, 220, 0.3);
  transition: all 0.2s ease;
  letter-spacing: 1px;

  &:hover {
    background-color: #3c65c4 !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(74, 112, 220, 0.4);
  }
}

.forgot-password-item {
  margin-bottom: 0;
  text-align: center;
}

.forgot-password-link {
  color: #888;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #4a70dc;
  }
}

.arco-row {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
}

.arco-input-group > .arco-input-wrapper:not(:last-child), .arco-input-group > .arco-input-outer:not(:last-child), .arco-input-group > .arco-input-tag:not(:last-child), .arco-input-group > .arco-select-view:not(:last-child) {
    margin-right: 40px;
    /* border-right: 1px solid var(--color-neutral-3); */
}
</style>
