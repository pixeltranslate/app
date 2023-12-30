<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { z } from 'zod'
const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()

const { projectDelete } = useGlobalOpeners()
const toast = useToast()

const popupData = computed(() => projectDelete.data.value)
const isSubmitting = ref(false)

const _delete = useMutation({
  mutationFn: $trpc.projectRouter.delete.mutate,
  onError: () => toast.add({ title: 'We could not delete the project' }),
  onSuccess: (project) => {
    queryClient.invalidateQueries({ queryKey: ['projects', popupData.value?.workspaceId] })
    queryClient.invalidateQueries({ queryKey: ['projects', popupData.value?.workspaceId, project.id] })
    isSubmitting.value = false
    toast.add({
      title: `${project.name} was deleted`,
      icon: 'i-pixelarticons-trash',
      color: 'red'
    })
    resetAndClose()
  }
})

const submit = () => {
  isSubmitting.value = true
  if (popupData.value) {
    _delete.mutate({ workspaceId: popupData.value.workspaceId, projectId: popupData.value.id })
  }
}

const deleteFormSchema = computed(() => {
  return z.object({
    name: z.string().refine(value => value === popupData.value?.name, {
      message: 'Please enter the name of the project.'
    })
  })
})

const deleteFormData = reactive({
  name: ''
})

const resetAndClose = () => {
  deleteFormData.name = ''
  projectDelete.close()
}
</script>

<template>
  <div>
    <TheModal
      title="Are you sure you want to delete this?"
      :is-open="!!popupData"
      :is-loading="!popupData"
      bg="bg-red-600 dark:bg-red-800"
      @close="resetAndClose"
    >
      <div v-if="popupData" class="flex flex-col gap-4">
        <UForm :schema="deleteFormSchema" :state="deleteFormData" class="space-y-4" @submit="submit">
          <UFormGroup label="To confirm please enter the project name below:" name="name">
            <UInput v-model="deleteFormData.name" :placeholder="popupData.name" class="pt-1" autocomplete="off" />
          </UFormGroup>
          <UButton
            color="red"
            variant="outline"
            label="Delete my project"
            block
            :loading="isSubmitting"
            type="submit"
          />
        </UForm>
      </div>
    </TheModal>
  </div>
</template>
