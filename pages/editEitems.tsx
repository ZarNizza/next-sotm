import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Init from '../components/Init'
import EitemEditStore from '../components/EitemEditStore'
import EitemNew from '../components/EitemNew'
import EitemEditForm from '../components/EitemEditForm'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

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
  const t = useRouter().locale === 'en' ? en : ru
  const [items, setItems] = useState<Eitem[]>([])
  const [currItem, setCurrItem] = useState<Eitem['id']>(0)
  const [newFlag, setNewFlag] = useState(false)

  useEffect(() => {
    Init(setItems, 'eitems')
  }, [])

  return (
    <Layout>
      <Head>
        <title>
          {t.settings}: {t.eitems}
        </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>
            {t.settings}: {t.eitems}
          </h3>
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
      </main>
    </Layout>
  )
}

export default Home
