<script setup lang="ts">
const { selectedLanguages, languageOptions } = useCollectionTable()
</script>

<template>
  <TheLayout title="Collection Test">
    <template #actions>
      <div class="flex items-center gap-2">
        <UButton
          label="Save changes"
          icon="i-heroicons-cloud-arrow-up"
          color="primary"
        />
        <USelectMenu
          v-model="selectedLanguages"
          :options="languageOptions"
          multiple
          size="md"
          placeholder="Select Languages"
        >
          <template #label>
            <span v-if="selectedLanguages.length">
              {{ selectedLanguages.length }} languages selected
            </span>
            <span v-else>Select languages to edit</span>
          </template>
        </USelectMenu>
      </div>
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
