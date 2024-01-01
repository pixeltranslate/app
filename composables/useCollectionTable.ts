import { merge } from 'lodash'
import type { CollectionEntry } from '~/types'

type CollectionEntries = Record<string, CollectionEntry>

const MOCK_PROJECT_LANGUAGES = ['EN', 'DE', 'RU', 'FR', 'NL', 'IT', 'ES']
const MOCK_ITEMS: CollectionEntries = {
  '8HJ79GHVSDD979JHKNJBKL': { id: '8HJ79GHVSDD979JHKNJBKL', name: 'Start', translations: { EN: 'start', DE: 'Start', RU: 'начинать', FR: 'commencer', NL: 'begin', IT: 'inizio', ES: 'comenzar' }, createdAt: new Date() },
  '39JCIOIDO786GYG989': { id: '39JCIOIDO786GYG989', name: 'End', translations: { EN: 'end', DE: 'Beenden', RU: 'конец', FR: 'fin', NL: 'einde', IT: 'fine', ES: 'fin' }, createdAt: new Date() }
}

const mergeObjects = (rhs: CollectionEntries, lhs: CollectionEntries) => merge(rhs, lhs)

const selectedLanguages = ref(MOCK_PROJECT_LANGUAGES)
const data = ref(MOCK_ITEMS)

const updateEntry = (value: string, entryId: string, languageId: string) => {
  data.value[entryId].translations[languageId] = value
}

export default () => {
  return {
    languageOptions: MOCK_PROJECT_LANGUAGES,
    selectedLanguages,
    data,
    updateEntry
  }
}
