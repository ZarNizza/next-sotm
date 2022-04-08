import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Init from '../components/Init'
import ProductStore from '../components/ProductStore'
import ProductCart from '../components/ProductCart'
import LiveSelect from '../components/LiveSelectCUSX'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

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
  price: number
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
  const c = useContext(AppContext)

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
    console.log('plus - useEffect - init cust')
    Init(setCustomers, 'customers')
    console.log('plus - useEffect - init prod')
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

  type SumProps = { id: number; value: number }

  const inputSumCh_Handler: React.FC<SumProps> = ({ id, value }) => {
    prodCostRef.current[id] = value
    setGross(
      Object.values(prodCostRef.current).reduce(
        (prev, curr) => prev + curr,
        0
      ) +
        Object.values(prodCostDRef.current).reduce(
          (prev, curr) => prev + curr,
          0
        )
    )
    return null
  }

  const inputSumDCh_Handler: React.FC<SumProps> = ({ id, value }) => {
    prodCostDRef.current[id] = value
    setGross(
      Object.values(prodCostRef.current).reduce(
        (prev, curr) => prev + curr,
        0
      ) +
        Object.values(prodCostDRef.current).reduce(
          (prev, curr) => prev + curr,
          0
        )
    )
    return null
  }

  const dropButton_Handler: React.FC<number> = (id) => {
    delete prodCostRef.current[id]
    delete prodCostDRef.current[id]
    setGross(
      Object.values(prodCostRef.current).reduce(
        (prev, curr) => prev + curr,
        0
      ) +
        Object.values(prodCostDRef.current).reduce(
          (prev, curr) => prev + curr,
          0
        )
    )
    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.filter((product) => product !== Number(id))
    })
    return null
  }

  return (
    <>
      <Head>
        <title>{c.t.plusTitle}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h1>{c.t.plusTitle}</h1>
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
            <span className={styles.tips}>{c.t.plusTips}</span>
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
            inputSumChangeHandler={inputSumCh_Handler}
            inputSumDChangeHandler={inputSumDCh_Handler}
            dropButton_Handler={dropButton_Handler}
          />
        </div>
      </main>
    </>
  )
}

export default Home
