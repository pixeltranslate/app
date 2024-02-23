<script lang="ts" setup>
const { workspace } = usePage()

const columns = [{ key: 'name', label: 'Name' }, { key: 'email', label: 'E-Mail' }, { key: 'role', label: 'Role' }, { key: 'actions', class: 'max-w-min' }]

const people = [{
  name: 'Lindsay Walton',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}]
</script>

<template>
  <TheLayout
    :title="workspace.data.value?.name"
    description="Members managment"
    :is-loading="workspace.isLoading.value"
  >
    <template #actions>
      <UButton
        icon="i-heroicons-plus"
        label="New project"
        size="md"
        color="white"
        variant="solid"
      />
    </template>

    <UCard :ui="{ body: { padding: 'px-4 py-5 sm:p-3'} }">
      <UTable :columns="columns" :rows="people" class="min-h-[500px]">
        <template #name-data="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar />
            <span>
              {{ row.name }}
            </span>
          </div>
        </template>

        <template #role-data="{ row }">
          <USelectMenu :value="row.role" :options="['read', 'write', 'admin']" />
        </template>

        <template #actions-data>
          <UButton label="Remove" color="gray" />
        </template>
      </UTable>
    </UCard>
  </TheLayout>
</template>
