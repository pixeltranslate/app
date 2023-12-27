<script setup lang="ts">
defineProps<{
  isOpen: boolean | Ref<boolean>,
  title?: string
  description?: string
  width?: string
  isLoading?: boolean
}>()
defineEmits(['close'])

</script>

<template>
  <USlideover
    :model-value="unref(isOpen)"
    :ui="{ width: 'w-screen max-w-2xl overflow-hidden', wrapper: 'py-2', background: 'rounded-l shadow' }"
    @update:model-value="() => $emit('close')"
  >
    <div>
      <div class="flex items-center bg-primary-dark px-4 py-6 sm:px-6 justify-between">
        <div class="flex flex-col">
          <USkeleton v-if="isLoading" class="h-4 w-[200px]" :ui="{ background: '!bg-primary-light' }" />
          <h1 v-else class="text-base font-semibold leading-6 text-white">
            {{ title }}
          </h1>

          <div v-if="description" class="mt-1">
            <USkeleton v-if="isLoading" class="h-3 w-[400px]" :ui="{ background: '!bg-primary-light' }" />
            <p v-else class="text-sm text-primary-light">
              {{ description }}
            </p>
          </div>
        </div>
        <UButton
          color="white"
          variant="outline"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="() => $emit('close')"
        />
      </div>
    </div>
    <div class="px-5 py-8">
      <slot />
    </div>
  </USlideover>
</template>
