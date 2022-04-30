export const getEventStatus = (status) => {
  switch (status) {
    case "soon":
      return "скоро"
    case "continue":
      return "сейчас"
    case "past":
      return "прошел"
    default:
      return "Не известно"
  }
}

const rusMonth = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
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

export const getRoleInRu = (role) => {
  switch (role) {
    case "organizer":
      return "Организатор"
    case "athlete":
      return "Атлет"
    case "team":
      return "Команда"
    default:
      return null
  }
}

export const localStorageGetItem = (key) => {
  return typeof window !== "undefined" && window.localStorage.getItem(key)
}

export const localStorageSetItem = (key, value) => {
  typeof window !== "undefined" && window.localStorage.setItem(key, value)
}
export const localStorageRemoveItem = (key) => {
  typeof window !== "undefined" && window.localStorage.removeItem(key)
}