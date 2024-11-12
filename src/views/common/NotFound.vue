<template>
  <a-result status="404" subtitle="Whoops, that page is gone(404).">
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
