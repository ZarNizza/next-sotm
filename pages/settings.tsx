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
          <Link href="/editCustomers" passHref>
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
          <div className={styles.square0}>
            <Link href="/editProducts" passHref>
              <div className={styles.halfsquare_top2}>
                <p>Products</p>
              </div>
            </Link>
            <Link href="/editSales" passHref>
              <div className={styles.halfsquare_bottom}>
                <p> Sales </p>
              </div>
            </Link>
          </div>

          <div className={styles.square0}>
            <Link href="/editEitems" passHref>
              <div className={styles.halfsquare_top}>
                <p>Exp-items</p>
              </div>
            </Link>
            <Link href="/editXpenses" passHref>
              <div className={styles.halfsquare_bottom2}>
                <p> Xpenses </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
