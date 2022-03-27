import type { apiBody } from '../pages/statistics'
import myDate from './MyDate'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function WelcomeStat() {
  const [statNow, setStatNow] = useState<number>(0)
  const [statPrev, setStatPrev] = useState<number>(0)
  const bodyNow = {
    mode: 'get_stat',
    startDate: myDate('0M'),
    finishDate: myDate('today')
  }
  const bodyPrev = {
    mode: 'get_stat',
    startDate: myDate('0-M'),
    finishDate: myDate('F-M')
  }

  useEffect(() => {
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
          setStatNow(() => {
            return isFinite(res.data[0].sum) ? res.data[0].sum : 0
          })
        }
      })
      .catch((error) => {
        console.log('!!! catch Error:', error.message)
        alert('!catch Error:' + error.message)
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
          setStatPrev(() => {
            return isFinite(res.data[0].sum) ? Number(res.data[0].sum) : 0
          })
        }
      })
      .catch((error) => {
        console.log('!!! catch Error:', error.message)
        alert('!catch Error:' + error.message)
      })
  }, [])

  return (
    <div className={styles.statRow}>
      {statNow} / {statPrev}
    </div>
  )
}
