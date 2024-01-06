<template>
  <TheLayout
    title="Personal Access tokens"
  >
    <template #actions>
      <UButton icon="i-heroicons-key" size="lg">
        New personal access token
      </UButton>
    </template>

    <UAlert
      icon="i-heroicons-exclamation-circle"
      color="red"
      variant="outline"
      title="Heads up!"
      description="Do not share your personal access token with anyone. No one at Pixeltranslate will ever ask you to share a personal access token."
    />

    <div class="mt-4 grid grid-cols-4 gap-2">
      <div class="flex flex-col gap-0">
        <div class="flex items-center gap-2 bg-foreground p-4 rounded-t">
          <div class="border-border border rounded w-10 h-10 flex items-center justify-center">
            <Icon name="heroicons:key" size="22px" />
          </div>
          <div>
            <h1>
              Unity integration
            </h1>
            <p class="text-xs text-gray-400">
              Created 06.01.2024
            </p>
          </div>
        </div>
        <UButton
          color="red"
          variant="solid"
          :ui="{ rounded: 'rounded-b rounded-t-none !px-4 !py-2.5' }"
        >
          Revoke access
        </UButton>
      </div>
    </div>

    <TheModal
      :is-open="false"
      title="Create new personal access token"
    >
      <UFormGroup label="Name:">
        <UInput />
      </UFormGroup>
      <UButton block class="mt-3" color="primary" variant="outline">
        Generate new token
      </UButton>
    </TheModal>

    <TheModal
      :is-open="false"
      title="Your new personal access token"
    >
      <UFormGroup label="Token:">
        <UTextarea disabled model-value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg" />
      </UFormGroup>

      <p class="mt-2 text-xs text-gray-300">
        Once you close this popup, you will not be able to see the token again and will need to generate a new one.
      </p>

      <div class="grid grid-cols-2 gap-2">
        <UButton block class="mt-3" color="primary" icon="i-heroicons-clipboard-document-list-solid">
          Copy access code
        </UButton>
        <UButton block class="mt-3">
          Close and hide token
        </UButton>
      </div>
    </TheModal>
  </TheLayout>
</template>
