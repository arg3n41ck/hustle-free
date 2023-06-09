// timeString = "hh:mm:ss"
export const getScoreFullDateObj = (timeString) => {
  const now = new Date()
  const [hours, minutes, seconds] = timeString.split(':')
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    +hours,
    +minutes,
    +seconds,
  )

  return date
}
