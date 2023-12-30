<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { CreateOrUpdateProject } from '~/types'
import { createOrUpdateProjectSchema } from '~/server/schemas'

const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()
const { projectCreateOrEdit: { data: popupData, close: closePopup } } = useGlobalOpeners()

const toast = useToast()
const isSubmitting = ref(false)
const mode = computed(() => popupData?.value?.mode)

const title = computed(() => {
  if (popupData.value?.mode === 'update') {
    return `Editing project: ${popupData.value.data.name}`
  }
  return 'Creating new project'
})

const payload = computed((): CreateOrUpdateProject | undefined => {
  if (!popupData.value) {
    return undefined
  }

  if (popupData.value.mode === 'update') {
    return popupData.value
  }

  return {
    mode: 'create',
    data: {
      workspaceId: popupData.value.data.workspaceId,
      name: '',
      description: ''
    }
  }
})
const { cloned } = useMightyClone(payload)

const create = useMutation({
  mutationFn: $trpc.projectRouter.create.mutate,
  onError: () => {
    isSubmitting.value = false
    toast.add({
      title: 'The project could not be created'
    })
  },
  onSuccess: (project) => {
    queryClient.invalidateQueries({ queryKey: ['projects', popupData.value?.data.workspaceId] })
    isSubmitting.value = false
    toast.add({
      title: `Created new project: ${project.name}`
    })
    closePopup()
  }
})

const update = useMutation({
  mutationFn: $trpc.projectRouter.update.mutate,
  onError: () => {
    isSubmitting.value = false
    toast.add({
      title: 'The project could not be updated'
    })
  },
  onSuccess: (project) => {
    queryClient.invalidateQueries({ queryKey: ['projects', popupData.value?.data.workspaceId] })
    queryClient.invalidateQueries({ queryKey: ['projects', popupData.value?.data.workspaceId, project.id] })
    isSubmitting.value = false
    toast.add({
      title: `Updated project: ${project.name}`
    })
    closePopup()
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

const platforms = [{
  id: 'unity',
  label: 'Unity',
  avatar: { src: '/platforms/unity.png' }
}, {
  id: 'unreal',
  label: 'Unreal Engine 4',
  avatar: { src: '/platforms/unreal.png' }
}, {
  id: 'java',
  label: 'Java SDK',
  avatar: { src: '/platforms/java.png' }
}, {
  id: 'node',
  label: 'NodeJS',
  avatar: { src: '/platforms/node.png' }
}, {
  id: 'multi',
  label: 'Multi-platform',
  icon: 'i-pixelarticons-command'
}]
const selected = ref(platforms[0])
</script>

<template>
  <div>
    <TheSlideover
      :title="title"
      :description="mode === 'create' ? 'Get started by filling in the information below to create your new project.' : undefined"
      :is-open="!!popupData"
      :is-loading="!mode || !cloned"
      bg="bg-secondary-dark"
      @close="closePopup"
    >
      <UForm v-if="cloned" :schema="createOrUpdateProjectSchema" :state="cloned" @submit="() => submit(cloned)">
        <div class="flex flex-col gap-5">
          <UFormGroup label="Project name:" name="name" required>
            <UInput v-model="cloned.data.name" color="gray" placeholder="My fabulous project" />
          </UFormGroup>
          <UFormGroup label="Description:" name="description">
            <UTextarea v-model="cloned.data.description" placeholder="What do you plan to do with your workspace?" />
          </UFormGroup>

          <UFormGroup
            label="Platform"
            name="type"
          >
            <USelectMenu
              v-model="selected"
              searchable
              size="md"
              searchable-placeholder="Search for a platform..."
              :options="platforms"
            >
              <template #leading>
                <UIcon v-if="selected.icon" :name="selected.icon" class="w-4 h-4 mx-0.5" />
                <UAvatar v-else-if="selected.avatar" v-bind="selected.avatar" size="3xs" class="mx-0.5" />
              </template>
            </USelectMenu>
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
