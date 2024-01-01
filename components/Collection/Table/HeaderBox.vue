<script setup lang="ts">
defineProps<{
  label: string
  width?: string
}>()
</script>

<template>
  <th class="p-2 border-r text-sm font-thin text-gray-600 dark:text-gray-200 dark:border-border" :class="width || 'min-w-[300px]'">
    <div class="flex items-center justify-start pl-2">
      {{ label }}
    </div>
  </th>
</template>
