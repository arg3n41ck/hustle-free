export const getEventStatus = (status) => {
  switch (status) {
    case 'soon':
      return 'скоро'
    case 'continue':
      return 'сейчас'
    case 'past':
      return 'прошел'
    default:
      return 'Не известно'
  }
}

const rusMonth = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
]

export const getRusBetweenDate = (start, end) => {
  const sDate = new Date(start),
    startDate = sDate.getDate(),
    startMonth = sDate.getMonth()

  const eDate = new Date(end),
    endDate = eDate.getDate(),
    endMonth = eDate.getMonth()

  if (startMonth === endMonth) {
    return `${startDate} - ${endDate} ${rusMonth[startMonth]}`
  }

  return `${startDate} ${rusMonth[startMonth]} - ${endDate} ${rusMonth[endMonth]}`
}
export const getRuDetailDate = (start) => {
  const sDate = new Date(start),
    startDate = sDate.getDate(),
    startMonth = sDate.getMonth(),
    year = sDate.getFullYear()

  return `${startDate} ${rusMonth[startMonth]} ${year}г.`
}

export const getRoleInRu = (role) => {
  switch (role) {
    case 'organizer':
      return 'Организатор'
    case 'athlete':
      return 'Атлет'
    case 'team':
      return 'Команда'
    default:
      return null
  }
}

export const localStorageGetItem = (key) => {
  return typeof window !== 'undefined' && window.localStorage.getItem(key)
}

export const localStorageSetItem = (key, value) => {
  typeof window !== 'undefined' && window.localStorage.setItem(key, value)
}
export const localStorageRemoveItem = (key) => {
  typeof window !== 'undefined' && window.localStorage.removeItem(key)
}

export const truncateString = (str, num, dots = true) => {
  if (str?.length < num) {
    return str
  }

  return (str || '').slice(0, num) + (dots ? '...' : '')
}

export const removeDuplicateObjectFromArray = (array, key) => {
  const check = new Set()
  return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]))
}

export const getAge = (dateString) => {
  const today = new Date()
  const birthDate = new Date(dateString)
  const age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
