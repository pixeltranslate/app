<script lang="ts" setup>
const router = useRouter()
const { isExpanded, getRouteToView, getHomeSidebar, getWorkspaceSidebar, getWorkSpaces } = useSidebar()

const homeSidebar = getHomeSidebar()
const workspaceSidebar = getWorkspaceSidebar('Prismarin')
const currentView = ref(getRouteToView(router.currentRoute.value.path) || 'home')
watch(router.currentRoute, () => {
  currentView.value = getRouteToView(router.currentRoute.value.path)
})

const sidebar = computed(() => {
  if (currentView.value === 'workspace') {
    return workspaceSidebar
  }
  return homeSidebar
})
</script>

<template>
  <div class="h-full md:py-3">
    <div class="fixed md:static z-10 flex flex-col justify-between h-full bg-blue-900 rounded-r-lg shadow py-2 w-full md:w-72" :class="isExpanded ? 'block': 'hidden'">
      <div>
        <div v-if="sidebar.workspace.display" class="flex rounded items-center py-1.5 mx-2 gap-3">
          <UAvatar
            text="P"
            size="md"
            :ui="{ background: '!bg-primary-dark' }"
          />
          <div>
            <p class="text-gray-200">
              {{ sidebar.workspace.selectedWorkspace || 'Unknown' }}
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

        <UDivider v-if="sidebar.workspace.display" :ui="{ wrapper: { base: 'my-3 px-2' }, border: { base : '!border-primary-dark/40' } }" />

        <div class="overflow-hidden">
          <NavigationMenu
            v-auto-animate
            :items="sidebar.links"
          />
        </div>

        <div class="my-3 px-2 flex items-center gap-1">
          <p class="text-sm text-primary pl-2">
            Workspaces
          </p>
          <UDivider
            :ui="{ wrapper: { base: 'my-3 px-2' }, border: { base : '!border-primary-dark/40' } }"
          />
        </div>

        <NavigationMenu
          :items="getWorkSpaces()"
        />
      </div>
    </div>
  </div>
</template>
