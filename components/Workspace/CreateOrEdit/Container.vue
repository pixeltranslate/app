<script lang="ts" setup>
const { openWorkspaceCreditOrPageDrawer } = useGlobalOpeners()

const mode = computed(() => openWorkspaceCreditOrPageDrawer.data.value?.mode)
const data = computed(() => openWorkspaceCreditOrPageDrawer.data.value?.data)

const title = computed(() => {
  if (mode.value === 'create') {
    return 'Creating new workspace'
  }
  return `Editing ${data.value?.name}`
})
</script>

<template>
  <div>
    <TheSlideover
      :title="title"
      :is-open="!!openWorkspaceCreditOrPageDrawer.data.value"
      @close="openWorkspaceCreditOrPageDrawer.close"
    >
      <WorkspaceCreateOrEditForm v-if="data?.name" />
      <TheLoader v-else />
    </TheSlideover>
  </div>
</template>
