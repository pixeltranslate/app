<script setup lang="ts">
const selectedLanguages = ref(['EN', 'DE', 'RU', 'BE', 'NL'])
const options = ref(['EN', 'DE', 'RU', 'BE', 'NL', 'HD', 'BO'])
</script>

<template>
  <TheLayout title="Collection Test">
    <template #actions>
      <USelectMenu v-model="selectedLanguages" :options="options" multiple placeholder="Select Languages" />
    </template>
    <CollectionTable :selected-languages="selectedLanguages" />
  </TheLayout>
</template>

<style>
::-webkit-resizer {
  display: none;
}
</style>
