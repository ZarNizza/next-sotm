import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import initEitems from '../components/initEitems'
import EitemsStore from '../components/EitemsStore'
import ExpenseCart from '../components/ExpenseCart'

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

  // useEffect(() => {
  //   fetch('/api/expenses')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.error) {
  //         console.log('--- expenses DB/api error: ' + res.error)
  //         alert('DataBase error: X3')
  //       } else {
  //         setEitems(() => res.data || [])
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('--- catch expenses fetch error - ', error)
  //       alert('fetch data error: X3')
  //     })
  // }, [])
  return (
    <Layout>
      <Head>
        <title>Expenses</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
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
        {/* <div className={styles.productList}>
          <h3>Expenses page</h3>
          <ul>
            {eItems.map((item: Eitem) => (
              <li key={Math.random()}>
                {item.eid} = {item.ename}
                {' : '}
                {item.esymbol}
              </li>
            ))}
          </ul>
        </div> */}
      </main>
    </Layout>
  )
}

export default Home
