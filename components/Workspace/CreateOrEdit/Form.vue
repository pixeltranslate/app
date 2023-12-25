<script setup lang="ts">
const { makeRule } = useFormErrorMessages()

const state = reactive({
  name: undefined
})

const rules = {
  name: makeRule(['required'], 'name')
}
</script>

<template>
  <div>
    <TheForm :state="state" :model="state" :rules="rules">
      <UFormGroup label="Workspace name:" name="name">
        <UInput v-model="state.name" size="md" />
      </UFormGroup>
      <UButton type="submit" class="mt-3" size="md">
        Create workspace
      </UButton>
    </TheForm>
  </div>
</template>
