<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import type { FormError } from '#ui/types'

const props = defineProps({
  rules: { type: Object, required: true },
  model: { type: Object, required: true },
  state: { type: Object, required: true }
})

const form = ref()
const v = useVuelidate(props.rules, props.model)

const validateWithVuelidate = async () => {
  v.value.$touch()
  await v.value.$validate()
  return v.value.$errors.map(error => ({
    message: error.$message,
    path: error.$propertyPath
  })) as FormError[]
}

defineExpose({
  validate: async () => {
    await form.value.validate()
  }
})
</script>

<template>
  <UForm ref="form" :state="state" :model="model" :validate="validateWithVuelidate">
    <slot />
  </UForm>
</template>
