export function getHeaderId(text, level, index) {
  var trimmedText = text !== null && text !== undefined ? text.trim() : ''
  return trimmedText.toLowerCase().replace(' ', '-')
}
