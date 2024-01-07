<script lang='ts' setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useClipboard } from '@vueuse/core'

const { $trpc } = useNuxtApp()
const queryClient = useQueryClient()
const { copy, isSupported } = useClipboard()
const toast = useToast()

const { profile: profileQuery } = useQuery()
const { data: tokens } = profileQuery.tokens()

const tokenCreationModal = useModal<{ name: string }>()
const tokenDisplayModal = useModal<{ secretId: string }>()

const create = useMutation({
  mutationFn: $trpc.profileRouter.createToken.mutate,
  onSuccess: (res) => {
    queryClient.invalidateQueries({ queryKey: ['profiles', 'tokens'] })
    toast.add({ title: 'You created a new personal access token.' })
    tokenCreationModal.close()
    tokenDisplayModal.open(res)
  }
})

const revoke = useMutation({
  mutationFn: $trpc.profileRouter.deleteToken.mutate,
  onSuccess: (res) => {
    queryClient.invalidateQueries({ queryKey: ['profiles', 'tokens'] })
    toast.add({ title: `You remove the personal access token: ${res.name}` })
  }
})
</script>

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
      <UButton icon="i-heroicons-key" size="lg" @click="tokenCreationModal.open({ name: '' })">
        New token
      </UButton>
    </div>

    <div class="flex flex-col">
      <AccountAccessTokenRow
        v-for="token in tokens"
        :key="token.id"
        :token="token"
        @revoke="revoke.mutate"
      />
    </div>

    <TheModal
      :is-open="tokenCreationModal.isOpen"
      title="Create new personal access token"
      @close="tokenCreationModal.close()"
    >
      <div v-if="tokenCreationModal.data.value">
        <UFormGroup label="Name:">
          <UInput v-model="tokenCreationModal.data.value.name" />
        </UFormGroup>
        <UButton
          block
          class="mt-3"
          color="primary"
          variant="outline"
          @click="create.mutate(tokenCreationModal.data.value)"
        >
          Generate new token
        </UButton>
      </div>
      <TheLoader v-else min-height="h-[150px]" />
    </TheModal>

    <TheModal
      :is-open="tokenDisplayModal.isOpen"
      title="Your new personal access token"
      hide-close-icon
    >
      <UFormGroup label="Token:">
        <UTextarea
          disabled
          :model-value="tokenDisplayModal.data.value?.secretId"
        />
      </UFormGroup>

      <p class="mt-2 text-xs text-gray-300">
        Once you close this popup, you will not be able to see the token again and will need to generate a new one.
      </p>

      <div class="grid grid-cols-2 gap-2">
        <UButton
          v-if="isSupported"
          block
          class="mt-3"
          color="primary"
          icon="i-heroicons-clipboard-document-list-solid"
          @click="copy(tokenDisplayModal.data.value?.secretId || '')"
        >
          Copy access code
        </UButton>
        <UButton
          block
          class="mt-3"
          @click="tokenDisplayModal.close()"
        >
          Close and hide token
        </UButton>
      </div>
    </TheModal>
  </TheLayout>
</template>
