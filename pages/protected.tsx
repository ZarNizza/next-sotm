import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

const Home2: NextPage = () => {
  const c = useContext(AppContext)
  const { status } = useSession()
  if (status !== 'authenticated') return <div>{c.t.authError}</div>
  return (
    <>
      <Head>
        <title>{c.t.settings}</title>
      </Head>
      <main className={styles.main}>
        <h3>{c.t.settings}</h3>
      </main>
    </>
  )
}

export default Home2
