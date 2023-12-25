<script lang="ts" setup>
withDefaults(defineProps<{
  label?: string
  description?: string
  minHeight?: string
  icon?: string
}>(), {
  label: 'This is pretty lonely here.',
  description: 'You should make this yours and add some content!',
  minHeight: 'min-h-[300px]',
  icon: 'pixelarticons:inbox'
})
</script>

<template>
  <UCard>
    <div class="flex flex-col items-center justify-center" :class="minHeight">
      <Icon :name="icon" size="65" class="mb-4 text-zinc-500" />
      <h1 class="font-bold text-zinc-100 text-lg">
        {{ label }}
      </h1>
      <p class="text-xs text-zinc-400">
        {{ description }}
      </p>
      <div class="flex items-center gap-2 mt-4">
        <slot />
      </div>
    </div>
  </UCard>
</template>
