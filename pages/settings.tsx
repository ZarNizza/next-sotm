import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../components/Home.module.scss'
import Locales from '../components/Locales'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
      <main className={styles.main}>
        <Locales />
        <h1>SETTINGS</h1>
        <div className={styles.squareRow}>
          <Link href="/editCustomers" passHref>
            <div className={`${styles.square} ${styles.orange}`}>
              <p> Customers </p>
            </div>
          </Link>
          <Link href="/sys" passHref>
            <div className={`${styles.square} ${styles.violet}`}>
              <p> System </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <Link href="/editProducts" passHref>
            <div className={`${styles.square} ${styles.blue}`}>
              <p>Products</p>
            </div>
          </Link>
          <Link href="/editSales" passHref>
            <div className={`${styles.square} ${styles.green}`}>
              <p> Sales </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <Link href="/editEitems" passHref>
            <div className={`${styles.square} ${styles.yellow}`}>
              <p>X-items</p>
            </div>
          </Link>
          <Link href="/editXpenses" passHref>
            <div className={`${styles.square} ${styles.pink}`}>
              <p> Xpenses </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <div className={styles.squareWrapper}>
            <Link href="/editUsers" passHref>
              <div className={`${styles.halfsquare_top} ${styles.orange}`}>
                <p> Users </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
