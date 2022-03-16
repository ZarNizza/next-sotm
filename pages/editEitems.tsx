import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import initEitems from '../components/initEitems'
import EitemsEditStore from '../components/EitemsEditStore'
import XpenseCart from '../components/XpenseCart'
import NewEitem from '../components/NewEitem'
import EitemEditForm from '../components/EitemEditForm2'

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
  const [newFlag, setNewFlag] = useState(false)
  const [updFlag, setUpdFlag] = useState(false)

  initEitems(setEitems)

  return (
    <Layout>
      <Head>
        <title>E-item settings</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>E-item settings</h3>
          {newFlag ? (
            <NewEitem setEitems={setEitems} setNewFlag={setNewFlag} />
          ) : (
            ''
          )}
          <p> </p>
          <EitemsEditStore
            eItems={eItems}
            setSelectedEitems={setSelectedEitems}
            selectedEitems={selectedEitems}
            setNewFlag={setNewFlag}
          />{' '}
          {!!!selectedEitems[0] || selectedEitems[0] === 0 ? (
            ''
          ) : (
            <EitemEditForm
              itemToEdit={
                eItems.filter((item: Eitem) => {
                  return item.eid === Number(selectedEitems[0])
                })[0]
              }
              setEitems={setEitems}
              setUpdFlag={setUpdFlag}
            />
          )}
        </div>
      </main>
    </Layout>
  )
}

export default Home
