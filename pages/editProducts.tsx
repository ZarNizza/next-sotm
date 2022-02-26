import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

export interface Product {
  pid: number
  pname: string
  psymbol: string
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log('--- products DB/api error: ' + res.error)
          alert('DataBase error: X3')
        } else {
          setProducts(() => res.data || [])
        }
      })
      .catch((error) => {
        console.log('--- catch products fetch error - ', error)
        alert('fetch data error: X3')
      })
  }, [])

  return (
    <Layout>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.productList}>
            <h3>Products:</h3>
            <ul>
              {products.map((product: Product) => (
                <li key={product.pid}>
                  {product.pid} = {product.pname}
                  {' : '}
                  {product.psymbol}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
