<script setup lang="ts">
const { signIn } = useAuth()

onMounted(() => {
  signIn('keycloak')
})

definePageMeta({
  layout: 'none',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  }
})
</script>

<template>
  <div>
    <TheLoader />
  </div>
</template>
