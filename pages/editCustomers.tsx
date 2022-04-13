import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Customer } from './plus'
import Init from '../components/Init'
import LiveSelect from '../components/LiveSelectCUSX'
import EditForm from '../components/EditFormCUSX'
import DBshortTable from '../components/DBshortTable'
import { Toaster } from 'react-hot-toast'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

const Home: NextPage = () => {
  const c = useContext(AppContext)
  const cust0 = {
    id: 0,
    name: '',
    phone: '',
    gooid: ''
  }
  const [items, setItems] = useState<Customer[] | []>([])
  const [currentItem, setCurrentItem] = useState<Customer>(cust0)
  const [showTableFlag, setShowTableFlag] = useState(false)
  const liveRef = useRef<HTMLInputElement>(null)
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    Init(setItems, 'customers', c.u)
  }, [])

  function updateFunc() {
    Init(setItems, 'customers', c.u, true)
    resetParams()
    return
  }

  function resetParams() {
    setSearchWord('')
    setCurrentItem(() => cust0)
    if (liveRef.current !== null) liveRef.current.value = ''
    return
  }

  //

  return (
    <>
      <Head>
        <title>
          {c.t.settings}: {c.t.customers}
        </title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>{c.t.settings}</h3>
          <h2>
            {c.t.customers}: {items.length}
          </h2>
          <Toaster />
          <LiveSelect
            items={items}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            liveRef={liveRef}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            updateFunc={updateFunc}
            type="C"
            mode="new"
          />

          {currentItem.id === 0 ? (
            ''
          ) : (
            <EditForm
              itemToEdit={
                items.filter((item: Customer) => {
                  return item.id === Number(currentItem.id)
                })[0]
              }
              updateFunc={updateFunc}
              resetParams={resetParams}
              type="C"
            />
          )}

          <div className={styles.flexColumnContainer}>
            <button
              onClick={() => setShowTableFlag(!showTableFlag)}
              className={styles.sysButton}
            >
              {c.t.showHideAll}
            </button>
            {showTableFlag ? (
              items === undefined || items.length === 0 ? (
                <p>{c.t.db_empty}</p>
              ) : (
                <div className={styles.tableScroll}>
                  <DBshortTable resData={items} />
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
