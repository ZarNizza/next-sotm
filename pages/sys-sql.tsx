import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import type { Sale } from './plus'

const Home: NextPage = () => {
  const [resData, setResData] = useState<Sale[]>([])
  const [sqlString, setSQLstring] = useState<string>('')

  function inputSQLstringHandler(sql: string) {
    setSQLstring(() => sql)
  }
  function sqlReuestHandler() {
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

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>System page</title>
        </Head>
        <main className={styles.main}>
          <div>
            <input
              id="sqlInput"
              value={sqlString}
              onChange={(event) => inputSQLstringHandler(event.target.value)}
              placeholder="SQL request"
              style={{ padding: '1rem', width: '80rem' }}
            />
            <button onClick={sqlReuestHandler} className={styles.sysButton}>
              send SQL
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
