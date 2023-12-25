<script setup lang="ts">
defineProps<{
  isOpen: boolean | Ref<boolean>,
  title?: string
}>()
defineEmits(['close'])

</script>

<template>
  <USlideover
    :model-value="unref(isOpen)"
    :ui="{ width: 'w-screen max-w-5xl', wrapper: 'py-2', background: 'rounded-l shadow border-l-2 border-primary-dark' }"
    @update:model-value="() => $emit('close')"
  >
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-border' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="() => $emit('close')" />
        </div>
      </template>
      <slot />
    </UCard>
  </USlideover>
</template>
