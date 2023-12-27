<script setup lang="ts">
const { username, avatar } = useUser()
const { signOut } = useAuth()
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
  }], [{
    label: 'Settings',
    icon: 'i-pixelarticons-sliders',
    href: 'https://auth.averix.tech/auth/realms/pixeltranslate-dev/account/',
    target: '_blank'
  }, {
    label: 'Logout',
    icon: 'i-pixelarticons-logout',
    click: signOut
  }]
]
</script>

<template>
  <div class="flex h-20 items-center justify-between pl-2 pr-8 border-b dark:border-border">
    <div class="flex items-center gap-2">
      <div class="flex">
        <UButton @click="toggleSidebar">
          <Icon
            name="pixelarticons:menu"
            size="25px"
            class="transition"
          />
        </UButton>
      </div>
      <div class="text-center flex items-center ml-1">
        <h1 class="text-3xl" style="font-family: 'Pixelify Sans';">
          Pixel<span class="text-secondary">Translate</span>
        </h1>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <ClientOnly>
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="white"
          size="xs"
          variant="ghost"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
      </ClientOnly>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <div class="flex items-center gap-2 text-sm">
          <span>{{ username }}</span>
          <UAvatar
            icon="i-heroicons-photo"
            size="sm"
            :text="avatar.text"
            :src="avatar.src"
            :ui="{ background: '!bg-primary-dark' }"
          />
        </div>
      </UDropdown>
    </div>
  </div>
</template>

<style scoped>

</style>
