import type { CollectionEntry } from '~/types'

type CollectionEntries = Record<string, CollectionEntry>

const MOCK_PROJECT_LANGUAGES = ['en_US', 'de_DE', 'ru_RU', 'fr_FR', 'nl_NL', 'it_IT', 'es_MX']
const FULL_MOCK_ITEMS: CollectionEntries = {
  '8HJ79GHVSDD979JHKNJBKL': { id: '8HJ79GHVSDD979JHKNJBKL', name: 'Start', translations: { en_US: 'start', de_DE: 'Start', ru_RU: 'начинать', fr_FR: 'commencer', nl_NL: 'begin', it_IT: 'inizio', es_MX: 'comenzar' }, createdAt: new Date() },
  '39JCIOIDO786GYG989': { id: '39JCIOIDO786GYG989', name: 'End', translations: { en_US: 'end', de_DE: 'Beenden', ru_RU: 'конец', fr_FR: 'fin', nl_NL: 'einde', it_IT: 'fine', es_MX: 'fin' }, createdAt: new Date() }
}
const INITIAL_MOCK_ITEMS: CollectionEntries = {
  '8HJ79GHVSDD979JHKNJBKL': { id: '8HJ79GHVSDD979JHKNJBKL', name: 'Start', translations: { en_US: 'start', de_DE: 'Start' }, createdAt: new Date() },
  '39JCIOIDO786GYG989': { id: '39JCIOIDO786GYG989', name: 'End', translations: { en_US: 'end', de_DE: 'Beenden' }, createdAt: new Date() }
}

const selectedLanguages = ref(['en_US', 'de_DE'])
const data = ref(INITIAL_MOCK_ITEMS)

const updateEntry = (value: string, entryId: string, languageId: string) => {
  data.value[entryId].translations[languageId] = value
}

watch(selectedLanguages, () => {
  // GET NEW COLLECTION ENTRIES VIA URL HERE
  data.value = useMerge(FULL_MOCK_ITEMS, data.value)
})

export default () => {
  return {
    languageOptions: MOCK_PROJECT_LANGUAGES,
    selectedLanguages,
    data,
    updateEntry
  }
}
