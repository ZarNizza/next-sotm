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
import { Eitem } from '../pages/minus'
import { AppContext } from './AppContext'
import { useContext } from 'react'

type SumProps = { id: number; value: number }

type XpenseCartProps = {
  setSelectedEitems: Dispatch<SetStateAction<number[]>>
  selectedEitems: number[]
  eItems: Eitem[]
  gross: number
  setGross: Dispatch<SetStateAction<number>>
  eCostRef: MutableRefObject<Record<number, number>>
  inputSumChangeHandler: FC<SumProps>
  dropButton_Handler: FC<number>
}

export default function XpenseCart(props: XpenseCartProps) {
  const c = useContext(AppContext)
  const qqq = props.selectedEitems.map((id: Eitem['id']) => (
    <li key={id}>
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
            style={{ flex: '0 0 auto' }}
            placeholder={String(props.eCostRef.current[id])}
            pattern="^[\d]{0,6}"
          />
          {
            (
              props.eItems.find((item: Eitem) => item.id === id) ?? {
                name: 'xxx'
              }
            ).name
          }
        </div>
        <button
          value={id}
          onClick={() => props.dropButton_Handler(id)}
          className={stylesH.dropButton}
          style={{ flex: '0 0 auto' }}
        >
          {' X '}
        </button>
      </div>
    </li>
  ))

  function saveX_Handler() {
    props.selectedEitems.map((id: number) => {
      if (isNaN(props.eCostRef.current[id])) {
        alert(c.t.attentionPrice)
      } else {
        const xsale = {
          mode: 'new',
          xitem: id,
          sum: props.eCostRef.current[id]
        }
        fetch('/api/xpenses', {
          method: 'POST',
          body: JSON.stringify(xsale)
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              console.log('--- eCart DB/api error: ' + res.error)
              alert(c.t.db_errX3 + '\n' + res.error)
            } else {
              props.setSelectedEitems((prevSelectedEitems) =>
                prevSelectedEitems.filter((eItem) => eItem !== Number(id))
              )
              delete props.eCostRef.current[id]
            }
          })
          .catch((error) => {
            console.log('--- catch eCart fetch error - ', error)
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
            {c.t.selItem} <span>&nbsp;&nbsp;&uarr; &uarr; &uarr;</span>
          </p>
        </>
      ) : (
        <>
          <h3>&#9825; {c.t.xCart}</h3>
          <ul>{qqq}</ul>
          <div className={styles.flexRow}>
            <span className={styles.grossSum}>
              {props.gross.toLocaleString('ru-RU')}
            </span>
            <button onClick={saveX_Handler} className={styles.buttonOk}>
              {' '}
              {c.t.byIt}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
