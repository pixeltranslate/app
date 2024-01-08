<script setup lang="ts">
import type { RecentProject } from '~/types'

const props = defineProps<{
  project: RecentProject
}>()

const link = computed(() => `/workspace/${props.project.workspaceId}/project/${props.project.id}`)
</script>

<template>
  <NuxtLink :to="link">
    <div class="flex items-center gap-3 hover:bg-gray-200/40 dark:hover:bg-foreground/30 px-3 py-4 border-t dark:border-border cursor-pointer">
      <ProjectsPlatformChip :platform="project.platform" size="h-7 w-7" />
      <div class="grow">
        <h1 class="text-md text-gray-700 dark:text-gray-200">
          <span class="text-gray-500 dark:text-gray-400">{{ project.workspaceName }} / </span>{{ project.name }}
        </h1>
        <p class="text-xs text-gray-500">
          Last updated {{ project.updatedAt?.toDateString() }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
