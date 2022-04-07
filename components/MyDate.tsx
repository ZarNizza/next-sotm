export default function myDate(mark: string) {
  const today = new Date()
  let myDate = today
  switch (mark) {
    case 'today':
      break
    case 'today0':
      break
    case 'yesterday':
      myDate.setDate(today.getDate() - 1)
      break
    case '0W':
      myDate.setDate(today.getDate() - 6)
      break
    case '0M':
      myDate.setDate(1)
      break
    case '0-M':
      myDate.setMonth(today.getMonth() - 1)
      myDate.setDate(1)
      break
    case 'F-M':
      myDate.setDate(0)
      break
    case 'FM':
      myDate.setMonth(today.getMonth() - 1)
      break
    case '0Y':
      myDate.setDate(1)
      myDate.setMonth(0)
      break
    case 'FY':
      myDate.setFullYear(today.getFullYear() - 1)
      break
    case '0':
      myDate.setFullYear(2000)
      myDate.setMonth(0)
      myDate.setDate(1)
      break
    case 'all':
      myDate.setFullYear(2099)
      myDate.setMonth(11)
      myDate.setDate(31)
      break
    default:
      break
  }

  let resultDate = String(myDate.getFullYear()) + '-'
  if (myDate.getMonth() < 9) resultDate += '0'
  resultDate += String(myDate.getMonth() + 1) + '-'

  if (myDate.getDate() < 10) resultDate += '0'
  resultDate += String(myDate.getDate())
  resultDate += ' '

  if (mark === 'today') {
    resultDate += ' 23:59'
  } else {
    resultDate += ' 00:00'
  }

  return resultDate
}
