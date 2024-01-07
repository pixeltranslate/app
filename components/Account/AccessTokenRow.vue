<script lang="ts" setup>
import type { Token } from '~/types'

defineProps<{ token: Token }>()
defineEmits<{(e: 'revoke', payload: { id: string }): void}>()
</script>

<template>
  <div class="flex items-center gap-3 hover:bg-gray-200/40 dark:hover:bg-foreground/30 px-3 py-4 border-t dark:border-border">
    <div class="grow flex flex-col gap-1">
      <div class="flex items-center space-x-2">
        <UBadge size="xs" color="green">
          Active
        </UBadge>
        <h1 class="text-gray-700 dark:text-gray-200">
          {{ token.name }}
        </h1>
      </div>
      <div class="flex items-center text-xs text-gray-500 gap-1">
        <p class="text-xs text-gray-500">
          Created: {{ token.createdAt.toDateString() }}
        </p>
        <p> • </p>
        <p class="text-xs text-gray-500">
          Expires: never
        </p>
      </div>
    </div>
    <UButton
      color="red"
      icon="i-heroicons-shield-exclamation-solid"
      label="Revoke access"
      @click="$emit('revoke', { id: token.id })"
    />
  </div>
</template>
