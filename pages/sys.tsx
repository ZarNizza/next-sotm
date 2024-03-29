import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import DBshortTable from '../components/DBshortTable'
import toast, { Toaster } from 'react-hot-toast'
import { Customer, Product, Sale } from './plus'
import { Eitem, Xpense } from './minus'
import { User } from './editUsers'
import Init from '../components/Init'
import InitNewDB from '../components/InitNewDB'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

const Home: NextPage = () => {
  const c = useContext(AppContext)
  const [itemsC, setItemsC] = useState<Customer[]>([])
  const [itemsU, setItemsU] = useState<User[]>([])
  const [itemsS, setItemsS] = useState<Sale[]>([])
  const [itemsP, setItemsP] = useState<Product[]>([])
  const [itemsE, setItemsE] = useState<Eitem[]>([])
  const [itemsX, setItemsX] = useState<Xpense[]>([])
  const [resData, setResData] = useState([
    { id: 0, date: '2022-02-02', cust: 0, prod: 0, sum: 0 }
  ])

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

  function index_U_handler() {
    sys_handler('index_Users')
  }

  function index_C_handler() {
    sys_handler('index_Customers')
  }

  function index_S_handler() {
    sys_handler('index_Sales')
  }

  function index_X_handler() {
    sys_handler('index_Xpenses')
  }

  function repair_id_U_handler() {
    sys_handler('repair_id_Users')
  }

  function repair_id_C_handler() {
    sys_handler('repair_id_Customers')
  }

  function repair_id_P_handler() {
    sys_handler('repair_id_Products')
  }

  function repair_id_S_handler() {
    sys_handler('repair_id_Sales')
  }

  function repair_id_X_handler() {
    sys_handler('repair_id_Xpenses')
  }

  function repair_id_E_handler() {
    sys_handler('repair_id_Eitems')
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

  function dropLS_handler() {
    console.log('LS DROP')
    try {
      localStorage.removeItem(c.u + 'customers')
      localStorage.removeItem(c.u + 'products')
      localStorage.removeItem(c.u + 'eitems')
      localStorage.removeItem(c.u + 'sales')
      localStorage.removeItem(c.u + 'xpenses')
    } catch {
      console.log('LS DROP FAULT')
    }
  }

  function updateLS_handler() {
    console.log('LS UPDATE started')
    const toast01 = toast.loading('Updating...')
    Init(setItemsC, 'customers', c.u, true)
    Init(setItemsU, 'users', c.u, true)
    Init(setItemsS, 'sales', c.u, true)
    Init(setItemsP, 'products', c.u, true)
    Init(setItemsE, 'eitems', c.u, true)
    Init(setItemsX, 'xpenses', c.u, true)
    toast.remove()
  }

  function reInitNewDB_handler() {
    InitNewDB(c.u)
  }
  /////////////////////////////////////////////////////

  function sys_handler(mode: string) {
    if (!confirm('... Sure?')) return

    const toast01 = toast.loading('Loading...')
    fetch('/api/sys', {
      method: 'POST',
      body: JSON.stringify({
        mode: mode,
        dbPrefix: c.u
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.remove()
          toast.error('!Loading error: X3')
          alert('SYS: ' + res.error)
        } else {
          console.log('SYS -', mode, ': ', res.data)
          toast.remove()
        }
        if (res.data !== undefined && res.data !== 'OK')
          setResData(() => res.data)
      })
      .catch((error) => {
        toast.remove()
        toast.error('!Loading error: X3')
        alert('! SYS ' + mode + ' error - ' + error.message)
      })
  }

  return (
    <>
      <Head>
        <title>System page</title>
      </Head>
      <main className={styles.main}>
        <h1>SYSTEM</h1>
        <p>{!!c.u ? c.u : '- not logged -'}</p>
        <Toaster />
        <div className={styles.flexColumnContainer}>
          <div className={styles.sysButtonsGroup}>
            <button onClick={drop_U_handler}>! drop U</button>
            <button onClick={drop_C_handler}>! drop C</button>
            <button onClick={drop_P_handler}>! drop P</button>
            <button onClick={drop_S_handler}>! drop S</button>
            <button onClick={drop_X_handler}>! drop X</button>
            <button onClick={drop_E_handler}>! drop E</button>
          </div>
          <div className={styles.sysButtonsGroup}>
            <button onClick={restore_U_handler}>restore U</button>
            <button onClick={restore_C_handler}>restore C</button>
            <button onClick={restore_P_handler}>restore P</button>
            <button onClick={restore_S_handler}>restore S</button>
            <button onClick={restore_X_handler}>restore X</button>
            <button onClick={restore_E_handler}>restore E</button>
          </div>
          <div className={styles.sysButtonsGroup}>
            <button onClick={index_U_handler}>index U</button>
            <button onClick={index_C_handler}>index C</button>
            <button> - </button>
            <button onClick={index_S_handler}>index S</button>
            <button onClick={index_X_handler}>index X</button>
            <button> - </button>
          </div>
          <div className={styles.sysButtonsGroup}>
            <button onClick={repair_id_U_handler}>re_id U</button>
            <button onClick={repair_id_C_handler}>re_id C</button>
            <button onClick={repair_id_P_handler}>re_id P</button>
            <button onClick={repair_id_S_handler}>re_id S</button>
            <button onClick={repair_id_X_handler}>re_id X</button>
            <button onClick={repair_id_E_handler}>re_id E</button>
          </div>
          <div className={styles.orangeButtonsGroup}>
            <button onClick={show_U_handler}>show U</button>
            <button onClick={show_C_handler}>show C</button>
            <button onClick={show_P_handler}>show P</button>
            <button onClick={show_S_handler}>show S</button>
            <button onClick={show_X_handler}>show X</button>
            <button onClick={show_E_handler}>show E</button>
          </div>
          <div className={styles.sysButtonsGroup}>
            <button className={styles.sysButton} onClick={reInitNewDB_handler}>
              reInit NewDB
            </button>
            <button className={styles.sysButton} onClick={dropLS_handler}>
              Drop LocalStorage
            </button>
            <button className={styles.sysButton} onClick={updateLS_handler}>
              Update LocalStorage
            </button>
            <button onClick={show_Tables_handler}>TABLES LIST</button>
            <Link href="/sys-sql" passHref>
              <button>- SQL -</button>
            </Link>
          </div>
          <div className={styles.tableScroll}>
            {resData === undefined || resData.length === 0 ? (
              <p>No data - empty result</p>
            ) : (
              <DBshortTable resData={resData} />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
