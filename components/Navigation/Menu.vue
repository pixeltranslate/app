<script lang="ts" setup>
import type { SidebarItem } from './SidebarItem.vue'
defineProps<{ items: SidebarItem[] }>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <NavigationSidebarItem
      v-for="item in items"
      v-bind="item"
      :key="item.label"
    />
  </div>
</template>
