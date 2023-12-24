<script lang="ts" setup>
const { status, data } = useAuth()
const { openTestDrawer } = useGlobalOpeners()
</script>

<template>
  <div>
    <UCard :ui="{ rounded: 'rounded' }">
      <template #header>
        <div class="flex items-center justify-between">
          status: {{ status }}
          <UButton v-if="data" label="Say Hi!" @click="openTestDrawer.open({ name: data.user?.name || 'User' })" />
        </div>
      </template>

      <pre v-if="data" wrap class="bg-black p-2 text-white rounded mt-2 text-left">
          {{ JSON.stringify(data, null, 2) }}
        </pre>
    </UCard>
  </div>
</template>
