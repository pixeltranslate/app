<script lang="ts" setup>
withDefaults(defineProps<{
  label?: string
  description?: string
  minHeight?: string
  icon?: string
  iconClass?: string
}>(), {
  label: 'This is pretty lonely here.',
  description: 'You should make this yours and add some content!',
  minHeight: 'min-h-[300px]',
  icon: 'pixelarticons:inbox',
  iconClass: 'text-zinc-500'
})
</script>

<template>
  <UCard>
    <div class="flex flex-col items-center justify-center" :class="minHeight">
      <Icon :name="icon" size="65" class="mb-4" :class="iconClass" />
      <h1 class="font-bold text-zinc-500 dark:text-zinc-100 text-lg">
        {{ label }}
      </h1>
      <p class="text-sm text-zinc-400 text-center">
        {{ description }}
      </p>
      <div class="flex items-center gap-2 mt-4">
        <slot />
      </div>
    </div>
  </UCard>
</template>
