import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Xpense } from './minus'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import XpenseSelect from '../components/XpenseSelect'
import XpenseEditForm from '../components/XpenseEditForm'

const Home: NextPage = () => {
  const [xpenses, setXpenses] = useState<Xpense[] | []>([])
  const [currentXpense, setCurrentXpense] = useState<Xpense>({
    xid: 0,
    xdate: '',
    xitem: 0,
    xsum: 0
  })
  const [updateFlag, setUpdateFlag] = useState(0)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentXpense({ xid: 0, xdate: '', xitem: 0, xsum: 0 })
    return alert(
      'OK, Updated!\nTo refresh XpensesList clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentXpense({ xid: 0, xdate: '', xitem: 0, xsum: 0 })
  }
  //
  function xpensesInit() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'expenses',
      title: 'getXpense',
      setResData: setXpenses
    }
    fetchHandler(args)
  }

  useEffect(() => {
    xpensesInit()
  }, [])

  useEffect(() => {
    if (updateFlag === 1) {
      xpensesInit()
      setUpdateFlag(() => 0)
    }
  }, [updateFlag])

  return (
    <Layout>
      <Head>
        <title>Xpenses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Xpenses: {xpenses.length}</h2>
          <XpenseSelect
            xpenses={xpenses}
            setCurrentXpense={setCurrentXpense}
            currentXpense={currentXpense}
            setXpense={setXpenses}
            mode="new"
          />
          {currentXpense.xid === 0 ? (
            ''
          ) : (
            <XpenseEditForm
              xpenseToEdit={
                xpenses.filter((item: Xpense) => {
                  return item.xid === Number(currentXpense.xid)
                })[0]
              }
              setUpdateFlag={setUpdF}
              cancelFlag={cancelFlag}
            />
          )}
        </main>
      </div>
    </Layout>
  )
}

export default Home
