import { klona } from 'klona/lite'

export default <T>(value: T) => useCloned(value, { clone: klona })
