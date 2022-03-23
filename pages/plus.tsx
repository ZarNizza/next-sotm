import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Init from '../components/Init'
import ProductStore from '../components/ProductStore'
import ProductCart from '../components/ProductCart'
import CustomerSelect from '../components/CustomerSelect'
import { useEffect, useRef, useState } from 'react'

export type Customer = {
  id: number
  name: string
  phone: string | null
  gooid: string | null
}
export type Product = {
  id: number
  name: string
  symbol: string
}

export type Sale = {
  id?: number
  date: string
  cust: number
  prod: number
  sum: number
}

const Home: NextPage = () => {
  const cust0 = {
    id: 0,
    name: '',
    phone: '',
    gooid: ''
  }
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(cust0)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product['id'][]>([])
  const prodCostRef = useRef<Record<Product['id'], number>>({})
  const [gross, setGross] = useState<number>(0)
  const liveRef = useRef<HTMLInputElement>(null)
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    Init(setCustomers, 'customers')
    Init(setProducts, 'products')
  }, [])

  function updateFunc() {
    Init(setCustomers, 'customers')
    resetParams()
    return
  }

  function resetParams() {
    setSearchWord('')
    setCurrentCustomer(() => cust0)
    if (liveRef.current !== null) liveRef.current.value = ''
    return
  }

  return (
    <Layout>
      <Head>
        <title>Sales accounting</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>Sales accounting</h3>
          <CustomerSelect
            items={customers}
            currentItem={currentCustomer}
            setCurrentItem={setCurrentCustomer}
            liveRef={liveRef}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            updateFunc={updateFunc}
            mode="new"
          />
          <p>
            <span className={styles.tips}>
              collect Products, set Costs, and submit Sale
            </span>
          </p>
          <ProductStore
            products={products}
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            prodCostRef={prodCostRef}
            setGross={setGross}
          />
          <ProductCart
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            products={products}
            currentCustomer={currentCustomer}
            prodCostRef={prodCostRef}
            gross={gross}
            setGross={setGross}
          />
        </div>
      </main>
    </Layout>
  )
}

export default Home
