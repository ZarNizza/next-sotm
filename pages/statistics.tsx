import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { Sale, Product, Customer } from './plus'
import Init from '../components/Init'
import myDate from '../components/MyDate'
import DBshortTable from '../components/DBshortTable'
import DBfullTable from '../components/DBfullTable'
import DBfullDTable from '../components/DBfullDTable'
import LiveSelect from '../components/LiveSelectCUSX'

export type apiBody = {
  mode: string
  startDate: string
  finishDate: string
  currentCustomer?: Customer
}

const Home: NextPage = () => {
  const cust0 = {
    id: 0,
    name: '',
    phone: '',
    gooid: ''
  }
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(cust0)
  const [products, setProducts] = useState<Product[]>([])
  const liveRef = useRef<HTMLInputElement>(null)
  const [searchWord, setSearchWord] = useState('')

  const [resData, setResData] = useState<Sale[]>([])
  const [resSource, setResSource] = useState('')
  const [startDate, setStartDate] = useState(myDate('today'))
  const [finishDate, setFinishDate] = useState(myDate('today'))

  useEffect(() => {
    Init(setCustomers, 'customers')
    Init(setProducts, 'products')
  }, [])

  function fetch_Handler(body: apiBody) {
    fetch('/api/statistics', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log('!!! API error=', res.error)
          alert('!Error: ' + res.error)
        } else {
          setResSource(() => res.source)
          setResData(() => res.data)
        }
      })
      .catch((error) => {
        console.log('!!! catch Error:', error.message)
        alert('!catch Error:' + error.message)
      })
  }

  function show_S_Handler() {
    const body = {
      mode: 'show_S',
      startDate: startDate,
      finishDate: finishDate,
      currentCustomer: currentCustomer
    }
    fetch_Handler(body)
  }

  function show_X_Handler() {
    const body = {
      mode: 'show_X',
      startDate: startDate,
      finishDate: finishDate
    }
    fetch_Handler(body)
  }

  function show_SX_Handler() {
    const body = {
      mode: 'show_SX',
      startDate: startDate,
      finishDate: finishDate,
      currentCustomer: currentCustomer
    }
    fetch_Handler(body)
  }

  function show_S_Full_Handler() {
    const body = {
      mode: 'show_S_Full',
      startDate: startDate,
      finishDate: finishDate
    }
    fetch_Handler(body)
  }

  function show_SX_Full_Handler() {
    const body = {
      mode: 'show_SX_Full',
      startDate: startDate,
      finishDate: finishDate
    }
    fetch_Handler(body)
  }

  function show_CS_Full_Handler() {
    const body = {
      mode: 'show_CS_Full',
      startDate: startDate,
      finishDate: finishDate,
      currentCustomer: currentCustomer
    }
    fetch_Handler(body)
  }

  function startDateChangeHandler(startDate: string) {
    if (startDate.length < 11)
      setStartDate(
        startDate.replace(/[^\d\.\,\-\/]/g, '').replace(/[^\d\-]/g, '-')
      )
  }
  function finishDateChangeHandler(finishDate: string) {
    if (finishDate.length < 11)
      setFinishDate(
        finishDate.replace(/[^\d\.\,\-\/]/g, '').replace(/[^\d\-]/g, '-')
      )
  }

  function setTodayHandler() {
    setStartDate(() => myDate('today'))
    setFinishDate(() => myDate('today'))
  }
  function setYesterdayHandler() {
    setStartDate(() => myDate('yesterday'))
    setFinishDate(() => myDate('yesterday'))
  }
  function setWeekHandler() {
    setStartDate(() => myDate('0W'))
    setFinishDate(() => myDate('today'))
  }
  function setThisMonthHandler() {
    setStartDate(() => myDate('0M'))
    setFinishDate(() => myDate('today'))
  }
  function setFullMonthHandler() {
    setStartDate(() => myDate('FM'))
    setFinishDate(() => myDate('today'))
  }
  function setThisYearHandler() {
    setStartDate(() => myDate('0Y'))
    setFinishDate(() => myDate('today'))
  }
  function setFullYearHandler() {
    setStartDate(() => myDate('FY'))
    setFinishDate(() => myDate('today'))
  }
  function setAllHandler() {
    setStartDate(() => myDate('0'))
    setFinishDate(() => myDate('today'))
  }

  return (
    <Layout>
      <Head>
        <title>Profit Statistics</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>Profit Statistics</h3>
          <LiveSelect
            items={customers}
            currentItem={currentCustomer}
            setCurrentItem={setCurrentCustomer}
            liveRef={liveRef}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            mode="stat"
            type="C"
          />
          <div className={styles.miniInput}>
            <input
              type="text"
              placeholder="Start date"
              pattern="^20\d\d[\.\-\/][01]\d[\.\-\/][0123]\d$"
              value={startDate}
              onChange={(event) => startDateChangeHandler(event.target.value)}
            />
            {':'}
            <input
              type="text"
              placeholder="Finish date"
              pattern="^20\d\d[\.\-\/][01]\d[\.\-\/][0123]\d$"
              value={finishDate}
              onChange={(event) => finishDateChangeHandler(event.target.value)}
            />
          </div>
          <div className={styles.gray}>
            Long period may cause tooooo wide view
          </div>
          <div className={styles.miniButtons}>
            <div className={styles.flexRowContainer}>
              <button onClick={setTodayHandler}>Today</button>
              <button onClick={setYesterdayHandler}>Yesterday</button>
              <button onClick={setWeekHandler}>Week</button>
              <button onClick={setThisMonthHandler}>this Month</button>
              <button onClick={setFullMonthHandler}>Full Month</button>
              <button onClick={setThisYearHandler}>this Year</button>
              <button onClick={setFullYearHandler}>Full Year</button>
              <button onClick={setAllHandler}>All</button>
            </div>
          </div>
          <div className={styles.orangeButtons}>
            {' '}
            <div className={styles.flexRowContainer}>
              <button onClick={show_S_Handler}>Total S</button>
              <button onClick={show_X_Handler}>Total X</button>
              <button onClick={show_SX_Handler}>Total S + X</button>
              <button onClick={show_S_Full_Handler}>S by days</button>
              <button onClick={show_SX_Full_Handler}>S + X by days</button>
              <button onClick={show_CS_Full_Handler}>Sells by Customer</button>
            </div>
          </div>
          {resData === undefined || resData.length === 0 ? (
            <p className={styles.gray}>No data - empty result</p>
          ) : resSource === 'short' ? (
            <div className={styles.tableScroll}>
              <DBshortTable resData={resData} />
            </div>
          ) : resSource === 'full' ? (
            <div className={styles.tableScroll}>
              <DBfullTable resData={resData} products={products} />
            </div>
          ) : (
            <div className={styles.tableScroll}>
              <DBfullDTable resData={resData} products={products} />
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}

export default Home
