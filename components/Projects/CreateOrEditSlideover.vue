<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { CreateOrUpdateProject, ProjectPlatforms } from '~/types'
import { createOrUpdateProjectSchema } from '~/server/schemas'
import { platformToIcon } from '~/composables/usePlatformIcon'

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
      description: '',
      platform: 'unity'
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

const platforms: Record<ProjectPlatforms, { id: ProjectPlatforms, label: string, disabled?: boolean, icon: string }> = {
  unity: {
    id: 'unity',
    label: 'Unity',
    icon: platformToIcon.unity
  },
  unreal: {
    id: 'unreal',
    label: 'Unreal Engine 4',
    disabled: true,
    icon: platformToIcon.unreal
  },
  java: {
    id: 'java',
    label: 'Java SDK',
    disabled: true,
    icon: platformToIcon.java
  },
  node: {
    id: 'node',
    label: 'NodeJS',
    disabled: true,
    icon: platformToIcon.node
  },
  multi: {
    id: 'multi',
    label: 'Multi-platform',
    icon: platformToIcon.multi
  }
}
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
              v-model="cloned.data.platform"
              searchable
              size="lg"
              searchable-placeholder="Search for a platform..."
              value-attribute="id"
              option-attribute="label"
              :options="Object.values(platforms)"
            >
              <template #leading>
                <UIcon :name="platforms[cloned.data.platform].icon" class="w-5 h-5 mx-0.5" />
              </template>
              <template #label>
                <span>{{ platforms[cloned.data.platform].label }}</span>
              </template>
            </USelectMenu>
          </UFormGroup>

          <UFormGroup label="Languages:">
            <LanguageSelector />
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
