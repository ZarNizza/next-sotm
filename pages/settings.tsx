import type { NextPage } from 'next'
import Head from 'next/head'
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
        <p>Page in the development queue.</p>
        <p>Admin / system settings.</p>
      </main>
    </Layout>
  )
}

export default Home
