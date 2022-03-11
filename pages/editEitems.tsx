import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import DBshort_ED_Table from '../components/DBshortEditDropTable'
import EitemSelect from '../components/EitemSelect'
import EitemEditForm from '../components/EitemEditForm'
import { Eitem } from './minus'
import DBshortTable from '../components/DBshortTable'

const Home: NextPage = () => {
  const [eItems, setEitems] = useState<Eitem[] | []>([])
  const [currentEitem, setCurrentEitem] = useState<Eitem>({
    eid: 0,
    ename: '',
    esymbol: ''
  })
  const [updateFlag, setUpdateFlag] = useState(0)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentEitem({ eid: 0, ename: '', esymbol: '' })
    return alert(
      'OK, Updated!\n\nTo refresh E-item-List clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentEitem({ eid: 0, ename: '', esymbol: '' })
  }
  //
  function eInit() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'eitems',
      title: 'getEitems',
      setResData: setEitems
    }
    fetchHandler(args)
  }

  useEffect(() => {
    eInit()
  }, [])

  useEffect(() => {
    if (updateFlag === 1) {
      eInit()
      setUpdateFlag(() => 0)
    }
  }, [updateFlag])

  return (
    <Layout>
      <Head>
        <title>Exp-items</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Expense Items: {eItems.length}</h2>
          <EitemSelect
            eItems={eItems}
            setCurrentEitem={setCurrentEitem}
            currentEitem={currentEitem}
            setEitems={setEitems}
            mode="new"
          />
          {currentEitem.eid === 0 ? (
            ''
          ) : (
            <EitemEditForm
              eitemToEdit={
                eItems.filter((item: Eitem) => {
                  return item.eid === Number(currentEitem.eid)
                })[0]
              }
              setUpdateFlag={setUpdF}
              cancelFlag={cancelFlag}
            />
          )}

          <div>
            {
              eItems === undefined || eItems.length === 0 ? (
                <p>No data - empty result</p>
              ) : eItems.length > 20 ? (
                <p>.. long items list, see it on Sys page</p>
              ) : (
                <DBshortTable resData={eItems} />
              )
              // <DBshortTable resData={customers} target="customers" />
            }
          </div>
          {/* <div>
            {eItems === undefined || eItems.length === 0 ? (
              <p>No data - empty result</p>
            ) : (
              <DBshort_ED_Table resData={eItems} target="eItems" />
            )}
          </div> */}
        </main>
      </div>
    </Layout>
  )
}

export default Home
