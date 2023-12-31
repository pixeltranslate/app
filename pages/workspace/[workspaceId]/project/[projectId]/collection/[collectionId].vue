<script setup lang="ts">
import type { Collection } from '~/types'

const selectedLanguages = ref(['EN', 'DE', 'RU', 'BE', 'NL', 'HD', 'BO'])
const items: Collection[] = [
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
]
</script>

<template>
  <TheLayout title="Collection Test">
    <UCard :ui="{ body: { padding: '!p-0' } }">
      <div class="relative overflow-x-scroll min-h-[80vh]">
        <table class="text-sm text-left relative">
          <thead class="sticky top-0 text-sm z-10 bg-primary dark:bg-primary-dark text-white">
            <tr>
              <th scope="col">
                <div class="py-5 pl-5 pr-2">
                  Name
                </div>
              </th>
              <th v-for="lang in selectedLanguages" :key="lang" scope="col" class="font-normal">
                <div class="relative group hover:resize-x min-w-[300px] overflow-hidden py-5 px-2 border-r-2 border-primary-light">
                  {{ lang }}
                  <div class="opacity-0 group-hover:opacity-100 absolute h-5 w-5 bottom-0 right-0 rounded-tl bg-primary-dark dark:bg-primary">
                    <Icon name="pixelarticons:arrows-horizontal" size="20px" />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <th scope="row">
                <h1 class="w-[250px] py-3 pl-5 pr-2 font-normal">
                  {{ item.name }}
                </h1>
              </th>
              <td v-for="translation in item.translations" :key="translation">
                <div class="min-w-[300px] py-4 px-3">
                  <UInput :placeholder="translation" />
                </div>
              </td>
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
