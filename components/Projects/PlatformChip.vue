<script setup lang="ts">
import type { ProjectPlatforms } from '~/types'
import { platformToIcon } from '~/composables/usePlatformIcon'

withDefaults(defineProps<{ platform: ProjectPlatforms, size?: string, color?: string }>(), {
  size: 'w-6 h-6',
  color: undefined
})

interface PlatformData {
  color?: string,
  label: string
  icon: string,
}

const platforms: Record<ProjectPlatforms, PlatformData> = {
  unity: {
    label: 'Unity',
    icon: platformToIcon.unity
  },
  unreal: {
    label: 'Unreal Engine 4',
    icon: platformToIcon.unreal
  },
  java: {
    label: 'Java SDK',
    color: 'text-red-500 dark:text-red-300',
    icon: platformToIcon.java
  },
  node: {
    label: 'NodeJS',
    color: 'text-yellow-500',
    icon: platformToIcon.node
  },
  multi: {
    label: 'Multi-platform',
    icon: platformToIcon.multi
  }
}

</script>

<template>
  <div class="p-1.5 dark:border-white/20 border flex items-center justify-center rounded">
    <UIcon :name="platforms[platform].icon" :class="`${size} ${color ?? (platforms[platform].color || 'text-gray-600 dark:text-gray-200')}`" />
  </div>
</template>
