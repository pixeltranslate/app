<script lang="ts" setup>
import type { SidebarItem } from './SidebarItem.vue'

const SIDEBAR: SidebarItem[] = [
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
    <div class="text-center h-[70px] flex items-center justify-center">
      <h1 class="text-3xl" style="font-family: 'Pixelify Sans';">
        Pixel<span class="text-secondary-light">Translate</span>
      </h1>
    </div>
    <div class="flex flex-col gap-1">
      <NavigationSidebarItem
        v-for="item in SIDEBAR"
        v-bind="item"
        :key="item.label"
      />
    </div>
  </div>
</template>
