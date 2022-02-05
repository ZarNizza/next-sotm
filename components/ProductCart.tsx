import type { Product } from '../pages/add'
import styles from './ProductCart.module.scss'
import Link from 'next/link'
import {
  ChangeEventHandler,
  Dispatch,
  MutableRefObject,
  SetStateAction
} from 'react'

interface ProductCartProps {
  setSelectedProducts: Dispatch<SetStateAction<number[]>>
  selectedProducts: number[]
  products: Product[]
  currentCustomer: [number, string]
  gross: number
  setGross: Dispatch<SetStateAction<number>>
  prodCostRef: MutableRefObject<Record<number, number>>
}
export default function ProductCart(props: ProductCartProps) {
  function dropHandler2(pid: Product['pid']) {
    return () => {
      props.setSelectedProducts((prevSelectedProducts) => {
        delete props.prodCostRef.current[pid]
        props.setGross(
          Object.values(props.prodCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          )
        )
        console.log('prodCart - prodCostRefCurrent', props.prodCostRef.current)

        return prevSelectedProducts.filter((product) => product !== Number(pid))
      })
    }
  }
  function inputChange2(pid: Product['pid']) {
    const handler: ChangeEventHandler<HTMLInputElement> = (event) => {
      props.prodCostRef.current[pid] = Number(event.target.value)
      props.setGross(
        Object.values(props.prodCostRef.current).reduce(
          (prev, curr) => prev + curr,
          0
        )
      )
    }
    return handler
  }

  const qqq = props.selectedProducts.map((pid: Product['pid']) => (
    <li key={pid}>
      <input
        type="text"
        name="pSum"
        onChange={inputChange2(pid)}
        className={styles.inputSum}
        placeholder="price"
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
        onClick={dropHandler2(pid)}
        className={styles.dropButton}
      >
        {' X '}
      </button>
    </li>
  ))

  function setHandler() {
    props.selectedProducts.map((pid: number) => {
      const sale = {
        customer: props.currentCustomer[0],
        prod: pid,
        sum: props.prodCostRef.current[pid]
      }
      console.log('sale=', sale)
      fetch('/api/sales', {
        method: 'POST',
        body: JSON.stringify(sale)
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('SYS: saveSale = OK', res)
          props.setSelectedProducts([])
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
                <span>
                  &lt; &lt; &lt; &nbsp;&nbsp; Return to StartPage &nbsp;&nbsp;
                  &gt; &gt; &gt;
                </span>
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
            <button onClick={setHandler} className={styles.buttonOk}>
              {' '}
              Sale it!
            </button>
          </div>
        </>
      )}
    </div>
  )
}
