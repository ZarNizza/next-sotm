import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [resData, setResData] = useState<any>()

  function sys_handler(url: string, method: 'GET' | 'POST', body: string) {
    const toast01 = toast.loading('Loading...')

    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.remove()
          toast.error('!Loading error: X3')
          console.log('SYS: ' + res.error)
        } else {
          console.log('result: ', res.data)
          toast.remove()
        }
        if (res.data !== undefined && res.data !== 'OK')
          setResData(() => JSON.stringify(res.data))
      })
      .catch((error) => {
        toast.remove()
        toast.error('!Loading error: X3')
        console.log('! error - ' + error.message)
      })
  }

  function getCode() {
    // https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.google.com/m8/feeds&access_type=offline&include_granted_scopes=true&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&client_id=921647******-l5jcha3bt7r6q******bhtsgk*****um6.apps.googleusercontent.com
    console.log('getCode')
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth' +
      '?scope=https://www.google.com/m8/feeds&access_type=offline' +
      '&include_granted_scopes=true&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code' +
      '&client_id=' +
      process.env.GOOGLE_ID
    const body = ''
    sys_handler(url, 'GET', body)
  }

  function getTokens() {
    console.log('getTokens')
  }

  function getContacts() {
    console.log('getContacts')
  }

  function getAPIs() {
    console.log('getAPIs')
    sys_handler('/api/sys_gapi', 'GET', '')
  }

  function updateToken() {
    console.log('updateToken')
  }

  return (
    <Layout>
      <Head>
        <title>G-Contacts</title>
      </Head>
      <main className={styles.main}>
        <h1>G-Contacts</h1>
        <div className={styles.sysButtonsGroup}>
          <button onClick={getAPIs}>0. get API</button>
          <button onClick={getCode}>1. get Code</button>
          <button onClick={getTokens}>2. get Tokens</button>
          <button onClick={getContacts}>3. get Contacts</button>
          <button onClick={updateToken}>x. get Code</button>
        </div>
        {resData}
      </main>
    </Layout>
  )
}

export default Home
