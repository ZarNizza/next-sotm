import { CheckBoxButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'

export default function ProductStore(props) {
  const prodSet = props.products.map((item) => {
    function checkHandler() {
      props.setSelectedProducts((prevSelectedProducts) => {
        return prevSelectedProducts.includes(item.pid)
          ? prevSelectedProducts.filter((product) => product !== item.pid)
          : [...prevSelectedProducts, item.pid]
      })
    }

    return (
      <CheckBoxButton
        key={item.pid}
        text={item.psymbol}
        onClick={checkHandler}
        checked={props.selectedProducts.includes(item.pid)}
      />
    )
  })

  return <div className={styles.flexRowContainer}>{prodSet}</div>
}
