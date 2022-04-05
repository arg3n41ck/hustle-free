const rusMonth =  [
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

export const getRusDate = (_usDate) => {
  const usDate = new Date(_usDate);

  const m = rusMonth[usDate.getMonth()],
    y = usDate.getFullYear();

  return `${m}. ${y}`
}
