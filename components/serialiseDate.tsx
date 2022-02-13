export default function serialiseDate(date: Date, timeZone: string) {
  return (
    String(date.getFullYear()) +
    '-' +
    String(date.getMonth() + 1) +
    '-' +
    String(date.getDate()) +
    'T' +
    timeZone +
    ':00:00'
  )
}
