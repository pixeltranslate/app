<script setup lang="ts">
const { username } = useUser()
const { workspaceCreateOrEdit } = useGlobalOpeners()

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
      <div class="flex flex-col">
        <ProjectsRecentListCard
          title="Frostbite"
          platform="unity"
        />
        <ProjectsRecentListCard
          title="MyAnimeApp"
          platform="node"
        />
        <ProjectsRecentListCard
          title="PixelTranslate"
          platform="node"
        />
        <ProjectsRecentListCard
          title="Primarin"
          platform="java"
        />
        <ProjectsRecentListCard
          title="Primarin website"
          platform="node"
        />
        <ProjectsRecentListCard
          title="Backrooms: Survive the complex"
          platform="unity"
        />
        <ProjectsRecentListCard
          title="Test Unreal project"
          platform="unreal"
        />
      </div>
    </div>
  </TheLayout>
</template>
