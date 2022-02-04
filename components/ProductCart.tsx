import type { Product } from '../pages/add'
import styles from './ProductCart.module.scss'
import Link from 'next/link'
import { ChangeEventHandler, useEffect, useRef } from 'react'

export default function ProductCart(props: any) {
  const myRef = useRef<Record<Product['pid'], number>>({})
  const grossSumRef = useRef<number>(0)

  useEffect(() => {
    const gS = document.getElementById('grossSum')
    console.log('-------------- useEffect--------- gs=', gS)
    if (gS !== null) gS.innerHTML = grossSumRef.current.toLocaleString('ru-RU')
  }, [grossSumRef.current])

  function dropHandler(e: any) {
    props.setSelectedProducts((prevSelectedProducts: [Product['pid']]) => {
      return prevSelectedProducts.filter(
        (product) => product !== Number(e.target.value)
      )
    })
  }

  function dropHandler2(pid: Product['pid']) {
    return () => {
      props.setSelectedProducts((prevSelectedProducts: [Product['pid']]) => {
        delete myRef.current[pid]
        return prevSelectedProducts.filter((product) => product !== Number(pid))
      })
    }
  }

  function inputChange() {
    const qList = Array.from(
      document.getElementsByName('pSum')
    ) as HTMLInputElement[]
    const gSum = qList.reduce((prev, curr) => prev + Number(curr.value), 0)
    const gS = document.getElementById('grossSum')
    if (gS !== null) gS.innerHTML = gSum.toLocaleString('ru-RU')
  }
  //
  // - чистка myRef при снятии чека на чекбоксе
  // - обновлять гроссСум
  //
  //
  //

  function inputChange2(pid: Product['pid']) {
    const handler: ChangeEventHandler<HTMLInputElement> = (event) => {
      console.log('for pid-', pid, ' the new value =', event.target.value)
      myRef.current[pid] = Number(event.target.value)
      console.log('myRefCurr[]=', myRef.current)
      grossSumRef.current = Object.values(myRef.current).reduce(
        (prev, curr) => prev + curr,
        0
      )
      console.log('grossSum=', grossSumRef.current)
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
        {' '}
        X{' '}
      </button>
    </li>
  ))

  function setHandler() {
    // const qList: any[] = Array.from(document.getElementsByName('pSum'))
    props.selectedProducts.map((pid: number) => {
      const sale = {
        customer: props.currentCustomer[0],
        prod: pid,
        // sum: qList[i].value
        sum: myRef.current[pid]
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
          <p>or</p>
          <p>
            <Link href="/">
              <a>
                <span>&lt; &lt; &lt; &nbsp;&nbsp;</span> Return to StartPage
                <span>&nbsp;&nbsp; &gt; &gt; &gt;</span>
              </a>
            </Link>
          </p>
        </>
      ) : (
        <>
          <h3>&#9825; ProductCart</h3>
          <ul>{qqq}</ul>
          <div className={styles.flexRow}>
            <span className={styles.grossSum} id="grossSum"></span>
            <button onClick={setHandler} className={styles.buttonOk}>
              {' '}
              Sale it!
            </button>
            {grossSumRef.current}
          </div>
        </>
      )}
    </div>
  )
}
