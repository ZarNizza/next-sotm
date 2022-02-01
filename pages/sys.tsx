import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { useState } from 'react'

const Home: NextPage = () => {
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [product, setProduct] = useState('')
  const [pSymbol, setPsymbol] = useState('')

  function clearUsersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Users' })
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
  function restoreSalesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'restSales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restSales = OK', res)
      })
      .catch((error) => console.log('! SYS: restSales error - ', error.message))
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
        console.log('SYS: showTables = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: showTables error - ', error.message)
      )
  }
  function showUsersHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showUsers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showUsers = OK', res)
      })
      .catch((error) => console.log('! SYS: showUsers error - ', error.message))
  }
  function showSalesHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showSales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showSales = OK', res)
      })
      .catch((error) => console.log('! SYS: showSales error - ', error.message))
  }
  function showProductsHandler() {
    fetch('/api/sys', { method: 'POST', body: 'showProds' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: showProds = OK', res)
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
              placeholder="First, last name"
              className={styles.userInput}
            />
            <input
              id="userPhoneInput"
              value={userPhone}
              onChange={(event) => inputPhoneChangeHandler(event.target.value)}
              placeholder="+x xxx xxx xxxx"
              className={styles.userInput}
            />
            <button onClick={addUserHandler}> + Add User + </button>
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
            <button onClick={addProductHandler}> Add Product </button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={showUsersHandler}>SHOW customers</button>{' '}
            <button onClick={showProductsHandler}>SHOW products</button>{' '}
            <button onClick={showSalesHandler}>SHOW sales</button>{' '}
          </div>
          <div className={styles.sysButton}>
            <button onClick={showTablesHandler}>SHOW TABLES</button>{' '}
          </div>
          <div className={styles.sysButton}>
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
              ! CLEAR customers TABLE !
            </button>{' '}
            <button onClick={clearProductHandler}>
              ! CLEAR product TABLE !
            </button>{' '}
            <button onClick={clearSalesHandler}>! CLEAR sales TABLE !</button>
          </div>
        </main>
        <Link href="/users"> - Customers List - </Link>{' '}
        <Link href="/products"> - Products List - </Link>
        <p> </p>
      </div>
    </Layout>
  )
}

export default Home
