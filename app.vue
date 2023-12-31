<script lang="ts" setup>
const { status } = useAuth()
</script>

<template>
  <div class="App">
    <NuxtLayout>
      <NuxtPage v-if="status === 'authenticated'" />
      <TheLoader v-else />
      <TheGlobalOpeners />
      <UNotifications />
    </NuxtLayout>
  </div>
</template>

<style>
.App {
  font-family: 'Inter', Arial, Helvetica, sans-serif
}
</style>
