<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <div class="h-screen bg-foreground">
    <div class="flex">
      <div class="w-72 h-[98vh] pl-4 pr-12 bg-primary-dark rounded-r my-2 shadow">
        <UButton label="Open" @click="isOpen = true" />
      </div>
      <div class="w-full overflow-auto">
        <Navbar />
        <div class="p-5">
          <slot />
        </div>
      </div>
    </div>
    <USlideover v-model="isOpen" :ui="{ width: 'w-screen max-w-3xl' }">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Slideover
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <Placeholder class="h-full" />
      </UCard>
    </USlideover>
  </div>
</template>
