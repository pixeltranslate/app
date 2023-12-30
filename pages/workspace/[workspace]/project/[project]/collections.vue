<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import type { CollectionInfo } from '~/types'

const columns = [{
  key: 'name',
  label: 'Name',
  class: 'w-full',
  sortable: true
}, {
  key: 'actions'
}]

const collections: CollectionInfo[] = [
  { id: '27367463874398', name: 'User interface' },
  { id: '273674dcfbhdf63874398', name: 'Menus' }
]

const q = useRouteQuery<string>('q', undefined)

const filteredRows = computed<CollectionInfo[]>(() => {
  if (!q.value) {
    return collections
  }

  return collections.filter((collections) => {
    return Object.values(collections).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const items = (row: CollectionInfo) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid'
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]
</script>

<template>
  <TheLayout
    title="Collections"
    description="Collections are used to sort your translations. You can create new collections to match seperate parts of your application."
  >
    <div class="flex pb-2 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Search for a collection..." class="w-full" :ui="{ rounded: 'rounded' }" />
    </div>
    <UCard :ui="{ body: { padding: '!p-2' } }">
      <UTable :columns="columns" :rows="filteredRows" :sort="{ column: 'name', direction: 'asc' }">
        <template #actions-data="{ row }">
          <UButtonGroup size="sm" orientation="horizontal">
            <UButton label="View" />
            <UDropdown :items="items(row)" :popper="{ placement: 'bottom-end' }">
              <UButton color="white" trailing-icon="i-pixelarticons-chevron-down" />
            </Udropdown>
          </UButtonGroup>
        </template>
      </UTable>
    </UCard>
  </TheLayout>
</template>
