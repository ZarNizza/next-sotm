import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { Sale, Product, Customer } from './add'
import DBresultTable from '../components/DBshortTable'
import DBstatTable from '../components/DBfullTable'
import InitCustomers from '../components/initCustomers'
import InitProducts from '../components/initProducts'
import CustomerSelect from '../components/CustomerSelect'

const Home: NextPage = () => {
  function show_S_Handler() {
    const body = {
      mode: 'show_S'
    }
    fetch('/api/1', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log('1tsx - res.error=', res.error)
          alert('!Error: ' + res.error)
        } else {
          console.log('1tsx -S front OK')
        }
      })
      .catch((error) => {
        console.log('!catch Error:', error.message)
        alert('!catch Error:' + error.message)
      })
  }

  function show_SX_Full_Handler() {
    const body = {
      mode: 'show_SX'
    }

    fetch('/api/1', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((res) => {
        console.log('1tsx -SX front - all res= ', res)
        if (res.error) {
          console.log('1tsx -SX res.error=', res.error)
          // alert('1tsx -SX res.error=' + res.error)
        } else {
          console.log('1tsx -SX front OK')
          // alert('1tsx -SX front OK')
        }
      })
      .catch((error) => {
        console.log('!CATCH 1tsx -SX front, error.message=', error.message)
        // alert('!CATCH 1tsx -SX front error.message=' + error.message)
      })
  }

  return (
    <Layout>
      <Head>
        <title>Statistics</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <div className={styles.orangeButtons}>
            <button onClick={show_S_Handler}>S</button>
            <button onClick={show_SX_Full_Handler}>SX</button>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
