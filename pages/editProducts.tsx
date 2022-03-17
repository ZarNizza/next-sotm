import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import ProductSelect from '../components/ProductSelect'
import ProductEditForm from '../components/ProductEditForm'
import { Product } from './plus'
import DBshortTable from '../components/DBshortTable'

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[] | []>([])
  const [currentProduct, setCurrentProduct] = useState<Product>({
    pid: 0,
    pname: '',
    psymbol: ''
  })
  const [updateFlag, setUpdateFlag] = useState(0)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentProduct({ pid: 0, pname: '', psymbol: '' })
    return alert(
      'OK, Updated!\n\nTo refresh Product List clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentProduct({ pid: 0, pname: '', psymbol: '' })
  }
  //
  function pInit() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'products',
      title: 'getProducts',
      setResData: setProducts
    }
    fetchHandler(args)
  }

  useEffect(() => {
    pInit()
  }, [])

  useEffect(() => {
    if (updateFlag === 1) {
      pInit()
      setUpdateFlag(() => 0)
    }
  }, [updateFlag])

  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Products: {products.length}</h2>
          <ProductSelect
            products={products}
            setCurrentProduct={setCurrentProduct}
            currentProduct={currentProduct}
            setProducts={setProducts}
            mode="new"
          />
          {currentProduct.pid === 0 ? (
            ''
          ) : (
            <ProductEditForm
              productToEdit={
                products.filter((item: Product) => {
                  return item.pid === Number(currentProduct.pid)
                })[0]
              }
              setUpdateFlag={setUpdF}
              cancelFlag={cancelFlag}
            />
          )}

          <div className={styles.tableScroll}>
            {products === undefined || products.length === 0 ? (
              <p>No data - empty result</p>
            ) : products.length > 20 ? (
              <p>.. long items list, see it on Sys page</p>
            ) : (
              <DBshortTable resData={products} />
            )}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
