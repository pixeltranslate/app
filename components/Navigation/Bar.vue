<script setup lang="ts">
const { username, avatar } = useUser()
const { status, signIn, signOut } = useAuth()
const { toggle: toggleSidebar } = useSidebar()
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const items = [
  [{
    label: 'Profile',
    avatar: avatar.value
  }, {
    label: 'API Keys',
    icon: 'i-pixelarticons-lock-open',
    href: '/tokens'
  }], [{
    label: 'Logout',
    icon: 'i-pixelarticons-logout',
    click: () => signOut({ callbackUrl: '/auth/signout' })
  }]
]
</script>

<template>
  <div class="flex h-20 items-center justify-between pl-2 pr-2 sm:pr-8 border-b dark:border-border bg-white dark:bg-transparent">
    <div class="flex items-center gap-2">
      <div v-if="status === 'authenticated'" class="flex">
        <UButton @click="toggleSidebar">
          <Icon
            name="pixelarticons:menu"
            size="25px"
            class="transition"
          />
        </UButton>
      </div>
      <div class="text-center flex items-center ml-1">
        <h1 class="text-2xl sm:text-3xl" style="font-family: 'Pixelify Sans';">
          Pixel<span class="text-secondary">Translate</span>
        </h1>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <ClientOnly>
        <UButton
          :icon="isDark ? 'i-pixelarticons-moon-star' : 'i-pixelarticons-sun-alt'"
          color="white"
          size="xs"
          variant="ghost"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
      </ClientOnly>
      <UDropdown v-if="status === 'authenticated'" :items="items" :popper="{ placement: 'bottom-start' }">
        <div class="flex items-center gap-2 text-sm">
          <span class="hidden sm:block">{{ username }}</span>
          <UAvatar
            icon="i-heroicons-photo"
            size="sm"
            :text="avatar.text"
            :src="avatar.src"
            :ui="{ background: '!bg-primary-dark' }"
          />
        </div>
      </UDropdown>
      <UButton v-else size="lg" @click="signIn('fusionauth', { callbackUrl: '/' })">
        Sign in
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>
