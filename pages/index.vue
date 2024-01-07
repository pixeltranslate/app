<script setup lang="ts">
const { username } = useUser()

const actions = [
  {
    title: 'Create a new workspace',
    href: '',
    icon: 'octicon:file-directory-symlink-16',
    iconForeground: 'text-teal-700 dark:text-teal-50',
    iconBackground: 'bg-teal-50 dark:bg-teal-700'
  },
  {
    title: 'Find the correct integration',
    href: '#',
    icon: 'bxl:unity',
    iconForeground: 'text-purple-700 dark:text-purple-50',
    iconBackground: 'bg-purple-50 dark:bg-purple-700'
  },
  {
    title: 'Connection with team members',
    href: '#',
    icon: 'octicon:people-24',
    iconForeground: 'text-sky-700 dark:text-sky-50',
    iconBackground: 'bg-sky-50 dark:bg-sky-700'
  },
  {
    title: 'Read our docs on how to translate correctly!',
    href: '#',
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
      <div class="divide-y divide-gray-200 dark:divide-border overflow-hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-px sm:divide-y-0">
        <UButton
          v-for="action in actions"
          :key="action.title"
          :padded="false"
          :to="action.href"
          variant="ghost"
          class="w-full"
        >
          <div class="group relative bg-white dark:bg-foreground p-5 hover:ring-2 hover:ring-inset hover:ring-primary/50 text-left">
            <div>
              <span :class="[action.iconBackground, action.iconForeground, 'inline-flex rounded-lg p-3 ring-0']">
                <Icon :name="action.icon" size="20px" />
              </span>
            </div>
            <div class="mt-4">
              <h3 class="leading-6 text-gray-900 dark:text-gray-200 text-sm">
                {{ action.title }}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 text-xs">
                Doloribus dolores nostrum quia qui natus officia quod et dolorem.
              </p>
            </div>
            <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400 group-hover:text-gray-100" aria-hidden="true">
              <Icon name="ph:arrow-up-right-bold" size="24px" />
            </span>
          </div>
        </UButton>
      </div>

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
