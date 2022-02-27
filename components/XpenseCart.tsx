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
  const qqq = props.selectedEitems.map((eid: Eitem['eid']) => (
    <li key={eid}>
      <input
        type="text"
        onChange={inputSumChangeHandler(eid)}
        className={styles.inputSum}
        placeholder="price"
        pattern="^[\d]{0,6}"
      />{' '}
      {
        (
          props.eItems.find((item: Eitem) => item.eid === eid) ?? {
            ename: 'xxx'
          }
        ).ename
      }{' '}
      <button
        value={eid}
        onClick={dropButtonHandler(eid)}
        className={stylesH.dropButton}
      >
        {' X '}
      </button>
    </li>
  ))

  function dropButtonHandler(eid: Eitem['eid']) {
    return () => {
      props.setSelectedEitems((prevSelectedEitems) => {
        delete props.eCostRef.current[eid]
        props.setGross(
          Object.values(props.eCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          )
        )
        return prevSelectedEitems.filter((eItem) => eItem !== Number(eid))
      })
    }
  }

  function inputSumChangeHandler(eid: Eitem['eid']) {
    const handler: ChangeEventHandler<HTMLInputElement> = (event) => {
      props.eCostRef.current[eid] = Number(
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
    props.selectedEitems.map((eid: number) => {
      if (isNaN(props.eCostRef.current[eid])) {
        alert('Attention: The Price must be a Number!')
      } else {
        const xsale = {
          mode: 'new',
          xitem: eid,
          xsum: props.eCostRef.current[eid]
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
                prevSelectedEitems.filter((eItem) => eItem !== Number(eid))
              )
              delete props.eCostRef.current[eid]
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
