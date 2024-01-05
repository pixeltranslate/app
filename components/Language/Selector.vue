<script lang="ts" setup>
import { LOCALES, type LocaleCodes } from '~/helpers/localCodes'

const selected = ref<Record<Partial<LocaleCodes>, boolean>>({})

const update = (locale: LocaleCodes, value: boolean) => {
  if (value) {
    selected.value[locale] = true
  } else {
    delete selected.value[locale]
  }
}
</script>

<template>
  <div class="w-full border border-gray-300 dark:border-gray-700 rounded h-[300px] grid grid-cols-2 divide-x divide-gray-300 dark:divide-gray-700">
    <div class="flex flex-col gap-1 px-1 py-2 overflow-y-auto">
      <div
        v-for="(locale, key) in LOCALES"
        :key="key"
        class="hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2 py-1.5"
      >
        <UCheckbox
          :label="locale"
          :model-value="false"
          :ui="{ inner: 'w-full' }"
          @update:model-value="(v) => update(key, v)"
        />
      </div>
    </div>

    <div class="p-2 overflow-y-auto">
      <div
        v-for="locale in Object.keys(selected)"
        :key="locale"
        class="hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2 py-1.5"
      >
        <div class="flex items-center gap-2">
          <span class="text-sm flex-grow">
            {{ LOCALES[locale as LocaleCodes] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
