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

const isExpanded = ref(false)

</script>

<template>
  <div class="h-screen py-3">
    <div class="flex flex-col justify-between h-full bg-primary-dark rounded-r shadow" :class="isExpanded ? 'w-72': 'w-20'">
      <div>
        <div class="text-center h-[70px] flex items-center justify-center">
          <h1 v-if="isExpanded" class="text-3xl" style="font-family: 'Pixelify Sans';">
            Pixel<span class="text-secondary-light">Translate</span>
          </h1>
          <h1 v-else class="bg-secondary w-12 h-12 rounded flex items-center justify-center">
            <h1 class="text-4xl" style="font-family: 'Pixelify Sans';">
              P
            </h1>
          </h1>
        </div>
        <div v-if="isExpanded" class="flex flex-col gap-1">
          <NavigationSidebarItem
            v-for="item in SIDEBAR"
            v-bind="item"
            :key="item.label"
          />
        </div>
      </div>
      <div class="flex mb-5" :class="isExpanded ? 'justify-start ml-5' : 'justify-center'">
        <div class="bg-primary w-10 h-10 flex items-center justify-center rounded cursor-pointer hover:bg-primary-light" @click="isExpanded = !isExpanded">
          <Icon
            name="pixelarticons:chevron-right"
            size="30px"
            class="transition"
            :class="isExpanded ? 'rotate-180' : 'rotate-0'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
