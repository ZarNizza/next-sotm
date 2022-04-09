import type { Customer, Product } from '../pages/plus'
import styles from './ProductCart.module.scss'
import stylesH from '../styles/Home.module.css'
import Link from 'next/link'
import {
  ChangeEventHandler,
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction
} from 'react'
import { AppContext } from './AppContext'
import { useContext } from 'react'

type SumProps = { id: number; value: number }

type ProductCartProps = {
  setSelectedProducts: Dispatch<SetStateAction<number[]>>
  selectedProducts: number[]
  products: Product[]
  currentCustomer: Customer
  gross: number
  setGross: Dispatch<SetStateAction<number>>
  prodCostRef: MutableRefObject<Record<number, number>>
  prodCostDRef: MutableRefObject<Record<number, number>>
  inputSumChangeHandler: FC<SumProps>
  inputSumDChangeHandler: FC<SumProps>
  dropButton_Handler: FC<number>
}

export default function ProductCart(props: ProductCartProps) {
  const c = useContext(AppContext)
  const qqq = props.selectedProducts.map((id: Product['id']) => (
    <li key={id}>
      <div className={styles.productNameRow}>
        {
          (
            props.products.find((item: Product) => item.id === id) ?? {
              name: 'xxx'
            }
          ).name
        }
      </div>{' '}
      <div className={styles.inputSumRow}>
        <div className={styles.summSpan}>
          <input
            type="text"
            onChange={(event) =>
              props.inputSumChangeHandler({
                id: id,
                value: Number(event.target.value.replace(/[^\d]/g, ''))
              })
            }
            className={styles.inputSum}
            placeholder={String(props.prodCostRef.current[id])}
            pattern="^[\d]{0,8}"
          />
          {'± '}
          <input
            type="text"
            onChange={(event) =>
              props.inputSumDChangeHandler({
                id: id,
                value: Number(event.target.value.replace(/[^\d]/g, ''))
              })
            }
            className={styles.inputSumD}
            placeholder="+/- d"
            pattern="^[\d\+\-]{0,6}"
          />
        </div>{' '}
        <button
          value={id}
          onClick={() => props.dropButton_Handler(id)}
          className={stylesH.dropButton}
        >
          {' X '}
        </button>
      </div>
    </li>
  ))

  function saveSaleHandler() {
    if (props.currentCustomer.id === 0) {
      alert(c.t.attentionSelCust)
      return
    }
    props.selectedProducts.map((id: number) => {
      if (isNaN(props.prodCostRef.current[id])) {
        alert(c.t.attentionPrice)
      } else {
        const sale = {
          mode: 'new',
          cust: props.currentCustomer.id,
          prod: id,
          sum: props.prodCostRef.current[id],
          sumd: props.prodCostDRef.current[id] || 0
        }
        fetch('/api/sales', {
          method: 'POST',
          body: JSON.stringify(sale)
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              console.log('--- prodCart DB/api error: ' + res.error)
              alert(c.t.db_errX3 + '\n' + res.error)
            } else {
              props.setSelectedProducts((prevSelectedProducts) =>
                prevSelectedProducts.filter((product) => product !== Number(id))
              )
              delete props.prodCostRef.current[id]
            }
          })
          .catch((error) => {
            console.log('--- catch prodCart fetch error - ', error)
            alert('fetch ' + c.t.db_errX3 + '\n' + error)
          })
      }
    })
  }

  return (
    <div className={styles.productList}>
      {qqq.length === 0 ? (
        <>
          <p>
            <span>&uarr; &uarr; &uarr;&nbsp;&nbsp;</span>
            {c.t.selProd}
            <span>&nbsp;&nbsp;&uarr; &uarr; &uarr;</span>
          </p>
          <p>
            <span>{c.t.or}</span>
          </p>
          <p>
            <Link href="/">
              <a>
                <span>&lt; {c.t.return2start} &gt;</span>
              </a>
            </Link>
          </p>
        </>
      ) : (
        <>
          <h3>&#9825; {c.t.prodCart}</h3>
          <ul>{qqq}</ul>
          <div className={styles.flexRow}>
            <span className={styles.grossSum}>
              {props.gross.toLocaleString('ru-RU')}
            </span>
            <button onClick={saveSaleHandler} className={styles.buttonOk}>
              {c.t.saleIt}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
