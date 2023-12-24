<script lang="ts" setup>
export interface SidebarItem {
  label: string
  icon?: string
  href?: string
  children?: Omit<SidebarItem, 'children'>[]
}
defineProps<SidebarItem>()

const isExpanded = ref(false)
</script>

<template>
  <NuxtLink :event="href ? 'click' : ''" :to="href">
    <div class="flex items-center justify-between hover:bg-primary p-2 mx-2 rounded cursor-pointer" @click="isExpanded = !isExpanded">
      <div class="flex items-center gap-2">
        <Icon v-if="icon" :name="icon" size="22" />
        {{ label }}
      </div>
      <Icon v-if="children" name="pixelarticons:chevron-down" size="22" />
    </div>
    <div v-if="children && isExpanded" class="ml-3">
      <NavigationSidebarItem v-for="item in children" v-bind="item" :key="item.label" />
    </div>
  </NuxtLink>
</template>
