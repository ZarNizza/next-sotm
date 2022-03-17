import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import initEitems from '../components/initEitems'
import EitemEditStore from '../components/EitemEditStore'
import EitemNew from '../components/EitemNew'
import EitemEditForm from '../components/EitemEditForm'

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
  const [currEitem, setCurrEitem] = useState<Eitem['eid']>(0)
  const [newFlag, setNewFlag] = useState(false)

  initEitems(setEitems)

  return (
    <Layout>
      <Head>
        <title>E-item settings</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>E-item settings</h3>
          <EitemEditStore
            eItems={eItems}
            setCurrEitem={setCurrEitem}
            currEitem={currEitem}
            setNewFlag={setNewFlag}
          />{' '}
          {newFlag ? (
            <EitemNew
              setEitems={setEitems}
              setNewFlag={setNewFlag}
              setCurrEitem={setCurrEitem}
            />
          ) : (
            ''
          )}
          {currEitem === 0 ? (
            ''
          ) : (
            <EitemEditForm
              itemToEdit={
                eItems.filter((item: Eitem) => {
                  return item.eid === Number(currEitem)
                })[0]
              }
              setEitems={setEitems}
              setCurrEitem={setCurrEitem}
            />
          )}
        </div>
      </main>
    </Layout>
  )
}

export default Home
