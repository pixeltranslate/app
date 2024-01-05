import type { CollectionEntry } from '~/types'

const selectedLanguages = ref<string[]>([])

const data = ref<CollectionEntry[]>([])
const dataWithoutDeleted = computed(() => data.value.filter(i => !i.deleted))

const setData = (payload: CollectionEntry[]) => {
  data.value = useMightyClone(payload).cloned.value
}

const updateEntry = (value: string, entryId: string, languageId: string) => {
  const index = data.value.findIndex(e => e.id === entryId)
  const cloned = [...data.value]
  cloned[index].translations[languageId] = value
  setData(cloned)
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

export default () => {
  const { project } = usePage()

  if (project.data.value) {
    selectedLanguages.value = project.data.value?.languages.splice(0, 2)
  }

  const languageOptions = computed(() => {
    return project.data.value?.languages
  })

  return {
    languageOptions,
    selectedLanguages,
    data,
    dataWithoutDeleted,
    setData,
    updateEntry,
    addEntry,
    deleteEntry
  }
}
