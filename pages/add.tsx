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
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((res: { data: Customer[] }) => {
        setCustomers(() => res.data || [])
        console.log('customers:', customers)
        console.log('res.data:', res.data)
      })
      .catch((error) =>
        console.log('! frontend fetch Customer error - ', error.message)
      )
  }, [])

  function CustomerSelect() {
    const [searchTerm, setSearchTerm] = useState('')
    const csInput: HTMLInputElement | null = document.getElementById(
      'cSearchInput'
    ) as HTMLInputElement
    const csResultsList = document.getElementById('cSearchResultsList')

    useEffect(() => {
      if (csResultsList !== null) {
        csResultsList.innerHTML = ''
        customers
          .filter((item) => {
            return item.cname.toLowerCase().includes(searchTerm)
          })
          .forEach((e) => {
            const opt = new Option(e.cname, String(e.cid))
            csResultsList.appendChild(opt)
          })
      }
    }, [searchTerm])

    function liveSearch(e: any) {
      const st = e.target.value.toLowerCase()
      setSearchTerm(() => st)
      // setCurrentCustomer(() => 0)
    }

    function liveST(e: any) {
      const indexST = e.target.value
      const st = customers.filter((item) => {
        return item.cid === Number(indexST)
      })
      // console.log('liveST filtered, lenght=', st.length, st[0].cname, st)
      if (st.length === 1) {
        console.log('setCurrCust ', st[0].cid, st[0].cname)
        setCurrentCustomer(() => Number(st[0].cid))
        if (csInput !== null) csInput.value = st[0].cname
      }
    }

    return (
      <div className={styles.custList}>
        <p>Select Customer</p>
        <p>
          <input
            type="search"
            id="cSearchInput"
            placeholder="Search for a Customer"
            onChange={liveSearch}
            className={styles.inputCust}
          />
        </p>
        <p>
          <select
            id="cSearchResultsList"
            size={4}
            onChange={liveST}
            hidden={searchTerm === ''}
          ></select>
        </p>
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

      // const currentCustomer = 0

      selectedProducts.map((item, i) => {
        const sale = {
          customer: currentCustomer,
          prod: item,
          sum: qList[i].value
        }
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
          <p>customer {currentCustomer}</p>
          <h3>Add Income</h3>
          <ProdSet />
          <ProductList />
        </div>
      </main>
    </Layout>
  )
}

export default Home
