<script setup lang="ts">
const { username, avatar } = useUser()
const { signIn, signOut, status } = useAuth()
const { toggle: toggleSidebar } = useSidebar()

defineProps<{
  landingView?: boolean
}>()

const items = [
  [{
    label: 'Profile',
    avatar: avatar.value
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
        <div v-if="!landingView" class="flex w-9 h-9 flex items-center justify-center rounded cursor-pointer hover:bg-foreground" @click="toggleSidebar">
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
    <div v-if="status === 'authenticated'" class="flex items-center gap-3">
      <UButton
        v-if="landingView"
        to="/app"
        target="_blank"
        variant="solid"
        size="lg"
        color="gray"
        @click="signIn('keycloak')"
      >
        Visit App
        <Icon name="pixelarticons:arrow-right" size="20" />
      </UButton>
      <UDropdown v-else :items="items" :popper="{ placement: 'bottom-start' }">
        <div class="flex items-center gap-2 text-sm">
          <span class="capitalize">{{ username }}</span>
          <UAvatar icon="i-heroicons-photo" size="sm" :text="avatar.text" :src="avatar.src" />
        </div>
      </UDropdown>
    </div>
    <div v-else class="flex items-center gap-3">
      <UButton variant="solid" size="lg" color="primary" @click="signIn('keycloak')">
        Login
      </UButton>
      <UButton variant="solid" size="lg" color="white" @click="signIn('keycloak')">
        Create account
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>
