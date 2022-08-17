import Link from 'next/link'
import myDate from './MyDate'
import styles from './Home.module.scss'
import { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { AppContext } from './AppContext'

export default function WelcomeStat() {
  const c = useContext(AppContext)
  const [statNow, setStatNow] = useState<string>('0')
  const [statPrev, setStatPrev] = useState<string>('0')
  const [statNowS, setStatNowS] = useState<string>('0')
  const [statPrevS, setStatPrevS] = useState<string>('0')
  const [statNowX, setStatNowX] = useState<string>('0')
  const [statPrevX, setStatPrevX] = useState<string>('0')
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
  const bodyNowS = {
    mode: 'get_stat_s',
    dbPrefix: c.u,
    startDate: myDate('today0'),
    finishDate: myDate('today')
  }
  const bodyPrevS = {
    mode: 'get_stat_s',
    dbPrefix: c.u,
    startDate: myDate('0M'),
    finishDate: myDate('today')
  }
  const bodyNowX = {
    mode: 'get_stat_x',
    dbPrefix: c.u,
    startDate: myDate('today0'),
    finishDate: myDate('today')
  }
  const bodyPrevX = {
    mode: 'get_stat_x',
    dbPrefix: c.u,
    startDate: myDate('0M'),
    finishDate: myDate('today')
  }

  useEffect(() => {
    if (c.u > '') toast.loading('Loading...')
    console.log('WelcomeStat dbPrefix:', c.u)
    // //
    // // bodyNow
    // fetch('/api/statistics', {
    //   method: 'POST',
    //   body: JSON.stringify(bodyNow)
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.error) {
    //       console.log(
    //         'WelcomeStat !!! fetch-1 error=',
    //         res.error,
    //         ' body=',
    //         bodyNow
    //       )
    //       alert('WelcomeStat ! fetch-1 Error: ' + res.error)
    //     } else {
    //       setStatNow(() => {
    //         return isFinite(res.data[0].summa)
    //           ? String(
    //               new Intl.NumberFormat('ru').format(Number(res.data[0].summa))
    //             )
    //           : '0'
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(
    //       'WelcomeStat !!! catch-1 Error:',
    //       error.message,
    //       ' body=',
    //       bodyNow
    //     )
    //     alert('WelcomeStat ! catch-1 Error:' + error.message)
    //     if (c.u > '') toast.remove()
    //     toast.error('!Loading error: X3')
    //   })
    // //
    // // bodyPrev
    // fetch('/api/statistics', {
    //   method: 'POST',
    //   body: JSON.stringify(bodyPrev)
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.error) {
    //       console.log(
    //         'WelcomeStat !!! API error=',
    //         res.error,
    //         ' body=',
    //         bodyPrev
    //       )
    //       alert('WelcomeStat ! fetch-2 Error: ' + res.error)
    //     } else {
    //       setStatPrev(() => {
    //         return isFinite(res.data[0].summa)
    //           ? String(
    //               new Intl.NumberFormat('ru').format(Number(res.data[0].summa))
    //             )
    //           : '0'
    //       })
    //       if (c.u > '') toast.remove()
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(
    //       'WelcomeStat !!! catch-2 Error:',
    //       error.message,
    //       ' body=',
    //       bodyPrev
    //     )
    //     alert('WelcomeStat ! catch-2 Error:' + error.message)
    //     if (c.u > '') toast.remove()
    //     toast.error('!Loading error: X3')
    //   })

    //
    // bodyNowX
    fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(bodyNowX)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(
            'WelcomeStat X !!! fetch-1 error=',
            res.error,
            ' bodyX=',
            bodyNowX
          )
          alert('WelcomeStat X ! fetch-1 Error: ' + res.error)
        } else {
          setStatNowX(() => {
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
          'WelcomeStat X !!! catch-1 Error:',
          error.message,
          ' bodyX=',
          bodyNowX
        )
        alert('WelcomeStat X ! catch-1 Error:' + error.message)
        if (c.u > '') toast.remove()
        toast.error('!Loading X error: X3')
      })
    //
    // bodyPrevX
    fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(bodyPrevX)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(
            'WelcomeStat X !!! API error=',
            res.error,
            ' bodyX=',
            bodyPrevX
          )
          alert('WelcomeStat X ! fetch-2 Error: ' + res.error)
        } else {
          setStatPrevX(() => {
            return isFinite(res.data[0].summa)
              ? String(
                  new Intl.NumberFormat('ru').format(Number(res.data[0].summa))
                )
              : '0'
          })
          if (c.u > '') toast.remove()
        }
      })
      .catch((error) => {
        console.log(
          'WelcomeStat X !!! catch-2 Error:',
          error.message,
          ' bodyX=',
          bodyPrevX
        )
        alert('WelcomeStat X ! catch-2 Error:' + error.message)
        if (c.u > '') toast.remove()
        toast.error('!Loading error: X3')
      })

    //
    // bodyNowS
    fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(bodyNowS)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(
            'WelcomeStat S !!! fetch-1 error=',
            res.error,
            ' bodyS=',
            bodyNowS
          )
          alert('WelcomeStat S ! fetch-1 Error: ' + res.error)
        } else {
          setStatNowS(() => {
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
          'WelcomeStat S !!! catch-1 Error:',
          error.message,
          ' bodyS=',
          bodyNowS
        )
        alert('WelcomeStat S ! catch-1 Error:' + error.message)
        if (c.u > '') toast.remove()
        toast.error('!Loading S error: X3')
      })
    //
    // bodyPrevS
    fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(bodyPrevS)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(
            'WelcomeStat S !!! API error=',
            res.error,
            ' bodyS=',
            bodyPrevS
          )
          alert('WelcomeStat S ! fetch-2 Error: ' + res.error)
        } else {
          setStatPrevS(() => {
            return isFinite(res.data[0].summa)
              ? String(
                  new Intl.NumberFormat('ru').format(Number(res.data[0].summa))
                )
              : '0'
          })
          if (c.u > '') toast.remove()
        }
      })
      .catch((error) => {
        console.log(
          'WelcomeStat S !!! catch-2 Error:',
          error.message,
          ' bodyS=',
          bodyPrevS
        )
        alert('WelcomeStat S ! catch-2 Error:' + error.message)
        if (c.u > '') toast.remove()
        toast.error('!Loading S error: X3')
      })
  }, [c.u])
  return (
    <>
      <Toaster />
      <Link href="/statistics" passHref>
        <div className={styles.welcomeStatRow1}>
          <div>
            {c.t.todayStat} :&nbsp;&nbsp;
            <span>
              {statNowS} - {statNowX} ={' '}
              {String(
                new Intl.NumberFormat('ru').format(
                  Number(statNowS.replace(/[^-?\d]/g, '')) -
                    Number(statNowX.replace(/[^-?\d]/g, ''))
                )
              )}
            </span>
          </div>
        </div>
      </Link>

      <Link href="/statistics" passHref>
        <div className={styles.welcomeStatRow}>
          <div>
            {c.t.monthStat} :&nbsp;&nbsp;
            <span>
              {statPrevS} - {statPrevX} ={' '}
              {String(
                new Intl.NumberFormat('ru').format(
                  Number(statPrevS.replace(/[^-?\d]/g, '')) -
                    Number(statPrevX.replace(/[^-?\d]/g, ''))
                )
              )}
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}
