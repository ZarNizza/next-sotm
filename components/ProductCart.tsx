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
  function inputChange(e: any) {
    console.log('inputChange', e.target.name, e.target.value)
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
    //  inputValue = (<HTMLInputElement>document.getElementById(elementId)).value;
    //  inputElement = <HTMLInputElement>document.getElementById('greet');
    //  const inputElement: HTMLInputElement = document.getElementById('greet')
    //  const inputElement = document.getElementById('greet') as HTMLInputElement
    //////  const inputValue = inputElement.value

    // const currentCustomer = 0

    props.selectedProducts.map((item: Product, i: number) => {
      const sale = {
        customer: props.currentCustomer,
        prod: item,
        sum: qList[i].value
      }
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
          <button onClick={setHandler} className={styles.buttonOk}>
            {' '}
            Sale it!{' '}
          </button>
        </>
      )}
    </div>
  )
}
