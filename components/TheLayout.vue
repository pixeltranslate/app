<script lang="ts" setup>
defineProps<{ title: string, isLoading?: boolean, error?: Error | null }>()
</script>

<template>
  <div class="flex h-full overflow-hidden">
    <NavigationSidebar />
    <div class="w-full overflow-auto">
      <div class="p-8 overflow-y-auto">
        <header class="flex items-center gap-2 justify-between">
          <h1 class="text-xl font-semibold dark:text-zinc-200">
            {{ title }}
          </h1>
          <slot v-if="!isLoading && !error" name="actions" />
        </header>
        <UDivider class="my-4" />
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
