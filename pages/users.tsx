import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from "next/image";
import Link from 'next/link'
import { useEffect, useReducer, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

export type User = {
  uid: number
  uname: string
  uphone: string | null
  gooid: string | null
  timezone: string | null
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((res: { data: User[] }) => {
        setUsers(res.data || [])
      })
      .catch((error) => console.log('! frontend fetch error - ', error.message))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Users:</h2>
          <ul>
            {users.map((user: User) => (
              <li key={Math.random()}>
                {user.uname}
                {', '}
                {user.uphone} {user.gooid} {user.timezone}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  )
}

export default Home
