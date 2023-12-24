<script lang="ts" setup>
import type { SidebarItem } from './SidebarItem.vue'

const sidebar: SidebarItem[] = [
  {
    label: 'Projects',
    icon: 'pixelarticons:folder',
    href: '/'
  },
  {
    label: 'SubMenu',
    icon: 'pixelarticons:folder',
    children: [{
      label: 'I am a child.',
      icon: 'pixelarticons:folder',
      href: '/'
    }]
  }
]

</script>

<template>
  <div>
    <div class="flex flex-col gap-1 mt-5">
      <NavigationSidebarItem
        v-for="item in sidebar"
        v-bind="item"
        :key="item.label"
      />
    </div>
  </div>
</template>
