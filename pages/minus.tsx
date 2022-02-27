import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import initEitems from '../components/initEitems'
import EitemsStore from '../components/EitemsStore'
import ExpenseCart from '../components/ExpenseCart'
import NewEitem from '../components/NewEitem'

export type Eitem = {
  eid: number
  ename: string
  esymbol: string
}
export type Xpense = {
  xid?: number
  xdate: string
  xitem: number
  xsum: number
}

const Home: NextPage = () => {
  const [eItems, setEitems] = useState<Eitem[]>([])
  const [selectedEitems, setSelectedEitems] = useState<Eitem['eid'][]>([])
  const eCostRef = useRef<Record<Eitem['eid'], number>>({})
  const [gross, setGross] = useState<number>(0)

  initEitems(setEitems)

  return (
    <Layout>
      <Head>
        <title>Expenses</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <NewEitem setEitems={setEitems} />
          <p>- - - - - - -</p>
          <EitemsStore
            eItems={eItems}
            setSelectedEitems={setSelectedEitems}
            selectedEitems={selectedEitems}
            eCostRef={eCostRef}
            setGross={setGross}
          />{' '}
          <ExpenseCart
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