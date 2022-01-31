import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { RadioButton } from '../components/RadioButton'
import { MouseEventHandler, useEffect } from 'react'
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
  const [productList, setProductList] = useState<ProductItem[]>([
    { pid: 0, psum: 0 }
  ])

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
        <RadioButton
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
    const qqq = productList.map((item) => (
      <li key={item.pid}>
        {' '}
        pid= {item.pid}, psum = {item.psum}{' '}
      </li>
    ))
    return (
      <div>
        <p>ProductList</p>
        <ul>{qqq}</ul>
      </div>
    )
  }
  //
  //
  // this component do not post, setProduct(useState) do not update product, useEffect do not sniff change
  //

  return (
    <Layout>
      <Head>
        <title>Add Income</title>
      </Head>
      <main className={styles.main}>
        <h3>Add Income</h3>
        <ProdSet />
        <div className={styles.flexColumnContainer}>
          - - ItemList - -
          <ProductList />
        </div>
      </main>
    </Layout>
  )
}

export default Home
