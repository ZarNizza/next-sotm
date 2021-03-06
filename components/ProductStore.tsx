import { CheckBoxButton, CheckBoxNewButton } from './CheckBoxButton'
import type { Product } from '../pages/plus'
import styles from '../styles/Home.module.css'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { AppContext } from './AppContext'
import { useContext } from 'react'

interface ProductStoreProps {
  products: Product[]
  setSelectedProducts: Dispatch<SetStateAction<number[]>>
  selectedProducts: number[]
  prodCostRef: MutableRefObject<Record<number, number>>
  prodCostDRef: MutableRefObject<Record<number, number>>
  setGross: Dispatch<SetStateAction<number>>
  setNewFlag: Dispatch<SetStateAction<boolean>>
}

export default function ProductStore(props: ProductStoreProps) {
  //
  const c = useContext(AppContext)

  function newHandler() {
    props.setNewFlag(true)
  }

  let productCheckBoxesSet: any

  if (props.products.length > 0) {
    productCheckBoxesSet = props.products.map((item: Product) => {
      //
      function checkHandler() {
        if (
          props.prodCostRef.current[item.id] ||
          props.prodCostRef.current[item.id] === 0
        ) {
          delete props.prodCostRef.current[item.id]
          delete props.prodCostDRef.current[item.id]
        } else {
          props.prodCostRef.current[item.id] = Number(item.price)
        }
        //
        props.setGross(
          Object.values(props.prodCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          ) +
            Object.values(props.prodCostDRef.current).reduce(
              (prev, curr) => prev + curr,
              0
            )
        )
        //
        props.setSelectedProducts((prevSelectedProducts) => {
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
    //
  } else {
    productCheckBoxesSet = []
  }

  productCheckBoxesSet.push(
    <CheckBoxNewButton
      key="new!"
      text={'+' + c.t.new}
      onClick={newHandler}
      checked={false}
    />
  )
  return <div className={styles.flexRowContainer}>{productCheckBoxesSet}</div>
}
