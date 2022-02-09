import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { useState } from 'react'
import type { Sale } from './add'
import DBresultTable from '../components/DBresultTable'

const Home: NextPage = () => {
  const [resData, setResData] = useState<Sale[]>([])
  const [sqlString, setSQLstring] = useState<string>('')

  function dropSalesHandler() {
    fetch('/api/sys2', { method: 'POST', body: 'drop_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS2: DB-S-drop = OK', res)
      })
      .catch((error) =>
        console.log('! SYS2: DB-S-drop error - ', error.message)
      )
  }

  function createSalesHandler() {
    fetch('/api/sys2', { method: 'POST', body: 'create_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS2: DB-S-create = OK', res)
      })
      .catch((error) =>
        console.log('! SYS2: DB-S-create error - ', error.message)
      )
  }

  function clearSalesHandler() {
    fetch('/api/sys2', { method: 'POST', body: 'clear_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS2: DB-clear = OK', res)
      })
      .catch((error) =>
        console.log('! SYS2: DB-S-clear error - ', error.message)
      )
  }
  function fillSalesHandler() {
    fetch('/api/sys2-fill', { method: 'POST', body: 'fill_Sales' }) // sys2-fill
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS2: DB-S-fill = OK', res)
      })
      .catch((error) =>
        console.log('! SYS2: DB-S-fill error - ', error.message)
      )
  }

  function showSalesHandler() {
    fetch('/api/sys2', { method: 'POST', body: 'show_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS2: DB-S-show = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS2: DB-S-show error - ', error.message)
      )
  }
  

  
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>System page</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.sysButton}>
            <button onClick={dropSalesHandler}>! DROP sales !</button>
            <button onClick={createSalesHandler}>! CREATE sales !</button>
          </div>
          --------------------
          <p>.</p>
          <div className={styles.sysButton}>
            <button onClick={clearSalesHandler}>! CLEAR sales !</button>
            <button onClick={fillSalesHandler}>! FILL sales !</button>
          </div>
          <div className={styles.orangeButton}>
            <button onClick={showSalesHandler}>SHOW sales</button>{' '}
          </div>
          <p>.</p>
          --------------------
          <p>.</p>{' '}
          <div className={styles.blueButton}>
            <Link href="/users">
              <button> &lt; &lt; Customers List </button>
            </Link>{' '}
            &nbsp;&nbsp;{' '}
            <Link href="/products">
              <button>&lt; &lt; Products List </button>
            </Link>
            &nbsp;&nbsp;{' '}
            <Link href="/sys-sql">
              <button>&lt; &lt; SQL </button>
            </Link>
          </div>
          <div>
            {resData === undefined || resData.length === 0 ? (
              <p>No data - empty result</p>
            ) : (
              <DBresultTable resData={resData} />
            )}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
