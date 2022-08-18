import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
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
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

export type apiBody = {
  mode: string
  startDate: string
  finishDate: string
  currentCustomer?: Customer
}

const Home: NextPage = () => {
  const c = useContext(AppContext)
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
    Init(setCustomers, 'customers', c.u)
    Init(setProducts, 'products', c.u)
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
      dbPrefix: c.u,
      startDate: startDate,
      finishDate: finishDate,
      currentCustomer: currentCustomer
    }
    fetch_Handler(body)
  }

  function show_X_Handler() {
    const body = {
      mode: 'show_X',
      dbPrefix: c.u,
      startDate: startDate,
      finishDate: finishDate
    }
    fetch_Handler(body)
  }

  function show_SX_Handler() {
    const body = {
      mode: 'show_SX',
      dbPrefix: c.u,
      startDate: startDate,
      finishDate: finishDate,
      currentCustomer: currentCustomer
    }
    fetch_Handler(body)
  }

  function show_S_Full_Handler() {
    const body = {
      mode: 'show_S_Full',
      dbPrefix: c.u,
      startDate: startDate,
      finishDate: finishDate
    }
    fetch_Handler(body)
  }

  function show_X_Full_Handler() {
    const body = {
      mode: 'show_X_Full',
      dbPrefix: c.u,
      startDate: startDate,
      finishDate: finishDate
    }
    fetch_Handler(body)
  }

  function show_SX_Full_Handler() {
    const body = {
      mode: 'show_SX_Full',
      dbPrefix: c.u,
      startDate: startDate,
      finishDate: finishDate
    }
    fetch_Handler(body)
  }

  function show_CS_All_Full_Handler() {
    const body = {
      mode: 'show_CS_All_Full',
      dbPrefix: c.u,
      startDate: startDate,
      finishDate: finishDate
    }
    fetch_Handler(body)
  }

  function show_CS_Full_Handler() {
    if (currentCustomer.id === 0) {
      alert('Choose Customer!')
    } else {
      const body = {
        mode: 'show_CS_Full',
        dbPrefix: c.u,
        startDate: startDate,
        finishDate: finishDate,
        currentCustomer: currentCustomer
      }
      fetch_Handler(body)
    }
  }

  function show_C_History_Handler() {
    if (currentCustomer.id === 0) {
      alert('Choose Customer!')
    } else {
      const body = {
        mode: 'show_C_History',
        dbPrefix: c.u,
        startDate: startDate,
        finishDate: finishDate,
        currentCustomer: currentCustomer
      }
      fetch_Handler(body)
    }
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
    setStartDate(() => myDate('yesterday0'))
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
  function Tabloid() {
    if (resData === undefined || resData.length === 0)
      return <p className={styles.tips}>{c.t.db_empty}</p>

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
    <>
      <Head>
        <title>{c.t.statTitle}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <Toaster />
          <h1>{c.t.statTitle}</h1>
          <div className={styles.tips}>
            <br />
            <br />
            <br />
            <br />
            {c.t.customer}:
          </div>
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
              pattern="^20\d\d[\.\-\/][01]\d[\.\-\/][0123]\d[\d\s:]{0,7}$"
              value={startDate}
              onChange={(event) => startDateChangeHandler(event.target.value)}
            />
            {':'}
            <input
              type="text"
              placeholder="Finish date"
              pattern="^20\d\d[\.\-\/][01]\d[\.\-\/][0123]\d[\d\s:]{0,7}$"
              value={finishDate}
              onChange={(event) => finishDateChangeHandler(event.target.value)}
            />
          </div>
          <div className={styles.tips}>{c.t.toooWide}</div>
          <div className={styles.sysButtonsGroup}>
            <div className={styles.flexRowContainer}>
              <button onClick={setTodayHandler}>{c.t.today}</button>
              <button onClick={setYesterdayHandler}>{c.t.yesterday}</button>
              <button onClick={setWeekHandler}>{c.t.week}</button>
              <button onClick={setThisMonthHandler}>{c.t.thisMonth}</button>
              <button onClick={setFullMonthHandler}>{c.t.fullMonth}</button>
              <button onClick={setThisYearHandler}>{c.t.thisYear}</button>
              <button onClick={setFullYearHandler}>{c.t.fullYear}</button>
              <button onClick={setAllHandler}>{c.t.all}</button>
            </div>
          </div>
          <div className={styles.orangeButtonsGroup}>
            <div className={styles.flexColumnContainer}>
              <div className={styles.flexRowContainer}>
                <button onClick={show_S_Handler}>{c.t.total_S}</button>
                <button onClick={show_X_Handler}>{c.t.total_X}</button>
                <button onClick={show_SX_Handler}>{c.t.total_SX}</button>
                <button onClick={show_S_Full_Handler}>{c.t.S_days}</button>
                <button onClick={show_X_Full_Handler}>{c.t.X_days}</button>
                <button onClick={show_SX_Full_Handler}>{c.t.SX_days}</button>
              </div>
              <div className={styles.flexRowContainer}>
                <button onClick={show_CS_All_Full_Handler}>
                  {c.t.sellsByCustAll}
                </button>
                <button onClick={show_CS_Full_Handler}>
                  {c.t.sellsByCust}
                </button>
                <button onClick={show_C_History_Handler}>
                  {c.t.custHistory}
                </button>
              </div>
            </div>
          </div>
          <Tabloid />
        </div>
      </main>
    </>
  )
}

export default Home
