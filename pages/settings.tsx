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
        <h3>SETTINGS</h3>
        <div className={styles.row}>
          <Link href="/editCustomers" passHref>
            <div className={styles.square_orange}>
              <p> Customers </p>
            </div>
          </Link>
          <Link href="/sys" passHref>
            <div className={styles.square_purple}>
              <p> System </p>
            </div>
          </Link>
        </div>

        <div className={styles.row}>
          <Link href="/editProducts" passHref>
            <div className={styles.square_blue}>
              <p>Products</p>
            </div>
          </Link>
          <Link href="/editSales" passHref>
            <div className={styles.square_green}>
              <p> Sales </p>
            </div>
          </Link>
        </div>

        <div className={styles.row}>
          <Link href="/editEitems" passHref>
            <div className={styles.square_yellow}>
              <p>Exp-items</p>
            </div>
          </Link>
          <Link href="/editXpenses" passHref>
            <div className={styles.square_pink}>
              <p> Xpenses </p>
            </div>
          </Link>
        </div>

        <div className={styles.row}>
          <div className={styles.square0}>
            <Link href="/editUsers" passHref>
              <div className={styles.halfsquare_top_orange}>
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
