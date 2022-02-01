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
    function dropHandler(e:any) {
      setSelectedProducts((prevSelectedProducts) => {
        return prevSelectedProducts.filter((product) => product !== Number(e.target.value))
      })
    }
    function inputChange(e:any) {
      console.log('inputChange', e.target.name, e.target.value)
    }
    const qqq = selectedProducts.map((pid) => (
      <li key={pid}>
     <input type='text' name='pSum' onChange={inputChange} className={styles.inputSum}/> {(prod.find((item) => item.pid === pid) ?? { pname: 'xxx' }).pname} <button value={pid} onClick={dropHandler} className={styles.dropButton}> X </button>
      </li>
    ))
    function setHandler() {
      const qList = document.getElementsByName('pSum')
      console.log('qList=', qList)
// ! add this functionality


    }
    return (
      <div className={styles.productList}>
        <h3>ProductList</h3>
        <ul>
        {qqq.length === 0 ? 'select product' : qqq}
        </ul>
        <button onClick={setHandler} className={styles.buttonOk}> Sale it! </button>
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
