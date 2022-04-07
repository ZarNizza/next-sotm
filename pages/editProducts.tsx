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
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

const Home: NextPage = () => {
  const t = useRouter().locale === 'en' ? en : ru
  const [items, setItems] = useState<Product[]>([])
  const [currItem, setCurrItem] = useState<Product['id']>(0)
  const [newFlag, setNewFlag] = useState(false)

  useEffect(() => {
    Init(setItems, 'products')
  }, [])

  return (
    <>
      <Head>
        <title>
          {t.settings}: {t.product}
        </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>
            {t.settings}: {t.product}
          </h3>
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
      </main>
    </>
  )
}

export default Home
