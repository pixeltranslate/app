<script setup lang="ts">
import type { ProjectPlatforms } from '~/types'

defineProps<{
    title: string
    platform: ProjectPlatforms
}>()
</script>

<template>
  <div class="flex items-center gap-3 hover:bg-gray-200/40 dark:hover:bg-foreground/30 px-3 py-4 border-t dark:border-border cursor-pointer">
    <ProjectsPlatformChip :platform="platform" size="h-7 w-7" />
    <div class="grow">
      <h1 class="text-md text-gray-700 dark:text-gray-200">
        <span class="text-gray-500 dark:text-gray-400">Workspace / </span>{{ title }}
      </h1>
    </div>
    <UAvatarGroup size="xs" :max="3">
      <UAvatar
        src="https://github.com/zoey-kaiser.png"
        alt="benjamincanac"
      />
      <UAvatar
        src="https://github.com/reapermaga.png"
        alt="Atinux"
      />
      <UAvatar
        src="https://github.com/levenour.png"
        alt="smarroufin"
      />
      <UAvatar
        src="https://github.com/levenour.png"
        alt="smarroufin"
      />
    </UAvatarGroup>
    <UButton
      icon="i-heroicons-ellipsis-horizontal"
      square
    />
  </div>
</template>
