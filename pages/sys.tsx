import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { useState } from 'react'
import DBresultTable from '../components/DBresultTable'

const Home: NextPage = () => {
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [timeZone, setTimeZone] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [product, setProduct] = useState('')
  const [pSymbol, setPsymbol] = useState('')
  const [resData, setResData] = useState([
    { sid: 0, sdate: '2022-02-02', cust: 0, prod: 0, sum: 0 }
  ])

  function clearUsersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Users' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-U-reset error - ', error.message)
      )
  }
  function clearCustomersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Customers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-C-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-C-reset error - ', error.message)
      )
  }

  function clearSalesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-S-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-S-reset error - ', error.message)
      )
  }

  function clearXpensesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Xpenses' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-X-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-X-reset error - ', error.message)
      )
  }

  function clearProductHandler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Prod' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-P-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-P-reset error - ', error.message)
      )
  }

  function dropUsersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Users' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-U-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-C-drop error - ', error.message))
  }
  function dropCustomersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Customers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-C-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-C-drop error - ', error.message))
  }

  function dropSalesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-S-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-S-drop error - ', error.message))
  }

  function dropXpensesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Xpenses' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-X-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-X-drop error - ', error.message))
  }

  function dropProductHandler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Prod' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-P-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-P-drop error - ', error.message))
  }

  function restoreSalesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'restSales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restSales = OK', res)
      })
      .catch((error) => console.log('! SYS: restSales error - ', error.message))
  }

  function restoreXpensesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'restXpenses' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restXpenses = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: restXpenses error - ', error.message)
      )
  }

  function restoreUsersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'restUsers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restUsers = OK', res)
      })
      .catch((error) => console.log('! SYS: restUsers error - ', error.message))
  }

  function restoreCustHandler() {
    fetch('/api/sys', { method: 'POST', body: 'restCust' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restCust = OK', res)
      })
      .catch((error) => console.log('! SYS: restCust error - ', error.message))
  }

  function restoreProductHandler() {
    fetch('/api/sys', { method: 'POST', body: 'restProd' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restProd = OK', res)
      })
      .catch((error) => console.log('! SYS: restProd error - ', error.message))
  }

  function showTablesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showTables' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showTables = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: showTables error - ', error.message)
      )
  }

  function showUsersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showUsers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showUsers = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) => console.log('! SYS: showUsers error - ', error.message))
  }

  function showCustomersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showCustomers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showCustomers = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: showCustomers error - ', error.message)
      )
  }

  function showSalesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showSales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showSales = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) => console.log('! SYS: showSales error - ', error.message))
  }

  function showXpensesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showXpenses' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showXpenses = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: showXpenses error - ', error.message)
      )
  }

  function showProductsHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showProds' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showProds = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) => console.log('! SYS: showProds error - ', error.message))
  }

  function inputUserChangeHandler(userName: string) {
    setUserName(userName.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, ''))
  }
  function inputPhoneChangeHandler(userPhone: string) {
    setUserPhone(userPhone.replace(/[^\d\-\+\s]/g, ''))
  }
  function inputTimeZoneChangeHandler(timeZone: string) {
    setTimeZone(timeZone.replace(/[^\d\-\+]/g, ''))
  }

  function addUserHandler() {
    const user = { uname: userName, uphone: userPhone, timezone: timeZone }
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: addUser = OK', res)
        setUserName('')
        setUserPhone('')
        setTimeZone('')
      })
      .catch((error) => console.log('! SYS: addUser error - ', error.message))
  }

  function inputCustomerNameChangeHandler(customerName: string) {
    setCustomerName(customerName.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, ''))
  }

  function inputCustomerPhoneChangeHandler(customerPhone: string) {
    setCustomerPhone(customerPhone.replace(/[^\d\-\+\s]/g, ''))
  }

  function addCustomerHandler() {
    const user = { cname: customerName, cphone: customerPhone }
    fetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: addCustomer = OK', res)
        setCustomerName('')
        setCustomerPhone('')
      })
      .catch((error) =>
        console.log('! SYS: addCustomer error - ', error.message)
      )
  }

  function inputProductChangeHandler(pText: string) {
    setProduct(pText.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }

  function inputPsymbolChangeHandler(pSymbol: string) {
    setPsymbol(pSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }

  function addProductHandler() {
    const prod = { ptext: product, psymbol: pSymbol }
    fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(prod)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: addProduct = OK', res)
        setProduct('')
        setPsymbol('')
      })
      .catch((error) =>
        console.log('! SYS: addProduct error - ', error.message)
      )
  }

  function fillSalesHandler() {
    fetch('/api/sys2-fill', { method: 'POST', body: 'fill_Sales' }) // sys2-fill
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-S-fill = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-S-fill error - ', error.message))
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>System page</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.sysButtons}>
            <input
              id="userInput"
              value={userName}
              onChange={(event) => inputUserChangeHandler(event.target.value)}
              placeholder="USER first, last name"
              pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
              className={styles.userInput}
            />
            <input
              id="userPhoneInput"
              value={userPhone}
              onChange={(event) => inputPhoneChangeHandler(event.target.value)}
              placeholder="+x xxx xxx xxxx, xxxx"
              pattern="^\+?[\d\s\-]{0,20}"
              className={styles.userInput}
            />
            <input
              id="userTimeZoneInput"
              value={timeZone}
              onChange={(event) =>
                inputTimeZoneChangeHandler(event.target.value)
              }
              placeholder="UTC"
              pattern="^[\+\-]?\d[012]?$"
              className={styles.tzInput}
            />
            <button onClick={addUserHandler}> + add USER + </button>
          </div>
          <div className={styles.sysButtons}>
            <input
              id="customerInput"
              value={customerName}
              onChange={(event) =>
                inputCustomerNameChangeHandler(event.target.value)
              }
              placeholder="CUSTOMER first, last name"
              pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
              className={styles.userInput}
            />
            <input
              id="customerPhoneInput"
              value={customerPhone}
              onChange={(event) =>
                inputCustomerPhoneChangeHandler(event.target.value)
              }
              placeholder="+x xxx xxx xxxx"
              pattern="^\+?[\d\s\-]{0,20}"
              className={styles.userInput}
            />
            <button onClick={addCustomerHandler}> + add CUST + </button>
          </div>
          <div className={styles.sysButtons}>
            <input
              id="prodInput"
              value={product}
              onChange={(event) =>
                inputProductChangeHandler(event.target.value)
              }
              placeholder="Product description"
              pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
              className={styles.userInput}
            />
            <input
              id="pSymbolInput"
              value={pSymbol}
              onChange={(event) =>
                inputPsymbolChangeHandler(event.target.value)
              }
              placeholder="up to 7 symbols"
              pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
              className={styles.userInput}
            />
            <button onClick={addProductHandler}> + add Product </button>
          </div>
          <div>- - - - - - - - - - - - - -</div>
          <div className={styles.sysButtons}>
            <button onClick={clearUsersHandler}>! clear U</button>
            <button onClick={clearCustomersHandler}>! clear C</button>
            <button onClick={clearProductHandler}>! clear P</button>
            <button onClick={clearSalesHandler}>! clear S</button>
            <button onClick={clearXpensesHandler}>! clear X</button>
          </div>
          <div className={styles.sysButtons}>
            <button onClick={dropUsersHandler}>! drop U</button>
            <button onClick={dropCustomersHandler}>! drop C</button>
            <button onClick={dropProductHandler}>! drop P</button>
            <button onClick={dropSalesHandler}>! drop S</button>
            <button onClick={dropXpensesHandler}>! drop X</button>
          </div>
          <div className={styles.sysButtons}>
            <button onClick={restoreUsersHandler}>restore U</button>
            <button onClick={restoreCustHandler}>restore C</button>
            <button onClick={restoreProductHandler}>restore P</button>
            <button onClick={restoreSalesHandler}>restore S</button>
            <button onClick={restoreXpensesHandler}>restore X</button>
          </div>
          <div>- - - - - - - - - - - - - -</div>
          <div className={styles.blueButtons}>
            <Link href="/users">
              <button>go Users</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/customers">
              <button>go Customers</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/products">
              <button>go Products</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/expenses">
              <button>go Xpenses</button>
            </Link>{' '}
          </div>
          <div>- - - - - - - - - - - - - -</div>
          <div className={styles.orangeButtons}>
            <button onClick={showUsersHandler}>show U</button>
            <button onClick={showCustomersHandler}>show C</button>
            <button onClick={showProductsHandler}>show P</button>
            <button onClick={showSalesHandler}>show S</button>
            <button onClick={showXpensesHandler}>show X</button>
          </div>
          <div className={styles.sysButtons}>
            <button onClick={showTablesHandler}>SHOW TABLES</button>
          </div>
          {resData === undefined || resData.length === 0 ? (
            <p>No data - empty result</p>
          ) : (
            <DBresultTable resData={resData} />
          )}
          <p>.</p>
          <div>- - - - - - - - - - - - - -</div>
          <p>.</p>
          <div className={styles.sysButtons}>
            <button onClick={fillSalesHandler}>! FILL sales !</button>
            &nbsp;{' '}
            <Link href="/sys-sql">
              <button>- SQL -</button>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
