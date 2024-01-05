<script lang="ts" setup>
import { LOCALES, type LocaleCodes } from '~/helpers/localCodes'

const { languageCreateOrEdit: { data: popupData, close: closePopup } } = useGlobalOpeners()

interface CountrySelectOption {
  id: LocaleCodes,
  label: string
}

const selectedLanguages = ref<string>('')
const languageOptions = computed<CountrySelectOption[]>(() => {
  // @ts-expect-error
  return Object.keys(LOCALES).map((key: LocaleCodes) => {
    return {
      id: key,
      label: LOCALES[key]
    }
  })
})
</script>

<template>
  <div>
    <TheSlideover
      :is-open="!!popupData"
      title="Add a language"
      @close="closePopup"
    >
      <div class="flex flex-col gap-5">
        <UFormGroup label="Language Code:">
          <USelectMenu
            v-model="selectedLanguages"
            searchable
            size="lg"
            searchable-placeholder="Search for a language..."
            class="w-full min-w-[200px]"
            placeholder="Select a language..."
            :options="languageOptions"
          />
        </UFormGroup>
        <UFormGroup label="Base language:">
          <USelectMenu
            v-model="selectedLanguages"
            searchable
            size="lg"
            searchable-placeholder="Search for a language..."
            class="w-full min-w-[200px]"
            placeholder="Select a base language..."
            :options="languageOptions"
          />
          <template #help>
            <p class="text-xs">
              The base language will be used to copy the entered values as placeholders for the new language.
            </p>
          </template>
        </UFormGroup>
      </div>
    </TheSlideover>
  </div>
</template>
