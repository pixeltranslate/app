<script setup lang=ts>
import type { DropdownItem } from '#ui/types'
import getInitialsFromString from '~/helpers/getInitialsFromString'
import type { Workspace } from '~/types'

const { workspaceCreateOrEdit, workspaceDelete } = useGlobalOpeners()

const props = defineProps<{ workspace: Workspace}>()
const link = computed(() => {
  return [
    [
      { label: 'Edit', click: () => workspaceCreateOrEdit.open({ mode: 'update', data: props.workspace }) }
    ],
    [{ label: 'Delete', click: () => workspaceDelete.open({ id: props.workspace.id, name: props.workspace.name }) }]
  ] as DropdownItem[][]
})
</script>

<template>
  <li class="overflow-hidden rounded-lg border border-gray-200 dark:border-border">
    <div class="flex items-center gap-x-4 border-b border-gray-900/5 dark:border-border bg-gray-50 dark:bg-foreground py-5 px-4">
      <UAvatar size="md" :text="getInitialsFromString(workspace.name)" :ui="{ background: '!bg-secondary' }" />
      <UTooltip
        :text="workspace.name"
        :ui="{ wrapper: 'text-sm font-medium leading-6 flex-1 truncate' }"
        :popper="{ placement: 'bottom-start', offsetDistance: 5 }"
      >
        <p class="overflow-hidden truncate">
          {{ workspace.name }}
        </p>
      </UTooltip>
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
    <dl class="-my-3 divide-y divide-gray-200 dark:divide-border px-4 py-6 text-sm leading-6">
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
