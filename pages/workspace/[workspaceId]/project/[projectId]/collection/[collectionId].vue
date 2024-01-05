<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const { $trpc } = useNuxtApp()
const toast = useToast()
const queryClient = useQueryClient()
const { workspaceId, projectId, collectionId } = usePage()
const { selectedLanguages, languageOptions, data } = useCollectionTable()

const { collections } = useQuery()
const { data: collectionData, isLoading } = collections.byId({ workspaceId, projectId, id: collectionId })
const isSubmitting = ref(false)

const _save = useMutation({
  mutationFn: $trpc.collectionRouter.updateEntries.mutate,
  onError: () => {
    isSubmitting.value = false
    toast.add({
      title: 'The collection could not be updated'
    })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['collections', workspaceId, projectId, collectionId] })
    isSubmitting.value = false
    toast.add({
      title: 'Updated the translations in collection'
    })
  }
})

const save = () => {
  isSubmitting.value = true
  _save.mutate({
    workspaceId,
    projectId,
    id: collectionId,
    data: data.value
  })
}

</script>

<template>
  <TheLayout
    :title="!isLoading ? `Collection table: ${collectionData?.name}` : undefined"
    :is-loading="isLoading"
  >
    <template #actions>
      <div class="flex items-center gap-2">
        <UButton
          label="Save changes"
          icon="i-heroicons-cloud-arrow-up"
          color="primary"
          :loading="isSubmitting"
          @click="save"
        />
        <USelectMenu
          v-model="selectedLanguages"
          :options="languageOptions"
          :disabled="isSubmitting"
          multiple
          size="md"
          placeholder="Select Languages"
        >
          <template #label>
            <span v-if="selectedLanguages.length">
              {{ selectedLanguages.length }} languages selected
            </span>
            <span v-else>Select languages to edit</span>
          </template>
        </USelectMenu>
      </div>
    </template>
    <ClientOnly>
      <CollectionTable
        v-if="!isLoading && collectionData"
        :selected-languages="selectedLanguages"
        :entries="collectionData.entries"
      />
      <TheLoader v-else />
    </ClientOnly>
  </TheLayout>
</template>

<style>
::-webkit-resizer {
  display: none;
}
</style>
