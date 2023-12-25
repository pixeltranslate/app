<script lang="ts" setup>
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

const submit = (data: { name: string }) => {
  workspaceCreateOrEdit.close()
  toast.add({
    title: `Created new workspace "${data.name}""`
  })
}
</script>

<template>
  <div>
    <TheSlideover
      :title="title"
      :is-open="!!workspaceCreateOrEdit.data.value"
      @close="workspaceCreateOrEdit.close"
    >
      <WorkspaceCreateOrEditForm v-if="workspaceCreateOrEdit.data" @submit="submit" />
      <TheLoader v-else />
    </TheSlideover>
  </div>
</template>
