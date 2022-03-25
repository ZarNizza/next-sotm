import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Xpense } from './minus'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import LiveSelect from '../components/LiveSelectCUSX'
import EditForm from '../components/EditForm'
import DBshortTable from '../components/DBshortTable'

const Home: NextPage = () => {
  const cust0 = {
    id: 0,
    date: '',
    xitem: 0,
    sum: 0
  }
  const [items, setItems] = useState<Xpense[] | []>([])
  const [currentItem, setCurrentItem] = useState<Xpense>(cust0)
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
      apiSuffix: 'xpenses',
      title: 'getX',
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
        <title>Xpenses</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h2>Xpenses: {items.length}</h2>
          <LiveSelect
            items={items}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            liveRef={liveRef}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            updateFunc={updateFunc}
            type="X"
            mode="new"
          />

          {currentItem.id === 0 ? (
            ''
          ) : (
            <EditForm
              itemToEdit={
                items.filter((item: Xpense) => {
                  return item.id === Number(currentItem.id)
                })[0]
              }
              updateFunc={updateFunc}
              resetParams={resetParams}
              type="X"
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
