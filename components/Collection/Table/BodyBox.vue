<script lang="ts" setup>
const props = defineProps<{ defaultValue?: string, rowId: string }>()
const emit = defineEmits<{(e: 'update', value: string): string}>()

const { selectedLanguages } = useCollectionTable()

const value = ref(props.defaultValue)
const target = ref()

const width = computed(() => {
  return (1 / selectedLanguages.value.length) * 100
})

const onType = (input: string) => {
  if (input === value.value) {
    value.value = emit('update', input)
  }
}
</script>

<template>
  <td class="relative border-r min-w-[400px] w-full dark:border-border bg-gray-100 dark:bg-transparent" :style="`max-width: ${width}%`">
    <textarea
      ref="target"
      v-model="value"
      v-debounce:1s="onType"
      class="absolute w-full h-full top-0 left-0 py-1.5 px-2.5 bg-transparent outline-none resize-none focus-visible:ring-2 ring-white/20"
      variant="none"
      placeholder="Enter your translation..."
      :debounce-events="['keydown']"
    />
  </td>
</template>
