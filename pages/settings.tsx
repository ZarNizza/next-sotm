import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
      <main className={styles.main}>
        <h3>Settings page</h3>
        <p>Admin / system settings.</p>
        <div className={styles.row}>
          <Link href="/customers" passHref>
            <div className={styles.square_plus}>
              <p> Customers </p>
            </div>
          </Link>

          <Link href="/sys" passHref>
            <div className={styles.square_sys}>
              <p> System </p>
            </div>
          </Link>
        </div>
        <div className={styles.row}>
          <Link href="/Sales" passHref>
            <div className={styles.square_stat}>
              <p> Sales </p>
            </div>
          </Link>
          <div className={styles.square0}>
            <Link href="/eitems" passHref>
              <div className={styles.halfsquare_top}>
                <p>Cost Items</p>
              </div>
            </Link>
            <Link href="/expenses" passHref>
              <div className={styles.halfsquare_bottom}>
                <p> Expenses </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
