import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../components/Home.module.scss'
import Locales from '../components/Locales'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

const Home: NextPage = () => {
  const c = useContext(AppContext)
  return (
    <>
      <Head>
        <title>{c.t.settings}</title>
      </Head>
      <main className={styles.main}>
        <h1>{c.t.settings}</h1>
        <Locales />
        <div className={styles.squareRow}>
          <Link href="/editCustomers" passHref>
            <div className={`${styles.square} ${styles.orange}`}>
              <p> {c.t.customers} </p>
            </div>
          </Link>
          <Link href="/sys" passHref>
            <div className={`${styles.square} ${styles.violet}`}>
              <p> {c.t.system} </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <Link href="/editProducts" passHref>
            <div className={`${styles.square} ${styles.blue}`}>
              <p>{c.t.products}</p>
            </div>
          </Link>
          <Link href="/editSales" passHref>
            <div className={`${styles.square} ${styles.green}`}>
              <p> {c.t.sales} </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <Link href="/editEitems" passHref>
            <div className={`${styles.square} ${styles.yellow}`}>
              <p>{c.t.eitem}</p>
            </div>
          </Link>
          <Link href="/editXpenses" passHref>
            <div className={`${styles.square} ${styles.pink}`}>
              <p> {c.t.xpenses} </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <div className={styles.squareWrapper}>
            <Link href="/editUsers" passHref>
              <div className={`${styles.halfsquare_top} ${styles.orange}`}>
                <p> {c.t.users} </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
