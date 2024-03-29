import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Xpense } from './minus'
import Init from '../components/Init'
import LiveSelect from '../components/LiveSelectCUSX'
import EditForm from '../components/EditFormCUSX'
import DBshortTableED from '../components/DBshortTableED'
import { Toaster } from 'react-hot-toast'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

const Home: NextPage = () => {
  const c = useContext(AppContext)
  const cust0 = {
    id: 0,
    date: '',
    xitem: 0,
    sum: 0,
    num: 0
  }
  const [items, setItems] = useState<Xpense[] | []>([])
  const [currentItem, setCurrentItem] = useState<Xpense>(cust0)
  const [showTableFlag, setShowTableFlag] = useState(false)
  const liveRef = useRef<HTMLInputElement>(null)
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    Init(setItems, 'xpenses', c.u)
  }, [])

  function updateFunc() {
    Init(setItems, 'xpenses', c.u, true)
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
          {c.t.settings}: {c.t.xpenses}
        </title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>{c.t.settings}</h3>
          <h2>
            {c.t.xpenses}: {items.length}
          </h2>
          <div className={styles.tips}>
            <br />
            {c.t.editXpenseTips}:
          </div>
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
              {c.t.showHideAll}
            </button>
            {showTableFlag ? (
              items === undefined || items.length === 0 ? (
                <p>{c.t.db_empty}</p>
              ) : (
                <div className={styles.tableScroll}>
                  <DBshortTableED
                    resData={items}
                    updateFunc={updateFunc}
                    type="X"
                  />
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
