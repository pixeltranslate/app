import type { CollectionEntry } from '~/types'

type CollectionEntries = Record<string, CollectionEntry>

const INITIAL_MOCK_ITEMS: CollectionEntries = {
  '8HJ79GHVSDD979JHKNJBKL': { id: '8HJ79GHVSDD979JHKNJBKL', name: 'Start', translations: { en_US: 'start' }, createdAt: new Date() },
  '39JCIOIDO786GYG989': { id: '39JCIOIDO786GYG989', name: 'End', translations: { en_US: 'end', de_DE: 'Beenden' }, createdAt: new Date() }
}

const selectedLanguages = ref<string[]>([])

export default () => {
  const { project } = usePage()
  const dataWithoutDeleted = computed(() => data.value.filter(i => !i.deleted))
  const data = ref(Object.values(INITIAL_MOCK_ITEMS))

  const languageOptions = computed(() => {
    return project.data.value?.languages
  })

  const updateEntry = (value: string, entryId: string, languageId: string) => {
    const index = data.value.findIndex(e => e.id === entryId)
    data.value[index].translations[languageId] = value
  }

  const addEntry = (key: string) => {
    data.value.push({
      id: Math.floor(Math.random() * 10000).toString(),
      name: key,
      translations: {},
      createdAt: new Date()
    })
  }

  const deleteEntry = (key: string) => {
    const index = data.value.findIndex(e => e.id === key)
    data.value[index].deleted = true
  }

  return {
    languageOptions,
    selectedLanguages,
    data,
    dataWithoutDeleted,
    updateEntry,
    addEntry,
    deleteEntry
  }
}
