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
  const [eItem, setEitem] = useState('')
  const [eSymbol, setEsymbol] = useState('')
  const [resData, setResData] = useState([
    { sid: 0, sdate: '2022-02-02', cust: 0, prod: 0, sum: 0 }
  ])

  function clear_U_handler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Users' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-U-reset error - ', error.message)
      )
  }
  function clear_C_handler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Customers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-C-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-C-reset error - ', error.message)
      )
  }

  function clear_S_handler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-S-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-S-reset error - ', error.message)
      )
  }

  function clear_X_handler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Xpenses' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-X-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-X-reset error - ', error.message)
      )
  }

  function clear_E_handler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Eitems' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-E-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-E-reset error - ', error.message)
      )
  }

  function clear_P_handler() {
    fetch('/api/sys', { method: 'POST', body: 'clear_Products' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-P-reset = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: DB-P-reset error - ', error.message)
      )
  }

  function drop_U_handler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Users' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-U-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-C-drop error - ', error.message))
  }
  function drop_C_handler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Customers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-C-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-C-drop error - ', error.message))
  }

  function drop_S_handler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-S-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-S-drop error - ', error.message))
  }

  function drop_X_handler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Xpenses' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-X-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-X-drop error - ', error.message))
  }

  function drop_E_handler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Eitems' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-E-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-E-drop error - ', error.message))
  }

  function drop_P_handler() {
    fetch('/api/sys', { method: 'POST', body: 'drop_Products' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: DB-P-drop = OK', res)
      })
      .catch((error) => console.log('! SYS: DB-P-drop error - ', error.message))
  }

  function restore_S_handler() {
    fetch('/api/sys', { method: 'POST', body: 'restore_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restore_Sales = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: restore_Sales error - ', error.message)
      )
  }

  function restore_X_handler() {
    fetch('/api/sys', { method: 'POST', body: 'restore_Xpenses' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restore_Xpenses = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: restore_Xpenses error - ', error.message)
      )
  }

  function restore_E_handler() {
    fetch('/api/sys', { method: 'POST', body: 'restore_Eitems' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restore_Eitems = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: restore_Eitems error - ', error.message)
      )
  }

  function restore_U_handler() {
    fetch('/api/sys', { method: 'POST', body: 'restore_Users' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restore_Users = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: restore_Users error - ', error.message)
      )
  }

  function restore_C_handler() {
    fetch('/api/sys', { method: 'POST', body: 'restore_Customers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restore_Cust = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: restore_Cust error - ', error.message)
      )
  }

  function restore_P_handler() {
    fetch('/api/sys', { method: 'POST', body: 'restore_Products' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: restore_Prod = OK', res)
      })
      .catch((error) =>
        console.log('! SYS: restore_Prod error - ', error.message)
      )
  }

  //

  function show_Tables_handler() {
    fetch('/api/sys', { method: 'POST', body: 'show_Tables' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: show_Tables = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: show_Tables error - ', error.message)
      )
  }

  function show_U_handler() {
    fetch('/api/sys', { method: 'POST', body: 'show_Users' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: show_Users = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: show_Users error - ', error.message)
      )
  }

  function show_C_handler() {
    fetch('/api/sys', { method: 'POST', body: 'show_Customers' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: show_Customers = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: show_Customers error - ', error.message)
      )
  }

  function show_S_handler() {
    fetch('/api/sys', { method: 'POST', body: 'show_Sales' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: show_Sales = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: show_Sales error - ', error.message)
      )
  }

  function show_X_handler() {
    fetch('/api/sys', { method: 'POST', body: 'show_Xpenses' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: show_Xpenses = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: show_Xpenses error - ', error.message)
      )
  }

  function show_E_handler() {
    fetch('/api/sys', { method: 'POST', body: 'show_Eitems' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: show_Eitems = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: show_Eitems error - ', error.message)
      )
  }

  function show_P_handler() {
    fetch('/api/sys', { method: 'POST', body: 'show_Products' })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: show_Prods = OK', res.data)
        setResData(() => res.data)
      })
      .catch((error) =>
        console.log('! SYS: show_Prods error - ', error.message)
      )
  }
  //
  function add_U_handler() {
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
  function input_U_Name_ChHandler(userName: string) {
    setUserName(userName.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, ''))
  }
  function input_U_Phone_ChHandler(userPhone: string) {
    setUserPhone(userPhone.replace(/[^\d\-\+\s]/g, ''))
  }
  function input_TimeZone_ChHandler(timeZone: string) {
    setTimeZone(timeZone.replace(/[^\d\-\+]/g, ''))
  }
  //
  function add_C_handler() {
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
  function input_C_Name_ChHandler(customerName: string) {
    setCustomerName(customerName.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, ''))
  }
  function input_C_Phone_ChHandler(customerPhone: string) {
    setCustomerPhone(customerPhone.replace(/[^\d\-\+\s]/g, ''))
  }
  //
  function add_P_handler() {
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
  function input_P_ChHandler(pText: string) {
    setProduct(pText.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }
  function input_Psymbol_ChHandler(pSymbol: string) {
    setPsymbol(pSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }
  //
  function add_E_handler() {
    const eitem = { ename: eItem, esymbol: eSymbol }
    fetch('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(eitem)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('SYS: addEitem = OK', res)
        setEitem('')
        setEsymbol('')
      })
      .catch((error) => console.log('! SYS: addEitem error - ', error.message))
  }
  function input_E_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }
  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }
  //
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
              onChange={(event) => input_U_Name_ChHandler(event.target.value)}
              placeholder="USER first, last name"
              pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
              className={styles.userInput}
            />
            <input
              id="userPhoneInput"
              value={userPhone}
              onChange={(event) => input_U_Phone_ChHandler(event.target.value)}
              placeholder="+x xxx xxx xxxx, xxxx"
              pattern="^\+?[\d\s\-]{0,20}"
              className={styles.userInput}
            />
            <input
              id="userTimeZoneInput"
              value={timeZone}
              onChange={(event) => input_TimeZone_ChHandler(event.target.value)}
              placeholder="UTC"
              pattern="^[\+\-]?\d[012]?$"
              className={styles.tzInput}
            />
            <button onClick={add_U_handler}> + add USER + </button>
          </div>
          <div className={styles.sysButtons}>
            <input
              id="customerInput"
              value={customerName}
              onChange={(event) => input_C_Name_ChHandler(event.target.value)}
              placeholder="CUSTOMER first, last name"
              pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
              className={styles.userInput}
            />
            <input
              id="customerPhoneInput"
              value={customerPhone}
              onChange={(event) => input_C_Phone_ChHandler(event.target.value)}
              placeholder="+x xxx xxx xxxx"
              pattern="^\+?[\d\s\-]{0,20}"
              className={styles.userInput}
            />
            <button onClick={add_C_handler}> + add CUST + </button>
          </div>
          <div className={styles.sysButtons}>
            <input
              id="prodInput"
              value={product}
              onChange={(event) => input_P_ChHandler(event.target.value)}
              placeholder="Product description"
              pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
              className={styles.userInput}
            />
            <input
              id="pSymbolInput"
              value={pSymbol}
              onChange={(event) => input_Psymbol_ChHandler(event.target.value)}
              placeholder="up to 7 symbols"
              pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
              className={styles.userInput}
            />
            <button onClick={add_P_handler}> + add Product </button>
          </div>
          <div className={styles.sysButtons}>
            <input
              id="eInput"
              value={eItem}
              onChange={(event) => input_E_ChHandler(event.target.value)}
              placeholder="Expense description"
              pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
              className={styles.userInput}
            />
            <input
              id="eSymbolInput"
              value={eSymbol}
              onChange={(event) => input_Esymbol_ChHandler(event.target.value)}
              placeholder="up to 7 symbols"
              pattern="[a-zA-Zа-яА-Я\d\s\-\.,:]*"
              className={styles.userInput}
            />
            <button onClick={add_E_handler}> + add ExpItem </button>
          </div>
          <div>- - - - - - - - - - - - - -</div>
          <div className={styles.sysButtons}>
            <button onClick={clear_U_handler}>! clear U</button>
            <button onClick={clear_C_handler}>! clear C</button>
            <button onClick={clear_P_handler}>! clear P</button>
            <button onClick={clear_S_handler}>! clear S</button>
            <button onClick={clear_X_handler}>! clear X</button>
            <button onClick={clear_E_handler}>! clear E</button>
          </div>
          <div className={styles.sysButtons}>
            <button onClick={drop_U_handler}>! drop U</button>
            <button onClick={drop_C_handler}>! drop C</button>
            <button onClick={drop_P_handler}>! drop P</button>
            <button onClick={drop_S_handler}>! drop S</button>
            <button onClick={drop_X_handler}>! drop X</button>
            <button onClick={drop_E_handler}>! drop E</button>
          </div>
          <div className={styles.sysButtons}>
            <button onClick={restore_U_handler}>restore U</button>
            <button onClick={restore_C_handler}>restore C</button>
            <button onClick={restore_P_handler}>restore P</button>
            <button onClick={restore_S_handler}>restore S</button>
            <button onClick={restore_X_handler}>restore X</button>
            <button onClick={restore_E_handler}>restore E</button>
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
              <button>go ExpenseItems</button>
            </Link>{' '}
          </div>
          <div>- - - - - - - - - - - - - -</div>
          <div className={styles.orangeButtons}>
            <button onClick={show_U_handler}>show U</button>
            <button onClick={show_C_handler}>show C</button>
            <button onClick={show_P_handler}>show P</button>
            <button onClick={show_S_handler}>show S</button>
            <button onClick={show_X_handler}>show X</button>
            <button onClick={show_E_handler}>show E</button>
          </div>
          <div className={styles.sysButtons}>
            <button onClick={show_Tables_handler}>SHOW TABLES</button>
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
