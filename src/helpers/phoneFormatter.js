export function phoneFormatter(phone) {
  const regex = /^(\+{0,})(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/
  const result = (phone || '').match(regex)
  return `${result[1]}${result[2]} (${result[3]}) ${result[4]}-${result[5]}-${result[6]}`
}

export function normalizePhone(phone) {
  return parseInt(phone.replace(/[^0-9]/g, ''))
}
