<script lang="ts" setup>
const { openTestDrawer } = useGlobalOpeners()
</script>

<template>
  <TheLayout title="My Workspaces:">
    <template #actions>
      <UButton
        icon="i-heroicons-plus"
        label="New workspace"
        size="md"
        color="white"
        square
        variant="solid"
        @click="openTestDrawer.open({ name: 'Create new workspace' })"
      />
    </template>

    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li class="col-span-1 divide-y divide-border rounded-lg bg-foreground shadow">
        <div class="flex w-full items-center justify-between space-x-6 p-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="truncate text-sm">
                Prismarin
              </h3>
            </div>
            <p class="mt-1 truncate text-sm text-zinc-500">
              Free workspace
            </p>
          </div>
          <UAvatarGroup size="sm" :max="3">
            <UAvatar
              src="https://github.com/zoey-kaiser.png"
              alt="zoey-kaiser"
            />
            <UAvatar
              src="https://github.com/reapermaga.png"
              alt="reapermaga"
            />
            <UAvatar
              src="https://github.com/levenour.png"
              alt="leVeanour"
            />
            <UAvatar
              src="https://github.com/levenour.png"
              alt="leVeanour"
            />
            <UAvatar
              src="https://github.com/levenour.png"
              alt="leVeanour"
            />
          </UAvatarGroup>
        </div>
        <div class="w-full">
          <UButtonGroup size="lg" orientation="horizontal" :ui="{ wrapper: { horizontal: 'grid grid-cols-2 w-full' } }">
            <UButton
              label="View"
              class="rounded-t-none"
              variant="ghost"
              color="white"
              block
              :ui="{ base: 'border-r border-border' }"
            />
            <UButton
              label="Edit"
              class="rounded-t-none"
              variant="ghost"
              color="white"
              block
              :ui="{ base: 'border-l border-border' }"
              @click="openTestDrawer.open({ name: 'Edit Prismarin' })"
            />
          </UButtonGroup>
        </div>
      </li>
    </ul>
  </TheLayout>
</template>
