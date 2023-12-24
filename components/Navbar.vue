<script setup lang="ts">
const { data, status, signIn } = useAuth()
</script>

<template>
  <div class="flex w-full px-3 shadow-lg bg-gradient-to-r from-blue-300 to-blue-400 h-16 items-center justify-end">
    <p v-if="status === 'authenticated'" class="flex items-center justify-center gap-2">
      {{ data.user.name }} <Icon class="rounded-full" name="mdi:user" size="1.5rem" />
    </p>
    <button v-else class="flex justify-center items-center h-full" @click="signIn('keycloak')">
      Sign In
    </button>
  </div>
</template>

<style scoped>

</style>
