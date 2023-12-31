<script lang="ts" setup>
defineProps<{ title?: string, description?: string, isLoading?: boolean, error?: Error | null }>()

const { status } = useAuth()
</script>

<template>
  <div class="flex h-full overflow-hidden">
    <NavigationSidebar v-if="status === 'authenticated'" />
    <div class="w-full overflow-auto">
      <div class="p-8 overflow-y-auto">
        <header v-if="title">
          <div class="flex items-center gap-2 justify-between">
            <h1 class="text-xl font-semibold dark:text-zinc-200">
              {{ title }}
            </h1>
            <slot v-if="!isLoading && !error" name="actions" />
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
