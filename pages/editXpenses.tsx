import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Xpense } from './minus'
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
    Init(setItems, 'xpenses')
  }, [])

  function updateFunc() {
    Init(setItems, 'xpenses', true)
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
          {t.settings}: {t.xpenses}
        </title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h2>
            {t.settings}: {t.xpenses}: {items.length}
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
              {t.showHideAll}
            </button>
            {showTableFlag ? (
              items === undefined || items.length === 0 ? (
                <p>{t.db_empty}</p>
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
