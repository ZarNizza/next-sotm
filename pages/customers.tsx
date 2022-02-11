import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Customer } from './add'

const Home: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log('--- customers DB/api error: ' + res.error)
          alert('DataBase error: X3')
        } else {
          setCustomers(() => res.data || [])
        }
      })
      .catch((error) => {
        console.log('--- catch customers fetch error - ', error)
        alert('fetch data error: X3')
      })
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
          <ul>
            {customers.map((user: Customer) => (
              <li key={Math.random()}>
                {user.cname}
                {', '}
                {user.cphone} {user.gooid}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  )
}

export default Home
