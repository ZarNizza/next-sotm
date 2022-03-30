import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Init from '../components/Init'
import ProductStore from '../components/ProductStore'
import ProductCart from '../components/ProductCart'
import LiveSelect from '../components/LiveSelectCUSX'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'

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
  sumd: number
}

export type Item0 = {
  id: number
  name?: string
  phone?: string
  gooid?: string
  timezone?: string
  date?: string
  cust?: number
  prod?: number
  xitem?: number
  sum?: number
}

const Home: NextPage = () => {
  let cust0: Customer = {
    id: 0,
    name: '',
    phone: '',
    gooid: ''
  }
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState(cust0)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product['id'][]>([])
  const prodCostRef = useRef<Record<Product['id'], number>>({})
  const prodCostDRef = useRef<Record<Product['id'], number>>({})
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
          <h1>SALES</h1>
          <Toaster />
          <LiveSelect
            items={customers}
            currentItem={currentCustomer}
            setCurrentItem={setCurrentCustomer}
            liveRef={liveRef}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            updateFunc={updateFunc}
            type="C"
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
            prodCostDRef={prodCostDRef}
            setGross={setGross}
          />
          <ProductCart
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            products={products}
            currentCustomer={currentCustomer}
            prodCostRef={prodCostRef}
            prodCostDRef={prodCostDRef}
            gross={gross}
            setGross={setGross}
          />
        </div>
      </main>
    </Layout>
  )
}

export default Home
