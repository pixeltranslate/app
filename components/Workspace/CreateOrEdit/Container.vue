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
  <TheSlideover
    :title="title"
    :is-open="!!openWorkspaceCreditOrPageDrawer.data.value"
    @close="openWorkspaceCreditOrPageDrawer.close"
  >
    test
  </TheSlideover>
</template>
