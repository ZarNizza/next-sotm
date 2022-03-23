import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Customer } from './plus'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import CustomerSelect from '../components/CustomerSelect'
import CustomerEditForm from '../components/CustomerEditForm'
import DBshortTable from '../components/DBshortTable'

const Home: NextPage = () => {
  const cust0 = {
    id: 0,
    name: '',
    phone: '',
    gooid: ''
  }
  const [customers, setCustomers] = useState<Customer[] | []>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(cust0)
  const [showTableFlag, setShowTableFlag] = useState(false)
  const liveRef = useRef<HTMLInputElement>(null)
  const [searchWord, setSearchWord] = useState('')
  const [flagNew, setFlagNew] = useState('')

  function updateFunc() {
    custInit()
    resetParams()
  }
  function resetParams() {
    setSearchWord('')
    setCurrentCustomer(() => cust0)
    if (liveRef.current !== null) liveRef.current.value = ''
    return
  }
  function setShowTableHandler() {
    setShowTableFlag(() => !showTableFlag)
  }
  //
  function custInit() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'customers',
      title: 'getCust',
      setResData: setCustomers
    }
    fetchHandler(args)
  }

  useEffect(() => {
    custInit()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Customers</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h2>Customers: {customers.length}</h2>
          <CustomerSelect
            customers={customers}
            setCustomers={setCustomers}
            currentCustomer={currentCustomer}
            setCurrentCustomer={setCurrentCustomer}
            liveRef={liveRef}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            flagNew={flagNew}
            setFlagNew={setFlagNew}
            mode="new"
          />

          {currentCustomer.id === 0 ? (
            ''
          ) : (
            <CustomerEditForm
              custToEdit={
                customers.filter((item: Customer) => {
                  return item.id === Number(currentCustomer.id)
                })[0]
              }
              updateFunc={updateFunc}
              resetParams={resetParams}
            />
          )}

          <div className={styles.flexColumnContainer}>
            <button onClick={setShowTableHandler} className={styles.sysButton}>
              Show/Hide all
            </button>
            {showTableFlag ? (
              customers === undefined || customers.length === 0 ? (
                <p>No data - empty result</p>
              ) : (
                <div className={styles.tableScroll}>
                  <DBshortTable resData={customers} />
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
