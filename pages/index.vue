<script lang="ts" setup>
const { signIn, signOut, status, data } = useAuth()

const isLoggedIn = computed(() => {
  return status.value === 'authenticated'
})
</script>

<template>
  <div class="max-w-2xl mx-auto my-5 text-center">
    <div class="flex items-center gap-2 justify-center">
      <button :disabled="isLoggedIn" @click="signIn('keycloak')">
        Login
      </button>
      <button :disabled="!isLoggedIn" @click="signOut()">
        Logout
      </button>
    </div>
    <hr class="my-4">
    status: {{ status }}
    <pre v-if="data" wrap class="bg-black p-2 text-white rounded mt-2 text-left">
      {{ JSON.stringify(data, null, 2) }}
    </pre>
  </div>
</template>
