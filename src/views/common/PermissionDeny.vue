<template>
  <a-result status="403" subtitle="Access to this resource on the server is denied.">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="RedirectHome">Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const RedirectHome = () => {
  router.push({ name: 'home' })
}
</script>
