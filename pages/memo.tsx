import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

const Home: NextPage = () => {
  const c = useContext(AppContext)
  return (
    <>
      <Head>
        <title>{c.t.memo}</title>
      </Head>
      <main className={styles.main}>
        <h1>{c.t.memo}</h1>
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
