<script setup lang="ts">
import { createWorkspaceSchema } from '~/server/schemas'
import type { CreateOrUpdateWorkspace } from '~/types'

const props = defineProps<{ isLoading?: boolean, defaultData: CreateOrUpdateWorkspace, mode: 'create' | 'edit' }>()
defineEmits<{(e: 'submit', payload: CreateOrUpdateWorkspace): void}>()

const formData = reactive({
  ...props.defaultData
})
</script>

<template>
  <div>
    <TheForm :schema="createWorkspaceSchema" :state="formData" @submit="$emit('submit', formData)">
      <div class="flex flex-col gap-5">
        <UFormGroup label="Workspace name:" name="name">
          <UInput v-model="formData.name" color="gray" placeholder="My amazing workspace" />
        </UFormGroup>
        <UFormGroup label="Description:" name="description">
          <UTextarea v-model="formData.description" placeholder="What do you plan to do with your workspace?" />
        </UFormGroup>

        <div class="flex items-center gap-2 justify-end">
          <UButton type="submit" color="primary" class="mt-3" size="md" :loading="isLoading">
            {{ mode === 'create' ? 'Create' : 'Save' }} workspace
          </UButton>
          <UButton class="mt-3" size="md" :disabled="isLoading">
            Cancel
          </UButton>
        </div>
      </div>
    </TheForm>
  </div>
</template>
