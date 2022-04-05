export default function sliceText(text, length) {
  return text.length > length ? `${text.slice(0, length)}...` : text
}
