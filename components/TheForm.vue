<script setup lang="ts">
defineProps({
  schema: { type: Object, required: true },
  state: { type: Object, required: true }
})
</script>

<template>
  <UForm ref="form" :state="state" :schema="schema">
    <slot />
  </UForm>
</template>
