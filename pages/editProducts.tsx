import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import type { Product } from './plus'
import Init from '../components/Init'
import ProductEditStore from '../components/ProductEditStore'
import ProductNew from '../components/ProductNew'
import ProductEditForm from '../components/ProductEditForm'

const Home: NextPage = () => {
  const [pItems, setPitems] = useState<Product[]>([])
  const [currPitem, setCurrPitem] = useState<Product['id']>(0)
  const [newFlag, setNewFlag] = useState(false)

  useEffect(() => {
    Init(setPitems, 'products')
  }, [])

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
                  return item.id === Number(currPitem)
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
