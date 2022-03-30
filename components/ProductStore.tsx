import { CheckBoxButton } from './CheckBoxButton'
import type { Product } from '../pages/plus'
import styles from '../styles/Home.module.css'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'

interface ProductStoreProps {
  products: Product[]
  setSelectedProducts: Dispatch<SetStateAction<number[]>>
  selectedProducts: number[]
  prodCostRef: MutableRefObject<Record<number, number>>
  prodCostDRef: MutableRefObject<Record<number, number>>
  setGross: Dispatch<SetStateAction<number>>
}

export default function ProductStore(props: ProductStoreProps) {
  //
  const productCheckBoxesSet = props.products.map((item: Product) => {
    //
    function checkHandler() {
      props.setSelectedProducts((prevSelectedProducts) => {
        if (item.id) {
          delete props.prodCostRef.current[item.id]
          delete props.prodCostDRef.current[item.id]
        }
        props.setGross(
          Object.values(props.prodCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          ) +
            Object.values(props.prodCostRef.current).reduce(
              (prev, curr) => prev + curr,
              0
            )
        )
        return prevSelectedProducts.includes(item.id)
          ? prevSelectedProducts.filter(
              (product: Product['id']) => product !== item.id
            )
          : [...prevSelectedProducts, item.id]
      })
    }

    return (
      <CheckBoxButton
        key={item.id}
        text={item.symbol}
        onClick={checkHandler}
        checked={props.selectedProducts.includes(item.id)}
      />
    )
  })

  return <div className={styles.flexRowContainer}>{productCheckBoxesSet}</div>
}
