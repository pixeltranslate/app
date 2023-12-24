<script setup lang="ts">
const { data, status, signIn, signOut } = useAuth()

const workspace = ref('Averix')

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

const workspaces = [
  'Prismarin',
  'Averix'
]
</script>

<template>
  <div class="flex h-20 items-center justify-between px-5 border-b-2 border-border">
    <div class="flex items-center gap-2">
      <USelectMenu v-model="workspace" :options="workspaces" size="lg" />
      <p class="text-lg">
        /
      </p>
      <USelectMenu v-model="workspace" :options="workspaces" size="lg" />
    </div>
    <UDropdown v-if="status === 'authenticated' && data" :items="items" :popper="{ placement: 'bottom-start' }">
      <div class="flex items-center gap-2 text-sm">
        {{ data?.user?.name || 'Unknown' }}
        <UAvatar icon="i-heroicons-photo" size="sm" src="https://github.com/zoey-kaiser.png" />
      </div>
    </UDropdown>
    <UButton v-else variant="ghost" size="lg" color="gray" @click="signIn('keycloak')">
      Sign In
    </UButton>
  </div>
</template>

<style scoped>

</style>
