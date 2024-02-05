<script lang="ts" setup>
const { workspace } = usePage()
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

    <div>
      Test
    </div>
  </TheLayout>
</template>
