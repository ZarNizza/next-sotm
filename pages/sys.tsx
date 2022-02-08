import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { useState } from 'react'
import DBresultTable from '../components/DBresultTable'

const Home: NextPage = () => {
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
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
        console.log('SYS: DB-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-C-reset error - ', error.message)
      )
  }

  function clearSalesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-S-reset error - ', error.message)
      )
  }

  function clearProductHandler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Prod' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-reset = OK', res)
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

  function dropProductHandler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Prod' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-P-drop = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-PROD-DROP error - ', error.message)
      )
  }

  function restoreSalesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'restSales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restSales = OK', res)
      })
      .catch((error) => console.log('! SYS: restSales error - ', error.message))
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
      .catch((error) => console.log('! SYS: showCustomers error - ', error.message))
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
    setUserName(userName)
  }

  function inputPhoneChangeHandler(userPhone: string) {
    setUserPhone(userPhone)
  }

  function addUserHandler() {
    const user = { cname: userName, cphone: userPhone }
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: addUser = OK', res)
        setUserName('')
        setUserPhone('')
      })
      .catch((error) => console.log('! SYS: addUser error - ', error.message))
  }

  function inputCustomerNameChangeHandler(customerName: string) {
    setCustomerName(customerName)
  }

  function inputCustomerPhoneChangeHandler(customerPhone: string) {
    setCustomerPhone(customerPhone)
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
        setUserName('')
        setUserPhone('')
      })
      .catch((error) =>
        console.log('! SYS: addCustomer error - ', error.message)
      )
  }

  function inputProductChangeHandler(product: string) {
    setProduct(product)
  }

  function inputPsymbolChangeHandler(pSymbol: string) {
    setPsymbol(pSymbol)
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

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>System page</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.sysButton}>
            <input
              id="userInput"
              value={userName}
              onChange={(event) => inputUserChangeHandler(event.target.value)}
              placeholder="USER first, last name"
              className={styles.userInput}
            />
            <input
              id="userPhoneInput"
              value={userPhone}
              onChange={(event) => inputPhoneChangeHandler(event.target.value)}
              placeholder="+x xxx xxx xxxx"
              className={styles.userInput}
            />
            <button onClick={addUserHandler}> + add USER + </button>
          </div>
          <div className={styles.sysButton}>
            <input
              id="customerInput"
              value={customerName}
              onChange={(event) =>
                inputCustomerNameChangeHandler(event.target.value)
              }
              placeholder="CUSTOMER first, last name"
              className={styles.userInput}
            />
            <input
              id="customerPhoneInput"
              value={customerPhone}
              onChange={(event) =>
                inputCustomerPhoneChangeHandler(event.target.value)
              }
              placeholder="+x xxx xxx xxxx"
              className={styles.userInput}
            />
            <button onClick={addCustomerHandler}> + add CUST + </button>
          </div>
          <div className={styles.sysButton}>
            <input
              id="prodInput"
              value={product}
              onChange={(event) =>
                inputProductChangeHandler(event.target.value)
              }
              placeholder="Product description"
              className={styles.userInput}
            />
            <input
              id="pSymbolInput"
              value={pSymbol}
              onChange={(event) =>
                inputPsymbolChangeHandler(event.target.value)
              }
              placeholder="up to 7 symbols"
              className={styles.userInput}
            />
            <button onClick={addProductHandler}> + add Product </button>
          </div>
          <div>.</div>
          <div>- - - - - - - - - - - - - -</div>
          <div>.</div>
          <div className={styles.sysButton}>
            <button onClick={showUsersHandler}>show USERS</button>
            <button onClick={showCustomersHandler}>show CUSTOMERS</button>
            <button onClick={showProductsHandler}>show PRODUCT</button>
            <button onClick={showSalesHandler}>show SALES</button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={showTablesHandler}>SHOW TABLES</button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={restoreUsersHandler}>
              restore USERS table
            </button>{' '}
            <button onClick={restoreCustHandler}>
              restore CUSTOMERS table
            </button>{' '}
            <button onClick={restoreProductHandler}>
              restore PRODUCT table
            </button>{' '}
            <button onClick={restoreSalesHandler}>restore SALES table</button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={clearUsersHandler}>
              ! CLEAR users TABLE !
            </button>{' '}
          <div className={styles.sysButton}>
            <button onClick={clearCustomersHandler}>
              ! CLEAR customers TABLE !
            </button>{' '}
            <button onClick={clearProductHandler}>
              ! CLEAR product TABLE !
            </button>{' '}
            <button onClick={clearSalesHandler}>! CLEAR sales TABLE !</button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={dropUsersHandler}>! DROP users TABLE !</button>
            <button onClick={dropCustomersHandler}>! DROP customers TABLE !</button>
            <button onClick={dropProductHandler}>! DROP product TABLE !</button>
            <button onClick={dropSalesHandler}>! DROP sales TABLE !</button>
          </div>
          <div>.</div>
          <div>- - - - - - - - - - - - - -</div>
          <div>.</div>
          <div className={styles.sysButton}>
            <Link href="/users">
              <button> &lt; &lt; &lt; Customers List </button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/products">
              <button>&lt; &lt; &lt; - Products List </button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/sys2">
              <button>&lt; &lt; &lt; - SYSTEM-2 </button>
            </Link>
            <p> </p>
          </div>
          {resData === undefined || resData.length === 0 ? (
            <p>No data - empty result</p>
          ) : (
            <DBresultTable resData={resData} />
          )}
        </main>
      </div>
    </Layout>
  )
}

export default Home
