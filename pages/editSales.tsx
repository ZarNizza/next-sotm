import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Sale } from './plus'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import SaleSelect from '../components/SaleSelect'
import SaleEditForm from '../components/SaleEditForm'
import DBshortTable from '../components/DBshortTable'

const Home: NextPage = () => {
  const [sales, setSales] = useState<Sale[] | []>([])
  const [currentSale, setCurrentSale] = useState<Sale>({
    id: 0,
    date: '',
    cust: 0,
    prod: 0,
    sum: 0
  })
  const [updateFlag, setUpdateFlag] = useState(0)
  const [showTableFlag, setShowTableFlag] = useState(false)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentSale({ id: 0, date: '', cust: 0, prod: 0, sum: 0 })
    return alert(
      'OK, Updated!\n\nTo refresh SalesList clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentSale({ id: 0, date: '', cust: 0, prod: 0, sum: 0 })
  }
  function setShowTableHandler() {
    setShowTableFlag(() => !showTableFlag)
  }
  //
  function salesInit() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'sales',
      title: 'getSale',
      setResData: setSales
    }
    fetchHandler(args)
  }

  useEffect(() => {
    salesInit()
  }, [])

  useEffect(() => {
    if (updateFlag === 1) {
      salesInit()
      setUpdateFlag(() => 0)
    }
  }, [updateFlag])

  return (
    <Layout>
      <Head>
        <title>Sales</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h2>Sales: {sales.length}</h2>
          <SaleSelect
            sales={sales}
            setCurrentSale={setCurrentSale}
            currentSale={currentSale}
            setSale={setSales}
            mode="new"
          />

          {currentSale.id === 0 ? (
            ''
          ) : (
            <SaleEditForm
              saleToEdit={
                sales.filter((item: Sale) => {
                  return item.id === Number(currentSale.id)
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
              sales === undefined || sales.length === 0 ? (
                <p>No data - empty result</p>
              ) : (
                <div className={styles.tableScroll}>
                  <DBshortTable resData={sales} />
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
