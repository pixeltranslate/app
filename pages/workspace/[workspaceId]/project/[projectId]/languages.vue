<script lang="ts" setup>
const { languageCreateOrEdit } = useGlobalOpeners()
</script>

<template>
  <TheLayout title="Languages">
    <template #actions>
      <UButton @click="languageCreateOrEdit.open({ test: 'test' })">
        Add a new language
      </UButton>
    </template>
    <UCard :ui="{ body: { padding: '!p-2' } }">
      <UTable
        :columns="[]"
        :rows="[]"
        :ui="{ td: { padding: 'py-2' } }"
      />
    </UCard>
  </TheLayout>
</template>
