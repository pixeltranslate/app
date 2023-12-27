<script setup>
const {data} = useAuth()
</script>
<template>
  <div class="App">
    <pre>
      {{ data }}
    </pre>
    <NuxtLayout>
      <NuxtPage />
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
