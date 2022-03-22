import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Xpense } from './minus'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import XpenseSelect from '../components/XpenseSelect'
import XpenseEditForm from '../components/XpenseEditForm'
import DBshortTable from '../components/DBshortTable'

const Home: NextPage = () => {
  const [xpenses, setXpenses] = useState<Xpense[] | []>([])
  const [currentXpense, setCurrentXpense] = useState<Xpense>({
    id: 0,
    date: '',
    xitem: 0,
    xsum: 0
  })
  const [updateFlag, setUpdateFlag] = useState(0)
  const [showTableFlag, setShowTableFlag] = useState(false)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentXpense({ id: 0, date: '', xitem: 0, xsum: 0 })
    return alert(
      'OK, Updated!\n\nTo refresh XpensesList clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentXpense({ id: 0, date: '', xitem: 0, xsum: 0 })
  }
  function setShowTableHandler() {
    setShowTableFlag(() => !showTableFlag)
  }
  //
  function xpensesInit() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'xpenses',
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
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h2>Xpenses: {xpenses.length}</h2>
          <XpenseSelect
            xpenses={xpenses}
            setCurrentXpense={setCurrentXpense}
            currentXpense={currentXpense}
            setXpense={setXpenses}
            mode="new"
          />

          {currentXpense.id === 0 ? (
            ''
          ) : (
            <XpenseEditForm
              xpenseToEdit={
                xpenses.filter((item: Xpense) => {
                  return item.id === Number(currentXpense.id)
                })[0]
              }
              setUpdateFlag={setUpdF}
              cancelFlag={cancelFlag}
            />
          )}

          <div className={styles.flexColumnContainer}>
            <button onClick={setShowTableHandler} className={styles.sysButton}>
              Show/Hide all
            </button>
            {showTableFlag ? (
              xpenses === undefined || xpenses.length === 0 ? (
                <p>No data - empty result</p>
              ) : (
                <div className={styles.tableScroll}>
                  <DBshortTable resData={xpenses} />
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
