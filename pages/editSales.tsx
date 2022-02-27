import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Sale } from './plus'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import SaleSelect from '../components/SaleSelect'
import SaleEditForm from '../components/SaleEditForm'

const Home: NextPage = () => {
  const [sales, setSales] = useState<Sale[] | []>([])
  const [currentSale, setCurrentSale] = useState<Sale>({
    sid: 0,
    sdate: '',
    cust: 0,
    prod: 0,
    sum: 0
  })
  const [updateFlag, setUpdateFlag] = useState(0)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentSale({ sid: 0, sdate: '', cust: 0, prod: 0, sum: 0 })
    return alert(
      'OK, Updated!\nTo refresh SalesList clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentSale({ sid: 0, sdate: '', cust: 0, prod: 0, sum: 0 })
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Sales: {sales.length}</h2>
          <SaleSelect
            sales={sales}
            setCurrentSale={setCurrentSale}
            currentSale={currentSale}
            setSale={setSales}
            mode="new"
          />
          {currentSale.sid === 0 ? (
            ''
          ) : (
            <SaleEditForm
              saleToEdit={
                sales.filter((item: Sale) => {
                  return item.sid === Number(currentSale.sid)
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
