<script lang="ts" setup>
const { workspaceCreateOrEdit } = useGlobalOpeners()
const { workspaces: workspacesQuery } = useQuery()
const { data: workspaces, isLoading: areWorkspacesLoading, error: workspaceError } = workspacesQuery.all()
</script>

<template>
  <TheLayout title="My Workspaces:" :is-loading="areWorkspacesLoading" :error="workspaceError">
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
    <div v-if="workspaces && workspaces.length !== 0">
      <ul role="list" class="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <WorkspaceGridCard v-for="workspace in workspaces" :key="workspace.id" :workspace="workspace" />
      </ul>
    </div>
    <TheContentPlaceholder
      v-else
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
