<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { z } from 'zod'
const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()

const { workspaceDelete } = useGlobalOpeners()
const toast = useToast()

const popupData = computed(() => workspaceDelete.data.value)
const isSubmitting = ref(false)

const _delete = useMutation({
  mutationFn: $trpc.workspaceRouter.delete.mutate,
  onError: () => toast.add({ title: 'We could not delete the workspace' }),
  onSuccess: (workspace) => {
    queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    isSubmitting.value = false
    toast.add({
      title: `${workspace.name} was deleted`,
      icon: 'i-pixelarticons-trash',
      color: 'red'
    })
    resetAndClose()
  }
})

const submit = () => {
  isSubmitting.value = true
  if (popupData.value) {
    _delete.mutate(popupData.value.id)
  }
}

const deleteFormSchema = computed(() => {
  return z.object({
    name: z.string().refine(value => value === popupData.value?.name, {
      message: 'Please enter the name of the workspace.'
    })
  })
})

const deleteFormData = reactive({
  name: ''
})

const resetAndClose = () => {
  deleteFormData.name = ''
  workspaceDelete.close()
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
        <p class="text-sm text-gray-400 bg-zinc-500/20 p-2.5 rounded">
          This can be reverted in the next 24 hours. Afterwards the workspace, "{{ popupData.name }}" will be irreversibly deleted.
        </p>
        <UDivider />
        <UForm :schema="deleteFormSchema" :state="deleteFormData" class="space-y-4" @submit="submit">
          <UFormGroup label="To confirm please enter the workspace name below:" name="name">
            <UInput v-model="deleteFormData.name" :placeholder="popupData.name" class="pt-1" autocomplete="off" />
          </UFormGroup>
          <UButton
            color="red"
            variant="outline"
            label="Delete my workspace"
            block
            :loading="isSubmitting"
            type="submit"
          />
        </UForm>
      </div>
    </TheModal>
  </div>
</template>
