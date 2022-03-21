import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import InitCustomers from '../components/initCustomers'
import InitProducts from '../components/initProducts'
import ProductStore from '../components/ProductStore'
import ProductCart from '../components/ProductCart'
import CustomerSelect from '../components/CustomerSelect'
import { useRef, useState } from 'react'

export type Customer = {
  cid: number
  cname: string
  cphone: string | null
  gooid: string | null
}
export type Product = {
  pid: number
  pname: string
  psymbol: string
}

export type Sale = {
  sid?: number
  sdate: string
  cust: number
  prod: number
  sum: number
}

const Home: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer>({
    cid: 0,
    cname: '',
    cphone: '',
    gooid: ''
  })
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product['pid'][]>([])
  const prodCostRef = useRef<Record<Product['pid'], number>>({})
  const [gross, setGross] = useState<number>(0)

  InitCustomers(setCustomers)
  InitProducts(setProducts)

  return (
    <Layout>
      <Head>
        <title>Sales accounting</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>Sales accounting</h3>
          <CustomerSelect
            customers={customers}
            setCustomers={setCustomers}
            currentCustomer={currentCustomer}
            setCurrentCustomer={setCurrentCustomer}
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
