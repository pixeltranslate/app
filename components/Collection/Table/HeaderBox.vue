<script setup lang="ts">
defineProps<{
  label: string
  minWidth?: string
}>()
</script>

<template>
  <th class="p-2 border-r text-sm font-thin text-gray-600 dark:text-gray-200 dark:border-border" :class="minWidth ?? 'min-w-[300px]'">
    <div class="flex items-center justify-center">
      {{ label }}
    </div>
  </th>
</template>
