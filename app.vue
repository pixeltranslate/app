<script lang="ts" setup>
const { status } = useAuth()
</script>

<template>
  <div class="App">
    <NuxtLayout v-if="status === 'authenticated'">
      <NuxtPage />
      <TheGlobalOpeners />
      <UNotifications />
    </NuxtLayout>
    <TheLoader v-else />
  </div>
</template>

<style>
.App {
  font-family: 'Inter', Arial, Helvetica, sans-serif
}
</style>
