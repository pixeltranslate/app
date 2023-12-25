<script lang='ts' setup>
const { openTestDrawer } = useGlobalOpeners()
</script>

<template>
  <div>
    <USlideover v-model="openTestDrawer.isOpen.value" :ui="{ width: 'w-screen max-w-5xl', wrapper: 'py-2', background: 'rounded-l shadow border-l-2 border-primary-dark' }">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ openTestDrawer.data.value?.name }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="openTestDrawer.close()" />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
