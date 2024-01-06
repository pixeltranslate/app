<template>
  <TheLayout>
    <UAlert
      icon="i-heroicons-exclamation-circle"
      color="red"
      variant="soft"
      title="Heads up!"
      description="Do not share your personal access token with anyone. No one at Pixeltranslate will ever ask you to share a personal access token."
    />

    <div class="my-5 flex items-end gap-2 justify-between">
      <h1 class="text-lg">
        Your Personal access tokens:
      </h1>
      <UButton icon="i-heroicons-key" size="lg">
        New token
      </UButton>
    </div>

    <div class="flex flex-col">
      <AccountAccessTokenRow />
      <AccountAccessTokenRow />
      <AccountAccessTokenRow />
      <AccountAccessTokenRow />
      <AccountAccessTokenRow />
      <AccountAccessTokenRow />
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
