<script setup lang="ts">
const { data, status, signIn, signOut } = useAuth()
const { toggle: toggleSidebar } = useSidebar()

const items = [
  [{
    label: 'Profile',
    avatar: {
      src: data.value?.user?.image ?? false,
      text: data.value?.user?.name ? data.value?.user?.name[0] : '?'
    }
  }], [{
    label: 'Logout',
    icon: 'i-pixelarticons-logout',
    click: signOut
  }]
]
</script>

<template>
  <div class="flex h-20 items-center justify-between pl-2 pr-8 border-b border-border">
    <div class="flex items-center gap-2">
      <div class="flex">
        <div class="flex w-9 h-9 flex items-center justify-center rounded cursor-pointer hover:bg-foreground" @click="toggleSidebar">
          <Icon
            name="pixelarticons:menu"
            size="25px"
            class="transition"
          />
        </div>
      </div>
      <div class="text-center flex items-center">
        <h1 class="text-3xl" style="font-family: 'Pixelify Sans';">
          Pixel<span class="text-secondary">Translate</span>
        </h1>
      </div>
    </div>
    <UDropdown v-if="status === 'authenticated' && data" :items="items" :popper="{ placement: 'bottom-start' }">
      <div class="flex items-center gap-2 text-sm">
        {{ data?.user?.preferred_username || 'Unknown' }}
        <UAvatar icon="i-heroicons-photo" size="sm" :text="data.user?.name ? data.user?.name[0] : '?'" :src="data.user?.image ?? false" />
      </div>
    </UDropdown>
    <UButton v-else variant="ghost" size="lg" color="gray" @click="signIn('keycloak')">
      Sign In
    </UButton>
  </div>
</template>

<style scoped>

</style>
