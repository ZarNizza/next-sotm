import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
  useState
} from 'react'
import type { Sale } from './add'

const Home: NextPage = () => {
  const [resData, setResData] = useState<Sale[]>([])

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
    fetch('/api/sys2', { method: 'POST', body: 'fill_Sales' })
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
          <div className={styles.sysButton}>
            <button onClick={showSalesHandler}>SHOW sales</button>{' '}
          </div>
          <p>.</p>
          --------------------
          <p>.</p>{' '}
          <div className={styles.sysButton}>
            <Link href="/users">
              <button> &lt; &lt; Customers List </button>
            </Link>{' '}
            &nbsp;&nbsp;{' '}
            <Link href="/products">
              <button>&lt; &lt; Products List </button>
            </Link>
          </div>
          <p>.</p>
          --------------------
          <p>Sales </p>
          <div>
            <table>
              <thead>
                <tr>
                  <td>sID</td>
                  <td>Cust</td>
                  <td>Prod</td>
                  <td>Sum</td>
                  <td>Date</td>
                </tr>
              </thead>
              <tbody>
                {resData.map((item: Sale) => {
                  return (
                    <tr>
                      <td>{item.sid}</td>
                      <td>{item.cust}</td>
                      <td>{item.prod}</td>
                      <td>{item.sum}</td>
                      <td>{String(item.sdate).slice(0, 10)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {/* <ul>
              {resData.map((item: Sale) => {
                return (
                  <li key={item.sid}>
                    {item.sid} : {item.cust} _ {item.prod} _ {item.sum} _{' '}
                    {String(item.sdate).slice(0, 10)}
                  </li>
                )
              })}
            </ul> */}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
