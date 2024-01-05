<script setup lang="ts">
import type { CollectionGetAll } from '~/types'

const { collectionCreateOrEdit, collectionDelete } = useGlobalOpeners()
const { workspaceId, projectId } = usePage()
const { collections: collectionQuery } = useQuery()
const { data, isLoading } = collectionQuery.all({
  workspaceId,
  projectId
})

const columns = [{
  key: 'name',
  label: 'Name',
  class: 'w-full'
}, { key: 'actions' }]

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
    <UCard :ui="{ body: { padding: '!p-2' } }">
      <UTable
        :columns="columns"
        :rows="data"
        :loading="isLoading"
        :ui="{ td: { padding: 'py-2' } }"
      >
        <template #actions-data="{ row }">
          <UButtonGroup size="sm" orientation="horizontal">
            <UButton label="View" :to="`./collection/${row.id}`" />
            <UDropdown :items="items(row)" :popper="{ placement: 'bottom-end' }">
              <UButton color="white" trailing-icon="i-pixelarticons-chevron-down" />
            </Udropdown>
          </UButtonGroup>
        </template>
      </UTable>
    </UCard>
  </TheLayout>
</template>
