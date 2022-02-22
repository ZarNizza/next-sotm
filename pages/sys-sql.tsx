import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { useState } from 'react'
import type { Sale } from './add'

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
          alert('SYS_sql ERROR: ' + res.error)
        } else {
          console.log('SYS_sql: DB-sql = OK', res.data)
          setResData(() => res.data)
        }
      })
      .catch((error) =>
        console.log('! SYS_sql: DB-sql error - ', error.message)
      )
  }

  return (
    <Layout>
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
            <button onClick={sqlReuestHandler} className={styles.orangeButton}>
              send SQL
            </button>
          </div>
          <div className={styles.blueButtons}>
            <Link href="/users">
              <button>Users</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/customers">
              <button>Customers</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/products">
              <button>Products</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/sys">
              <button>SYSTEM</button>
            </Link>
            <p> </p>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
