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
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="workspace in workspaces" :key="workspace.id" class="col-span-1 rounded-lg bg-foreground shadow">
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="truncate text-lg font-medium">
                  {{ workspace.name }}
                </h3>
              </div>
              <p class="truncate text-sm text-gray-500">
                {{ workspace.id }}
              </p>
            </div>
            <UAvatar size="md" :text="workspace.name[0].toLocaleUpperCase()" :ui="{ background: '!bg-secondary' }" />
          </div>
          <div>
            <div class="-mt-px grid grid-cols-2 border-t border-background">
              <UButton
                label="View"
                color="primary"
                variant="soft"
                size="md"
                block
                :ui="{ rounded: 'rounded-none rounded-bl-lg' }"
              />
              <UButton
                label="Delete"
                variant="ghost"
                size="md"
                block
                :ui="{ rounded: 'rounded-none rounded-br-lg' }"
              />
            </div>
          </div>
        </li>
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
