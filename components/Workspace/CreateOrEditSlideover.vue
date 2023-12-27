<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { CreateOrUpdateWorkspace } from '~/types'
import { createOrUpdateWorkspaceSchema } from '~/server/schemas'

const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()
const { workspaces: workspaceQuery } = useQuery()
const { workspaceCreateOrEdit: { data: popupData, close: closePopup } } = useGlobalOpeners()

const toast = useToast()
const isSubmitting = ref(false)
const mode = computed(() => popupData?.value?.mode)
const id = computed(() => {
  if (!popupData.value) {
    return
  }
  if (popupData.value.mode === 'update') {
    return popupData.value.data.id
  }
})
const { data, isLoading } = workspaceQuery.byId(id)

const title = computed(() => {
  if (popupData.value?.mode === 'update') {
    return `Editing: ${popupData.value.data.name}`
  }
  return 'Creating new workspace'
})

const payload = computed((): CreateOrUpdateWorkspace | undefined => {
  if (!popupData.value) {
    return undefined
  }

  if (popupData.value.mode === 'create') {
    return {
      mode: 'create',
      data: {
        name: '',
        description: ''
      }
    }
  }

  if (data.value) {
    return {
      mode: 'update',
      data: {
        id: data.value?.id,
        name: data.value?.name,
        description: data.value?.description
      }
    }
  }
})
const { cloned } = useMightyClone(payload)

const closePage = () => {
  queryClient.invalidateQueries({ queryKey: ['workspaces'] })
  isSubmitting.value = false
  closePopup()
}

const create = useMutation({
  mutationFn: $trpc.workspaceRouter.create.mutate,
  onError: () => toast.add({ title: 'Error happened :sad face:' }) && closePage,
  onSuccess: () => {
    toast.add({
      title: 'Created new workspace'
    })
    closePage()
  }
})

const update = useMutation({
  mutationFn: $trpc.workspaceRouter.update.mutate,
  onError: () => toast.add({ title: 'Error happened :sad face:' }) && closePage,
  onSuccess: (workspace) => {
    toast.add({
      title: `Updated workspace: ${workspace.name}`
    })
    queryClient.invalidateQueries({ queryKey: ['workspaces', workspace.id] })
    closePage()
  }
})

const submit = (payload?: CreateOrUpdateWorkspace) => {
  if (!payload) {
    return
  }
  isSubmitting.value = true
  if (payload.mode === 'create') {
    create.mutate(payload.data)
  } else {
    update.mutate(payload.data)
  }
}
</script>

<template>
  <div>
    <TheSlideover
      :title="title"
      :description="mode === 'create' ? 'Get started by filling in the information below to create your new workspace.' : undefined"
      :is-open="!!popupData"
      :is-loading="!mode || (mode === 'update' && isLoading)"
      @close="closePopup"
    >
      <TheLoader v-if="!cloned || (mode === 'update' && isLoading)" />
      <UForm v-else :schema="createOrUpdateWorkspaceSchema" :state="cloned" @submit="() => submit(cloned)">
        <div class="flex flex-col gap-5">
          <UFormGroup label="Workspace name:" name="name">
            <UInput v-model="cloned.data.name" color="gray" placeholder="My amazing workspace" />
          </UFormGroup>
          <UFormGroup label="Description:" name="description">
            <UTextarea v-model="cloned.data.description" placeholder="What do you plan to do with your workspace?" />
          </UFormGroup>

          <div class="flex items-center gap-2 justify-end">
            <UButton type="submit" color="primary" class="mt-3" size="md" :loading="isSubmitting">
              {{ cloned.mode === 'create' ? 'Create' : 'Save' }} workspace
            </UButton>
            <UButton class="mt-3" size="md" :disabled="isSubmitting">
              Cancel
            </UButton>
          </div>
        </div>
      </UForm>
    </TheSlideover>
  </div>
</template>
