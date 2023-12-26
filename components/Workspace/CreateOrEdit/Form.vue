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
      <div class="flex flex-col gap-5">
        <UFormGroup label="Workspace name:" name="name">
          <UInput v-model="state.name" color="gray" variant="outline" placeholder="My amazing workspace" />
        </UFormGroup>
        <UFormGroup label="Description:" name="description">
          <UTextarea color="gray" variant="outline" placeholder="What do you plan to do with your workspace?" />
        </UFormGroup>
      </div>

      <div class="flex items-center gap-2 justify-end">
        <UButton type="submit" color="primary" class="mt-3" size="md" :loading="isLoading">
          Create workspace
        </UButton>
        <UButton type="submit" class="mt-3" size="md" :loading="isLoading">
          Cancel
        </UButton>
      </div>
    </TheForm>
  </div>
</template>
