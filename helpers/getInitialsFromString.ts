export default (text?: string, length = 2) => {
  if (text) {
    // Get initials
    const initials = text.match(/(\b\S)?/g)?.join('').toUpperCase()

    if (initials && initials.length !== 0) {
    // If initial exist return the amount specified
      return initials.slice(0, length)
    }

    // Fallback: Return the first letter uppercased
    return text[0].toLocaleUpperCase()
  }
  return '?'
}
