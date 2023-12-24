<script setup lang="ts">
const { data, status, signIn, signOut } = useAuth()

const items = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://github.com/zoey-kaiser.png'
    }
  }], [{
    label: 'Logout',
    icon: 'i-pixelarticons-logout',
    click: signOut
  }]
]
</script>

<template>
  <div class="flex shadow-lg bg-zinc-800 h-20 items-center justify-between px-4 border-b-2 border-zinc-700">
    <div class="flex items-center">
      <NuxtImg src="/branding/logo.png" height="80px" />
      <h1 class="text-lg font-bold">
        PixelTranslate
      </h1>
    </div>
    <UDropdown v-if="status === 'authenticated' && data" :items="items" :popper="{ placement: 'bottom-start' }">
      <div class="flex items-center gap-2">
        {{ data?.user?.name || 'Unknown' }}
        <UAvatar icon="i-heroicons-photo" size="md" src="https://github.com/zoey-kaiser.png" />
      </div>
    </UDropdown>
    <UButton v-else variant="ghost" size="lg" color="gray" @click="signIn('keycloak')">
      Sign In
    </UButton>
  </div>
</template>

<style scoped>

</style>
