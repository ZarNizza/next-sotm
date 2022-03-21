import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Customer } from './plus'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import CustomerSelect from '../components/CustomerSelect'
import CustomerEditForm from '../components/CustomerEditForm'
import DBshortTable from '../components/DBshortTable'
// import DBshort_ED_Table from '../components/DBshortEditDropTable'

const Home: NextPage = () => {
  const cust0 = {
    cid: 0,
    cname: '',
    cphone: '',
    gooid: ''
  }
  const [customers, setCustomers] = useState<Customer[] | []>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(cust0)
  const [updateFlag, setUpdateFlag] = useState(0)
  const [showTableFlag, setShowTableFlag] = useState(false)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentCustomer(() => cust0)
    return alert(
      'OK, Updated!\n\nTo refresh CustomerList clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentCustomer(() => cust0)
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

  useEffect(() => {
    if (updateFlag === 1) {
      custInit()
      setUpdateFlag(() => 0)
    }
  }, [updateFlag])

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
            setCurrentCustomer={setCurrentCustomer}
            currentCustomer={currentCustomer}
            setCustomers={setCustomers}
            mode="new"
          />

          {currentCustomer.cid === 0 ? (
            ''
          ) : (
            <CustomerEditForm
              custToEdit={
                customers.filter((item: Customer) => {
                  return item.cid === Number(currentCustomer.cid)
                })[0]
              }
              setUpdateFlag={setUpdF}
              cancelFlag={cancelFlag}
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
