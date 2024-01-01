<script lang="ts" setup>
import { LOCALES, type LocaleCodes } from '~/helpers/localCodes'

interface CountrySelectOption {
  id: LocaleCodes,
  label: string
}

const languageOptions = computed<CountrySelectOption[]>(() => {
  // @ts-expect-error
  return Object.keys(LOCALES).map((key: LocaleCodes) => {
    return {
      id: key,
      label: LOCALES[key]
    }
  })
})

const selectedLanguages = ref<string[]>([])
</script>

<template>
  <TheLayout title="Languages">
    <template #actions>
      <div class="flex items-center gap-2">
        <UButtonGroup size="sm" orientation="horizontal">
          <USelectMenu
            v-model="selectedLanguages"
            searchable
            multiple
            searchable-placeholder="Search for a language..."
            class="w-full min-w-[200px]"
            placeholder="Select a language"
            :options="languageOptions"
          />
          <UButton color="gray">
            Add
          </UButton>
        </UButtonGroup>
      </div>
    </template>
  </TheLayout>
</template>
