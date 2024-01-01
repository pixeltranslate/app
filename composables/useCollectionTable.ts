import { merge } from 'lodash'
import type { CollectionEntry } from '~/types'

type CollectionEntries = Record<string, CollectionEntry>

const MOCK_PROJECT_LANGUAGES = ['EN', 'DE', 'RU', 'FR', 'NL', 'IT', 'ES']
const FULL_MOCK_ITEMS: CollectionEntries = {
  '8HJ79GHVSDD979JHKNJBKL': { id: '8HJ79GHVSDD979JHKNJBKL', name: 'Start', translations: { EN: 'start', DE: 'Start', RU: 'начинать', FR: 'commencer', NL: 'begin', IT: 'inizio', ES: 'comenzar' }, createdAt: new Date() },
  '39JCIOIDO786GYG989': { id: '39JCIOIDO786GYG989', name: 'End', translations: { EN: 'end', DE: 'Beenden', RU: 'конец', FR: 'fin', NL: 'einde', IT: 'fine', ES: 'fin' }, createdAt: new Date() }
}
const INITIAL_MOCK_ITEMS: CollectionEntries = {
  '8HJ79GHVSDD979JHKNJBKL': { id: '8HJ79GHVSDD979JHKNJBKL', name: 'Start', translations: { EN: 'start', DE: 'Start' }, createdAt: new Date() },
  '39JCIOIDO786GYG989': { id: '39JCIOIDO786GYG989', name: 'End', translations: { EN: 'end', DE: 'Beenden' }, createdAt: new Date() }
}

const mergeObjects = (rhs: CollectionEntries, lhs: CollectionEntries) => merge(lhs, rhs)

const selectedLanguages = ref(['EN', 'DE'])
const data = ref(INITIAL_MOCK_ITEMS)

const updateEntry = (value: string, entryId: string, languageId: string) => {
  data.value[entryId].translations[languageId] = value
}

watch(selectedLanguages, () => {
  // GET NEW COLLECTION ENTRIES VIA URL HERE
  data.value = mergeObjects(data.value, FULL_MOCK_ITEMS)
})

export default () => {
  return {
    languageOptions: MOCK_PROJECT_LANGUAGES,
    selectedLanguages,
    data,
    updateEntry
  }
}
