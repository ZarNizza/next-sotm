import styles from './ProductCart.module.scss'
import stylesH from '../styles/Home.module.css'
import Link from 'next/link'
import {
  ChangeEventHandler,
  Dispatch,
  MutableRefObject,
  SetStateAction
} from 'react'
import { Eitem } from '../pages/minus'

type XpenseCartProps = {
  setSelectedEitems: Dispatch<SetStateAction<number[]>>
  selectedEitems: number[]
  eItems: Eitem[]
  gross: number
  setGross: Dispatch<SetStateAction<number>>
  eCostRef: MutableRefObject<Record<number, number>>
}

export default function XpenseCart(props: XpenseCartProps) {
  const qqq = props.selectedEitems.map((id: Eitem['id']) => (
    <li key={id}>
      <input
        type="text"
        onChange={inputSumChangeHandler(id)}
        className={styles.inputSum}
        placeholder="price"
        pattern="^[\d]{0,6}"
      />{' '}
      {
        (
          props.eItems.find((item: Eitem) => item.id === id) ?? {
            name: 'xxx'
          }
        ).name
      }{' '}
      <button
        value={id}
        onClick={dropButtonHandler(id)}
        className={stylesH.dropButton}
      >
        {' X '}
      </button>
    </li>
  ))

  function dropButtonHandler(id: Eitem['id']) {
    return () => {
      props.setSelectedEitems((prevSelectedEitems) => {
        delete props.eCostRef.current[id]
        props.setGross(
          Object.values(props.eCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          )
        )
        return prevSelectedEitems.filter((eItem) => eItem !== Number(id))
      })
    }
  }

  function inputSumChangeHandler(id: Eitem['id']) {
    const handler: ChangeEventHandler<HTMLInputElement> = (event) => {
      props.eCostRef.current[id] = Number(
        event.target.value.replace(/[^\d]/g, '')
      )
      props.setGross(
        Object.values(props.eCostRef.current).reduce(
          (prev, curr) => prev + curr,
          0
        )
      )
    }
    return handler
  }

  function saveX_Handler() {
    props.selectedEitems.map((id: number) => {
      if (isNaN(props.eCostRef.current[id])) {
        alert('Attention: The Price must be a Number!')
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
              alert('DataBase error: X3')
            } else {
              props.setSelectedEitems((prevSelectedEitems) =>
                prevSelectedEitems.filter((eItem) => eItem !== Number(id))
              )
              delete props.eCostRef.current[id]
            }
          })
          .catch((error) => {
            console.log('--- catch eCart fetch error - ', error)
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
            <span>&uarr; &uarr; &uarr;&nbsp;&nbsp;</span> select item{' '}
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
          <h3>&#9825; Xpense Cart</h3>
          <ul>{qqq}</ul>
          <div className={styles.flexRow}>
            <span className={styles.grossSum}>
              {props.gross.toLocaleString('ru-RU')}
            </span>
            <button onClick={saveX_Handler} className={styles.buttonOk}>
              {' '}
              Xpense it!
            </button>
          </div>
        </>
      )}
    </div>
  )
}
