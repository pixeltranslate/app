<script setup lang="ts">
import type { DropdownItem } from '@nuxt/ui/dist/runtime/types'
import type { ApiProjectGetAll } from '~/types'

const { projectCreateOrEdit, projectDelete } = useGlobalOpeners()

const props = defineProps<{ project: ApiProjectGetAll, workspaceId: string }>()
const links = computed(() => {
  return [
    [
      {
        label: 'Edit',
        click: () => projectCreateOrEdit.open(
          {
            mode: 'update',
            data: {
              workspaceId: props.workspaceId,
              id: props.project.id,
              name: props.project.name
            }
          })
      }
    ],
    [{ label: 'Delete', click: () => projectDelete.open({ workspaceId: props.workspaceId, id: props.project.id, name: props.project.name }) }]
  ] as DropdownItem[][]
})
</script>

<template>
  <li class="flex flex-col gap-0 rounded overflow-hidden border dark:border-border">
    <div class="flex items-center justify-between gap-x-2 bg-white dark:bg-foreground py-3 px-4">
      <div class="min-w-0">
        <div class="flex items-center gap-x-2">
          <p>
            {{ project.name }}
          </p>
          <UBadge color="primary" variant="outline" size="xs">
            Unity
          </UBadge>
        </div>
        <div v-if="project.description" class="flex items-center gap-x-2 text-xs leading-5 text-gray-500 dark:text-gray-300">
          <p class="whitespace-nowrap">
            {{ project.description }}
          </p>
        </div>
      </div>
      <div class="flex flex-none items-center gap-x-4">
        <UButtonGroup size="sm" orientation="horizontal">
          <NuxtLink :href="`/workspace/${workspaceId}/project/${project.id}`">
            <UButton label="View" />
          </NuxtLink>
          <UDropdown :items="links" :popper="{ placement: 'bottom-end' }">
            <UButton color="white" trailing-icon="i-pixelarticons-chevron-down" />
          </Udropdown>
        </UButtonGroup>
      </div>
    </div>
    <dl class="divide-y divide-gray-200 dark:divide-border px-4 py-1 text-xs leading-6 text-gray-500 dark:text-gray-300">
      <div class="flex justify-between gap-x-4 py-1">
        <dt>
          Created
        </dt>
        <dd>
          {{ project.createdAt.toDateString() }}
        </dd>
      </div>
    </dl>
  </li>
</template>
