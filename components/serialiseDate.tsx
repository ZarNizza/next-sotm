export default function serialiseDate(date: Date, timeZone: string) {
  return (
    String(date.getFullYear()) +
    '-' +
    String(
      date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    ) +
    '-' +
    String(date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    ' ' +
    String(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    String(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  )
}
