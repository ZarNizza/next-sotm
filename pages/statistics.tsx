import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { Sale } from './add'
import DBresultTable from '../components/DBresultTable'

const Home: NextPage = () => {
  const datenow = new Date()
  const [resData, setResData] = useState<Sale[]>([
    { sid: 0, sdate: datenow, cust: 0, prod: 0, sum: 0 }
  ])
  const [startDate, setStartDate] = useState('2021-01-01')
  const [finishDate, setFinishDate] = useState('2022-02-10')

  function showSalesHandler() {
    const body = {
      mode: 'show_Sales'
    }
    fetch('/api/statistics', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((res) => {
        console.log('STAT: DB-S-show = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! STAT: DB-S-show error - ', error.message)
      )
  }

  function showFullSalesHandler() {
    const body = {
      mode: 'show_Full',
      startDate: startDate,
      finishDate: finishDate
    }

    fetch('/api/statistics', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((res) => {
        console.log('STAT: DB-S-showFull = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! STAT: DB-S-showFull error - ', error.message)
      )
  }

  function startDateChangeHandler(startDate: string) {
    setStartDate(startDate)
  }
  function finishDateChangeHandler(finishDate: string) {
    setFinishDate(finishDate)
  }

  return (
    <Layout>
      <Head>
        <title>Statistics</title>
      </Head>
      <main className={styles.main}>
        <h3>Statistics page</h3>
        <div className={styles.sysButton}>
          <button onClick={showSalesHandler}>show all Sales</button>{' '}
          <button onClick={showFullSalesHandler}>show FULL statistic</button>{' '}
        </div>
        <div className={styles.sysButton}>
          <input
            type="text"
            placeholder="Start date"
            value={startDate}
            onChange={(event) => startDateChangeHandler(event.target.value)}
          />
          <input
            type="text"
            placeholder="Finish date"
            value={finishDate}
            onChange={(event) => finishDateChangeHandler(event.target.value)}
          />
        </div>
        {resData === undefined || resData === [] ? (
          ''
        ) : (
          <DBresultTable resData={resData} />
        )}
      </main>
    </Layout>
  )
}

export default Home
