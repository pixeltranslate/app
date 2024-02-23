<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { CreateOrUpdateCollection } from '~/types'
import { createOrUpdateCollectionSchema } from '~/server/schemas'

const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()
const { collectionCreateOrEdit: { data: popupData, close: closePopup } } = useGlobalOpeners()

const toast = useToast()
const isSubmitting = ref(false)
const mode = computed(() => popupData?.value?.mode)

const title = computed(() => {
  if (popupData.value?.mode === 'update') {
    return `Editing collection: ${popupData.value.data.name}`
  }
  return 'Creating new collection'
})

const payload = computed((): CreateOrUpdateCollection | undefined => {
  if (!popupData.value) {
    return undefined
  }

  if (popupData.value.mode === 'update') {
    return popupData.value
  }

  return {
    mode: 'create',
    data: {
      name: '',
      workspaceId: popupData.value.data.workspaceId,
      projectId: popupData.value.data.projectId
    }
  }
})
const { cloned } = useMightyClone(payload)

const create = useMutation({
  mutationFn: $trpc.collectionRouter.create.mutate,
  onError: () => {
    isSubmitting.value = false
    toast.add({
      title: 'The collection could not be created'
    })
  },
  onSuccess: async (collection) => {
    await queryClient.invalidateQueries({ queryKey: ['collections', payload.value?.data.workspaceId, payload.value?.data.projectId] })
    isSubmitting.value = false
    toast.add({
      title: `Created new  collection: ${collection.name}`
    })
    closePopup()
  }
})

const update = useMutation({
  mutationFn: $trpc.collectionRouter.update.mutate,
  onError: () => {
    isSubmitting.value = false
    toast.add({
      title: 'The collection could not be updated'
    })
  },
  onSuccess: async (collection) => {
    await queryClient.invalidateQueries({ queryKey: ['collections', payload.value?.data.workspaceId, payload.value?.data.projectId] })
    isSubmitting.value = false
    toast.add({
      title: `Updated collection: ${collection.name}`
    })
    closePopup()
  }
})

const submit = (payload?: CreateOrUpdateCollection) => {
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
  <TheSlideover
    :is-open="!!popupData"
    :title="title"
    bg="bg-purple-500 dark:bg-purple-700"
    :is-loading="!mode || !cloned"
    @close="closePopup"
  >
    <UForm v-if="cloned" :state="cloned" :schema="createOrUpdateCollectionSchema" @submit="() => submit(cloned)">
      <UFormGroup label="Name:" name="name" required>
        <UInput v-model="cloned.data.name" color="gray" placeholder="My amazing collection" />
      </UFormGroup>
      <div class="flex items-center gap-2 justify-end">
        <UButton type="submit" color="primary" class="mt-3" size="md" :loading="isSubmitting">
          {{ cloned.mode === 'create' ? 'Create' : 'Save' }} collection
        </UButton>
        <UButton class="mt-3" size="md" :disabled="isSubmitting">
          Cancel
        </UButton>
      </div>
    </UForm>
  </TheSlideover>
</template>
