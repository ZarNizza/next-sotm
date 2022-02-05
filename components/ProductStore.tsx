import { CheckBoxButton } from './CheckBoxButton'
import type { Product } from '../pages/add'
import styles from '../styles/Home.module.css'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'

interface ProductStoreProps {
  products: Product[]
  setSelectedProducts: Dispatch<SetStateAction<number[]>>
  selectedProducts: number[]
  prodCostRef: MutableRefObject<Record<number, number>>
  setGross: Dispatch<SetStateAction<number>>
}

export default function ProductStore(props: ProductStoreProps) {
  const productCheckBoxesSet = props.products.map((item: Product) => {
    function checkHandler() {
      props.setSelectedProducts((prevSelectedProducts) => {
        if (item.pid) delete props.prodCostRef.current[item.pid]
        props.setGross(
          Object.values(props.prodCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          )
        )
        console.log('prodStore - prodCostRefCurrent', props.prodCostRef.current)
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

  return <div className={styles.flexRowContainer}>{productCheckBoxesSet}</div>
}
