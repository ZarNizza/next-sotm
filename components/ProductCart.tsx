import type { Product } from '../pages/add'
import styles from './ProductCart.module.scss'

import Link from 'next/link'

export default function ProductCart(props: any) {
  function dropHandler(e: any) {
    props.setSelectedProducts((prevSelectedProducts: [Product['pid']]) => {
      return prevSelectedProducts.filter(
        (product) => product !== Number(e.target.value)
      )
    })
  }

  function inputChange() {
    const qList: any[] = Array.from(document.getElementsByName('pSum'))
    const gSum = qList.reduce((prev, curr) => prev + Number(curr.value), 0)
    const gS = document.getElementById('grossSum')
    if (gS !== null) gS.innerHTML = gSum.toLocaleString('ru-RU')
  }

  const qqq = props.selectedProducts.map((pid: Product['pid']) => (
    <li key={pid}>
      <input
        type="text"
        name="pSum"
        onChange={inputChange}
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
      <button value={pid} onClick={dropHandler} className={styles.dropButton}>
        {' '}
        X{' '}
      </button>
    </li>
  ))

  function setHandler() {
    const qList: any[] = Array.from(document.getElementsByName('pSum'))
    props.selectedProducts.map((item: Product, i: number) => {
      const sale = {
        customer: props.currentCustomer[0],
        prod: item,
        sum: qList[i].value
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
          <p>select product</p>
          <p>or</p>
          <p>
            <Link href="/">
              &lt; &lt; &lt; &nbsp;&nbsp;Return to StartPage&nbsp;&nbsp; &gt;
              &gt; &gt;
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
              Sale it!{' '}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
