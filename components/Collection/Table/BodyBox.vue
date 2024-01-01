<script lang="ts" setup>
const props = defineProps<{ defaultValue?: string }>()
const emit = defineEmits<{(e: 'update', value: string): string}>()

const value = ref(props.defaultValue)

const onType = (input: string) => {
  if (input === value.value) {
    value.value = emit('update', input)
  }
}
</script>

<template>
  <td class="border-r w-full min-w-[400px] dark:border-border bg-gray-100 dark:bg-transparent">
    <UTextarea
      ref="target"
      v-model="value"
      v-debounce:1s="onType"
      :debounce-events="['keydown']"
      variant="none"
      resize
      placeholder="Enter your value..."
      :ui="{ base: 'min-h-[100px]' }"
    />
  </td>
</template>
