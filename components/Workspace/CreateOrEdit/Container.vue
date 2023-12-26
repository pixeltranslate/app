<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()

const { workspaceCreateOrEdit } = useGlobalOpeners()

const toast = useToast()

const mode = computed(() => workspaceCreateOrEdit.data.value?.mode)
const data = computed(() => workspaceCreateOrEdit.data.value?.data)

const title = computed(() => {
  if (mode.value === 'create') {
    return 'Creating new workspace'
  }
  return `Editing ${data.value?.name}`
})

const create = useMutation({
  mutationFn: $trpc.workspaceRouter.create.mutate,
  onError: () => toast.add({ title: 'Error happened :sad face:' }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    workspaceCreateOrEdit.close()
    toast.add({
      title: 'Created new workspace'
    })
  }
})
</script>

<template>
  <div>
    <TheSlideover
      :title="title"
      description="Get started by filling in the information below to create your new workspace."
      :is-open="!!workspaceCreateOrEdit.data.value"
      @close="workspaceCreateOrEdit.close"
    >
      <WorkspaceCreateOrEditForm v-if="workspaceCreateOrEdit.data" @submit="create.mutate" />
      <TheLoader v-else />
    </TheSlideover>
  </div>
</template>
