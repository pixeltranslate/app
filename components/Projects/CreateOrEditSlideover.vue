<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { CreateOrUpdateProject } from '~/types'
import { createOrUpdateProjectSchema } from '~/server/schemas'

const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()
const { projects: projectQuery } = useQuery()
const { projectCreateOrEdit: { data: popupData, close: closePopup } } = useGlobalOpeners()

const toast = useToast()
const isSubmitting = ref(false)
const mode = computed(() => popupData?.value?.mode)
const workspaceId = computed(() => {
  if (!popupData?.value?.data) {
    return
  }
  return popupData.value.data.workspaceId
})
const id = computed(() => {
  if (popupData.value?.mode === 'update') {
    return popupData.value?.data.id
  }
})

const query = computed(() => {
  if (!id.value || !workspaceId.value) {
    return undefined
  }
  return {
    projectId: id.value,
    workspaceId: workspaceId.value
  }
})
const { data, isLoading } = projectQuery.byId(query)

const title = computed(() => {
  if (popupData.value?.mode === 'update') {
    return `Editing project: ${popupData.value.data.name}`
  }
  return 'Creating new project'
})

const payload = computed((): CreateOrUpdateProject | undefined => {
  if (!popupData.value?.data) {
    return undefined
  }

  if (popupData.value.mode === 'create') {
    return {
      mode: 'create',
      data: {
        workspaceId: popupData.value.data?.workspaceId,
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
        description: data.value?.description,
        workspaceId: popupData.value.data?.workspaceId
      }
    }
  }
})
const { cloned } = useMightyClone(payload)

const closePage = () => {
  queryClient.invalidateQueries({ queryKey: ['projects', workspaceId] })
  isSubmitting.value = false
  closePopup()
}

const create = useMutation({
  mutationFn: $trpc.projectRouter.create.mutate,
  onError: () => toast.add({ title: 'Error happened :sad face:' }) && closePage,
  onSuccess: () => {
    toast.add({
      title: 'Created new project'
    })
    closePage()
  }
})

const update = useMutation({
  mutationFn: $trpc.projectRouter.update.mutate,
  onError: () => toast.add({ title: 'Error happened :sad face:' }) && closePage,
  onSuccess: (workspace) => {
    toast.add({
      title: `Updated project: ${workspace.name}`
    })
    queryClient.invalidateQueries({ queryKey: ['projects', query] })
    closePage()
  }
})

const submit = (payload?: CreateOrUpdateProject) => {
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
      :description="mode === 'create' ? 'Get started by filling in the information below to create your new project.' : undefined"
      :is-open="!!popupData"
      :is-loading="!mode || (mode === 'update' && isLoading)"
      bg="bg-secondary"
      @close="closePopup"
    >
      <TheLoader v-if="!cloned || (mode === 'update' && isLoading)" />
      <UForm v-else :schema="createOrUpdateProjectSchema" :state="cloned" @submit="() => submit(cloned)">
        <div class="flex flex-col gap-5">
          <UFormGroup label="Project name:" name="name">
            <UInput v-model="cloned.data.name" color="gray" placeholder="My amazing workspace" />
          </UFormGroup>
          <UFormGroup label="Description:" name="description">
            <UTextarea v-model="cloned.data.description" placeholder="What do you plan to do with your workspace?" />
          </UFormGroup>

          <div class="flex items-center gap-2 justify-end">
            <UButton type="submit" color="primary" class="mt-3" size="md" :loading="isSubmitting">
              {{ cloned.mode === 'create' ? 'Create' : 'Save' }} project
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
