<script lang="ts" setup>
const { projects: projectQuery } = useQuery()
const { projectCreateOrEdit } = useGlobalOpeners()

const { workspaceId } = usePage()
const { data: projects, isLoading: areProjectsLoading } = projectQuery.all(workspaceId)
</script>

<template>
  <TheLayout title="Projects:" :is-loading="areProjectsLoading || !workspaceId">
    <template #actions>
      <UButton
        icon="i-heroicons-plus"
        label="New project"
        size="md"
        color="white"
        variant="solid"
        @click="projectCreateOrEdit.open({ mode: 'create', data: { workspaceId: workspaceId || '' } })"
      />
    </template>
    <div v-if="projects && workspaceId && projects.length !== 0">
      <ul role="list" class="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <ProjectsListCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          :workspace-id="workspaceId"
        />
      </ul>
    </div>
    <TheContentPlaceholder
      v-else
      label="You do not have any projects yet!"
      description="Projects are amazing, just like Maga!"
    >
      <UButton
        label="Create your first project"
        size="md"
        color="secondary"
        variant="solid"
        @click="projectCreateOrEdit.open({ mode: 'create', data: { workspaceId: workspaceId || '' } })"
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
