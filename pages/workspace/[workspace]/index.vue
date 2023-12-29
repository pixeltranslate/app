<script lang="ts" setup>
const { workspaces: workspaceQuery } = useQuery()

const { workspaceId } = usePage()
const { data: workspace, isLoading: isWorkspaceLoading } = workspaceQuery.byId(workspaceId)
</script>

<template>
  <TheLayout title="Projects:">
    <template #actions>
      <UButton
        icon="i-heroicons-plus"
        label="New workspace"
        size="md"
        color="white"
        variant="solid"
      />
    </template>
    {{ workspaceId }}
    <TheContentPlaceholder
      label="You do not have any projects yet!"
      description="Create your first one now"
    >
      <UButton
        label="Learn more"
        size="md"
        color="white"
        variant="solid"
      />
    </TheContentPlaceholder>
  </TheLayout>
</template>
