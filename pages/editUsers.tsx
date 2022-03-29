import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import LiveSelect from '../components/LiveSelectCUSX'
import EditForm from '../components/EditFormCUSX'
import DBshortTable from '../components/DBshortTable'
import { Toaster } from 'react-hot-toast'

export type User = {
  id: number
  name: string
  phone: string | null
  gooid: string | null
  timezone: string | null
}

const Home: NextPage = () => {
  const cust0 = {
    id: 0,
    name: '',
    phone: '',
    gooid: '',
    timezone: ''
  }
  const [items, setItems] = useState<User[] | []>([])
  const [currentItem, setCurrentItem] = useState<User>(cust0)
  const [showTableFlag, setShowTableFlag] = useState(false)
  const liveRef = useRef<HTMLInputElement>(null)
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    init()
  }, [])

  function updateFunc() {
    init()
    resetParams()
    return
  }

  function init() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'users',
      title: 'getUser',
      setResData: setItems
    }
    fetchHandler(args)
  }

  function resetParams() {
    setSearchWord('')
    setCurrentItem(() => cust0)
    if (liveRef.current !== null) liveRef.current.value = ''
    return
  }

  //

  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h2>Users: {items.length}</h2>
          <Toaster />
          <LiveSelect
            items={items}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            liveRef={liveRef}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            updateFunc={updateFunc}
            type="U"
            mode="new"
          />

          {currentItem.id === 0 ? (
            ''
          ) : (
            <EditForm
              itemToEdit={
                items.filter((item: User) => {
                  return item.id === Number(currentItem.id)
                })[0]
              }
              updateFunc={updateFunc}
              resetParams={resetParams}
              type="U"
            />
          )}

          <div className={styles.flexColumnContainer}>
            <button
              onClick={() => setShowTableFlag(!showTableFlag)}
              className={styles.sysButton}
            >
              Show/Hide all
            </button>
            {showTableFlag ? (
              items === undefined || items.length === 0 ? (
                <p>No data - empty result</p>
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
    </Layout>
  )
}

export default Home
