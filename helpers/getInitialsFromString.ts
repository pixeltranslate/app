export default (text?: string, length = 2) => {
  if (text) {
    /*
      Get initials
      1. Get the first character starting a new word
      2. Remove any characters that are not letters or number
    */
    const initials = text.match(/(\b\S)?/g)?.join('').replaceAll(/[^a-zA-Z0-9]/g, '').toUpperCase()

    if (initials && initials.length !== 0) {
    // If initial exist return the amount specified
      return initials.slice(0, length)
    }

    // Fallback: Return the first letter uppercased
    return text[0].toLocaleUpperCase()
  }
  return '?'
}
