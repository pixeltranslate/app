<script setup lang="ts">
const { makeRule } = useFormErrorMessages()
const emit = defineEmits(['submit'])

const isLoading = ref(false)
const state = reactive({
  name: undefined
})

const rules = {
  name: makeRule(['required'], 'name')
}

const submit = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    emit('submit', state)
  }, 2000)
}
</script>

<template>
  <div>
    <TheForm :state="state" :model="state" :rules="rules" @submit="submit">
      <UFormGroup label="Workspace name:" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UButton type="submit" class="mt-3" size="md" :loading="isLoading">
        Create workspace
      </UButton>
    </TheForm>
  </div>
</template>
