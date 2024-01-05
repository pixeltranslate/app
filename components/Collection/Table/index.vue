<script setup lang="ts">
import type { CollectionEntry } from '~/types'
import { LOCALES, type LocaleCodes } from '~/helpers/localCodes'

const props = defineProps<{
  entries: Record<string, CollectionEntry>
}>()
const { languageOptions, selectedLanguages, setData, dataWithoutDeleted, updateEntry, addEntry, deleteEntry } = useCollectionTable()

// Send initial data to the collections table composable
setData(Object.values(props.entries))

// Update the entries when they are repulled from the database
watch(props, () => {
  setData(Object.values(props.entries))
})
</script>

<template>
  <UCard :ui="{ body: { padding: '!p-0' }, rounded: 'rounded-sm'}">
    <div
      v-if="dataWithoutDeleted.length > 0"
      class="overflow-auto h-[78vh]"
    >
      <table
        class="border dark:border-border"
      >
        <thead>
          <tr class="bg-gray-50 dark:bg-foreground border-b dark:border-border">
            <th class="border-r p-2 dark:border-border" />
            <CollectionTableHeaderBox label="Key" width="w-[300px]" />
            <template
              v-for="language in languageOptions"
              :key="language"
            >
              <CollectionTableHeaderBox
                v-if="selectedLanguages.includes(language)"
                :label="LOCALES[language as LocaleCodes]"
              />
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in dataWithoutDeleted"
            :key="item.id"
            class="bg-gray-100 dark:bg-transparent text-center border-b text-sm dark:border-border"
          >
            <td class="p-2 border-r dark:border-border">
              <div class="flex flex-col gap-2">
                <UTooltip text="Delete entry" :popper="{ arrow: true }">
                  <UButton square color="red" variant="soft" @click="deleteEntry(item.id)">
                    <Icon name="material-symbols:delete-outline" size="15" />
                  </UButton>
                </UTooltip>
              </div>
            </td>
            <td
              class="border-r min-w-[300px] dark:border-border bg-gray-200/40 dark:bg-foreground/40"
              :class="selectedLanguages.length === 0 && 'w-full'"
            >
              <UTextarea
                v-model="item.name"
                variant="none"
                placeholder="Identifier"
                resize
                :ui="{ base: 'min-h-[100px]' }"
              />
            </td>
            <template
              v-for="language in languageOptions"
              :key="language"
            >
              <CollectionTableBodyBox
                v-if="selectedLanguages.includes(language)"
                :row-id="item.id"
                :default-value="item.translations[language]"
                @update="(value) => updateEntry(value, item.id, language)"
              />
            </template>
          </tr>
          <tr>
            <td
              colspan="100%"
              class="relative cursor-pointer group hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              @click="addEntry('New entry')"
            >
              <div class="sticky left-0 flex items-center text-gray-500 p-2 text-sm gap-2 w-[250px] group-hover:text-gray-700 dark:group-hover:text-gray-300">
                <Icon name="pixelarticons:plus" />
                Add new key
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TheContentPlaceholder
      v-else
      label="The translations are not translating yet."
      description="You should add your first key to begin translating!"
      icon="heroicons:language"
    >
      <UButton
        label="Add your first key"
        icon="i-heroicons-plus"
        @click="addEntry('The first key')"
      />
    </TheContentPlaceholder>
  </UCard>
</template>
