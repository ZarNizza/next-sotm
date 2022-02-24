import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Customer } from './add'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import DBshort_ED_Table from '../components/DBshortEditDropTable'
import CustomerSelect from '../components/CustomerSelect'
import CustomerEditForm from '../components/CustomerEditForm'

const Home: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[] | []>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer>({
    cid: 0,
    cname: '',
    cphone: '',
    gooid: ''
  })
  const [updateFlag, setUpdateFlag] = useState(0)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentCustomer({ cid: 0, cname: '', cphone: '', gooid: '' })
    return alert(
      'OK, Updated!\nTo refresh CustomerList clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentCustomer({ cid: 0, cname: '', cphone: '', gooid: '' })
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Customers:</h2>
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

          {/* <div>
            {customers === undefined || customers.length === 0 ? (
              <p>No data - empty result</p>
            ) : (
              <DBshort_ED_Table resData={customers} target="customers" />
            )}
          </div> */}
        </main>
      </div>
    </Layout>
  )
}

export default Home
