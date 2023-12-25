<script lang="ts" setup>
const { openWorkspaceCreditOrPageDrawer } = useGlobalOpeners()

const toast = useToast()

const mode = computed(() => openWorkspaceCreditOrPageDrawer.data.value?.mode)
const data = computed(() => openWorkspaceCreditOrPageDrawer.data.value?.data)

const title = computed(() => {
  if (mode.value === 'create') {
    return 'Creating new workspace'
  }
  return `Editing ${data.value?.name}`
})

const submit = (data: { name: string }) => {
  openWorkspaceCreditOrPageDrawer.close()
  toast.add({
    title: `Created new workspace "${data.name}""`
  })
}
</script>

<template>
  <div>
    <TheSlideover
      :title="title"
      :is-open="!!openWorkspaceCreditOrPageDrawer.data.value"
      @close="openWorkspaceCreditOrPageDrawer.close"
    >
      <WorkspaceCreateOrEditForm v-if="openWorkspaceCreditOrPageDrawer.data" @submit="submit" />
      <TheLoader v-else />
    </TheSlideover>
  </div>
</template>
