<script lang="ts" setup>
defineProps<{ title: string, isLoading?: boolean, error?: Error | null }>()
</script>

<template>
  <div>
    <header class="flex items-center gap-2 justify-between">
      <h1 class="text-xl font-semibold text-zinc-200">
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
    <slot v-else />
  </div>
</template>
