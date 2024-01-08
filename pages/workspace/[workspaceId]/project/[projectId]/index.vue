<script setup lang="ts">
const { project, workspaceId, projectId } = usePage()
const { projectCreateOrEdit } = useGlobalOpeners()

const actions = [
  {
    title: 'Add your first collection',
    href: `/workspace/${workspaceId}/project/${projectId}/collection`,
    icon: 'octicon:file-directory-symlink-16',
    iconForeground: 'text-teal-700 dark:text-teal-50',
    iconBackground: 'bg-teal-50 dark:bg-teal-700'
  },
  {
    title: 'Setup your Unity project',
    href: '#',
    icon: 'bxl:unity',
    iconForeground: 'text-purple-700 dark:text-purple-50',
    iconBackground: 'bg-purple-50 dark:bg-purple-700'
  },
  {
    title: 'Add a team member',
    href: '#',
    icon: 'octicon:people-24',
    iconForeground: 'text-sky-700 dark:text-sky-50',
    iconBackground: 'bg-sky-50 dark:bg-sky-700'
  },
  {
    title: 'Add another language',
    href: '#',
    icon: 'mdi:language',
    iconForeground: 'text-yellow-700 dark:text-yellow-50',
    iconBackground: 'bg-yellow-50 dark:bg-yellow-700'
  }
]
</script>

<template>
  <TheLayout
    :title="`Welcome to ${project.data.value?.name}`"
    :description="project.data.value?.description"
    :is-loading="project.isLoading.value || !project.data.value"
  >
    <template #actions>
      <UButton
        v-if="project.data.value && workspaceId"
        icon="i-pixelarticons-sliders"
        label="Project settings"
        size="md"
        color="white"
        variant="solid"
        @click="projectCreateOrEdit.open({ mode: 'update', data: { workspaceId: workspaceId, ...project.data.value } })"
      />
    </template>

    <DashboardCards :actions="actions" />

    <div class="grid xl:grid-cols-6 gap-3 mt-3">
      <div class="xl:col-span-4">
        <TheContentPlaceholder
          label="No integrations added yet"
          description="Integrations allow you to sync your translations in your code editors."
        />
      </div>
      <div class="xl:col-span-2">
        <TheContentPlaceholder
          label="No project members yet."
          description="Add you first teammate soon!"
        />
      </div>
    </div>
  </TheLayout>
</template>
