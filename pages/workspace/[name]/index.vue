<script lang="ts" setup>
const { openWorkspaceCreditOrPageDrawer } = useGlobalOpeners()
</script>

<template>
  <TheLayout title="My Workspaces:">
    <template #actions>
      <UButton
        icon="i-heroicons-plus"
        label="New workspace"
        size="md"
        color="white"
        variant="solid"
        @click="openWorkspaceCreditOrPageDrawer.open({ mode: 'create' })"
      />
    </template>
    <TheContentPlaceholder
      label="You do not have any workspaces yet!"
      description="Create your first one now, or join another workspace!"
    >
      <UButton
        label="Create your first workspace"
        size="md"
        color="primary"
        variant="solid"
        @click="openWorkspaceCreditOrPageDrawer.open({ mode: 'create' })"
      />
      <UButton
        label="Learn more"
        size="md"
        color="white"
        variant="solid"
      />
    </TheContentPlaceholder>
  </TheLayout>
</template>
