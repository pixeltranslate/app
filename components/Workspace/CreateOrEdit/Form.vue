<script setup lang="ts">
const { makeRule } = useFormErrorMessages()
defineProps<{ isLoading?: boolean }>()
defineEmits(['submit'])

const state = reactive({
  name: undefined,
  description: undefined
})

const rules = {
  name: makeRule(['required'], 'name'),
  description: makeRule(['required'], 'description')
}
</script>

<template>
  <div>
    <TheForm :state="state" :model="state" :rules="rules" @submit="$emit('submit', state)">
      <div class="flex flex-col gap-5">
        <UFormGroup label="Workspace name:" name="name">
          <UInput v-model="state.name" color="gray" placeholder="My amazing workspace" />
        </UFormGroup>
        <UFormGroup label="Description:" name="description">
          <UTextarea v-model="state.description" placeholder="What do you plan to do with your workspace?" />
        </UFormGroup>

        <div class="flex items-center gap-2 justify-end">
          <UButton type="submit" color="primary" class="mt-3" size="md" :loading="isLoading">
            Create workspace
          </UButton>
          <UButton class="mt-3" size="md" :disabled="isLoading">
            Cancel
          </UButton>
        </div>
      </div>
    </TheForm>
  </div>
</template>
