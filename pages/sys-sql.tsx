import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import type { Sale } from './plus'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'
import ShowLSdata from '../components/ShowLSdata'

const Home: NextPage = () => {
  const c = useContext(AppContext)
  const [resData, setResData] = useState<Sale[]>([])
  const [sqlString, setSQLstring] = useState<string>('')
  const [resLSData, setResLSData] = useState([{ date: '' }])

  function inputSQLstringHandler(sql: string) {
    setSQLstring(() => sql)
  }
  function sqlRequestHandler() {
    const reqBody = { mode: 'sql', sqlString: sqlString }
    fetch('/api/sys_sql', { method: 'POST', body: JSON.stringify(reqBody) })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('! SYS_sql: ' + res.error)
        } else {
          console.log('SYS_sql OK: ', res.data)
          setResData(() => res.data)
        }
      })
      .catch((error) => console.log('! SYS_sql: ', error.message))
  }

  function localStorage_Sales_RequestHandler() {
    let items: string | null = localStorage.getItem(c.u + 'sales')
    if (items !== null && items !== '') {
      setResData(() => JSON.parse('' + items))
    } else {
      alert('localStorage empty!')
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>System page</title>
        </Head>
        <main className={styles.main}>
          <div>
            <p>{!!c.u ? c.u : '- not logged -'}</p>
            <input
              id="sqlInput"
              value={sqlString}
              onChange={(event) => inputSQLstringHandler(event.target.value)}
              placeholder="SQL request"
              style={{ padding: '1rem', width: '80rem' }}
            />
            <button onClick={sqlRequestHandler} className={styles.sysButton}>
              send SQL
            </button>
            <div>
              <button
                onClick={localStorage_Sales_RequestHandler}
                className={styles.sysButton}
              >
                show ls_SALES
              </button>
            </div>
            <div className={styles.tableScroll}>
              {resData === undefined || resData.length === 0 ? (
                <p>No data - empty result</p>
              ) : (
                <ShowLSdata resData={resLSData} />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
