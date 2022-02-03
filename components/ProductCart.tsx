import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function ProductCart(props) {
  function dropHandler(e: any) {
    props.setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.filter(
        (product) => product !== Number(e.target.value)
      )
    })
  }
  function inputChange(e: any) {
    console.log('inputChange', e.target.name, e.target.value)
  }
  const qqq = props.selectedProducts.map((pid) => (
    <li key={pid}>
      <input
        type="text"
        name="pSum"
        onChange={inputChange}
        className={styles.inputSum}
      />{' '}
      {
        (props.products.find((item) => item.pid === pid) ?? { pname: 'xxx' })
          .pname
      }{' '}
      <button value={pid} onClick={dropHandler} className={styles.dropButton}>
        {' '}
        X{' '}
      </button>
    </li>
  ))
  function setHandler() {
    const qList: HTMLInputElement[] = document.getElementsByName('pSum')
    //  inputValue = (<HTMLInputElement>document.getElementById(elementId)).value;
    //  inputElement = <HTMLInputElement>document.getElementById('greet');
    //  const inputElement: HTMLInputElement = document.getElementById('greet')
    //  const inputElement = document.getElementById('greet') as HTMLInputElement
    //////  const inputValue = inputElement.value

    // const currentCustomer = 0

    props.selectedProducts.map((item, i) => {
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
              <a className={styles.footerLink}>
                &lt; &lt; &lt; &nbsp;&nbsp;Return to StartPage&nbsp;&nbsp; &gt;
                &gt; &gt;
              </a>
            </Link>
          </p>
        </>
      ) : (
        <>
          <h3>ProductCart</h3>
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
