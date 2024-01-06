<script lang="ts" setup>
defineProps<{ title?: string, description?: string, isLoading?: boolean, error?: Error | null }>()

const { status } = useAuth()
</script>

<template>
  <div class="flex h-full overflow-hidden">
    <NavigationSidebar v-if="status === 'authenticated'" />
    <div class="w-full h-full overflow-auto">
      <div class="p-3 md:p-5 xl:p-6 2xl:p-8">
        <header v-if="title && !isLoading && !error">
          <div class="flex items-center gap-2 justify-between">
            <h1 class="text-xl font-semibold dark:text-zinc-200">
              {{ title }}
            </h1>
            <slot name="actions" />
          </div>
          <p v-if="description" class="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
            {{ description }}
          </p>
        </header>
        <UDivider v-if="title" class="my-4" />
        <TheLoader v-if="isLoading" />
        <TheContentPlaceholder
          v-else-if="error"
          label="Oops, Something broke on our end..."
          :description="`Please try again or contact an admin: '${error.message}'`"
          icon="pixelarticons:warning-box"
          icon-class="text-red-400"
        />
        <div v-else>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
