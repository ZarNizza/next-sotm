import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import InitCustomers from '../components/initCustomers'
import InitProducts from '../components/initProducts'
import ProductStore from '../components/ProductStore'
import ProductCart from '../components/ProductCart'
import CustomerSelect from '../components/CustomerSelect'
import { useState } from 'react'

export interface Customer {
  cid: number
  cname: string
  cphone: string | null
  gooid: string | null
}
export interface Product {
  pid: number
  pname: string
  psymbol: string
}

export interface Sale {
  sid: number
  data: Date
  customer: number
  prod: number
  sum: number
}

const Home: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<
    [Customer['cid'], Customer['cname']]
  >([0, ''])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product['pid'][]>([])
  // const [searchTerm, setSearchTerm] = useState('')

  InitCustomers(setCustomers)
  InitProducts(setProducts)

  return (
    <Layout>
      <Head>
        <title>Add Income</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <CustomerSelect
            customers={customers}
            setCurrentCustomer={setCurrentCustomer}
            currentCustomer={currentCustomer}
          />
          <p>customer {currentCustomer[1]}</p>
          <h3>Add Income</h3>
          <ProductStore
            products={products}
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
          />
          <ProductCart
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            products={products}
            currentCustomer={currentCustomer}
          />
        </div>
      </main>
    </Layout>
  )
}

export default Home
