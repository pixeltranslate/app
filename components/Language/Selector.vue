<script lang="ts" setup>
import { LOCALES, type LocaleCodes } from '~/helpers/localCodes'

const props = defineProps<{
  modelValue: string[]
}>()
const emits = defineEmits(['update:modelValue'])

const search = ref('')
const filteredLanguages = computed(() => Object.keys(LOCALES).filter(code => LOCALES[code as LocaleCodes].toLocaleLowerCase().includes(search.value.toLocaleLowerCase())))

const update = (locale: string, value: boolean) => {
  if (value) {
    if (!props.modelValue.includes(locale)) {
      emits('update:modelValue', [...props.modelValue].concat([locale]))
    }
  } else {
    emits('update:modelValue', props.modelValue.filter(v => v !== locale))
  }
}
</script>

<template>
  <div class="w-full border border-gray-300 dark:border-gray-700 rounded h-[300px] grid grid-cols-2 divide-x divide-gray-300 dark:divide-gray-700 text-sm">
    <div class="flex flex-col gap-1 overflow-hidden">
      <UInput
        v-model="search"
        placeholder="Search for a language..."
        variant="none"
        :ui="{ rounded: 'rounded-none' }"
      />
      <UDivider />
      <div class="flex flex-col gap-1 px-1 py-2 overflow-y-auto">
        <div
          v-for="code in filteredLanguages"
          :key="code"
        >
          <label class="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2 py-1.5">
            <input
              :checked="modelValue.includes(code)"
              type="checkbox"
              class="h-4 w-4 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent form-checkbox rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 text-primary-500 dark:text-primary-400"
              @change="(event) => {
                // @ts-expect-error Vue does not think checked exists on the event as it does not take input type into account
                update(code, event?.target?.checked)
              }"
            >
            <span>
              {{ LOCALES[code as LocaleCodes] }}
            </span>
          </label>
        </div>
      </div>
    </div>

    <div class="p-2 overflow-y-auto">
      <div
        v-for="locale in modelValue"
        :key="locale"
        class="hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2 py-1.5"
      >
        <div class="flex items-center gap-2">
          <span class="text-sm flex-grow">
            {{ LOCALES[locale as LocaleCodes] }}
          </span>
          <UButton
            icon="i-heroicons-x-mark-16-solid"
            size="xs"
            @click="update(locale, false)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
