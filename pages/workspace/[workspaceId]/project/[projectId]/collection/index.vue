<script setup lang="ts">
import type { CollectionGetAll } from '~/types'

const { collectionCreateOrEdit, collectionDelete } = useGlobalOpeners()
const { workspaceId, projectId } = usePage()
const { collections: collectionQuery } = useQuery()
const { data, isLoading } = collectionQuery.all({
  workspaceId,
  projectId
})

const items = (row: CollectionGetAll) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => collectionCreateOrEdit.open({
      mode: 'update',
      data: { workspaceId: workspaceId ?? '', projectId: projectId ?? '', id: row.id, name: row.name }
    })
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => collectionDelete.open({ workspaceId: workspaceId ?? '', projectId: projectId ?? '', id: row.id, name: row.name })
  }]
]
</script>

<template>
  <TheLayout
    title="Collections"
  >
    <template #actions>
      <UButton
        v-if="workspaceId && projectId"
        label="New collection"
        icon="i-heroicons-plus"
        size="md"
        color="white"
        variant="solid"
        @click="collectionCreateOrEdit.open({ mode: 'create', data: { workspaceId, projectId } })"
      />
    </template>
    <TheLoader v-if="isLoading && !data" />
    <TheContentPlaceholder
      v-else-if="data.length === 0 && workspaceId && projectId"
      label="No collections were added."
      description="You should add your first collection here by clicking on the button below!"
    >
      <UButton
        color="light"
        label="Create your first collection"
        @click="collectionCreateOrEdit.open({ mode: 'create', data: { workspaceId, projectId } })"
      />
    </TheContentPlaceholder>
    <div v-else class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
      <div v-for="value in data" :key="value.id" class="grid grid-cols-2 items-center px-3 py-2 bg-gray-200 dark:bg-foreground rounded-md shadow-sm border-border border-opacity-20 dark:border-border border-[1px]">
        <div>
          <div class="flex items-center gap-1 text-lg">
            {{ value.name }}
          </div>
          <UDivider />
          <span class="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <span v-if="value.entries">{{ value.entries }} <span v-if="value.entries == 1">entry</span><span v-else>entries</span></span>
            <span v-else>No entries</span>
          </span>
        </div>
        <div class="flex justify-end">
          <UButtonGroup size="sm" orientation="horizontal">
            <UButton :to="`./collection/${value.id}`">
              <Icon name="carbon:view" class="text-black dark:text-white" /> View
            </UButton>
            <UDropdown :items="items(value)" :popper="{ placement: 'bottom-end' }">
              <UButton color="white" trailing-icon="i-pixelarticons-chevron-down" />
            </UDropdown>
          </UButtonGroup>
        </div>
      </div>
    </div>
  </TheLayout>
</template>
