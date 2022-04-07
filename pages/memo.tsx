import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

const Home: NextPage = () => {
  const t = useRouter().locale === 'en' ? en : ru
  return (
    <>
      <Head>
        <title>{t.memo}</title>
      </Head>
      <main className={styles.main}>
        <h1>{t.memo}</h1>
        <p>Page in the development queue.</p>
        <p>
          Integration with Google Calendar,
          <br />
          plan future visits / calls / sales.
        </p>
      </main>
    </>
  )
}

export default Home
