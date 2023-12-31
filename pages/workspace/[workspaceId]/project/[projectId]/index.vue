<script setup lang="ts">
const { project, workspaceId } = usePage()
const { projectCreateOrEdit } = useGlobalOpeners()
</script>

<template>
  <TheLayout
    title="Project dashboard"
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
    <TheContentPlaceholder
      :label="`Setup your project in ${project.data.value?.platform} now!`"
      description="Docs are coming soon"
    >
      <UButton
        label="Change project integration"
        size="md"
        color="primary"
        variant="solid"
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
