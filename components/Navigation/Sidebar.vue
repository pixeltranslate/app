<script lang="ts" setup>
import type { SidebarItem } from './SidebarItem.vue'

const router = useRouter()
const { isExpanded, getRouteToView, getHomeSidebar } = useSidebar()

const { workspaces: workspaceQuery } = useQuery()
const { data: myWorkspaces, isLoading: areMyWorkspacesLoading } = workspaceQuery.all()

const myWorkspacesSidebar = computed(() => {
  return myWorkspaces.value?.map<SidebarItem>((w) => {
    return {
      label: w.name,
      avatar: {
        text: w.name
      }
    }
  })
})

const homeSidebar = getHomeSidebar()

const currentView = ref(getRouteToView(router.currentRoute.value.path) || 'home')

watch(router.currentRoute, () => {
  currentView.value = getRouteToView(router.currentRoute.value.path)
})

</script>

<template>
  <div class="h-full md:py-3">
    <div class="fixed md:static z-10 flex flex-col justify-between h-full bg-blue-900 rounded-r-lg shadow py-2 w-full md:w-72" :class="isExpanded ? 'block': 'hidden'">
      <div>
        <div class="flex rounded items-center py-1.5 mx-2 gap-3">
          <UAvatar
            text="A"
            size="md"
            :ui="{ background: '!bg-primary-dark' }"
          />
          <div>
            <p class="text-gray-200 capitalize">
              Averix
            </p>
            <div class="flex items-center gap-1 text-xs text-gray-400">
              <p> Free </p>
              <p class="mx-1">
                -
              </p>
              <div>
                5
                <Icon name="pixelarticons:users" />
              </div>
            </div>
          </div>
        </div>

        <UDivider :ui="{ wrapper: { base: 'my-3 px-2' }, border: { base : '!border-primary-dark/40' } }" />

        <div class="overflow-hidden">
          <NavigationMenu
            v-auto-animate
            :items="homeSidebar.links"
          />
        </div>

        <div class="my-3 px-2 flex items-center gap-1">
          <p class="text-sm text-primary pl-2">
            Workspaces
          </p>
          <UDivider
            :ui="{ wrapper: { base: 'my-2 px-2' }, border: { base : '!border-primary-dark/40' } }"
          />
        </div>

        <NavigationMenu
          v-if="!areMyWorkspacesLoading"
          :items="[...myWorkspacesSidebar, { label: 'Create new workspace', icon: 'i-heroicons-plus' }]"
        />
        <div v-else class="flex flex-col gap-2">
          <div class="flex items-center space-x-2 bg-primary-light/10 p-2 rounded mx-2 animate-pulse">
            <div>
              <USkeleton class="h-7 w-7 flex-1" :ui="{ rounded: 'rounded-full', background: '!bg-primary-light' }" />
            </div>
            <div class="space-y-2">
              <USkeleton class="h-3 w-[100px]" :ui="{ background: '!bg-primary-light' }" />
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-primary-light/10 p-2 rounded mx-2 animate-pulse">
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
</template>
