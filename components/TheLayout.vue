<script lang="ts" setup>
defineProps<{ title: string }>()
</script>

<template>
  <div>
    <header class="flex items-center gap-2 justify-between">
      <h1 class="text-xl font-semibold text-zinc-200">
        {{ title }}
      </h1>
      <slot name="actions" />
    </header>
    <UDivider class="my-4" />
    <slot />
  </div>
</template>
