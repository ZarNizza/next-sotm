import type { apiBody } from '../pages/statistics'
import myDate from './MyDate'
import styles from './Home.module.scss'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function WelcomeStat() {
  const [statNow, setStatNow] = useState<string>('0')
  const [statPrev, setStatPrev] = useState<string>('0')
  const bodyNow = {
    mode: 'get_stat',
    startDate: myDate('today'),
    finishDate: myDate('today')
  }
  const bodyPrev = {
    mode: 'get_stat',
    startDate: myDate('0M'),
    finishDate: myDate('today')
  }

  useEffect(() => {
    const toast01 = toast.loading('Loading...')
    fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(bodyNow)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log('!!! API error=', res.error)
          alert('!Error: ' + res.error)
        } else {
          console.log('!YES, 1st')
          setStatNow(() => {
            return isFinite(res.data[0].summa)
              ? String(
                  new Intl.NumberFormat('ru').format(Number(res.data[0].summa))
                )
              : '0'
          })
        }
      })
      .catch((error) => {
        console.log('!!! catch Error:', error.message)
        alert('!catch Error:' + error.message)
        toast.remove()
        toast.error('!Loading error: X3')
      })

    fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(bodyPrev)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log('!!! API error=', res.error)
          alert('!Error: ' + res.error)
        } else {
          console.log('!YES, 2nd')

          setStatPrev(() => {
            return isFinite(res.data[0].summa)
              ? String(
                  new Intl.NumberFormat('ru').format(Number(res.data[0].summa))
                )
              : '0'
          })
          toast.remove()
        }
      })
      .catch((error) => {
        console.log('!!! catch Error:', error.message)
        alert('!catch Error:' + error.message)
        toast.remove()
        toast.error('!Loading error: X3')
      })
  }, [])

  return (
    <>
      <Toaster />
      <div className={styles.welcomeStatRow}>
        today :&nbsp;&nbsp;
        <span>
          {statNow} / {statPrev}
        </span>
        &nbsp;&nbsp;: month
      </div>
    </>
  )
}
