import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import type { Product } from '../pages/plus'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'

type ProductSelectProps = {
  products: Product[]
  setCurrentProduct: Dispatch<SetStateAction<Product>>
  currentProduct: Product
  setProducts: Dispatch<SetStateAction<Product[] | []>>
  mode: string
}

export default function ProductSelect(props: ProductSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const ProductInputRef = useRef<HTMLInputElement>(null)
  const [flagNewProduct, setFlagNewProduct] = useState('')
  const [newPname, setNewPname] = useState('')
  const [newPsymbol, setNewPsymbol] = useState('')

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    props.setCurrentProduct({ pid: 0, pname: '', psymbol: '' })
  }

  function liveST(e: ChangeEvent<HTMLSelectElement>) {
    const indexST = e.target.value
    const st = props.products.filter((item: Product) => {
      return item.pid === Number(indexST)
    })
    if (st.length === 1 && ProductInputRef.current !== null) {
      const curr = st[0]
      ProductInputRef.current.value = curr.pname
      props.setCurrentProduct({
        pid: Number(curr.pid),
        pname: curr.pname,
        psymbol: curr.psymbol
      })
    }
  }

  function dropButtonHandler() {
    setSearchTerm(() => '')
    if (ProductInputRef.current !== null) ProductInputRef.current.value = ''
    props.setCurrentProduct({ pid: 0, pname: '', psymbol: '' })
  }

  function newButtonHandler() {
    setFlagNewProduct(() => 'Y')
  }
  function saveNewHandler() {
    return new Promise((resolveSS, rejectSS) => {
      const body = { mode: 'new', pname: newPname, psymbol: newPsymbol }
      fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log('--- saveNew-P DB/api error: ' + res.error)
            alert('DataBase error: X3')
            rejectSS(res.error)
          } else {
            resolveSS(res)
          }
        })
        .catch((error) => {
          console.log('--- catch saveNew-P fetch error - ', error)
          alert('fetch data error: X3')
        })
    })
      .then(() => {
        new Promise((resolveUC, rejectUC) => {
          fetch('/api/products')
            .then((apiRes) => apiRes.json())
            .then((apiRes) => {
              if (apiRes.error) {
                console.log('--- P-Select DB/api error: ' + apiRes.error)
                alert('DataBase error: X3')
                rejectUC(apiRes.error)
              } else {
                props.setProducts(() => apiRes.data || [])
                resolveUC(apiRes)
              }
            })
            .catch((error) => {
              console.log('--- catch P-Select fetch error - ', error)
              alert('fetch data error: X3')
            })
        })
      })
      .then(() => {
        setNewPname(() => '')
        setNewPsymbol(() => '')
        setFlagNewProduct(() => '')
      })
      .catch()
  }

  function cancelNewHandler() {
    setNewPname(() => '')
    setNewPsymbol(() => '')
    setFlagNewProduct(() => '')
  }

  function SearchResultsList() {
    let iList = props.products
      .filter((item: Product) => {
        return item.pname.toLowerCase().includes(searchTerm)
      })
      .map((item: Product) => {
        return (
          <option value={item.pid} key={item.pid}>
            {item.pname}
          </option>
        )
      })
    return (
      <select onChange={liveST} size={4}>
        {iList}
      </select>
    )
  }

  return (
    <>
      <div className={styles.custList}>
        {/* <p className={styles.title}>Product</p> */}
        <input
          type="search"
          ref={ProductInputRef}
          placeholder="Search for a Product"
          pattern="/[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:]/gi"
          onChange={liveSearch}
          className={styles.inputCust}
        />
        <button
          onClick={newButtonHandler}
          className={stylesH.plusButton}
          hidden={props.mode === 'stat'}
        >
          +New
        </button>
        <button onClick={dropButtonHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>
      <div
        className={styles.floatWrapper}
        hidden={searchTerm === '' || props.currentProduct.pid > 0}
      >
        <div className={styles.custSelect}>
          <SearchResultsList />
        </div>
      </div>

      <div className={styles.floatWrapper} hidden={flagNewProduct === ''}>
        <div className={styles.newCust}>
          <p className={styles.title}>New Product</p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Name"
              pattern="/[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
              value={newPname}
              onChange={(event) =>
                setNewPname(
                  event.target.value.replace(
                    /[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:]/gi,
                    ''
                  )
                )
              }
            />
          </p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="up to 7 symbols"
              pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
              value={newPsymbol}
              onChange={(event) =>
                setNewPsymbol(
                  event.target.value.replace(
                    /[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi,
                    ''
                  )
                )
              }
            />
          </p>
          <p>
            <button onClick={saveNewHandler} className={stylesH.sysButton}>
              Save
            </button>
            <button onClick={cancelNewHandler} className={stylesH.sysButton}>
              Cancel
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
