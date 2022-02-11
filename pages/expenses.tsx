import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export interface Eitem {
  eid: number
  ename: string
  esymbol: string
}
const Home: NextPage = () => {
  const [eItems, setEitems] = useState<Eitem[]>([])
  useEffect(() => {
    fetch('/api/expenses')
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log('--- expenses DB/api error: ' + res.error)
          alert('DataBase error: X3')
        } else {
          setEitems(() => res.data || [])
        }
      })
      .catch((error) => {
        console.log('--- catch expenses fetch error - ', error)
        alert('fetch data error: X3')
      })
  }, [])
  return (
    <Layout>
      <Head>
        <title>Expenses</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.productList}>
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
        </div>
      </main>
    </Layout>
  )
}

export default Home
