<script setup lang="ts">
defineProps<{
  isOpen: boolean | Ref<boolean>,
  title?: string
  hideCloseIcon?: boolean
  isLoading?: boolean
  bg?: string
}>()
defineEmits(['close'])

</script>

<template>
  <UModal
    :model-value="unref(isOpen)"
    :ui="{ rounded: 'rounded', container: 'sm:mt-[-10vh]' }"
    @update:model-value="() => $emit('close')"
  >
    <div>
      <div class="flex items-center p-4 justify-between" :class="bg || 'bg-primary-light dark:bg-primary-dark'">
        <div class="flex flex-col">
          <USkeleton v-if="isLoading" class="h-4 w-[200px]" :ui="{ background: '!bg-white/50' }" />
          <h1 v-else class="text-base font-semibold leading-6 text-white">
            {{ title }}
          </h1>
        </div>
        <UButton
          v-if="!hideCloseIcon"
          color="white"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="() => $emit('close')"
        />
      </div>
    </div>
    <div class="px-4 py-6">
      <slot />
    </div>
  </UModal>
</template>
