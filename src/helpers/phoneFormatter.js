export default function phoneFormatter(phone) {
  const regex = /^(\+{0,})(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/
  const result = phone.match(regex)
  const phoneNumber = `${result[1]}${result[2]} (${result[3]}) ${result[4]}-${result[5]}-${result[6]}`
  return phoneNumber
}
