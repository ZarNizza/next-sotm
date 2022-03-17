import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import type { Product } from './plus'
import initProducts from '../components/initProducts'
import ProductEditStore from '../components/ProductEditStore'
import ProductNew from '../components/ProductNew'
import ProductEditForm from '../components/ProductEditForm'

const Home: NextPage = () => {
  const [pItems, setPitems] = useState<Product[]>([])
  const [currPitem, setCurrPitem] = useState<Product['pid']>(0)
  const [newFlag, setNewFlag] = useState(false)

  initProducts(setPitems)

  return (
    <Layout>
      <Head>
        <title>Product settings</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h3>Product settings</h3>
          <ProductEditStore
            pItems={pItems}
            setCurrPitem={setCurrPitem}
            currPitem={currPitem}
            setNewFlag={setNewFlag}
          />{' '}
          {newFlag ? (
            <ProductNew
              setPitems={setPitems}
              setNewFlag={setNewFlag}
              setCurrPitem={setCurrPitem}
            />
          ) : (
            ''
          )}
          {currPitem === 0 ? (
            ''
          ) : (
            <ProductEditForm
              itemToEdit={
                pItems.filter((item: Product) => {
                  return item.pid === Number(currPitem)
                })[0]
              }
              setPitems={setPitems}
              setCurrPitem={setCurrPitem}
            />
          )}
        </div>
      </main>
    </Layout>
  )
}

export default Home
