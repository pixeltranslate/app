<script setup lang="ts">
const { languageOptions, selectedLanguages, data, updateEntry } = useCollectionTable()

const addItem = () => {
  alert('idot')
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
            <template
              v-for="language in languageOptions"
              :key="language"
            >
              <CollectionTableHeaderBox
                v-if="selectedLanguages.includes(language)"
                :label="language"
              />
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in data"
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
            <template v-for="(translation, index) in item.translations" :key="translation">
              <CollectionTableBodyBox
                v-if="selectedLanguages.includes(index)"
                :default-value="translation"
                @update="(value) => updateEntry(value, item.id, index)"
              />
            </template>
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
