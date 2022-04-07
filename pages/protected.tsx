import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

const Home2: NextPage = () => {
  const t = useRouter().locale === 'en' ? en : ru
  const { status } = useSession()
  if (status !== 'authenticated') return <div>{t.authError}</div>
  return (
    <Layout>
      <Head>
        <title>{t.settings}</title>
      </Head>
      <main className={styles.main}>
        <h3>{t.settings}</h3>
      </main>
    </Layout>
  )
}

export default Home2
