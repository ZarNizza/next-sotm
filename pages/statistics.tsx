import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { Sale, Product, Customer } from './add'
// import DBresultTable from '../components/DBresultTable'
import DBstatTable from '../components/DBstatTable'
import InitCustomers from '../components/initCustomers'
import InitProducts from '../components/initProducts'
import CustomerSelect from '../components/CustomerSelect'

const Home: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<
    [Customer['cid'], Customer['cname']]
  >([0, ''])
  InitCustomers(setCustomers)
  const [products, setProducts] = useState<Product[]>([])
  InitProducts(setProducts)

  const [resData, setResData] = useState<Sale[]>([
    // { sid: 0, sdate: '2022-02-02', cust: 0, prod: 0, sum: 0 }
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
      finishDate: finishDate,
      currentCustomer: currentCustomer
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
        <title>Statistics</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          {/* <h3>Statistics page</h3> */}
          <CustomerSelect
            customers={customers}
            setCurrentCustomer={setCurrentCustomer}
            currentCustomer={currentCustomer}
          />
          <div className={styles.sysButton}>
            <input
              type="text"
              placeholder="Start date"
              // pattern="^(20\d\d\-(([0][1-9])|([1][012]))\-(([3][01])|([12]\d)|([0][1-9])))$"
              // pattern="/^20\d\d\-(([0][1-9])|([1][012]))\-(([3][01])|([12]\d)|([0][1-9]))$/"
              pattern="^20\d\d[\.\-\/][01]\d[\.\-\/][0123]\d$"
              value={startDate}
              onChange={(event) => startDateChangeHandler(event.target.value)}
            />
            {':'}
            <input
              type="text"
              placeholder="Finish date"
              // pattern="/^20\d\d\-(([0][1-9])|([01](?<=1)[012]))\-(([0123](?<=3)[01])|([123](?<=[012])\d)|([0][1-9]))$/"
              pattern="^20\d\d[\.\-\/][01]\d[\.\-\/][0123]\d$"
              value={finishDate}
              onChange={(event) => finishDateChangeHandler(event.target.value)}
            />
          </div>
          <div className={styles.miniButton}>
            <button onClick={setTodayHandler}>today</button>
            <button onClick={setThisMonthHandler}>this Month</button>
            <button onClick={setFullMonthHandler}>Full Month</button>
            <button onClick={setThisYearHandler}>this Year</button>
            <button onClick={setFullYearHandler}>Full Year</button>
            <button onClick={setAllHandler}>All</button>
          </div>
          <div className={styles.orangeButton}>
            <button onClick={showSalesHandler}>show Sales</button>
            <button onClick={showFullSalesHandler}>show Statistic</button>
          </div>
          {resData === undefined || resData.length === 0 ? (
            <p>No data - empty result</p>
          ) : (
            // <DBresultTable resData={resData} />
            <DBstatTable resData={resData} products={products} />
          )}
        </div>
      </main>
    </Layout>
  )
}

export default Home
