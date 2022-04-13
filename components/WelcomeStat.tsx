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
    dbPrefix: c.u,
    startDate: myDate('today0'),
    finishDate: myDate('today')
  }
  const bodyPrev = {
    mode: 'get_stat',
    dbPrefix: c.u,
    startDate: myDate('0M'),
    finishDate: myDate('today')
  }

  useEffect(() => {
    const toast01 = toast.loading('Loading...')
    console.log('WelcomeStat dbPrefix:', c.u)
    fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(bodyNow)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(
            'WelcomeStat !!! fetch-1 error=',
            res.error,
            ' body=',
            bodyNow
          )
          alert('WelcomeStat ! fetch-1 Error: ' + res.error)
        } else {
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
        console.log(
          'WelcomeStat !!! catch-1 Error:',
          error.message,
          ' body=',
          bodyNow
        )
        alert('WelcomeStat ! catch-1 Error:' + error.message)
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
          console.log(
            'WelcomeStat !!! API error=',
            res.error,
            ' body=',
            bodyPrev
          )
          alert('WelcomeStat ! fetch-2 Error: ' + res.error)
        } else {
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
        console.log(
          'WelcomeStat !!! catch-2 Error:',
          error.message,
          ' body=',
          bodyPrev
        )
        alert('WelcomeStat ! catch-2 Error:' + error.message)
        toast.remove()
        toast.error('!Loading error: X3')
      })
  }, [c.u])
  return (
    <>
      <Toaster />
      <div className={styles.welcomeStatRow}>
        <div>
          {c.t.today} :&nbsp;&nbsp;
          <span>{statNow}</span>
        </div>
        <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
        <div>
          <span>{statPrev}</span>
          &nbsp;&nbsp;: {c.t.month}
        </div>
      </div>
    </>
  )
}
