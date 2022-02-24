import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { Sale, Product, Customer } from './add'
import DBshortTable from '../components/DBshortTable'
import DBfullTable from '../components/DBfullTable'
import DBfullDTable from '../components/DBfullDTable'
import InitCustomers from '../components/initCustomers'
import InitProducts from '../components/initProducts'
import CustomerSelect from '../components/CustomerSelect'

type apiBody = {
  mode: string
  startDate: string
  finishDate: string
  currentCustomer?: Customer
}

const Home: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer>({
    cid: 0,
    cname: '',
    cphone: '',
    gooid: ''
  })
  InitCustomers(setCustomers)
  const [products, setProducts] = useState<Product[]>([])
  InitProducts(setProducts)

  const [resData, setResData] = useState<Sale[]>([
    // { sid: 0, sdate: '2022-02-02', cust: 0, prod: 0, sum: 0 }
  ])
  const [resSource, setResSource] = useState('')
  const [startDate, setStartDate] = useState(myDate('today'))
  const [finishDate, setFinishDate] = useState(myDate('today'))

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

  function myDate(mark: string) {
    const today = new Date()
    let myDate = today
    switch (mark) {
      case 'today':
        break
      case '0W':
        myDate.setDate(today.getDate() - 6)
        break
      case '0M':
        myDate.setDate(1)
        break
      case 'FM':
        myDate.setMonth(today.getMonth() - 1)
        break
      case '0Y':
        myDate.setDate(1)
        myDate.setMonth(0)
        break
      case 'FY':
        myDate.setFullYear(today.getFullYear() - 1)
        break
      case '0':
        myDate.setFullYear(2000)
        myDate.setMonth(0)
        myDate.setDate(1)
        break
      case 'all':
        myDate.setFullYear(2099)
        myDate.setMonth(11)
        myDate.setDate(31)
        break
      default:
        break
    }

    let resultDate = String(myDate.getFullYear()) + '-'
    if (myDate.getMonth() < 9) resultDate += '0'
    resultDate += String(myDate.getMonth() + 1) + '-'

    if (myDate.getDate() < 10) resultDate += '0'
    resultDate += String(myDate.getDate())
    return resultDate
  }

  function setTodayHandler() {
    setStartDate(() => myDate('today'))
    setFinishDate(() => myDate('today'))
  }
  function setWeekHandler() {
    setStartDate(() => myDate('0W'))
    setFinishDate(() => myDate('today'))
  }
  function setThisMonthHandler() {
    alert('! Attention !\nLong period may cause too wide view')
    setStartDate(() => myDate('0M'))
    setFinishDate(() => myDate('today'))
  }
  function setFullMonthHandler() {
    alert('! Attention !\nLong period may cause too wide view')
    setStartDate(() => myDate('FM'))
    setFinishDate(() => myDate('today'))
  }
  function setThisYearHandler() {
    alert('! Attention !\nLong period may cause too wide view')
    setStartDate(() => myDate('0Y'))
    setFinishDate(() => myDate('today'))
  }
  function setFullYearHandler() {
    alert('! Attention !\nLong period may cause too wide view')
    setStartDate(() => myDate('FY'))
    setFinishDate(() => myDate('today'))
  }
  function setAllHandler() {
    alert('! Attention !\nLong period may cause too wide view')
    setStartDate(() => myDate('0'))
    setFinishDate(() => myDate('today'))
  }

  return (
    <Layout>
      <Head>
        <title>Statistics</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <CustomerSelect
            customers={customers}
            setCurrentCustomer={setCurrentCustomer}
            currentCustomer={currentCustomer}
            setCustomers={setCustomers}
            mode="stat"
          />
          <div className={styles.sysButtons}>
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
          <div className={styles.gray}>Long period may cause too wide view</div>
          <div className={styles.miniButtons}>
            <button onClick={setTodayHandler}>today</button>
            <button onClick={setWeekHandler}>Week</button>
            <button onClick={setThisMonthHandler}>this Month</button>
            <button onClick={setFullMonthHandler}>Full Month</button>
            <button onClick={setThisYearHandler}>this Year</button>
            <button onClick={setFullYearHandler}>Full Year</button>
            <button onClick={setAllHandler}>All</button>
          </div>
          <div className={styles.orangeButtons}>
            <button onClick={show_S_Handler}>Total S</button>
            <button onClick={show_X_Handler}>Total X</button>
            <button onClick={show_SX_Handler}>Total S + X</button>
            <button onClick={show_S_Full_Handler}>S by days</button>
            <button onClick={show_SX_Full_Handler}>S + X by days</button>
            <button onClick={show_CS_Full_Handler}>Sells by Customer</button>
          </div>
          {resData === undefined || resData.length === 0 ? (
            <p className={styles.gray}>No data - empty result</p>
          ) : resSource === 'short' ? (
            <DBshortTable resData={resData} />
          ) : resSource === 'full' ? (
            <DBfullTable resData={resData} products={products} />
          ) : (
            <DBfullDTable resData={resData} products={products} />
          )}
        </div>
      </main>
    </Layout>
  )
}

export default Home
