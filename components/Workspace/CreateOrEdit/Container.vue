<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()
const { workspaces: workspaceQuery } = useQuery()

const { workspaceCreateOrEdit } = useGlobalOpeners()

const toast = useToast()

const mode = computed(() => workspaceCreateOrEdit.data.value?.mode)
const id = computed(() => workspaceCreateOrEdit.data.value?.data?.id)
const { data, isLoading } = workspaceQuery.byId(id)

const title = computed(() => {
  if (mode.value === 'create') {
    return 'Creating new workspace'
  }
  return `Editing ${data.value?.name}`
})

const isSubmitting = ref(false)

const closePage = () => {
  queryClient.invalidateQueries({ queryKey: ['workspaces'] })
  isSubmitting.value = false
  workspaceCreateOrEdit.close()
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

const submit = (data: { name: string }) => {
  isSubmitting.value = true
  if (mode.value === 'create') {
    create.mutate(data)
  } else {
    isSubmitting.value = false
    toast.add({ title: 'This does not work yet.' })
  }
}
</script>

<template>
  <div>
    <TheSlideover
      :title="title"
      :description="mode === 'create' ? 'Get started by filling in the information below to create your new workspace.' : undefined"
      :is-open="!!workspaceCreateOrEdit.data.value"
      @close="workspaceCreateOrEdit.close"
    >
      <WorkspaceCreateOrEditForm v-if="!isLoading" :is-loading="isSubmitting" @submit="submit" />
      <TheLoader v-else />
    </TheSlideover>
  </div>
</template>
