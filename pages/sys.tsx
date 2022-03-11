import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { useState } from 'react'
import DBshortTable from '../components/DBshortTable'

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
    sys_handler('clear_Users')
  }
  function clear_C_handler() {
    sys_handler('clear_Customers')
  }

  function clear_P_handler() {
    sys_handler('clear_Products')
  }

  function clear_S_handler() {
    sys_handler('clear_Sales')
  }

  function clear_X_handler() {
    sys_handler('clear_Xpenses')
  }

  function clear_E_handler() {
    sys_handler('clear_Eitems')
  }

  function drop_U_handler() {
    sys_handler('drop_Users')
  }

  function drop_C_handler() {
    sys_handler('drop_Customers')
  }

  function drop_P_handler() {
    sys_handler('drop_Products')
  }

  function drop_S_handler() {
    sys_handler('drop_Sales')
  }

  function drop_X_handler() {
    sys_handler('drop_Xpenses')
  }

  function drop_E_handler() {
    sys_handler('drop_Eitems')
  }

  function restore_U_handler() {
    sys_handler('restore_Users')
  }

  function restore_C_handler() {
    sys_handler('restore_Customers')
  }

  function restore_P_handler() {
    sys_handler('restore_Products')
  }

  function restore_S_handler() {
    sys_handler('restore_Sales')
  }

  function restore_X_handler() {
    sys_handler('restore_Xpenses')
  }

  function restore_E_handler() {
    sys_handler('restore_Eitems')
  }

  function show_Tables_handler() {
    sys_handler('show_Tables')
  }

  function show_U_handler() {
    sys_handler('show_Users')
  }

  function show_C_handler() {
    sys_handler('show_Customers')
  }

  function show_P_handler() {
    sys_handler('show_Products')
  }
  function show_S_handler() {
    sys_handler('show_Sales')
  }

  function show_X_handler() {
    sys_handler('show_Xpenses')
  }

  function show_E_handler() {
    sys_handler('show_Eitems')
  }

  //  add User

  function add_U_handler() {
    const user = { uname: userName, uphone: userPhone, timezone: timeZone }
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('SYS: addUser ERROR: ' + res.error)
        } else {
          console.log('SYS: addUser = OK', res)
          setUserName('')
          setUserPhone('')
          setTimeZone('')
        }
      })
      .catch((error) => alert('! SYS: addUser error - ' + error.message))
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

  //  add Customer

  function add_C_handler() {
    const cust = { mode: 'new', cname: customerName, cphone: customerPhone }
    fetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify(cust)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('SYS: addCustomer ERROR: ' + res.error)
        } else {
          console.log('SYS: addCustomer = OK', res)
          setCustomerName('')
          setCustomerPhone('')
        }
      })
      .catch((error) => alert('! SYS: addCustomer error - ' + error.message))
  }
  function input_C_Name_ChHandler(customerName: string) {
    setCustomerName(customerName.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, ''))
  }
  function input_C_Phone_ChHandler(customerPhone: string) {
    setCustomerPhone(customerPhone.replace(/[^\d\-\+\s]/g, ''))
  }

  //  add Product

  function add_P_handler() {
    const prod = { mode: 'new', ptext: product, psymbol: pSymbol }
    fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(prod)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('SYS: addProduct ERROR: ' + res.error)
        } else {
          console.log('SYS: addProduct = OK', res)
          setProduct('')
          setPsymbol('')
        }
      })
      .catch((error) => alert('! SYS: addProduct error - ' + error.message))
  }
  function input_P_ChHandler(pText: string) {
    setProduct(pText.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:]/gi, ''))
  }
  function input_Psymbol_ChHandler(pSymbol: string) {
    setPsymbol(pSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi, ''))
  }

  //  add ExpeneItem

  function add_E_handler() {
    const eitem = { mode: 'new', ename: eItem, esymbol: eSymbol }
    fetch('/api/eitems', {
      method: 'POST',
      body: JSON.stringify(eitem)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('SYS: addEitem ERROR: ' + res.error)
        } else {
          console.log('SYS: addEitem = OK', res)
          setEitem('')
          setEsymbol('')
        }
      })
      .catch((error) => alert('! SYS: addEitem error - ' + error.message))
  }
  function input_E_ChHandler(eName: string) {
    setEitem(eName.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:]/gi, ''))
  }
  function input_Esymbol_ChHandler(eSymbol: string) {
    setEsymbol(eSymbol.replace(/[^a-zA-Zа-яА-Я\d\s\-\.\,\:\_]/gi, ''))
  }

  //  fill Sales

  function fill_S_handler() {
    fetch('/api/sys_fill_S', { method: 'POST', body: 'fill_S' }) // sys_fill_S
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('SYS: DB_S_fill ERROR: ' + res.error)
        } else {
          console.log('SYS: DB_S_fill = OK', res.data)
        }
      })
      .catch((error) => alert('! SYS: DB_S_fill error - ' + error.message))
  }

  function fill_X_handler() {
    fetch('/api/sys_fill_X', { method: 'POST', body: 'fill_X' }) // sys_fill_X
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('SYS: DB_X_fill ERROR: ' + res.error)
        } else {
          console.log('SYS: DB_X_fill = OK', res.data)
        }
      })
      .catch((error) => alert('! SYS: DB_X_fill error - ' + error.message))
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function sys_handler(title: string) {
    fetch('/api/sys', { method: 'POST', body: title })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('SYS: ' + res.error)
        } else {
          console.log('SYS OK: ', res.data)
        }
        if (res.data !== undefined && res.data !== 'OK')
          setResData(() => res.data)
      })
      .catch((error) => alert('! SYS ' + title + ' error - ' + error.message))
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
              pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
              className={styles.userInput}
            />
            <input
              id="pSymbolInput"
              value={pSymbol}
              onChange={(event) => input_Psymbol_ChHandler(event.target.value)}
              placeholder="up to 7 symbols"
              pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
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
              pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
              className={styles.userInput}
            />
            <input
              id="eSymbolInput"
              value={eSymbol}
              onChange={(event) => input_Esymbol_ChHandler(event.target.value)}
              placeholder="up to 7 symbols"
              pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
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
            <Link href="/editUsers" passHref>
              <button>edit Users</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/editCustomers" passHref>
              <button>edit Customers</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/editProducts" passHref>
              <button>edit Products</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/editSales" passHref>
              <button>edit Sales</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/editEitems" passHref>
              <button>edit ExpenseItems</button>
            </Link>{' '}
            &nbsp;{' '}
            <Link href="/editXpenses" passHref>
              <button>edit Xpenses</button>
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
            <DBshortTable resData={resData} />
          )}
          <p>.</p>
          <div>- - - - - - - - - - - - - -</div>
          <p>.</p>
          <div className={styles.sysButtons}>
            <button onClick={fill_S_handler}>! fill S !</button>
            &nbsp; <button onClick={fill_X_handler}>! fill X !</button>
            &nbsp;{' '}
            <Link href="/sys-sql" passHref>
              <button>- SQL -</button>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
