import myDate from './MyDate'
import styles from './Home.module.scss'
import { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { AppContext } from './AppContext'

export default function WelcomeStat() {
  const c = useContext(AppContext)
  const [statNow, setStatNow] = useState<string>('0')
  const [statPrev, setStatPrev] = useState<string>('0')
  const bodyNow = {
    mode: 'get_stat',
    startDate: myDate('today0'),
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
          console.log('fetch 1st stat sum')
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
          console.log('fetch 2nd stat sum')

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
        {c.t.today} :&nbsp;&nbsp;
        <span>
          {statNow} / {statPrev}
        </span>
        &nbsp;&nbsp;: {c.t.month}
      </div>
    </>
  )
}
