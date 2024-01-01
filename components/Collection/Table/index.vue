<script setup lang="ts">
import type { Collection } from '~/types'

const props = defineProps<{
  selectedLanguages: string[]
}>()

const items = ref<Collection[]>([
  {
    id: 'game_name',
    name: 'Game name',
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
    id: 'game_subtitle',
    name: 'Game subtitle',
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
    const filteredTranslations = Object.fromEntries(props.selectedLanguages.map(k => [k, collection.translations[k]]))
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
  <UCard :ui="{ body: { padding: '!p-0' }, rounded: 'rounded-sm'}">
    <div class="overflow-auto h-[78vh]">
      <table class="border dark:border-border">
        <thead>
          <tr class="bg-gray-50 dark:bg-foreground border-b dark:border-border">
            <th class="border-r p-2 dark:border-border" />
            <CollectionTableHeaderBox label="Key" width="min-w-[300px]" />
            <CollectionTableHeaderBox
              v-for="language in selectedLanguages"
              :key="language"
              :label="language"
            />
          </tr>
        </thead>
        <tbody v-if="items">
          <tr
            v-for="item in items"
            :key="item.id"
            class="bg-gray-100 dark:bg-transparent text-center border-b text-sm dark:border-border"
          >
            <td class="p-2 border-r dark:border-border">
              <UButton square color="red" variant="outline">
                <Icon name="pixelarticons:minus" size="15" />
              </UButton>
            </td>
            <td class="border-r w-full min-w-[300px] dark:border-border">
              <UInput
                v-model="item.name"
                variant="none"
                placeholder="Identifier"
              />
            </td>
            <td
              v-for="(translation, index) in item.translations"
              :key="translation"
              class="border-r w-full min-w-[400px] dark:border-border"
            >
              <UInput
                v-model="item.translations[index]"
                variant="none"
                placeholder="Enter your value..."
              />
            </td>
          </tr>
          <tr>
            <td
              colspan="100%"
              class="relative cursor-pointer"
              @click="addItem()"
            >
              <div class="sticky left-0 flex items-center text-gray-500 p-2 text-sm gap-2 w-[250px]">
                <Icon name="pixelarticons:plus" />
                Add new key
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UCard>
</template>
