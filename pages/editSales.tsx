import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Sale } from './plus'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import Init from '../components/Init'
import LiveSelect from '../components/LiveSelectCUSX'
import EditForm from '../components/EditFormCUSX'
import DBshortTable from '../components/DBshortTable'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

const Home: NextPage = () => {
  const t = useRouter().locale === 'en' ? en : ru
  const item0 = {
    id: 0,
    date: '',
    cust: 0,
    prod: 0,
    sum: 0,
    sumd: 0
  }
  const [items, setItems] = useState<Sale[] | []>([])
  const [currentItem, setCurrentItem] = useState<Sale>(item0)
  const [showTableFlag, setShowTableFlag] = useState(false)
  const liveRef = useRef<HTMLInputElement>(null)
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    Init(setItems, 'sales')
  }, [])

  function updateFunc() {
    Init(setItems, 'sales', true)
    resetParams()
    return
  }

  function resetParams() {
    setSearchWord('')
    setCurrentItem(() => item0)
    if (liveRef.current !== null) liveRef.current.value = ''
    return
  }

  //

  return (
    <Layout>
      <Head>
        <title>
          {t.settings}: {t.sales}
        </title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h2>
            {t.settings}: {t.sales}: {items.length}
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
            type="S"
            mode="new"
          />

          {currentItem.id === 0 ? (
            ''
          ) : (
            <EditForm
              itemToEdit={
                items.filter((item: Sale) => {
                  return item.id === Number(currentItem.id)
                })[0]
              }
              updateFunc={updateFunc}
              resetParams={resetParams}
              type="S"
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
