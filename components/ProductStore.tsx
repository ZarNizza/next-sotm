import { CheckBoxButton } from './CheckBoxButton'
import type { Product } from '../pages/add'
import styles from '../styles/Home.module.css'

export default function ProductStore(props: any) {
  const prodSet = props.products.map((item: Product) => {
    function checkHandler() {
      props.setSelectedProducts((prevSelectedProducts: [Product['pid']]) => {
        return prevSelectedProducts.includes(item.pid)
          ? prevSelectedProducts.filter(
              (product: Product['pid']) => product !== item.pid
            )
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
