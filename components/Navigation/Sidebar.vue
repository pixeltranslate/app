<script lang="ts" setup>
import type { SidebarItem } from './SidebarItem.vue'

const SIDEBAR: SidebarItem[] = [
  {
    label: 'Settings',
    icon: 'pixelarticons:sliders',
    href: '/'
  },
  {
    label: 'Projects',
    icon: 'pixelarticons:folder',
    children: [{
      label: 'Backrooms: Survive the complex',
      href: '/'
    }]
  }
]

const { isExpanded } = useSidebar()
</script>

<template>
  <div class="h-full md:py-3">
    <div class="fixed md:static z-10 flex flex-col justify-between h-full bg-primary-superdark rounded-r shadow py-2 w-full md:w-72" :class="isExpanded ? 'block': 'hidden'">
      <div>
        <div class="flex hover:bg-primary-dark/40 rounded items-center p-2 mx-2 cursor-pointer gap-3">
          <UAvatar
            text="P"
            size="md"
            :ui="{ background: '!bg-primary-dark' }"
          />
          <div>
            <p class="text-gray-200">
              Prismarin
            </p>
            <div class="flex items-center gap-1 text-xs text-gray-400">
              <p> Free </p>
              <p class="mx-1">
                -
              </p>
              <div>
                5
                <Icon name="pixelarticons:users" />
              </div>
            </div>
          </div>
        </div>

        <UDivider :ui="{ wrapper: { base: 'my-3 px-2' }, border: { base : '!border-primary-dark/40' } }" />

        <div class="flex flex-col gap-1">
          <NavigationSidebarItem
            v-for="item in SIDEBAR"
            v-bind="item"
            :key="item.label"
          />
        </div>
      </div>
    </div>
  </div>
</template>
