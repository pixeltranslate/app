<script setup lang="ts">
import { createOrUpdateWorkspaceSchema } from '~/server/schemas'
import type { CreateOrUpdateWorkspace } from '~/types'

const props = defineProps<{ payload: CreateOrUpdateWorkspace, isLoading?: boolean }>()
defineEmits<{(e: 'submit', payload: CreateOrUpdateWorkspace): void}>()

const { cloned } = useMightyClone(props.payload)
</script>

<template>
  <div>
    <UForm :schema="createOrUpdateWorkspaceSchema" :state="cloned" @submit="$emit('submit', cloned)">
      <div class="flex flex-col gap-5">
        <UFormGroup label="Workspace name:" name="name">
          <UInput v-model="cloned.data.name" color="gray" placeholder="My amazing workspace" />
        </UFormGroup>
        <UFormGroup label="Description:" name="description">
          <UTextarea v-model="cloned.data.description" placeholder="What do you plan to do with your workspace?" />
        </UFormGroup>

        <div class="flex items-center gap-2 justify-end">
          <UButton type="submit" color="primary" class="mt-3" size="md" :loading="isLoading">
            {{ cloned.mode === 'create' ? 'Create' : 'Save' }} workspace
          </UButton>
          <UButton class="mt-3" size="md" :disabled="isLoading">
            Cancel
          </UButton>
        </div>
      </div>
      <pre>
        {{ cloned }}
      </pre>
    </UForm>
  </div>
</template>
