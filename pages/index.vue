<script lang="ts" setup>
const { status, data } = useAuth()
</script>

<template>
  <div>
    <UCard :ui="{ rounded: 'rounded' }">
      <template #header>
        status: {{ status }}
      </template>

      <pre v-if="data" wrap class="bg-black p-2 text-white rounded mt-2 text-left">
          {{ JSON.stringify(data, null, 2) }}
        </pre>
    </UCard>
  </div>
</template>
