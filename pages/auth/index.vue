<script setup lang="ts">
const { signIn } = useAuth()

onMounted(() => {
  signIn('keycloak', { callbackUrl: 'https://staging-app.pixeltranslate.app/' })
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
