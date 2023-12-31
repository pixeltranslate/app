<script setup lang="ts">
import type { Collection } from '~/types'

const selectedLanguages = ref(['EN', 'RU', 'BE', 'NL', 'HD', 'BO'])
const options = ref(['EN', 'DE', 'RU', 'BE', 'NL', 'HD', 'BO'])
const items = ref<Collection[]>([
  {
    id: 'Test',
    name: 'Test',
    translations: {
      EN: 'Test',
      DE: 'Test2',
      RU: 'Test',
      BE: 'Test',
      NL: 'Test',
      HD: 'Test',
      BO: 'Test'
    }
  },
  {
    id: 'Test2',
    name: 'Test2',
    translations: {
      EN: 'Test',
      DE: 'Test2',
      RU: 'Test',
      BE: 'Test',
      NL: 'Test',
      HD: 'Test',
      BO: 'Test'
    }
  }
])

const filteredItems = computed(() => {
  return items.value.map((collection) => {
    const filteredTranslations = Object.fromEntries(selectedLanguages.value.map(k => [k, collection.translations[k]]))
    return {
      ...collection,
      translations: filteredTranslations
    }
  })
})

const addItem = () => {
  items.value.push({
    id: `row-${items.value.length + 1}`,
    name: `Row ${items.value.length + 1}`,
    translations: {
      EN: 'Test',
      DE: 'Test2',
      RU: 'Test',
      BE: 'Test',
      NL: 'Test',
      HD: 'Test',
      BO: 'Test'
    }
  })
}
</script>

<template>
  <TheLayout title="Collection Test">
    <template #actions>
      <USelectMenu v-model="selectedLanguages" :options="options" multiple placeholder="Select Languages" />
    </template>
    <UCard :ui="{ body: { padding: '!p-0' }, rounded: 'rounded' }">
      <div class="relative overflow-x-scroll h-[79vh]">
        <table class="text-sm text-left relative">
          <thead class="sticky top-0 text-sm z-10 bg-primary dark:bg-primary-dark text-white">
            <tr>
              <th scope="col">
                <div class="p-2">
                  Name
                </div>
              </th>
              <th v-for="lang in selectedLanguages" :key="lang" scope="col">
                <div class="p-3 border-l border-primary-light dark:border-primary-light/30">
                  {{ lang }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
              <th scope="row">
                <div class="min-w-[300px] border-b border-r dark:border-border font-normal">
                  <UInput :value="item.name" variant="none" :ui="{ rounded: 'rounded-none' }" />
                </div>
              </th>
              <td v-for="translation in item.translations" :key="translation" class="p-0">
                <div class="min-w-[300px] border-r border-b dark:border-border">
                  <UInput :placeholder="translation" variant="none" :ui="{ rounded: 'rounded-none' }" />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="selectedLanguages.length + 1">
                <div class="relative py-2 hover:bg-gray-100 dark:hover:bg-foreground cursor-pointer mt-[-2px]" @click="addItem">
                  <div class="sticky left-0 px-4 w-[300px] text-sm font-normal text-gray-500 dark:text-gray-400">
                    + Add another row
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </TheLayout>
</template>

<style>
::-webkit-resizer {
  display: none;
}
</style>
