import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../components/Home.module.scss'
import Locales from '../components/Locales'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

const Home: NextPage = () => {
  const router = useRouter()
  const t = router.locale === 'en' ? en : ru
  return (
    <>
      <Head>
        <title>{t.settings}</title>
      </Head>
      <main className={styles.main}>
        <h1>{t.settings}</h1>
        <Locales />
        <div className={styles.squareRow}>
          <Link href="/editCustomers" passHref>
            <div className={`${styles.square} ${styles.orange}`}>
              <p> {t.customers} </p>
            </div>
          </Link>
          <Link href="/sys" passHref>
            <div className={`${styles.square} ${styles.violet}`}>
              <p> {t.system} </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <Link href="/editProducts" passHref>
            <div className={`${styles.square} ${styles.blue}`}>
              <p>{t.products}</p>
            </div>
          </Link>
          <Link href="/editSales" passHref>
            <div className={`${styles.square} ${styles.green}`}>
              <p> {t.sales} </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <Link href="/editEitems" passHref>
            <div className={`${styles.square} ${styles.yellow}`}>
              <p>{t.eitem}</p>
            </div>
          </Link>
          <Link href="/editXpenses" passHref>
            <div className={`${styles.square} ${styles.pink}`}>
              <p> {t.xpenses} </p>
            </div>
          </Link>
        </div>

        <div className={styles.squareRow}>
          <div className={styles.squareWrapper}>
            <Link href="/editUsers" passHref>
              <div className={`${styles.halfsquare_top} ${styles.orange}`}>
                <p> {t.users} </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
