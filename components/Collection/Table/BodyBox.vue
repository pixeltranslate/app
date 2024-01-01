<script setup lang="ts">
defineProps<{
  placeholder: string
  minWidth?: string
}>()
</script>

<template>
  <td class="border-r min-w-[300px] w-full dark:border-border">
    <UInput variant="none" :placeholder="placeholder" />
  </td>
</template>
