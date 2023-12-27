<script setup lang=ts>
import type { DropdownItem } from '#ui/types'
import getInitialsFromString from '~/helpers/getInitialsFromString'
import type { ApiWorkspaceGetAll } from '~/types'

const { workspaceCreateOrEdit, workspaceDelete } = useGlobalOpeners()

const props = defineProps<{ workspace: ApiWorkspaceGetAll}>()
const link = computed(() => {
  return [
    [
      { label: 'Edit', click: () => workspaceCreateOrEdit.open({ mode: 'edit', data: { id: props.workspace.id } }) }
    ],
    [{ label: 'Delete', click: () => workspaceDelete.open({ id: props.workspace.id }) }]
  ] as DropdownItem[][]
})
</script>

<template>
  <li class="overflow-hidden rounded-lg border border-gray-200 dark:border-border">
    <div class="flex items-center gap-x-4 border-b border-gray-900/5 dark:border-border bg-gray-50 dark:bg-foreground p-6">
      <UAvatar size="md" :text="getInitialsFromString(workspace.name)" :ui="{ background: '!bg-secondary' }" />
      <div class="text-sm font-medium leading-6 flex-1 truncate overflow-hidden">
        {{ workspace.name }}
      </div>
      <div class="flex items-center gap-1">
        <UButtonGroup size="sm" orientation="horizontal">
          <NuxtLink :href="`/workspace/${workspace.id}`">
            <UButton label="View" />
          </NuxtLink>
          <UDropdown :items="link" :popper="{ placement: 'bottom-end' }">
            <UButton color="white" trailing-icon="i-pixelarticons-chevron-down" />
          </Udropdown>
        </UButtonGroup>
      </div>
    </div>
    <dl class="-my-3 divide-y divide-gray-200 dark:divide-border px-6 py-6 text-sm leading-6">
      <div class="flex justify-between gap-x-4 pb-1.5">
        <dt class="text-gray-500 dark:text-gray-300">
          Created
        </dt>
        <dd class="text-gray-700 dark:text-gray-400">
          {{ workspace.createdAt.toDateString() }}
        </dd>
      </div>
      <div class="flex justify-between gap-x-4 pt-1.5">
        <dt class="text-gray-500 dark:text-gray-300">
          Members
        </dt>
        <dd class="text-gray-700 dark:text-gray-400">
          {{ Object.keys(workspace.members).length }}
        </dd>
      </div>
    </dl>
  </li>
</template>
