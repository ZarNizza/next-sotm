import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Init from '../components/Init'
import EitemEditStore from '../components/EitemEditStore'
import EitemNew from '../components/EitemNew'
import EitemEditForm from '../components/EitemEditForm'
import { Toaster } from 'react-hot-toast'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'
import DBshortTable from '../components/DBshortTable'

export type Eitem = {
  id: number
  name: string
  symbol: string
  price: number
}
export type Xpense = {
  id?: number
  date: string
  xitem: number
  sum: number
}

const Home: NextPage = () => {
  const c = useContext(AppContext)
  const [items, setItems] = useState<Eitem[]>([])
  const [currItem, setCurrItem] = useState<Eitem['id']>(0)
  const [newFlag, setNewFlag] = useState(false)
  const [showTableFlag, setShowTableFlag] = useState(false)

  useEffect(() => {
    Init(setItems, 'eitems', c.u)
  }, [])

  return (
    <>
      <Head>
        <title>
          {c.t.settings}: {c.t.eitems}
        </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>{c.t.settings}</h3>
          <h2>{c.t.eitems}</h2>
          <Toaster />
          <EitemEditStore
            items={items}
            setCurrItem={setCurrItem}
            currItem={currItem}
            setNewFlag={setNewFlag}
          />{' '}
          {newFlag ? (
            <EitemNew
              setItems={setItems}
              setNewFlag={setNewFlag}
              setCurrItem={setCurrItem}
            />
          ) : (
            ''
          )}
          {currItem === 0 ? (
            ''
          ) : (
            <EitemEditForm
              itemToEdit={
                items.filter((item: Eitem) => {
                  return item.id === Number(currItem)
                })[0]
              }
              setItems={setItems}
              setCurrItem={setCurrItem}
            />
          )}
        </div>

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
      </main>
    </>
  )
}

export default Home
