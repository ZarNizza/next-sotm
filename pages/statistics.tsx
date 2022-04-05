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
import DBList from '../components/DBList'
import LiveSelect from '../components/LiveSelectCUSX'
import toast, { Toaster } from 'react-hot-toast'

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
  const [startDate, setStartDate] = useState(myDate('today0'))
  const [finishDate, setFinishDate] = useState(myDate('today'))

  useEffect(() => {
    Init(setCustomers, 'customers')
    Init(setProducts, 'products')
  }, [])

  function fetch_Handler(body: apiBody) {
    const toast01 = toast.loading('Loading...')
    fetch('/api/statistics', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.remove()
          toast.error('!Loading error: X3')
          console.log('!!! API error=', res.error)
          alert('!Error: ' + res.error)
        } else {
          toast.remove()
          setResSource(() => res.source)
          setResData(() => res.data)
        }
      })
      .catch((error) => {
        toast.remove()
        toast.error('!Loading error: X3')
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

  function show_X_Full_Handler() {
    const body = {
      mode: 'show_X_Full',
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

  function show_C_History_Handler() {
    const body = {
      mode: 'show_C_History',
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
    setStartDate(() => myDate('today0'))
    setFinishDate(() => myDate('today'))
  }
  function setYesterdayHandler() {
    setStartDate(() => myDate('yesterday'))
    setFinishDate(() => myDate('today0'))
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
  function Tabloid() {
    if (resData === undefined || resData.length === 0)
      return <p className={styles.tips}>No data - empty result</p>

    switch (resSource) {
      case 'short': {
        return (
          <div className={styles.tableScroll}>
            <DBshortTable resData={resData} />
          </div>
        )
        break
      }
      case 'full': {
        return (
          <div className={styles.tableScroll}>
            <DBfullTable resData={resData} products={products} />
          </div>
        )
        break
      }
      case 'list': {
        return (
          <div className={styles.tableScroll}>
            <DBList resData={resData} products={products} />
          </div>
        )
        break
      }
      default: {
        return (
          <div className={styles.tableScroll}>
            <DBfullDTable resData={resData} products={products} />
          </div>
        )
      }
    }
  }
  return (
    <Layout>
      <Head>
        <title>Profit Statistics</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h1>Profit Statistics</h1>
          <Toaster />
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
          <div className={styles.dateInputGroup}>
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
          <div className={styles.tips}>
            Long period may cause tooooo wide view
          </div>
          <div className={styles.sysButtonsGroup}>
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
          <div className={styles.orangeButtonsGroup}>
            <div className={styles.flexRowContainer}>
              <button onClick={show_S_Handler}>Total S</button>
              <button onClick={show_X_Handler}>Total X</button>
              <button onClick={show_SX_Handler}>Total S + X</button>
              <button onClick={show_S_Full_Handler}>S / days</button>
              <button onClick={show_X_Full_Handler}>X / days</button>
              <button onClick={show_SX_Full_Handler}>S + X / days</button>
              <button onClick={show_CS_Full_Handler}>Sells / Customers</button>
              <button onClick={show_C_History_Handler}>Customer History</button>
            </div>
          </div>
          <Tabloid />
        </div>
      </main>
    </Layout>
  )
}

export default Home
