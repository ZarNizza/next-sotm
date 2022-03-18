import type { Customer, Product } from '../pages/plus'
import styles from './ProductCart.module.scss'
import stylesH from '../styles/Home.module.css'
import Link from 'next/link'
import {
  ChangeEventHandler,
  Dispatch,
  MutableRefObject,
  SetStateAction
} from 'react'

type ProductCartProps = {
  setSelectedProducts: Dispatch<SetStateAction<number[]>>
  selectedProducts: number[]
  products: Product[]
  currentCustomer: Customer
  gross: number
  setGross: Dispatch<SetStateAction<number>>
  prodCostRef: MutableRefObject<Record<number, number>>
}

export default function ProductCart(props: ProductCartProps) {
  const qqq = props.selectedProducts.map((pid: Product['pid']) => (
    <li key={pid}>
      <input
        type="text"
        onChange={inputSumChangeHandler(pid)}
        className={styles.inputSum}
        placeholder="price"
        pattern="^[\d]{0,6}"
      />{' '}
      {
        (
          props.products.find((item: Product) => item.pid === pid) ?? {
            pname: 'xxx'
          }
        ).pname
      }{' '}
      <button
        value={pid}
        onClick={dropButtonHandler(pid)}
        className={stylesH.dropButton}
      >
        {' X '}
      </button>
    </li>
  ))

  function dropButtonHandler(pid: Product['pid']) {
    return () => {
      props.setSelectedProducts((prevSelectedProducts) => {
        delete props.prodCostRef.current[pid]
        props.setGross(
          Object.values(props.prodCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          )
        )
        return prevSelectedProducts.filter((product) => product !== Number(pid))
      })
    }
  }

  function inputSumChangeHandler(pid: Product['pid']) {
    const handler: ChangeEventHandler<HTMLInputElement> = (event) => {
      props.prodCostRef.current[pid] = Number(
        event.target.value.replace(/[^\d]/g, '')
      )
      props.setGross(
        Object.values(props.prodCostRef.current).reduce(
          (prev, curr) => prev + curr,
          0
        )
      )
    }
    return handler
  }

  function saveSaleHandler() {
    if (props.currentCustomer.cid === 0) {
      alert('Attention: Select Customer!')
      return
    }
    props.selectedProducts.map((pid: number) => {
      if (isNaN(props.prodCostRef.current[pid])) {
        alert('Attention: The Price must be a Number!')
      } else {
        const sale = {
          mode: 'new',
          cust: props.currentCustomer.cid,
          prod: pid,
          sum: props.prodCostRef.current[pid]
        }
        fetch('/api/sales', {
          method: 'POST',
          body: JSON.stringify(sale)
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              console.log('--- prodCart DB/api error: ' + res.error)
              alert('DataBase error: X3')
            } else {
              props.setSelectedProducts((prevSelectedProducts) =>
                prevSelectedProducts.filter(
                  (product) => product !== Number(pid)
                )
              )
              delete props.prodCostRef.current[pid]
            }
          })
          .catch((error) => {
            console.log('--- catch prodCart fetch error - ', error)
            alert('fetch data error: X3')
          })
      }
    })
  }

  return (
    <div className={styles.productList}>
      {qqq.length === 0 ? (
        <>
          <p>
            <span>&uarr; &uarr; &uarr;&nbsp;&nbsp;</span> select product{' '}
            <span>&nbsp;&nbsp;&uarr; &uarr; &uarr;</span>
          </p>
          <p>
            <span>or</span>
          </p>
          <p>
            <Link href="/">
              <a>
                <span>&lt; Return to StartPage &gt;</span>
              </a>
            </Link>
          </p>
        </>
      ) : (
        <>
          <h3>&#9825; ProductCart</h3>
          <ul>{qqq}</ul>
          <div className={styles.flexRow}>
            <span className={styles.grossSum}>
              {props.gross.toLocaleString('ru-RU')}
            </span>
            <button onClick={saveSaleHandler} className={styles.buttonOk}>
              {' '}
              Sale it!
            </button>
          </div>
        </>
      )}
    </div>
  )
}
