export const getEventStatus = (status) => {
  switch (status) {
    case "soon":
      return "скоро"
    case "end":
      return "скоро"
    case "after":
      return "скоро"
    default:
      return ""
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
