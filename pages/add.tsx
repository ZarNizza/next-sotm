import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { CheckBoxButton } from '../components/CheckBoxButton'
import { useState } from 'react'

interface ProductItem {
  pid: number
  psum: number
}

const Home: NextPage = () => {
  const prod = [
    { pid: 1, pname: 'Маникюр', psymbol: 'М' },
    { pid: 2, pname: 'Маникюр +Гель', psymbol: 'М+Г' },
    { pid: 3, pname: 'Педикюр', psymbol: 'П' },
    { pid: 4, pname: 'Педикюр +Гель', psymbol: 'П+Г' },
    { pid: 5, pname: 'Подология', psymbol: 'Подолог' },
    { pid: 6, pname: 'Бровки', psymbol: 'Брови' },
    { pid: 7, pname: 'Реснички', psymbol: 'ЛамРес' }
  ]

  const [selectedProducts, setSelectedProducts] = useState<
    ProductItem['pid'][]
  >([])

  function ProdSet() {
    const prodSet = prod.map((item) => {
      function handler() {
        setSelectedProducts((prevSelectedProducts) => {
          return prevSelectedProducts.includes(item.pid)
            ? prevSelectedProducts.filter((product) => product !== item.pid)
            : [...prevSelectedProducts, item.pid]
        })
      }

      return (
        <CheckBoxButton
          key={item.pid}
          text={item.psymbol}
          onClick={handler}
          checked={selectedProducts.includes(item.pid)}
        />
      )
    })
    return <div className={styles.flexRowContainer}>{prodSet}</div>
  }

  function ProductList() {
    console.log('selectedProducts', selectedProducts)
    const qqq = selectedProducts.map((pid) => (
      <li key={pid}>
        {' '}
        pid= {pid} text=
        {(prod.find((item) => item.pid === pid) ?? { pname: 'xxx' }).pname}
      </li>
    ))
    return (
      <div>
        <p>ProductList</p>
        <ul>
          <li>{qqq}</li>
        </ul>
      </div>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Add Income</title>
      </Head>
      <main className={styles.main}>
        <h3>Add Income</h3>
        <ProdSet />
        <div className={styles.flexColumnContainer}>
          <ProductList />
        </div>
      </main>
    </Layout>
  )
}

export default Home
