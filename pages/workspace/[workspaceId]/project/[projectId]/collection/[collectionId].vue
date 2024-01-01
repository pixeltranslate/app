<script setup lang="ts">
const { selectedLanguages, languageOptions } = useCollectionTable()
</script>

<template>
  <TheLayout title="Collection Test">
    <template #actions>
      <USelectMenu v-model="selectedLanguages" :options="languageOptions" multiple placeholder="Select Languages" />
    </template>
    <ClientOnly>
      <CollectionTable :selected-languages="selectedLanguages" />
    </ClientOnly>
  </TheLayout>
</template>

<style>
::-webkit-resizer {
  display: none;
}
</style>
