import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Customer } from './add'
import fetchHandler from '../components/fetchHandler'
import DBshort_ED_Table from '../components/DBshortEditDropTable'

const Home: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  //
  useEffect(() => {
    const args = {
      apiSuffix: 'customers',
      title: 'getCust',
      setResData: setCustomers
    }
    fetchHandler(args)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Customers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Customers:</h2>
          <div>
            {customers === undefined || customers.length === 0 ? (
              <p>No data - empty result</p>
            ) : (
              <DBshort_ED_Table resData={customers} />
            )}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
