import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { CheckBoxButton } from '../components/CheckBoxButton'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
  const [customer, setCustomer] = useState<Customer[]>([])

  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((res: { data: Customer[] }) => {
        setCustomer(() => res.data || [])
        console.log('customers:', customer)
        console.log('res.data:', res.data)
      })
      .catch((error) =>
        console.log('! frontend fetch Customer error - ', error.message)
      )
  }, [])

  function CustomerSelect() {
    const [searchTerm, setSearchTerm] = useState('')
    const csResults = document.getElementById('custSearchResults')

    useEffect(() => {
      console.log('useEffect')
      if (csResults !== null) {
        console.log('useEffect - inside IF')
        csResults.innerHTML = ''
        customer
          .filter((item) => {
            return item.cname.toLowerCase().includes(searchTerm)
          })
          .forEach((e) => {
            const li = document.createElement('li')
            li.innerHTML = e.cname
            csResults.appendChild(li)
          })
      }
    }, [searchTerm])

    function liveSearch(e: any) {
      const st = e.target.value.toLowerCase()
      console.log('liveSearch', st, e)
      setSearchTerm(() => st)
    }

    return (
      <div className={styles.custList}>
        <p>Select Customer</p>
        <input
          type="search"
          placeholder="Search for a Customer"
          onChange={liveSearch}
          className={styles.inputSum}
        />
        <ul id="custSearchResults"></ul>
      </div>
    )
  }

  const [prod, setProd] = useState<Product[]>([])
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res: { data: Product[] }) => {
        setProd(() => res.data || [])
      })
      .catch((error) =>
        console.log('! frontend fetch Prod error - ', error.message)
      )
  }, [])

  const [selectedProducts, setSelectedProducts] = useState<Product['pid'][]>([])

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
    function dropHandler(e: any) {
      setSelectedProducts((prevSelectedProducts) => {
        return prevSelectedProducts.filter(
          (product) => product !== Number(e.target.value)
        )
      })
    }
    function inputChange(e: any) {
      console.log('inputChange', e.target.name, e.target.value)
    }
    const qqq = selectedProducts.map((pid) => (
      <li key={pid}>
        <input
          type="text"
          name="pSum"
          onChange={inputChange}
          className={styles.inputSum}
        />{' '}
        {(prod.find((item) => item.pid === pid) ?? { pname: 'xxx' }).pname}{' '}
        <button value={pid} onClick={dropHandler} className={styles.dropButton}>
          {' '}
          X{' '}
        </button>
      </li>
    ))
    function setHandler() {
      const qList: HTMLInputElement[] = document.getElementsByName('pSum')
      //  inputValue = (<HTMLInputElement>document.getElementById(elementId)).value;
      //  inputElement = <HTMLInputElement>document.getElementById('greet');
      //  const inputElement: HTMLInputElement = document.getElementById('greet')
      //  const inputElement = document.getElementById('greet') as HTMLInputElement
      //////  const inputValue = inputElement.value

      const customer = 0

      selectedProducts.map((item, i) => {
        const sale = { customer: customer, prod: item, sum: qList[i].value }
        fetch('/api/sales', {
          method: 'POST',
          body: JSON.stringify(sale)
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('SYS: saveSale = OK', res)
            setSelectedProducts([])
          })
          .catch((error) =>
            console.log('! SYS: saveSale error - ', error.message)
          )
      })
    }
    return (
      <div className={styles.productList}>
        {qqq.length === 0 ? (
          <>
            <p>select product</p>
            <p>or</p>
            <p>
              <Link href="/">
                <a className={styles.footerLink}>
                  &lt; &lt; &lt; &nbsp;&nbsp;Return to StartPage&nbsp;&nbsp;
                  &gt; &gt; &gt;
                </a>
              </Link>
            </p>
          </>
        ) : (
          <>
            <h3>ProductList</h3>
            <ul>{qqq}</ul>
            <button onClick={setHandler} className={styles.buttonOk}>
              {' '}
              Sale it!{' '}
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Add Income</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <CustomerSelect />
          <h3>Add Income</h3>
          <ProdSet />
          <ProductList />
        </div>
      </main>
    </Layout>
  )
}

export default Home
