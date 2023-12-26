<script lang="ts" setup>
const { workspaceCreateOrEdit } = useGlobalOpeners()
const { profile } = useQuery()
const { data } = profile.me()
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
        @click="workspaceCreateOrEdit.open({ mode: 'create' })"
      />
    </template>
    <pre>
      {{ data }}
    </pre>
    <TheContentPlaceholder
      label="You do not have any workspaces yet!"
      description="Create your first one now, or join another workspace!"
    >
      <UButton
        label="Create your first workspace"
        size="md"
        color="primary"
        variant="solid"
        @click="workspaceCreateOrEdit.open({ mode: 'create' })"
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
