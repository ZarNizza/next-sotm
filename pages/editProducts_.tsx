import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import type { Product } from './plus'
import Init from '../components/Init'
import ProductEditStore from '../components/ProductEditStore'
import ProductNew from '../components/ProductNew'
import ProductEditForm from '../components/ProductEditForm'
import { Toaster } from 'react-hot-toast'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'
import DBshortTable from '../components/DBshortTable'

const Home: NextPage = () => {
  const c = useContext(AppContext)
  const [items, setItems] = useState<Product[]>([])
  const [currItem, setCurrItem] = useState<Product['id']>(0)
  const [newFlag, setNewFlag] = useState(false)
  const [showTableFlag, setShowTableFlag] = useState(false)

  useEffect(() => {
    Init(setItems, 'products', c.u)
  }, [])

  return (
    <>
      <Head>
        <title>
          {c.t.settings}: {c.t.products}
        </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>{c.t.settings}</h3>
          <h2>{c.t.products}</h2>
          <Toaster />
          <ProductEditStore
            items={items}
            setCurrItem={setCurrItem}
            currItem={currItem}
            setNewFlag={setNewFlag}
          />{' '}
          {newFlag ? (
            <ProductNew
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
            <ProductEditForm
              itemToEdit={
                items.filter((item: Product) => {
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
