<script setup lang="ts">
const { username } = useUser()
const { workspaceCreateOrEdit } = useGlobalOpeners()
const { projects } = useQuery()

const { data: recentProjects, isLoading: areRecentProjectsLoading } = projects.recent()

const actions = [
  {
    title: 'Workspace overview',
    href: '/workspaces',
    icon: 'octicon:file-directory-symlink-16',
    iconForeground: 'text-teal-700 dark:text-teal-50',
    iconBackground: 'bg-teal-50 dark:bg-teal-700'
  },
  {
    title: 'Create a new workspace',
    icon: 'octicon:duplicate-16',
    click: () => workspaceCreateOrEdit.open({ mode: 'create' }),
    iconForeground: 'text-sky-700 dark:text-sky-50',
    iconBackground: 'bg-sky-50 dark:bg-sky-700'
  },
  {
    title: 'Find the correct integration',
    icon: 'bxl:unity',
    iconForeground: 'text-purple-700 dark:text-purple-50',
    iconBackground: 'bg-purple-50 dark:bg-purple-700'
  },
  {
    title: 'Read our docs',
    icon: 'mdi:language',
    iconForeground: 'text-yellow-700 dark:text-yellow-50',
    iconBackground: 'bg-yellow-50 dark:bg-yellow-700'
  }
]
</script>

<template>
  <TheLayout
    :title="`Hello ${username}!`"
    description="Welcome to your PixelTranslate dashboard!"
  >
    <div class="flex flex-col gap-3">
      <DashboardCards :actions="actions" />

      <h1 class="text-lg mt-4 text-gray-700 dark:text-gray-300">
        Recently updated:
      </h1>
      <TheLoader v-if="areRecentProjectsLoading && !recentProjects" />
      <div v-else-if="recentProjects && recentProjects.length > 0" class="flex flex-col">
        <ProjectsRecentListCard
          v-for="project in recentProjects"
          :key="project.id"
          :project="project"
        />
      </div>
      <TheContentPlaceholder v-else description="When you start working, your recent projects will show up here!" />
    </div>
  </TheLayout>
</template>
