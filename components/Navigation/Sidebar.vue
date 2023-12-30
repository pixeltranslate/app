<script lang="ts" setup>
import type { SidebarItem } from './SidebarItem.vue'
import getInitialsFromString from '~/helpers/getInitialsFromString'

const { workspaceId } = usePage()
const { isExpanded, data } = useSidebar()
const { username, avatar } = useUser()
const { workspaceCreateOrEdit, projectCreateOrEdit } = useGlobalOpeners()

const { workspaces: workspaceQuery, projects: projectQuery } = useQuery()
const { data: myWorkspaces, isLoading: areMyWorkspacesLoading } = workspaceQuery.all()
const { data: projects, isLoading: areProjectsLoading } = projectQuery.all(workspaceId)
const { data: selectedWorkspace, isLoading: isSelectedWorkspaceLoading } = workspaceQuery.byId(workspaceId)

const myProjectsSidebar = computed(() => {
  return projects.value?.map<SidebarItem>((p) => {
    return {
      label: p.name,
      href: `/workspace/${workspaceId}/project/${p.id}`,
      avatar: {
        text: p.name
      }
    }
  })
})

const myWorkspacesSidebar = computed(() => {
  return myWorkspaces.value?.map<SidebarItem>((w) => {
    return {
      label: w.name,
      href: `/workspace/${w.id}`,
      avatar: {
        text: w.name
      }
    }
  })
})
</script>

<template>
  <div class="h-full md:py-3 text-white">
    <div class="fixed md:static z-10 flex flex-col justify-between h-full bg-blue-500 dark:bg-blue-900 rounded-r-lg shadow py-2 w-full md:w-72" :class="isExpanded ? 'block': 'hidden'">
      <div>
        <div v-if="data.sections.includes('userInfo')">
          <div class="flex rounded items-center py-1.5 mx-3 gap-3">
            <UAvatar
              :src="avatar.src"
              :text="avatar.text"
              size="md"
              :ui="{ background: 'dark:bg-primary-dark' }"
            />
            <div>
              <p class="text-gray-200 capitalize">
                {{ username }}
              </p>
            </div>
          </div>
          <UDivider :ui="{ wrapper: { base: 'mt-3 px-2' }, border: { base : 'border-primary-light dark:border-primary-dark/40' } }" />
        </div>

        <div v-if="data.sections.includes('workspaceInfo')">
          <div v-if="selectedWorkspace && !isSelectedWorkspaceLoading" class="flex rounded items-center py-1.5 mx-3 gap-3">
            <UAvatar
              :text="getInitialsFromString(selectedWorkspace.name)"
              size="md"
              :ui="{ background: 'dark:bg-primary-dark' }"
            />
            <div>
              <p class="dark:text-gray-200 capitalize">
                {{ selectedWorkspace.name }}
              </p>
              <div class="flex items-center gap-1 text-xs text-gray-100 dark:text-gray-400">
                <p> Free </p>
                <p class="mx-1">
                  -
                </p>
                <div>
                  {{ Object.keys(selectedWorkspace.members).length }}
                  <Icon name="pixelarticons:users" />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="flex rounded bg-primary-light/50 dark:bg-primary-light/10 items-center p-2 mx-2 gap-3">
            <USkeleton class="h-10 w-10" :ui="{ rounded: 'rounded-full', background: '!bg-primary-light' }" />
            <div>
              <USkeleton class="h-4 w-[75px]" :ui="{ background: '!bg-primary-light' }" />
              <USkeleton class="h-3 w-[125px] mt-1" :ui="{ background: '!bg-primary-light' }" />
            </div>
          </div>
          <UDivider :ui="{ wrapper: { base: 'mt-3 px-2' }, border: { base : 'border-primary-light dark:border-primary-dark/40' } }" />
        </div>

        <div class="mt-3">
          <NavigationMenu
            v-auto-animate
            :items="data.links"
          />
        </div>

        <div v-if="data.sections.includes('projects')">
          <div class="my-3 px-2 flex items-center gap-1">
            <p class="text-sm dark:text-primary pl-2">
              Projects
            </p>
            <UDivider
              :ui="{ wrapper: { base: 'my-2 px-2' }, border: { base : 'border-primary-light dark:border-primary-dark/40' } }"
            />
          </div>

          <NavigationMenu
            v-if="!areProjectsLoading"
            :items="[...myProjectsSidebar, { label: 'Create new project', icon: 'i-heroicons-plus', click: () => projectCreateOrEdit.open({ mode: 'create', data: { workspaceId: selectedWorkspace?.id || '' } }) }]"
          />
          <div v-else class="flex flex-col gap-2">
            <div class="flex items-center space-x-2 bg-primary-light/50 dark:bg-primary-light/10 p-2 rounded mx-2 animate-pulse">
              <div>
                <USkeleton class="h-7 w-7 flex-1" :ui="{ rounded: 'rounded-full', background: '!bg-primary-light' }" />
              </div>
              <div class="space-y-2">
                <USkeleton class="h-3 w-[100px]" :ui="{ background: '!bg-primary-light' }" />
              </div>
            </div>
            <div class="flex items-center space-x-2 bg-primary-light/50 dark:bg-primary-light/10 p-2 rounded mx-2 animate-pulse">
              <div>
                <USkeleton class="h-7 w-7 flex-1" :ui="{ rounded: 'rounded-full', background: '!bg-primary-light' }" />
              </div>
              <div class="space-y-2">
                <USkeleton class="h-3 w-[100px]" :ui="{ background: '!bg-primary-light' }" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="data.sections.includes('workspaces')">
          <div class="my-3 px-2 flex items-center gap-1">
            <p class="text-sm dark:text-primary pl-2">
              Workspaces
            </p>
            <UDivider
              :ui="{ wrapper: { base: 'my-2 px-2' }, border: { base : 'border-primary-light dark:border-primary-dark/40' } }"
            />
          </div>

          <NavigationMenu
            v-if="!areMyWorkspacesLoading"
            :items="[...myWorkspacesSidebar, { label: 'Create new workspace', icon: 'i-heroicons-plus', click: () => workspaceCreateOrEdit.open({ mode: 'create' }) }]"
          />
          <div v-else class="flex flex-col gap-2">
            <div class="flex items-center space-x-2 bg-primary-light/50 dark:bg-primary-light/10 p-2 rounded mx-2 animate-pulse">
              <div>
                <USkeleton class="h-7 w-7 flex-1" :ui="{ rounded: 'rounded-full', background: '!bg-primary-light' }" />
              </div>
              <div class="space-y-2">
                <USkeleton class="h-3 w-[100px]" :ui="{ background: '!bg-primary-light' }" />
              </div>
            </div>
            <div class="flex items-center space-x-2 bg-primary-light/50 dark:bg-primary-light/10 p-2 rounded mx-2 animate-pulse">
              <div>
                <USkeleton class="h-7 w-7 flex-1" :ui="{ rounded: 'rounded-full', background: '!bg-primary-light' }" />
              </div>
              <div class="space-y-2">
                <USkeleton class="h-3 w-[100px]" :ui="{ background: '!bg-primary-light' }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
