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
  { id: '273674dcfbhdf63874398', name: 'Menus' },
  { id: '47834735u34', name: 'Escape Menu' },
  { id: '35iu53bhj35j35', name: 'Credits' },
  { id: '53bhu35jbh35j35', name: 'NPCs' },
  { id: '35hu53ugkj353', name: 'World' },
  { id: '5u5jnk65bjk564', name: 'Buildings' },
  { id: '43hj354bhj534bhukj453', name: 'New York city' },
  { id: '45hjbk54hjbk45bhj54', name: 'Signs' },
  { id: '453bh45hbj4435', name: 'Tutorial' },
  { id: '435hu435hjb4j345', name: 'Quick action UI' },
  { id: '45hu345bhkj435', name: 'Inventory' },
  { id: '453u453j45jn345', name: 'Sounds' },
  { id: '543uh435bhj345', name: 'Captions' },
  { id: '453iu345bhu453nj453', name: 'Paris dialogue' },
  { id: '453jhb345bhj45bjkh45', name: 'Quick action prompts' }
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
    label: `Edit ${row.name}`,
    icon: 'i-heroicons-pencil-square-20-solid'
  }, {
    label: 'Adjust permissions',
    icon: 'i-heroicons-users-20-solid'
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
      <UTable
        :columns="columns"
        :rows="filteredRows"
        :sort="{ column: 'name', direction: 'asc' }"
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
