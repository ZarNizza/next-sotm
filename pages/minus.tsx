import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Init from '../components/Init'
import EitemStore from '../components/EitemStore'
import XpenseCart from '../components/XpenseCart'
import EitemNew from '../components/EitemNew'
import { Toaster } from 'react-hot-toast'

export type Eitem = {
  id: number
  name: string
  symbol: string
}
export type Xpense = {
  id?: number
  date: string
  xitem: number
  sum: number
}

const Home: NextPage = () => {
  const [eItems, setEitems] = useState<Eitem[]>([])
  const [selectedEitems, setSelectedEitems] = useState<Eitem['id'][]>([])
  const eCostRef = useRef<Record<Eitem['id'], number>>({})
  const [gross, setGross] = useState<number>(0)
  const [newFlag, setNewFlag] = useState(false)

  useEffect(() => {
    Init(setEitems, 'eitems')
  }, [])

  return (
    <Layout>
      <Head>
        <title>Сost accounting</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h1>СOST</h1>
          <Toaster />
          {newFlag ? (
            <EitemNew setItems={setEitems} setNewFlag={setNewFlag} />
          ) : (
            ''
          )}
          <p> </p>
          <EitemStore
            eItems={eItems}
            setSelectedEitems={setSelectedEitems}
            selectedEitems={selectedEitems}
            eCostRef={eCostRef}
            setGross={setGross}
            setNewFlag={setNewFlag}
          />{' '}
          <XpenseCart
            setSelectedEitems={setSelectedEitems}
            selectedEitems={selectedEitems}
            eItems={eItems}
            eCostRef={eCostRef}
            gross={gross}
            setGross={setGross}
          />
        </div>
      </main>
    </Layout>
  )
}

export default Home
